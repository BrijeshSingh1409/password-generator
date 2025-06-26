import { useState,useCallback,useEffect, useRef } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [Length, setLength] = useState(10)
  const [numberallowed,setnumberallowed]=useState(false)
  const [charallowed,setcharallowed]=useState(false)
  const [password,setpassword]=useState("")
//usecallback hook(read docs on react hooks)
  const passwordgenerator=useCallback(() => {
    let pass=""
    //to choose password
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberallowed) str+="0123456789"
    if(charallowed) str+="!@#$%^&*()_-+=[]{}~`"
    //to choose length of password,we use for loop upto length
    for(let i=1;i<=Length;i++){
      //to generate random passwords,we use math.random
      let char=Math.floor(Math.random()*str.length + 1)
      pass+=str.charAt(char)
    }
    setpassword(pass)
  },
[Length,numberallowed,charallowed,setpassword])
//to activate the copy button and copy the password
const copypassword=useCallback(() => {
  passwordref.current?.select()
  
  //to select a specific length
 // passwordref.current?.setSelectionRange(0,5)

  window.navigator.clipboard.writeText(password)
},[password]) 
// useEffect hook
useEffect(() => {
  passwordgenerator()
},[Length,numberallowed,charallowed,passwordgenerator])
//use ref hook(to pass the reference)
const passwordref=useRef(null)

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4
    my-8 text-orange-500 bg-gray-600'>
      <h1 className='text-white text-center my-3'>
        Password generator </h1>
        
        <div className="flex items-center w-full max-w-md">
  <input
    type="text"
    value={password}
    readOnly
    placeholder="password"
    className="w-full px-4 py-2 rounded-l-lg border my-2 border-gray-300 outline-none"
    ref={passwordref}
  />
  <button
    onClick={copypassword}
    className="bg-blue-700 text-white px-4 py-2 rounded-r-lg h-full"
  > copy </button>
</div>
<div className='flex text-sm gap-x-2'>
  <div className='flex items-center gap-x-1'>
    {/* // to make a range like object for length that can be increased/decreased */}
    <input
     type="range"
     min={1}
     max={100}
     value={Length}
     className='cursor-pointer'
     onChange={(e) => {setLength(e.target.value)}} />
     <label >Length: {Length}</label>
  </div>
  <div className='flex items-center gap-x-1'>
    {/* to make a checkbox for numbers */}
    <input
     type="checkbox"
     defaultChecked={numberallowed}
     id='numberInput'
     onChange={() => {setnumberallowed((prev) => !prev)}} />
     <label >Numbers {numberallowed}</label>
  </div>
   <div className='flex items-center gap-x-1'>
    {/* to make a checkbox for characters */}
    <input
     type="checkbox"
     defaultChecked={charallowed}
     id='charInput'
     onChange={() => {setcharallowed((prev) => !prev)}} />
     <label >characters {charallowed}</label>
  </div>
</div>
    </div>
    </>
  )
}

export default App
