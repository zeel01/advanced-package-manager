class AdvancedPackageManager extends ModuleManagement {
	/** @override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			template: "modules/advanced-package-manager/module-management.html",
			width: 1175,
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

Hooks.once("ready", () => {
	new AdvancedPackageManager().render(true);
});

Hooks.on("renderAdvancedPackageManager", (manager, html, data) => {
	console.debug(manager);
	console.debug(html);
	console.debug(data);
});