function myMap() {
  let usa = {lat: 41.1553354, lng: -100.1740033};

 function infoCallback(infowindow, marker) {
    return function() {
      infowindow.open(map, marker);
    };
}

  function addMarker(myPos,myTitle,myInfo,myIcon) {
    var marker = new google.maps.Marker(
      {position: myPos, map: map, title: myTitle, icon: myIcon, animation: google.maps.Animation.DROP}
    );
    var infowindow = new google.maps.InfoWindow({content: myInfo});
    google.maps.event.addListener
    (marker, 'click', infoCallback(infowindow, marker));
  }

  function addMarker2(myPos,myTitle,myInfo,myIcon) {
    var marker = new google.maps.Marker(
      {position: myPos, map: map, title: myTitle, icon:myIcon, animation: google.maps.Animation.DROP}
    );
    var infowindow = new google.maps.InfoWindow({content: myInfo});
    google.maps.event.addListener
    (marker, 'click', infoCallback(infowindow, marker));
  }

  var mapConfig= {
    center: usa,
    zoom:5,
    styles: [
      {
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "stylers": [
          {
            "color": "#0984e3"
          }
        ]
      },
      {
        "featureType": "poi.attraction",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.medical",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.school",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "stylers": [
          {
            "color": "#74b9ff"
          },
          {
            "weight": 1
          }
        ]
      },
      {
        "featureType": "road.local",
        "stylers": [
          {
            "color": "#74b9ff"
          }
        ]
      },
      {
        "featureType": "water",
        "stylers": [
          {
            "color": "#f1f2f6"
          },
          {
            "weight": 0.5
          }
        ]
      }
    ]
  };
  var map = new google.maps.Map(document.getElementById('mapa'),mapConfig);

    for (id in tuit) {
      let twHandle = tuit[id].handle;
      let text = tuit[id].text;
      let latTuit = tuit[id].lat;
      let lngTuit = tuit[id].lng;
      let iconTuit = tuit[id].icon;
      let urlProf = tuit[id].url;

      var tuitInfo = "<div class= card mt-2> <h6 class= card-title>" +
      twHandle+"</h6>"+"<div class= cover cover-small style= background-image:url("+
      urlProf+")></div><div class= card-body> <br><p class= card-text>"+
      text+"</p><br><span class= badge badge-info>";

      // function addMarker(myPos [LatLng], myTitle[] ,myInfo) {
      addMarker(new google.maps.LatLng(
        latTuit, lngTuit), twHandle, tuitInfo, iconTuit);
      }
    

}
