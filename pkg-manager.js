class AdvancedPackageManager extends ModuleManagement {
	/** @type {string} */
	static get namespace() { return "advanced-package-manager"; }

	/**
	 * Registers game settings for this module.
	 *
	 * Registers a setting for application width, and for height.
	 *
	 * @static
	 * @memberof AdvancedPackageManager
	 */
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
	
	
	/**
	 * This object contains the initial options for the application.
	 *
	 * They may be overridden by options passed to the constructor.
	 *
	 * @override
	 * @readonly
	 * @static
	 * @memberof AdvancedPackageManager
	 */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			template: "modules/advanced-package-manager/module-management.html",
			width: game.settings.get(AdvancedPackageManager.namespace, "application-width"),
			height: "auto", //game.settings.get(AdvancedPackageManager.namespace, "application-height"),
			resizable: true
		});
	}

	/**
	 * Produces an object of data that will be passed
	 * to the application template.
	 *
	 * @return {object} The data for rendering the template.
	 * @memberof AdvancedPackageManager
	 */
	async getData() {
		const data = super.getData();

		await this.prepareSVGs();
		this.prepareIcons(data);
		this.prepareAuthors(data);

		return data;
	}

	/**
	 * This method is called when the resize handle is
	 * used to adjust the size of the application.
	 *
	 * Saves the width and height to game settings.
	 *
	 * @override
	 * @memberof AdvancedPackageManager
	 */
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

	/**
	 * Loads two SVG images as if they were HTML/hbs tempate files.
	 * 
	 * Makes it possible to easily embed them in the HTML later.
	 *
	 * @memberof AdvancedPackageManager
	 */
	async prepareSVGs() {
		await loadTemplates([
			"modules/advanced-package-manager/assets/cardboard-box.hbs",
			"modules/advanced-package-manager/assets/cardboard-box-closed.hbs"
		]);
	}
	
	/**
	 * Prepares the `authors` object on each module.
	 *
	 * Some modules only have an `author` field, creates
	 * a new `authors` object with the name of the author.
	 *
	 * @param {data} data - The template data from getData
	 * @memberof AdvancedPackageManager
	 */
	prepareAuthors(data) {
		for (let module of data.modules) {
			if (module.authors?.length) continue;
			module.authors = [
				{ "name": module.author }
			];
		}
	}

	/**
	 * Prepares the information needed to display a
	 * modules icon.
	 *
	 * Locates the media property, and looks for an "icon".
	 * If an icon is found, stores the url or "link" value
	 * in the data object.
	 *
	 * @param {object} data - The template data from getData
	 * @memberof AdvancedPackageManager
	 */
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

/****************************************************************** 

The following are for debugging purposes only.

******************************************************************/

Hooks.once("ready", () => {
	new AdvancedPackageManager().render(true);
});

Hooks.on("renderAdvancedPackageManager", (manager, html, data) => {
	console.debug(manager);
	console.debug(html);
	console.debug(data);
});

/****************************************************************** 
******************************************************************/