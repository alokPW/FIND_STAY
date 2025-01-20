
mapboxgl.accessToken = mapToken;
  const map = new mapboxgl.Map({
      container: 'map', // container ID
      // style:'mapbox://styles/mapbox/streets-v12',
      center:coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: 9 // starting zoom
  });

// console.log(coordinates);
const marker = new mapboxgl.Marker({color:"red"})
.setLngLat(coordinates) // Directly pass [74.054111, 15.325556]
.setPopup(new mapboxgl.Popup({offset:25}).setHTML("<h4> Exact Location provided after booking</h4>"))
.addTo(map);
