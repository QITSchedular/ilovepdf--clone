import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signature from './components/Signature'
import DraggableSignaturePad from './components/DraggableSignaturePad'
import ResizableComp from './components/ResizableComp'

function App() {
  

  return (
    <>
    <Signature />
    <DraggableSignaturePad />
    </>
  )
}

export default App
