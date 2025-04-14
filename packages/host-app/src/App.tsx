import { ChangeEvent, useState } from 'react'
import Input from 'todo_components/Input'
import List from 'todo_components/List'

function App() {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState<string[]>([])

  const onSubmit = () => {
    setTodos((prev) => [...prev, newTodo])
    setNewTodo('')
  }

  return (
    <>
      <header className="app-header">Host</header>
      <Input
        value={newTodo}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setNewTodo(e.target.value)
        }}
        onSubmit={onSubmit}
      />
      {todos.length > 0 && <List items={todos} />}
    </>
  )
}

export default App
