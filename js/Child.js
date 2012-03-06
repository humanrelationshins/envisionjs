/**
 * Child Class
 *
 * Defines a visualization child.
 *
 * Options:
 *  height - Integer
 *  width - Integer
 *  flotr - A set of flotr options
 */
(function () { 

var

  V = humblevis,

  CN_CHILD = 'humble-vis-child',

  T_CHILD = '<div class="' + CN_CHILD + '"></div>';

function Child (options) {

  options = options || {};

  var
    node = bonzo.create(T_CHILD)[0];

  bonzo(node).addClass(options.name || '');

  this.options = options;
  this.node = node;

  if (options.flotr) {
    this.api = new V.flotr.Child(options);
    this.api.adapter = V.flotr.adapter;
  } else if (options.drawing) {
    this.api = options.drawing;
  }
}

Child.prototype = {

  render : function (element) {

    var
      node = this.node,
      options = this.options;

    element = element || options.element;

    if (!element) throw 'No element to render within.';

    bonzo(element)
      .addClass(options.name || '')
      .append(this.node);
    this._setDimension('width');
    this._setDimension('height');
    this.container = element;

    this.draw(options.data, options.flotr);
  },

  draw : function (data, flotr) {
    if (this.api) {
      this.api.draw(data, flotr, this.node);
    }
  },

  getData : function () {
    return this.data;
  },

  trigger : function () {
    this.api.adapter.trigger.apply(this.api.adapter, arguments);
  },

  attach : function () {
    this.api.adapter.attach.apply(this.api.adapter, arguments);
  },

  detach : function () {
    this.api.adapter.detach.apply(this.api.adapter, arguments);
  },

  _setDimension : function (attribute) {
    var
      node = this.node,
      options = this.options;
    if (options[attribute]) {
      bonzo(node).css(attribute, options[attribute]);
    } else {
      options[attribute] = parseInt(bonzo(node).css(attribute), 10);
    }
    this[attribute] = options[attribute];
  }
};

V.Child = Child;

})();
