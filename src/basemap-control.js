
export default function (basemaps, map, options) {
  return new BasemapControl(basemaps, map, options)
}


class BasemapControl {

  constructor (basemaps, map, options) {
    this._map = map
    this._initBasemaps(basemaps)
    this._model = BasemapControlModel(basemaps, options)
    this._view  = BasemapControlView(this._model, map, options)
  }

  get label() {
    return this._model.get("label")
  }

  get id() {
    return this._model.get("id")
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

  _initBasemaps (basemaps) {
    _.each(basemaps, layer => {
      layer.layer = L.tileLayer(layer.url, {
        id: layer.id,
        attribution: layer.attribution,
      })
      if (layer.active) layer.layer.addTo(this._map)
    })
  }

}


function BasemapControlModel(basemaps, options) {
  let Model = new Backbone.Model()
  Model.set({
    "basemaps" : basemaps,
    "label"    : options.label,
    "id"       : options.id
  })

  return Model
}


function BasemapControlView (model, map, options) {
  let View = Backbone.View.extend({

    events: {
      "click .basemap-select-link" : "_handleBaseMapClick",
    },

    template: _.template(
      $("script#basemap-control-template").html(),
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

    _initListeners: function () {
      this.delegateEvents()
      this.listenTo(this.model, "change", this.render)
    },

    _handleBaseMapClick: function (e) {
      let id = e.currentTarget.parentNode.id
      this._toggleBasemap(id)
      this._renderBasemap()
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
