import { css } from '@emotion/react'

import theme from '../theme'

const styles = {
  todoList: css`
    background: light-dark(
      ${theme.light.todo.list.backgroundColor},
      ${theme.dark.todo.list.backgroundColor}
    );
    border-radius: 16px;
    padding: 16px;
    display: flex;
    gap: 16px;
    flex-wrap: nowrap;
    flex-direction: column;
    margin: 0;
    list-style: none;
  `,

  todoListItem: css`
    background: light-dark(
      ${theme.light.todo.item.backgroundColor},
      ${theme.dark.todo.item.backgroundColor}
    );
    color: light-dark(
      ${theme.light.todo.item.color},
      ${theme.dark.todo.item.color}
    );
    text-shadow: 0 0 2px
      light-dark(
        ${theme.light.todo.item.textShadow},
        ${theme.dark.todo.item.textShadow}
      );
    border-radius: 8px;
    padding: 8px 16px;
    display: flex;
    gap: 12px;
  `,
}

export default styles
