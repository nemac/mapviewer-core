
export default function (map, options) {
  return new PinControl(map, options)
}


class PinControl {

  constructor (map, options) {
    this._model    = PinControlModel(map, options)
    this._view     = PinControlView(this._model, map, options)
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

}


function PinControlModel (map, options) {

  let PinControlModel = new Backbone.Model()
  PinControlModel.set({
    "pins"  : PinCollection(options),
    "label" : options.label,
    "id"    : options.id
  })
  
  return PinControlModel
}


function PinCollection (options) {
  
  let Pins = new Backbone.Collection()
  Pins.model = function (options) {
    let lat = options.lat
    let lng = options.lng
    let Icon = L.Icon.extend({})
    let icon = new Icon({
      iconUrl: "imgs/blue_icon.png",
      shadowUrl: "imgs/marker_shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })
    let marker = L.marker([lat, lng], {icon: icon})

    let Pin = new Backbone.Model()
    Pin.set({
      "lat"    : lat,
      "lng"    : lng,
      "icon"   : icon,
      "marker" : marker,
      "active" : true,
      "label"  : `Lat: ${lat}, Long: ${lng}`
    })

    return Pin
  }

  return Pins
}


function PinModel (options) {
  let lat = options.lat
  let lng = options.lng
  let Icon = L.Icon.extend({})
  let icon = new Icon({
    iconUrl: "imgs/blue_icon.png",
    shadowUrl: "imgs/marker_shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
  let marker = L.marker([lat, lng], {icon: icon})

  let Model = new Backbone.Model()
  Model.set({
    "lat"    : lat,
    "lng"    : lng,
    "icon"   : icon,
    "marker" : marker,
    "active" : true,
    "label"  : `Lat: ${lat}, Long: ${lng}`
  })

  return Model
}


function PinControlView (model, map, options) {

  let View = Backbone.View.extend({

    template: _.template(
      $("script#pin-control-template").html(),
      {variable: "data"}
    ),

    initialize: function (model, map, options) {
      this.model = model
      this._map = map
      this._initListeners()
      this.render()
    },

    render: function () {
      this.$el.html(this.template({ models : this.model.get("pins").models }))
      this.renderPinsOnMap()
      return this
    },

    renderPinsOnMap() {
      this.model.get("pins").forEach(pin => {
        let active = pin.get("active")
        let hasLayer = this._map.hasLayer(pin.get("marker"))
        if (active && !hasLayer) {
          this._map.addLayer(pin.get("marker"))
        }
        if (!active && hasLayer) {
          this._map.removeLayer(pin.get("marker"))
        }
      })
    },

    _initListeners: function () {
      this._map.on("click", this._handleMapClick.bind(this))
    },

    _handleMapClick: function (e) {
      let lat = e.latlng.lat
      let lng = e.latlng.lng
      this.model.get("pins").add({ lat: lat, lng: lng })
      this.render()
    }

  })

  return new View(model, map, options)
}

