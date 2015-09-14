define([
		'backbone',

		'entities/user',

		'tmpls'
	],
	function (Backbone, user, tmpls) {
		return Backbone.View.extend({
			template: tmpls.settings,

			events: {
				'submit #settings': '_save'
			},

			initialize: function (options) {
				this.constructor.__super__.initialize.call(this);

				this.router = options.router;
			},

			render: function () {
				this.$el
					.html(this.template({
						user: user
					}));

				return this;
			},

			/* events */

			_save: function (e) {
				e.preventDefault();

				var form = e.target;

				user.saveSettings({
					width: form.elements['photo-width'].value,
					height: form.elements['photo-height'].value
				});
			}
		});
	});