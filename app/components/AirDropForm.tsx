"use client"
import { numberToBytes } from 'viem';
import {InputField} from './ui/input_ui';
import { useMemo, useState } from 'react';
import { useAccount, useChainId, useConfig } from 'wagmi';
import { chainsToTSender, erc20Abi, tsenderAbi } from '../util/constants';
import { readContract,waitForTransactionReceipt } from '@wagmi/core';
import { calculateAmount } from '../util/calculator';
import { useWriteContract } from 'wagmi';
import { formatAirDropInputs } from '../util/format_input';
import { ReactJsxRuntime } from 'next/dist/server/route-modules/app-page/vendored/rsc/entrypoints';



export default function AirdropForm() {
  //work with only one tokenAddress at a time
  const [tokenAddress, setTokenAddress] = useState("");
  //receipient or amount could be more than one
  const [receipient, setReceipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const totalAmount: number = useMemo(() => (calculateAmount(amount)), [amount]);
  const { data: hash, isPending, error, writeContractAsync } = useWriteContract();

  

  //------------ get details needed to interract  ---------------------------
  const account = useAccount();
  const current_chain_id = useChainId(); //current chain
  const config = useConfig();

  //handling submint 
  const handleSubmit = async () => {
    const { token_addr, receipeints, receipient_am } = formatAirDropInputs(tokenAddress, receipient, amount);
    //validate  array lenghts
    if (receipeints.length !== receipient_am.length) {
      console.log("Mismatch receipeints and amounts !");
      return;
    }
    // console log form details;
    console.log("Token Address: ", token_addr);
    console.log("Receipients: ", receipeints);
    console.log("Amounts :", receipient_am);
    // get ts-send address 
    const ts_sender_add = chainsToTSender[current_chain_id]["tsender"];
    //log chain id and tsender address 
    console.log("Chain id : ", current_chain_id);
    console.log("Tsender address : ", ts_sender_add);

    //------------------------- Basic validation ---------------------------------------------
    if (!account) {
      alert("Please connect wallet ");
      return;
    }
    if (!ts_sender_add) {
     alert("No tsender address for this chain: ");
      return;
    }
    if (!token_addr || !/^0x[a-fA-F0-9]{40}$/.test(tokenAddress)) {
      alert("Enter a valid ERC20 token address: 0x....");
      return;
    }
    // get approved amount of contract 
    const allowance = await getApprovedAmount(ts_sender_add as `0x${string}`, token_addr as `0x${string}`, account.address as `0x${string}`);
    // is allowance less than total airdrop:
    if (allowance < totalAmount) {
      try {
         // approve amount to be sent
      const tx_hash = await writeContractAsync({
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: "approve",
        args: [ts_sender_add as `0x${string}`, BigInt(totalAmount)]
      });
      // log transaction has 
      console.log("TRNX Hash: ", tx_hash);
      // wait for transaction 
      const trnx_receipt = await waitForTransactionReceipt(config, {
        hash: tx_hash
      }
      );
      if (trnx_receipt.status! == "success") {
        console.log("Transaction failed! ");
      } else {
        console.log("Amount approved ! ")
      }
        
      } catch (err) {
        console.log("Could not call function !");
        return;
      } 
    } else {
      // proceed with air drop
      await executeAirDrop(ts_sender_add as `0x${string}`,receipeints, receipient_am)
    }
  }

  const executeAirDrop = async (refined_tsender_addr: `0x${string}`, receipients: `0x${string}`[], amounts: bigint[]) => {
    // use the asyc write contract 
    const airDropHash = await writeContractAsync({
      abi: tsenderAbi,
      functionName: "airDropERC20",
      address: refined_tsender_addr
    });
    //console log trax hash
    console.log("AIRDROP HASH :  ", AirdropForm);
    console.log("Waiting for the airdrop transaction receipt..... ");
    const airdrop_receipt = await waitForTransactionReceipt(config,
     { hash: airDropHash}
    );
    // console transaction receipt or error 
    if (airdrop_receipt.status !== "success") {
      console.log("AIR DROP FAILED");
    } else {
      console.log("AIR DROP SUCCESS !")
    }
  }


  // get approved amount function 
  const getApprovedAmount = async (spender: `0x${string}`, token_add: `0x${string}`, owner_addr: `0x${string}`): Promise<bigint> => {
    try {
      // use the readContract funtion to get approved amoount
      const approvedAmount = await readContract(
        config, {
          abi: erc20Abi,
          address: token_add,
          functionName: "allowance",
          args:[owner_addr,spender]
        }
      )
      // log row amount: 
      console.log('ROW AMOUNT ', approvedAmount);
      return approvedAmount as bigint;
    } catch (error) {
      console.log("ERROR:", error);
      throw new  Error('failed to read token allowance');

  }
    }
    
  // const handleSubmit = async () => {
  //   // prepare all fields and valididate
  //   
  //   // validate length of receipients and amounts array
  //   if (!token_addr || receipient_add.length !== receipient_am.length) {
  //     console.log("Invalid inputs: Fields(Receipients and Amounts) do not match in length");
  //     return;
  //   }
  //   //validate token_address
  //   if (!token_addr) {
  //     console.log("No token addres provided");
  //     return;
  //   }
  //   
  //   //----------- now prepare to send ------------------------------------
  //   const ts_sender_address = chainsToTSender[current_chain_id]["tsender"];
  // }


  // make transaction 
  const makeTransaction = (chainid: string, tokenContract: string, tsender_add: string): void => {
    // get chain id 
    // approve ts-sender to send airdrop

    // send air drop
   }
  return (
    <div className="max-w-md mx-auto p-4">
      <InputField
        size={"small"}
        label="Token Address"
        id="token"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
        placeholder="Enter token address"
      />
      {/* RECEIPIENTS */}
      <InputField
        size={"big"}
        label="Receipients: "
        id="receipient"
        value={receipient}
        onChange={(e) => setReceipient(e.target.value)}
        placeholder="Receipient address(s): e.g son new lines"
      />
      <InputField
        size={"big"}
        label="Amounts to Send: "
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amounts for receipient(s): e.g on new line"
      />

      <button onClick={handleSubmit}  className='border-2 border-gray-500 rounded-2xl p-2 m-2 bg-amber-200 active:bg-gray-500'>
        Send Token
      </button>
    </div>
    
  );
}




/*
hallenges
Add quality of life features to the app:
Should have a little spinner while the app is both sending a transaction to the chain, and has MetaMask popped up
Should save to local storage the inputs (so when someone refreshes, they don't lose their inputs)
Should have a little box at the bottom for details about the token
Deploy your site to fleek!
Tweet it out!
Site: t-sender.com
*/