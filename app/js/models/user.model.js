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

			getFavourites: function () {
				return this._loadFavourites();
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
				var array = this._loadFavourites();

				array.splice(this._indexFavourites(photo), 1);

				this._saveFavourites(array);
			},

			addFavourite: function (photo) {
				var array = this._loadFavourites();

				array.push(photo.id);

				this._saveFavourites(array);
			},

			isFavourite: function (photo) {
				if (!photo) {
					return false;
				}

				return this._indexFavourites(photo) > -1;
			},

			/* private */

			_favourites: null,

			_indexFavourites: function (photo) {
				var array = this._loadFavourites();

				return array.indexOf(photo.id);
			},

			_loadFavourites: function () {
				var string = this._favourites || localStorage.getItem('favourites'),
					array = [];

				try {
					array = string ? JSON.parse(string) : [];
				} catch (e) {

				}

				return array;
			},

			_saveFavourites: function (array) {
				localStorage.setItem('favourites', JSON.stringify(array));

				delete this._favourites;
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