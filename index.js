import {toggleHeadings} from "./heading.js";

try {
    const app = (() => {
        let highlightElement = false;
        
        const highlightClassName = "highlight-tekvision";
        const highlightStyle = "outline: 5px solid red";

        // Create and append the style element for the highlight class
        const styleElementWithHighlightClass = document.createElement("style");
        styleElementWithHighlightClass.innerHTML = `.${highlightClassName} { ${highlightStyle} !important; }`;
        document.head.appendChild(styleElementWithHighlightClass);

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

        // Toggle highlight mode
        const toggleHighlight = () => {
            highlightElement = !highlightElement;
            highlightElement ? highlightElements() : unhighlightElements();
        };

        // Highlight elements
        const highlightElements = () => {
            const elementSelector = prompt("Enter the CSS selector of the elements you want to highlight:");
            const elements = document.querySelectorAll(elementSelector);
            
            if (elements.length > 0) {
                elements.forEach(element => element.classList.add(highlightClassName));
                alert(`Successfully highlighted ${elements.length} element(s).`);
            } else {
                alert("No elements found for the provided selector. Please try again.");
                highlightElement = false;
            }
        };

        // Unhighlight elements
        const unhighlightElements = () => {
            const elements = document.querySelectorAll(`.${highlightClassName}`);
            elements.forEach(element => element.classList.remove(highlightClassName));
            alert("Highlight removed from all elements.");
        };

        
        // Initialize the application
        const init = () => {
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
