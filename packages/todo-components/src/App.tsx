/** @jsxImportSource @emotion/react */
import viteLogo from '/vite.svg'
import './App.css'
import List from './components/List.tsx'
import Input from './components/Input.tsx'
import { useState } from 'react'

import type { ChangeEvent } from 'react'

import styles from './App.module'

function App() {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState<string[]>([
    'Learn Vite',
    'Learn React',
    'Write some tests',
  ])

  console.log('Remote::App::render')

  const onSubmit = () => {
    setTodos((prev) => [...prev, newTodo])
    setNewTodo('')
  }

  return (
    <div css={styles.pageContainer}>
      <div css={styles.appContainer}>
        <div css={styles.logoContainer}>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
        </div>
        <div css={styles.todoContainer}>
          <h1 css={styles.appTitle}>My TodoList (Remote)</h1>
          <Input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewTodo(e.target.value)
            }
            onSubmit={onSubmit}
            value={newTodo}
          />
          {todos.length > 0 && <List items={todos} />}
        </div>
      </div>
    </div>
  )
}

export default App
