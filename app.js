$(function(){

  getUserLocation();

  function getUserLocation() {
    navigator.geolocation.getCurrentPosition(function(position){
      window.lat = position.coords.latitude;
      window.lng = position.coords.longitude;
      getRandomLocation(rando(lat), rando(lng));
    });
  }

  function getRandomLocation() {
    getVenueNearLocation(rando(window.lat), rando(window.lng));
  }

  function rando(num) {
    if (Math.random() > 0.5) {
      return (Math.round(num * 100) / 100) + (Math.random() / 20);
    } else {
      return (Math.round(num * 100) / 100) - (Math.random() / 20);
    }
  }

  function getVenueNearLocation(lat, lng) {
    var base = 'https://api.foursquare.com/v2/venues/explore';
    var query = '?ll='+lat+','+lng+'&radius=1000&v=20140510&client_id=IVXYOKVMMI2I5RA1Q4W433CBUGL4ATDG0CUTJN0NGMG4KVPH&client_secret=SH32SMZJRYB0JF0ENVQGNJTUSQIHZ4VPCNB4QU5ZAGD30OE3';
    $.get(base + query, function(res){
      var venue = res.response.groups[0].items[0].venue;
      showVenueByLatLng(venue.location.lat, venue.location.lng);
    });
  }

  function showVenueByLatLng(lat,lng) {
    var map = L.mapbox.map('map', 'examples.map-9ijuk24y').setView([lat, lng], 13);
    L.mapbox.featureLayer({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lng, lat]
      },
      properties: {
        title: 'A Single Marker',
        description: 'Just one of me',
        'marker-size': 'small',
        'marker-color': '#f03'
      }
    }).addTo(map);
  }

});
