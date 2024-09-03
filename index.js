import {highlightAndCaptureInit, highlightElementsAndCaptureScreenshot} from "./highlightAndCapture.js";
import {toggleHighlight, getElementVisibilityDetails, highlightInit} from "./highlight.js";
import {toggleHeadings} from "./heading.js";
import {toggleLists} from "./list.js";
import {toggleTables} from "./table.js";
import {toggleLandmarks} from "./landmark.js";
import {toggleForms} from "./form.js";
import {linkHighlightInit, toggleLinks} from "./link.js";

try {
	const app = (() => {
		// Display initial instructions
		const displayInstructions = () => {
		const initialInstruction = 
			"Welcome! Below are the features and their corresponding keyboard commands:\n" +
			"1. Toggle highlight mode: 'Alt + 2'\n" +
			"2. Get visibility details of highlighted elements: 'Alt + Shift + 2'\n" +
			"3. Toggle heading visibility: 'Alt + 3'\n" +
			"4. Toggle list visibility: 'Alt + 4'\n" +
			"5. Toggle table visibility: 'Alt + 5'\n" +
			"6. Toggle landmark visibility: 'Alt + 6'\n" +
			"7. Toggle form visibility: 'Alt + 7'\n" +
			"8. Toggle link visibility: 'Alt + 8'\n" +
			"9. View keyboard commands: 'Alt + 0'\n";
		prompt("", initialInstruction);
		};
		
		// Add event listener to the document body to handle keypresses
		const setupEventListeners = () => {
			document.body.addEventListener("keydown", (event) => {
				if (event.altKey && event.code === 'Digit0') {
					displayInstructions()
				}
				else if (event.altKey && event.code === 'Digit1') {
					highlightElementsAndCaptureScreenshot();
				}
				else if (event.altKey && event.shiftKey===false && event.code === 'Digit2') {
					toggleHighlight();
				}
				else if (event.altKey && event.shiftKey && event.code === 'Digit2') {
					getElementVisibilityDetails();
				}
				else if (event.altKey && event.code === 'Digit3') {
					toggleHeadings();
				}
				else if (event.altKey && event.code === 'Digit4') {
					toggleLists();
				}
				else if (event.altKey && event.code === 'Digit5') {
					toggleTables();
				}
				else if (event.altKey && event.code === 'Digit6') {
					toggleLandmarks();
				}
				else if (event.altKey && event.code === 'Digit7') {
					toggleForms();
				}
				else if (event.altKey && event.code === 'Digit8') {
					toggleLinks();
				}
			});
		};

		// Initialize the application
		const init = () => {
			displayInstructions();
			setupEventListeners();
			highlightInit();
			linkHighlightInit();
			highlightAndCaptureInit();
		};

		return { init };
	})();

	app.init();

} catch (error) {
	console.error("An error occurred:", error);
	alert("An error occurred while executing the script.\n" + error.message);
}

