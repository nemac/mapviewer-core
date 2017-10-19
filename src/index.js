import options from "../config/config"
import LeafletMap from "./map"
import LayerControl from "./layer-control"
import PinControl from "./pin-control"
import ControlPanel from "./control-panel"

$(function () {
  let app = {}
  window.app = app
  app.map = LeafletMap(options.mapConfig)
  app.layers = LayerControl(
    options.basemaps,
    options.overlays,
    app.map.getMap(),
    options.control.layers
  )
  app.pins = PinControl(app.map.getMap(), options.control.pins)
  app.control = ControlPanel([app.layers, app.pins], app.map.getMap(), options.control.panel)
})
