define([
		'backbone',
		'entities/router'
	],
	function (Backbone, router) {
		return Backbone.View.extend({
			el: '#viewport',

			events: {
				'click .fn-click': '_redirect',
				'click a': '_redirect'
			},

			initialize: function () {
				router.setApp(this);

				this.listenTo(router, 'routing', function () {
					this.$('.content').empty();
				});
			},

			_redirect: function (e) {
				if (e.target.hostname !== location.hostname) {
					return;
				}

				if (e.isDefaultPrevented()) {
					return;
				}

				e.preventDefault();
				e.stopPropagation();

				var pathname = e.target.pathname;

				if (Backbone.history.fragment === pathname) {
					return '';
				}

				router.navigate(e.target.pathname, { trigger: true });
			}
		});
	});