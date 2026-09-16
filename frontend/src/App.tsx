import { useState } from 'react'
import './App.css'
import SkillsList from './components/SkillsList.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <SkillsList />
    </>
  )
}

export default App
