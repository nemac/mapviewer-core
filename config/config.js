
export default {

  mapConfig: {
    id: "map-wrapper",
    center: [38.5, -81],
    zoom: 10,
    maxbounds: null,
    attributionControl: false,
    doubleClickZoom: false,
    closePopupOnClick: false,
    zoomSnap: 1,
    zoomDelta: 1,
    trackResize: true,
    boxZoom: true,
    doubleClickZoom: true,
    zoomAnimation: true,
    zoomAnimationThreshold: 4,
    fadeAnimation: true,
    markerZoomAnimation: true,
    dragging: true,
    scrollWheelZoom: true,
    wheelDebounceTime: 40,
    wheelPxPerZoomLevel: 60,
    tap: true,
    tapTolerance: 15,
    touchZoom: true
  },

  control: {
    panel: {
      activeModuleId: "layerControl",
      label: "Control"
    },
    layers: {
      label: "Layers",
      id: "layerControl"
    },
    zoom: {

    },
    pins: {
      label: "Pins",
      id: "pinControl",
      icon: {
        "default": {
          iconUrl: 'imgs/blue_icon.png',
          shadowUrl: 'imgs/marker_shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        }
      }
    }
  },

  basemaps: [
    {
      id: "mapboxStreets",
      label: "Mapbox Streets",
      active: false,
      url: "https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidmlvbGluY291bnRlciIsImEiOiJjajcwbWdiajMwYmtyMzNwb2o2ZzBqamk0In0.88EHsw7bFK-uYdxlIczDNg",
      attribution: "Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors, <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='http://mapbox.com'>Mapbox</a>",
      image: ""
    },
    {
      id: "cartoLight",
      label: "CARTO Streets",
      active: true,
      url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
      attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, &copy; <a href='https://carto.com/attributions'>CARTO</a>",
      image: "imgs/carto-light.jpg"
    },
  ],

  overlays: [
    {
      id: "MeanNDVI",
      label: "Test Mean NDVI",
      active: true,
      url: "https://landat-tiles.nemac.org/mapcache",
      info: "Factor scores describing the strong majority of the variation in the phenology variables. Those shown here are closely associated with (1) seasonality, and with (2) the day-of-year variables such as the middle of the growing season.",
      legend: "legends/abv.png",
      format: "image/png",
      tileSize: 256,
      type: "WMS"
    }
  ]
}


