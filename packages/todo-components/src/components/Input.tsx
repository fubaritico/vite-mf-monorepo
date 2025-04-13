/** @jsxImportSource @emotion/react */
import { ChangeEvent, FC, FormEvent } from 'react'

import styles from './Input.module'

export interface InputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: FormEvent) => void
  value: string
}

const Input: FC<InputProps> = ({ onChange, onSubmit, value }) => {
  console.log('Input::render')
  return (
    <form
      css={styles.form}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(e)
      }}
    >
      <div css={styles.formControl}>
        <input
          css={styles.input}
          type="text"
          onChange={onChange}
          value={value}
        />
        <button css={styles.button} type="submit" disabled={value.length === 0}>
          Add
        </button>
      </div>
    </form>
  )
}

export default Input
