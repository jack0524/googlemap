var timer = null;
var temp = [
    {
        "lat": 25.0513265,
        "lng": 121.533331
    },
    {
        "lat": 25.0513265,
        "lng": 121.533332
    },
    {
        "lat": 25.0513265,
        "lng": 121.533333
    },
    {
        "lat": 25.0513265,
        "lng": 121.533334
    }
];
var flightPlanCoordinates = [];
var initPos = {
      lat: 1,
      lng: 1
    };
var func = function (param,map){
  //Draw Test Path
  // if(temp.length !== 0){
  //   flightPlanCoordinates.push(temp.shift());
  //   console.log(flightPlanCoordinates);
  //   var flightPath = new google.maps.Polyline({
  //     path: flightPlanCoordinates,
  //     geodesic: true,
  //     strokeColor: '‪#‎FF0000‬',
  //     strokeOpacity: 1.0,
  //     strokeWeight: 2
  //   });
  //   flightPath.setMap(map);
  // }

  // Try HTML5 geolocation - getCurrentPosition
  navigator.geolocation.getCurrentPosition(function(position) {
    if( initPos.lat === position.coords.latitude && initPos.lng === position.coords.longitude){
      return;
    }
    initPos.lat = position.coords.latitude;
    initPos.lng = position.coords.longitude;
    flightPlanCoordinates.push(
        {
          lat:formatFloat(position.coords.latitude,6),
          lng:formatFloat(position.coords.longitude,6)
        });
    console.log(JSON.stringify(flightPlanCoordinates, null, 4));
    var flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '‪#‎FF0000‬',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    flightPath.setMap(map);
  });


  //SetInterval
  clearTimeout(timer);
  timer =setTimeout(func.bind(null,param,map), param);
};

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
    center: {lat: -34.397, lng: 150.644},
    // center: pos,
    zoom: 20,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });
  placeMarkerAndPanTo(pos,map);
  return map;
}

function formatFloat(num, pos)
{
  var size = Math.pow(10, pos);
  return Math.ceil(num * size) / size;
}

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

    // //One time snapshot
    // navigator.geolocation.getCurrentPosition(
    //     function(position) {
    //         map = setUpMap({lat:position.coords.latitude,lng:position.coords.longitude});
    //     },
    //      handleLocationError.bind(null,true, infoWindow, map.getCenter())
    // );
     
    // //Tracking users position
    // watchId = navigator.geolocation.watchPosition(
    //     function(position) {
    //       flightPlanCoordinates.push(
    //           {
    //             lat:formatFloat(position.coords.latitude,6),
    //             lng:formatFloat(position.coords.longitude,6)
    //           });
    //       console.log(JSON.stringify(flightPlanCoordinates, null, 4));
    //       var flightPath = new google.maps.Polyline({
    //         path: flightPlanCoordinates,
    //         geodesic: true,
    //         strokeColor: '‪#‎FF0000‬',
    //         strokeOpacity: 1.0,
    //         strokeWeight: 2
    //       });
    //       flightPath.setMap(map);
    //     },
    //      // Optional settings below
    //      handleLocationError.bind(null,true, infoWindow, map.getCenter())
    // );

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

//Other API
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
