export const calculateAmount = (amount:string) :number => {
    const amount_array = amount.split("\n")
        .map(n => n.trim())
        .filter(n => n !== '')
        .map(n => parseFloat(n))
        .filter(n=>! isNaN(n))
    
    //check to 
    const amount_to_return = amount_array.reduce((accu,curr)=> accu+curr, 0);
    return amount_to_return as number;
}