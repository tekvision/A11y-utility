import {toggleHeadings} from "./heading.js";
import {toggleHighlight, highlightInit} from "./highlight.js";

try {
    const app = (() => {
        // Display initial instructions
        const displayInstructions = () => {
            const initialInstruction = "Welcome! Press 'Alt + 2' to toggle the highlight mode on or off.\n" +
                                       "Press 'Alt + 3' to toggle heading visibility.";
            alert(initialInstruction);
        };

        // Add event listener to the document body to handle keypresses
        const setupEventListeners = () => {
            document.body.addEventListener("keydown", (event) => {
                if (event.altKey && event.code === 'Digit2') {
                    toggleHighlight();
                } else if (event.altKey && event.code === 'Digit3') {
                    toggleHeadings();
                }
            });
        };

        // Initialize the application
        const init = () => {
            highlightInit();
            displayInstructions();
            setupEventListeners();
        };

        return { init };
    })();

    app.init();

} catch (error) {
    console.error("An error occurred:", error);
    alert("An error occurred while executing the script.\n" + error.message);
}
