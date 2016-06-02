(function () {
	Event.handler('layer.onshow', function (layer) {
	    if (!layer.div || !layer.autoview) return;
	    Autoview.init(layer.div);
	});
})();