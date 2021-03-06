import { randomInt } from "mathjs"


export const bet = (stakedAmount : number) => 
{
  const isWinner = randomInt(0 , 100) % 2 === 0

  if(isWinner)
    return stakedAmount * 2
  else
    return -stakedAmount
}

export const rob = (stealedCash : number) => 
{
  const isStealed = randomInt(0 , 100) % 2 !== 0

  if(!isStealed)
    return -(stealedCash / 2)
  
  if(stealedCash <= 1000) 
    return -1000

  return stealedCash / 2
  
}