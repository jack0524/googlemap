var timer = null;
var temp =  [
{lat: 37.772, lng: -122.214},
{lat: 21.291, lng: -157.821},
{lat: -18.142, lng: 178.431},
{lat: -27.467, lng: 153.027}
];
var flightPlanCoordinates = [];
var initPos = {
      lat: 1,
      lng: 1
    };
var func = function (param,map){
  //Test
  // if(temp.length !== 0){
  //   flightPlanCoordinates.push(temp.shift());
  //   var flightPath = new google.maps.Polyline({
  //     path: flightPlanCoordinates,
  //     geodesic: true,
  //     strokeColor: '‪#‎FF0000‬',
  //     strokeOpacity: 1.0,
  //     strokeWeight: 2
  //   });
  //   flightPath.setMap(map);
  // }

  // Try HTML5 geolocation.
  navigator.geolocation.getCurrentPosition(function(position) {
    if( initPos.lat === position.coords.latitude || initPos.lng === position.coords.longitude){
      return;
    }
    initPos.lat = position.coords.latitude;
    initPos.lng = position.coords.longitude;
    flightPlanCoordinates.push(initPos);
    var flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '‪#‎FF0000‬',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    flightPath.setMap(map);
  });
  clearTimeout(timer);
  timer =setTimeout(func.bind(null,param,map), param);
};

function initMap() {
  var infoWindow = new google.maps.InfoWindow();
  var handleLocationError = function (browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');

    infoWindow.open(map);
  }

  // Try HTML5 geolocation.
  var map = setUpMap({lat: 25.046469, lng: 121.517268});
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      map = setUpMap({lat:position.coords.latitude,lng:position.coords.longitude});
      timer = setTimeout(func(1000,map), 1000);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  map.panTo(latLng);
}

function setUpMap(pos) {
  var map = new google.maps.Map(document.getElementById('map'), {
    // center: {lat: 0, lng: -180},
    // center: {lat: -34.397, lng: 150.644},
    center: pos,
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });
  placeMarkerAndPanTo(pos,map);
  return map;
}

function __initMap() {
  //Set Center
  var taiwan = new google.maps.LatLng(25.046469, 121.517268);

  //MapInit
  var map = new google.maps.Map(document.getElementById('map'), {
    center: taiwan,
    zoom: 12,
    scaleControl: true,
    zoomControl: false,
    disableDoubleClickZoom: true,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      mapTypeIds: [
        google.maps.MapTypeId.ROADMAP,
        google.maps.MapTypeId.TERRAIN
      ]
    },
    disableDefaultUI: true
  });

  //Marker
  var marker = new google.maps.Marker({
    position: taiwan,
    map: map,
    title: 'Click to zoom'
  });
  //Marker Event
  marker.addListener('click', function(e) {
    map.setZoom(8);
    console.log(marker)
    console.log(e)
    map.setCenter(marker.getPosition());
  });

  //Set Map Event change to Sub Center
  var myLatlng = {lat: -25.363, lng: 131.044};
  //  map.addListener('center_changed', function() {
  //   // 3 seconds after the center of the map has changed, pan back to the
  //   // marker.
  //   window.setTimeout(function() {
  //     console.log(map);
  //     map.panTo(marker.getPosition());
  //   }, 3000);
  // });

  map.addListener('click', function(e) {
    placeMarkerAndPanTo(e.latLng, map);
  });

  map.addListener('zoom_changed', function() {
    infowindow.setContent('Zoom: ' + map.getZoom());
  });

  var mapDiv = document.getElementById('map');
  google.maps.event.addDomListener(mapDiv, 'click', function() {
    window.alert('Map was clicked!');
  });
}
