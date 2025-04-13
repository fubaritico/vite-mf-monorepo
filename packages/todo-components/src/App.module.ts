import { css } from '@emotion/react'
import theme from './theme.ts'

const styles = {
  pageContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    min-width: 320px;
    max-width: 768px;
    min-height: 100vh;
  `,

  appContainer: css`
    position: relative;
  `,

  appTitle: css`
    text-align: left;
    color: light-dark(
      ${theme.light.page.title.color},
      ${theme.dark.page.title.color}
    );
    text-shadow: 0 0 10px
      light-dark(
        ${theme.light.page.title.textShadow},
        ${theme.dark.page.title.textShadow}
      );
    padding: 0 16px;
  `,

  logoContainer: css`
    position: absolute;
    opacity: 0.33;
    transform: scale(3) rotate(-16deg);
    top: 40px;
    left: -20px;
  `,

  todoContainer: css`
    position: relative;
  `,
}

export default styles
