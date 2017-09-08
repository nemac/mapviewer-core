
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
    layers: {

    },
    zoom: {

    }
  },

  basemaps: [
    {
      id: "mapboxStreets",
      label: "Mapbox Streets",
      active: true,
      url: "https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidmlvbGluY291bnRlciIsImEiOiJjajcwbWdiajMwYmtyMzNwb2o2ZzBqamk0In0.88EHsw7bFK-uYdxlIczDNg",
      attribution: "Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors, <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='http://mapbox.com'>Mapbox</a>",
      image: ""
    },
    {
      id: "cartoLight",
      label: "CARTO Streets",
      active: false,
      url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
      attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, &copy; <a href='https://carto.com/attributions'>CARTO</a>",
      image: "imgs/carto-light.jpg"
    }
  ],

  overlays: [
    {
      id: "Factor123",
      label: "Summary phenology: seasonality and timing",
      active: true,
      url: "https://gis.nemac.org/landat",
      info: "Factor scores describing the strong majority of the variation in the phenology variables. Those shown here are closely associated with (1) seasonality, and with (2) the day-of-year variables such as the middle of the growing season.",
      legend: "legends/abv.png",
      type: "WMS"
    },
    {
      id: "Factor23",
      active: false,
      label: "Summary phenology: timing",
      url: "https://gis.nemac.org/landat",
      info: "Factor scores describing the strong majority of the variation in the phenology variables. Those shown here are closely associated with only the day-of-year variables such as the beginning, middle, and end of the growing season.",
      legend: "legends/abw.png",
      type: "WMS"
    }
  ]
}




