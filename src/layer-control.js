
export default class {

  constructor (basemaps, overlays, map, options) {
    this._map = map
    this._initLayers(basemaps)
    this._initLayers(overlays)
    this.model = this._initModel(basemaps, overlays, options)
    this.view = this._initView(basemaps, overlays, this.model, map, options)
    this.control = this._initControl(basemaps, overlays, map, this.view.el, options)
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
          tileSize: 2048
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

  _initModel (basemaps, overlays, options) {
    let Model = _Model()
    return new Model(basemaps, overlays, options)
  }

  _initView (basemaps, overlays, model, options) {
    let View = _View()
    return new View(basemaps, overlays, model, options)
  }

  _initControl (basemaps, overlays, map, el, options) {
    let L_Control = _L_Control()
    return new L_Control(basemaps, overlays, map, el, options)
  }
}

function _L_Control () {
  return L.Control.extend({

    options: {
      position: "topright"
    },

    initialize: function (basemaps, overlays, map, el, options) {
      this._container = el
      L.Util.setOptions(this, options)
      L.DomEvent.disableClickPropagation(el)
      L.DomEvent.disableScrollPropagation(el)
      this.addTo.call(this, map)
    },

    onAdd: function (map) {
      return this._container
    },

  })
}

function _Model () {
  return Backbone.Model.extend({
    initialize: function (basemaps, overlays, options) {
      this.basemaps = basemaps,
      this.overlays = overlays,
      this.options = options
    }
  })
}

function _View () {
  return Backbone.View.extend({

    events: {
      "click .basemap-select" : "_handleBaseMapClick",
      "click .overlay-select" : "_handleOverlayClick"
    },

    template: _.template($("script#layer-control-template").html(), {variable: "data"}),

    initialize: function (basemaps, overlays, model, map, options) {
      this.model = model
      this._map = map
      this.render()
      this._initListeners()
    },

    render: function () {
      this.$el.html(this.template(this.model))
      return this
    },

    _initListeners: function () {
      this.delegateEvents()
      this.listenTo(this.model, "change", this.render)

    },

    _handleBaseMapClick: function (e) {
      let id = e.currentTarget.id
      let basemaps = this.model.basemaps.map(basemap => {
        if (basemap.active) {
          this._map.removeLayer(basemap.layer)
          basemap.active = false
        }
        else if (basemap.id === id) {
          this._map.addLayer(basemap.layer)
          basemap.layer.bringToBack()
          basemap.active = true
        }
        return basemap
      })
      this.model.set("basemaps", basemaps)
      this.model.trigger("change")
    },

    _handleOverlayClick: function (e) {
      let id = e.currentTarget.id
      let overlays = this.model.overlays.map(overlay => {
        if (overlay.id === id) {
          if (overlay.active) {
            this._map.removeLayer(overlay.layer)
            overlay.active = false
          } else {
            this._map.addLayer(overlay.layer)
            overlay.active = true
          }
        }
        return overlay
      })
      this.model.set("overlays", overlays)
      this.model.trigger("change")
    }

  })
}
