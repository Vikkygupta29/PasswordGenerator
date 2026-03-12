import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {
   const [length,setLength] =useState(8)
   const [numberAllowed,setNumberAllowed]= useState(false)
   const [charAllowed,setCharAllowed]= useState(false)
   const [password,setPassword] = useState("")
    //useRef Hook
   let passwordRef = useRef(null)
   const passwordgenerate = useCallback((e)=>{
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
       let pass = ""
       if(numberAllowed){
            str +="1234567890"
       } 
       if(charAllowed) {
           str +="~!@#$%^&*()?<>"
       }
       for(let i =0;i<length;i++){
        let char = Math.floor(Math.random()*str.length)
        pass += str.charAt(char) 
        
       }
       setPassword(pass)
       
       
   },[length,charAllowed,numberAllowed])
   
   const passwordClickedBoard = useCallback(()=>{
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,5)   
     window.navigator.clipboard.writeText(password)
   },[password])

useEffect(()=>{
  passwordgenerate()
},[length,numberAllowed,charAllowed])


  return (
    <div className='bg-black flex h-screen justify-center'>
      <div className='bg-gray-600 shadow-lg w-2xl my-20 rounded-2xl h-65'>
         <h1 className=' m-10 text-white text-center text-3xl'>Password Generator</h1>
         <input className='bg-white p-3 text-orange-500 text-xl rounded-xl w-2/3 mx-7' type="text" value={password} placeholder='Password' readOnly ref={passwordRef}/>
         <button onClick={passwordClickedBoard} className='bg-blue-600 cursor-pointer active:scale-95 px-5 text-xl rounded-xl text-white py-3 hover:bg-blue-400'>Copy</button>
         <div className='m-6'>
          <input onChange={(e)=>{setLength(e.target.value)}} className='cursor-pointer' type="range" min={6} max={20} name="ranges" id="range" />
          <label  className='text-orange-500 text-2xl mx-3'>Length : {length}</label>
          <input onChange={()=>{setNumberAllowed(prev=>!prev)}} className='cursor-pointer' type="checkbox" id="no" />
          <label className='text-orange-500 text-2xl mx-2.5'>Numbers</label>
           <input onChange={()=>{setCharAllowed(prev=>!prev)}} className='cursor-pointer' type="checkbox" id="ch" />
          <label className='text-orange-500 text-2xl mx-2.5'>Characters</label>
         </div>
      </div>
    </div>
  )
}

export default App