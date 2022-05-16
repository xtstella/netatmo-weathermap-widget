const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: {
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        amber: colors.amber,
        slate: colors.slate,
      },
      fontSize: {
        'title-large': [
          '26px',
          {
            letterSpacing: '-0.005em',
            lineHeight: '42px',
          },
        ],
      },
    },
  },
}
