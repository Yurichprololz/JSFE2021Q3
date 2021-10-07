
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoieXVyaWNocHJvbG9sIiwiYSI6ImNrdWg2eDRqYTA5czMybm96NzE5bmZlMnQifQ.LvI5gAVW-_FMT63iCwRBTw';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/yurichprolol/ckuh7h6361nhe17s0oc75r80g', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
});