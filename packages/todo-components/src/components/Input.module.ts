import { css } from '@emotion/react'
import theme from '../theme'

const styles = {
  form: css`
    margin-bottom: 8px;
  `,

  formControl: css`
    background: light-dark(
      ${theme.light.box.backgroundColor},
      ${theme.dark.box.backgroundColor}
    );
    border-radius: 16px;
    padding: 16px;
    display: flex;
    gap: 12px;
    flex-wrap: nowrap;
  `,

  input: css`
    appearance: none;
    border: none;
    outline: none;
    background: light-dark(
      ${theme.light.input.backgroundColor},
      ${theme.dark.input.backgroundColor}
    );
    color: light-dark(${theme.light.input.color}, ${theme.dark.input.color});
    border-radius: 8px;
    padding: 0 12px;
    height: 48px;
    flex: 1;
    font-size: 18px;
    box-shadow: none;
    transition:
      color 300ms ease,
      background-color 300ms ease,
      box-shadow 300ms ease;

    &:hover {
      background: light-dark(
        ${theme.light.input.backgroundColorHover},
        ${theme.dark.input.backgroundColorHover}
      );
      box-shadow: 0 0 0 2px
        light-dark(
          ${theme.light.input.boxShadowHover},
          ${theme.dark.input.boxShadowHover}
        );
    }

    &:focus {
      background: light-dark(
        ${theme.light.input.backgroundColorFocus},
        ${theme.dark.input.backgroundColorFocus}
      );
      box-shadow:
        0 0 0 2px
          light-dark(
            ${theme.light.input.boxShadowFocus1},
            ${theme.dark.input.boxShadowFocus1}
          ),
        0 0 0 4px
          light-dark(
            ${theme.light.input.boxShadowFocus2},
            ${theme.dark.input.boxShadowFocus2}
          );
      color: light-dark(
        ${theme.light.input.colorFocus},
        ${theme.dark.input.colorFocus}
      );
    }
  `,

  button: css`
    background: transparent;
    border-radius: 8px;
    padding: 0 12px;
    outline: none !important;
    height: 48px;
    color: light-dark(
      ${theme.light.button.secondary.color},
      ${theme.dark.button.secondary.color}
    );
    border: 1px solid
      light-dark(
        ${theme.light.button.secondary.border},
        ${theme.dark.button.secondary.border}
      );
    transition:
      color 200ms ease,
      background-color 200ms ease,
      outline 200ms ease;

    &:hover:disabled {
      border: 1px solid
        light-dark(
          ${theme.light.button.secondary.borderHoverDisabled},
          ${theme.dark.button.secondary.borderHoverDisabled}
        );
    }

    &:hover:not(:disabled) {
      border: 1px solid
        light-dark(
          ${theme.light.button.secondary.borderHover},
          ${theme.dark.button.secondary.borderHover}
        );
      background: light-dark(
        ${theme.light.button.secondary.backgroundHover},
        ${theme.dark.button.secondary.backgroundHover}
      );
      color: light-dark(
        ${theme.light.button.secondary.colorHover},
        ${theme.dark.button.secondary.colorHover}
      );
    }

    &:active:not(:disabled) {
      border: light-dark(
        ${theme.light.button.secondary.borderActive},
        ${theme.dark.button.secondary.borderActive}
      );
      outline: 4px solid
        light-dark(
          ${theme.light.button.secondary.outlineActive},
          ${theme.dark.button.secondary.outlineActive}
        ) !important;
      background: light-dark(
        ${theme.light.button.secondary.backgroundActive},
        ${theme.dark.button.secondary.backgroundActive}
      );
      color: light-dark(
        ${theme.light.button.secondary.colorActive},
        ${theme.dark.button.secondary.colorActive}
      );
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `,
}

export default styles
