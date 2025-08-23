type airDropParamters = {
    token_addr: `0x${string}`,
    receipeints: `0x${string}`[],
    receipient_am : bigint[]
}

// function to format user inputs
export const formatAirDropInputs = (token: string, receiptient_addr: string, amounts: string): airDropParamters=>{
    const token_addr: `0x${string}` =`0x${token.trim()}`;
    const receipeints: `0x${string}`[] = receiptient_addr.split('\n').map(str => str.trim()).filter(n=>n!=='') as `0x$(string)`[];
    const receipient_am: bigint[] = amounts.split("\n").map(n => n.trim()).filter(n => n !== "").map(n => Number(n)).map(n => BigInt(n));
    return { token_addr, receipeints, receipient_am };
}