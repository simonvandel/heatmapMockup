function IsSquareWithin(UpLeft, LowRight, target) {    
   if (target.zoom < UpLeft.zoom) return false;    

   i = target.zoom;
   for (i; i > UpLeft.zoom; i = target.zoom) {
       ZoomOut(target);
   }

   if (
       target.x >= UpLeft.x &&
       target.x <= LowRight.x &&
       target.y >= UpLeft.y &&
       target.y <= LowRight.y
      ) { return true;} else
          return false;
}

function ZoomOut(target) {  
    target.x = Math.floor(target.x / 2); // assuming regular integer division
    target.y = Math.floor(target.y / 2); // assuming regular integer division
    target.zoom -= 1;
}

function ZoomIn(target) {  
    target.x = target.x * 2;
    target.y = target.y * 2;
    target.zoom += 1;
}

function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
    var gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
    ]
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  heatmap.set('radius', (heatmap.get('radius') == 10) ? 20 : 10);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

function getPoints() {
  return [
    new google.maps.LatLng(56.0255000, 9.9220377)
        ]
}

var map, heatmap;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: {lat: 56.0252000, lng: 9.9220377}
    });

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map
    });

    var imageMapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
    		var sq = {'x': 69148, 'y':40798, 'zoom':17};
            var ss = {'x':coord.x, 'y':coord.y, 'zoom':zoom};
    		if(IsSquareWithin(sq,sq, ss))	{
        	return "../heatmapMockup/images/festival_2008_kort_bod_" + zoom + "_" + coord.x + "_" + coord.y + ".png";
            }
        return null;
        },
    tileSize: new google.maps.Size(256, 256)
    });

    map.overlayMapTypes.push(imageMapType);
    var opt = { minZoom: 0, maxZoom: 19 };
    map.setOptions(opt);
    heatmap.set('dissipating', true);
}
