define([
		'backbone',
		'underscore',

		'models/photo.model'
	],
	function (Backbone, _, Photo) {
		return Backbone.Collection.extend({
			model: Photo,

			initialize: function (models, options) {
				this.counter = 0;
				this.category = options.category;
				this.width = options.width;
				this.height = options.height;

				this._loadNext();
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

			getCurrent: function () {
				return this.at(this.counter);
			},

			goToPrev: function () {
				if (!this.hasPrev()) {
					return;
				}

				--this.counter;

				this.trigger('change');
			},

			hasNext: function () {
				// only allow nexting when current image is loaded already
				return !!this.at(this.counter);
			},

			hasPrev: function () {
				return this.counter > 0;
			},

			/* protected */

			_loadNext: function () {
				this._load(this.length + 1);
			},

			_load: function (id) {
				var image = new Image(),
					self = this;

				image.onload = function () {
					self.add({
						image: image,
						category: self.category,
						id: id
					});
				};

				image.onerror = function () {
					self.trigger('error');
				};

				image.src = 'http://lorempixel.com/' + this.width + '/' + this.height + '/' + this.category + '/' + id
			}
		});
	});