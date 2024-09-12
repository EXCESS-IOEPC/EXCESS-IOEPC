const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js"
  ],
  theme: {
    extend: {
      colors: {
        offWhite: '#F6F6F6',
        offBlack: '#3B3C3D',
        primaryBlue: '#3572EF',
        offBlue: '#bbe8fa',
        xyellow: '#F8AE00',
        cs50red: '#F5233C',
        ioeBlue: '#253B80', 
		datacamp: '#31E078',
        offBlueTrans: 'rgb(187 232 250 / 1)',
      },
      backgroundImage: {
        'background': "url('../../public/images/background-main.png')",
        'erc-scaled': "url('../../public/images/erc-scaled.jpg')",
        'wave': "url('../../public/images/wave.svg')",
        'line': "url('../../public/images/line.svg')",
        'server_down': "url('../../public/images/server_down.svg')",
      }
    },
  },
  plugins: [nextui()],
}

