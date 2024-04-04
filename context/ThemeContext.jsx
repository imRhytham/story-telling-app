"use client";
import { createContext, useState } from "react";
import { Roboto, Orbitron, EB_Garamond, Freehand } from "next/font/google";

// Define font styles
const roboto = Roboto({
	weight: "400",
	subsets: ["latin"],
});

const orbitron = Orbitron({
	weight: "400",
	subsets: ["latin"],
});

const garamond = EB_Garamond({
	weight: "400",
	subsets: ["latin"],
});

// Define theme configurations
const theme = {
	default: {
		headingFont: roboto,
		bodyFont: roboto,
		fontColor: "#dddddd", // Rich gold
		backgroundColor: "#101627", // Saddle brown
		backgroundImage: "",
	},
	medieval: {
		headingFont: garamond,
		bodyFont: roboto,
		fontColor: "#FFD700", // Rich gold
		backgroundColor: "#8B4513", // Saddle brown
		backgroundImage: "/lisbon.svg",
	},
	mythology: {
		headingFont: garamond,
		bodyFont: roboto,
		fontColor: "#228B22", // Enchanted forest green
		backgroundColor: "#87CEEB", // Celestial blue
		backgroundImage: "/moroccan.svg",
	},
	futuristic: {
		headingFont: roboto,
		bodyFont: roboto,
		fontColor: "#00FFFF", // Electric blue
		backgroundColor: "#2e2e2e",
		backgroundImage: "/floating-cogs.svg",
	},
};

const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
	const [currentTheme, setCurrentTheme] = useState("default");
	const [font, setFont] = useState(theme.default.headingFont);
	const [headingFont, setHeadingFont] = useState(theme.default.headingFont);
	const [fontColor, setFontColor] = useState(theme.default.fontColor);
	const [bgColor, setBgColor] = useState(theme.default.backgroundColor);
	const [backgroundImage, setBackgroundImage] = useState(
		theme.default.backgroundImage
	);

	const toggleTheme = (themeName) => {
		setCurrentTheme(themeName);
		setFont(theme[themeName]?.bodyFont);
		setHeadingFont(theme[themeName]?.headingFont);
		setFontColor(theme[themeName]?.fontColor);
		setBackgroundImage(theme[themeName]?.backgroundImage);
		setBgColor(theme[themeName]?.backgroundColor);
	};

	return (
		<ThemeContext.Provider
			value={{
				currentTheme,
				toggleTheme,
				font,
				fontColor,
				backgroundImage,
				theme,
				bgColor,
				headingFont,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export { ThemeContext, ThemeContextProvider };
