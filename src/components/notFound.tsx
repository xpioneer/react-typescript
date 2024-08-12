import { useState } from "react"
import * as React from 'react'


const Text: React.FC = () => {
  return []
}


const notfound = () => {

return <div id="not-found">
  <p>
    404
    <br/>
    Not Found
  </p>
</div>}




export default () => {

  const [state, ] = useState(1)
  const [state1, ] = useState(1)

return <div id="not-found">
  <p>
    404
    <br/>
    Not Found
  </p>
</div>}


// 1~52, 每13张一个花色

// 1~13, 14~26, 27~39, 40~52

function check(arr: number[]){
  if(arr.length < 3 && arr.length > 13) {
    return false
  }

  arr.sort((a, b) => a - b) // 升序排列

  if(arr[0] < 13 && arr[arr.length - 1] >= 14) {
    return false
  } else if(arr[0] < 26 && arr[arr.length - 1] >= 27) {
    return false
  } else if(arr[0] < 39 && arr[arr.length - 1] >= 40) {
    return false
  }
  
  let result = true
  for(let i = 1; i < arr.length; i++) {
    // if(arr[i])
    if(arr[i] !== arr[i - 1] + 1) {
      result = false
      break;
    }
  }
  return result
}




