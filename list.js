let isListHighlighted = false;

const addLists = () => {
	removeLists();

	const lists = [
		{ tag: 'ul', label: 'ul' },
		{ tag: 'ol', label: 'ol' },
		{ tag: 'dl', label: 'dl' },
		{ tag: 'li', label: 'li' },
		{ tag: 'dd', label: 'dd' },
		{ tag: 'dt', label: 'dt' }
	];

	const tagStyle = 'color:black; font-family:sans-serif; font-weight:bold; font-size:small; background-color:yellow;';

	lists.forEach(({ tag, label }) => {
		document.querySelectorAll(tag).forEach(el => {
			// Create and style the opening tag
			const openTag = document.createElement('strong');
			openTag.className = 'openSpan';
			openTag.style.cssText = tagStyle;
			openTag.textContent = `<${label}>`;

			// Create and style the closing tag
			const closeTag = document.createElement('strong');
			closeTag.className = 'closeSpan';
			closeTag.style.cssText = tagStyle;
			closeTag.textContent = `</${label}>`;

			// Insert tags before and after the list element
			el.insertAdjacentElement('afterbegin', openTag);
			el.insertAdjacentElement('beforeend', closeTag);
		});
	});

	// Highlight <p> elements inside <ul> and <ol>
	document.querySelectorAll('ul, ol').forEach(parent => {
		parent.querySelectorAll('p').forEach(p => {
			p.style.outline = '2px solid red';
			p.parentElement.style.outline = '2px solid red';
			p.parentElement.insertAdjacentHTML('afterbegin', '<strong class="openSpan" style="color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;">❌ NO CHILD LI</strong>');
		});
	});

	// Add additional styling to lists
	document.querySelectorAll('ul, ol, dl').forEach(el => {
		el.style.outline = 'green 2px solid';
		el.style.padding = '2px';
		el.style.listStylePosition = 'inside';
	});
};

// Function to remove lists with <strong> tags
const removeLists = () => {
	document.querySelectorAll("strong.openSpan, strong.closeSpan").forEach(el => el.remove());
};

// Function to toggle list visibility
export const toggleLists = () => {
	if (isListHighlighted) {
		removeLists();
		alert("List Markers Removed.");
	} else {
		addLists();
		alert("List Markers Added.");
	}
	isListHighlighted = !isListHighlighted;
};
