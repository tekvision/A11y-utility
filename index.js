try {
    const app = (() => {
        let highlightElement = false;
        let isHeadingHighlighted = false;
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

        // Function to add headings with <strong> tags
        const addHeadings = () => {
            removeHeadings();

            const headings = [
                { tag: 'h1', label: 'h1' },
                { tag: 'h2', label: 'h2' },
                { tag: 'h3', label: 'h3' },
                { tag: 'h4', label: 'h4' },
                { tag: 'h5', label: 'h5' },
                { tag: 'h6', label: 'h6' }
            ];

            // Adding role="heading" and aria-level="1" to "6"
            for (let i = 1; i <= 6; i++) {
                const selector = `[role="heading"][aria-level="${i}"]`;
                headings.push({
                    tag: selector,
                    label: selector.replace(/["']/g, '') // Remove quotes
                });
            }

            const tagStyle = 'color:black; font-family:sans-serif; font-weight:bold; font-size:small; background-color:yellow;'; // Scoped style variable

            headings.forEach(({ tag, label }) => {
                document.querySelectorAll(tag).forEach(el => {
                    const openTag = document.createElement('strong');
                    openTag.className = 'openSpan';
                    openTag.style.cssText = tagStyle; // Apply scoped style
                    openTag.textContent = `<${label}>`;

                    const closeTag = document.createElement('strong');
                    closeTag.className = 'closeSpan';
                    closeTag.style.cssText = tagStyle; // Apply scoped style
                    closeTag.textContent = `</${label}>`;

                    el.prepend(openTag);
                    el.append(closeTag);
                });
            });
        };

        // Function to remove headings with <strong> tags
        const removeHeadings = () => {
            document.querySelectorAll("strong.openSpan, strong.closeSpan").forEach(el => el.remove());
        };

        // Function to toggle heading visibility
        const toggleHeadings = () => {
            if (isHeadingHighlighted) {
                removeHeadings();
            } else {
                addHeadings();
            }
            isHeadingHighlighted = !isHeadingHighlighted;
            alert("Headings toggled.");
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
