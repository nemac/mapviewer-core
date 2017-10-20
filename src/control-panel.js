
export default function (modules, map, options) {
  return new ControlPanel(modules, map, options)
}


class ControlPanel {

  constructor (modules, map, options) {
    this._model   = ControlPanelModel(modules, map, options)
    this._view    = ControlPanelView(this._model, options)
    this._control = LeafletControl(this._view.el, map, options)
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


function ControlPanelModel (modules, map, options) {

  let Model = new Backbone.Model()
  Model.set({
    label : "Control Panel",
    tabs  : ControlPanelTabCollection(modules, map, options)
  })

  return Model
}


function ControlPanelTabCollection(modules, map, options) {

  let Tabs = new Backbone.Collection()

  Tabs.model = function (attrs, options) {
    let Tab = new Backbone.Model()
    Tab.set({
      active: options.activeModuleId === attrs.module.id,
      label: attrs.module.label,
      id: attrs.module.id,
      module: attrs.module,
      _map: attrs.map, 
    })
    return Tab
  }
  _.each(modules, module => {
    Tabs.add({ module: module, map: map}, options)
  })

  return Tabs

}


function ControlPanelView(model, options) {

  let View = Backbone.View.extend({

    events: {
      "click .control-panel-tab-select" : "_handleTabClick"
    },

    get tabs() {
      return model.get("tabs")
    },

    model: model,

    template: _.template(
      $("script#control-panel-template").html(),
      {variable: "data"}
    ),

    initialize: function (options) {
      this.render()
      this._initListeners()
    },

    render: function () {
      this.$el.html(this.template({ tabs : this.tabs }))
      this._attachActiveModule()
    },

    _initListeners: function () {
      this.listenTo(model, "change", this.render)
    },

    _attachActiveModule: function () {
      let wrapper = this.$el.find("#control-panel-active-module-wrapper")
      let activeTab = this.tabs.findWhere({ active: true })
      let el = activeTab.get("module").el
      let childNodes = wrapper.children()
      if (childNodes.length) {
        wrapper.remove(childNodes)
      }
      let activeModuleView = activeTab.get("module").view
      activeModuleView.render()
      activeModuleView.delegateEvents()
      wrapper.append(el)
    },

    _handleTabClick: function (e) {
      let id = e.currentTarget.id
      let activeTab = this.tabs.findWhere({ active: true })
      let activeModule = activeTab.get("module")
      let activeTabId = activeModule.id
      if (activeTabId !== id) {
        let newActiveTab = this.tabs.findWhere({ id: id })
        activeTab.set({ active: false })
        newActiveTab.set({ active: true })
        model.trigger("change")
      }

    },

  })

  return new View(options)

}


function LeafletControl (el, map, options) {

  let Control = L.Control.extend({

    options: {
      position: options.position
    },

    initialize: function () {
      this._container = el
      L.Util.setOptions(this, options)
      L.DomEvent.disableClickPropagation(el)
      L.DomEvent.disableScrollPropagation(el)
      this.addTo.call(this, map)
    },

    onAdd: function (map) {
      return this._container
    }

  })

  return new Control(options)
}
