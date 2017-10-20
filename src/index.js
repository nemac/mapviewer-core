import options from "../config/config"
import BasemapControl from "./basemap-control"
import LayerControl from "./layer-control"
import PinControl from "./pin-control"
import ControlPanel from "./control-panel"

$(function () {

  let app = {}

  app._map = L.map(options.map.id, options.map)

  app.attribution = L.control.attribution({
    position: options.controls.attribution.position
  })
  app.attribution.addTo(app._map)

  app.controls = {}

  app.controls.layers = LayerControl(
    options.overlays,
    app._map,
    options.controls.layers
  )

  app.controls.basemaps = BasemapControl(
    options.basemaps,
    app._map,
    options.controls.basemaps
  )
  
  app.controls.pins = PinControl(
    app._map,
    options.controls.pins
  )
  
  app.controlPanel = ControlPanel(
    [app.controls.basemaps, app.controls.layers, app.controls.pins],
    app._map, options.controls.panel
  )

})
