let highlightElement = false;
const highlightClassName = "highlight-tekvision";
const highlightStyle = "outline: 5px solid red";

export const highlightInit = () => {
	// Create and append the style element for the highlight class
	const styleElementWithHighlightClass = document.createElement("style");
	styleElementWithHighlightClass.innerHTML = `.${highlightClassName} { ${highlightStyle} !important; }`;
	document.head.appendChild(styleElementWithHighlightClass);
};

// Highlight elements
const highlightElements = () => {
	const elementSelector = prompt("Enter the CSS selector of the elements you want to highlight:");
	const elements = document.querySelectorAll(elementSelector);
	
	if (elements.length > 0) {
		elements.forEach(element => element.classList.add(highlightClassName));
		alert(`Successfully highlighted ${elements.length} elements(s).`);
	} else {
		alert("No elements found for the provided selector. Please try again.");
		highlightElement = false;
	}
};

// Function to unhighlight elements
const unhighlightElements = () => {
	const elements = document.querySelectorAll(`.${highlightClassName}`);
	
	elements.forEach(element => element.classList.remove(highlightClassName));
	alert("Highlight removed from all elements.");
};

	function getVisibilityPercentage(element) {
	const rect = element.getBoundingClientRect();
	const viewportHeight = window.innerHeight;
	const viewportWidth = window.innerWidth;
	
	// Calculate the intersection area with the viewport
	const visibleWidth = Math.max(0, Math.min(rect.right, viewportWidth) - Math.max(rect.left, 0));
	const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
	
	const visibleArea = visibleWidth * visibleHeight;
	const totalArea = rect.width * rect.height;
	
	// Calculate the percentage of the element that is visible
	return (totalArea > 0) ? (visibleArea / totalArea) * 100 : 0;
}

export function getElementVisibilityDetails() {
	const elements = document.querySelectorAll('.' + highlightClassName);
	let details = "";
	let summary = "";
	let visibleElementCount = 0;
	
	elements.forEach((element, index) => {
		const visibilityPercentage = getVisibilityPercentage(element);
		
		if (visibilityPercentage > 0) {
			visibleElementCount++;
			summary += `${visibleElementCount}. Element: "${element.innerText.trim()}" - Visibility: ${visibilityPercentage.toFixed(2)}%\n`;
		}
	});
	
	if (visibleElementCount === 0) {
		details = "No highlighted elements are currently visible in the viewport. Please ensure that you've navigated to the right element.";
	} else {
		details = `${visibleElementCount} highlighted element(s) are currently visible in the viewport:\n${summary}`;
	}
	
	prompt("", details);
};

// Toggle highlight mode
export const toggleHighlight = () => {
	highlightElement = !highlightElement;
	highlightElement ? highlightElements() : unhighlightElements();
};