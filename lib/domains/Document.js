var Abstract, Document, Native,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Abstract = require('./Abstract');

Native = require('../methods/Native');

Document = (function(_super) {
  __extends(Document, _super);

  Document.prototype.priority = Infinity;

  Document.prototype.Methods = Native.prototype.mixin(new Abstract.prototype.Methods, require('../methods/Selectors'), require('../methods/Rules'));

  Document.prototype.Queries = require('../modules/Queries');

  Document.prototype.Positions = require('../modules/Positions');

  Document.prototype.helps = true;

  function Document() {
    var _base, _base1, _base2;
    (_base = this.engine).queries || (_base.queries = new this.Queries(this));
    (_base1 = this.engine).positions || (_base1.positions = new this.Positions(this));
    (_base2 = this.engine).scope || (_base2.scope = document);
    if (this.scope.nodeType === 9 && ['complete', 'interactive', 'loaded'].indexOf(this.scope.readyState) === -1) {
      this.scope.addEventListener('DOMContentLoaded', this);
    } else if (this.running) {
      this.compile();
    }
    this.scope.addEventListener('scroll', this);
    if (typeof window !== "undefined" && window !== null) {
      window.addEventListener('resize', this);
    }
    Document.__super__.constructor.apply(this, arguments);
  }

  Document.prototype.flush = function(reflow) {
    var property, suggestions, value, _ref;
    suggestions = void 0;
    if (reflow) {
      this.positions.render(null, this.reflown);
    }
    this.reflown = void 0;
    if (this.buffer) {
      _ref = this.buffer;
      for (property in _ref) {
        value = _ref[property];
        if ((value != null) && value !== this.values[property]) {
          (suggestions || (suggestions = [])).push(['suggest', property, value, 'required']);
        }
      }
      this.values.merge(this.buffer);
      return this.buffer = void 0;
    }
  };

  Document.prototype.events = {
    resize: function(e) {
      var id;
      if (e == null) {
        e = '::window';
      }
      id = e.target && this.identity.provide(e.target) || e;
      return this.solve(id + ' resized', function() {
        this.intrinsic.verify(id, "width", void 0, false);
        return this.intrinsic.verify(id, "height", void 0, false);
      });
    },
    scroll: function(e) {
      var id;
      if (e == null) {
        e = '::window';
      }
      id = e.target && this.identity.provide(e.target) || e;
      return this.solve(id + ' scrolled', function() {
        this.intrinsic.verify(id, "scroll-top", void 0, false);
        return this.intrinsic.verify(id, "scroll-left", void 0, false);
      });
    },
    solve: function() {
      var id, _i, _len, _ref;
      if (this.removed) {
        _ref = this.removed;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          id = _ref[_i];
          this.identity.unset(id);
        }
        return this.removed = void 0;
      }
    },
    DOMContentLoaded: function() {
      this.scope.removeEventListener('DOMContentLoaded', this);
      return this.start();
    },
    compile: function() {
      this.intrinsic.queries.connect();
      return this.engine.solve('Document', 'stylesheets', [['eval', ['$attribute', ['$tag', 'style'], '*=', 'type', 'text/gss']], ['load', ['$attribute', ['$tag', 'link'], '*=', 'type', 'text/gss']]]);
    },
    destroy: function() {
      this.scope.removeEventListener('DOMContentLoaded', this);
      this.scope.removeEventListener('scroll', this);
      window.removeEventListener('resize', this);
      return this.engine.events.destroy.apply(this, arguments);
    }
  };

  Document.condition = function() {
    return typeof window !== "undefined" && window !== null;
  };

  Document.prototype.url = null;

  return Document;

})(Abstract);

module.exports = Document;