import { useEffect } from "react"
import { useRef } from "react"
import { useCallback } from "react"
import { useState } from "react"


function App() {

  const [length ,setlength] = useState(8)
  const [numallowed,setnumallowed] = useState(false)
  const [charallowed,setcharallowed] = useState(false)
  const [password , setpassword] = useState("")
  const passwordref = useRef(null)

  const passwordgen = useCallback(
    () => {
      let pass = ""
      let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"

      if(numallowed) str += "0123456789"
      if(charallowed) str += "!@#$%&*?/][{}-_()`~<>,."

      for (let i = 0; i < length; i++) {
        let char = Math.floor(Math.random()*str.length+1)
        pass += str.charAt(char)
        
        
      }
      setpassword(pass)
      
    },
    [length,numallowed,charallowed]
  )

  const copypastetoclipboard = useCallback(
    () => {
      passwordref.current.select()
      window.navigator.clipboard.writeText(password)
      alert("Text Copied To ClipBoard")

      
      
      

    },
    [password],
  )
  

  useEffect(() => {
    passwordgen()
  
    
  }, [length.numallowed,charallowed,passwordgen])
  
  
  

  return (

    
    <>

    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-indigo-950 text-yellow-500">
      <h1 className="text-center">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
         type="text"
         value={password}
         placeholder="Password"
         className="outline-none w-full py-1 px-3"
         readOnly
         ref={passwordref}
         />
         <button onClick={copypastetoclipboard} className="outline-none bg-blue-400 text-white px-3 py-0.5 shrink-0">
          Copy
         </button>

      </div>
      <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e)=>{setlength(e.target.value)}}
         
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numallowed}
          id="numberInput"
          onChange={()=>{setnumallowed((prev)=>!prev)}}
          
          
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charallowed}
              id="characterInput"
              onChange={()=>{setcharallowed((prev)=>!prev)}}
              
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
  
    </>
  )
}

export default App
