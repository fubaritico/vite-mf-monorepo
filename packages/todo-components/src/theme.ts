const theme = {
  light: {
    page: {
      title: {
        color: 'rgb(10,40,57)',
        textShadow: 'transparent',
      },
    },
    box: {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },
    input: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      color: 'rgba(0, 0, 0, 0.5)',
      backgroundColorHover: 'rgba(255, 255, 255, 0.75)',
      boxShadowHover: '#2F5D637F',
      backgroundColorFocus: 'rgba(255, 255, 255, 0.75)',
      boxShadowFocus1: '#2F5D637F',
      boxShadowFocus2: '#2F5D6342',
      colorFocus: 'black',
    },
    button: {
      secondary: {
        color: '#2F5D63FD',
        border: '#2F5D63FD',
        borderHoverDisabled: '#2F5D63FD',
        borderHover: '#214145FD',
        backgroundHover: '#214145FD',
        colorHover: '#9DE2ECFD',
        backgroundActive: '#173032FD',
        colorActive: '#C0E8EDFD',
        borderActive: '#1E3D40FD',
        outlineActive: '#1E3D4071',
      },
    },
    todo: {
      list: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
      },
      item: {
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        color: 'rgba(51, 51, 51, 0.75)',
        textShadow: 'rgba(204, 204, 204, 1)',
      },
    },
  },
  dark: {
    page: {
      title: {
        color: '#EEEEFF',
        textShadow: 'rgba(51, 51, 51, 0.75)',
      },
    },
    box: {
      backgroundColor: 'rgba(26, 26, 26, 0.5)',
    },
    input: {
      backgroundColor: 'rgba(102, 102, 102, 0.5)',
      color: 'rgba(255, 255, 255, 0.5)',
      backgroundColorHover: 'rgba(133, 132, 133, 0.5)',
      boxShadowHover: 'rgba(255, 255, 255, 0.5)',
      backgroundColorFocus: 'rgba(133, 132, 133, 0.5)',
      boxShadowFocus1: 'rgba(255, 255, 255, 0.5)',
      boxShadowFocus2: 'rgba(255, 255, 255, 0.25)',
      colorFocus: 'white',
    },
    button: {
      secondary: {
        color: 'rgba(255, 255, 255, 0.5)',
        border: 'rgba(255, 255, 255, 0.5)',
        borderHoverDisabled: 'rgba(255, 255, 255, 0.5)',
        borderHover: 'rgba(255, 255, 255, 0.75)',
        backgroundHover: 'rgba(255, 255, 255, 0.75)',
        colorHover: 'rgba(76, 76, 76, 1)',
        backgroundActive: 'rgba(255, 255, 255, 0.85)',
        colorActive: 'rgba(51, 51, 51, 1)',
        borderActive: 'rgba(255, 255, 255, 0.75)',
        outlineActive: 'rgba(255, 255, 255, 0.25)',
      },
    },
    todo: {
      list: {
        backgroundColor: 'rgba(26, 26, 26, 0.5)',
      },
      item: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        color: 'rgba(255, 255, 255, 0.75)',
        textShadow: 'rgba(51, 51, 51, 1)',
      },
    },
  },
}

export default theme
