/** @jsxImportSource @emotion/react */
import { FC } from 'react'

import styles from './List.module'

export interface ListProps {
  className?: string
  items?: string[]
}

const List: FC<ListProps> = ({ items }) => {
  return (
    <ul css={styles.todoList}>
      {items?.map((item, i) => (
        <li css={styles.todoListItem} key={i}>
          {item}
        </li>
      ))}
    </ul>
  )
}

export default List
