function rectangularPlot(Coord1, Coord2, people){
var width = Math.abs(Coord1.x - Coord2.x);
var height = Math.abs(Coord1.y - Coord2.y);
var totalArray = [];

  for(i = 0; i < people; i++) {
      var y = height * Math.random() + Math.min(Coord1.y , Coord2.y);
      var x = width * Math.random() + Math.min(Coord1.x , Coord2.x);
      totalArray.push(new google.maps.LatLng(x,y));
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
    totalArray.push(new google.maps.LatLng(x,y));
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

    totalArray.push(new google.maps.LatLng(x,y));
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

function getPoints() {
  var RetArray = [];
  // RetArray = rectangularPlot({'x':56.0252250, 'y':9.9211000},{'x':56.0251250, 'y':9.9217000}, 1000);
  // RetArray = RetArray.concat(rectangularPlot({'x':56.0251250, 'y':9.9211000},{'x':56.0250250, 'y':9.9220000}, 200));
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.0005, 0.00055, 155, 205, 200));
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.00055, 0.0006, 150, 215, 150));  
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.0006, 0.00065, 145, 215, 100));
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.00065, 0.0007, 140, 215, 75));
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.0007, 0.00075, 135, 215, 50));
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.00075, 0.0008, 135, 215, 50));
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.0008, 0.00085, 130, 215, 50));
  RetArray = RetArray.concat(curvingBandPlot({'x':56.0257000, 'y':9.9214000}, 0.00085, 0.0009, 130, 215, 50));
  RetArray = RetArray.concat(circlePlot({'x':56.0249500, 'y':9.9225000}, 0.0005, 0.000075, 200));
  RetArray = RetArray.concat(circlePlot({'x':56.0249500, 'y':9.9225000}, 0.0009, 0.0001, 200));

  return RetArray; 

  //  var totalArray = [];
  //  // front row
  //  for(i = 0; i < 10; i++) {
  //      for(j = 0; j < 3; j++) {
  //          var y = 56.0256500 - 0.0000100*j;
  //          var x = 9.9212200 + 0.0000500*i;
  //          totalArray.push(new google.maps.LatLng(y, x));
  //      }
  //  }
  //   return totalArray;
  // return [
  //   new google.maps.LatLng(56.0255000, 9.9220377), // original
  //   new google.maps.LatLng(56.0256500, 9.9211000), // top left
  //   new google.maps.LatLng(56.0253500, 9.9210500), // bot left
  //   new google.maps.LatLng(56.0256000, 9.9219500), // scene
  //   new google.maps.LatLng(56.0251500, 9.9225000), // bot right
  //   {location: new google.maps.LatLng(56.0251500, 9.9225000), weight: 20}
  //       ]
}

var map, heatmap;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
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
}
