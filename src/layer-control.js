
export default function (overlays, map, options) {
  return new LayerControl(overlays, map, options)
}


class LayerControl {

  constructor (overlays, map, options) {
    this._map = map
    this._initOverlays(overlays)
    this._model = LayerControlModel(overlays, options)
    this._view  = LayerControlView(this._model, map, options)
  }

  get label() {
    return this.model.get("label")
  }

  get id() {
    return this.model.get("id")
  }

  get el() {
    return this._view.el
  }

  get model() {
    return this._model
  }

  get view() {
    return this._view
  }

  _initOverlays (overlays) {
    _.each(overlays, overlayGroup => {
      if (overlayGroup.hasOwnProperty("layers")) {
        this._initLayers(overlayGroup.layers)
      }
    })
  }

  _initLayers (layers) {
    _.each(layers, layer => {
      if (layer.type === "WMS") {
        layer.layer = L.tileLayer.wms(layer.url, {
          id: layer.id,
          layers: layer.id,
          crs: layer.crs || L.CRS.EPSG900913,
          format: layer.format || 'image/png',
          opacity: layer.opacity || .75,
          attribution: layer.attribution,
          tileSize: layer.tileSize || 2048
        })
      }
      if (layer.active) layer.layer.addTo(this._map)
    })
  }

}


function LayerControlModel (overlays, options) {

  let Model = new Backbone.Model()
  Model.set({
    "overlays" : overlays,
    "label"    : options.label,
    "id"       : options.id
  })

  return Model
}


function LayerControlView (model, map, options) {
  
  let View = Backbone.View.extend({

    events: {
      "click .overlay-select-link" : "_handleOverlayClick"
    },

    template: _.template(
      $("script#layer-control-template").html(),
      {variable: "data"}
    ),

    initialize: function (model, map, options) {
      this.model = model
      this._map = map
      this.render()
      this._initListeners()
    },

    render: function () {
      this.$el.html(this.template(this.model.attributes))
      return this
    },

    _renderOverlaysOnMap: function () {
      _.each(this.model.get("overlays"), overlayGroup => {
        _.each(overlayGroup.layers, o => {
          if (o.hasOwnProperty('active') && o.active) { o.layer.addTo(this._map) }
        })
      })
    },

    _initListeners: function () {
      this.delegateEvents()
      this.listenTo(this.model, "change", this.render)
    },

    _handleOverlayClick: function (e) {
      let id = e.currentTarget.parentNode.id
      this._toggleOverlay(id)
      this._renderOverlaysOnMap()
    },

    _toggleOverlay: function (id) {
      let overlays = this.model.get("overlays")
      _.each(overlays, overlayGroup => {
        _.each(overlayGroup.layers, o => {
          if (o.hasOwnProperty('id') && o.id === id) {
            if (o.active) { this._map.removeLayer(o.layer) }
            else { this._map.addLayer(o.layer) }
            o.active = !o.active
          }          
        })
      })
      this.model.set({ "overlays" : overlays })
      this.model.trigger("change")
    },

  })

  return new View(model, map, options)
}
