let isLinkHighlighted = false;
const highlightClassNameForLinks = "link-highlight-tekvision";
const highlightStyle = "border: 1px solid red;";

export const linkHighlightInit = () => {
	// Create and append the style element for the highlight class
	const styleElementWithHighlightClass = document.createElement("style");
	styleElementWithHighlightClass.innerHTML = `.${highlightClassNameForLinks} { ${highlightStyle} !important; }`;
	document.head.appendChild(styleElementWithHighlightClass);
};

const highlightLinks = () => {
	const elements = document.querySelectorAll('a[href]');
	
	if (elements.length > 0) {
		elements.forEach(element => element.classList.add(highlightClassNameForLinks));
	}
}

const unhighlightLinks = () => {
	const elements = document.querySelectorAll('a[href]');
	
	if (elements.length > 0) {
		elements.forEach(element => element.classList.remove(highlightClassNameForLinks));
	}
}

// Function to toggle heading visibility
export const toggleLinks = () => {
	if (isLinkHighlighted) {
		unhighlightLinks ();
		alert("Links unhighlighted.");
	} else {
		highlightLinks ();
		alert("Links highlighted.");
	}
	isLinkHighlighted = !isLinkHighlighted;
};
