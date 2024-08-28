let highlightElement = false;
const highlightClassName = "highlight-tekvision";
const highlightStyle = "outline: 5px solid red";

export highlightInit = () => {
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
        
        // Toggle highlight mode
        export const toggleHighlight = () => {
            highlightElement = !highlightElement;
            highlightElement ? highlightElements() : unhighlightElements();
        };

