import { useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [goalName, setGoalName] = useState('')
  const [goalType, setGoalType] = useState('')
  const [targetValue, setTargetValue] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      setMessage('You must be logged in to save a goal.')
      return
    }

    const { error } = await supabase.from('fitness_goals').insert([
      {
        user_id: user.id,
        goal_name: goalName,
        goal_type: goalType,
        target_value: targetValue,
        target_date: targetDate,
      },
    ])

    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('Goal saved successfully!')
      setGoalName('')
      setGoalType('')
      setTargetValue('')
      setTargetDate('')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Fitness Intake Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Goal Name"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Goal Type"
          value={goalType}
          onChange={(e) => setGoalType(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Target Value"
          value={targetValue}
          onChange={(e) => setTargetValue(e.target.value)}
        />
        <br />
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
        />
        <br />
        <button type="submit">Save Goal</button>
      </form>
      <p>{message}</p>
    </div>
  )
}

export default App
