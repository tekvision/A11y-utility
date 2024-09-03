let isFormHighlighted = false;

const addFormHighlights = () => {
	removeFormHighlights();

	const inputs = Array.from(document.querySelectorAll('input, textarea, select')).filter(input =>
		!['hidden', 'button', 'submit', 'reset'].includes(input.type)
	);

	const tagStyle = 'padding:1px;color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;z-index:2147483647;'; // Scoped style variable

	inputs.forEach(input => {
		input.style.outline = '2px solid green';
		input.style.padding = '2px';

		const label = document.querySelector(`label[for="${input.id}"]`);
		let wrappedLabel;

		if (!label) {
			input.style.outline = '2px dotted red';
			const parentElem = input.parentElement;
			const parentTagName = parentElem.tagName.toLowerCase();

			if (parentTagName === 'label') {
				input.style.outline = '2px solid green';
				wrappedLabel = parentElem;
			}
		}

		if (!input.id) {
			const span = document.createElement('span');
			span.className = 'inputSpan';
			span.style.cssText = tagStyle + 'outline:red 2px dotted;';
			span.textContent = '<input NO ID>';
			input.before(span);
			input.style.outline = '2px dotted red';
		} else {
			const span = document.createElement('span');
			span.className = 'inputSpan';
			span.style.cssText = tagStyle;
			span.textContent = `<input 🆔="${input.id}">`;
			input.before(span);
		}

		if (label) {
			const openSpan = document.createElement('span');
			openSpan.className = 'openSpan';
			openSpan.style.cssText = tagStyle;
			openSpan.textContent = `<label 🍀="${input.id}">`;
			label.prepend(openSpan);

			const closeSpan = document.createElement('span');
			closeSpan.className = 'closeSpan';
			closeSpan.style.cssText = tagStyle;
			closeSpan.textContent = `</label>`;
			label.append(closeSpan);
		}

		if (wrappedLabel) {
			const openSpan = document.createElement('span');
			openSpan.className = 'openSpan';
			openSpan.style.cssText = tagStyle;
			openSpan.textContent = `<label 🎁>`;
			wrappedLabel.prepend(openSpan);

			const closeSpan = document.createElement('span');
			closeSpan.className = 'closeSpan';
			closeSpan.style.cssText = tagStyle;
			closeSpan.textContent = `</label>`;
			wrappedLabel.append(closeSpan);
			wrappedLabel.style.outline = '2px solid green';
		}

		if (input.title) {
			const span = document.createElement('span');
			span.className = 'closeSpan';
			span.style.cssText = tagStyle + 'outline:dashed 2px orange;';
			span.textContent = `♿title="${input.title}"`;
			input.after(span);
		}

		if (input.getAttribute('aria-label')) {
			const span = document.createElement('span');
			span.className = 'closeSpan';
			span.style.cssText = tagStyle + 'margin:0 2px; padding:2px;';
			span.textContent = `♿aria-label="${input.getAttribute('aria-label')}"`;
			input.after(span);
		}

		if (input.getAttribute('aria-describedby')) {
			const span = document.createElement('span');
			span.className = 'closeSpan';
			span.style.cssText = tagStyle + 'margin:0 2px; padding:2px;';
			span.textContent = `♿aria-describedby="${input.getAttribute('aria-describedby')}"`;
			input.after(span);

			const describedbyArray = input.getAttribute('aria-describedby').split(' ');
			describedbyArray.forEach(id => {
				const describedby = document.getElementById(id);
				if (describedby) {
					describedby.style.outline = '2px solid green';
					const span = document.createElement('span');
					span.className = 'inputSpan';
					span.style.cssText = tagStyle;
					span.textContent = `🆔="${id}"`;
					describedby.prepend(span);
				}
			});
		}

		if (input.getAttribute('aria-labelledby')) {
			const span = document.createElement('span');
			span.className = 'closeSpan';
			span.style.cssText = tagStyle + 'margin:0 2px; padding:2px;';
			span.textContent = `♿aria-labelledby="${input.getAttribute('aria-labelledby')}"`;
			input.after(span);

			const labelledbyArray = input.getAttribute('aria-labelledby').split(' ');
			labelledbyArray.forEach(id => {
				const labelledby = document.getElementById(id);
				if (labelledby) {
					labelledby.style.outline = '2px solid green';
					const span = document.createElement('span');
					span.className = 'inputSpan';
					span.style.cssText = tagStyle;
					span.textContent = `🆔="${id}"`;
					labelledby.prepend(span);
				}
			});
		}

		if (input.getAttribute('aria-required')) {
			const span = document.createElement('span');
			span.className = 'closeSpan';
			span.style.cssText = tagStyle + 'margin:0 2px; padding:2px;';
			span.textContent = `⚠️aria-required="${input.getAttribute('aria-required')}"`;
			input.after(span);
		}

		if (input.getAttribute('aria-invalid')) {
			const span = document.createElement('span');
			span.className = 'closeSpan';
			span.style.cssText = tagStyle + 'margin:0 2px; padding:2px;';
			span.textContent = `❌aria-invalid="${input.getAttribute('aria-invalid')}"`;
			input.after(span);
		}
	});

	document.querySelectorAll('label').forEach(label => {
		const forAttr = label.getAttribute('for');
		if (forAttr) {
			const associatedInput = document.getElementById(forAttr);
			if (!associatedInput) {
				label.style.outline = '2px dotted red';
				const openSpan = document.createElement('span');
				openSpan.className = 'openSpan';
				openSpan.style.cssText = tagStyle;
				openSpan.textContent = '<label❌NO ID MATCH>';
				label.prepend(openSpan);

				const closeSpan = document.createElement('span');
				closeSpan.className = 'closeSpan';
				closeSpan.style.cssText = tagStyle;
				closeSpan.textContent = '</label>';
				label.append(closeSpan);
			}
		}
	});

	document.querySelectorAll('[aria-describedby]').forEach(element => {
		const describedbyArray = element.getAttribute('aria-describedby').split(' ');
		describedbyArray.forEach(id => {
			if (!document.getElementById(id)) {
				element.style.outline = '2px dotted red';
				const span = document.createElement('span');
				span.className = 'closeSpan';
				span.style.cssText = tagStyle;
				span.textContent = '❌NO ID MATCH';
				element.after(span);
			}
		});
	});

	document.querySelectorAll('[aria-labelledby]').forEach(element => {
		const labelledbyArray = element.getAttribute('aria-labelledby').split(' ');
		labelledbyArray.forEach(id => {
			if (!document.getElementById(id)) {
				element.style.outline = '2px dotted red';
				const span = document.createElement('span');
				span.className = 'closeSpan';
				span.style.cssText = tagStyle;
				span.textContent = '❌NO ID MATCH';
				element.after(span);
			}
		});
	});

	document.querySelectorAll('legend').forEach(legend => {
		legend.style.outline = '2px solid green';
		const openSpan = document.createElement('span');
		openSpan.className = 'openSpan';
		openSpan.style.cssText = tagStyle;
		openSpan.textContent = '<legend>👍';
		legend.prepend(openSpan);

		const closeSpan = document.createElement('span');
		closeSpan.className = 'closeSpan';
		closeSpan.style.cssText = tagStyle;
		closeSpan.textContent = '</legend>';
		legend.append(closeSpan);
	});

	document.querySelectorAll('fieldset').forEach(fieldset => {
		const openSpan = document.createElement('span');
		openSpan.className = 'openSpan';
		openSpan.style.cssText = tagStyle;
		openSpan.textContent = '<fieldset>';
		fieldset.before(openSpan);

		const closeSpan = document.createElement('span');
		closeSpan.className = 'closeSpan';
		closeSpan.style.cssText = tagStyle;
		closeSpan.textContent = '</fieldset>';
		fieldset.after(closeSpan);
	});

	if (inputs.length === 0) {
		const failureMessage = document.createElement('strong');
		failureMessage.id = 'failure';
		failureMessage.role = 'status';
		failureMessage.style.cssText = 'color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;margin:0 2px; padding:2px;';
		failureMessage.textContent = `No Forms Found on Page: ${document.title}`;
		document.body.prepend(failureMessage);
		setTimeout(() => failureMessage.remove(), 6000);
	} else {
		const successMessage = document.createElement('div');
		successMessage.id = 'success';
		successMessage.role = 'status';
		successMessage.style.cssText = 'color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;margin:0 2px; padding:2px;';
		successMessage.textContent = `Forms Highlighted: ${inputs.length}`;
		document.body.prepend(successMessage);
		setTimeout(() => successMessage.remove(), 3000);
	}
	
	isFormHighlighted = true;
};

const removeFormHighlights = () => {
	document.querySelectorAll('.inputSpan, .openSpan, .closeSpan').forEach(span => span.remove());
	document.querySelectorAll('input, textarea, select, label, fieldset, legend').forEach(element => {
		element.style.outline = '';
		element.style.padding = '';
	});

	const statusElement = document.getElementById('failure') || document.getElementById('success');
	if (statusElement) statusElement.remove();

	isFormHighlighted = false;
};

export const toggleForms = () => {
	if (isFormHighlighted) {
		removeFormHighlights();
		alert("Form Markers Removed.");
	} else {
		addFormHighlights();
		alert("Form Markers Added.");
	}
};

