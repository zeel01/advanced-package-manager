class AdvancedPackageManager extends ModuleManagement {
	/** @override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			template: "modules/advanced-package-manager/module-management.html",
		});
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