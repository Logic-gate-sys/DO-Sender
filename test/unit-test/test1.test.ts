import { test, expect} from 'vitest';
import { calculateAmount } from '../../app/util/calculator';
import { formatAirDropInputs } from '../../app/util/format_input';

// ---------------------------- test amount formats well ----------------------------------
test("Format token amount from provided string-like user inputs ", () => {
    expect(calculateAmount("10203040\n 300403 \n 304040\n 204000")).toBe(10203040 + 300403 + 304040 + 204000);
});




// ---------------------------- test token address formats well from input -------------------

test("TOKEN ADDRESS, RECEIPIENTS, RECEIPIENT_AMOUNTS FORMATED WELL", () => {
    //----------- provided token
const token: string = "1234567890abcdef1234567890abcdef12345678";
//--------- expected token address 
const expected_token: string = "0x1234567890abcdef1234567890abcdef12345678";
//------------- provided receipient addresses (with newlines, extra spaces, etc.)
const recipients: string = `
  0x1111111111111111111111111111111111111111
  0x2222222222222222222222222222222222222222
  0x3333333333333333333333333333333333333333
  0x4444444444444444444444444444444444444444
`;
//------------ expected receipient array
const expected_recipients: string[] = [
  "0x1111111111111111111111111111111111111111",
  "0x2222222222222222222222222222222222222222",
  "0x3333333333333333333333333333333333333333",
  "0x4444444444444444444444444444444444444444",
];

//------------- provided amounts (note: mixed whitespace, newlines)
const amounts: string = `
  100
  200
  300
  400
`;

//----------- expected amounts array (bigints)
const expected_amounts: bigint[] = [100n, 200n, 300n, 400n];
    // test assertion 
    const { token_addr, receipeints, receipient_am } = formatAirDropInputs(token, recipients, amounts);
    console.log("Token adddress: ", token_addr)
    //---------------- Test assertions ------------------------
    expect(token_addr).toBe(expected_token);
    expect(receipeints).toEqual(expected_recipients);
    expect(receipient_am).toEqual(expected_amounts);
})



 // --------------- test triming -----------------------------
  test("trims whitespace in token and recipient addresses", () => {
    const token = "   1234567890abcdef1234567890abcdef12345678   ";
    const recipients = `
      0x1111111111111111111111111111111111111111  
      0x2222222222222222222222222222222222222222
    `;
    const amounts = `
      10
      20
    `;

    const result = formatAirDropInputs(token, recipients, amounts);

    expect(result.token_addr).toBe("0x1234567890abcdef1234567890abcdef12345678");
    expect(result.receipeints).toEqual([
      "0x1111111111111111111111111111111111111111",
      "0x2222222222222222222222222222222222222222",
    ]);
    expect(result.receipient_am).toEqual([10n, 20n]);
  });




// -------------------- Test ignore empty space in receipient -----------------------
  test("ignores empty lines in recipients and amounts", () => {
    const token = "1234567890abcdef1234567890abcdef12345678";
    const recipients = `
      0x1111111111111111111111111111111111111111

      0x2222222222222222222222222222222222222222
    `;
    const amounts = `
      50

      60
    `;

    const result = formatAirDropInputs(token, recipients, amounts);

    expect(result.receipeints).toEqual([
      "0x1111111111111111111111111111111111111111",
      "0x2222222222222222222222222222222222222222",
    ]);
    expect(result.receipient_am).toEqual([50n, 60n]);
  });



//------------------ test handling leading zeros in amount correct -----------------
  test("handles leading zeros in amounts correctly", () => {
    const token = "1234567890abcdef1234567890abcdef12345678";
    const recipients = `
      0x3333333333333333333333333333333333333333
      0x4444444444444444444444444444444444444444
    `;
    const amounts = `
      0010
      000020
    `;

    const result = formatAirDropInputs(token, recipients, amounts);

    expect(result.receipient_am).toEqual([10n, 20n]);
  });



// ------------------- test single receipient still works ---------------
  test("single recipient + single amount still works", () => {
    const token = "1234567890abcdef1234567890abcdef12345678";
    const recipients = `0x5555555555555555555555555555555555555555`;
    const amounts = `999`;

    const result = formatAirDropInputs(token, recipients, amounts);

    expect(result.receipeints).toEqual([
      "0x5555555555555555555555555555555555555555",
    ]);
    expect(result.receipient_am).toEqual([999n]);
  });