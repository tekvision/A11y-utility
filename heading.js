let isHeadingHighlighted = false;

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
        export const toggleHeadings = () => {
            if (isHeadingHighlighted) {
                removeHeadings();
            } else {
                addHeadings();
            }
            isHeadingHighlighted = !isHeadingHighlighted;
            alert("Headings toggled.");
        };
