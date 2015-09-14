require({
	baseUrl: '/js',
	paths: {
		jquery: '../lib/jquery/dist/jquery.min',
		underscore: '../lib/underscore/underscore-min',
		backbone: '../lib/backbone/backbone',
		bootstrap: '../lib/bootstrap/dist/js/bootstrap.min',
		jade: '../lib/jade/runtime',
		templates: '../templates',
		'jquery-hotkeys': '../lib/jquery-hotkeys/jquery.hotkeys',
		'backbone-hotkeys': '../lib/backbone-hotkeys/backbone-hotkeys'
	}
}, [
	'backbone',
	'entities/app'
], function (Backbone) {
	Backbone.history.start({
		pushState: true,
		root: location.pathname + '?'
	});
});