// Carousel

// Accordions component
// Todo: add data to a json file.

class Accordions {
	constructor(domNode) {
		// Reference default variables
		this.rootEl = domNode;
		this.toggleAll = this.rootEl.querySelector('[data-action="toggleAll"]');
		this.panelsButton = this.rootEl.querySelectorAll(".panel-trigger");
		this.panels = this.rootEl.querySelectorAll(".accordion-panel");

		const lang = document.documentElement.lang || "fr"; // Default to English if language not specified
		if (lang === "en") {
			this.dataText = ["Open all panels", "Close all panels"];
		} else if (lang === "fr") {
			this.dataText = ["Ouvrir tous les panneaux", "Fermer tous les panneaux"];
		}

		this.isAllOpen = false;

		// Bind events
		this.toggleAll.addEventListener("click", () => {
			this.toggleAllPanel();
		});

		this.panelsButton.forEach((button) => {
			button.addEventListener("click", () => {
				this.toggle(button);
			});
		});
	}

	toggleAllPanel() {
		if (!this.isAllOpen) {
			this.toggleAll.textContent = this.dataText[1];
			this.isAllOpen = true;

			this.panelsButton.forEach((button) => {
				const panelID = button.getAttribute("aria-controls");
				const panel = this.rootEl.querySelector(`#${panelID}`);

				this.openPanel(button, panel);
			});
		} else {
			this.toggleAll.textContent = this.dataText[0];
			this.isAllOpen = false;

			this.panelsButton.forEach((button) => {
				const panelID = button.getAttribute("aria-controls");
				const panel = this.rootEl.querySelector(`#${panelID}`);

				this.closePanel(button, panel);
			});
		}
	}

	toggle(button) {
		const panelID = button.getAttribute("aria-controls");
		const panel = this.rootEl.querySelector(`#${panelID}`);
		let state = button.getAttribute("aria-expanded");

		state === "false"
			? this.openPanel(button, panel)
			: this.closePanel(button, panel);

		//
		this.updateState();
	}

	openPanel(button, panel) {
		console.log("open panel");

		button.setAttribute("aria-expanded", "true");
		panel.removeAttribute("hidden");
	}

	closePanel(button, panel) {
		console.log("close panel");

		button.setAttribute("aria-expanded", "false");
		panel.setAttribute("hidden", "hidden");
	}

	updateState() {
		let allClosed = true;

		// Check if any panel is open
		for (let i = 0; i < this.panelsButton.length; i++) {
			const button = this.panelsButton[i];
			const state = button.getAttribute("aria-expanded");
			if (state === "true") {
				allClosed = false;
				break;
			}
		}

		// Update toggleAll button text based on the state
		if (allClosed) {
			this.toggleAll.textContent = this.dataText[0];
			this.isAllOpen = false;
		} else {
			this.toggleAll.textContent = this.dataText[1];
			this.isAllOpen = true;
		}
	}
}

// init accordions
const accordions = document.querySelectorAll('[data-component="accordions"]');
accordions.forEach((accordion) => {
	new Accordions(accordion);
});
