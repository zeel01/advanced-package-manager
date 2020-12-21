class AdvancedPackageManager extends ModuleManagement {
	static get namespace() { return "advanced-package-manager"; }
	static registerSettings() {
		game.settings.register(AdvancedPackageManager.namespace, "application-width", {
			name: "application-width",
			scope: "client",
			config: false,
			type: String,
			default: "1175"
		});
		game.settings.register(AdvancedPackageManager.namespace, "application-height", {
			name: "application-height",
			scope: "client",
			config: false,
			type: String,
			default: "auto"
		});
	}

	constructor(...args) {
		super(...args);

		//
	}
	
	/** @override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			template: "modules/advanced-package-manager/module-management.html",
			width: game.settings.get(AdvancedPackageManager.namespace, "application-width"),
			height: "auto", //game.settings.get(AdvancedPackageManager.namespace, "application-height"),
			resizable: true
		});
	}

	async getData() {
		const data = super.getData();

		await this.prepareSVGs();
		this.prepareIcons(data);
		this.prepareAuthors(data);

		return data;
	}
	async _onResize() {
		await game.settings.set(
			this.constructor.namespace,
			"application-width",
			this.position.width
		);
		await game.settings.set(
			this.constructor.namespace,
			"application-height",
			this.position.height
		);
	}

	async prepareSVGs() {
		await loadTemplates([
			"modules/advanced-package-manager/assets/cardboard-box.hbs",
			"modules/advanced-package-manager/assets/cardboard-box-closed.hbs"
		]);
	}
	
	prepareAuthors(data) {
		for (let module of data.modules) {
			if (module.authors?.length) continue;
			module.authors = [
				{ "name": module.author }
			];
		}
	}
	prepareIcons(data) {
		for (let module of data.modules) {
			if (!module.media) continue;
			for (let media of module.media) {
				if (media.type != "icon") continue;
				module.icon = media.url || media.link;
				break;
			}
		}
	}
}


Hooks.once("init", AdvancedPackageManager.registerSettings);

/******************************************************************/

Hooks.once("ready", () => {
	new AdvancedPackageManager().render(true);
});

Hooks.on("renderAdvancedPackageManager", (manager, html, data) => {
	console.debug(manager);
	console.debug(html);
	console.debug(data);
});