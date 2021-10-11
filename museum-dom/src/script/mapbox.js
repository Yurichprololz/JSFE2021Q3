import mapboxgl from 'mapbox-gl';

let markers = [[2.3333, 48.8602],
[2.3397, 48.8607],
[2.3330, 48.8619],
[2.3365, 48.8625]]

mapboxgl.accessToken = 'pk.eyJ1IjoieXVyaWNocHJvbG9sIiwiYSI6ImNrdWg2eDRqYTA5czMybm96NzE5bmZlMnQifQ.LvI5gAVW-_FMT63iCwRBTw';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/yurichprolol/ckuh7h6361nhe17s0oc75r80g',
    center: [2.3364, 48.86091], // starting position [lng, lat]
    zoom: 16, // starting zoom
});

const nav = new mapboxgl.NavigationControl({
    showZoom: true
})

// Create a new marker.
const marker = new mapboxgl.Marker({ color: '#000000' })
    .setLngLat([2.3364, 48.86091])
    .addTo(map);


markers.forEach((marker) => {
    new mapboxgl.Marker({ color: '#b5b0a9' })
        .setLngLat(marker)
        .addTo(map);
})