define([
		'backbone',
		'underscore',

		'collections/photos.collection'
	],
	function (Backbone, _, PhotosCollections) {
		return PhotosCollections.extend({
			initialize: function (models, options) {
				this._favourites = options.favourites;

				PhotosCollections.prototype.initialize.apply(this, arguments);
			},

			goToNext: function () {
				if (!this.hasNext()) {
					return;
				}

				++this.counter;

				if (this.counter >= this.length) {
					this._loadNext();
				} else {
					this.trigger('change');
				}
			},

			hasNext: function () {
				// only allow nexting when current image is loaded already
				return !!this.get(this._favourites[this.counter]) &&
					this._favourites[this.counter + 1];
			},

			_loadNext: function () {
				var id = this._favourites[this.counter],
					_split;

				if (id) {
					_split = id.split('-');

					this._load(_split[0], _split[1]);
				}
			}
		});
	});