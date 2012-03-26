$(document).ready(function() {
	var layer = new MM.StamenTileLayer("toner");
	var map = new MM.Map("map", layer);
	map.setCenterZoom(new MM.Location(51.52469, -0.0775), 16);	
});
