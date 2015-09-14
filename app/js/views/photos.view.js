define([
		'backbone',
		'jquery',

		'entities/user',

		'tmpls'
	],
	function (Backbone, $, user, tmpls) {
		return Backbone.View.extend({
			template: tmpls.photos,

			categories: {
				sports: 'Sports',
				city: 'City',
				food: 'Food',
				abstract: 'Abstract',
				cats: 'Cats',
				people: 'People',
				nature: 'Nature',
				technics: 'Technics',
				nightlife: 'Night life'
			},

			events: {
				'click .next': '_goToNext',
				'click .prev': '_goToPrev',
				'click .favourite': '_toggleFavourite',
				'change #category': '_changeCategory'
			},

			initialize: function (options) {
				this.constructor.__super__.initialize.call(this);

				this.router = options.router;
				this.favourites = options.favourites || [];
				this.showFavourites = options.showFavourites;

				$(document).on('keyup.photos', this._hotKey.bind(this));

				this.$('#modes').button('toggle');

				this.listenTo(this.collection, 'add change reset', this.render);
			},

			remove: function () {
				$(document).off('.photos');
			},

			render: function () {
				var $display,
					photo = this.collection.getCurrent();

				this.$el
					.html(this.template({
						collection: this.collection,
						categories: this.categories,
						favourites: this.favourites,
						showFavourites: this.showFavourites,
						user: user,
						photo: photo
					}));

				$display = this.$el.find('.display');

				if (photo) {
					$display.append(photo.get('image'));
				}

				return this;
			},

			/* events */

			_hotKey: function (e) {
				switch (e.keyCode) {
					case 37:
						this._goToPrev(e);
						break;
					case 39:
						this._goToNext(e);
						break;
				}
			},

			_goToNext: function (e) {
				e.preventDefault();

				this.collection.goToNext();
			},

			_goToPrev: function (e) {
				e.preventDefault();

				this.collection.goToPrev();
			},

			_toggleFavourite: function (e) {
				e.preventDefault();

				var photo = this.collection.getCurrent();

				user.toggleFavourite(photo);

				this.$('.favourite').toggleClass('js-favourite', user.isFavourite(photo));
			},

			_changeCategory: function (e) {
				var value = e.target.value;

				this.router.navigate('category/' + value, { trigger: true });
			}
		});
	});