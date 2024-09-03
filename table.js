let isTableHighlighted = false;

const addTables = () => {
	removeTables();

	const tagStyle = 'color:black; font-family:sans-serif; font-weight:bold; font-size:small; background-color:yellow; z-index:2147483647; speak:literal-punctuation;';
	const outlineStyle = 'outline:2px solid olive;';
	const captionStyle = 'outline:green 2px solid; padding:2px;';
	const thStyle = 'outline:green 2px solid; padding:2px;';
	const tdStyle = 'outline:orange 2px dashed; padding:2px;';
	const errorStyle = 'outline:red 2px dotted; padding:2px;';
	
	// Process <caption> elements
	document.querySelectorAll('caption').forEach(caption => {
		caption.style.cssText = captionStyle;
		caption.insertAdjacentHTML('afterbegin', `<span class="openSpan" style="${tagStyle}">&lt;caption&gt;🎓</span>`);
		caption.insertAdjacentHTML('beforeend', `<span class="closeSpan" style="${tagStyle}">&lt;/caption&gt;</span>`);
	});

	// Process <th> elements
	document.querySelectorAll('th').forEach(th => {
		th.style.cssText = thStyle;
		let content = '';
		const scope = th.getAttribute('scope');
		const id = th.getAttribute('id');
		const role = th.getAttribute('role');
		const headers = th.getAttribute('headers');

		if (scope) {
			content = scope === 'row' ? `♿scope="row"🚣` : `♿scope="col"👇`;
			content += id ? ` id="${id}"` : '';
		} else if (role) {
			content = `♿scope="${scope}" ♿role="${role}"`;
		} else {
			content = scope === 'row' ? '♿scope="row"🚣' : '♿scope="col"👇';
		}
		th.insertAdjacentHTML('afterbegin', `<span class="closeSpan" style="${tagStyle}">&lt;th${content}&gt;</span>`);
	});

	// Process <td> elements
	document.querySelectorAll('td').forEach(td => {
		td.style.cssText = tdStyle;
		let content = '';
		const headers = td.getAttribute('headers');
		const role = td.getAttribute('role');
		
		if (headers) {
			content = `♿headers="${headers}"`;
			content += role ? `♿role="${role}"` : '';
		} else if (role) {
			content = `♿role="${role}"`;
		} else {
			content = '';
		}
		td.insertAdjacentHTML('afterbegin', `<span class="closeSpan" style="${tagStyle}">&lt;td${content}&gt;</span>`);
	});

	// Process <table> elements
	document.querySelectorAll('table').forEach(table => {
		const summary = table.getAttribute('summary');
		const ariaLabel = table.getAttribute('aria-label');
		const ariaLabelledby = table.getAttribute('aria-labelledby');

		let content = '';
		if (summary) {
			content = `♿summary="${summary}"`;
		} else if (ariaLabel) {
			content = `♿aria-label="${ariaLabel}"`;
		} else if (ariaLabelledby) {
			content = `♿aria-labelledby="${ariaLabelledby}"`;
			const labelledbyArray = ariaLabelledby.split(' ');
			labelledbyArray.forEach(id => {
				const element = document.getElementById(id);
				if (element) {
					element.style.cssText = errorStyle;
					element.insertAdjacentHTML('afterbegin', `<span class="inputSpan" style="${tagStyle}">id="${id}"</span>`);
				}
			});
		} else if (table.getAttribute('role') === 'presentation') {
			content = `♿role="${table.getAttribute('role')}"`;
		}
		table.insertAdjacentHTML('beforebegin', `<span class="closeSpan" style="${tagStyle}">&lt;table${content}&gt;</span>`);
	});

	// Process [role=grid] elements
	document.querySelectorAll('[role=grid]').forEach(grid => {
		const role = grid.getAttribute('role');
		const ariaReadonly = grid.getAttribute('aria-readonly');
		const ariaLabel = grid.getAttribute('aria-label');
		const ariaLabelledby = grid.getAttribute('aria-labelledby');

		let content = `♿role="${role}"`;
		if (ariaReadonly) {
			content += `♿aria-readonly="${ariaReadonly}"`;
		}
		if (ariaLabel) {
			content += `♿aria-label="${ariaLabel}"`;
		}
		if (ariaLabelledby) {
			content += `♿aria-labelledby="${ariaLabelledby}"`;
		}
		grid.insertAdjacentHTML('beforebegin', `<span class="closeSpan" style="${tagStyle}">${content}</span>`);
	});

	// Process [role] on <tr>
	document.querySelectorAll('tr[role]').forEach(tr => {
		tr.insertAdjacentHTML('beforebegin', `<span class="closeSpan" style="${tagStyle}">&lt;tr♿role="${tr.getAttribute('role')}"&gt;</span>`);
	});

	// Check for missing IDs
	document.querySelectorAll('td[headers], th[headers]').forEach(elem => {
		const describedbyValue = elem.getAttribute('headers');
		const describedbyArray = describedbyValue.split(' ');
		describedbyArray.forEach(id => {
			if (!document.getElementById(id)) {
				elem.style.cssText = errorStyle;
				elem.insertAdjacentHTML('beforeend', `<span class="closeSpan" style="${tagStyle}">❌NO ID MATCH</span>`);
			}
		});
	});

	// Notification of success or failure
	if (!document.querySelectorAll('table').length) {
		const failure = document.createElement('strong');
		failure.id = 'failure';
		failure.role = 'status';
		failure.style.cssText = 'color:black; font-weight:bold; font-family:sans-serif; font-size:small; background-color:yellow; margin:0 2px; padding:2px;';
		failure.textContent = 'No Tables Found on Page: ' + document.title;
		document.body.insertAdjacentElement('afterbegin', failure);
		setTimeout(() => failure.remove(), 6000);
	} else {
		const success = document.createElement('div');
		success.id = 'success';
		success.role = 'alert';
		success.style.cssText = 'position:absolute; width:0; height:0; clip: rect(0,0,0,0);';
		success.textContent = 'Success! Tables Found on Page: ' + document.title;
		document.body.insertAdjacentElement('beforeend', success);
		setTimeout(() => success.remove(), 3000);
	}
};

// Function to remove tables with <span> tags
const removeTables = () => {
	document.querySelectorAll('span.openSpan, span.closeSpan, span.inputSpan').forEach(span => span.remove());
};

// Function to toggle table highlighting
export const toggleTables = () => {
	if (isTableHighlighted) {
		removeTables();
		alert("Table Markers Removed.");
	} else {
		addTables();
		alert("Table Markers Added.");
	}
	isTableHighlighted = !isTableHighlighted;
};
