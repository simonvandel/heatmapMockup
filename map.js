var person_id = 0;
var last = {time : new Date(),    
            x    : -100,         
            y    : -100};       
var period = 100; 
var space  = 2;  

function rectangularPlot(Coord1, Coord2, people){
var width = Math.abs(Coord1.x - Coord2.x);
var height = Math.abs(Coord1.y - Coord2.y);
var totalArray = [];

  for(i = 0; i < people; i++) {
      var y = height * Math.random() + Math.min(Coord1.y , Coord2.y);
      var x = width * Math.random() + Math.min(Coord1.x , Coord2.x);
      totalArray.push({ 'id': person_id++, 'latlng': new google.maps.LatLng(x,y) });
  }
  return totalArray;
}

/* This function creates points between two circumferences of circles with the same center and a minimum and maximum angle in degrees.
This effectively creates a curving band of people, simulating the crowd in front of a stage*/
function curvingBandPlot(Center, Radius1, Radius2, Angle1, Angle2, people){
  var totalArray = [];
  for(i = 0; i < people; i++) {
    var randomRadius = Math.min(Radius1, Radius2) + Math.random() * Math.abs(Radius1 - Radius2); // Getting a random radius within the given radiuses
    var randomAngle = Angle1 + Math.random() * Math.abs(Angle1 - Angle2); // Getting a random angle within the given angles in degrees
    randomAngle = randomAngle * Math.PI / 180; // Converting angle to radians
    var x = Center.x + randomRadius * Math.cos(randomAngle); // Getting the x coordinate of the random point on the circumference of the random new circle
    var y = Center.y + randomRadius * Math.sin(randomAngle); // The same for the y coordinate
    totalArray.push({ 'id': person_id++, 'latlng': new google.maps.LatLng(x,y) });
  }
  return totalArray;
}

function circlePlot(Center, Hight, Width, people){
  var totalArray = [];
  for(i = 0; i < people; i++) {
    var randomHight = Hight * Math.random();
    var randomWidth = Width * Math.random();
    var randomAngle = 2 * Math.PI * Math.random();

    var x = Center.x + randomWidth  * Math.cos(randomAngle);
    var y = Center.y + randomHight * Math.sin(randomAngle);

    totalArray.push({ 'id': person_id++, 'latlng': new google.maps.LatLng(x,y) });
  }
  return totalArray;
}


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
    ];
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  heatmap.set('radius', (heatmap.get('radius') == 10) ? 1 : 10);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

function getGeneralDistribution(){
  var RetArray = [];
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.0005, 0.00055, 155, 215, 300));
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.00055, 0.0006, 150, 215, 250));  
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.0006, 0.00065, 145, 220, 200));
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.00065, 0.0007, 140, 225, 150));
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.0007, 0.00075, 135, 225, 100));
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.00075, 0.0008, 135, 225, 75));
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.0008, 0.00085, 130, 225, 50));
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.00085, 0.0009, 130, 225, 50));
  
  RetArray = RetArray.concat(circlePlot({'x':56.0249500, 'y':9.9225000}, 0.0005, 0.000075, 200));
  RetArray = RetArray.concat(circlePlot({'x':56.0249500, 'y':9.9225000}, 0.0009, 0.0001, 200));

  RetArray = RetArray.concat(circlePlot({'x':56.0247500, 'y':9.9220000}, 0.0005, 0.000075, 200));
  RetArray = RetArray.concat(circlePlot({'x':56.0247500, 'y':9.9220000}, 0.0005, 0.0002, 200));

  RetArray = RetArray.concat(rectangularPlot({'x':56.0260000, 'y':9.9207500},{'x':56.0245000, 'y':9.9208500},200));

  RetArray = RetArray.concat(rectangularPlot({'x':56.0260000, 'y':9.9206700},{'x':56.0244800, 'y':9.9233900},500));

  return RetArray; 
}

function getSkewedDistribution(){
  var RetArray = [];
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.0005, 0.00055, 155, 180, 200));
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.0005, 0.00055, 180, 215, 225));

  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.00055, 0.0006, 150, 180, 75));
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.00055, 0.0006, 180, 215, 175));

  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.0006, 0.00065, 145, 200, 100));
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.0006, 0.00065, 200, 220, 125));

  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.00065, 0.0007, 140, 210, 75));
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.00065, 0.0007, 210, 225, 125));

  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.0007, 0.00075, 135, 215, 75));
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.0007, 0.00075, 215, 235, 75));

  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.00075, 0.0008, 135, 215, 75));
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.00075, 0.0008, 215, 235, 75));

  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.0008, 0.00085, 130, 225, 50));
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.0008, 0.00085, 225, 235, 75));

  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.00085, 0.0009, 130, 235, 75));
  
  RetArray = RetArray.concat(circlePlot({'x':56.0249500, 'y':9.9225000}, 0.0005, 0.000075, 200));
  RetArray = RetArray.concat(circlePlot({'x':56.0249500, 'y':9.9225000}, 0.0009, 0.0001, 200));

  RetArray = RetArray.concat(circlePlot({'x':56.0247500, 'y':9.9220000}, 0.0005, 0.000075, 200));
  RetArray = RetArray.concat(circlePlot({'x':56.0247500, 'y':9.9220000}, 0.0005, 0.0002, 200));
  RetArray = RetArray.concat(circlePlot({'x':56.0251500, 'y':9.9208200}, 0.0001, 0.0003, 400));

  RetArray = RetArray.concat(rectangularPlot({'x':56.0260000, 'y':9.9207500},{'x':56.0245000, 'y':9.9208500},200));

  RetArray = RetArray.concat(rectangularPlot({'x':56.0260000, 'y':9.9206700},{'x':56.0244800, 'y':9.9233900},500));

  return RetArray; 
}

function getPoints() {
  return getSkewedDistribution();
  //return getGeneralDistribution();
}

function throttle_events(event) {
    var now = new Date();
    var distance = Math.sqrt(Math.pow(event.clientX - last.x, 2) + Math.pow(event.clientY - last.y, 2));
    var time = now.getTime() - last.time.getTime();
    if (distance * time < space * period) {    //event arrived too soon or mouse moved too little or both
        if (event.stopPropagation) { // W3C/addEventListener()
            event.stopPropagation();
        } else { // Older IE.
            event.cancelBubble = true;
        };
    } else {
        last.time = now;
        last.x    = event.clientX;
        last.y    = event.clientY;
    };
};

var map, heatmap;
var points;

function initMap() {
    map_div = document.getElementById("map")

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: {lat: 56.0252000, lng: 9.9220377}
    });

    map_div.addEventListener("mousemove", throttle_events, true);

    points = getPoints().map(function(dot) { return dot.latlng });
    
    heatmap = new google.maps.visualization.HeatmapLayer({
      data: points,
      map: map
    });

    var imageMapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
    		var sq = {'x': 69148, 'y':40798, 'zoom':17};
            var ss = {'x':coord.x, 'y':coord.y, 'zoom':zoom};
    		if(IsSquareWithin(sq,sq, ss))	{
        	return "../heatmapMockup/images/festival_2008_kort_bod_" + zoom + "_" + coord.x + "_" + coord.y + ".svg";
            }
        return null;
        },
    tileSize: new google.maps.Size(256, 256)
    });

    map.overlayMapTypes.push(imageMapType);
    var opt = { minZoom: 0, maxZoom: 19 };
    map.setOptions(opt);
    heatmap.set('dissipating', true);
    update();
}

function getRan(min, max) {
    return Math.random() * (max - min) + min;
}

function update() {
	setTimeout(update, 500);

	var newPoints = points.map(function(point) {
		
		x = point.lat() + getRan(-100,100) * 0.0000001;
		y = point.lng() + getRan(-100,100) * 0.0000001;
		return new google.maps.LatLng(x,y); 
	} );

	points = newPoints;

	heatmap.setData(points);
}