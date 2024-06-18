document.addEventListener("DOMContentLoaded", function () {
	const steps = document.querySelectorAll(".steps");
	const progressionBar = document.querySelector(".progression-bar");
	const sections = document.querySelectorAll("[id^='accordion-id-']");
	const nodes = document.querySelectorAll(".node"); // Select all nodes

	const stepWidthIncrement = 100 / (steps.length - 1); // Calculate the increment for each step

	let currentStepIndex = 0; // Tracks the current active step index
	let progressionBarWidth = 0; // Initialize the progression bar width
	let previousProgressionWidth = 0; // Store the previous progression bar width

	// Function to adjust the progression bar width
	function adjustProgressionBarWidth() {
		progressionBar.style.width = `${progressionBarWidth}%`;
	}

	// Function to update the progression bar based on the current section
	function updateProgressionBar() {
		const windowHeight = window.innerHeight;
		let mostVisibleSectionIndex = 0; // Initialize to the first section
		let maxVisibleArea = 0; // Initialize to 0

		// Find the most visible section in the viewport
		sections.forEach((section, index) => {
			const sectionTop = section.getBoundingClientRect().top + 180;
			const sectionBottom = sectionTop + section.offsetHeight + 300;
			const visibleArea =
				Math.min(sectionBottom, windowHeight) - Math.max(sectionTop, 0);

			if (visibleArea > maxVisibleArea) {
				maxVisibleArea = visibleArea;
				mostVisibleSectionIndex = index;
			}
		});

		// Log all <a> tags within the most visible section

		// Calculate the progression bar width based on the most visible section index
		const newProgressionWidth =
			(mostVisibleSectionIndex / (sections.length - 1)) * 100;

		// Check if the most visible section has changed
		if (mostVisibleSectionIndex !== currentStepIndex) {
			previousProgressionWidth = progressionBarWidth;
			currentStepIndex = mostVisibleSectionIndex;
		}

		// Update the progression bar width only if it has changed
		if (newProgressionWidth !== progressionBarWidth) {
			progressionBarWidth = newProgressionWidth;
			adjustProgressionBarWidth();
		}
	}

	steps.forEach((step, index) => {
		step.addEventListener("click", function (e) {
			// e.preventDefault(); // Prevent the default anchor behavior
			const targetSection = sections[index];
			const offsetTop =
				targetSection.getBoundingClientRect().top + window.scrollY - 100; // Adjusted scroll position
			window.scrollTo({ top: offsetTop, behavior: "smooth" }); // Smoothly scroll to the clicked section
			currentStepIndex = index;
			console.log(`Step ${currentStepIndex + 1} clicked.`);
		});
	});

	// Event listener for scroll events to update the progression bar
	window.addEventListener("scroll", updateProgressionBar);

	// Sticky behavior code remains unchanged
	const timelineContainer = document.querySelector(".timeline-container");
	let stickyTriggerPoint =
		timelineContainer.getBoundingClientRect().top + window.scrollY;

	function scrollHandler() {
		if (window.scrollY > stickyTriggerPoint) {
			timelineContainer.classList.add("fixed-top");
		} else {
			timelineContainer.classList.remove("fixed-top");
		}
	}

	window.addEventListener("scroll", scrollHandler);

	// Additional logic for the button with aria-expanded="true" and media query
	const expandButton = document.querySelector('button[aria-expanded="true"]');
	if (expandButton && window.matchMedia("(min-width: 768px)").matches) {
		expandButton.addEventListener("click", function () {
			window.scrollTo({
				top: window.scrollY - 30,
				behavior: "smooth",
			});
		});
	}

	// Logic for handling window width less than or equal to 768px
	const buttons = document.querySelectorAll("button");
	const accordionPanels = document.querySelectorAll(".accordion-panel");
	if (window.matchMedia("(max-width: 768px)").matches) {
		buttons.forEach((button) => {
			button.setAttribute("aria-expanded", "false");
		});
		accordionPanels.forEach((panel) => {
			panel.setAttribute("hidden", "");
		});
	}

	updateProgressionBar(); // Update the progression bar initially
});
document.addEventListener("DOMContentLoaded", () => {
	const ids = [
		"accordion-id-1",
		"accordion-id-2",
		"accordion-id-3",
		"accordion-id-4",
	];
	const targets = ids
		.map((id) => document.getElementById(id))
		.filter((el) => el !== null);

	function getElementTopPosition(el) {
		let yPos = 0;
		while (el) {
			yPos += el.offsetTop - el.scrollTop + el.clientTop;
			el = el.offsetParent;
		}
		return yPos;
	}

	function changeStepElementBackground(stepId, color) {
		const stepElement = document.getElementById(stepId);
		if (stepElement) {
			stepElement.style.backgroundColor = color;
		}
	}

	function updateStepBackgrounds() {
		const scrollPosition = window.pageYOffset;
		let lastVisibleSectionIndex = null;

		targets.forEach((target, index) => {
			const targetPosition = getElementTopPosition(target);
			if (scrollPosition >= targetPosition - window.innerHeight) {
				lastVisibleSectionIndex = index;
			}
		});

		ids.forEach((id, index) => {
			const stepNumber = id.split("-").pop();
			if (
				index <= lastVisibleSectionIndex &&
				targets[index].getAttribute("aria-expanded") == "true"
			) {
				changeStepElementBackground(`inner-step-${stepNumber}`, "#ffb3006b");
			} else {
				changeStepElementBackground(`inner-step-${stepNumber}`, "white");
			}
		});
	}

	function toggleAccordion(targetId) {
		const button = document.getElementById(targetId);
		if (!button) return;

		const isExpanded = button.getAttribute("aria-expanded") === "true";
		button.setAttribute("aria-expanded", !isExpanded);

		const section = document.querySelector(
			`section[aria-labelledby="${targetId}"]`
		);
		if (section) {
			if (isExpanded) {
				section.setAttribute("hidden", "");
			} else {
				section.removeAttribute("hidden");
			}
		}

		// After toggling, update backgrounds to reflect the new state
		updateStepBackgrounds();
	}

	document.querySelectorAll(".steps").forEach((step) => {
		step.addEventListener("click", (event) => {
			// event.preventDefault();
			const targetId = event.target.getAttribute("href").substring(1);
			toggleAccordion(targetId);
		});
	});

	if (targets.length > 0) {
		window.addEventListener("scroll", updateStepBackgrounds);
		updateStepBackgrounds(); // Initial update
	} else {
		console.log("No target elements found");
	}
});
document.addEventListener("DOMContentLoaded", () => {
	// Select all anchor tags within the specified list
	const links = document.querySelectorAll(".list-theme-a a");

	links.forEach((link) => {
		link.addEventListener("click", (event) => {
			// Prevent the default anchor link behavior
			// event.preventDefault();

			// Get the target element's ID from the href attribute
			const targetId = link.getAttribute("href").substring(1); // Remove the '#' prefix
			const targetElement = document.getElementById(targetId);

			if (targetElement) {
				// Calculate the position to scroll to, which is 100px above the element
				const yOffset = -170; // Offset value
				const y =
					targetElement.getBoundingClientRect().top +
					window.pageYOffset +
					yOffset;

				// Scroll to the target position
				window.scrollTo({ top: y, behavior: "smooth" });
			}
		});
	});
});
document.addEventListener("DOMContentLoaded", (event) => {
	document.querySelectorAll(".timeline > ul > li a.node").forEach((link) => {
		link.removeAttribute("href");
	});
});
