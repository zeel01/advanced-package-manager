class AdvancedPackageManager extends ModuleManagement {
	/** @override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			template: "modules/advanced-package-manager/module-management.html",
			width: 1000
		});
	}

	async getData() {
		const data = super.getData();

		this.prepareIcons(data);

		return data;
	}

	prepareIcons(data) {
		for (let module of data.modules) {
			if (!module.media) continue;
			for (let media of module.media) {
				if (media.type != "icon") continue;
				module.icon = media.url;
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