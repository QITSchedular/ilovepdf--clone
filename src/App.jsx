import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signature from './components/Signature'
import DraggableSignaturePad from './components/DraggableSignaturePad'
import ResizableComp from './components/ResizableComp'
import MyComponent from './components/MySigV2'
import MySigV3 from './components/MySigV3'

function App() {
  

  return (
    <>
    {/* <Signature />
    <DraggableSignaturePad /> */}
    {/* <MyComponent /> */}
    <MySigV3 />
    </>
  )
}

export default App
