import config from "../config/config"
import LeafletMap from "./map"
import LayerControl from "./layer-control"

$(function () {
  let app = init(config)
})

function init (config) {
  let _app = { controls: {} }
  _app.map = new LeafletMap(config.mapConfig)
  _app.controls.layers = new LayerControl(
    config.basemaps,
    config.overlays,
    _app.map.getMap(),
    config.control.layers
  )
  return _app
}

