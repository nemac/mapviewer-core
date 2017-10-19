
export default function (basemaps, overlays, map, options) {
  return new LayerControl(basemaps, overlays, map, options)
}


class LayerControl {

  constructor (basemaps, overlays, map, options) {
    this._map = map
    this._initLayers(basemaps)
    this._initLayers(overlays)
    this._model = LayerControlModel(basemaps, overlays, options)
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
      else {
        layer.layer = L.tileLayer(layer.url, {
          id: layer.id,
          attribution: layer.attribution,
        })
      }
      if (layer.active) layer.layer.addTo(this._map)
    })
  }

}


function LayerControlModel (basemaps, overlays, options) {

  let Model = new Backbone.Model()
  Model.set({
    "basemaps" : basemaps,
    "overlays" : overlays,
    "label"    : options.label,
    "id"       : options.id
  })

  return Model
}


function LayerControlView (model, map, options) {
  
  let View = Backbone.View.extend({

    events: {
      "click .basemap-select" : "_handleBaseMapClick",
      "click .overlay-select" : "_handleOverlayClick"
    },

    template: _.template(
      $("script#layer-control-template").html(),
      {variable: "data"}
    ),

    initialize: function (model, map, options) {
      this.model = model
      this._map = map
      this.render()
      this._renderBasemap()
      this._initListeners()
    },

    render: function () {
      this.$el.html(this.template(this.model.attributes))
      return this
    },

    _renderBasemap: function () {
      let bm = this.model.get("basemaps").filter(bm => bm.active).pop()
      if (bm) {
        bm.layer.addTo(this._map)
        bm.layer.bringToBack()
      }
    },

    _renderOverlays: function () {
      _.each(this.model.get("overlays"), o => {
        if (o.active) { o.layer.addTo(this._map) }
      })
    },

    _initListeners: function () {
      this.delegateEvents()
      this.listenTo(this.model, "change", this.render)
    },

    _handleBaseMapClick: function (e) {
      let id = e.currentTarget.id
      this._toggleBasemap(id)
      this._renderBasemap()
    },

    _handleOverlayClick: function (e) {
      let id = e.currentTarget.id
      this._toggleOverlay(id)
    },

    _toggleOverlay: function (id) {
      let overlays = this.model.get("overlays")
      _.each(overlays, o => {
        if (o.id === id) {
          if (o.active) { this._map.removeLayer(o.layer) }
          else { this._map.addLayer(o.layer) }
          o.active = !o.active
        }
      })
      this.model.set({ "overlays" : overlays })
      this.model.trigger("change")
    },

    _toggleBasemap: function (id) {
      let basemaps = this.model.get("basemaps")
      _.each(basemaps, bm => {
        if (bm.id === id) {
          bm.active = !bm.active
        } else {
          bm.active = false
        }
        if (!bm.active && this._map.hasLayer(bm.layer)) {
          this._map.removeLayer(bm.layer)
        }
      })
      this.model.set({ "basemaps" : basemaps })
      this.model.trigger("change")
    }

  })

  return new View(model, map, options)
}
