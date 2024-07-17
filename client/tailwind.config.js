/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {   
      scrollbar: {
        width: '1px',
        track: {
          background: 'transparent',
        },
        thumb: {
          backgroundColor: '#ccc',
          borderRadius: '1px',
          border: '1px solid transparent',
        },
      },
      colors:{
      'primary':"#1476ff",
      'secondary':"#f3f5ff",
      'light':"#f9faff",
    },},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none',     /* Firefox */
        },
        '.scrollbar': {
          '::-webkit-scrollbar': {
            width: '1px',
          },
          '::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc',
            borderRadius: '1px',
            border: '1px solid transparent',
          },
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          'scrollbar-color': '#ccc transparent',
        },
      })
    },
  ],
}

