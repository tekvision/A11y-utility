const highlightClassName = "highlight-tekvision";

export const highlightAndCaptureInit = () => {
	try {
		// Include HTML2Canvas library by injecting a script tag
		const script = document.createElement("script");
		script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
		document.head.appendChild(script);
		
		script.onload = function () {
			console.log("Successfully imported HTML2Canvas library!");
		}
	} catch (error) {
		alert("Unable to automatically capture screenshots on this web page. Please use the manual capture feature ('Alt + 2').\n Error: " + error);
	}
};

// Highlight elements
export const highlightElementsAndCaptureScreenshot = async () => {
	// Removing existing highlighted elements
	unhighlightElements();
	
	const elementSelector = prompt("Enter the CSS selector of the elements you want to highlight:");
	const elements = document.querySelectorAll(elementSelector);
	
	if (elements.length > 0) {
		elements.forEach(element => element.classList.add(highlightClassName));
		elements[0].scrollIntoViewIfNeeded( { behavior: "scroll"} );
		
		// Capture screenshot of the viewport using html2canvas
		const canvas = await html2canvas(document.body, {
			width: window.innerWidth,
			height: window.innerHeight,
			x: window.scrollX,
			y: window.scrollY,
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight
		});
		
		// Converting the canvas to a blob
		canvas.toBlob(async function (blob) {
			try {
				await navigator.clipboard.write([
					new ClipboardItem({
						'image/png': blob
					})
				]);
				alert("Screenshot captured and copied to clipboard!");
			} catch (error) {
				alert("Failed to copy screenshot to clipboard: ", error);
			}
		});
	} else {
		alert("No elements found for the provided selector. Please try again.");
	}
};

// Function to unhighlight elements
const unhighlightElements = () => {
	const elements = document.querySelectorAll(`.${highlightClassName}`);
	
	elements.forEach(element => element.classList.remove(highlightClassName));
};
