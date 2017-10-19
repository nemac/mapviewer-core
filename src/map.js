
export default function (options) {
  return new LeafletMap(options)
}

class LeafletMap {

  constructor (options) {
    this._initMap(options)
  }

  _initMap (options) {
    this._map = L.map(options.id, options)
    L.control.attribution().addTo(this._map)
  }

  getMap () {
    return this._map
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


