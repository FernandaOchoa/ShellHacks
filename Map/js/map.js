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

  for (id in ver) {
    let nameP = ver[id].name;
    let urlP = ver[id].url;
    let descrP = ver[id].descr;
    let latP = ver[id].lat;
    let lngP = ver[id].lng;
    let iconP = ver[id].icon;

    var info = "<div class= card mt-2> <h6 class= card-title>" +
    nameP+"</h6>"+"<div class= cover cover-small style= background-image:url("+
    urlP+")></div><div class= card-body> <br><p class= card-text>"+
    descrP+"</p></div></div>";

    // function addMarker(myPos [LatLng], myTitle[] ,myInfo) {
    addMarker(new google.maps.LatLng(
      latP, lngP), nameP ,info, iconP);
    }

    for (id in museos) {
      let namePm = museos[id].name;
      let urlPm = museos[id].url;
      let descrPm = museos[id].descr;
      let latPm = museos[id].lat;
      let lngPm = museos[id].lng;
      let iconPm = museos[id].icon;
      let badgePm = museos[id].badge;

      var info2 = "<div class= card mt-2> <h6 class= card-title>" +
      namePm+"</h6>"+"<div class= cover cover-small style= background-image:url("+
      urlPm+")></div><div class= card-body> <br><p class= card-text>"+
      descrPm+"</p><br><span class= badge badge-info>"+
      badgePm+"</span></div></div>";

      addMarker2(new google.maps.LatLng(
        latPm, lngPm), namePm, info2, iconPm);
      }
}
