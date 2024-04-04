/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		colors: {
			rusticBrown: "#8B4513",
			richGOld: "#FFD700",
			celestialBlue: "#87CEEB",
			forestGreen: "#228B22",
			jetBlack: "#2e2e2e",
			electricBlue: "#00FFFF",
			dark: "#101627",
			light: "#dddddd",
		},

		extend: {
			keyframes: {
				typing: {
					"0%": {
						width: "0%",
						visibility: "hidden",
					},
					"100%": {
						width: "100%",
					},
				},
				blink: {
					"50%": {
						borderColor: "transparent",
					},
					"100%": {
						borderColor: "white",
					},
				},
			},
			animation: {
				typing: "typing 2s steps(20) infinite alternate, blink .7s infinite",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [],
};
