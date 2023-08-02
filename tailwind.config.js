const colors = require('tailwindcss/colors')

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx,vue}'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			white: colors.white,
			black: colors.black,
			gray: colors.gray,
			red: colors.red,
			yellow: colors.yellow,
			green: colors.green,
			blue: colors.blue,
			pink: colors.pink,
			primary: '#0084ff',
			warning: '#ffae00',
			danger: '#fe1e67',
			success: '#00caa2',
			info: {
				primary: '#333',
				regular: '#666',
				secondary: '#999',
			},
		},
	},
	plugins: [],
}
