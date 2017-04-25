(function () {
	Event.handler('Layer.onshow', function (layer) {
	    if (!layer.div || !layer.autoview) return;
	    Autoview.init(layer.div);
	});
})();