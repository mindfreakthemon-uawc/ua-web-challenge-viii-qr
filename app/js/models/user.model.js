define([
		'backbone'
	],
	function (Backbone) {
		return Backbone.Model.extend({
			initialize: function () {
				this.set('width', 400);
				this.set('height', 200);

				this.loadSettings();
			},

			/* settings */

			saveSettings: function (settings) {
				this.set(settings);
				this._saveSettings(settings);
			},

			loadSettings: function () {
				var settings = this._loadSettings();

				this.set(settings);
			},

			/* favourites */

			getFavourites: function (category) {
				return this._loadFavourites(category);
			},

			toggleFavourite: function (photo) {
				if (!photo) {
					return;
				}

				if (this.isFavourite(photo)) {
					this.removeFavourite(photo);
				} else {
					this.addFavourite(photo);
				}
			},

			removeFavourite: function (photo) {
				var category = photo.get('category'),
					array = this._loadFavourites(category);

				array.splice(array.indexOf(photo.id), 1);

				this._saveFavourites(category, array);
			},

			addFavourite: function (photo) {
				var category = photo.get('category'),
					array = this._loadFavourites(category);

				array.push(photo.id);

				this._saveFavourites(category, array);
			},

			isFavourite: function (photo) {
				if (!photo) {
					return false;
				}

				return !!this._inFavourites(photo.get('category'), photo.id);
			},

			/* private */

			_favourites: {},

			_inFavourites: function (category, id) {
				var array = this._loadFavourites(category);

				return array.indexOf(id) !== -1;
			},

			_loadFavourites: function (category) {
				var string = this._favourites[category] || localStorage.getItem(category),
					array = [];

				if (this._favourites) {
					this._favourites[category] = string;
				}

				try {
					array = string ? JSON.parse(string) : [];
				} catch (e) {

				}

				return array;
			},

			_saveFavourites: function (category, array) {
				localStorage.setItem(category, JSON.stringify(array));

				delete this._favourites[category];
			},

			_loadSettings: function () {
				var string = localStorage.getItem('settings'),
					settings = {};

				try {
					settings = string ? JSON.parse(string) : {};
				} catch (e) {

				}

				return settings;
			},

			_saveSettings: function (settings) {
				localStorage.setItem('settings', JSON.stringify(settings));
			}
		});
	});