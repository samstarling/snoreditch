var map, markerClip;

$(document).ready(function() {
	var layer = new MM.StamenTileLayer("toner");
	map = new MM.Map("map", layer);
	map.setCenterZoom(new MM.Location(51.52469, -0.0775), 16);	
	
    markerClip = new MarkerClip(map);
    markerClip.addMarker(markerClip.createDefaultMarker(), new MM.Location(51.52469, -0.0775));
	
});

function zoomIn() {
	map.zoomBy(1);
}

function zoomOut() {
	map.zoomBy(-1);
}

function MarkerClip(map) {

    this.map = map;

    var theClip = this;

    var markerDiv = document.createElement('div');
    markerDiv.id = map.parent.id + '-markerClip-' + new Date().getTime();
    markerDiv.style.margin = '0';
    markerDiv.style.padding = '0';
    markerDiv.style.position = 'absolute';
    markerDiv.style.top = '0px';
    markerDiv.style.left = '0px';
    markerDiv.style.width = map.dimensions.x+'px';
    markerDiv.style.height = map.dimensions.y+'px';        
    map.parent.appendChild(markerDiv);    
    
    function onMapChange() {
        theClip.updateMarkers();    
    }

    map.addCallback('drawn', onMapChange);

    map.addCallback('resized', function() {
        markerDiv.style.width = map.dimensions.x+'px';
        markerDiv.style.height = map.dimensions.y+'px';        
        theClip.updateMarkers();
    });

    this.updateMarkers = function() {
        for (var i = 0; i < this.markers.length; i++) {
            this.updateMarkerAt(i);
        }
    };
    
    this.markers = [];
    this.markerLocations = [];
    this.markerOffsets = [];
    
    this.addMarker = function(element, location, offset) {
        element.style.position = 'absolute';
        if (!offset) {
            offset = new MM.Point(element.offsetWidth/2, element.offsetHeight/2);
        }
        markerDiv.appendChild(element);
        this.markers.push(element);
        this.markerLocations.push(location);
        this.markerOffsets.push(offset);
        this.updateMarkerAt(this.markers.length-1);
    };
    
    this.updateMarkerAt = function(index) {
        var point = map.locationPoint(this.markerLocations[index]),
            offset = this.markerOffsets[index],
            element = this.markers[index];
        MM.moveElement(element, { 
          x: point.x - offset.x, 
          y: point.y - offset.y,
          scale: 1, width: 10, height: 10 });
    };

    var createdMarkerCount = 0;

    this.createDefaultMarker = function() {
        var marker = document.createElement('div');
        marker.id = map.parent.id+'-marker-'+createdMarkerCount;
        createdMarkerCount++;
        marker.style.width = '20px';
        marker.style.height = '20px';
        marker.style.margin = '0';
        marker.style.padding = '0';
        marker.style.backgroundColor = 'yellow';
        marker.style.borderWidth = '5px';
        marker.style.borderColor = 'black';
        marker.style.borderStyle = 'solid';
        marker.style.MozBorderRadius = '20px';
        marker.style.borderRadius = '20px';
        marker.style.WebkitBorderRadius = '20px';
        return marker;
    };

}