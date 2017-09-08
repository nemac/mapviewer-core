

export default class {

  constructor (config) {
    this._initMap(config)
    this._initListeners()
  }

  getMap () {
    return this._map
  }

  _initMap (config) {
    this._map = L.map(config.id, config)
    L.control.attribution().addTo(this._map)
  }

  _initListeners () {
    let _this = this
    let handlers = {
      "click"           : this._handleClick,
      "zoomend"         : this._handleZoomEnd,
      "layeradd"        : this._handleLayerAdd,
      "layerremove"     : this._handleLayerRemove,
      "resize"          : this._handleResize,
      "moveend"         : this._handleMoveEnd
    }
    Object.keys(handlers).forEach(event => {
      let cb = handlers[event]
      this._map.on(event, cb.bind(_this))
    })
  }

  _handleZoomEnd (e) {
    
  }

  _handleClick (e) {
    
  }


  _handleLayerAdd (e) {

  }

  _handleLayerRemove (e) {

  }

  _handleResize (e) {

  }

  _handleMoveEnd (e) {

  }

}


