let isLandmarkHighlighted = false;

const highlightLandmarks = () => {
	removeHighlights();
	
	const landmarks = [
		{ tag: '[role=main]', label: 'role="main"' },
		{ tag: '[role=search]', label: 'role="search"' },
		{ tag: '[role=contentinfo]', label: 'role="contentinfo"' },
		{ tag: '[role=banner]', label: 'role="banner"' },
		{ tag: '[role=navigation]', label: 'role="navigation"' },
		{ tag: '[role=complementary]', label: 'role="complementary"' },
		{ tag: '[role=application]', label: 'role="application"' }
	];
	
	const sections = [
		{ tag: 'main', label: '<main>' },
		{ tag: 'banner', label: '<banner>' },
		{ tag: 'footer', label: '<footer>' },
		{ tag: 'header', label: '<header>' },
		{ tag: 'aside', label: '<aside>' },
		{ tag: 'nav', label: '<nav>' }
	];
	
	const spanStyle = 'outline:green 2px solid;padding:1px;color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;position:relative;line-height:100%;z-index:2147483647;';
	const elementStyle = 'outline:green 2px solid;padding:2px;';
	
	landmarks.forEach(({ tag, label }) => {
		document.querySelectorAll(tag).forEach(el => {
			el.setAttribute('style', elementStyle);
			const span = document.createElement('span');
			span.className = 'axSpan';
			span.style.cssText = spanStyle;
			span.textContent = label;
			el.before(span);
		});
	});
	
	sections.forEach(({ tag, label }) => {
		document.querySelectorAll(tag).forEach(el => {
			el.setAttribute('style', elementStyle);
			const span = document.createElement('span');
			span.className = 'axSpan';
			span.style.cssText = spanStyle;
			span.textContent = label;
			el.before(span);
		});
	});
	
	if (!document.querySelectorAll(landmarks.map(l => l.tag).join(',')).length) {
		const failure = document.createElement('strong');
		failure.id = 'failure';
		failure.setAttribute('role', 'status');
		failure.style.cssText = 'color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;margin:0 2px; padding:2px;';
		failure.textContent = 'No Landmarks Found on Page: ' + document.title;
		document.body.prepend(failure);
		setTimeout(() => failure.remove(), 6000);
	} else {
		const success = document.createElement('div');
		success.id = 'success';
		success.setAttribute('role', 'alert');
		success.style.cssText = 'position:absolute; width:0; height:0; clip: rect(0,0,0,0);';
		success.textContent = 'Success! Landmarks Found on Page: ' + document.title;
		document.body.appendChild(success);
		setTimeout(() => success.remove(), 3000);
	}
};

const removeHighlights = () => {
	document.querySelectorAll("span.axSpan").forEach(el => el.remove());
	const successMessage = document.getElementById("success");
	if (successMessage) successMessage.remove();
};

export const toggleLandmarks = () => {
	if (isLandmarkHighlighted) {
		removeHighlights();
		alert("Landmark Markers Removed.");
	} else {
		highlightLandmarks();
		alert("Landmark Markers Added.");
	}
	isLandmarkHighlighted = !isLandmarkHighlighted;
};
