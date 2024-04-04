export const getStoryAndTitle = (str) => {
	const titleIndex = str.indexOf("**Title:");
	if (titleIndex === -1) {
		return null;
	}
	const newlineIndex = str.indexOf("\n", titleIndex);
	const title = str
		.substring(titleIndex + 9, newlineIndex)
		.trim()
		.replace("**", "");
	const content = str.substring(newlineIndex + 1);
	return { title, content };
};
