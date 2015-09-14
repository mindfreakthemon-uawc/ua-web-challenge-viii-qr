define([
		'backbone',

		'entities/user',

		'collections/photos.collection',
		'collections/favourites.collection',
		'views/photos.view',
		'views/settings.view'
	],
	function (Backbone, user, PhotosCollection, FavouritesCollection, PhotosView, SettingsView) {
		return Backbone.Router.extend({
			routes: {
				'': 'main',
				'category/:category': 'main',
				'favourites': 'favourites',
				'settings': 'settings'
			},

			/* routes */

			main: function (category) {
				category = category || 'sports';

				var photos = new PhotosCollection([], {
						category: category,
						width: user.get('width'),
						height: user.get('height')
					}),
					photosView = new PhotosView({
						collection: photos,
						router: this
					});

				photosView.render().$el.appendTo(this.app.$('.content'));
			},

			favourites: function () {
				var favourites = user.getFavourites(),
					photos = new FavouritesCollection([], {
						category: 'favourites',
						favourites: favourites,
						width: user.get('width'),
						height: user.get('height')
					}),
					photosView = new PhotosView({
						collection: photos,
						favourites: favourites,
						showFavourites: true,
						router: this
					});

				photosView.render().$el.appendTo(this.$root);
			},

			settings: function () {
				var settingsView = new SettingsView({
					router: this
				});

				settingsView.render().$el.appendTo(this.$root);
			},

			/* services */

			setApp: function (app) {
				this.app = app;
				this.$root = this.app.$('.content');
			},

			execute: function (callback, args) {
				this.trigger('routing');

				if (callback) {
					callback.apply(this, args);
				}
			}
		});
	});