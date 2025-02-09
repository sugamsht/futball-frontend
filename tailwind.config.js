module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tw-elements/dist/plugin')
  ],
  safelist: [
    'from-purple-400', 'to-purple-600', 'text-purple-400', 'group-hover:text-purple-300',
    'from-blue-400', 'to-blue-600', 'text-blue-400', 'group-hover:text-blue-300'
  ],
}
