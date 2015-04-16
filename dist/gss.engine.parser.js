(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var GSS;

GSS = require('../src/GSS');

global.GSS = GSS;

module.exports = GSS;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../src/GSS":18}],2:[function(require,module,exports){
var GSS;

GSS = require('./gss.engine');

GSS.Parser = require('gss-parser');

module.exports = GSS;



},{"./gss.engine":1,"gss-parser":5}],3:[function(require,module,exports){
/**
 * Parts Copyright (C) 2011-2012, Alex Russell (slightlyoff@chromium.org)
 * Parts Copyright (C) Copyright (C) 1998-2000 Greg J. Badros
 *
 * Use of this source code is governed by http://www.apache.org/licenses/LICENSE-2.0
 *
 * This is a compiled version of Cassowary/JS. For source versions or to
 * contribute, see the github project:
 *
 *  https://github.com/slightlyoff/cassowary-js-refactor
 *
 */

(function() {
!function(a){"use strict";try{!function(){}.bind(a)}catch(b){Object.defineProperty(Function.prototype,"bind",{value:function(a){var b=this;return function(){return b.apply(a,arguments)}},enumerable:!1,configurable:!0,writable:!0})}var c="undefined"!=typeof a.HTMLElement,d=function(a){for(var b=null;a&&a!=Object.prototype;){if(a.tagName){b=a.tagName;break}a=a.prototype}return b||"div"},e=1e-8,f={},g=function(a,b){if(a&&b){if("function"==typeof a[b])return a[b];var c=a.prototype;if(c&&"function"==typeof c[b])return c[b];if(c!==Object.prototype&&c!==Function.prototype)return"function"==typeof a.__super__?g(a.__super__,b):void 0}},h=a.c=function(){return h._api?h._api.apply(this,arguments):void 0};h.debug=!1,h.trace=!1,h.verbose=!1,h.traceAdded=!1,h.GC=!1,h.GEQ=1,h.LEQ=2,h.inherit=function(b){var e=null,g=null;b["extends"]&&(g=b["extends"],delete b["extends"]),b.initialize&&(e=b.initialize,delete b.initialize);var i=e||function(){};Object.defineProperty(i,"__super__",{value:g?g:Object,enumerable:!1,configurable:!0,writable:!1}),b._t&&(f[b._t]=i);var j=i.prototype=Object.create(g?g.prototype:Object.prototype);if(h.extend(j,b),c&&g&&g.prototype instanceof a.HTMLElement){var k=i,l=d(j),m=function(a){return a.__proto__=j,k.apply(a,arguments),j.created&&a.created(),j.decorate&&a.decorate(),a};this.extend(j,{upgrade:m}),i=function(){return m(a.document.createElement(l))},i.prototype=j,this.extend(i,{ctor:k})}return i},h.own=function(b,c,d){return Object.getOwnPropertyNames(b).forEach(c,d||a),b},h.extend=function(a,b){return h.own(b,function(c){var d=Object.getOwnPropertyDescriptor(b,c);try{"function"==typeof d.get||"function"==typeof d.set?Object.defineProperty(a,c,d):"function"==typeof d.value||"_"===c.charAt(0)?(d.writable=!0,d.configurable=!0,d.enumerable=!1,Object.defineProperty(a,c,d)):a[c]=b[c]}catch(e){}}),a},h.traceprint=function(a){h.verbose&&console.log(a)},h.fnenterprint=function(a){console.log("* "+a)},h.fnexitprint=function(a){console.log("- "+a)},h.assert=function(a,b){if(!a)throw new h.InternalError("Assertion failed: "+b)};var i=function(a){return"number"==typeof a?h.Expression.fromConstant(a):a instanceof h.Variable?h.Expression.fromVariable(a):a};h.plus=function(a,b){return a=i(a),b=i(b),a.plus(b)},h.minus=function(a,b){return a=i(a),b=i(b),a.minus(b)},h.times=function(a,b){return a=i(a),b=i(b),a.times(b)},h.divide=function(a,b){return a=i(a),b=i(b),a.divide(b)},h.approx=function(a,b){return a===b?!0:(a=+a,b=+b,0==a?Math.abs(b)<e:0==b?Math.abs(a)<e:Math.abs(a-b)<Math.abs(a)*e)};var j=1;h._inc=function(){return j++},h.parseJSON=function(a){return JSON.parse(a,function(a,b){if("object"!=typeof b||"string"!=typeof b._t)return b;var c=b._t,d=f[c];if(c&&d){var e=g(d,"fromJSON");if(e)return e(b,d)}return b})},"function"==typeof define&&define.amd?define(h):"object"==typeof module&&module.exports?module.exports=h:a.c=h}(this),function(a){"use strict";var b=function(a,b){Object.keys(a).forEach(function(c){b[c]=a[c]})},c={};a.HashTable=a.inherit({initialize:function(){this.size=0,this._store={},this._keyStrMap={},this._deleted=0},set:function(a,b){var c=a.hashCode;"undefined"==typeof this._store[c]&&this.size++,this._store[c]=b,this._keyStrMap[c]=a},get:function(a){if(!this.size)return null;a=a.hashCode;var b=this._store[a];return"undefined"!=typeof b?this._store[a]:null},clear:function(){this.size=0,this._store={},this._keyStrMap={}},_compact:function(){var a={};b(this._store,a),this._store=a},_compactThreshold:100,_perhapsCompact:function(){this._size>30||this._deleted>this._compactThreshold&&(this._compact(),this._deleted=0)},"delete":function(a){a=a.hashCode,this._store.hasOwnProperty(a)&&(this._deleted++,delete this._store[a],this.size>0&&this.size--)},each:function(a,b){if(this.size){this._perhapsCompact();var c=this._store,d=this._keyStrMap;for(var e in this._store)this._store.hasOwnProperty(e)&&a.call(b||null,d[e],c[e])}},escapingEach:function(a,b){if(this.size){this._perhapsCompact();for(var d=this,e=this._store,f=this._keyStrMap,g=c,h=Object.keys(e),i=0;i<h.length;i++)if(function(c){d._store.hasOwnProperty(c)&&(g=a.call(b||null,f[c],e[c]))}(h[i]),g){if(void 0!==g.retval)return g;if(g.brk)break}}},clone:function(){var c=new a.HashTable;return this.size&&(c.size=this.size,b(this._store,c._store),b(this._keyStrMap,c._keyStrMap)),c},equals:function(b){if(b===this)return!0;if(!(b instanceof a.HashTable)||b._size!==this._size)return!1;for(var c=Object.keys(this._store),d=0;d<c.length;d++){var e=c[d];if(this._keyStrMap[e]!==b._keyStrMap[e]||this._store[e]!==b._store[e])return!1}return!0},toString:function(){var b="";return this.each(function(a,c){b+=a+" => "+c+"\n"}),b}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.HashSet=a.inherit({_t:"c.HashSet",initialize:function(){this.storage=[],this.size=0,this.hashCode=a._inc()},add:function(a){var b=this.storage;b.indexOf(a),-1==b.indexOf(a)&&(b[b.length]=a),this.size=this.storage.length},values:function(){return this.storage},has:function(a){var b=this.storage;return-1!=b.indexOf(a)},"delete":function(a){var b=this.storage.indexOf(a);return-1==b?null:(this.storage.splice(b,1)[0],this.size=this.storage.length,void 0)},clear:function(){this.storage.length=0},each:function(a,b){this.size&&this.storage.forEach(a,b)},escapingEach:function(a,b){this.size&&this.storage.forEach(a,b)},toString:function(){var a=this.size+" {",b=!0;return this.each(function(c){b?b=!1:a+=", ",a+=c}),a+="}\n"},toJSON:function(){var a=[];return this.each(function(b){a[a.length]=b.toJSON()}),{_t:"c.HashSet",data:a}},fromJSON:function(b){var c=new a.HashSet;return b.data&&(c.size=b.data.length,c.storage=b.data),c}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Error=a.inherit({initialize:function(a){a&&(this._description=a)},_name:"c.Error",_description:"An error has occured in Cassowary",set description(a){this._description=a},get description(){return"("+this._name+") "+this._description},get message(){return this.description},toString:function(){return this.description}});var b=function(b,c){return a.inherit({"extends":a.Error,initialize:function(){a.Error.apply(this,arguments)},_name:b||"",_description:c||""})};a.ConstraintNotFound=b("c.ConstraintNotFound","Tried to remove a constraint never added to the tableu"),a.InternalError=b("c.InternalError"),a.NonExpression=b("c.NonExpression","The resulting expression would be non"),a.NotEnoughStays=b("c.NotEnoughStays","There are not enough stays to give specific values to every variable"),a.RequiredFailure=b("c.RequiredFailure","A required constraint cannot be satisfied"),a.TooDifficult=b("c.TooDifficult","The constraints are too difficult to solve")}(this.c||module.parent.exports||{}),function(a){"use strict";var b=1e3;a.SymbolicWeight=a.inherit({_t:"c.SymbolicWeight",initialize:function(){this.value=0;for(var a=1,c=arguments.length-1;c>=0;--c)this.value+=arguments[c]*a,a*=b},toJSON:function(){return{_t:this._t,value:this.value}}})}(this.c||module.parent.exports||{}),function(a){a.Strength=a.inherit({initialize:function(b,c,d,e){this.name=b,this.symbolicWeight=c instanceof a.SymbolicWeight?c:new a.SymbolicWeight(c,d,e)},get required(){return this===a.Strength.required},toString:function(){return this.name+(this.required?"":":"+this.symbolicWeight)}}),a.Strength.required=new a.Strength("<Required>",1e3,1e3,1e3),a.Strength.strong=new a.Strength("strong",1,0,0),a.Strength.medium=new a.Strength("medium",0,1,0),a.Strength.weak=new a.Strength("weak",0,0,1)}(this.c||("undefined"!=typeof module?module.parent.exports.c:{})),function(a){"use strict";a.AbstractVariable=a.inherit({isDummy:!1,isExternal:!1,isPivotable:!1,isRestricted:!1,_init:function(b,c){this.hashCode=a._inc(),this.name=(c||"")+this.hashCode,b&&("undefined"!=typeof b.name&&(this.name=b.name),"undefined"!=typeof b.value&&(this.value=b.value),"undefined"!=typeof b.prefix&&(this._prefix=b.prefix))},_prefix:"",name:"",value:0,valueOf:function(){return this.value},toJSON:function(){var a={};return this._t&&(a._t=this._t),this.name&&(a.name=this.name),"undefined"!=typeof this.value&&(a.value=this.value),this._prefix&&(a._prefix=this._prefix),this._t&&(a._t=this._t),a},fromJSON:function(b,c){var d=new c;return a.extend(d,b),d},toString:function(){return this._prefix+"["+this.name+":"+this.value+"]"}}),a.Variable=a.inherit({_t:"c.Variable","extends":a.AbstractVariable,initialize:function(b){this._init(b,"v");var c=a.Variable._map;c&&(c[this.name]=this)},isExternal:!0}),a.DummyVariable=a.inherit({_t:"c.DummyVariable","extends":a.AbstractVariable,initialize:function(a){this._init(a,"d")},isDummy:!0,isRestricted:!0,value:"dummy"}),a.ObjectiveVariable=a.inherit({_t:"c.ObjectiveVariable","extends":a.AbstractVariable,initialize:function(a){this._init(a,"o")},value:"obj"}),a.SlackVariable=a.inherit({_t:"c.SlackVariable","extends":a.AbstractVariable,initialize:function(a){this._init(a,"s")},isPivotable:!0,isRestricted:!0,value:"slack"})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Point=a.inherit({initialize:function(b,c,d){if(b instanceof a.Variable)this._x=b;else{var e={value:b};d&&(e.name="x"+d),this._x=new a.Variable(e)}if(c instanceof a.Variable)this._y=c;else{var f={value:c};d&&(f.name="y"+d),this._y=new a.Variable(f)}},get x(){return this._x},set x(b){b instanceof a.Variable?this._x=b:this._x.value=b},get y(){return this._y},set y(b){b instanceof a.Variable?this._y=b:this._y.value=b},toString:function(){return"("+this.x+", "+this.y+")"}})}(this.c||module.parent.exports||{}),function(a){"use strict";var b=function(a,b){return"number"==typeof a?a:b};a.Expression=a.inherit({initialize:function(c,d,e){this.constant=b(e,0),this.terms=new a.HashTable,c instanceof a.AbstractVariable?(d=b(d,1),this.setVariable(c,d)):"number"==typeof c&&(isNaN(c)?console.trace():this.constant=c)},initializeFromHash:function(b,c){return a.verbose&&(console.log("*******************************"),console.log("clone c.initializeFromHash"),console.log("*******************************")),a.GC&&console.log("clone c.Expression"),this.constant=b,this.terms=c.clone(),this},multiplyMe:function(a){this.constant*=a;var b=this.terms;return b.each(function(c,d){b.set(c,d*a)}),this},clone:function(){a.verbose&&(console.log("*******************************"),console.log("clone c.Expression"),console.log("*******************************"));var b=a.Expression.empty();return b.initializeFromHash(this.constant,this.terms),b},times:function(b){if("number"==typeof b)return this.clone().multiplyMe(b);if(this.isConstant)return b.times(this.constant);if(b.isConstant)return this.times(b.constant);throw new a.NonExpression},plus:function(b){return b instanceof a.Expression?this.clone().addExpression(b,1):b instanceof a.Variable?this.clone().addVariable(b,1):void 0},minus:function(b){return b instanceof a.Expression?this.clone().addExpression(b,-1):b instanceof a.Variable?this.clone().addVariable(b,-1):void 0},divide:function(b){if("number"==typeof b){if(a.approx(b,0))throw new a.NonExpression;return this.times(1/b)}if(b instanceof a.Expression){if(!b.isConstant)throw new a.NonExpression;return this.times(1/b.constant)}},addExpression:function(c,d,e,f){return c instanceof a.AbstractVariable&&(c=a.Expression.fromVariable(c)),d=b(d,1),this.constant+=d*c.constant,c.terms.each(function(a,b){this.addVariable(a,b*d,e,f)},this),this},addVariable:function(b,c,d,e){null==c&&(c=1);var f=this.terms.get(b);if(f){var g=f+c;0==g||a.approx(g,0)?(e&&e.noteRemovedVariable(b,d),this.terms.delete(b)):this.setVariable(b,g)}else a.approx(c,0)||(this.setVariable(b,c),e&&e.noteAddedVariable(b,d));return this},setVariable:function(a,b){return this.terms.set(a,b),this},anyPivotableVariable:function(){if(this.isConstant)throw new a.InternalError("anyPivotableVariable called on a constant");var b=this.terms.escapingEach(function(a){return a.isPivotable?{retval:a}:void 0});return b&&void 0!==b.retval?b.retval:null},substituteOut:function(b,c,d,e){this.setVariable.bind(this);var g=this.terms,h=g.get(b);g.delete(b),this.constant+=h*c.constant,c.terms.each(function(b,c){var f=g.get(b);if(f){var i=f+h*c;a.approx(i,0)?(e.noteRemovedVariable(b,d),g.delete(b)):g.set(b,i)}else g.set(b,h*c),e&&e.noteAddedVariable(b,d)})},changeSubject:function(a,b){this.setVariable(a,this.newSubject(b))},newSubject:function(a){var b=1/this.terms.get(a);return this.terms.delete(a),this.multiplyMe(-b),b},coefficientFor:function(a){return this.terms.get(a)||0},get isConstant(){return 0==this.terms.size},toString:function(){var b="",c=!1;if(!a.approx(this.constant,0)||this.isConstant){if(b+=this.constant,this.isConstant)return b;c=!0}return this.terms.each(function(a,d){c&&(b+=" + "),b+=d+"*"+a,c=!0}),b},equals:function(b){return b===this?!0:b instanceof a.Expression&&b.constant===this.constant&&b.terms.equals(this.terms)},Plus:function(a,b){return a.plus(b)},Minus:function(a,b){return a.minus(b)},Times:function(a,b){return a.times(b)},Divide:function(a,b){return a.divide(b)}}),a.Expression.empty=function(){return new a.Expression(void 0,1,0)},a.Expression.fromConstant=function(b){return new a.Expression(b)},a.Expression.fromValue=function(b){return b=+b,new a.Expression(void 0,b,0)},a.Expression.fromVariable=function(b){return new a.Expression(b,1,0)}}(this.c||module.parent.exports||{}),function(a){"use strict";a.AbstractConstraint=a.inherit({initialize:function(b,c){this.hashCode=a._inc(),this.strength=b||a.Strength.required,this.weight=c||1},isEditConstraint:!1,isInequality:!1,isStayConstraint:!1,get required(){return this.strength===a.Strength.required},toString:function(){return this.strength+" {"+this.weight+"} ("+this.expression+")"}});var b=a.AbstractConstraint.prototype.toString,c=function(b,c,d){a.AbstractConstraint.call(this,c||a.Strength.strong,d),this.variable=b,this.expression=new a.Expression(b,-1,b.value)};a.EditConstraint=a.inherit({"extends":a.AbstractConstraint,initialize:function(){c.apply(this,arguments)},isEditConstraint:!0,toString:function(){return"edit:"+b.call(this)}}),a.StayConstraint=a.inherit({"extends":a.AbstractConstraint,initialize:function(){c.apply(this,arguments)},isStayConstraint:!0,toString:function(){return"stay:"+b.call(this)}});var d=a.Constraint=a.inherit({"extends":a.AbstractConstraint,initialize:function(b,c,d){a.AbstractConstraint.call(this,c,d),this.expression=b}});a.Inequality=a.inherit({"extends":a.Constraint,_cloneOrNewCle:function(b){return b.clone?b.clone():new a.Expression(b)},initialize:function(b,c,e,f,g){var h=b instanceof a.Expression,i=e instanceof a.Expression,j=b instanceof a.AbstractVariable,k=e instanceof a.AbstractVariable,l="number"==typeof b,m="number"==typeof e;if((h||l)&&k){var n=b,o=c,p=e,q=f,r=g;if(d.call(this,this._cloneOrNewCle(n),q,r),o==a.LEQ)this.expression.multiplyMe(-1),this.expression.addVariable(p);else{if(o!=a.GEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addVariable(p,-1)}}else if(j&&(i||m)){var n=e,o=c,p=b,q=f,r=g;if(d.call(this,this._cloneOrNewCle(n),q,r),o==a.GEQ)this.expression.multiplyMe(-1),this.expression.addVariable(p);else{if(o!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addVariable(p,-1)}}else{if(h&&m){var s=b,o=c,t=e,q=f,r=g;if(d.call(this,this._cloneOrNewCle(s),q,r),o==a.LEQ)this.expression.multiplyMe(-1),this.expression.addExpression(this._cloneOrNewCle(t));else{if(o!=a.GEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addExpression(this._cloneOrNewCle(t),-1)}return this}if(l&&i){var s=e,o=c,t=b,q=f,r=g;if(d.call(this,this._cloneOrNewCle(s),q,r),o==a.GEQ)this.expression.multiplyMe(-1),this.expression.addExpression(this._cloneOrNewCle(t));else{if(o!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addExpression(this._cloneOrNewCle(t),-1)}return this}if(h&&i){var s=b,o=c,t=e,q=f,r=g;if(d.call(this,this._cloneOrNewCle(t),q,r),o==a.GEQ)this.expression.multiplyMe(-1),this.expression.addExpression(this._cloneOrNewCle(s));else{if(o!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addExpression(this._cloneOrNewCle(s),-1)}}else{if(h)return d.call(this,b,c,e);if(c==a.GEQ)d.call(this,new a.Expression(e),f,g),this.expression.multiplyMe(-1),this.expression.addVariable(b);else{if(c!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");d.call(this,new a.Expression(e),f,g),this.expression.addVariable(b,-1)}}}},isInequality:!0,toString:function(){return d.prototype.toString.call(this)+" >= 0) id: "+this.hashCode}}),a.Equation=a.inherit({"extends":a.Constraint,initialize:function(b,c,e,f){if(b instanceof a.Expression&&!c||c instanceof a.Strength)d.call(this,b,c,e);else if(b instanceof a.AbstractVariable&&c instanceof a.Expression){var g=b,h=c,i=e,j=f;d.call(this,h.clone(),i,j),this.expression.addVariable(g,-1)}else if(b instanceof a.AbstractVariable&&"number"==typeof c){var g=b,k=c,i=e,j=f;d.call(this,new a.Expression(k),i,j),this.expression.addVariable(g,-1)}else if(b instanceof a.Expression&&c instanceof a.AbstractVariable){var h=b,g=c,i=e,j=f;d.call(this,h.clone(),i,j),this.expression.addVariable(g,-1)}else{if(!(b instanceof a.Expression||b instanceof a.AbstractVariable||"number"==typeof b)||!(c instanceof a.Expression||c instanceof a.AbstractVariable||"number"==typeof c))throw"Bad initializer to c.Equation";b=b instanceof a.Expression?b.clone():new a.Expression(b),c=c instanceof a.Expression?c.clone():new a.Expression(c),d.call(this,b,e,f),this.expression.addExpression(c,-1)}a.assert(this.strength instanceof a.Strength,"_strength not set")},toString:function(){return d.prototype.toString.call(this)+" = 0)"}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.EditInfo=a.inherit({initialize:function(a,b,c,d,e){this.constraint=a,this.editPlus=b,this.editMinus=c,this.prevEditConstant=d,this.index=e},toString:function(){return"<cn="+this.constraint+", ep="+this.editPlus+", em="+this.editMinus+", pec="+this.prevEditConstant+", index="+this.index+">"}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Tableau=a.inherit({initialize:function(){this.columns=new a.HashTable,this.rows=new a.HashTable,this._infeasibleRows=new a.HashSet,this._externalRows=new a.HashSet,this._externalParametricVars=new a.HashSet},noteRemovedVariable:function(b,c){a.trace&&console.log("c.Tableau::noteRemovedVariable: ",b,c);var d=this.columns.get(b);c&&d&&d.delete(c)},noteAddedVariable:function(a,b){b&&this.insertColVar(a,b)},getInternalInfo:function(){return"Tableau Information:\nRows: "+this.rows.size+" (= "+(this.rows.size-1)+" constraints)"+"\nColumns: "+this.columns.size+"\nInfeasible Rows: "+this._infeasibleRows.size+"\nExternal basic variables: "+this._externalRows.size+"\nExternal parametric variables: "+this._externalParametricVars.size+"\n"},toString:function(){var a="Tableau:\n";return this.rows.each(function(b,c){a+=b+" <==> "+c+"\n"}),a+="\nColumns:\n",a+=this.columns,a+="\nInfeasible rows: ",a+=this._infeasibleRows,a+="External basic variables: ",a+=this._externalRows,a+="External parametric variables: ",a+=this._externalParametricVars},insertColVar:function(b,c){var d=this.columns.get(b);d||(d=new a.HashSet,this.columns.set(b,d)),d.add(c)},addRow:function(b,c){a.trace&&a.fnenterprint("addRow: "+b+", "+c),this.rows.set(b,c),c.terms.each(function(a){this.insertColVar(a,b),a.isExternal&&this._externalParametricVars.add(a)},this),b.isExternal&&this._externalRows.add(b),a.trace&&a.traceprint(this.toString())},removeColumn:function(b){a.trace&&a.fnenterprint("removeColumn:"+b);var c=this.columns.get(b);c?(this.columns.delete(b),c.each(function(a){var c=this.rows.get(a);c.terms.delete(b)},this)):a.trace&&console.log("Could not find var",b,"in columns"),b.isExternal&&(this._externalRows.delete(b),this._externalParametricVars.delete(b))},removeRow:function(b){a.trace&&a.fnenterprint("removeRow:"+b);var c=this.rows.get(b);return a.assert(null!=c),c.terms.each(function(c){var e=this.columns.get(c);null!=e&&(a.trace&&console.log("removing from varset:",b),e.delete(b))},this),this._infeasibleRows.delete(b),b.isExternal&&this._externalRows.delete(b),this.rows.delete(b),a.trace&&a.fnexitprint("returning "+c),c},substituteOut:function(b,c){a.trace&&a.fnenterprint("substituteOut:"+b+", "+c),a.trace&&a.traceprint(this.toString());var d=this.columns.get(b);d.each(function(a){var d=this.rows.get(a);d.substituteOut(b,c,a,this),a.isRestricted&&d.constant<0&&this._infeasibleRows.add(a)},this),b.isExternal&&(this._externalRows.add(b),this._externalParametricVars.delete(b)),this.columns.delete(b)},columnsHasKey:function(a){return!!this.columns.get(a)}})}(this.c||module.parent.exports||{}),function(a){var b=a.Tableau,c=b.prototype,d=1e-8,e=a.Strength.weak,f={eplus:null,eminus:null,prevEConstant:null};a.SimplexSolver=a.inherit({"extends":a.Tableau,initialize:function(){a.Tableau.call(this),this._stayMinusErrorVars=[],this._stayPlusErrorVars=[],this._errorVars=new a.HashTable,this._markerVars=new a.HashTable,this._objective=new a.ObjectiveVariable({name:"Z"}),this._editVarMap=new a.HashTable,this._editVarList=[],this._slackCounter=0,this._artificialCounter=0,this._dummyCounter=0,this.autoSolve=!0,this._needsSolving=!1,this._optimizeCount=0,this.rows.set(this._objective,a.Expression.empty()),this._editVariableStack=[0],a.trace&&a.traceprint("objective expr == "+this.rows.get(this._objective))},add:function(){for(var a=0;a<arguments.length;a++)this.addConstraint(arguments[a]);return this},_addEditConstraint:function(b,c,d,e){var f=this._editVarMap.size,g=new a.EditInfo(b,c,d,e,f);this._editVarMap.set(b.variable,g),this._editVarList[f]={v:b.variable,info:g}},addConstraint:function(b){a.trace&&a.fnenterprint("addConstraint: "+b);var c=f,d=this.newExpression(b);return this.tryAddingDirectly(d)||this.addWithArtificialVariable(d),this._needsSolving=!0,b.isEditConstraint&&this._addEditConstraint(b,c.eplus,c.eminus,c.prevEConstant),this.autoSolve&&(this.optimize(this._objective),this._setExternalVariables()),this},addConstraintNoException:function(b){a.trace&&a.fnenterprint("addConstraintNoException: "+b);try{return this.addConstraint(b),!0}catch(c){return!1}},addEditVar:function(b,c,d){return a.trace&&a.fnenterprint("addEditVar: "+b+" @ "+c+" {"+d+"}"),this.addConstraint(new a.EditConstraint(b,c||a.Strength.strong,d))},beginEdit:function(){return a.assert(this._editVarMap.size>0,"_editVarMap.size > 0"),this._infeasibleRows.clear(),this._resetStayConstants(),this._editVariableStack[this._editVariableStack.length]=this._editVarMap.size,this},endEdit:function(){return a.assert(this._editVarMap.size>0,"_editVarMap.size > 0"),this.resolve(),this._editVariableStack.pop(),this.removeEditVarsTo(this._editVariableStack[this._editVariableStack.length-1]),this},removeAllEditVars:function(){return this.removeEditVarsTo(0)},removeEditVarsTo:function(b){try{for(var c=this._editVarList.length,d=b;c>d;d++)this._editVarList[d]&&this.removeConstraint(this._editVarMap.get(this._editVarList[d].v).constraint);return this._editVarList.length=b,a.assert(this._editVarMap.size==b,"_editVarMap.size == n"),this}catch(e){throw new a.InternalError("Constraint not found in removeEditVarsTo")}},addPointStays:function(b){return a.trace&&console.log("addPointStays",b),b.forEach(function(a,b){this.addStay(a.x,e,Math.pow(2,b)),this.addStay(a.y,e,Math.pow(2,b))},this),this},addStay:function(b,c,d){var f=new a.StayConstraint(b,c||e,d||1);return this.addConstraint(f)},removeConstraint:function(b){a.trace&&a.fnenterprint("removeConstraintInternal: "+b),a.trace&&a.traceprint(this.toString()),this._needsSolving=!0,this._resetStayConstants();var c=this.rows.get(this._objective),d=this._errorVars.get(b);a.trace&&a.traceprint("eVars == "+d),null!=d&&d.each(function(e){var f=this.rows.get(e);null==f?c.addVariable(e,-b.weight*b.strength.symbolicWeight.value,this._objective,this):c.addExpression(f,-b.weight*b.strength.symbolicWeight.value,this._objective,this),a.trace&&a.traceprint("now eVars == "+d)},this);var e=this._markerVars.get(b);if(this._markerVars.delete(b),null==e)throw new a.InternalError("Constraint not found in removeConstraintInternal");if(a.trace&&a.traceprint("Looking to remove var "+e),null==this.rows.get(e)){var f=this.columns.get(e);a.trace&&a.traceprint("Must pivot -- columns are "+f);var g=null,h=0;f.each(function(b){if(b.isRestricted){var c=this.rows.get(b),d=c.coefficientFor(e);if(a.trace&&a.traceprint("Marker "+e+"'s coefficient in "+c+" is "+d),0>d){var f=-c.constant/d;(null==g||h>f||a.approx(f,h)&&b.hashCode<g.hashCode)&&(h=f,g=b)}}},this),null==g&&(a.trace&&a.traceprint("exitVar is still null"),f.each(function(a){if(a.isRestricted){var b=this.rows.get(a),c=b.coefficientFor(e),d=b.constant/c;(null==g||h>d)&&(h=d,g=a)}},this)),null==g&&(0==f.size?this.removeColumn(e):f.escapingEach(function(a){return a!=this._objective?(g=a,{brk:!0}):void 0},this)),null!=g&&this.pivot(e,g)}if(null!=this.rows.get(e)&&this.removeRow(e),null!=d&&d.each(function(a){a!=e&&this.removeColumn(a)},this),b.isStayConstraint){if(null!=d)for(var j=0;j<this._stayPlusErrorVars.length;j++)d.delete(this._stayPlusErrorVars[j]),d.delete(this._stayMinusErrorVars[j])}else if(b.isEditConstraint){var k=this._editVarMap.get(b.variable);this.removeColumn(k.editMinus),this._editVarMap.delete(b.variable)}return null!=d&&this._errorVars.delete(d),this.autoSolve&&(this.optimize(this._objective),this._setExternalVariables()),this},reset:function(){throw a.trace&&a.fnenterprint("reset"),new a.InternalError("reset not implemented")},resolveArray:function(b){a.trace&&a.fnenterprint("resolveArray"+b);var c=b.length;this._editVarMap.each(function(a,d){var e=d.index;c>e&&this.suggestValue(a,b[e])},this),this.resolve()},resolvePair:function(a,b){this.suggestValue(this._editVarList[0].v,a),this.suggestValue(this._editVarList[1].v,b),this.resolve()},resolve:function(){a.trace&&a.fnenterprint("resolve()"),this.dualOptimize(),this._setExternalVariables(),this._infeasibleRows.clear(),this._resetStayConstants()},suggestValue:function(b,c){a.trace&&console.log("suggestValue("+b+", "+c+")");var d=this._editVarMap.get(b);if(!d)throw new a.Error("suggestValue for variable "+b+", but var is not an edit variable");var e=c-d.prevEditConstant;return d.prevEditConstant=c,this.deltaEditConstant(e,d.editPlus,d.editMinus),this},solve:function(){return this._needsSolving&&(this.optimize(this._objective),this._setExternalVariables()),this},setEditedValue:function(b,c){if(!this.columnsHasKey(b)&&null==this.rows.get(b))return b.value=c,this;if(!a.approx(c,b.value)){this.addEditVar(b),this.beginEdit();try{this.suggestValue(b,c)}catch(d){throw new a.InternalError("Error in setEditedValue")}this.endEdit()}return this},addVar:function(b){if(!this.columnsHasKey(b)&&null==this.rows.get(b)){try{this.addStay(b)}catch(c){throw new a.InternalError("Error in addVar -- required failure is impossible")}a.trace&&a.traceprint("added initial stay on "+b)}return this},getInternalInfo:function(){var a=c.getInternalInfo.call(this);return a+="\nSolver info:\n",a+="Stay Error Variables: ",a+=this._stayPlusErrorVars.length+this._stayMinusErrorVars.length,a+=" ("+this._stayPlusErrorVars.length+" +, ",a+=this._stayMinusErrorVars.length+" -)\n",a+="Edit Variables: "+this._editVarMap.size,a+="\n"},getDebugInfo:function(){return this.toString()+this.getInternalInfo()+"\n"},toString:function(){var a=c.getInternalInfo.call(this);return a+="\n_stayPlusErrorVars: ",a+="["+this._stayPlusErrorVars+"]",a+="\n_stayMinusErrorVars: ",a+="["+this._stayMinusErrorVars+"]",a+="\n",a+="_editVarMap:\n"+this._editVarMap,a+="\n"},addWithArtificialVariable:function(b){a.trace&&a.fnenterprint("addWithArtificialVariable: "+b);var c=new a.SlackVariable({value:++this._artificialCounter,prefix:"a"}),d=new a.ObjectiveVariable({name:"az"}),e=b.clone();a.trace&&a.traceprint("before addRows:\n"+this),this.addRow(d,e),this.addRow(c,b),a.trace&&a.traceprint("after addRows:\n"+this),this.optimize(d);var f=this.rows.get(d);if(a.trace&&a.traceprint("azTableauRow.constant == "+f.constant),!a.approx(f.constant,0))throw this.removeRow(d),this.removeColumn(c),new a.RequiredFailure;var g=this.rows.get(c);if(null!=g){if(g.isConstant)return this.removeRow(c),this.removeRow(d),void 0;var h=g.anyPivotableVariable();this.pivot(h,c)}a.assert(null==this.rows.get(c),"rowExpression(av) == null"),this.removeColumn(c),this.removeRow(d)},tryAddingDirectly:function(b){a.trace&&a.fnenterprint("tryAddingDirectly: "+b);var c=this.chooseSubject(b);return null==c?(a.trace&&a.fnexitprint("returning false"),!1):(b.newSubject(c),this.columnsHasKey(c)&&this.substituteOut(c,b),this.addRow(c,b),a.trace&&a.fnexitprint("returning true"),!0)},chooseSubject:function(b){a.trace&&a.fnenterprint("chooseSubject: "+b);var c=null,d=!1,e=!1,f=b.terms,g=f.escapingEach(function(a,b){if(d){if(!a.isRestricted&&!this.columnsHasKey(a))return{retval:a}}else if(a.isRestricted){if(!e&&!a.isDummy&&0>b){var f=this.columns.get(a);(null==f||1==f.size&&this.columnsHasKey(this._objective))&&(c=a,e=!0)}}else c=a,d=!0},this);if(g&&void 0!==g.retval)return g.retval;if(null!=c)return c;var h=0,g=f.escapingEach(function(a,b){return a.isDummy?(this.columnsHasKey(a)||(c=a,h=b),void 0):{retval:null}},this);if(g&&void 0!==g.retval)return g.retval;if(!a.approx(b.constant,0))throw new a.RequiredFailure;return h>0&&b.multiplyMe(-1),c},deltaEditConstant:function(b,c,d){a.trace&&a.fnenterprint("deltaEditConstant :"+b+", "+c+", "+d);var e=this.rows.get(c);if(null!=e)return e.constant+=b,e.constant<0&&this._infeasibleRows.add(c),void 0;var f=this.rows.get(d);if(null!=f)return f.constant+=-b,f.constant<0&&this._infeasibleRows.add(d),void 0;var g=this.columns.get(d);g||console.log("columnVars is null -- tableau is:\n"+this),g.each(function(a){var c=this.rows.get(a),e=c.coefficientFor(d);c.constant+=e*b,a.isRestricted&&c.constant<0&&this._infeasibleRows.add(a)},this)},dualOptimize:function(){a.trace&&a.fnenterprint("dualOptimize:");for(var b=this.rows.get(this._objective);this._infeasibleRows.size;){var c=this._infeasibleRows.values()[0];this._infeasibleRows.delete(c);var d=null,e=this.rows.get(c);if(e&&e.constant<0){var g,f=Number.MAX_VALUE,h=e.terms;if(h.each(function(c,e){if(e>0&&c.isPivotable){var h=b.coefficientFor(c);g=h/e,(f>g||a.approx(g,f)&&c.hashCode<d.hashCode)&&(d=c,f=g)}}),f==Number.MAX_VALUE)throw new a.InternalError("ratio == nil (MAX_VALUE) in dualOptimize");this.pivot(d,c)}}},newExpression:function(b){a.trace&&(a.fnenterprint("newExpression: "+b),a.traceprint("cn.isInequality == "+b.isInequality),a.traceprint("cn.required == "+b.required));var c=f;c.eplus=null,c.eminus=null,c.prevEConstant=null;var d=b.expression,e=a.Expression.fromConstant(d.constant),g=new a.SlackVariable,h=new a.DummyVariable,i=new a.SlackVariable,j=new a.SlackVariable,k=d.terms;if(k.each(function(a,b){var c=this.rows.get(a);c?e.addExpression(c,b):e.addVariable(a,b)},this),b.isInequality){if(a.trace&&a.traceprint("Inequality, adding slack"),++this._slackCounter,g=new a.SlackVariable({value:this._slackCounter,prefix:"s"}),e.setVariable(g,-1),this._markerVars.set(b,g),!b.required){++this._slackCounter,i=new a.SlackVariable({value:this._slackCounter,prefix:"em"}),e.setVariable(i,1);var l=this.rows.get(this._objective);l.setVariable(i,b.strength.symbolicWeight.value*b.weight),this.insertErrorVar(b,i),this.noteAddedVariable(i,this._objective)}}else if(b.required)a.trace&&a.traceprint("Equality, required"),++this._dummyCounter,h=new a.DummyVariable({value:this._dummyCounter,prefix:"d"}),c.eplus=h,c.eminus=h,c.prevEConstant=d.constant,e.setVariable(h,1),this._markerVars.set(b,h),a.trace&&a.traceprint("Adding dummyVar == d"+this._dummyCounter);else{a.trace&&a.traceprint("Equality, not required"),++this._slackCounter,j=new a.SlackVariable({value:this._slackCounter,prefix:"ep"}),i=new a.SlackVariable({value:this._slackCounter,prefix:"em"}),e.setVariable(j,-1),e.setVariable(i,1),this._markerVars.set(b,j);
var l=this.rows.get(this._objective);a.trace&&console.log(l);var m=b.strength.symbolicWeight.value*b.weight;0==m&&(a.trace&&a.traceprint("cn == "+b),a.trace&&a.traceprint("adding "+j+" and "+i+" with swCoeff == "+m)),l.setVariable(j,m),this.noteAddedVariable(j,this._objective),l.setVariable(i,m),this.noteAddedVariable(i,this._objective),this.insertErrorVar(b,i),this.insertErrorVar(b,j),b.isStayConstraint?(this._stayPlusErrorVars[this._stayPlusErrorVars.length]=j,this._stayMinusErrorVars[this._stayMinusErrorVars.length]=i):b.isEditConstraint&&(c.eplus=j,c.eminus=i,c.prevEConstant=d.constant)}return e.constant<0&&e.multiplyMe(-1),a.trace&&a.fnexitprint("returning "+e),e},optimize:function(b){a.trace&&a.fnenterprint("optimize: "+b),a.trace&&a.traceprint(this.toString()),this._optimizeCount++;var c=this.rows.get(b);a.assert(null!=c,"zRow != null");for(var g,h,e=null,f=null;;){if(g=0,h=c.terms,h.escapingEach(function(a,b){return a.isPivotable&&g>b?(g=b,e=a,{brk:1}):void 0},this),g>=-d)return;a.trace&&console.log("entryVar:",e,"objectiveCoeff:",g);var i=Number.MAX_VALUE,j=this.columns.get(e),k=0;if(j.each(function(b){if(a.trace&&a.traceprint("Checking "+b),b.isPivotable){var c=this.rows.get(b),d=c.coefficientFor(e);a.trace&&a.traceprint("pivotable, coeff = "+d),0>d&&(k=-c.constant/d,(i>k||a.approx(k,i)&&b.hashCode<f.hashCode)&&(i=k,f=b))}},this),i==Number.MAX_VALUE)throw new a.InternalError("Objective function is unbounded in optimize");this.pivot(e,f),a.trace&&a.traceprint(this.toString())}},pivot:function(b,c){a.trace&&console.log("pivot: ",b,c);var d=!1;d&&console.time(" SimplexSolver::pivot"),null==b&&console.warn("pivot: entryVar == null"),null==c&&console.warn("pivot: exitVar == null"),d&&console.time("  removeRow");var e=this.removeRow(c);d&&console.timeEnd("  removeRow"),d&&console.time("  changeSubject"),e.changeSubject(c,b),d&&console.timeEnd("  changeSubject"),d&&console.time("  substituteOut"),this.substituteOut(b,e),d&&console.timeEnd("  substituteOut"),d&&console.time("  addRow"),this.addRow(b,e),d&&console.timeEnd("  addRow"),d&&console.timeEnd(" SimplexSolver::pivot")},_resetStayConstants:function(){a.trace&&console.log("_resetStayConstants");for(var b=this._stayPlusErrorVars,c=b.length,d=0;c>d;d++){var e=this.rows.get(b[d]);null===e&&(e=this.rows.get(this._stayMinusErrorVars[d])),null!=e&&(e.constant=0)}},_setExternalVariables:function(){a.trace&&a.fnenterprint("_setExternalVariables:"),a.trace&&a.traceprint(this.toString());var b={};this._externalParametricVars.each(function(c){null!=this.rows.get(c)?a.trace&&console.log("Error: variable"+c+" in _externalParametricVars is basic"):(c.value=0,b[c.name]=0)},this),this._externalRows.each(function(a){var c=this.rows.get(a);a.value!=c.constant&&(a.value=c.constant,b[a.name]=c.constant)},this),this._changed=b,this._needsSolving=!1,this._informCallbacks(),this.onsolved()},onsolved:function(){},_informCallbacks:function(){if(this._callbacks){var a=this._changed;this._callbacks.forEach(function(b){b(a)})}},_addCallback:function(a){var b=this._callbacks||(this._callbacks=[]);b[b.length]=a},insertErrorVar:function(b,c){a.trace&&a.fnenterprint("insertErrorVar:"+b+", "+c);var d=this._errorVars.get(b);d||(d=new a.HashSet,this._errorVars.set(b,d)),d.add(c)}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Timer=a.inherit({initialize:function(){this.isRunning=!1,this._elapsedMs=0},start:function(){return this.isRunning=!0,this._startReading=new Date,this},stop:function(){return this.isRunning=!1,this._elapsedMs+=new Date-this._startReading,this},reset:function(){return this.isRunning=!1,this._elapsedMs=0,this},elapsedTime:function(){return this.isRunning?(this._elapsedMs+(new Date-this._startReading))/1e3:this._elapsedMs/1e3}})}(this.c||module.parent.exports||{}),this.c.parser=function(){function a(a){return'"'+a.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\x08/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g,escape)+'"'}var b={parse:function(b,c){function k(a){g>e||(e>g&&(g=e,h=[]),h.push(a))}function l(){var a,b,c,d,f;if(d=e,f=e,a=A(),null!==a){for(b=[],c=m();null!==c;)b.push(c),c=m();null!==b?(c=A(),null!==c?a=[a,b,c]:(a=null,e=f)):(a=null,e=f)}else a=null,e=f;return null!==a&&(a=function(a,b){return b}(d,a[1])),null===a&&(e=d),a}function m(){var a,b,c,d;return c=e,d=e,a=Q(),null!==a?(b=t(),null!==b?a=[a,b]:(a=null,e=d)):(a=null,e=d),null!==a&&(a=function(a,b){return b}(c,a[0])),null===a&&(e=c),a}function n(){var a;return b.length>e?(a=b.charAt(e),e++):(a=null,0===f&&k("any character")),a}function o(){var a;return/^[a-zA-Z]/.test(b.charAt(e))?(a=b.charAt(e),e++):(a=null,0===f&&k("[a-zA-Z]")),null===a&&(36===b.charCodeAt(e)?(a="$",e++):(a=null,0===f&&k('"$"')),null===a&&(95===b.charCodeAt(e)?(a="_",e++):(a=null,0===f&&k('"_"')))),a}function p(){var a;return a=o(),null===a&&(/^[0-9]/.test(b.charAt(e))?(a=b.charAt(e),e++):(a=null,0===f&&k("[0-9]"))),a}function q(){var a;return f++,/^[\t\x0B\f \xA0\uFEFF]/.test(b.charAt(e))?(a=b.charAt(e),e++):(a=null,0===f&&k("[\\t\\x0B\\f \\xA0\\uFEFF]")),f--,0===f&&null===a&&k("whitespace"),a}function r(){var a;return/^[\n\r\u2028\u2029]/.test(b.charAt(e))?(a=b.charAt(e),e++):(a=null,0===f&&k("[\\n\\r\\u2028\\u2029]")),a}function s(){var a;return f++,10===b.charCodeAt(e)?(a="\n",e++):(a=null,0===f&&k('"\\n"')),null===a&&("\r\n"===b.substr(e,2)?(a="\r\n",e+=2):(a=null,0===f&&k('"\\r\\n"')),null===a&&(13===b.charCodeAt(e)?(a="\r",e++):(a=null,0===f&&k('"\\r"')),null===a&&(8232===b.charCodeAt(e)?(a="\u2028",e++):(a=null,0===f&&k('"\\u2028"')),null===a&&(8233===b.charCodeAt(e)?(a="\u2029",e++):(a=null,0===f&&k('"\\u2029"')))))),f--,0===f&&null===a&&k("end of line"),a}function t(){var a,c,d;return d=e,a=A(),null!==a?(59===b.charCodeAt(e)?(c=";",e++):(c=null,0===f&&k('";"')),null!==c?a=[a,c]:(a=null,e=d)):(a=null,e=d),null===a&&(d=e,a=z(),null!==a?(c=s(),null!==c?a=[a,c]:(a=null,e=d)):(a=null,e=d),null===a&&(d=e,a=A(),null!==a?(c=u(),null!==c?a=[a,c]:(a=null,e=d)):(a=null,e=d))),a}function u(){var a,c;return c=e,f++,b.length>e?(a=b.charAt(e),e++):(a=null,0===f&&k("any character")),f--,null===a?a="":(a=null,e=c),a}function v(){var a;return f++,a=w(),null===a&&(a=y()),f--,0===f&&null===a&&k("comment"),a}function w(){var a,c,d,g,h,i,j;if(h=e,"/*"===b.substr(e,2)?(a="/*",e+=2):(a=null,0===f&&k('"/*"')),null!==a){for(c=[],i=e,j=e,f++,"*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==d;)c.push(d),i=e,j=e,f++,"*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==c?("*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),null!==d?a=[a,c,d]:(a=null,e=h)):(a=null,e=h)}else a=null,e=h;return a}function x(){var a,c,d,g,h,i,j;if(h=e,"/*"===b.substr(e,2)?(a="/*",e+=2):(a=null,0===f&&k('"/*"')),null!==a){for(c=[],i=e,j=e,f++,"*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),null===d&&(d=r()),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==d;)c.push(d),i=e,j=e,f++,"*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),null===d&&(d=r()),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==c?("*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),null!==d?a=[a,c,d]:(a=null,e=h)):(a=null,e=h)}else a=null,e=h;return a}function y(){var a,c,d,g,h,i,j;if(h=e,"//"===b.substr(e,2)?(a="//",e+=2):(a=null,0===f&&k('"//"')),null!==a){for(c=[],i=e,j=e,f++,d=r(),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==d;)c.push(d),i=e,j=e,f++,d=r(),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==c?(d=r(),null===d&&(d=u()),null!==d?a=[a,c,d]:(a=null,e=h)):(a=null,e=h)}else a=null,e=h;return a}function z(){var a,b;for(a=[],b=q(),null===b&&(b=x(),null===b&&(b=y()));null!==b;)a.push(b),b=q(),null===b&&(b=x(),null===b&&(b=y()));return a}function A(){var a,b;for(a=[],b=q(),null===b&&(b=s(),null===b&&(b=v()));null!==b;)a.push(b),b=q(),null===b&&(b=s(),null===b&&(b=v()));return a}function B(){var a,b;return b=e,a=D(),null===a&&(a=C()),null!==a&&(a=function(a,b){return{type:"NumericLiteral",value:b}}(b,a)),null===a&&(e=b),a}function C(){var a,c,d;if(d=e,/^[0-9]/.test(b.charAt(e))?(c=b.charAt(e),e++):(c=null,0===f&&k("[0-9]")),null!==c)for(a=[];null!==c;)a.push(c),/^[0-9]/.test(b.charAt(e))?(c=b.charAt(e),e++):(c=null,0===f&&k("[0-9]"));else a=null;return null!==a&&(a=function(a,b){return parseInt(b.join(""))}(d,a)),null===a&&(e=d),a}function D(){var a,c,d,g,h;return g=e,h=e,a=C(),null!==a?(46===b.charCodeAt(e)?(c=".",e++):(c=null,0===f&&k('"."')),null!==c?(d=C(),null!==d?a=[a,c,d]:(a=null,e=h)):(a=null,e=h)):(a=null,e=h),null!==a&&(a=function(a,b){return parseFloat(b.join(""))}(g,a)),null===a&&(e=g),a}function E(){var a,c,d,g;if(g=e,/^[\-+]/.test(b.charAt(e))?(a=b.charAt(e),e++):(a=null,0===f&&k("[\\-+]")),a=null!==a?a:"",null!==a){if(/^[0-9]/.test(b.charAt(e))?(d=b.charAt(e),e++):(d=null,0===f&&k("[0-9]")),null!==d)for(c=[];null!==d;)c.push(d),/^[0-9]/.test(b.charAt(e))?(d=b.charAt(e),e++):(d=null,0===f&&k("[0-9]"));else c=null;null!==c?a=[a,c]:(a=null,e=g)}else a=null,e=g;return a}function F(){var a,b;return f++,b=e,a=G(),null!==a&&(a=function(a,b){return b}(b,a)),null===a&&(e=b),f--,0===f&&null===a&&k("identifier"),a}function G(){var a,b,c,d,g;if(f++,d=e,g=e,a=o(),null!==a){for(b=[],c=p();null!==c;)b.push(c),c=p();null!==b?a=[a,b]:(a=null,e=g)}else a=null,e=g;return null!==a&&(a=function(a,b,c){return b+c.join("")}(d,a[0],a[1])),null===a&&(e=d),f--,0===f&&null===a&&k("identifier"),a}function H(){var a,c,d,g,h,i,j;return i=e,a=F(),null!==a&&(a=function(a,b){return{type:"Variable",name:b}}(i,a)),null===a&&(e=i),null===a&&(a=B(),null===a&&(i=e,j=e,40===b.charCodeAt(e)?(a="(",e++):(a=null,0===f&&k('"("')),null!==a?(c=A(),null!==c?(d=Q(),null!==d?(g=A(),null!==g?(41===b.charCodeAt(e)?(h=")",e++):(h=null,0===f&&k('")"')),null!==h?a=[a,c,d,g,h]:(a=null,e=j)):(a=null,e=j)):(a=null,e=j)):(a=null,e=j)):(a=null,e=j),null!==a&&(a=function(a,b){return b}(i,a[2])),null===a&&(e=i))),a}function I(){var a,b,c,d,f;return a=H(),null===a&&(d=e,f=e,a=J(),null!==a?(b=A(),null!==b?(c=I(),null!==c?a=[a,b,c]:(a=null,e=f)):(a=null,e=f)):(a=null,e=f),null!==a&&(a=function(a,b,c){return{type:"UnaryExpression",operator:b,expression:c}}(d,a[0],a[2])),null===a&&(e=d)),a}function J(){var a;return 43===b.charCodeAt(e)?(a="+",e++):(a=null,0===f&&k('"+"')),null===a&&(45===b.charCodeAt(e)?(a="-",e++):(a=null,0===f&&k('"-"')),null===a&&(33===b.charCodeAt(e)?(a="!",e++):(a=null,0===f&&k('"!"')))),a}function K(){var a,b,c,d,f,g,h,i,j;if(h=e,i=e,a=I(),null!==a){for(b=[],j=e,c=A(),null!==c?(d=L(),null!==d?(f=A(),null!==f?(g=I(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==c;)b.push(c),j=e,c=A(),null!==c?(d=L(),null!==d?(f=A(),null!==f?(g=I(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==b?a=[a,b]:(a=null,e=i)}else a=null,e=i;return null!==a&&(a=function(a,b,c){for(var d=b,e=0;e<c.length;e++)d={type:"MultiplicativeExpression",operator:c[e][1],left:d,right:c[e][3]};return d}(h,a[0],a[1])),null===a&&(e=h),a}function L(){var a;return 42===b.charCodeAt(e)?(a="*",e++):(a=null,0===f&&k('"*"')),null===a&&(47===b.charCodeAt(e)?(a="/",e++):(a=null,0===f&&k('"/"'))),a}function M(){var a,b,c,d,f,g,h,i,j;if(h=e,i=e,a=K(),null!==a){for(b=[],j=e,c=A(),null!==c?(d=N(),null!==d?(f=A(),null!==f?(g=K(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==c;)b.push(c),j=e,c=A(),null!==c?(d=N(),null!==d?(f=A(),null!==f?(g=K(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==b?a=[a,b]:(a=null,e=i)}else a=null,e=i;return null!==a&&(a=function(a,b,c){for(var d=b,e=0;e<c.length;e++)d={type:"AdditiveExpression",operator:c[e][1],left:d,right:c[e][3]};return d}(h,a[0],a[1])),null===a&&(e=h),a}function N(){var a;return 43===b.charCodeAt(e)?(a="+",e++):(a=null,0===f&&k('"+"')),null===a&&(45===b.charCodeAt(e)?(a="-",e++):(a=null,0===f&&k('"-"'))),a}function O(){var a,b,c,d,f,g,h,i,j;if(h=e,i=e,a=M(),null!==a){for(b=[],j=e,c=A(),null!==c?(d=P(),null!==d?(f=A(),null!==f?(g=M(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==c;)b.push(c),j=e,c=A(),null!==c?(d=P(),null!==d?(f=A(),null!==f?(g=M(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==b?a=[a,b]:(a=null,e=i)}else a=null,e=i;return null!==a&&(a=function(a,b,c){for(var d=b,e=0;e<c.length;e++)d={type:"Inequality",operator:c[e][1],left:d,right:c[e][3]};return d}(h,a[0],a[1])),null===a&&(e=h),a}function P(){var a;return"<="===b.substr(e,2)?(a="<=",e+=2):(a=null,0===f&&k('"<="')),null===a&&(">="===b.substr(e,2)?(a=">=",e+=2):(a=null,0===f&&k('">="')),null===a&&(60===b.charCodeAt(e)?(a="<",e++):(a=null,0===f&&k('"<"')),null===a&&(62===b.charCodeAt(e)?(a=">",e++):(a=null,0===f&&k('">"'))))),a}function Q(){var a,c,d,g,h,i,j,l,m;if(j=e,l=e,a=O(),null!==a){for(c=[],m=e,d=A(),null!==d?("=="===b.substr(e,2)?(g="==",e+=2):(g=null,0===f&&k('"=="')),null!==g?(h=A(),null!==h?(i=O(),null!==i?d=[d,g,h,i]:(d=null,e=m)):(d=null,e=m)):(d=null,e=m)):(d=null,e=m);null!==d;)c.push(d),m=e,d=A(),null!==d?("=="===b.substr(e,2)?(g="==",e+=2):(g=null,0===f&&k('"=="')),null!==g?(h=A(),null!==h?(i=O(),null!==i?d=[d,g,h,i]:(d=null,e=m)):(d=null,e=m)):(d=null,e=m)):(d=null,e=m);null!==c?a=[a,c]:(a=null,e=l)}else a=null,e=l;return null!==a&&(a=function(a,b,c){for(var d=b,e=0;e<c.length;e++)d={type:"Equality",operator:c[e][1],left:d,right:c[e][3]};return d}(j,a[0],a[1])),null===a&&(e=j),a}function R(a){a.sort();for(var b=null,c=[],d=0;d<a.length;d++)a[d]!==b&&(c.push(a[d]),b=a[d]);return c}function S(){for(var a=1,c=1,d=!1,f=0;f<Math.max(e,g);f++){var h=b.charAt(f);"\n"===h?(d||a++,c=1,d=!1):"\r"===h||"\u2028"===h||"\u2029"===h?(a++,c=1,d=!0):(c++,d=!1)}return{line:a,column:c}}var d={start:l,Statement:m,SourceCharacter:n,IdentifierStart:o,IdentifierPart:p,WhiteSpace:q,LineTerminator:r,LineTerminatorSequence:s,EOS:t,EOF:u,Comment:v,MultiLineComment:w,MultiLineCommentNoLineTerminator:x,SingleLineComment:y,_:z,__:A,Literal:B,Integer:C,Real:D,SignedInteger:E,Identifier:F,IdentifierName:G,PrimaryExpression:H,UnaryExpression:I,UnaryOperator:J,MultiplicativeExpression:K,MultiplicativeOperator:L,AdditiveExpression:M,AdditiveOperator:N,InequalityExpression:O,InequalityOperator:P,LinearExpression:Q};if(void 0!==c){if(void 0===d[c])throw new Error("Invalid rule name: "+a(c)+".")}else c="start";var e=0,f=0,g=0,h=[],T=d[c]();if(null===T||e!==b.length){var U=Math.max(e,g),V=U<b.length?b.charAt(U):null,W=S();throw new this.SyntaxError(R(h),V,U,W.line,W.column)}return T},toSource:function(){return this._source}};return b.SyntaxError=function(b,c,d,e,f){function g(b,c){var d,e;switch(b.length){case 0:d="end of input";break;case 1:d=b[0];break;default:d=b.slice(0,b.length-1).join(", ")+" or "+b[b.length-1]}return e=c?a(c):"end of input","Expected "+d+" but "+e+" found."}this.name="SyntaxError",this.expected=b,this.found=c,this.message=g(b,c),this.offset=d,this.line=e,this.column=f},b.SyntaxError.prototype=Error.prototype,b}(),function(a){"use strict";var b=new a.SimplexSolver,c={},d={},e=a.Strength.weak;a.Strength.medium,a.Strength.strong,a.Strength.required;var i=function(f){if(d[f])return d[f];switch(f.type){case"Inequality":var g="<="==f.operator?a.LEQ:a.GEQ,h=new a.Inequality(i(f.left),g,i(f.right),e);return b.addConstraint(h),h;case"Equality":var h=new a.Equation(i(f.left),i(f.right),e);return b.addConstraint(h),h;case"MultiplicativeExpression":var h=a.times(i(f.left),i(f.right));return b.addConstraint(h),h;case"AdditiveExpression":return"+"==f.operator?a.plus(i(f.left),i(f.right)):a.minus(i(f.left),i(f.right));case"NumericLiteral":return new a.Expression(f.value);case"Variable":return c[f.name]||(c[f.name]=new a.Variable({name:f.name})),c[f.name];case"UnaryExpression":console.log("UnaryExpression...WTF?")}},j=function(a){return a.map(i)};a._api=function(){var c=Array.prototype.slice.call(arguments);if(1==c.length){if("string"==typeof c[0]){var d=a.parser.parse(c[0]);return j(d)}"function"==typeof c[0]&&b._addCallback(c[0])}}}(this.c||module.parent.exports||{});
}).call(
  (typeof module != "undefined") ?
      (module.compiled = true && module) : this
);

},{}],4:[function(require,module,exports){
var Grammar, cloneCommand;

cloneCommand = function(command) {
  var clone, part, _i, _len;
  clone = [];
  for (_i = 0, _len = command.length; _i < _len; _i++) {
    part = command[_i];
    if (typeof part !== 'object') {
      clone.push(part);
    } else if (part instanceof Array) {
      clone.push(cloneCommand(part));
    }
  }
  return clone;
};

Grammar = (function() {
  /* Private*/

  Grammar._toString = function(input) {
    if (Object.prototype.toString.call(input) === '[object String]') {
      return input;
    }
    if (Object.prototype.toString.call(input) === '[object Array]') {
      return input.join('');
    }
    return '';
  };

  Grammar.prototype._Error = null;

  Grammar.prototype._columnNumber = function() {};

  Grammar.prototype._lineNumber = function() {};

  /* Public*/


  Grammar.prototype.reverseFilterNest = function(commands) {
    var i, innie, innieClone, len, outie, outieCommand, results, _i, _len, _ref;
    len = commands.length;
    i = len - 1;
    while (i > 0) {
      outie = commands[i];
      innie = commands[i - 1];
      if (outie[0] === ',') {
        results = [','];
        _ref = outie.slice(1, outie.length);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          outieCommand = _ref[_i];
          innieClone = cloneCommand(innie);
          results.push(this.reverseFilterNest([innieClone, outieCommand]));
        }
        commands[i] = results;
      } else if (outie[0] === '$pseudo' && innie[0] === ',') {
        if (outie[1] === 'first' && innie[1][0] === 'virtual') {
          commands[i] = innie[1];
        } else if (outie[1] === 'last' && innie[innie.length - 1][0] === 'virtual') {
          commands[i] = innie[innie.length - 1];
        }
      } else {
        outie.splice(1, 0, innie);
      }
      i--;
    }
    return commands[len - 1];
  };

  Grammar.prototype.nestedDualTermCommands = function(head, tail) {
    var index, item, result, _i, _len;
    result = head;
    for (index = _i = 0, _len = tail.length; _i < _len; index = ++_i) {
      item = tail[index];
      result = [tail[index][1], result, tail[index][3]];
    }
    return result;
  };

  Grammar.prototype.createSelectorCommaCommand = function(head, tail) {
    var index, item, result, subSel, _i, _len;
    if (head[0] === ',') {
      result = head;
    } else {
      result = [',', head];
    }
    for (index = _i = 0, _len = tail.length; _i < _len; index = ++_i) {
      item = tail[index];
      subSel = tail[index][3];
      if (subSel[0] === ',') {
        subSel.splice(0, 1);
        result = result.concat(subSel);
      } else {
        result.push(subSel);
      }
    }
    return result;
  };

  Grammar.prototype.mergeCommands = function(objs) {
    var commands, o, _i, _len;
    commands = [];
    for (_i = 0, _len = objs.length; _i < _len; _i++) {
      o = objs[_i];
      commands = commands.concat(o.commands);
    }
    return {
      commands: commands
    };
  };

  Grammar.prototype.splatifyIfNeeded = function(commandBase, o) {
    if (o.splats) {
      return this.splatExpander(commandBase, o);
    } else {
      return [commandBase, o];
    }
  };

  Grammar.prototype.splatExpander = function(commandBase, o) {
    var command, cur, currentNames, from, i, name, names, newNames, postfix, prefix, splat, splats, to, _i, _j, _k, _l, _len, _len1, _len2, _len3;
    splats = o.splats, postfix = o.postfix;
    names = null;
    for (_i = 0, _len = splats.length; _i < _len; _i++) {
      splat = splats[_i];
      prefix = splat.prefix, from = splat.from, to = splat.to;
      currentNames = [];
      i = from;
      while (i <= to) {
        currentNames.push(prefix + i);
        i++;
      }
      if (!names) {
        names = currentNames;
      } else {
        newNames = [];
        for (_j = 0, _len1 = names.length; _j < _len1; _j++) {
          name = names[_j];
          for (_k = 0, _len2 = currentNames.length; _k < _len2; _k++) {
            cur = currentNames[_k];
            newNames.push(name + cur);
          }
        }
        names = newNames;
      }
    }
    command = [','];
    for (_l = 0, _len3 = names.length; _l < _len3; _l++) {
      name = names[_l];
      if (postfix) {
        name += postfix;
      }
      command.push([commandBase, name]);
    }
    return command;
  };

  function Grammar(parser, lineNumber, columnNumber, errorType) {
    this.parser = parser;
    this._lineNumber = lineNumber;
    this._columnNumber = columnNumber;
    this._Error = errorType();
  }

  Grammar.prototype.constraint = function(head, tail, strengthAndWeight) {
    var command, commands, firstExpression, index, item, operator, secondExpression, _i, _len;
    commands = [];
    firstExpression = head;
    if ((strengthAndWeight == null) || strengthAndWeight.length === 0) {
      strengthAndWeight = [];
    }
    for (index = _i = 0, _len = tail.length; _i < _len; index = ++_i) {
      item = tail[index];
      operator = tail[index][1];
      secondExpression = tail[index][3];
      if ((firstExpression != null) && (secondExpression != null)) {
        command = [operator, firstExpression, secondExpression].concat(strengthAndWeight);
        commands.push(command);
      }
      firstExpression = secondExpression;
    }
    return {
      commands: commands
    };
  };

  Grammar.prototype.inlineConstraint = function(prop, op, rest) {
    var result;
    prop = prop.join('').trim();
    rest = rest.join('').trim();
    result = this.parser.parse("&[" + prop + "] " + op + " " + rest);
    return result;
  };

  Grammar.prototype.inlineSet = function(prop, rest) {
    var commands;
    prop = prop.join('').trim();
    rest = rest.join('').trim();
    commands = [['set', prop, rest]];
    return {
      commands: commands
    };
  };

  Grammar.prototype.directive = function(name, terms, commands) {
    var ast, hook;
    hook = this.parser.hooks.directives[name];
    if (hook) {
      return hook(name, terms, commands);
    }
    ast = ['directive', name, terms];
    if (commands) {
      ast.push(commands);
    }
    return {
      commands: [ast]
    };
  };

  Grammar.prototype.variable = function(negative, selector, variableNameCharacters) {
    var command, variableName;
    variableName = Grammar._toString(variableNameCharacters);
    if ((selector != null) && selector.length !== 0) {
      switch (variableName) {
        case 'left':
          variableName = 'x';
          break;
        case 'top':
          variableName = 'y';
          break;
        case 'cx':
          variableName = 'center-x';
          break;
        case 'cy':
          variableName = 'center-y';
          break;
      }
      if (selector.toString().indexOf('::window') !== -1) {
        switch (variableName) {
          case 'right':
            variableName = 'width';
            break;
          case 'bottom':
            variableName = 'height';
            break;
        }
      }
    }
    if (selector != null) {
      command = ['get', selector, variableName];
    } else {
      command = ['get', variableName];
    }
    if (negative) {
      return ['-', 0, command];
    } else {
      return command;
    }
  };

  Grammar.prototype.integer = function(digits) {
    return parseInt(digits.join(''), 10);
  };

  Grammar.prototype.signedInteger = function(sign, integer) {
    if (integer == null) {
      integer = 0;
    }
    return parseInt("" + sign + integer, 10);
  };

  Grammar.prototype.signedReal = function(sign, real) {
    if (real == null) {
      real = 0;
    }
    return parseFloat("" + sign + real);
  };

  /* Query selectors*/


  Grammar.prototype.selector = function() {
    return {
      id: function(nameCharacters) {
        var selectorName;
        selectorName = Grammar._toString(nameCharacters);
        return ['$id', selectorName];
      },
      virtual: function(nameCharacters) {
        var name;
        name = Grammar._toString(nameCharacters);
        return ['virtual', name];
      },
      "class": function(nameCharacters) {
        var selectorName;
        selectorName = Grammar._toString(nameCharacters);
        return ['$class', selectorName];
      },
      tag: function(nameCharacters) {
        var selectorName;
        selectorName = Grammar._toString(nameCharacters);
        return ['$tag', selectorName];
      },
      all: function(parts) {
        var selector;
        selector = Grammar._toString(parts);
        return ['$all', selector];
      }
    };
  };

  Grammar.prototype.querySelectorAllParts = function() {
    return {
      withoutParens: function(selectorCharacters) {
        return Grammar._toString(selectorCharacters);
      },
      withParens: function(selectorCharacters) {
        var selector;
        selector = Grammar._toString(selectorCharacters);
        return "(" + selector + ")";
      }
    };
  };

  /* Strength and weight directives*/


  Grammar.prototype.strengthAndWeight = function() {
    var _this = this;
    return {
      valid: function(strength, weight) {
        if ((weight == null) || weight.length === 0) {
          return [strength];
        }
        return [strength, weight];
      },
      invalid: function() {
        throw new _this._Error('Invalid Strength or Weight', null, null, null, _this._lineNumber(), _this._columnNumber());
      }
    };
  };

  /* Virtual Elements*/


  Grammar.prototype.virtualElement = function(names) {
    return {
      commands: [['virtual'].concat(names)]
    };
  };

  /* Stays*/


  Grammar.prototype.stay = function(variables) {
    var command, commands, expression, expressions, index, stay, _i, _len;
    stay = ['stay'].concat(variables);
    expressions = [stay[1]];
    commands = [];
    for (index = _i = 0, _len = expressions.length; _i < _len; index = ++_i) {
      expression = expressions[index];
      command = stay.slice();
      command[1] = expressions[index];
      commands.push(command);
    }
    return {
      commands: commands
    };
  };

  Grammar.prototype.stayVariable = function(variable) {
    return variable;
  };

  /* Conditionals*/


  Grammar.prototype.conditional = function(result) {
    var commands;
    commands = [result];
    return {
      commands: commands
    };
  };

  return Grammar;

})();

module.exports = Grammar;

},{}],5:[function(require,module,exports){
var ErrorReporter, parse, pegparser, scoper, twoDimensionUnpacker, vfl, vflHook, vgl, vglHook;

if (typeof window !== "undefined" && window !== null) {
  pegparser = require('./peg-parser');
  scoper = require('./scoper');
  twoDimensionUnpacker = require('./twodunpacker');
} else {
  pegparser = require('../lib/peg-parser');
  scoper = require('../lib/scoper');
  twoDimensionUnpacker = require('../lib/twodunpacker');
}

vfl = require('vfl-compiler');

vgl = require('vgl-compiler');

ErrorReporter = require('error-reporter');

parse = function(source) {
  var columnNumber, error, errorReporter, lineNumber, message, results;
  results = null;
  try {
    results = pegparser.parse(source);
  } catch (_error) {
    error = _error;
    errorReporter = new ErrorReporter(source);
    message = error.message, lineNumber = error.line, columnNumber = error.column;
    errorReporter.reportError(message, lineNumber, columnNumber);
  }
  return scoper(twoDimensionUnpacker(results));
};

vflHook = function(name, terms, commands) {
  var i, nestedCommand, newCommands, o, ruleSet, s, selector, _i, _j, _len, _len1, _ref, _ref1, _ref2;
  if (commands == null) {
    commands = [];
  }
  newCommands = [];
  o = vfl.parse("@" + name + " " + terms);
  _ref = o.statements;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    s = _ref[_i];
    newCommands = newCommands.concat(parse(s).commands);
  }
  if (commands.length > 0 && o.selectors.length > 0) {
    ruleSet = "";
    _ref1 = o.selectors;
    for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
      selector = _ref1[i];
      /* to prepend ::scope inside parans
      prefix = ''
      if selector[0] is "("
        prefix = "("
        selector = selector.substr(1,selector.length-1)
      
      # prepend selector with ::scope unless
      if selector.indexOf("&") isnt 0
        if selector.indexOf("::") isnt 0
          if selector.indexOf('"') isnt 0
            prefix += "::scope "
      
      ruleSet += prefix + selector
      */

      ruleSet += selector;
      if (i !== o.selectors.length - 1) {
        ruleSet += ", ";
      }
    }
    ruleSet += " {}";
    nestedCommand = parse(ruleSet).commands[0];
    nestedCommand[2] = commands;
    newCommands.push(nestedCommand);
    if (typeof window !== "undefined" && window !== null ? (_ref2 = window.GSS) != null ? _ref2.console : void 0 : void 0) {
      window.GSS.console.row('@' + name, o.statements.concat([ruleSet]), terms);
    }
  }
  return {
    commands: newCommands
  };
};

vglHook = function(name, terms, commands) {
  var newCommands, s, statements, _i, _len;
  if (commands == null) {
    commands = [];
  }
  newCommands = [];
  statements = vgl.parse("@" + name + " " + terms);
  for (_i = 0, _len = statements.length; _i < _len; _i++) {
    s = statements[_i];
    newCommands = newCommands.concat(parse(s).commands);
  }
  return {
    commands: commands.concat(newCommands)
  };
};

pegparser.hooks = {
  directives: {
    'h': vflHook,
    'v': vflHook,
    'horizontal': vflHook,
    'vertical': vflHook,
    'grid-template': vglHook,
    'grid-rows': vglHook,
    'grid-cols': vglHook
  }
};

module.exports = {
  parse: parse,
  scope: scoper,
  twoDimensionUnpack: twoDimensionUnpacker
};

},{"../lib/peg-parser":6,"../lib/scoper":7,"../lib/twodunpacker":8,"./peg-parser":6,"./scoper":7,"./twodunpacker":8,"error-reporter":9,"vfl-compiler":12,"vgl-compiler":10}],6:[function(require,module,exports){
module.exports = (function() {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = peg$FAILED,
        peg$c1 = function(s) { return s; },
        peg$c2 = [],
        peg$c3 = function(commandObjects) {return g.mergeCommands(commandObjects);},
        peg$c4 = { type: "other", description: "IfElseStatement" },
        peg$c5 = function(i, es) {return {commands:[i.concat(es)]};},
        peg$c6 = function(i) {return {commands:[i]};},
        peg$c7 = function(e) {return e;},
        peg$c8 = "@if",
        peg$c9 = { type: "literal", value: "@if", description: "\"@if\"" },
        peg$c10 = "{",
        peg$c11 = { type: "literal", value: "{", description: "\"{\"" },
        peg$c12 = "}",
        peg$c13 = { type: "literal", value: "}", description: "\"}\"" },
        peg$c14 = function(test, s) {return ["if",test,s.commands];},
        peg$c15 = /^[^{]/,
        peg$c16 = { type: "class", value: "[^{]", description: "[^{]" },
        peg$c17 = function(s) {throw new g._Error('Invalid If Clause', null, null, null, g._lineNumber(), g._columnNumber());},
        peg$c18 = "@else",
        peg$c19 = { type: "literal", value: "@else", description: "\"@else\"" },
        peg$c20 = null,
        peg$c21 = function(test, s) {return [test || true,s.commands];},
        peg$c22 = function(s) {throw new g._Error('Invalid Else Clause', null, null, null, g._lineNumber(), g._columnNumber());},
        peg$c23 = { type: "other", description: "ConstraintStatement" },
        peg$c24 = function(head, tail, strengthAndWeight) {
              return g.constraint(head, tail, strengthAndWeight);
            },
        peg$c25 = { type: "other", description: "InlineConstraintStatement" },
        peg$c26 = /^[^:&$\^)(\][@ ]/,
        peg$c27 = { type: "class", value: "[^:&$\\^)(\\][@ ]", description: "[^:&$\\^)(\\][@ ]" },
        peg$c28 = ":",
        peg$c29 = { type: "literal", value: ":", description: "\":\"" },
        peg$c30 = /^[^;]/,
        peg$c31 = { type: "class", value: "[^;]", description: "[^;]" },
        peg$c32 = void 0,
        peg$c33 = ";",
        peg$c34 = { type: "literal", value: ";", description: "\";\"" },
        peg$c35 = function(prop, op, rest) {
              return g.inlineConstraint(prop,op,rest);
            },
        peg$c36 = { type: "other", description: "Inline Set" },
        peg$c37 = function(prop, rest) {
              return g.inlineSet(prop,rest);
            },
        peg$c38 = function(q, s) {return {commands:[['rule',q,s.commands]]}},
        peg$c39 = function(q) { return q; },
        peg$c40 = { type: "other", description: "Directive" },
        peg$c41 = "@",
        peg$c42 = { type: "literal", value: "@", description: "\"@\"" },
        peg$c43 = /^[^ {}]/,
        peg$c44 = { type: "class", value: "[^ {}]", description: "[^ {}]" },
        peg$c45 = /^[^{};]/,
        peg$c46 = { type: "class", value: "[^{};]", description: "[^{};]" },
        peg$c47 = function(name, terms, s) {return g.directive(name.join(''),terms.join('').trim(),s.commands);},
        peg$c48 = function(name, terms) {return g.directive(name.join(''),terms.join('').trim());},
        peg$c49 = function(head, tail) {
            return g.nestedDualTermCommands(head, tail);
          },
        peg$c50 = "AND",
        peg$c51 = { type: "literal", value: "AND", description: "\"AND\"" },
        peg$c52 = "and",
        peg$c53 = { type: "literal", value: "and", description: "\"and\"" },
        peg$c54 = "And",
        peg$c55 = { type: "literal", value: "And", description: "\"And\"" },
        peg$c56 = "&&",
        peg$c57 = { type: "literal", value: "&&", description: "\"&&\"" },
        peg$c58 = function() { return '&&'; },
        peg$c59 = "OR",
        peg$c60 = { type: "literal", value: "OR", description: "\"OR\"" },
        peg$c61 = "or",
        peg$c62 = { type: "literal", value: "or", description: "\"or\"" },
        peg$c63 = "Or",
        peg$c64 = { type: "literal", value: "Or", description: "\"Or\"" },
        peg$c65 = "||",
        peg$c66 = { type: "literal", value: "||", description: "\"||\"" },
        peg$c67 = function() { return '||'; },
        peg$c68 = function(head, tail) {
              return g.nestedDualTermCommands(head, tail);
            },
        peg$c69 = "!=",
        peg$c70 = { type: "literal", value: "!=", description: "\"!=\"" },
        peg$c71 = function() { return "!="; },
        peg$c72 = "=",
        peg$c73 = { type: "literal", value: "=", description: "\"=\"" },
        peg$c74 = function() { return "="; },
        peg$c75 = "~=",
        peg$c76 = { type: "literal", value: "~=", description: "\"~=\"" },
        peg$c77 = function() { return "~="; },
        peg$c78 = { type: "other", description: "Constraint Operator" },
        peg$c79 = "==",
        peg$c80 = { type: "literal", value: "==", description: "\"==\"" },
        peg$c81 = function() { return "==";  },
        peg$c82 = function() { return "=";  },
        peg$c83 = "<=",
        peg$c84 = { type: "literal", value: "<=", description: "\"<=\"" },
        peg$c85 = "=<",
        peg$c86 = { type: "literal", value: "=<", description: "\"=<\"" },
        peg$c87 = function() { return "<="; },
        peg$c88 = ">=",
        peg$c89 = { type: "literal", value: ">=", description: "\">=\"" },
        peg$c90 = "=>",
        peg$c91 = { type: "literal", value: "=>", description: "\"=>\"" },
        peg$c92 = function() { return ">="; },
        peg$c93 = "<",
        peg$c94 = { type: "literal", value: "<", description: "\"<\"" },
        peg$c95 = function() { return "<";  },
        peg$c96 = ">",
        peg$c97 = { type: "literal", value: ">", description: "\">\"" },
        peg$c98 = function() { return ">";  },
        peg$c99 = "+",
        peg$c100 = { type: "literal", value: "+", description: "\"+\"" },
        peg$c101 = function() { return "+";  },
        peg$c102 = "-",
        peg$c103 = { type: "literal", value: "-", description: "\"-\"" },
        peg$c104 = function() { return "-"; },
        peg$c105 = "*",
        peg$c106 = { type: "literal", value: "*", description: "\"*\"" },
        peg$c107 = function() { return '*'; },
        peg$c108 = "/",
        peg$c109 = { type: "literal", value: "/", description: "\"/\"" },
        peg$c110 = function() { return '/';   },
        peg$c111 = " ",
        peg$c112 = { type: "literal", value: " ", description: "\" \"" },
        peg$c113 = function(exp, u) {return [u, exp];},
        peg$c114 = "(",
        peg$c115 = { type: "literal", value: "(", description: "\"(\"" },
        peg$c116 = ")",
        peg$c117 = { type: "literal", value: ")", description: "\")\"" },
        peg$c118 = function(expression) {
            return expression;
          },
        peg$c119 = function(funcs) {return {commands:[funcs]};},
        peg$c120 = /^[a-zA-Z\-]/,
        peg$c121 = { type: "class", value: "[a-zA-Z\\-]", description: "[a-zA-Z\\-]" },
        peg$c122 = function(name) {return [name.join('')];},
        peg$c123 = function(name, param) {return [name.join(''), param];},
        peg$c124 = function(name, params) {return [name.join('')].concat(params);},
        peg$c125 = function(head, tail) {  
              // TODO: not use `createSelectorCommaCommand`
              var command = g.createSelectorCommaCommand(head, tail); 
              return command.slice(1,command.length);
            },
        peg$c126 = ",",
        peg$c127 = { type: "literal", value: ",", description: "\",\"" },
        peg$c128 = function(head, tail) { 
              // TODO: not use `createSelectorCommaCommand`
              var command = g.createSelectorCommaCommand(head, tail); 
              return command.slice(1,command.length);
            },
        peg$c129 = function(op, e) {return [op,e]},
        peg$c130 = "- ",
        peg$c131 = { type: "literal", value: "- ", description: "\"- \"" },
        peg$c132 = "%",
        peg$c133 = { type: "literal", value: "%", description: "\"%\"" },
        peg$c134 = function(op) {
              return op.trim();
            },
        peg$c135 = "true",
        peg$c136 = { type: "literal", value: "true", description: "\"true\"" },
        peg$c137 = function() {return true;},
        peg$c138 = "false",
        peg$c139 = { type: "literal", value: "false", description: "\"false\"" },
        peg$c140 = function() {return false;},
        peg$c141 = "null",
        peg$c142 = { type: "literal", value: "null", description: "\"null\"" },
        peg$c143 = function() {return null;},
        peg$c144 = "undefined",
        peg$c145 = { type: "literal", value: "undefined", description: "\"undefined\"" },
        peg$c146 = function() {return undefined;},
        peg$c147 = function(exp, u) { 
            return [u, exp];
          },
        peg$c148 = function(expression) { 
            return expression; 
          },
        peg$c149 = function(v, u) {return [u,v]},
        peg$c150 = { type: "other", description: "variable" },
        peg$c151 = "[",
        peg$c152 = { type: "literal", value: "[", description: "\"[\"" },
        peg$c153 = "]",
        peg$c154 = { type: "literal", value: "]", description: "\"]\"" },
        peg$c155 = function(negative, selector, varChars) {
              return g.variable(negative, selector, varChars);
            },
        peg$c156 = function(selector, varChars) {
              return g.variable(false, selector, varChars);
            },
        peg$c157 = /^["']/,
        peg$c158 = { type: "class", value: "[\"']", description: "[\"']" },
        peg$c159 = /^[^"']/,
        peg$c160 = { type: "class", value: "[^\"']", description: "[^\"']" },
        peg$c161 = function(string) {return string.join('');},
        peg$c162 = /^[a-zA-Z0-9#.\-_$]/,
        peg$c163 = { type: "class", value: "[a-zA-Z0-9#.\\-_$]", description: "[a-zA-Z0-9#.\\-_$]" },
        peg$c164 = /^[a-zA-Z]/,
        peg$c165 = { type: "class", value: "[a-zA-Z]", description: "[a-zA-Z]" },
        peg$c166 = /^[a-zA-Z0-9\-_]/,
        peg$c167 = { type: "class", value: "[a-zA-Z0-9\\-_]", description: "[a-zA-Z0-9\\-_]" },
        peg$c168 = function(first, rest) { return first + rest.join('');},
        peg$c169 = /^[\-]/,
        peg$c170 = { type: "class", value: "[\\-]", description: "[\\-]" },
        peg$c171 = function(dashes, first, rest) { return dashes.join('') + first + rest.join('');},
        peg$c172 = function(val, u) { return [u, val]; },
        peg$c173 = function(val) { return val; },
        peg$c174 = function(u) {return u.join('');},
        peg$c175 = /^[oO]/,
        peg$c176 = { type: "class", value: "[oO]", description: "[oO]" },
        peg$c177 = /^[rR]/,
        peg$c178 = { type: "class", value: "[rR]", description: "[rR]" },
        peg$c179 = /^[ ]/,
        peg$c180 = { type: "class", value: "[ ]", description: "[ ]" },
        peg$c181 = /^[aA]/,
        peg$c182 = { type: "class", value: "[aA]", description: "[aA]" },
        peg$c183 = /^[nN]/,
        peg$c184 = { type: "class", value: "[nN]", description: "[nN]" },
        peg$c185 = /^[dD]/,
        peg$c186 = { type: "class", value: "[dD]", description: "[dD]" },
        peg$c187 = /^[0-9]/,
        peg$c188 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c189 = function(digits) { return g.integer(digits); },
        peg$c190 = /^[\-+]/,
        peg$c191 = { type: "class", value: "[\\-+]", description: "[\\-+]" },
        peg$c192 = function(sign, integer) { return g.signedInteger(sign, integer); },
        peg$c193 = ".",
        peg$c194 = { type: "literal", value: ".", description: "\".\"" },
        peg$c195 = function(left, right) { return parseFloat(left.join('') + "." + right.join('')); },
        peg$c196 = function(sign, real) { return g.signedReal(sign, real); },
        peg$c197 = { type: "any", description: "any character" },
        peg$c198 = { type: "other", description: "whitespace" },
        peg$c199 = /^[\t\x0B\f \xA0\uFEFF]/,
        peg$c200 = { type: "class", value: "[\\t\\x0B\\f \\xA0\\uFEFF]", description: "[\\t\\x0B\\f \\xA0\\uFEFF]" },
        peg$c201 = /^[\n\r\u2028\u2029]/,
        peg$c202 = { type: "class", value: "[\\n\\r\\u2028\\u2029]", description: "[\\n\\r\\u2028\\u2029]" },
        peg$c203 = { type: "other", description: "end of line" },
        peg$c204 = "\n",
        peg$c205 = { type: "literal", value: "\n", description: "\"\\n\"" },
        peg$c206 = "\r\n",
        peg$c207 = { type: "literal", value: "\r\n", description: "\"\\r\\n\"" },
        peg$c208 = "\r",
        peg$c209 = { type: "literal", value: "\r", description: "\"\\r\"" },
        peg$c210 = "\u2028",
        peg$c211 = { type: "literal", value: "\u2028", description: "\"\\u2028\"" },
        peg$c212 = "\u2029",
        peg$c213 = { type: "literal", value: "\u2029", description: "\"\\u2029\"" },
        peg$c214 = { type: "other", description: "comment" },
        peg$c215 = "/*",
        peg$c216 = { type: "literal", value: "/*", description: "\"/*\"" },
        peg$c217 = "*/",
        peg$c218 = { type: "literal", value: "*/", description: "\"*/\"" },
        peg$c219 = "//",
        peg$c220 = { type: "literal", value: "//", description: "\"//\"" },
        peg$c221 = function(ctx, sel) {
            if (!(ctx[0] instanceof Array)) {ctx = [ctx];}
            if (sel[0] instanceof Array){ctx.push([sel]);} else {ctx.push([sel]);}     
            return ctx;
          },
        peg$c222 = function(left) {return left;},
        peg$c223 = function(sel) {return sel;},
        peg$c224 = function(head, tail) { return g.createSelectorCommaCommand(head, tail); },
        peg$c225 = function(filters) { if (filters.length === 1 ) {return filters[0];} return filters;},
        peg$c226 = { type: "other", description: "NoParanSelector" },
        peg$c227 = { type: "other", description: "SimpleSelector" },
        peg$c228 = function(c) {return [c]},
        peg$c229 = { type: "other", description: "Combinator" },
        peg$c230 = /^[><+~!]/,
        peg$c231 = { type: "class", value: "[><+~!]", description: "[><+~!]" },
        peg$c232 = function(c) {return c.join('');},
        peg$c233 = /^[^{,)]/,
        peg$c234 = { type: "class", value: "[^{,)]", description: "[^{,)]" },
        peg$c235 = function() {return " "},
        peg$c236 = function(splats, postfix) {
              return {splats:splats,postfix:postfix.join("")};
            },
        peg$c237 = { type: "other", description: "Splat" },
        peg$c238 = function(prefix, o) {
               o.prefix = prefix.join("");
               return o;
             },
        peg$c239 = { type: "other", description: "Range" },
        peg$c240 = "...",
        peg$c241 = { type: "literal", value: "...", description: "\"...\"" },
        peg$c242 = function(from, to) {
              from = Number(from.join(''));
              to   = Number(to.join(''));
              return {from:from,to:to}
            },
        peg$c243 = function(char) {return char},
        peg$c244 = /^["]/,
        peg$c245 = { type: "class", value: "[\"]", description: "[\"]" },
        peg$c246 = function(name) {return g.splatifyIfNeeded('virtual',name);},
        peg$c247 = /^[^"]/,
        peg$c248 = { type: "class", value: "[^\"]", description: "[^\"]" },
        peg$c249 = function(name) {return name.join("");},
        peg$c250 = function(name) {return ["tag",name];},
        peg$c251 = function() {return ["tag", "*"];},
        peg$c252 = "#",
        peg$c253 = { type: "literal", value: "#", description: "\"#\"" },
        peg$c254 = function(name) {return g.splatifyIfNeeded('#',name);},
        peg$c255 = function(name) {return g.splatifyIfNeeded('.',name);},
        peg$c256 = function(name) {return [name];},
        peg$c257 = "$",
        peg$c258 = { type: "literal", value: "$", description: "\"$\"" },
        peg$c259 = function() {return ["$"];},
        peg$c260 = "&",
        peg$c261 = { type: "literal", value: "&", description: "\"&\"" },
        peg$c262 = /^[^&]/,
        peg$c263 = { type: "class", value: "[^&]", description: "[^&]" },
        peg$c264 = function() {return ["&"];},
        peg$c265 = "^",
        peg$c266 = { type: "literal", value: "^", description: "\"^\"" },
        peg$c267 = function(ups) {
            var upCount = ups.length;
            if (upCount > 1) {
              return ['^', upCount];
            }
            return ['^'];
          },
        peg$c268 = "::document",
        peg$c269 = { type: "literal", value: "::document", description: "\"::document\"" },
        peg$c270 = "::host",
        peg$c271 = { type: "literal", value: "::host", description: "\"::host\"" },
        peg$c272 = "::scope",
        peg$c273 = { type: "literal", value: "::scope", description: "\"::scope\"" },
        peg$c274 = "::parent",
        peg$c275 = { type: "literal", value: "::parent", description: "\"::parent\"" },
        peg$c276 = "::window",
        peg$c277 = { type: "literal", value: "::window", description: "\"::window\"" },
        peg$c278 = "::viewport",
        peg$c279 = { type: "literal", value: "::viewport", description: "\"::viewport\"" },
        peg$c280 = function() { return "::window"; },
        peg$c281 = "::this",
        peg$c282 = { type: "literal", value: "::this", description: "\"::this\"" },
        peg$c283 = "::",
        peg$c284 = { type: "literal", value: "::", description: "\"::\"" },
        peg$c285 = function() { return "&"; },
        peg$c286 = function(colons, name, option) {
            if (option) {return [colons + name, option];}
            return [colons + name];
          },
        peg$c287 = function(option) {return option; },
        peg$c288 = function(n) {return Number(n.join(""));},
        peg$c289 = /^[^)]/,
        peg$c290 = { type: "class", value: "[^)]", description: "[^)]" },
        peg$c291 = function(string) {return string.join(""); },
        peg$c292 = /^[^~|=!\^$&*\]]/,
        peg$c293 = { type: "class", value: "[^~|=!\\^$&*\\]]", description: "[^~|=!\\^$&*\\]]" },
        peg$c294 = /^[~|=!\^$&*]/,
        peg$c295 = { type: "class", value: "[~|=!\\^$&*]", description: "[~|=!\\^$&*]" },
        peg$c296 = /^[^\]]/,
        peg$c297 = { type: "class", value: "[^\\]]", description: "[^\\]]" },
        peg$c298 = function(left, op, right) {return ["["+op.join("")+"]",left.join("").trim(),right.join("").trim()]; },
        peg$c299 = function(attr) {return ["[]",attr.join("")]; },
        peg$c300 = /^[^0-9\-]/,
        peg$c301 = { type: "class", value: "[^0-9\\-]", description: "[^0-9\\-]" },
        peg$c302 = function(name) {return name.join("")},
        peg$c303 = { type: "other", description: "Strength and Weight" },
        peg$c304 = "!",
        peg$c305 = { type: "literal", value: "!", description: "\"!\"" },
        peg$c306 = function(strength, weight) {
            return g.strengthAndWeight().valid(strength, weight);
          },
        peg$c307 = function() {
            return g.strengthAndWeight().invalid();
          },
        peg$c308 = function(weight) { return Number(weight.join('')); },
        peg$c309 = "required",
        peg$c310 = { type: "literal", value: "required", description: "\"required\"" },
        peg$c311 = "REQUIRED",
        peg$c312 = { type: "literal", value: "REQUIRED", description: "\"REQUIRED\"" },
        peg$c313 = "Required",
        peg$c314 = { type: "literal", value: "Required", description: "\"Required\"" },
        peg$c315 = function() { return "require"; },
        peg$c316 = "require",
        peg$c317 = { type: "literal", value: "require", description: "\"require\"" },
        peg$c318 = "REQUIRE",
        peg$c319 = { type: "literal", value: "REQUIRE", description: "\"REQUIRE\"" },
        peg$c320 = "Require",
        peg$c321 = { type: "literal", value: "Require", description: "\"Require\"" },
        peg$c322 = "strong",
        peg$c323 = { type: "literal", value: "strong", description: "\"strong\"" },
        peg$c324 = "STRONG",
        peg$c325 = { type: "literal", value: "STRONG", description: "\"STRONG\"" },
        peg$c326 = "Strong",
        peg$c327 = { type: "literal", value: "Strong", description: "\"Strong\"" },
        peg$c328 = function() { return "strong"; },
        peg$c329 = "medium",
        peg$c330 = { type: "literal", value: "medium", description: "\"medium\"" },
        peg$c331 = "MEDIUM",
        peg$c332 = { type: "literal", value: "MEDIUM", description: "\"MEDIUM\"" },
        peg$c333 = "Medium",
        peg$c334 = { type: "literal", value: "Medium", description: "\"Medium\"" },
        peg$c335 = function() { return "medium"; },
        peg$c336 = "weak",
        peg$c337 = { type: "literal", value: "weak", description: "\"weak\"" },
        peg$c338 = "WEAK",
        peg$c339 = { type: "literal", value: "WEAK", description: "\"WEAK\"" },
        peg$c340 = "Weak",
        peg$c341 = { type: "literal", value: "Weak", description: "\"Weak\"" },
        peg$c342 = function() { return "weak"; },
        peg$c343 = /^[a-zA-Z\-_]/,
        peg$c344 = { type: "class", value: "[a-zA-Z\\-_]", description: "[a-zA-Z\\-_]" },
        peg$c345 = function(strength) { return strength.join('').toLowerCase(); },
        peg$c346 = "-gss-virtual",
        peg$c347 = { type: "literal", value: "-gss-virtual", description: "\"-gss-virtual\"" },
        peg$c348 = "virtual",
        peg$c349 = { type: "literal", value: "virtual", description: "\"virtual\"" },
        peg$c350 = function(names) {
            return g.virtualElement(names);
          },
        peg$c351 = "\"",
        peg$c352 = { type: "literal", value: "\"", description: "\"\\\"\"" },
        peg$c353 = function(name) {
            return name.join('');
          },
        peg$c354 = function(variables) {
              return g.stay(variables);
            },
        peg$c355 = function(variable) { return g.stayVariable(variable); },
        peg$c356 = "@-gss-stay",
        peg$c357 = { type: "literal", value: "@-gss-stay", description: "\"@-gss-stay\"" },
        peg$c358 = "@stay",
        peg$c359 = { type: "literal", value: "@stay", description: "\"@stay\"" },

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$parsestart() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parse__();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseStatements();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse__();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c1(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseStatements() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parse__();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseStatement();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseStatement();
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c3(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseStatement() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parse__();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseStatementTypes();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseEOS();
          if (s3 !== peg$FAILED) {
            s4 = peg$parse__();
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c1(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseStatementTypes() {
      var s0;

      s0 = peg$parseRuleset();
      if (s0 === peg$FAILED) {
        s0 = peg$parseInlineConstraintStatement();
        if (s0 === peg$FAILED) {
          s0 = peg$parseInlineSet();
          if (s0 === peg$FAILED) {
            s0 = peg$parseAnonymousStatement();
            if (s0 === peg$FAILED) {
              s0 = peg$parseConstraintStatement();
              if (s0 === peg$FAILED) {
                s0 = peg$parseVirtual();
                if (s0 === peg$FAILED) {
                  s0 = peg$parseIfElseStatement();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parseStay();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parseDirective();
                    }
                  }
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parseIfElseStatement() {
      var s0, s1, s2, s3;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseIf();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseElseChain();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parseElseChain();
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c5(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseIf();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c6(s1);
        }
        s0 = s1;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c4); }
      }

      return s0;
    }

    function peg$parseElseChain() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parse__();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseElse();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c7(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseIf() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 3) === peg$c8) {
        s1 = peg$c8;
        peg$currPos += 3;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c9); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseAndOrExpression();
          if (s3 !== peg$FAILED) {
            s4 = peg$parse__();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 123) {
                s5 = peg$c10;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c11); }
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parse__();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseStatements();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse__();
                    if (s8 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 125) {
                        s9 = peg$c12;
                        peg$currPos++;
                      } else {
                        s9 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c13); }
                      }
                      if (s9 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c14(s3, s7);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 3) === peg$c8) {
          s1 = peg$c8;
          peg$currPos += 3;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c9); }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          if (peg$c15.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c16); }
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c15.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c16); }
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse__();
            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 123) {
                s4 = peg$c10;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c11); }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parse__();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parseStatements();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parse__();
                    if (s7 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 125) {
                        s8 = peg$c12;
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c13); }
                      }
                      if (s8 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c17(s6);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      return s0;
    }

    function peg$parseElse() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c18) {
        s1 = peg$c18;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c19); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseAndOrExpression();
          if (s3 === peg$FAILED) {
            s3 = peg$c20;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse__();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 123) {
                s5 = peg$c10;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c11); }
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parse__();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseStatements();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse__();
                    if (s8 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 125) {
                        s9 = peg$c12;
                        peg$currPos++;
                      } else {
                        s9 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c13); }
                      }
                      if (s9 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c21(s3, s7);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 5) === peg$c18) {
          s1 = peg$c18;
          peg$currPos += 5;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c19); }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          if (peg$c15.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c16); }
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c15.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c16); }
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse__();
            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 123) {
                s4 = peg$c10;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c11); }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parse__();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parseStatements();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parse__();
                    if (s7 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 125) {
                        s8 = peg$c12;
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c13); }
                      }
                      if (s8 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c22(s6);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      return s0;
    }

    function peg$parseConstraintStatement() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseConstraintAdditiveExpression();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parse__();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseConstraintOperator();
          if (s5 !== peg$FAILED) {
            s6 = peg$parse__();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseConstraintAdditiveExpression();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parse__();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseConstraintOperator();
            if (s5 !== peg$FAILED) {
              s6 = peg$parse__();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseConstraintAdditiveExpression();
                if (s7 !== peg$FAILED) {
                  s4 = [s4, s5, s6, s7];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse__();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseStrengthAndWeight();
            if (s4 === peg$FAILED) {
              s4 = peg$c20;
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c24(s1, s2, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c23); }
      }

      return s0;
    }

    function peg$parseInlineConstraintStatement() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parse__();
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c26.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c27); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c26.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c27); }
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 58) {
              s4 = peg$c28;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c29); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseConstraintOperator();
                if (s6 !== peg$FAILED) {
                  s7 = [];
                  if (peg$c30.test(input.charAt(peg$currPos))) {
                    s8 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s8 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c31); }
                  }
                  if (s8 !== peg$FAILED) {
                    while (s8 !== peg$FAILED) {
                      s7.push(s8);
                      if (peg$c30.test(input.charAt(peg$currPos))) {
                        s8 = input.charAt(peg$currPos);
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c31); }
                      }
                    }
                  } else {
                    s7 = peg$c0;
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$currPos;
                    peg$silentFails++;
                    if (input.charCodeAt(peg$currPos) === 59) {
                      s9 = peg$c33;
                      peg$currPos++;
                    } else {
                      s9 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c34); }
                    }
                    peg$silentFails--;
                    if (s9 !== peg$FAILED) {
                      peg$currPos = s8;
                      s8 = peg$c32;
                    } else {
                      s8 = peg$c0;
                    }
                    if (s8 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c35(s2, s6, s7);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c25); }
      }

      return s0;
    }

    function peg$parseInlineSet() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parse__();
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c26.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c27); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c26.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c27); }
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 58) {
              s4 = peg$c28;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c29); }
            }
            if (s4 !== peg$FAILED) {
              s5 = [];
              if (peg$c30.test(input.charAt(peg$currPos))) {
                s6 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c31); }
              }
              if (s6 !== peg$FAILED) {
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  if (peg$c30.test(input.charAt(peg$currPos))) {
                    s6 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c31); }
                  }
                }
              } else {
                s5 = peg$c0;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$currPos;
                peg$silentFails++;
                if (input.charCodeAt(peg$currPos) === 59) {
                  s7 = peg$c33;
                  peg$currPos++;
                } else {
                  s7 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c34); }
                }
                peg$silentFails--;
                if (s7 !== peg$FAILED) {
                  peg$currPos = s6;
                  s6 = peg$c32;
                } else {
                  s6 = peg$c0;
                }
                if (s6 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c37(s2, s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c36); }
      }

      return s0;
    }

    function peg$parseRuleset() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parseRulesetStart();
      if (s1 !== peg$FAILED) {
        s2 = peg$parse__();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseStatements();
          if (s3 !== peg$FAILED) {
            s4 = peg$parse__();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 125) {
                s5 = peg$c12;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c13); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c38(s1, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseRulesetStart() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseCSSSelector();
      if (s1 !== peg$FAILED) {
        s2 = peg$parse__();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 123) {
            s3 = peg$c10;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c11); }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c39(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseDirective() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 64) {
        s1 = peg$c41;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c42); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c43.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c44); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c43.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c44); }
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          if (peg$c45.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c46); }
          }
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              if (peg$c45.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c46); }
              }
            }
          } else {
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 123) {
              s4 = peg$c10;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c11); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse__();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseStatements();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse__();
                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                      s8 = peg$c12;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c13); }
                    }
                    if (s8 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c47(s2, s3, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 64) {
          s1 = peg$c41;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c42); }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          if (peg$c43.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c44); }
          }
          if (s3 !== peg$FAILED) {
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              if (peg$c43.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c44); }
              }
            }
          } else {
            s2 = peg$c0;
          }
          if (s2 !== peg$FAILED) {
            s3 = [];
            if (peg$c30.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c31); }
            }
            if (s4 !== peg$FAILED) {
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                if (peg$c30.test(input.charAt(peg$currPos))) {
                  s4 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c31); }
                }
              }
            } else {
              s3 = peg$c0;
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$currPos;
              peg$silentFails++;
              if (input.charCodeAt(peg$currPos) === 59) {
                s5 = peg$c33;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c34); }
              }
              peg$silentFails--;
              if (s5 !== peg$FAILED) {
                peg$currPos = s4;
                s4 = peg$c32;
              } else {
                s4 = peg$c0;
              }
              if (s4 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c48(s2, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c40); }
      }

      return s0;
    }

    function peg$parseAndOrExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parseDualOperatorExpression();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parse__();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseAndOrOp();
          if (s5 !== peg$FAILED) {
            s6 = peg$parse__();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseDualOperatorExpression();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parse__();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseAndOrOp();
            if (s5 !== peg$FAILED) {
              s6 = peg$parse__();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseDualOperatorExpression();
                if (s7 !== peg$FAILED) {
                  s4 = [s4, s5, s6, s7];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c49(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseAndOrOp() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 3) === peg$c50) {
        s1 = peg$c50;
        peg$currPos += 3;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c51); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 3) === peg$c52) {
          s1 = peg$c52;
          peg$currPos += 3;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c53); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 3) === peg$c54) {
            s1 = peg$c54;
            peg$currPos += 3;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c55); }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c56) {
              s1 = peg$c56;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c57); }
            }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c58();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c59) {
          s1 = peg$c59;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c60); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c61) {
            s1 = peg$c61;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c62); }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c63) {
              s1 = peg$c63;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c64); }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c65) {
                s1 = peg$c65;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c66); }
              }
            }
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c67();
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parseDualOperatorExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parseAdditiveExpression();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parse__();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseDualOperator();
          if (s5 !== peg$FAILED) {
            s6 = peg$parse__();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseAdditiveExpression();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parse__();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseDualOperator();
            if (s5 !== peg$FAILED) {
              s6 = peg$parse__();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseAdditiveExpression();
                if (s7 !== peg$FAILED) {
                  s4 = [s4, s5, s6, s7];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c68(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseDualOperator() {
      var s0, s1;

      s0 = peg$parseConstraintOperator();
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c69) {
          s1 = peg$c69;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c70); }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c71();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 61) {
            s1 = peg$c72;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c73); }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c74();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c75) {
              s1 = peg$c75;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c76); }
            }
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c77();
            }
            s0 = s1;
          }
        }
      }

      return s0;
    }

    function peg$parseConstraintOperator() {
      var s0, s1;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c79) {
        s1 = peg$c79;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c80); }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c81();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 61) {
          s1 = peg$c72;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c73); }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c82();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c83) {
            s1 = peg$c83;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c84); }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c85) {
              s1 = peg$c85;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c86); }
            }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c87();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c88) {
              s1 = peg$c88;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c89); }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c90) {
                s1 = peg$c90;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c91); }
              }
            }
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c92();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 60) {
                s1 = peg$c93;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c94); }
              }
              if (s1 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c95();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 62) {
                  s1 = peg$c96;
                  peg$currPos++;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c97); }
                }
                if (s1 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c98();
                }
                s0 = s1;
              }
            }
          }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c78); }
      }

      return s0;
    }

    function peg$parseConstraintAdditiveExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parseConstraintMultiplicativeExpression();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parse__();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseAdditiveOperator();
          if (s5 !== peg$FAILED) {
            s6 = peg$parse__();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseConstraintMultiplicativeExpression();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parse__();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseAdditiveOperator();
            if (s5 !== peg$FAILED) {
              s6 = peg$parse__();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseConstraintMultiplicativeExpression();
                if (s7 !== peg$FAILED) {
                  s4 = [s4, s5, s6, s7];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c68(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseAdditiveExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parseMultiplicativeExpression();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parse__();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseAdditiveOperator();
          if (s5 !== peg$FAILED) {
            s6 = peg$parse__();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseMultiplicativeExpression();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parse__();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseAdditiveOperator();
            if (s5 !== peg$FAILED) {
              s6 = peg$parse__();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseMultiplicativeExpression();
                if (s7 !== peg$FAILED) {
                  s4 = [s4, s5, s6, s7];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c68(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseAdditiveOperator() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 43) {
        s1 = peg$c99;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c100); }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c101();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 45) {
          s1 = peg$c102;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c103); }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c104();
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parseConstraintMultiplicativeExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parseConstraintPrimaryExpression();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parse__();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseMultiplicativeOperator();
          if (s5 !== peg$FAILED) {
            s6 = peg$parse__();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseConstraintPrimaryExpression();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parse__();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseMultiplicativeOperator();
            if (s5 !== peg$FAILED) {
              s6 = peg$parse__();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseConstraintPrimaryExpression();
                if (s7 !== peg$FAILED) {
                  s4 = [s4, s5, s6, s7];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c68(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseMultiplicativeExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parsePrimaryExpression();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parse__();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseMultiplicativeOperator();
          if (s5 !== peg$FAILED) {
            s6 = peg$parse__();
            if (s6 !== peg$FAILED) {
              s7 = peg$parsePrimaryExpression();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parse__();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseMultiplicativeOperator();
            if (s5 !== peg$FAILED) {
              s6 = peg$parse__();
              if (s6 !== peg$FAILED) {
                s7 = peg$parsePrimaryExpression();
                if (s7 !== peg$FAILED) {
                  s4 = [s4, s5, s6, s7];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c68(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseMultiplicativeOperator() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 42) {
        s1 = peg$c105;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c106); }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c107();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 47) {
          s1 = peg$c108;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c109); }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c110();
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parseConstraintPrimaryExpression() {
      var s0, s1, s2, s3;

      s0 = peg$parseFunctions();
      if (s0 === peg$FAILED) {
        s0 = peg$parseUnitVar();
        if (s0 === peg$FAILED) {
          s0 = peg$parseVar();
          if (s0 === peg$FAILED) {
            s0 = peg$parseLiteral();
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = peg$parseConstraintParanExpression();
              if (s1 !== peg$FAILED) {
                s2 = [];
                if (input.charCodeAt(peg$currPos) === 32) {
                  s3 = peg$c111;
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c112); }
                }
                while (s3 !== peg$FAILED) {
                  s2.push(s3);
                  if (input.charCodeAt(peg$currPos) === 32) {
                    s3 = peg$c111;
                    peg$currPos++;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c112); }
                  }
                }
                if (s2 !== peg$FAILED) {
                  s3 = peg$parseUnit();
                  if (s3 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c113(s1, s3);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
              if (s0 === peg$FAILED) {
                s0 = peg$parseConstraintParanExpression();
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parseConstraintParanExpression() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c114;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c115); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse__();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseConstraintAdditiveExpression();
          if (s3 !== peg$FAILED) {
            s4 = peg$parse__();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 41) {
                s5 = peg$c116;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c117); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c118(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseAnonymousStatement() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseFunctions();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c119(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseFunctions() {
      var s0;

      s0 = peg$parseFuncSequence();
      if (s0 === peg$FAILED) {
        s0 = peg$parseFunc();
      }

      return s0;
    }

    function peg$parseFunc() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c120.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c121); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c120.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c121); }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 40) {
          s2 = peg$c114;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c115); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse__();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s4 = peg$c116;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c117); }
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c122(s1);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = [];
        if (peg$c120.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c121); }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c120.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c121); }
            }
          }
        } else {
          s1 = peg$c0;
        }
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s2 = peg$c114;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c115); }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse__();
            if (s3 !== peg$FAILED) {
              s4 = peg$parseFuncParam();
              if (s4 !== peg$FAILED) {
                s5 = peg$parse__();
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c116;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c117); }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c123(s1, s4);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = [];
          if (peg$c120.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c121); }
          }
          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              if (peg$c120.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c121); }
              }
            }
          } else {
            s1 = peg$c0;
          }
          if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 40) {
              s2 = peg$c114;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c115); }
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parse__();
              if (s3 !== peg$FAILED) {
                s4 = peg$parseFuncParams();
                if (s4 !== peg$FAILED) {
                  s5 = peg$parse__();
                  if (s5 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s6 = peg$c116;
                      peg$currPos++;
                    } else {
                      s6 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c117); }
                    }
                    if (s6 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c124(s1, s4);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        }
      }

      return s0;
    }

    function peg$parseFuncSequence() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parseFunc();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 32) {
          s4 = peg$c111;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c112); }
        }
        if (s4 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 32) {
            s5 = peg$c111;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c112); }
          }
          if (s5 === peg$FAILED) {
            s5 = peg$c20;
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parse__();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseFunc();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 32) {
              s4 = peg$c111;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c112); }
            }
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 32) {
                s5 = peg$c111;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c112); }
              }
              if (s5 === peg$FAILED) {
                s5 = peg$c20;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parse__();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseFunc();
                  if (s7 !== peg$FAILED) {
                    s4 = [s4, s5, s6, s7];
                    s3 = s4;
                  } else {
                    peg$currPos = s3;
                    s3 = peg$c0;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c125(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseFuncParam() {
      var s0;

      s0 = peg$parseUnaryOperation();
      if (s0 === peg$FAILED) {
        s0 = peg$parseAndOrExpression();
        if (s0 === peg$FAILED) {
          s0 = peg$parseGSSSelector();
        }
      }

      return s0;
    }

    function peg$parseFuncParams() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parseFuncParam();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parse__();
        if (s4 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s5 = peg$c126;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c127); }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parse__();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseFuncParam();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parse__();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 44) {
                s5 = peg$c126;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c127); }
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parse__();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseFuncParam();
                  if (s7 !== peg$FAILED) {
                    s4 = [s4, s5, s6, s7];
                    s3 = s4;
                  } else {
                    peg$currPos = s3;
                    s3 = peg$c0;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c128(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseUnaryOperation() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseUnaryOperator();
      if (s1 !== peg$FAILED) {
        s2 = peg$parse__();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseAndOrExpression();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c129(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseUnaryOperator() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c130) {
        s1 = peg$c130;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c131); }
      }
      if (s1 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 42) {
          s1 = peg$c105;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c106); }
        }
        if (s1 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 43) {
            s1 = peg$c99;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c100); }
          }
          if (s1 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 47) {
              s1 = peg$c108;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c109); }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c79) {
                s1 = peg$c79;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c80); }
              }
              if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c88) {
                  s1 = peg$c88;
                  peg$currPos += 2;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c89); }
                }
                if (s1 === peg$FAILED) {
                  if (input.substr(peg$currPos, 2) === peg$c90) {
                    s1 = peg$c90;
                    peg$currPos += 2;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c91); }
                  }
                  if (s1 === peg$FAILED) {
                    if (input.substr(peg$currPos, 2) === peg$c83) {
                      s1 = peg$c83;
                      peg$currPos += 2;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c84); }
                    }
                    if (s1 === peg$FAILED) {
                      if (input.substr(peg$currPos, 2) === peg$c85) {
                        s1 = peg$c85;
                        peg$currPos += 2;
                      } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c86); }
                      }
                      if (s1 === peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 61) {
                          s1 = peg$c72;
                          peg$currPos++;
                        } else {
                          s1 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c73); }
                        }
                        if (s1 === peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 62) {
                            s1 = peg$c96;
                            peg$currPos++;
                          } else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c97); }
                          }
                          if (s1 === peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 60) {
                              s1 = peg$c93;
                              peg$currPos++;
                            } else {
                              s1 = peg$FAILED;
                              if (peg$silentFails === 0) { peg$fail(peg$c94); }
                            }
                            if (s1 === peg$FAILED) {
                              if (input.charCodeAt(peg$currPos) === 37) {
                                s1 = peg$c132;
                                peg$currPos++;
                              } else {
                                s1 = peg$FAILED;
                                if (peg$silentFails === 0) { peg$fail(peg$c133); }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c134(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsePrimaryExpression() {
      var s0, s1, s2, s3;

      s0 = peg$parseFunctions();
      if (s0 === peg$FAILED) {
        s0 = peg$parseUnitVar();
        if (s0 === peg$FAILED) {
          s0 = peg$parseVar();
          if (s0 === peg$FAILED) {
            s0 = peg$parseLiteral();
            if (s0 === peg$FAILED) {
              s0 = peg$parseString();
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 4) === peg$c135) {
                  s1 = peg$c135;
                  peg$currPos += 4;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c136); }
                }
                if (s1 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c137();
                }
                s0 = s1;
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  if (input.substr(peg$currPos, 5) === peg$c138) {
                    s1 = peg$c138;
                    peg$currPos += 5;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c139); }
                  }
                  if (s1 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c140();
                  }
                  s0 = s1;
                  if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    if (input.substr(peg$currPos, 4) === peg$c141) {
                      s1 = peg$c141;
                      peg$currPos += 4;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c142); }
                    }
                    if (s1 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c143();
                    }
                    s0 = s1;
                    if (s0 === peg$FAILED) {
                      s0 = peg$currPos;
                      if (input.substr(peg$currPos, 9) === peg$c144) {
                        s1 = peg$c144;
                        peg$currPos += 9;
                      } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c145); }
                      }
                      if (s1 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c146();
                      }
                      s0 = s1;
                      if (s0 === peg$FAILED) {
                        s0 = peg$currPos;
                        s1 = peg$parseParanExpression();
                        if (s1 !== peg$FAILED) {
                          s2 = [];
                          if (input.charCodeAt(peg$currPos) === 32) {
                            s3 = peg$c111;
                            peg$currPos++;
                          } else {
                            s3 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c112); }
                          }
                          while (s3 !== peg$FAILED) {
                            s2.push(s3);
                            if (input.charCodeAt(peg$currPos) === 32) {
                              s3 = peg$c111;
                              peg$currPos++;
                            } else {
                              s3 = peg$FAILED;
                              if (peg$silentFails === 0) { peg$fail(peg$c112); }
                            }
                          }
                          if (s2 !== peg$FAILED) {
                            s3 = peg$parseUnit();
                            if (s3 !== peg$FAILED) {
                              peg$reportedPos = s0;
                              s1 = peg$c147(s1, s3);
                              s0 = s1;
                            } else {
                              peg$currPos = s0;
                              s0 = peg$c0;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$c0;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$c0;
                        }
                        if (s0 === peg$FAILED) {
                          s0 = peg$parseParanExpression();
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parseParanExpression() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c114;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c115); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse__();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseAndOrExpression();
          if (s3 !== peg$FAILED) {
            s4 = peg$parse__();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 41) {
                s5 = peg$c116;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c117); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c148(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseUnitVar() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseVar();
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (input.charCodeAt(peg$currPos) === 32) {
          s3 = peg$c111;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c112); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (input.charCodeAt(peg$currPos) === 32) {
              s3 = peg$c111;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c112); }
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseUnit();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c149(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseVar() {
      var s0, s1, s2, s3, s4, s5;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 45) {
        s1 = peg$c102;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c103); }
      }
      if (s1 === peg$FAILED) {
        s1 = peg$c20;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseGSSSelector();
        if (s2 === peg$FAILED) {
          s2 = peg$c20;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 91) {
            s3 = peg$c151;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c152); }
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parseBracketedVarChars();
            if (s5 !== peg$FAILED) {
              while (s5 !== peg$FAILED) {
                s4.push(s5);
                s5 = peg$parseBracketedVarChars();
              }
            } else {
              s4 = peg$c0;
            }
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 93) {
                s5 = peg$c153;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c154); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c155(s1, s2, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseSpecialSelector();
        if (s1 === peg$FAILED) {
          s1 = peg$c20;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseUnBracketedVarChars();
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c156(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c150); }
      }

      return s0;
    }

    function peg$parseString() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (peg$c157.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c158); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c159.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c160); }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c159.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c160); }
          }
        }
        if (s2 !== peg$FAILED) {
          if (peg$c157.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c158); }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c161(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseBracketedVarChars() {
      var s0;

      if (peg$c162.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c163); }
      }

      return s0;
    }

    function peg$parseUnBracketedVarChars() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (peg$c164.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c165); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c166.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c167); }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c166.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c167); }
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c168(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = [];
        if (peg$c169.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c170); }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c169.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c170); }
            }
          }
        } else {
          s1 = peg$c0;
        }
        if (s1 !== peg$FAILED) {
          if (peg$c164.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c165); }
          }
          if (s2 !== peg$FAILED) {
            s3 = [];
            if (peg$c166.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c167); }
            }
            if (s4 !== peg$FAILED) {
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                if (peg$c166.test(input.charAt(peg$currPos))) {
                  s4 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c167); }
                }
              }
            } else {
              s3 = peg$c0;
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c171(s1, s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      return s0;
    }

    function peg$parseNameCharsWithSpace() {
      var s0;

      s0 = peg$parseBracketedVarChars();
      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 32) {
          s0 = peg$c111;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c112); }
        }
      }

      return s0;
    }

    function peg$parseLiteral() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseNumeric();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseUnit();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c172(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseNumeric();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c173(s1);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parseUnit() {
      var s0, s1, s2, s3;

      if (input.charCodeAt(peg$currPos) === 37) {
        s0 = peg$c132;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c133); }
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseNotUnitPrefix();
        if (s1 !== peg$FAILED) {
          s2 = [];
          if (peg$c120.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c121); }
          }
          if (s3 !== peg$FAILED) {
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              if (peg$c120.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c121); }
              }
            }
          } else {
            s2 = peg$c0;
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c174(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      return s0;
    }

    function peg$parseNotUnitPrefix() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$currPos;
      peg$silentFails++;
      if (input.charCodeAt(peg$currPos) === 45) {
        s3 = peg$c102;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c103); }
      }
      peg$silentFails--;
      if (s3 === peg$FAILED) {
        s2 = peg$c32;
      } else {
        peg$currPos = s2;
        s2 = peg$c0;
      }
      peg$silentFails--;
      if (s2 !== peg$FAILED) {
        peg$currPos = s1;
        s1 = peg$c32;
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$currPos;
        peg$silentFails++;
        s4 = peg$currPos;
        if (peg$c175.test(input.charAt(peg$currPos))) {
          s5 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c176); }
        }
        if (s5 !== peg$FAILED) {
          if (peg$c177.test(input.charAt(peg$currPos))) {
            s6 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c178); }
          }
          if (s6 !== peg$FAILED) {
            if (peg$c179.test(input.charAt(peg$currPos))) {
              s7 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c180); }
            }
            if (s7 !== peg$FAILED) {
              s5 = [s5, s6, s7];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
        } else {
          peg$currPos = s4;
          s4 = peg$c0;
        }
        peg$silentFails--;
        if (s4 === peg$FAILED) {
          s3 = peg$c32;
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        peg$silentFails--;
        if (s3 !== peg$FAILED) {
          peg$currPos = s2;
          s2 = peg$c32;
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          peg$silentFails++;
          s4 = peg$currPos;
          peg$silentFails++;
          s5 = peg$currPos;
          if (peg$c181.test(input.charAt(peg$currPos))) {
            s6 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c182); }
          }
          if (s6 !== peg$FAILED) {
            if (peg$c183.test(input.charAt(peg$currPos))) {
              s7 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c184); }
            }
            if (s7 !== peg$FAILED) {
              if (peg$c185.test(input.charAt(peg$currPos))) {
                s8 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s8 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c186); }
              }
              if (s8 !== peg$FAILED) {
                if (peg$c179.test(input.charAt(peg$currPos))) {
                  s9 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s9 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c180); }
                }
                if (s9 !== peg$FAILED) {
                  s6 = [s6, s7, s8, s9];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$c0;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$c0;
            }
          } else {
            peg$currPos = s5;
            s5 = peg$c0;
          }
          peg$silentFails--;
          if (s5 === peg$FAILED) {
            s4 = peg$c32;
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          peg$silentFails--;
          if (s4 !== peg$FAILED) {
            peg$currPos = s3;
            s3 = peg$c32;
          } else {
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseNumeric() {
      var s0;

      s0 = peg$parseReal();
      if (s0 === peg$FAILED) {
        s0 = peg$parseInteger();
        if (s0 === peg$FAILED) {
          s0 = peg$parseSignedReal();
          if (s0 === peg$FAILED) {
            s0 = peg$parseSignedInteger();
          }
        }
      }

      return s0;
    }

    function peg$parseInteger() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c187.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c188); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c187.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c188); }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c189(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseSignedInteger() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (peg$c190.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c191); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseInteger();
        if (s2 === peg$FAILED) {
          s2 = peg$c20;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c192(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseReal() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c187.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c188); }
      }
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c187.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c188); }
        }
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s2 = peg$c193;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c194); }
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          if (peg$c187.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c188); }
          }
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              if (peg$c187.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c188); }
              }
            }
          } else {
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c195(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseSignedReal() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (peg$c190.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c191); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseReal();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c196(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseSourceCharacter() {
      var s0;

      if (input.length > peg$currPos) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c197); }
      }

      return s0;
    }

    function peg$parseWhiteSpace() {
      var s0, s1;

      peg$silentFails++;
      if (peg$c199.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c200); }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c198); }
      }

      return s0;
    }

    function peg$parseLineTerminator() {
      var s0;

      if (peg$c201.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c202); }
      }

      return s0;
    }

    function peg$parseLineTerminatorSequence() {
      var s0, s1;

      peg$silentFails++;
      if (input.charCodeAt(peg$currPos) === 10) {
        s0 = peg$c204;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c205); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c206) {
          s0 = peg$c206;
          peg$currPos += 2;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c207); }
        }
        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 13) {
            s0 = peg$c208;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c209); }
          }
          if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 8232) {
              s0 = peg$c210;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c211); }
            }
            if (s0 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 8233) {
                s0 = peg$c212;
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c213); }
              }
            }
          }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c203); }
      }

      return s0;
    }

    function peg$parseEOS() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parse__();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 59) {
          s2 = peg$c33;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c34); }
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseLineTerminatorSequence();
          if (s2 !== peg$FAILED) {
            s1 = [s1, s2];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parse__();
          if (s1 !== peg$FAILED) {
            s2 = peg$parseEOF();
            if (s2 !== peg$FAILED) {
              s1 = [s1, s2];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        }
      }

      return s0;
    }

    function peg$parseEOF() {
      var s0, s1;

      s0 = peg$currPos;
      peg$silentFails++;
      if (input.length > peg$currPos) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c197); }
      }
      peg$silentFails--;
      if (s1 === peg$FAILED) {
        s0 = peg$c32;
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseComment() {
      var s0, s1;

      peg$silentFails++;
      s0 = peg$parseMultiLineComment();
      if (s0 === peg$FAILED) {
        s0 = peg$parseSingleLineComment();
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c214); }
      }

      return s0;
    }

    function peg$parseMultiLineComment() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c215) {
        s1 = peg$c215;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c216); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;
        if (input.substr(peg$currPos, 2) === peg$c217) {
          s5 = peg$c217;
          peg$currPos += 2;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c218); }
        }
        peg$silentFails--;
        if (s5 === peg$FAILED) {
          s4 = peg$c32;
        } else {
          peg$currPos = s4;
          s4 = peg$c0;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parseSourceCharacter();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$currPos;
          peg$silentFails++;
          if (input.substr(peg$currPos, 2) === peg$c217) {
            s5 = peg$c217;
            peg$currPos += 2;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c218); }
          }
          peg$silentFails--;
          if (s5 === peg$FAILED) {
            s4 = peg$c32;
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseSourceCharacter();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c217) {
            s3 = peg$c217;
            peg$currPos += 2;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c218); }
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseMultiLineCommentNoLineTerminator() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c215) {
        s1 = peg$c215;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c216); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;
        if (input.substr(peg$currPos, 2) === peg$c217) {
          s5 = peg$c217;
          peg$currPos += 2;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c218); }
        }
        if (s5 === peg$FAILED) {
          s5 = peg$parseLineTerminator();
        }
        peg$silentFails--;
        if (s5 === peg$FAILED) {
          s4 = peg$c32;
        } else {
          peg$currPos = s4;
          s4 = peg$c0;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parseSourceCharacter();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$currPos;
          peg$silentFails++;
          if (input.substr(peg$currPos, 2) === peg$c217) {
            s5 = peg$c217;
            peg$currPos += 2;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c218); }
          }
          if (s5 === peg$FAILED) {
            s5 = peg$parseLineTerminator();
          }
          peg$silentFails--;
          if (s5 === peg$FAILED) {
            s4 = peg$c32;
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseSourceCharacter();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c217) {
            s3 = peg$c217;
            peg$currPos += 2;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c218); }
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseSingleLineComment() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c219) {
        s1 = peg$c219;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c220); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;
        s5 = peg$parseLineTerminator();
        peg$silentFails--;
        if (s5 === peg$FAILED) {
          s4 = peg$c32;
        } else {
          peg$currPos = s4;
          s4 = peg$c0;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parseSourceCharacter();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$currPos;
          peg$silentFails++;
          s5 = peg$parseLineTerminator();
          peg$silentFails--;
          if (s5 === peg$FAILED) {
            s4 = peg$c32;
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseSourceCharacter();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseLineTerminator();
          if (s3 === peg$FAILED) {
            s3 = peg$parseEOF();
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parse_() {
      var s0, s1;

      s0 = [];
      s1 = peg$parseWhiteSpace();
      if (s1 === peg$FAILED) {
        s1 = peg$parseMultiLineCommentNoLineTerminator();
        if (s1 === peg$FAILED) {
          s1 = peg$parseSingleLineComment();
        }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = peg$parseWhiteSpace();
        if (s1 === peg$FAILED) {
          s1 = peg$parseMultiLineCommentNoLineTerminator();
          if (s1 === peg$FAILED) {
            s1 = peg$parseSingleLineComment();
          }
        }
      }

      return s0;
    }

    function peg$parse__() {
      var s0, s1;

      s0 = [];
      s1 = peg$parseWhiteSpace();
      if (s1 === peg$FAILED) {
        s1 = peg$parseLineTerminatorSequence();
        if (s1 === peg$FAILED) {
          s1 = peg$parseComment();
        }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = peg$parseWhiteSpace();
        if (s1 === peg$FAILED) {
          s1 = peg$parseLineTerminatorSequence();
          if (s1 === peg$FAILED) {
            s1 = peg$parseComment();
          }
        }
      }

      return s0;
    }

    function peg$parseGSSSelector() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseNoParanSelectorChain();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseSafeCSSSelector();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c221(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parseSafeCSSSelector();
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parseSimpleSelectorChain();
          if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c222(s1);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        }
      }

      return s0;
    }

    function peg$parseSafeCSSSelector() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c114;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c115); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse__();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseCSSSelector();
          if (s3 !== peg$FAILED) {
            s4 = peg$parse__();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 41) {
                s5 = peg$c116;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c117); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c223(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseCSSSelector() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parseComplexSelectorChain();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parse__();
        if (s4 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s5 = peg$c126;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c127); }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parse__();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseComplexSelectorChain();
              if (s7 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parse__();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 44) {
                s5 = peg$c126;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c127); }
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parse__();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseComplexSelectorChain();
                  if (s7 !== peg$FAILED) {
                    s4 = [s4, s5, s6, s7];
                    s3 = s4;
                  } else {
                    peg$currPos = s3;
                    s3 = peg$c0;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c224(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parseComplexSelectorChain();
      }

      return s0;
    }

    function peg$parseComplexSelectorChain() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseComplexSelector();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseComplexSelector();
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c225(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseSimpleSelectorChain() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseSimpleSelector();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseSimpleSelector();
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c225(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseNoParanSelectorChain() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseNoParanSelector();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseNoParanSelector();
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c225(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseNoParanSelector() {
      var s0, s1;

      peg$silentFails++;
      s0 = peg$parseSpecialSelector();
      if (s0 === peg$FAILED) {
        s0 = peg$parseVirtualSel();
        if (s0 === peg$FAILED) {
          s0 = peg$parseTagSel();
          if (s0 === peg$FAILED) {
            s0 = peg$parseIdSel();
            if (s0 === peg$FAILED) {
              s0 = peg$parseClassSel();
              if (s0 === peg$FAILED) {
                s0 = peg$parseReservedPseudoSel();
                if (s0 === peg$FAILED) {
                  s0 = peg$parsePseudoSel();
                }
              }
            }
          }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c226); }
      }

      return s0;
    }

    function peg$parseSimpleSelector() {
      var s0, s1;

      peg$silentFails++;
      s0 = peg$parseNoParanSelector();
      if (s0 === peg$FAILED) {
        s0 = peg$parseSafeCSSSelector();
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c227); }
      }

      return s0;
    }

    function peg$parseQualifier() {
      var s0;

      s0 = peg$parseSimpleSelector();
      if (s0 === peg$FAILED) {
        s0 = peg$parseAttrSel();
      }

      return s0;
    }

    function peg$parseComplexSelector() {
      var s0, s1;

      s0 = peg$parseQualifier();
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseCombinator();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c228(s1);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parseCombinator() {
      var s0, s1, s2, s3;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c230.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c231); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c230.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c231); }
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c232(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = [];
        if (input.charCodeAt(peg$currPos) === 32) {
          s2 = peg$c111;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c112); }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (input.charCodeAt(peg$currPos) === 32) {
              s2 = peg$c111;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c112); }
            }
          }
        } else {
          s1 = peg$c0;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos;
          peg$silentFails++;
          if (peg$c233.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c234); }
          }
          peg$silentFails--;
          if (s3 !== peg$FAILED) {
            peg$currPos = s2;
            s2 = peg$c32;
          } else {
            s2 = peg$c0;
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c235();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c229); }
      }

      return s0;
    }

    function peg$parseSplattedName() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseSplat();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseSplat();
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseSplatNameChar();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseSplatNameChar();
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c236(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseSplat() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseSplatNameChar();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseSplatNameChar();
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseRange();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c238(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c237); }
      }

      return s0;
    }

    function peg$parseRange() {
      var s0, s1, s2, s3, s4;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = [];
      if (peg$c187.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c188); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c187.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c188); }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 3) === peg$c240) {
          s2 = peg$c240;
          peg$currPos += 3;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c241); }
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          if (peg$c187.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c188); }
          }
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              if (peg$c187.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c188); }
              }
            }
          } else {
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c242(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c239); }
      }

      return s0;
    }

    function peg$parseSplatNameChar() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$parseRange();
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = peg$c32;
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseSelectorNameChars();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c243(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseVirtualSel() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (peg$c244.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c245); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseSplattedName();
        if (s2 === peg$FAILED) {
          s2 = peg$parseVirtualSelName();
        }
        if (s2 !== peg$FAILED) {
          if (peg$c244.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c245); }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c246(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseVirtualSelName() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c247.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c248); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c247.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c248); }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c249(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseTagSel() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseSelectorName();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c250(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 42) {
          s1 = peg$c105;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c106); }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c251();
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parseIdSel() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 35) {
        s1 = peg$c252;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c253); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseSplattedName();
        if (s2 === peg$FAILED) {
          s2 = peg$parseSelectorName();
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c254(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseClassSel() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 46) {
        s1 = peg$c193;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c194); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseSplattedName();
        if (s2 === peg$FAILED) {
          s2 = peg$parseSelectorName();
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c255(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseReservedPseudoSel() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseReservedPseudos();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c256(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseSpecialSelector() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 36) {
        s1 = peg$c257;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c258); }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c259();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 38) {
          s1 = peg$c260;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c261); }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos;
          peg$silentFails++;
          if (peg$c262.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c263); }
          }
          peg$silentFails--;
          if (s3 !== peg$FAILED) {
            peg$currPos = s2;
            s2 = peg$c32;
          } else {
            s2 = peg$c0;
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c264();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = [];
          if (input.charCodeAt(peg$currPos) === 94) {
            s2 = peg$c265;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c266); }
          }
          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              if (input.charCodeAt(peg$currPos) === 94) {
                s2 = peg$c265;
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c266); }
              }
            }
          } else {
            s1 = peg$c0;
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c267(s1);
          }
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parseReservedPseudos() {
      var s0, s1;

      if (input.substr(peg$currPos, 10) === peg$c268) {
        s0 = peg$c268;
        peg$currPos += 10;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c269); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 6) === peg$c270) {
          s0 = peg$c270;
          peg$currPos += 6;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c271); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 7) === peg$c272) {
            s0 = peg$c272;
            peg$currPos += 7;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c273); }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 8) === peg$c274) {
              s0 = peg$c274;
              peg$currPos += 8;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c275); }
            }
          }
        }
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 8) === peg$c276) {
          s1 = peg$c276;
          peg$currPos += 8;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c277); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 10) === peg$c278) {
            s1 = peg$c278;
            peg$currPos += 10;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c279); }
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c280();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 6) === peg$c281) {
            s1 = peg$c281;
            peg$currPos += 6;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c282); }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c283) {
              s1 = peg$c283;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c284); }
            }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c285();
          }
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parsePseudoSel() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c283) {
        s1 = peg$c283;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c284); }
      }
      if (s1 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 58) {
          s1 = peg$c28;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c29); }
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseSelectorName();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsePseudoSelOption();
          if (s3 === peg$FAILED) {
            s3 = peg$c20;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c286(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsePseudoSelOption() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c114;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c115); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse__();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsePseudoSelOptionParam();
          if (s3 !== peg$FAILED) {
            s4 = peg$parse__();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 41) {
                s5 = peg$c116;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c117); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c287(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c114;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c115); }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse__();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s3 = peg$c116;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c117); }
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c143();
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      return s0;
    }

    function peg$parsePseudoSelOptionParam() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c187.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c188); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c187.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c188); }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c288(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$parseCSSSelector();
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = [];
          if (peg$c289.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c290); }
          }
          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              if (peg$c289.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c290); }
              }
            }
          } else {
            s1 = peg$c0;
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c291(s1);
          }
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parseAttrSel() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 91) {
        s1 = peg$c151;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c152); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c292.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c293); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c292.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c293); }
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          if (peg$c294.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c295); }
          }
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              if (peg$c294.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c295); }
              }
            }
          } else {
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            if (peg$c296.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c297); }
            }
            if (s5 !== peg$FAILED) {
              while (s5 !== peg$FAILED) {
                s4.push(s5);
                if (peg$c296.test(input.charAt(peg$currPos))) {
                  s5 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c297); }
                }
              }
            } else {
              s4 = peg$c0;
            }
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 93) {
                s5 = peg$c153;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c154); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c298(s2, s3, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 91) {
          s1 = peg$c151;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c152); }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          if (peg$c296.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c297); }
          }
          if (s3 !== peg$FAILED) {
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              if (peg$c296.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c297); }
              }
            }
          } else {
            s2 = peg$c0;
          }
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 93) {
              s3 = peg$c153;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c154); }
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c299(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      return s0;
    }

    function peg$parseSelectorName() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      if (peg$c300.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c301); }
      }
      peg$silentFails--;
      if (s2 !== peg$FAILED) {
        peg$currPos = s1;
        s1 = peg$c32;
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseSelectorNameChars();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parseSelectorNameChars();
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c302(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseSelectorNameChars() {
      var s0;

      if (peg$c166.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c167); }
      }

      return s0;
    }

    function peg$parseStrengthAndWeight() {
      var s0, s1, s2, s3;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 33) {
        s1 = peg$c304;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c305); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseStrength();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseWeight();
          if (s3 === peg$FAILED) {
            s3 = peg$c20;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c306(s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 33) {
          s1 = peg$c304;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c305); }
        }
        if (s1 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c197); }
          }
          if (s2 === peg$FAILED) {
            s2 = peg$c20;
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c307();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c303); }
      }

      return s0;
    }

    function peg$parseWeight() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c187.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c188); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c187.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c188); }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c308(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseStrength() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 8) === peg$c309) {
        s1 = peg$c309;
        peg$currPos += 8;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c310); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 8) === peg$c311) {
          s1 = peg$c311;
          peg$currPos += 8;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c312); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 8) === peg$c313) {
            s1 = peg$c313;
            peg$currPos += 8;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c314); }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c315();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 7) === peg$c316) {
          s1 = peg$c316;
          peg$currPos += 7;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c317); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 7) === peg$c318) {
            s1 = peg$c318;
            peg$currPos += 7;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c319); }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c320) {
              s1 = peg$c320;
              peg$currPos += 7;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c321); }
            }
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c315();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 6) === peg$c322) {
            s1 = peg$c322;
            peg$currPos += 6;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c323); }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c324) {
              s1 = peg$c324;
              peg$currPos += 6;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c325); }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 6) === peg$c326) {
                s1 = peg$c326;
                peg$currPos += 6;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c327); }
              }
            }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c328();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 6) === peg$c329) {
              s1 = peg$c329;
              peg$currPos += 6;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c330); }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 6) === peg$c331) {
                s1 = peg$c331;
                peg$currPos += 6;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c332); }
              }
              if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 6) === peg$c333) {
                  s1 = peg$c333;
                  peg$currPos += 6;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c334); }
                }
              }
            }
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c335();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.substr(peg$currPos, 4) === peg$c336) {
                s1 = peg$c336;
                peg$currPos += 4;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c337); }
              }
              if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 4) === peg$c338) {
                  s1 = peg$c338;
                  peg$currPos += 4;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c339); }
                }
                if (s1 === peg$FAILED) {
                  if (input.substr(peg$currPos, 4) === peg$c340) {
                    s1 = peg$c340;
                    peg$currPos += 4;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c341); }
                  }
                }
              }
              if (s1 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c342();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = [];
                if (peg$c343.test(input.charAt(peg$currPos))) {
                  s2 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c344); }
                }
                if (s2 !== peg$FAILED) {
                  while (s2 !== peg$FAILED) {
                    s1.push(s2);
                    if (peg$c343.test(input.charAt(peg$currPos))) {
                      s2 = input.charAt(peg$currPos);
                      peg$currPos++;
                    } else {
                      s2 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c344); }
                    }
                  }
                } else {
                  s1 = peg$c0;
                }
                if (s1 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c345(s1);
                }
                s0 = s1;
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parseVirtual() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 64) {
        s1 = peg$c41;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c42); }
      }
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 12) === peg$c346) {
          s2 = peg$c346;
          peg$currPos += 12;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c347); }
        }
        if (s2 === peg$FAILED) {
          if (input.substr(peg$currPos, 7) === peg$c348) {
            s2 = peg$c348;
            peg$currPos += 7;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c349); }
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse__();
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parseVirtualName();
            if (s5 !== peg$FAILED) {
              while (s5 !== peg$FAILED) {
                s4.push(s5);
                s5 = peg$parseVirtualName();
              }
            } else {
              s4 = peg$c0;
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c350(s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseVirtualName() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 34) {
        s1 = peg$c351;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c352); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c247.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c248); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c247.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c248); }
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 34) {
            s3 = peg$c351;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c352); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse__();
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c353(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseStay() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseStayStart();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseStayVars();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parseStayVars();
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c354(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseStayVars() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parse__();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseVar();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse__();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s4 = peg$c126;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c127); }
            }
            if (s4 === peg$FAILED) {
              s4 = peg$c20;
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c355(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseStayStart() {
      var s0;

      if (input.substr(peg$currPos, 10) === peg$c356) {
        s0 = peg$c356;
        peg$currPos += 10;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c357); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 5) === peg$c358) {
          s0 = peg$c358;
          peg$currPos += 5;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c359); }
        }
      }

      return s0;
    }


      var p = this;
      var g = (function() {
        var getLineNumber = function() {
          return line();
        };

        var getColumnNumber = function() {
          return column();
        };

        var getErrorType = function() {
          return SyntaxError;
        };

        var Grammar = require('./grammar');

        return new Grammar(p, getLineNumber, getColumnNumber, getErrorType);
      })();


    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
})();
},{"./grammar":4}],7:[function(require,module,exports){
var analyze, mutate, _analyze, _mutate,
  _this = this;

module.exports = function(ast) {
  var buffer;
  buffer = [
    {
      _parentScope: void 0,
      _childScopes: [],
      _unscopedVars: []
    }
  ];
  analyze(ast, buffer);
  mutate(buffer);
  return ast;
};

analyze = function(ast, buffer) {
  var node, _i, _len, _ref, _results;
  if (ast.commands != null) {
    _ref = ast.commands;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      _results.push(_analyze(node, buffer));
    }
    return _results;
  }
};

_analyze = function(node, buffer, bufferLengthMinus) {
  var currScope, i, isScope, name, parent, part, scope, sub, _i, _j, _len, _len1, _ref;
  if (bufferLengthMinus == null) {
    bufferLengthMinus = 1;
  }
  isScope = false;
  name = node[0];
  if (name === 'rule') {
    node._isScope = true;
    scope = node;
    parent = buffer[buffer.length - 1];
    parent._childScopes.push(scope);
    scope._parentScope = parent;
    scope._childScopes = [];
    scope._unscopedVars = [];
    buffer.push(scope);
  } else if (name === 'get') {
    currScope = buffer[buffer.length - bufferLengthMinus];
    if (currScope) {
      if (node.length === 2) {
        node._varKey = node.toString();
        currScope._unscopedVars.push(node);
      }
    }
  } else if (name instanceof Array) {
    for (_i = 0, _len = node.length; _i < _len; _i++) {
      part = node[_i];
      if (part[0] === 'virtual') {
        part._dontHoist = true;
      }
    }
  } else if (name === 'virtual') {
    currScope = buffer[buffer.length - bufferLengthMinus];
    if (currScope) {
      if (!node._dontHoist) {
        node._varKey = node.toString();
        currScope._unscopedVars.push(node);
      }
    }
  }
  _ref = node.slice(0, +node.length + 1 || 9e9);
  for (i = _j = 0, _len1 = _ref.length; _j < _len1; i = ++_j) {
    sub = _ref[i];
    if (sub instanceof Array) {
      if (name === 'rule' && i === 1) {
        _analyze(sub, buffer, 2);
      } else {
        _analyze(sub, buffer, bufferLengthMinus);
      }
    }
  }
  if (node._isScope) {
    return buffer.pop();
  }
};

mutate = function(buffer) {
  var node, _i, _len, _ref, _results;
  _ref = buffer[0]._childScopes;
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    node = _ref[_i];
    _results.push(_mutate(node));
  }
  return _results;
};

_mutate = function(node) {
  var child, clone, hoistLevel, hoister, level, parent, unscoped, unscopedCommand, upper_unscoped, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3, _results;
  _ref = node._childScopes;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    child = _ref[_i];
    _mutate(child);
  }
  if (((_ref1 = node._unscopedVars) != null ? _ref1.length : void 0) > 0) {
    _ref2 = node._unscopedVars;
    _results = [];
    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
      unscoped = _ref2[_j];
      level = 0;
      hoistLevel = 0;
      parent = node._parentScope;
      while (parent) {
        level++;
        _ref3 = parent._unscopedVars;
        for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
          upper_unscoped = _ref3[_k];
          if (upper_unscoped._varKey === unscoped._varKey) {
            hoistLevel = level;
          }
        }
        parent = parent._parentScope;
      }
      if (hoistLevel > 0) {
        if (unscoped[1][0] !== '^') {
          hoister = ['^'];
          if (hoistLevel > 1) {
            hoister.push(hoistLevel);
          }
          unscopedCommand = unscoped[0];
          if (unscopedCommand === 'get') {
            _results.push(unscoped.splice(1, 0, hoister));
          } else if (unscopedCommand === 'virtual') {
            clone = unscoped.splice(0, 2);
            unscoped.push(hoister);
            _results.push(unscoped.push(clone));
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(void 0);
        }
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  }
};

},{}],8:[function(require,module,exports){
var buffer2dExpansion, expandConstraintsWith2dProperties, propertyMapping, _buffer2dExpansion, _clone, _rename2dTo1dProperty, _traverseAstFor2DProperties, _unpackRuleset2dConstraints,
  _this = this;

module.exports = function(ast) {
  var buffer;
  buffer = [];
  buffer2dExpansion(ast, buffer);
  expandConstraintsWith2dProperties(buffer);
  return ast;
};

buffer2dExpansion = function(ast, buffer) {
  var node, _i, _len, _ref, _results;
  if (ast.commands != null) {
    _ref = ast.commands;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      _results.push(_buffer2dExpansion(node, ast.commands, buffer));
    }
    return _results;
  }
};

_buffer2dExpansion = function(node, commands, buffer) {
  var childNode, i, _i, _len, _ref;
  if (node.length > 1) {
    if (node[0] === 'rule') {
      _unpackRuleset2dConstraints(node, node[2], buffer);
    } else {
      _ref = node.slice(1, +node.length + 1 || 9e9);
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        childNode = _ref[i];
        if (_traverseAstFor2DProperties(childNode)) {
          if (commands) {
            buffer.push({
              toExpand: {
                commands: commands,
                constraint: node
              }
            });
          }
          return true;
        }
      }
    }
  }
  return false;
};

_unpackRuleset2dConstraints = function(node, commands, buffer) {
  var constraint, i, _i, _len, _ref, _results;
  _ref = commands.slice(0, +commands.length + 1 || 9e9);
  _results = [];
  for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
    constraint = _ref[i];
    _results.push(_buffer2dExpansion(constraint, commands, buffer));
  }
  return _results;
};

_traverseAstFor2DProperties = function(node) {
  if (node instanceof Array && node.length > 0) {
    if (!(node[node.length - 1] instanceof Array) && (propertyMapping[node[node.length - 1]] != null)) {
      return true;
    } else {
      return _buffer2dExpansion(node);
    }
  }
  return false;
};

expandConstraintsWith2dProperties = function(buffer) {
  var clonedConstraint, expansionItem, insertionIndex, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = buffer.length; _i < _len; _i++) {
    expansionItem = buffer[_i];
    clonedConstraint = _clone(expansionItem.toExpand.constraint);
    insertionIndex = 1 + (expansionItem.toExpand.commands.indexOf(expansionItem.toExpand.constraint));
    expansionItem.toExpand.commands.splice(insertionIndex, 0, clonedConstraint);
    _rename2dTo1dProperty(expansionItem.toExpand.constraint, 0);
    _results.push(_rename2dTo1dProperty(clonedConstraint, 1));
  }
  return _results;
};

_rename2dTo1dProperty = function(node, index1DPropertyName) {
  var i, subNode, _i, _len, _ref, _results;
  _ref = node.slice(1, +node.length + 1 || 9e9);
  _results = [];
  for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
    subNode = _ref[i];
    if (subNode instanceof Array) {
      if (propertyMapping[subNode[subNode.length - 1]]) {
        _results.push(subNode[subNode.length - 1] = propertyMapping[subNode[subNode.length - 1]][index1DPropertyName]);
      } else {
        _results.push(_rename2dTo1dProperty(subNode, index1DPropertyName));
      }
    } else {
      _results.push(void 0);
    }
  }
  return _results;
};

_clone = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};

propertyMapping = {
  'bottom-left': ['left', 'bottom'],
  'bottom-right': ['right', 'bottom'],
  center: ['center-x', 'center-y'],
  'intrinsic-size': ['intrinsic-width', 'intrinsic-height'],
  position: ['x', 'y'],
  size: ['width', 'height'],
  'top-left': ['left', 'top'],
  'top-right': ['right', 'top']
};

},{}],9:[function(require,module,exports){
var ErrorReporter,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ErrorReporter = (function() {
  ErrorReporter.prototype._sourceCode = null;

  function ErrorReporter(sourceCode) {
    this.reportError = __bind(this.reportError, this);
    if (sourceCode == null) {
      throw new Error('Source code not provided');
    }
    if (Object.prototype.toString.call(sourceCode) !== '[object String]') {
      throw new TypeError('Source code must be a string');
    }
    this._sourceCode = sourceCode;
  }

  ErrorReporter.prototype.reportError = function(message, lineNumber, columnNumber) {
    var condition, context, currentLine, error, errorLocator, gutterValue, item, lastLineNumber, lineValue, lines, longestLineNumberLength, nextLineIndex, nextLineNumber, padding, previousLineIndex, previousLineNumber, _i, _len;
    if (message == null) {
      throw new Error('Message not provided');
    }
    if (Object.prototype.toString.call(message) !== '[object String]') {
      throw new TypeError('Message must be a string');
    }
    if (message.length === 0) {
      throw new Error('Message must not be empty');
    }
    if (lineNumber == null) {
      throw new Error('Line number not provided');
    }
    if (Object.prototype.toString.call(lineNumber) !== '[object Number]') {
      throw new TypeError('Line number must be a number');
    }
    if (lineNumber <= 0) {
      throw new RangeError('Line number is invalid');
    }
    if (columnNumber == null) {
      throw new Error('Column number not provided');
    }
    if (Object.prototype.toString.call(columnNumber) !== '[object Number]') {
      throw new TypeError('Column number must be a number');
    }
    if (columnNumber <= 0) {
      throw new RangeError('Column number is invalid');
    }
    lines = this._sourceCode.split('\n');
    if (lineNumber > lines.length) {
      throw new RangeError('Line number is out of range');
    }
    currentLine = lines[lineNumber - 1];
    if (columnNumber > currentLine.length) {
      throw new RangeError('Column number is out of range');
    }
    error = [];
    error.push("Error on line " + lineNumber + ", column " + columnNumber + ": " + message);
    error.push('');
    previousLineNumber = lineNumber - 1;
    nextLineNumber = lineNumber + 1;
    if (previousLineNumber - 1 >= 0) {
      previousLineIndex = previousLineNumber - 1;
    }
    if (nextLineNumber - 1 <= lines.length - 1) {
      nextLineIndex = nextLineNumber - 1;
    }
    lastLineNumber = nextLineIndex != null ? nextLineNumber : lineNumber;
    longestLineNumberLength = ("" + lastLineNumber).length;
    errorLocator = "" + (Array(columnNumber).join('-')) + "^";
    context = [];
    context.push([previousLineNumber, lines[previousLineIndex], previousLineIndex != null]);
    context.push([lineNumber, currentLine, true]);
    context.push(['^', errorLocator, true]);
    context.push([nextLineNumber, lines[nextLineIndex], nextLineIndex != null]);
    for (_i = 0, _len = context.length; _i < _len; _i++) {
      item = context[_i];
      gutterValue = item[0];
      lineValue = item[1];
      condition = item[2];
      padding = Array(longestLineNumberLength - ("" + gutterValue).length + 1).join(' ');
      gutterValue = "" + padding + gutterValue;
      if (condition) {
        error.push("" + gutterValue + " : " + lineValue);
      }
    }
    console.error(error.join('\n'));
    throw new Error(message);
  };

  return ErrorReporter;

})();

module.exports = ErrorReporter;

},{}],10:[function(require,module,exports){
var ErrorReporter, parse;

if (typeof window !== "undefined" && window !== null) {
  parse = require('./parser').parse;
} else {
  parse = require('../lib/parser').parse;
}

ErrorReporter = require('error-reporter');

module.exports = {
  parse: function(source) {
    var columnNumber, error, errorReporter, lineNumber, message, results;
    results = null;
    try {
      results = parse(source);
    } catch (_error) {
      error = _error;
      errorReporter = new ErrorReporter(source);
      message = error.message, lineNumber = error.line, columnNumber = error.column;
      errorReporter.reportError(message, lineNumber, columnNumber);
    }
    return results;
  }
};

},{"../lib/parser":11,"./parser":11,"error-reporter":9}],11:[function(require,module,exports){
module.exports = (function() {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = peg$FAILED,
        peg$c1 = [],
        peg$c2 = function() {return p.getResults()},
        peg$c3 = "@",
        peg$c4 = { type: "literal", value: "@", description: "\"@\"" },
        peg$c5 = function(vfls) { return vfls; },
        peg$c6 = { type: "other", description: "grid-rows / grid-cols" },
        peg$c7 = "grid-",
        peg$c8 = { type: "literal", value: "grid-", description: "\"grid-\"" },
        peg$c9 = "-gss-grid-",
        peg$c10 = { type: "literal", value: "-gss-grid-", description: "\"-gss-grid-\"" },
        peg$c11 = "\"",
        peg$c12 = { type: "literal", value: "\"", description: "\"\\\"\"" },
        peg$c13 = function(d, line, stuff) {
            var vfl, props;
            vfl = "@"+ ['v','h'][d] +" "+ 
              line +" "+
              "in"+"(::)" +" "+ 
              "chain-"+p.size[d]+"(::["+p.size[d] +"]) "+       
              "chain-"+p.size[1-d] +" "+
              "chain-"+p.pos[d]+"(::["+p.pos[d] +"]) "+
              p.trim(stuff);
            p.addVFL(vfl.trim());
          },
        peg$c14 = { type: "other", description: "grid-template" },
        peg$c15 = "template",
        peg$c16 = { type: "literal", value: "template", description: "\"template\"" },
        peg$c17 = /^[0-9a-zA-Z\-_]/,
        peg$c18 = { type: "class", value: "[0-9a-zA-Z\\-_]", description: "[0-9a-zA-Z\\-_]" },
        peg$c19 = function(name, lines, options) {
             p.addTemplate(lines,p.stringify(name),options);    
          },
        peg$c20 = { type: "other", description: "template line" },
        peg$c21 = function(zones) {
            return p.processHZones(zones);    
          },
        peg$c22 = { type: "other", description: "Template Options" },
        peg$c23 = function(o) {
            var result = {};
            if (o) {
              result = {}
              o.forEach(function(obj){
                result[obj.key] = obj.value;
              })
            } 
            return result;
          },
        peg$c24 = { type: "other", description: "TemplateOption" },
        peg$c25 = "(",
        peg$c26 = { type: "literal", value: "(", description: "\"(\"" },
        peg$c27 = ")",
        peg$c28 = { type: "literal", value: ")", description: "\")\"" },
        peg$c29 = function(key, value) {return {key:key.join(''), value:value.join('')};},
        peg$c30 = /^[^>=<!)]/,
        peg$c31 = { type: "class", value: "[^>=<!)]", description: "[^>=<!)]" },
        peg$c32 = { type: "other", description: "Template Zone" },
        peg$c33 = "0",
        peg$c34 = { type: "literal", value: "0", description: "\"0\"" },
        peg$c35 = "1",
        peg$c36 = { type: "literal", value: "1", description: "\"1\"" },
        peg$c37 = "2",
        peg$c38 = { type: "literal", value: "2", description: "\"2\"" },
        peg$c39 = "3",
        peg$c40 = { type: "literal", value: "3", description: "\"3\"" },
        peg$c41 = "4",
        peg$c42 = { type: "literal", value: "4", description: "\"4\"" },
        peg$c43 = "5",
        peg$c44 = { type: "literal", value: "5", description: "\"5\"" },
        peg$c45 = "6",
        peg$c46 = { type: "literal", value: "6", description: "\"6\"" },
        peg$c47 = "7",
        peg$c48 = { type: "literal", value: "7", description: "\"7\"" },
        peg$c49 = "8",
        peg$c50 = { type: "literal", value: "8", description: "\"8\"" },
        peg$c51 = "9",
        peg$c52 = { type: "literal", value: "9", description: "\"9\"" },
        peg$c53 = "a",
        peg$c54 = { type: "literal", value: "a", description: "\"a\"" },
        peg$c55 = "b",
        peg$c56 = { type: "literal", value: "b", description: "\"b\"" },
        peg$c57 = "c",
        peg$c58 = { type: "literal", value: "c", description: "\"c\"" },
        peg$c59 = "d",
        peg$c60 = { type: "literal", value: "d", description: "\"d\"" },
        peg$c61 = "e",
        peg$c62 = { type: "literal", value: "e", description: "\"e\"" },
        peg$c63 = "f",
        peg$c64 = { type: "literal", value: "f", description: "\"f\"" },
        peg$c65 = "g",
        peg$c66 = { type: "literal", value: "g", description: "\"g\"" },
        peg$c67 = "h",
        peg$c68 = { type: "literal", value: "h", description: "\"h\"" },
        peg$c69 = "i",
        peg$c70 = { type: "literal", value: "i", description: "\"i\"" },
        peg$c71 = "j",
        peg$c72 = { type: "literal", value: "j", description: "\"j\"" },
        peg$c73 = "k",
        peg$c74 = { type: "literal", value: "k", description: "\"k\"" },
        peg$c75 = "l",
        peg$c76 = { type: "literal", value: "l", description: "\"l\"" },
        peg$c77 = "m",
        peg$c78 = { type: "literal", value: "m", description: "\"m\"" },
        peg$c79 = "n",
        peg$c80 = { type: "literal", value: "n", description: "\"n\"" },
        peg$c81 = "o",
        peg$c82 = { type: "literal", value: "o", description: "\"o\"" },
        peg$c83 = "p",
        peg$c84 = { type: "literal", value: "p", description: "\"p\"" },
        peg$c85 = "q",
        peg$c86 = { type: "literal", value: "q", description: "\"q\"" },
        peg$c87 = "r",
        peg$c88 = { type: "literal", value: "r", description: "\"r\"" },
        peg$c89 = "s",
        peg$c90 = { type: "literal", value: "s", description: "\"s\"" },
        peg$c91 = "t",
        peg$c92 = { type: "literal", value: "t", description: "\"t\"" },
        peg$c93 = "u",
        peg$c94 = { type: "literal", value: "u", description: "\"u\"" },
        peg$c95 = "v",
        peg$c96 = { type: "literal", value: "v", description: "\"v\"" },
        peg$c97 = "w",
        peg$c98 = { type: "literal", value: "w", description: "\"w\"" },
        peg$c99 = "x",
        peg$c100 = { type: "literal", value: "x", description: "\"x\"" },
        peg$c101 = "y",
        peg$c102 = { type: "literal", value: "y", description: "\"y\"" },
        peg$c103 = "z",
        peg$c104 = { type: "literal", value: "z", description: "\"z\"" },
        peg$c105 = "A",
        peg$c106 = { type: "literal", value: "A", description: "\"A\"" },
        peg$c107 = "B",
        peg$c108 = { type: "literal", value: "B", description: "\"B\"" },
        peg$c109 = "C",
        peg$c110 = { type: "literal", value: "C", description: "\"C\"" },
        peg$c111 = "D",
        peg$c112 = { type: "literal", value: "D", description: "\"D\"" },
        peg$c113 = "E",
        peg$c114 = { type: "literal", value: "E", description: "\"E\"" },
        peg$c115 = "F",
        peg$c116 = { type: "literal", value: "F", description: "\"F\"" },
        peg$c117 = "G",
        peg$c118 = { type: "literal", value: "G", description: "\"G\"" },
        peg$c119 = "H",
        peg$c120 = { type: "literal", value: "H", description: "\"H\"" },
        peg$c121 = "I",
        peg$c122 = { type: "literal", value: "I", description: "\"I\"" },
        peg$c123 = "J",
        peg$c124 = { type: "literal", value: "J", description: "\"J\"" },
        peg$c125 = "K",
        peg$c126 = { type: "literal", value: "K", description: "\"K\"" },
        peg$c127 = "L",
        peg$c128 = { type: "literal", value: "L", description: "\"L\"" },
        peg$c129 = "M",
        peg$c130 = { type: "literal", value: "M", description: "\"M\"" },
        peg$c131 = "N",
        peg$c132 = { type: "literal", value: "N", description: "\"N\"" },
        peg$c133 = "O",
        peg$c134 = { type: "literal", value: "O", description: "\"O\"" },
        peg$c135 = "P",
        peg$c136 = { type: "literal", value: "P", description: "\"P\"" },
        peg$c137 = "Q",
        peg$c138 = { type: "literal", value: "Q", description: "\"Q\"" },
        peg$c139 = "R",
        peg$c140 = { type: "literal", value: "R", description: "\"R\"" },
        peg$c141 = "S",
        peg$c142 = { type: "literal", value: "S", description: "\"S\"" },
        peg$c143 = "T",
        peg$c144 = { type: "literal", value: "T", description: "\"T\"" },
        peg$c145 = "U",
        peg$c146 = { type: "literal", value: "U", description: "\"U\"" },
        peg$c147 = "V",
        peg$c148 = { type: "literal", value: "V", description: "\"V\"" },
        peg$c149 = "W",
        peg$c150 = { type: "literal", value: "W", description: "\"W\"" },
        peg$c151 = "X",
        peg$c152 = { type: "literal", value: "X", description: "\"X\"" },
        peg$c153 = "Y",
        peg$c154 = { type: "literal", value: "Y", description: "\"Y\"" },
        peg$c155 = "Z",
        peg$c156 = { type: "literal", value: "Z", description: "\"Z\"" },
        peg$c157 = function(zone) {
            return {xspan:zone.length,name:zone[0],x:zone};
          },
        peg$c158 = ".",
        peg$c159 = { type: "literal", value: ".", description: "\".\"" },
        peg$c160 = function() {
            var name = p.getBlankName();
            return {xspan:1,name:name,x:[name]};
          },
        peg$c161 = { type: "other", description: "Row or Col Dimension" },
        peg$c162 = "rows",
        peg$c163 = { type: "literal", value: "rows", description: "\"rows\"" },
        peg$c164 = function() {return 0;},
        peg$c165 = "cols",
        peg$c166 = { type: "literal", value: "cols", description: "\"cols\"" },
        peg$c167 = function() {return 1;},
        peg$c168 = { type: "other", description: "1D Line" },
        peg$c169 = null,
        peg$c170 = function(headcon, head, tails) {
            var result; 
            result = "|";
            if (headcon) {result += headcon;}
            result += head;
            tails.forEach(function (tail){
              result += tail;
            });
            result += "|";
            return result;
          },
        peg$c171 = { type: "other", description: "!D LineChunk" },
        peg$c172 = function(name, connect) {
            
            var result;
            name = p.trim(name);
            result = '["'+name+'"]';    
            p.addVirtual(name);
            if (connect) {
              result = result + connect;
            }
            return result;
          },
        peg$c173 = { type: "other", description: "1D Connection" },
        peg$c174 = "-",
        peg$c175 = { type: "literal", value: "-", description: "\"-\"" },
        peg$c176 = "~",
        peg$c177 = { type: "literal", value: "~", description: "\"~\"" },
        peg$c178 = /^[0-9]/,
        peg$c179 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c180 = function(connect) {return p.stringify(connect);},
        peg$c181 = { type: "other", description: "!D Connection Type" },
        peg$c182 = /^[a-zA-Z0-9#_$:]/,
        peg$c183 = { type: "class", value: "[a-zA-Z0-9#_$:]", description: "[a-zA-Z0-9#_$:]" },
        peg$c184 = /^[a-zA-Z0-9#.\-_$:]/,
        peg$c185 = { type: "class", value: "[a-zA-Z0-9#.\\-_$:]", description: "[a-zA-Z0-9#.\\-_$:]" },
        peg$c186 = " ",
        peg$c187 = { type: "literal", value: " ", description: "\" \"" },
        peg$c188 = function(val) {
            return [ "number",
              val
            ];
          },
        peg$c189 = function(digits) {
            return parseInt(digits.join(""), 10);
          },
        peg$c190 = function(digits) {
            return parseFloat(digits.join(""));
          },
        peg$c191 = /^[\-+]/,
        peg$c192 = { type: "class", value: "[\\-+]", description: "[\\-+]" },
        peg$c193 = { type: "any", description: "any character" },
        peg$c194 = { type: "other", description: "whitespace" },
        peg$c195 = /^[\t\x0B\f \xA0\uFEFF]/,
        peg$c196 = { type: "class", value: "[\\t\\x0B\\f \\xA0\\uFEFF]", description: "[\\t\\x0B\\f \\xA0\\uFEFF]" },
        peg$c197 = /^[\n\r\u2028\u2029]/,
        peg$c198 = { type: "class", value: "[\\n\\r\\u2028\\u2029]", description: "[\\n\\r\\u2028\\u2029]" },
        peg$c199 = { type: "other", description: "end of line" },
        peg$c200 = "\n",
        peg$c201 = { type: "literal", value: "\n", description: "\"\\n\"" },
        peg$c202 = "\r\n",
        peg$c203 = { type: "literal", value: "\r\n", description: "\"\\r\\n\"" },
        peg$c204 = "\r",
        peg$c205 = { type: "literal", value: "\r", description: "\"\\r\"" },
        peg$c206 = "\u2028",
        peg$c207 = { type: "literal", value: "\u2028", description: "\"\\u2028\"" },
        peg$c208 = "\u2029",
        peg$c209 = { type: "literal", value: "\u2029", description: "\"\\u2029\"" },
        peg$c210 = /^[a-zA-Z0-9 .,#:+?!\^=()_\-$*\/\\""'[\]]/,
        peg$c211 = { type: "class", value: "[a-zA-Z0-9 .,#:+?!\\^=()_\\-$*\\/\\\\\"\"'[\\]]", description: "[a-zA-Z0-9 .,#:+?!\\^=()_\\-$*\\/\\\\\"\"'[\\]]" },
        peg$c212 = { type: "other", description: "End of Statement" },
        peg$c213 = ";",
        peg$c214 = { type: "literal", value: ";", description: "\";\"" },
        peg$c215 = void 0,
        peg$c216 = { type: "other", description: "Comment" },
        peg$c217 = { type: "other", description: "MultiLineComment" },
        peg$c218 = "/*",
        peg$c219 = { type: "literal", value: "/*", description: "\"/*\"" },
        peg$c220 = "*/",
        peg$c221 = { type: "literal", value: "*/", description: "\"*/\"" },
        peg$c222 = { type: "other", description: "MultiLineCommentNoLineTerminator" },
        peg$c223 = { type: "other", description: "Single Line Comment" },
        peg$c224 = "//",
        peg$c225 = { type: "literal", value: "//", description: "\"//\"" },
        peg$c226 = { type: "other", description: "Whitespace / Comment" },
        peg$c227 = { type: "other", description: "Whitespace / Comment / Newline" },

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$parsestart() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parse__();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseStatement();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseStatement();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse__();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c2();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseStatement() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 64) {
        s1 = peg$c3;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c4); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseVGLStatement();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseEOS();
          if (s3 !== peg$FAILED) {
            s4 = peg$parse__();
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c5(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseVGLStatement() {
      var s0;

      s0 = peg$parseRowsCols();
      if (s0 === peg$FAILED) {
        s0 = peg$parseTemplate();
      }

      return s0;
    }

    function peg$parseRowsCols() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c7) {
        s1 = peg$c7;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c8); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 10) === peg$c9) {
          s1 = peg$c9;
          peg$currPos += 10;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c10); }
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseRowColDimension();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse__();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 34) {
              s4 = peg$c11;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c12); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseLine();
              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 34) {
                  s6 = peg$c11;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c12); }
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse__();
                  if (s7 !== peg$FAILED) {
                    s8 = [];
                    s9 = peg$parseAnyChar();
                    while (s9 !== peg$FAILED) {
                      s8.push(s9);
                      s9 = peg$parseAnyChar();
                    }
                    if (s8 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c13(s2, s5, s8);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c6); }
      }

      return s0;
    }

    function peg$parseTemplate() {
      var s0, s1, s2, s3, s4, s5, s6;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c7) {
        s1 = peg$c7;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c8); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 10) === peg$c9) {
          s1 = peg$c9;
          peg$currPos += 10;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c10); }
        }
      }
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 8) === peg$c15) {
          s2 = peg$c15;
          peg$currPos += 8;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c16); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse__();
          if (s3 !== peg$FAILED) {
            s4 = [];
            if (peg$c17.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c18); }
            }
            if (s5 !== peg$FAILED) {
              while (s5 !== peg$FAILED) {
                s4.push(s5);
                if (peg$c17.test(input.charAt(peg$currPos))) {
                  s5 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c18); }
                }
              }
            } else {
              s4 = peg$c0;
            }
            if (s4 !== peg$FAILED) {
              s5 = [];
              s6 = peg$parseTemplateLine();
              if (s6 !== peg$FAILED) {
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$parseTemplateLine();
                }
              } else {
                s5 = peg$c0;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parseTemplateOptions();
                if (s6 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c19(s4, s5, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c14); }
      }

      return s0;
    }

    function peg$parseTemplateLine() {
      var s0, s1, s2, s3, s4, s5;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parse__();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 34) {
          s2 = peg$c11;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c12); }
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseTemplateZone();
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseTemplateZone();
            }
          } else {
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 34) {
              s4 = peg$c11;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c12); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse__();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c21(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c20); }
      }

      return s0;
    }

    function peg$parseTemplateOptions() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseTemplateOption();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseTemplateOption();
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c23(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c22); }
      }

      return s0;
    }

    function peg$parseTemplateOption() {
      var s0, s1, s2, s3, s4, s5;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parse__();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseNameChars();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parseNameChars();
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s3 = peg$c25;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c26); }
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parseOpionValueChars();
            if (s5 !== peg$FAILED) {
              while (s5 !== peg$FAILED) {
                s4.push(s5);
                s5 = peg$parseOpionValueChars();
              }
            } else {
              s4 = peg$c0;
            }
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 41) {
                s5 = peg$c27;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c28); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c29(s2, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c24); }
      }

      return s0;
    }

    function peg$parseOpionValueChars() {
      var s0;

      if (peg$c30.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c31); }
      }

      return s0;
    }

    function peg$parseTemplateZone() {
      var s0, s1, s2, s3, s4;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = [];
      if (input.charCodeAt(peg$currPos) === 48) {
        s2 = peg$c33;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c34); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (input.charCodeAt(peg$currPos) === 48) {
            s2 = peg$c33;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c34); }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 === peg$FAILED) {
        s1 = [];
        if (input.charCodeAt(peg$currPos) === 49) {
          s2 = peg$c35;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c36); }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (input.charCodeAt(peg$currPos) === 49) {
              s2 = peg$c35;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c36); }
            }
          }
        } else {
          s1 = peg$c0;
        }
        if (s1 === peg$FAILED) {
          s1 = [];
          if (input.charCodeAt(peg$currPos) === 50) {
            s2 = peg$c37;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c38); }
          }
          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              if (input.charCodeAt(peg$currPos) === 50) {
                s2 = peg$c37;
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c38); }
              }
            }
          } else {
            s1 = peg$c0;
          }
          if (s1 === peg$FAILED) {
            s1 = [];
            if (input.charCodeAt(peg$currPos) === 51) {
              s2 = peg$c39;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c40); }
            }
            if (s2 !== peg$FAILED) {
              while (s2 !== peg$FAILED) {
                s1.push(s2);
                if (input.charCodeAt(peg$currPos) === 51) {
                  s2 = peg$c39;
                  peg$currPos++;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c40); }
                }
              }
            } else {
              s1 = peg$c0;
            }
            if (s1 === peg$FAILED) {
              s1 = [];
              if (input.charCodeAt(peg$currPos) === 52) {
                s2 = peg$c41;
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c42); }
              }
              if (s2 !== peg$FAILED) {
                while (s2 !== peg$FAILED) {
                  s1.push(s2);
                  if (input.charCodeAt(peg$currPos) === 52) {
                    s2 = peg$c41;
                    peg$currPos++;
                  } else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c42); }
                  }
                }
              } else {
                s1 = peg$c0;
              }
              if (s1 === peg$FAILED) {
                s1 = [];
                if (input.charCodeAt(peg$currPos) === 53) {
                  s2 = peg$c43;
                  peg$currPos++;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c44); }
                }
                if (s2 !== peg$FAILED) {
                  while (s2 !== peg$FAILED) {
                    s1.push(s2);
                    if (input.charCodeAt(peg$currPos) === 53) {
                      s2 = peg$c43;
                      peg$currPos++;
                    } else {
                      s2 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c44); }
                    }
                  }
                } else {
                  s1 = peg$c0;
                }
                if (s1 === peg$FAILED) {
                  s1 = [];
                  if (input.charCodeAt(peg$currPos) === 54) {
                    s2 = peg$c45;
                    peg$currPos++;
                  } else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c46); }
                  }
                  if (s2 !== peg$FAILED) {
                    while (s2 !== peg$FAILED) {
                      s1.push(s2);
                      if (input.charCodeAt(peg$currPos) === 54) {
                        s2 = peg$c45;
                        peg$currPos++;
                      } else {
                        s2 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c46); }
                      }
                    }
                  } else {
                    s1 = peg$c0;
                  }
                  if (s1 === peg$FAILED) {
                    s1 = [];
                    if (input.charCodeAt(peg$currPos) === 55) {
                      s2 = peg$c47;
                      peg$currPos++;
                    } else {
                      s2 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c48); }
                    }
                    if (s2 !== peg$FAILED) {
                      while (s2 !== peg$FAILED) {
                        s1.push(s2);
                        if (input.charCodeAt(peg$currPos) === 55) {
                          s2 = peg$c47;
                          peg$currPos++;
                        } else {
                          s2 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c48); }
                        }
                      }
                    } else {
                      s1 = peg$c0;
                    }
                    if (s1 === peg$FAILED) {
                      s1 = [];
                      if (input.charCodeAt(peg$currPos) === 56) {
                        s2 = peg$c49;
                        peg$currPos++;
                      } else {
                        s2 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c50); }
                      }
                      if (s2 !== peg$FAILED) {
                        while (s2 !== peg$FAILED) {
                          s1.push(s2);
                          if (input.charCodeAt(peg$currPos) === 56) {
                            s2 = peg$c49;
                            peg$currPos++;
                          } else {
                            s2 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c50); }
                          }
                        }
                      } else {
                        s1 = peg$c0;
                      }
                      if (s1 === peg$FAILED) {
                        s1 = [];
                        if (input.charCodeAt(peg$currPos) === 57) {
                          s2 = peg$c51;
                          peg$currPos++;
                        } else {
                          s2 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c52); }
                        }
                        if (s2 !== peg$FAILED) {
                          while (s2 !== peg$FAILED) {
                            s1.push(s2);
                            if (input.charCodeAt(peg$currPos) === 57) {
                              s2 = peg$c51;
                              peg$currPos++;
                            } else {
                              s2 = peg$FAILED;
                              if (peg$silentFails === 0) { peg$fail(peg$c52); }
                            }
                          }
                        } else {
                          s1 = peg$c0;
                        }
                        if (s1 === peg$FAILED) {
                          s1 = [];
                          if (input.charCodeAt(peg$currPos) === 97) {
                            s2 = peg$c53;
                            peg$currPos++;
                          } else {
                            s2 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c54); }
                          }
                          if (s2 !== peg$FAILED) {
                            while (s2 !== peg$FAILED) {
                              s1.push(s2);
                              if (input.charCodeAt(peg$currPos) === 97) {
                                s2 = peg$c53;
                                peg$currPos++;
                              } else {
                                s2 = peg$FAILED;
                                if (peg$silentFails === 0) { peg$fail(peg$c54); }
                              }
                            }
                          } else {
                            s1 = peg$c0;
                          }
                          if (s1 === peg$FAILED) {
                            s1 = [];
                            if (input.charCodeAt(peg$currPos) === 98) {
                              s2 = peg$c55;
                              peg$currPos++;
                            } else {
                              s2 = peg$FAILED;
                              if (peg$silentFails === 0) { peg$fail(peg$c56); }
                            }
                            if (s2 !== peg$FAILED) {
                              while (s2 !== peg$FAILED) {
                                s1.push(s2);
                                if (input.charCodeAt(peg$currPos) === 98) {
                                  s2 = peg$c55;
                                  peg$currPos++;
                                } else {
                                  s2 = peg$FAILED;
                                  if (peg$silentFails === 0) { peg$fail(peg$c56); }
                                }
                              }
                            } else {
                              s1 = peg$c0;
                            }
                            if (s1 === peg$FAILED) {
                              s1 = [];
                              if (input.charCodeAt(peg$currPos) === 99) {
                                s2 = peg$c57;
                                peg$currPos++;
                              } else {
                                s2 = peg$FAILED;
                                if (peg$silentFails === 0) { peg$fail(peg$c58); }
                              }
                              if (s2 !== peg$FAILED) {
                                while (s2 !== peg$FAILED) {
                                  s1.push(s2);
                                  if (input.charCodeAt(peg$currPos) === 99) {
                                    s2 = peg$c57;
                                    peg$currPos++;
                                  } else {
                                    s2 = peg$FAILED;
                                    if (peg$silentFails === 0) { peg$fail(peg$c58); }
                                  }
                                }
                              } else {
                                s1 = peg$c0;
                              }
                              if (s1 === peg$FAILED) {
                                s1 = [];
                                if (input.charCodeAt(peg$currPos) === 100) {
                                  s2 = peg$c59;
                                  peg$currPos++;
                                } else {
                                  s2 = peg$FAILED;
                                  if (peg$silentFails === 0) { peg$fail(peg$c60); }
                                }
                                if (s2 !== peg$FAILED) {
                                  while (s2 !== peg$FAILED) {
                                    s1.push(s2);
                                    if (input.charCodeAt(peg$currPos) === 100) {
                                      s2 = peg$c59;
                                      peg$currPos++;
                                    } else {
                                      s2 = peg$FAILED;
                                      if (peg$silentFails === 0) { peg$fail(peg$c60); }
                                    }
                                  }
                                } else {
                                  s1 = peg$c0;
                                }
                                if (s1 === peg$FAILED) {
                                  s1 = [];
                                  if (input.charCodeAt(peg$currPos) === 101) {
                                    s2 = peg$c61;
                                    peg$currPos++;
                                  } else {
                                    s2 = peg$FAILED;
                                    if (peg$silentFails === 0) { peg$fail(peg$c62); }
                                  }
                                  if (s2 !== peg$FAILED) {
                                    while (s2 !== peg$FAILED) {
                                      s1.push(s2);
                                      if (input.charCodeAt(peg$currPos) === 101) {
                                        s2 = peg$c61;
                                        peg$currPos++;
                                      } else {
                                        s2 = peg$FAILED;
                                        if (peg$silentFails === 0) { peg$fail(peg$c62); }
                                      }
                                    }
                                  } else {
                                    s1 = peg$c0;
                                  }
                                  if (s1 === peg$FAILED) {
                                    s1 = peg$currPos;
                                    s2 = [];
                                    if (input.charCodeAt(peg$currPos) === 102) {
                                      s3 = peg$c63;
                                      peg$currPos++;
                                    } else {
                                      s3 = peg$FAILED;
                                      if (peg$silentFails === 0) { peg$fail(peg$c64); }
                                    }
                                    if (s3 !== peg$FAILED) {
                                      while (s3 !== peg$FAILED) {
                                        s2.push(s3);
                                        if (input.charCodeAt(peg$currPos) === 102) {
                                          s3 = peg$c63;
                                          peg$currPos++;
                                        } else {
                                          s3 = peg$FAILED;
                                          if (peg$silentFails === 0) { peg$fail(peg$c64); }
                                        }
                                      }
                                    } else {
                                      s2 = peg$c0;
                                    }
                                    if (s2 !== peg$FAILED) {
                                      s3 = [];
                                      if (input.charCodeAt(peg$currPos) === 103) {
                                        s4 = peg$c65;
                                        peg$currPos++;
                                      } else {
                                        s4 = peg$FAILED;
                                        if (peg$silentFails === 0) { peg$fail(peg$c66); }
                                      }
                                      if (s4 !== peg$FAILED) {
                                        while (s4 !== peg$FAILED) {
                                          s3.push(s4);
                                          if (input.charCodeAt(peg$currPos) === 103) {
                                            s4 = peg$c65;
                                            peg$currPos++;
                                          } else {
                                            s4 = peg$FAILED;
                                            if (peg$silentFails === 0) { peg$fail(peg$c66); }
                                          }
                                        }
                                      } else {
                                        s3 = peg$c0;
                                      }
                                      if (s3 !== peg$FAILED) {
                                        s2 = [s2, s3];
                                        s1 = s2;
                                      } else {
                                        peg$currPos = s1;
                                        s1 = peg$c0;
                                      }
                                    } else {
                                      peg$currPos = s1;
                                      s1 = peg$c0;
                                    }
                                    if (s1 === peg$FAILED) {
                                      s1 = [];
                                      if (input.charCodeAt(peg$currPos) === 104) {
                                        s2 = peg$c67;
                                        peg$currPos++;
                                      } else {
                                        s2 = peg$FAILED;
                                        if (peg$silentFails === 0) { peg$fail(peg$c68); }
                                      }
                                      if (s2 !== peg$FAILED) {
                                        while (s2 !== peg$FAILED) {
                                          s1.push(s2);
                                          if (input.charCodeAt(peg$currPos) === 104) {
                                            s2 = peg$c67;
                                            peg$currPos++;
                                          } else {
                                            s2 = peg$FAILED;
                                            if (peg$silentFails === 0) { peg$fail(peg$c68); }
                                          }
                                        }
                                      } else {
                                        s1 = peg$c0;
                                      }
                                      if (s1 === peg$FAILED) {
                                        s1 = [];
                                        if (input.charCodeAt(peg$currPos) === 105) {
                                          s2 = peg$c69;
                                          peg$currPos++;
                                        } else {
                                          s2 = peg$FAILED;
                                          if (peg$silentFails === 0) { peg$fail(peg$c70); }
                                        }
                                        if (s2 !== peg$FAILED) {
                                          while (s2 !== peg$FAILED) {
                                            s1.push(s2);
                                            if (input.charCodeAt(peg$currPos) === 105) {
                                              s2 = peg$c69;
                                              peg$currPos++;
                                            } else {
                                              s2 = peg$FAILED;
                                              if (peg$silentFails === 0) { peg$fail(peg$c70); }
                                            }
                                          }
                                        } else {
                                          s1 = peg$c0;
                                        }
                                        if (s1 === peg$FAILED) {
                                          s1 = [];
                                          if (input.charCodeAt(peg$currPos) === 106) {
                                            s2 = peg$c71;
                                            peg$currPos++;
                                          } else {
                                            s2 = peg$FAILED;
                                            if (peg$silentFails === 0) { peg$fail(peg$c72); }
                                          }
                                          if (s2 !== peg$FAILED) {
                                            while (s2 !== peg$FAILED) {
                                              s1.push(s2);
                                              if (input.charCodeAt(peg$currPos) === 106) {
                                                s2 = peg$c71;
                                                peg$currPos++;
                                              } else {
                                                s2 = peg$FAILED;
                                                if (peg$silentFails === 0) { peg$fail(peg$c72); }
                                              }
                                            }
                                          } else {
                                            s1 = peg$c0;
                                          }
                                          if (s1 === peg$FAILED) {
                                            s1 = [];
                                            if (input.charCodeAt(peg$currPos) === 107) {
                                              s2 = peg$c73;
                                              peg$currPos++;
                                            } else {
                                              s2 = peg$FAILED;
                                              if (peg$silentFails === 0) { peg$fail(peg$c74); }
                                            }
                                            if (s2 !== peg$FAILED) {
                                              while (s2 !== peg$FAILED) {
                                                s1.push(s2);
                                                if (input.charCodeAt(peg$currPos) === 107) {
                                                  s2 = peg$c73;
                                                  peg$currPos++;
                                                } else {
                                                  s2 = peg$FAILED;
                                                  if (peg$silentFails === 0) { peg$fail(peg$c74); }
                                                }
                                              }
                                            } else {
                                              s1 = peg$c0;
                                            }
                                            if (s1 === peg$FAILED) {
                                              s1 = [];
                                              if (input.charCodeAt(peg$currPos) === 108) {
                                                s2 = peg$c75;
                                                peg$currPos++;
                                              } else {
                                                s2 = peg$FAILED;
                                                if (peg$silentFails === 0) { peg$fail(peg$c76); }
                                              }
                                              if (s2 !== peg$FAILED) {
                                                while (s2 !== peg$FAILED) {
                                                  s1.push(s2);
                                                  if (input.charCodeAt(peg$currPos) === 108) {
                                                    s2 = peg$c75;
                                                    peg$currPos++;
                                                  } else {
                                                    s2 = peg$FAILED;
                                                    if (peg$silentFails === 0) { peg$fail(peg$c76); }
                                                  }
                                                }
                                              } else {
                                                s1 = peg$c0;
                                              }
                                              if (s1 === peg$FAILED) {
                                                s1 = [];
                                                if (input.charCodeAt(peg$currPos) === 109) {
                                                  s2 = peg$c77;
                                                  peg$currPos++;
                                                } else {
                                                  s2 = peg$FAILED;
                                                  if (peg$silentFails === 0) { peg$fail(peg$c78); }
                                                }
                                                if (s2 !== peg$FAILED) {
                                                  while (s2 !== peg$FAILED) {
                                                    s1.push(s2);
                                                    if (input.charCodeAt(peg$currPos) === 109) {
                                                      s2 = peg$c77;
                                                      peg$currPos++;
                                                    } else {
                                                      s2 = peg$FAILED;
                                                      if (peg$silentFails === 0) { peg$fail(peg$c78); }
                                                    }
                                                  }
                                                } else {
                                                  s1 = peg$c0;
                                                }
                                                if (s1 === peg$FAILED) {
                                                  s1 = [];
                                                  if (input.charCodeAt(peg$currPos) === 110) {
                                                    s2 = peg$c79;
                                                    peg$currPos++;
                                                  } else {
                                                    s2 = peg$FAILED;
                                                    if (peg$silentFails === 0) { peg$fail(peg$c80); }
                                                  }
                                                  if (s2 !== peg$FAILED) {
                                                    while (s2 !== peg$FAILED) {
                                                      s1.push(s2);
                                                      if (input.charCodeAt(peg$currPos) === 110) {
                                                        s2 = peg$c79;
                                                        peg$currPos++;
                                                      } else {
                                                        s2 = peg$FAILED;
                                                        if (peg$silentFails === 0) { peg$fail(peg$c80); }
                                                      }
                                                    }
                                                  } else {
                                                    s1 = peg$c0;
                                                  }
                                                  if (s1 === peg$FAILED) {
                                                    s1 = [];
                                                    if (input.charCodeAt(peg$currPos) === 111) {
                                                      s2 = peg$c81;
                                                      peg$currPos++;
                                                    } else {
                                                      s2 = peg$FAILED;
                                                      if (peg$silentFails === 0) { peg$fail(peg$c82); }
                                                    }
                                                    if (s2 !== peg$FAILED) {
                                                      while (s2 !== peg$FAILED) {
                                                        s1.push(s2);
                                                        if (input.charCodeAt(peg$currPos) === 111) {
                                                          s2 = peg$c81;
                                                          peg$currPos++;
                                                        } else {
                                                          s2 = peg$FAILED;
                                                          if (peg$silentFails === 0) { peg$fail(peg$c82); }
                                                        }
                                                      }
                                                    } else {
                                                      s1 = peg$c0;
                                                    }
                                                    if (s1 === peg$FAILED) {
                                                      s1 = [];
                                                      if (input.charCodeAt(peg$currPos) === 112) {
                                                        s2 = peg$c83;
                                                        peg$currPos++;
                                                      } else {
                                                        s2 = peg$FAILED;
                                                        if (peg$silentFails === 0) { peg$fail(peg$c84); }
                                                      }
                                                      if (s2 !== peg$FAILED) {
                                                        while (s2 !== peg$FAILED) {
                                                          s1.push(s2);
                                                          if (input.charCodeAt(peg$currPos) === 112) {
                                                            s2 = peg$c83;
                                                            peg$currPos++;
                                                          } else {
                                                            s2 = peg$FAILED;
                                                            if (peg$silentFails === 0) { peg$fail(peg$c84); }
                                                          }
                                                        }
                                                      } else {
                                                        s1 = peg$c0;
                                                      }
                                                      if (s1 === peg$FAILED) {
                                                        s1 = [];
                                                        if (input.charCodeAt(peg$currPos) === 113) {
                                                          s2 = peg$c85;
                                                          peg$currPos++;
                                                        } else {
                                                          s2 = peg$FAILED;
                                                          if (peg$silentFails === 0) { peg$fail(peg$c86); }
                                                        }
                                                        if (s2 !== peg$FAILED) {
                                                          while (s2 !== peg$FAILED) {
                                                            s1.push(s2);
                                                            if (input.charCodeAt(peg$currPos) === 113) {
                                                              s2 = peg$c85;
                                                              peg$currPos++;
                                                            } else {
                                                              s2 = peg$FAILED;
                                                              if (peg$silentFails === 0) { peg$fail(peg$c86); }
                                                            }
                                                          }
                                                        } else {
                                                          s1 = peg$c0;
                                                        }
                                                        if (s1 === peg$FAILED) {
                                                          s1 = [];
                                                          if (input.charCodeAt(peg$currPos) === 114) {
                                                            s2 = peg$c87;
                                                            peg$currPos++;
                                                          } else {
                                                            s2 = peg$FAILED;
                                                            if (peg$silentFails === 0) { peg$fail(peg$c88); }
                                                          }
                                                          if (s2 !== peg$FAILED) {
                                                            while (s2 !== peg$FAILED) {
                                                              s1.push(s2);
                                                              if (input.charCodeAt(peg$currPos) === 114) {
                                                                s2 = peg$c87;
                                                                peg$currPos++;
                                                              } else {
                                                                s2 = peg$FAILED;
                                                                if (peg$silentFails === 0) { peg$fail(peg$c88); }
                                                              }
                                                            }
                                                          } else {
                                                            s1 = peg$c0;
                                                          }
                                                          if (s1 === peg$FAILED) {
                                                            s1 = [];
                                                            if (input.charCodeAt(peg$currPos) === 115) {
                                                              s2 = peg$c89;
                                                              peg$currPos++;
                                                            } else {
                                                              s2 = peg$FAILED;
                                                              if (peg$silentFails === 0) { peg$fail(peg$c90); }
                                                            }
                                                            if (s2 !== peg$FAILED) {
                                                              while (s2 !== peg$FAILED) {
                                                                s1.push(s2);
                                                                if (input.charCodeAt(peg$currPos) === 115) {
                                                                  s2 = peg$c89;
                                                                  peg$currPos++;
                                                                } else {
                                                                  s2 = peg$FAILED;
                                                                  if (peg$silentFails === 0) { peg$fail(peg$c90); }
                                                                }
                                                              }
                                                            } else {
                                                              s1 = peg$c0;
                                                            }
                                                            if (s1 === peg$FAILED) {
                                                              s1 = [];
                                                              if (input.charCodeAt(peg$currPos) === 116) {
                                                                s2 = peg$c91;
                                                                peg$currPos++;
                                                              } else {
                                                                s2 = peg$FAILED;
                                                                if (peg$silentFails === 0) { peg$fail(peg$c92); }
                                                              }
                                                              if (s2 !== peg$FAILED) {
                                                                while (s2 !== peg$FAILED) {
                                                                  s1.push(s2);
                                                                  if (input.charCodeAt(peg$currPos) === 116) {
                                                                    s2 = peg$c91;
                                                                    peg$currPos++;
                                                                  } else {
                                                                    s2 = peg$FAILED;
                                                                    if (peg$silentFails === 0) { peg$fail(peg$c92); }
                                                                  }
                                                                }
                                                              } else {
                                                                s1 = peg$c0;
                                                              }
                                                              if (s1 === peg$FAILED) {
                                                                s1 = [];
                                                                if (input.charCodeAt(peg$currPos) === 117) {
                                                                  s2 = peg$c93;
                                                                  peg$currPos++;
                                                                } else {
                                                                  s2 = peg$FAILED;
                                                                  if (peg$silentFails === 0) { peg$fail(peg$c94); }
                                                                }
                                                                if (s2 !== peg$FAILED) {
                                                                  while (s2 !== peg$FAILED) {
                                                                    s1.push(s2);
                                                                    if (input.charCodeAt(peg$currPos) === 117) {
                                                                      s2 = peg$c93;
                                                                      peg$currPos++;
                                                                    } else {
                                                                      s2 = peg$FAILED;
                                                                      if (peg$silentFails === 0) { peg$fail(peg$c94); }
                                                                    }
                                                                  }
                                                                } else {
                                                                  s1 = peg$c0;
                                                                }
                                                                if (s1 === peg$FAILED) {
                                                                  s1 = [];
                                                                  if (input.charCodeAt(peg$currPos) === 118) {
                                                                    s2 = peg$c95;
                                                                    peg$currPos++;
                                                                  } else {
                                                                    s2 = peg$FAILED;
                                                                    if (peg$silentFails === 0) { peg$fail(peg$c96); }
                                                                  }
                                                                  if (s2 !== peg$FAILED) {
                                                                    while (s2 !== peg$FAILED) {
                                                                      s1.push(s2);
                                                                      if (input.charCodeAt(peg$currPos) === 118) {
                                                                        s2 = peg$c95;
                                                                        peg$currPos++;
                                                                      } else {
                                                                        s2 = peg$FAILED;
                                                                        if (peg$silentFails === 0) { peg$fail(peg$c96); }
                                                                      }
                                                                    }
                                                                  } else {
                                                                    s1 = peg$c0;
                                                                  }
                                                                  if (s1 === peg$FAILED) {
                                                                    s1 = [];
                                                                    if (input.charCodeAt(peg$currPos) === 119) {
                                                                      s2 = peg$c97;
                                                                      peg$currPos++;
                                                                    } else {
                                                                      s2 = peg$FAILED;
                                                                      if (peg$silentFails === 0) { peg$fail(peg$c98); }
                                                                    }
                                                                    if (s2 !== peg$FAILED) {
                                                                      while (s2 !== peg$FAILED) {
                                                                        s1.push(s2);
                                                                        if (input.charCodeAt(peg$currPos) === 119) {
                                                                          s2 = peg$c97;
                                                                          peg$currPos++;
                                                                        } else {
                                                                          s2 = peg$FAILED;
                                                                          if (peg$silentFails === 0) { peg$fail(peg$c98); }
                                                                        }
                                                                      }
                                                                    } else {
                                                                      s1 = peg$c0;
                                                                    }
                                                                    if (s1 === peg$FAILED) {
                                                                      s1 = [];
                                                                      if (input.charCodeAt(peg$currPos) === 120) {
                                                                        s2 = peg$c99;
                                                                        peg$currPos++;
                                                                      } else {
                                                                        s2 = peg$FAILED;
                                                                        if (peg$silentFails === 0) { peg$fail(peg$c100); }
                                                                      }
                                                                      if (s2 !== peg$FAILED) {
                                                                        while (s2 !== peg$FAILED) {
                                                                          s1.push(s2);
                                                                          if (input.charCodeAt(peg$currPos) === 120) {
                                                                            s2 = peg$c99;
                                                                            peg$currPos++;
                                                                          } else {
                                                                            s2 = peg$FAILED;
                                                                            if (peg$silentFails === 0) { peg$fail(peg$c100); }
                                                                          }
                                                                        }
                                                                      } else {
                                                                        s1 = peg$c0;
                                                                      }
                                                                      if (s1 === peg$FAILED) {
                                                                        s1 = [];
                                                                        if (input.charCodeAt(peg$currPos) === 121) {
                                                                          s2 = peg$c101;
                                                                          peg$currPos++;
                                                                        } else {
                                                                          s2 = peg$FAILED;
                                                                          if (peg$silentFails === 0) { peg$fail(peg$c102); }
                                                                        }
                                                                        if (s2 !== peg$FAILED) {
                                                                          while (s2 !== peg$FAILED) {
                                                                            s1.push(s2);
                                                                            if (input.charCodeAt(peg$currPos) === 121) {
                                                                              s2 = peg$c101;
                                                                              peg$currPos++;
                                                                            } else {
                                                                              s2 = peg$FAILED;
                                                                              if (peg$silentFails === 0) { peg$fail(peg$c102); }
                                                                            }
                                                                          }
                                                                        } else {
                                                                          s1 = peg$c0;
                                                                        }
                                                                        if (s1 === peg$FAILED) {
                                                                          s1 = [];
                                                                          if (input.charCodeAt(peg$currPos) === 122) {
                                                                            s2 = peg$c103;
                                                                            peg$currPos++;
                                                                          } else {
                                                                            s2 = peg$FAILED;
                                                                            if (peg$silentFails === 0) { peg$fail(peg$c104); }
                                                                          }
                                                                          if (s2 !== peg$FAILED) {
                                                                            while (s2 !== peg$FAILED) {
                                                                              s1.push(s2);
                                                                              if (input.charCodeAt(peg$currPos) === 122) {
                                                                                s2 = peg$c103;
                                                                                peg$currPos++;
                                                                              } else {
                                                                                s2 = peg$FAILED;
                                                                                if (peg$silentFails === 0) { peg$fail(peg$c104); }
                                                                              }
                                                                            }
                                                                          } else {
                                                                            s1 = peg$c0;
                                                                          }
                                                                          if (s1 === peg$FAILED) {
                                                                            s1 = [];
                                                                            if (input.charCodeAt(peg$currPos) === 65) {
                                                                              s2 = peg$c105;
                                                                              peg$currPos++;
                                                                            } else {
                                                                              s2 = peg$FAILED;
                                                                              if (peg$silentFails === 0) { peg$fail(peg$c106); }
                                                                            }
                                                                            if (s2 !== peg$FAILED) {
                                                                              while (s2 !== peg$FAILED) {
                                                                                s1.push(s2);
                                                                                if (input.charCodeAt(peg$currPos) === 65) {
                                                                                  s2 = peg$c105;
                                                                                  peg$currPos++;
                                                                                } else {
                                                                                  s2 = peg$FAILED;
                                                                                  if (peg$silentFails === 0) { peg$fail(peg$c106); }
                                                                                }
                                                                              }
                                                                            } else {
                                                                              s1 = peg$c0;
                                                                            }
                                                                            if (s1 === peg$FAILED) {
                                                                              s1 = [];
                                                                              if (input.charCodeAt(peg$currPos) === 66) {
                                                                                s2 = peg$c107;
                                                                                peg$currPos++;
                                                                              } else {
                                                                                s2 = peg$FAILED;
                                                                                if (peg$silentFails === 0) { peg$fail(peg$c108); }
                                                                              }
                                                                              if (s2 !== peg$FAILED) {
                                                                                while (s2 !== peg$FAILED) {
                                                                                  s1.push(s2);
                                                                                  if (input.charCodeAt(peg$currPos) === 66) {
                                                                                    s2 = peg$c107;
                                                                                    peg$currPos++;
                                                                                  } else {
                                                                                    s2 = peg$FAILED;
                                                                                    if (peg$silentFails === 0) { peg$fail(peg$c108); }
                                                                                  }
                                                                                }
                                                                              } else {
                                                                                s1 = peg$c0;
                                                                              }
                                                                              if (s1 === peg$FAILED) {
                                                                                s1 = [];
                                                                                if (input.charCodeAt(peg$currPos) === 67) {
                                                                                  s2 = peg$c109;
                                                                                  peg$currPos++;
                                                                                } else {
                                                                                  s2 = peg$FAILED;
                                                                                  if (peg$silentFails === 0) { peg$fail(peg$c110); }
                                                                                }
                                                                                if (s2 !== peg$FAILED) {
                                                                                  while (s2 !== peg$FAILED) {
                                                                                    s1.push(s2);
                                                                                    if (input.charCodeAt(peg$currPos) === 67) {
                                                                                      s2 = peg$c109;
                                                                                      peg$currPos++;
                                                                                    } else {
                                                                                      s2 = peg$FAILED;
                                                                                      if (peg$silentFails === 0) { peg$fail(peg$c110); }
                                                                                    }
                                                                                  }
                                                                                } else {
                                                                                  s1 = peg$c0;
                                                                                }
                                                                                if (s1 === peg$FAILED) {
                                                                                  s1 = [];
                                                                                  if (input.charCodeAt(peg$currPos) === 68) {
                                                                                    s2 = peg$c111;
                                                                                    peg$currPos++;
                                                                                  } else {
                                                                                    s2 = peg$FAILED;
                                                                                    if (peg$silentFails === 0) { peg$fail(peg$c112); }
                                                                                  }
                                                                                  if (s2 !== peg$FAILED) {
                                                                                    while (s2 !== peg$FAILED) {
                                                                                      s1.push(s2);
                                                                                      if (input.charCodeAt(peg$currPos) === 68) {
                                                                                        s2 = peg$c111;
                                                                                        peg$currPos++;
                                                                                      } else {
                                                                                        s2 = peg$FAILED;
                                                                                        if (peg$silentFails === 0) { peg$fail(peg$c112); }
                                                                                      }
                                                                                    }
                                                                                  } else {
                                                                                    s1 = peg$c0;
                                                                                  }
                                                                                  if (s1 === peg$FAILED) {
                                                                                    s1 = [];
                                                                                    if (input.charCodeAt(peg$currPos) === 69) {
                                                                                      s2 = peg$c113;
                                                                                      peg$currPos++;
                                                                                    } else {
                                                                                      s2 = peg$FAILED;
                                                                                      if (peg$silentFails === 0) { peg$fail(peg$c114); }
                                                                                    }
                                                                                    if (s2 !== peg$FAILED) {
                                                                                      while (s2 !== peg$FAILED) {
                                                                                        s1.push(s2);
                                                                                        if (input.charCodeAt(peg$currPos) === 69) {
                                                                                          s2 = peg$c113;
                                                                                          peg$currPos++;
                                                                                        } else {
                                                                                          s2 = peg$FAILED;
                                                                                          if (peg$silentFails === 0) { peg$fail(peg$c114); }
                                                                                        }
                                                                                      }
                                                                                    } else {
                                                                                      s1 = peg$c0;
                                                                                    }
                                                                                    if (s1 === peg$FAILED) {
                                                                                      s1 = [];
                                                                                      if (input.charCodeAt(peg$currPos) === 70) {
                                                                                        s2 = peg$c115;
                                                                                        peg$currPos++;
                                                                                      } else {
                                                                                        s2 = peg$FAILED;
                                                                                        if (peg$silentFails === 0) { peg$fail(peg$c116); }
                                                                                      }
                                                                                      if (s2 !== peg$FAILED) {
                                                                                        while (s2 !== peg$FAILED) {
                                                                                          s1.push(s2);
                                                                                          if (input.charCodeAt(peg$currPos) === 70) {
                                                                                            s2 = peg$c115;
                                                                                            peg$currPos++;
                                                                                          } else {
                                                                                            s2 = peg$FAILED;
                                                                                            if (peg$silentFails === 0) { peg$fail(peg$c116); }
                                                                                          }
                                                                                        }
                                                                                      } else {
                                                                                        s1 = peg$c0;
                                                                                      }
                                                                                      if (s1 === peg$FAILED) {
                                                                                        s1 = [];
                                                                                        if (input.charCodeAt(peg$currPos) === 71) {
                                                                                          s2 = peg$c117;
                                                                                          peg$currPos++;
                                                                                        } else {
                                                                                          s2 = peg$FAILED;
                                                                                          if (peg$silentFails === 0) { peg$fail(peg$c118); }
                                                                                        }
                                                                                        if (s2 !== peg$FAILED) {
                                                                                          while (s2 !== peg$FAILED) {
                                                                                            s1.push(s2);
                                                                                            if (input.charCodeAt(peg$currPos) === 71) {
                                                                                              s2 = peg$c117;
                                                                                              peg$currPos++;
                                                                                            } else {
                                                                                              s2 = peg$FAILED;
                                                                                              if (peg$silentFails === 0) { peg$fail(peg$c118); }
                                                                                            }
                                                                                          }
                                                                                        } else {
                                                                                          s1 = peg$c0;
                                                                                        }
                                                                                        if (s1 === peg$FAILED) {
                                                                                          s1 = [];
                                                                                          if (input.charCodeAt(peg$currPos) === 72) {
                                                                                            s2 = peg$c119;
                                                                                            peg$currPos++;
                                                                                          } else {
                                                                                            s2 = peg$FAILED;
                                                                                            if (peg$silentFails === 0) { peg$fail(peg$c120); }
                                                                                          }
                                                                                          if (s2 !== peg$FAILED) {
                                                                                            while (s2 !== peg$FAILED) {
                                                                                              s1.push(s2);
                                                                                              if (input.charCodeAt(peg$currPos) === 72) {
                                                                                                s2 = peg$c119;
                                                                                                peg$currPos++;
                                                                                              } else {
                                                                                                s2 = peg$FAILED;
                                                                                                if (peg$silentFails === 0) { peg$fail(peg$c120); }
                                                                                              }
                                                                                            }
                                                                                          } else {
                                                                                            s1 = peg$c0;
                                                                                          }
                                                                                          if (s1 === peg$FAILED) {
                                                                                            s1 = [];
                                                                                            if (input.charCodeAt(peg$currPos) === 73) {
                                                                                              s2 = peg$c121;
                                                                                              peg$currPos++;
                                                                                            } else {
                                                                                              s2 = peg$FAILED;
                                                                                              if (peg$silentFails === 0) { peg$fail(peg$c122); }
                                                                                            }
                                                                                            if (s2 !== peg$FAILED) {
                                                                                              while (s2 !== peg$FAILED) {
                                                                                                s1.push(s2);
                                                                                                if (input.charCodeAt(peg$currPos) === 73) {
                                                                                                  s2 = peg$c121;
                                                                                                  peg$currPos++;
                                                                                                } else {
                                                                                                  s2 = peg$FAILED;
                                                                                                  if (peg$silentFails === 0) { peg$fail(peg$c122); }
                                                                                                }
                                                                                              }
                                                                                            } else {
                                                                                              s1 = peg$c0;
                                                                                            }
                                                                                            if (s1 === peg$FAILED) {
                                                                                              s1 = [];
                                                                                              if (input.charCodeAt(peg$currPos) === 74) {
                                                                                                s2 = peg$c123;
                                                                                                peg$currPos++;
                                                                                              } else {
                                                                                                s2 = peg$FAILED;
                                                                                                if (peg$silentFails === 0) { peg$fail(peg$c124); }
                                                                                              }
                                                                                              if (s2 !== peg$FAILED) {
                                                                                                while (s2 !== peg$FAILED) {
                                                                                                  s1.push(s2);
                                                                                                  if (input.charCodeAt(peg$currPos) === 74) {
                                                                                                    s2 = peg$c123;
                                                                                                    peg$currPos++;
                                                                                                  } else {
                                                                                                    s2 = peg$FAILED;
                                                                                                    if (peg$silentFails === 0) { peg$fail(peg$c124); }
                                                                                                  }
                                                                                                }
                                                                                              } else {
                                                                                                s1 = peg$c0;
                                                                                              }
                                                                                              if (s1 === peg$FAILED) {
                                                                                                s1 = [];
                                                                                                if (input.charCodeAt(peg$currPos) === 75) {
                                                                                                  s2 = peg$c125;
                                                                                                  peg$currPos++;
                                                                                                } else {
                                                                                                  s2 = peg$FAILED;
                                                                                                  if (peg$silentFails === 0) { peg$fail(peg$c126); }
                                                                                                }
                                                                                                if (s2 !== peg$FAILED) {
                                                                                                  while (s2 !== peg$FAILED) {
                                                                                                    s1.push(s2);
                                                                                                    if (input.charCodeAt(peg$currPos) === 75) {
                                                                                                      s2 = peg$c125;
                                                                                                      peg$currPos++;
                                                                                                    } else {
                                                                                                      s2 = peg$FAILED;
                                                                                                      if (peg$silentFails === 0) { peg$fail(peg$c126); }
                                                                                                    }
                                                                                                  }
                                                                                                } else {
                                                                                                  s1 = peg$c0;
                                                                                                }
                                                                                                if (s1 === peg$FAILED) {
                                                                                                  s1 = [];
                                                                                                  if (input.charCodeAt(peg$currPos) === 76) {
                                                                                                    s2 = peg$c127;
                                                                                                    peg$currPos++;
                                                                                                  } else {
                                                                                                    s2 = peg$FAILED;
                                                                                                    if (peg$silentFails === 0) { peg$fail(peg$c128); }
                                                                                                  }
                                                                                                  if (s2 !== peg$FAILED) {
                                                                                                    while (s2 !== peg$FAILED) {
                                                                                                      s1.push(s2);
                                                                                                      if (input.charCodeAt(peg$currPos) === 76) {
                                                                                                        s2 = peg$c127;
                                                                                                        peg$currPos++;
                                                                                                      } else {
                                                                                                        s2 = peg$FAILED;
                                                                                                        if (peg$silentFails === 0) { peg$fail(peg$c128); }
                                                                                                      }
                                                                                                    }
                                                                                                  } else {
                                                                                                    s1 = peg$c0;
                                                                                                  }
                                                                                                  if (s1 === peg$FAILED) {
                                                                                                    s1 = [];
                                                                                                    if (input.charCodeAt(peg$currPos) === 77) {
                                                                                                      s2 = peg$c129;
                                                                                                      peg$currPos++;
                                                                                                    } else {
                                                                                                      s2 = peg$FAILED;
                                                                                                      if (peg$silentFails === 0) { peg$fail(peg$c130); }
                                                                                                    }
                                                                                                    if (s2 !== peg$FAILED) {
                                                                                                      while (s2 !== peg$FAILED) {
                                                                                                        s1.push(s2);
                                                                                                        if (input.charCodeAt(peg$currPos) === 77) {
                                                                                                          s2 = peg$c129;
                                                                                                          peg$currPos++;
                                                                                                        } else {
                                                                                                          s2 = peg$FAILED;
                                                                                                          if (peg$silentFails === 0) { peg$fail(peg$c130); }
                                                                                                        }
                                                                                                      }
                                                                                                    } else {
                                                                                                      s1 = peg$c0;
                                                                                                    }
                                                                                                    if (s1 === peg$FAILED) {
                                                                                                      s1 = [];
                                                                                                      if (input.charCodeAt(peg$currPos) === 78) {
                                                                                                        s2 = peg$c131;
                                                                                                        peg$currPos++;
                                                                                                      } else {
                                                                                                        s2 = peg$FAILED;
                                                                                                        if (peg$silentFails === 0) { peg$fail(peg$c132); }
                                                                                                      }
                                                                                                      if (s2 !== peg$FAILED) {
                                                                                                        while (s2 !== peg$FAILED) {
                                                                                                          s1.push(s2);
                                                                                                          if (input.charCodeAt(peg$currPos) === 78) {
                                                                                                            s2 = peg$c131;
                                                                                                            peg$currPos++;
                                                                                                          } else {
                                                                                                            s2 = peg$FAILED;
                                                                                                            if (peg$silentFails === 0) { peg$fail(peg$c132); }
                                                                                                          }
                                                                                                        }
                                                                                                      } else {
                                                                                                        s1 = peg$c0;
                                                                                                      }
                                                                                                      if (s1 === peg$FAILED) {
                                                                                                        s1 = [];
                                                                                                        if (input.charCodeAt(peg$currPos) === 79) {
                                                                                                          s2 = peg$c133;
                                                                                                          peg$currPos++;
                                                                                                        } else {
                                                                                                          s2 = peg$FAILED;
                                                                                                          if (peg$silentFails === 0) { peg$fail(peg$c134); }
                                                                                                        }
                                                                                                        if (s2 !== peg$FAILED) {
                                                                                                          while (s2 !== peg$FAILED) {
                                                                                                            s1.push(s2);
                                                                                                            if (input.charCodeAt(peg$currPos) === 79) {
                                                                                                              s2 = peg$c133;
                                                                                                              peg$currPos++;
                                                                                                            } else {
                                                                                                              s2 = peg$FAILED;
                                                                                                              if (peg$silentFails === 0) { peg$fail(peg$c134); }
                                                                                                            }
                                                                                                          }
                                                                                                        } else {
                                                                                                          s1 = peg$c0;
                                                                                                        }
                                                                                                        if (s1 === peg$FAILED) {
                                                                                                          s1 = [];
                                                                                                          if (input.charCodeAt(peg$currPos) === 80) {
                                                                                                            s2 = peg$c135;
                                                                                                            peg$currPos++;
                                                                                                          } else {
                                                                                                            s2 = peg$FAILED;
                                                                                                            if (peg$silentFails === 0) { peg$fail(peg$c136); }
                                                                                                          }
                                                                                                          if (s2 !== peg$FAILED) {
                                                                                                            while (s2 !== peg$FAILED) {
                                                                                                              s1.push(s2);
                                                                                                              if (input.charCodeAt(peg$currPos) === 80) {
                                                                                                                s2 = peg$c135;
                                                                                                                peg$currPos++;
                                                                                                              } else {
                                                                                                                s2 = peg$FAILED;
                                                                                                                if (peg$silentFails === 0) { peg$fail(peg$c136); }
                                                                                                              }
                                                                                                            }
                                                                                                          } else {
                                                                                                            s1 = peg$c0;
                                                                                                          }
                                                                                                          if (s1 === peg$FAILED) {
                                                                                                            s1 = [];
                                                                                                            if (input.charCodeAt(peg$currPos) === 81) {
                                                                                                              s2 = peg$c137;
                                                                                                              peg$currPos++;
                                                                                                            } else {
                                                                                                              s2 = peg$FAILED;
                                                                                                              if (peg$silentFails === 0) { peg$fail(peg$c138); }
                                                                                                            }
                                                                                                            if (s2 !== peg$FAILED) {
                                                                                                              while (s2 !== peg$FAILED) {
                                                                                                                s1.push(s2);
                                                                                                                if (input.charCodeAt(peg$currPos) === 81) {
                                                                                                                  s2 = peg$c137;
                                                                                                                  peg$currPos++;
                                                                                                                } else {
                                                                                                                  s2 = peg$FAILED;
                                                                                                                  if (peg$silentFails === 0) { peg$fail(peg$c138); }
                                                                                                                }
                                                                                                              }
                                                                                                            } else {
                                                                                                              s1 = peg$c0;
                                                                                                            }
                                                                                                            if (s1 === peg$FAILED) {
                                                                                                              s1 = [];
                                                                                                              if (input.charCodeAt(peg$currPos) === 82) {
                                                                                                                s2 = peg$c139;
                                                                                                                peg$currPos++;
                                                                                                              } else {
                                                                                                                s2 = peg$FAILED;
                                                                                                                if (peg$silentFails === 0) { peg$fail(peg$c140); }
                                                                                                              }
                                                                                                              if (s2 !== peg$FAILED) {
                                                                                                                while (s2 !== peg$FAILED) {
                                                                                                                  s1.push(s2);
                                                                                                                  if (input.charCodeAt(peg$currPos) === 82) {
                                                                                                                    s2 = peg$c139;
                                                                                                                    peg$currPos++;
                                                                                                                  } else {
                                                                                                                    s2 = peg$FAILED;
                                                                                                                    if (peg$silentFails === 0) { peg$fail(peg$c140); }
                                                                                                                  }
                                                                                                                }
                                                                                                              } else {
                                                                                                                s1 = peg$c0;
                                                                                                              }
                                                                                                              if (s1 === peg$FAILED) {
                                                                                                                s1 = [];
                                                                                                                if (input.charCodeAt(peg$currPos) === 83) {
                                                                                                                  s2 = peg$c141;
                                                                                                                  peg$currPos++;
                                                                                                                } else {
                                                                                                                  s2 = peg$FAILED;
                                                                                                                  if (peg$silentFails === 0) { peg$fail(peg$c142); }
                                                                                                                }
                                                                                                                if (s2 !== peg$FAILED) {
                                                                                                                  while (s2 !== peg$FAILED) {
                                                                                                                    s1.push(s2);
                                                                                                                    if (input.charCodeAt(peg$currPos) === 83) {
                                                                                                                      s2 = peg$c141;
                                                                                                                      peg$currPos++;
                                                                                                                    } else {
                                                                                                                      s2 = peg$FAILED;
                                                                                                                      if (peg$silentFails === 0) { peg$fail(peg$c142); }
                                                                                                                    }
                                                                                                                  }
                                                                                                                } else {
                                                                                                                  s1 = peg$c0;
                                                                                                                }
                                                                                                                if (s1 === peg$FAILED) {
                                                                                                                  s1 = [];
                                                                                                                  if (input.charCodeAt(peg$currPos) === 84) {
                                                                                                                    s2 = peg$c143;
                                                                                                                    peg$currPos++;
                                                                                                                  } else {
                                                                                                                    s2 = peg$FAILED;
                                                                                                                    if (peg$silentFails === 0) { peg$fail(peg$c144); }
                                                                                                                  }
                                                                                                                  if (s2 !== peg$FAILED) {
                                                                                                                    while (s2 !== peg$FAILED) {
                                                                                                                      s1.push(s2);
                                                                                                                      if (input.charCodeAt(peg$currPos) === 84) {
                                                                                                                        s2 = peg$c143;
                                                                                                                        peg$currPos++;
                                                                                                                      } else {
                                                                                                                        s2 = peg$FAILED;
                                                                                                                        if (peg$silentFails === 0) { peg$fail(peg$c144); }
                                                                                                                      }
                                                                                                                    }
                                                                                                                  } else {
                                                                                                                    s1 = peg$c0;
                                                                                                                  }
                                                                                                                  if (s1 === peg$FAILED) {
                                                                                                                    s1 = [];
                                                                                                                    if (input.charCodeAt(peg$currPos) === 85) {
                                                                                                                      s2 = peg$c145;
                                                                                                                      peg$currPos++;
                                                                                                                    } else {
                                                                                                                      s2 = peg$FAILED;
                                                                                                                      if (peg$silentFails === 0) { peg$fail(peg$c146); }
                                                                                                                    }
                                                                                                                    if (s2 !== peg$FAILED) {
                                                                                                                      while (s2 !== peg$FAILED) {
                                                                                                                        s1.push(s2);
                                                                                                                        if (input.charCodeAt(peg$currPos) === 85) {
                                                                                                                          s2 = peg$c145;
                                                                                                                          peg$currPos++;
                                                                                                                        } else {
                                                                                                                          s2 = peg$FAILED;
                                                                                                                          if (peg$silentFails === 0) { peg$fail(peg$c146); }
                                                                                                                        }
                                                                                                                      }
                                                                                                                    } else {
                                                                                                                      s1 = peg$c0;
                                                                                                                    }
                                                                                                                    if (s1 === peg$FAILED) {
                                                                                                                      s1 = [];
                                                                                                                      if (input.charCodeAt(peg$currPos) === 86) {
                                                                                                                        s2 = peg$c147;
                                                                                                                        peg$currPos++;
                                                                                                                      } else {
                                                                                                                        s2 = peg$FAILED;
                                                                                                                        if (peg$silentFails === 0) { peg$fail(peg$c148); }
                                                                                                                      }
                                                                                                                      if (s2 !== peg$FAILED) {
                                                                                                                        while (s2 !== peg$FAILED) {
                                                                                                                          s1.push(s2);
                                                                                                                          if (input.charCodeAt(peg$currPos) === 86) {
                                                                                                                            s2 = peg$c147;
                                                                                                                            peg$currPos++;
                                                                                                                          } else {
                                                                                                                            s2 = peg$FAILED;
                                                                                                                            if (peg$silentFails === 0) { peg$fail(peg$c148); }
                                                                                                                          }
                                                                                                                        }
                                                                                                                      } else {
                                                                                                                        s1 = peg$c0;
                                                                                                                      }
                                                                                                                      if (s1 === peg$FAILED) {
                                                                                                                        s1 = [];
                                                                                                                        if (input.charCodeAt(peg$currPos) === 87) {
                                                                                                                          s2 = peg$c149;
                                                                                                                          peg$currPos++;
                                                                                                                        } else {
                                                                                                                          s2 = peg$FAILED;
                                                                                                                          if (peg$silentFails === 0) { peg$fail(peg$c150); }
                                                                                                                        }
                                                                                                                        if (s2 !== peg$FAILED) {
                                                                                                                          while (s2 !== peg$FAILED) {
                                                                                                                            s1.push(s2);
                                                                                                                            if (input.charCodeAt(peg$currPos) === 87) {
                                                                                                                              s2 = peg$c149;
                                                                                                                              peg$currPos++;
                                                                                                                            } else {
                                                                                                                              s2 = peg$FAILED;
                                                                                                                              if (peg$silentFails === 0) { peg$fail(peg$c150); }
                                                                                                                            }
                                                                                                                          }
                                                                                                                        } else {
                                                                                                                          s1 = peg$c0;
                                                                                                                        }
                                                                                                                        if (s1 === peg$FAILED) {
                                                                                                                          s1 = [];
                                                                                                                          if (input.charCodeAt(peg$currPos) === 88) {
                                                                                                                            s2 = peg$c151;
                                                                                                                            peg$currPos++;
                                                                                                                          } else {
                                                                                                                            s2 = peg$FAILED;
                                                                                                                            if (peg$silentFails === 0) { peg$fail(peg$c152); }
                                                                                                                          }
                                                                                                                          if (s2 !== peg$FAILED) {
                                                                                                                            while (s2 !== peg$FAILED) {
                                                                                                                              s1.push(s2);
                                                                                                                              if (input.charCodeAt(peg$currPos) === 88) {
                                                                                                                                s2 = peg$c151;
                                                                                                                                peg$currPos++;
                                                                                                                              } else {
                                                                                                                                s2 = peg$FAILED;
                                                                                                                                if (peg$silentFails === 0) { peg$fail(peg$c152); }
                                                                                                                              }
                                                                                                                            }
                                                                                                                          } else {
                                                                                                                            s1 = peg$c0;
                                                                                                                          }
                                                                                                                          if (s1 === peg$FAILED) {
                                                                                                                            s1 = [];
                                                                                                                            if (input.charCodeAt(peg$currPos) === 89) {
                                                                                                                              s2 = peg$c153;
                                                                                                                              peg$currPos++;
                                                                                                                            } else {
                                                                                                                              s2 = peg$FAILED;
                                                                                                                              if (peg$silentFails === 0) { peg$fail(peg$c154); }
                                                                                                                            }
                                                                                                                            if (s2 !== peg$FAILED) {
                                                                                                                              while (s2 !== peg$FAILED) {
                                                                                                                                s1.push(s2);
                                                                                                                                if (input.charCodeAt(peg$currPos) === 89) {
                                                                                                                                  s2 = peg$c153;
                                                                                                                                  peg$currPos++;
                                                                                                                                } else {
                                                                                                                                  s2 = peg$FAILED;
                                                                                                                                  if (peg$silentFails === 0) { peg$fail(peg$c154); }
                                                                                                                                }
                                                                                                                              }
                                                                                                                            } else {
                                                                                                                              s1 = peg$c0;
                                                                                                                            }
                                                                                                                            if (s1 === peg$FAILED) {
                                                                                                                              s1 = [];
                                                                                                                              if (input.charCodeAt(peg$currPos) === 90) {
                                                                                                                                s2 = peg$c155;
                                                                                                                                peg$currPos++;
                                                                                                                              } else {
                                                                                                                                s2 = peg$FAILED;
                                                                                                                                if (peg$silentFails === 0) { peg$fail(peg$c156); }
                                                                                                                              }
                                                                                                                              if (s2 !== peg$FAILED) {
                                                                                                                                while (s2 !== peg$FAILED) {
                                                                                                                                  s1.push(s2);
                                                                                                                                  if (input.charCodeAt(peg$currPos) === 90) {
                                                                                                                                    s2 = peg$c155;
                                                                                                                                    peg$currPos++;
                                                                                                                                  } else {
                                                                                                                                    s2 = peg$FAILED;
                                                                                                                                    if (peg$silentFails === 0) { peg$fail(peg$c156); }
                                                                                                                                  }
                                                                                                                                }
                                                                                                                              } else {
                                                                                                                                s1 = peg$c0;
                                                                                                                              }
                                                                                                                            }
                                                                                                                          }
                                                                                                                        }
                                                                                                                      }
                                                                                                                    }
                                                                                                                  }
                                                                                                                }
                                                                                                              }
                                                                                                            }
                                                                                                          }
                                                                                                        }
                                                                                                      }
                                                                                                    }
                                                                                                  }
                                                                                                }
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c157(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 46) {
          s1 = peg$c158;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c159); }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c160();
        }
        s0 = s1;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c32); }
      }

      return s0;
    }

    function peg$parseRowColDimension() {
      var s0, s1;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c162) {
        s1 = peg$c162;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c163); }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c164();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c165) {
          s1 = peg$c165;
          peg$currPos += 4;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c166); }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c167();
        }
        s0 = s1;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c161); }
      }

      return s0;
    }

    function peg$parseLine() {
      var s0, s1, s2, s3, s4;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseConnection();
      if (s1 === peg$FAILED) {
        s1 = peg$c169;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseLineChunk();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseLineChunk();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parseLineChunk();
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c170(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c168); }
      }

      return s0;
    }

    function peg$parseLineChunk() {
      var s0, s1, s2, s3, s4, s5;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parse__();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseVirtualNameChars();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parseVirtualNameChars();
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse__();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseConnection();
            if (s4 === peg$FAILED) {
              s4 = peg$c169;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse__();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c172(s2, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c171); }
      }

      return s0;
    }

    function peg$parseConnection() {
      var s0, s1, s2, s3, s4;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 45) {
        s2 = peg$c174;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c175); }
      }
      if (s2 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 126) {
          s2 = peg$c176;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c177); }
        }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c178.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c179); }
        }
        if (s4 !== peg$FAILED) {
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            if (peg$c178.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c179); }
            }
          }
        } else {
          s3 = peg$c0;
        }
        if (s3 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 45) {
            s3 = peg$c174;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c175); }
          }
        }
        if (s3 === peg$FAILED) {
          s3 = peg$c169;
        }
        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 45) {
            s4 = peg$c174;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c175); }
          }
          if (s4 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 126) {
              s4 = peg$c176;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c177); }
            }
          }
          if (s4 === peg$FAILED) {
            s4 = peg$c169;
          }
          if (s4 !== peg$FAILED) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c180(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c173); }
      }

      return s0;
    }

    function peg$parseConnectionTypes() {
      var s0, s1, s2, s3;

      peg$silentFails++;
      if (input.charCodeAt(peg$currPos) === 45) {
        s0 = peg$c174;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c175); }
      }
      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 126) {
          s0 = peg$c176;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c177); }
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 45) {
            s1 = peg$c174;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c175); }
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            if (peg$c178.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c179); }
            }
            if (s3 !== peg$FAILED) {
              while (s3 !== peg$FAILED) {
                s2.push(s3);
                if (peg$c178.test(input.charAt(peg$currPos))) {
                  s3 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c179); }
                }
              }
            } else {
              s2 = peg$c0;
            }
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 45) {
                s3 = peg$c174;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c175); }
              }
              if (s3 !== peg$FAILED) {
                s1 = [s1, s2, s3];
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 126) {
              s1 = peg$c176;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c177); }
            }
            if (s1 !== peg$FAILED) {
              s2 = [];
              if (peg$c178.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c179); }
              }
              if (s3 !== peg$FAILED) {
                while (s3 !== peg$FAILED) {
                  s2.push(s3);
                  if (peg$c178.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c179); }
                  }
                }
              } else {
                s2 = peg$c0;
              }
              if (s2 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 45) {
                  s2 = peg$c174;
                  peg$currPos++;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c175); }
                }
              }
              if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 126) {
                  s3 = peg$c176;
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c177); }
                }
                if (s3 !== peg$FAILED) {
                  s1 = [s1, s2, s3];
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c181); }
      }

      return s0;
    }

    function peg$parseVirtualNameChars() {
      var s0;

      if (peg$c182.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c183); }
      }

      return s0;
    }

    function peg$parseNameChars() {
      var s0;

      if (peg$c184.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c185); }
      }

      return s0;
    }

    function peg$parseNameCharsWithSpace() {
      var s0;

      s0 = peg$parseNameChars();
      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 32) {
          s0 = peg$c186;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c187); }
        }
      }

      return s0;
    }

    function peg$parseLiteral() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseNumber();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c188(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseNumber() {
      var s0;

      s0 = peg$parseReal();
      if (s0 === peg$FAILED) {
        s0 = peg$parseInteger();
      }

      return s0;
    }

    function peg$parseInteger() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c178.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c179); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c178.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c179); }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c189(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseReal() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parseInteger();
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s3 = peg$c158;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c159); }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parseInteger();
          if (s4 !== peg$FAILED) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c190(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseSignedInteger() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (peg$c191.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c192); }
      }
      if (s1 === peg$FAILED) {
        s1 = peg$c169;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c178.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c179); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c178.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c179); }
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseSourceCharacter() {
      var s0;

      if (input.length > peg$currPos) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c193); }
      }

      return s0;
    }

    function peg$parseWhiteSpace() {
      var s0, s1;

      peg$silentFails++;
      if (peg$c195.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c196); }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c194); }
      }

      return s0;
    }

    function peg$parseLineTerminator() {
      var s0;

      if (peg$c197.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c198); }
      }

      return s0;
    }

    function peg$parseLineTerminatorSequence() {
      var s0, s1;

      peg$silentFails++;
      if (input.charCodeAt(peg$currPos) === 10) {
        s0 = peg$c200;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c201); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c202) {
          s0 = peg$c202;
          peg$currPos += 2;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c203); }
        }
        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 13) {
            s0 = peg$c204;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c205); }
          }
          if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 8232) {
              s0 = peg$c206;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c207); }
            }
            if (s0 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 8233) {
                s0 = peg$c208;
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c209); }
              }
            }
          }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c199); }
      }

      return s0;
    }

    function peg$parseAnyChar() {
      var s0;

      if (peg$c210.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c211); }
      }

      return s0;
    }

    function peg$parseEOS() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parse__();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 59) {
          s2 = peg$c213;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c214); }
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseLineTerminatorSequence();
          if (s2 !== peg$FAILED) {
            s1 = [s1, s2];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parse__();
          if (s1 !== peg$FAILED) {
            s2 = peg$parseEOF();
            if (s2 !== peg$FAILED) {
              s1 = [s1, s2];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c212); }
      }

      return s0;
    }

    function peg$parseEOF() {
      var s0, s1;

      s0 = peg$currPos;
      peg$silentFails++;
      if (input.length > peg$currPos) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c193); }
      }
      peg$silentFails--;
      if (s1 === peg$FAILED) {
        s0 = peg$c215;
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseComment() {
      var s0, s1;

      peg$silentFails++;
      s0 = peg$parseMultiLineComment();
      if (s0 === peg$FAILED) {
        s0 = peg$parseSingleLineComment();
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c216); }
      }

      return s0;
    }

    function peg$parseMultiLineComment() {
      var s0, s1, s2, s3, s4, s5;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c218) {
        s1 = peg$c218;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c219); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;
        if (input.substr(peg$currPos, 2) === peg$c220) {
          s5 = peg$c220;
          peg$currPos += 2;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c221); }
        }
        peg$silentFails--;
        if (s5 === peg$FAILED) {
          s4 = peg$c215;
        } else {
          peg$currPos = s4;
          s4 = peg$c0;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parseSourceCharacter();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$currPos;
          peg$silentFails++;
          if (input.substr(peg$currPos, 2) === peg$c220) {
            s5 = peg$c220;
            peg$currPos += 2;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c221); }
          }
          peg$silentFails--;
          if (s5 === peg$FAILED) {
            s4 = peg$c215;
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseSourceCharacter();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c220) {
            s3 = peg$c220;
            peg$currPos += 2;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c221); }
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c217); }
      }

      return s0;
    }

    function peg$parseMultiLineCommentNoLineTerminator() {
      var s0, s1, s2, s3, s4, s5;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c218) {
        s1 = peg$c218;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c219); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;
        if (input.substr(peg$currPos, 2) === peg$c220) {
          s5 = peg$c220;
          peg$currPos += 2;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c221); }
        }
        if (s5 === peg$FAILED) {
          s5 = peg$parseLineTerminator();
        }
        peg$silentFails--;
        if (s5 === peg$FAILED) {
          s4 = peg$c215;
        } else {
          peg$currPos = s4;
          s4 = peg$c0;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parseSourceCharacter();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$currPos;
          peg$silentFails++;
          if (input.substr(peg$currPos, 2) === peg$c220) {
            s5 = peg$c220;
            peg$currPos += 2;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c221); }
          }
          if (s5 === peg$FAILED) {
            s5 = peg$parseLineTerminator();
          }
          peg$silentFails--;
          if (s5 === peg$FAILED) {
            s4 = peg$c215;
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseSourceCharacter();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c220) {
            s3 = peg$c220;
            peg$currPos += 2;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c221); }
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c222); }
      }

      return s0;
    }

    function peg$parseSingleLineComment() {
      var s0, s1, s2, s3, s4, s5;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c224) {
        s1 = peg$c224;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c225); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;
        s5 = peg$parseLineTerminator();
        peg$silentFails--;
        if (s5 === peg$FAILED) {
          s4 = peg$c215;
        } else {
          peg$currPos = s4;
          s4 = peg$c0;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parseSourceCharacter();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$currPos;
          peg$silentFails++;
          s5 = peg$parseLineTerminator();
          peg$silentFails--;
          if (s5 === peg$FAILED) {
            s4 = peg$c215;
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseSourceCharacter();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseLineTerminator();
          if (s3 === peg$FAILED) {
            s3 = peg$parseEOF();
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c223); }
      }

      return s0;
    }

    function peg$parse_() {
      var s0, s1;

      peg$silentFails++;
      s0 = [];
      s1 = peg$parseWhiteSpace();
      if (s1 === peg$FAILED) {
        s1 = peg$parseMultiLineCommentNoLineTerminator();
        if (s1 === peg$FAILED) {
          s1 = peg$parseSingleLineComment();
        }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = peg$parseWhiteSpace();
        if (s1 === peg$FAILED) {
          s1 = peg$parseMultiLineCommentNoLineTerminator();
          if (s1 === peg$FAILED) {
            s1 = peg$parseSingleLineComment();
          }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c226); }
      }

      return s0;
    }

    function peg$parse__() {
      var s0, s1;

      peg$silentFails++;
      s0 = [];
      s1 = peg$parseWhiteSpace();
      if (s1 === peg$FAILED) {
        s1 = peg$parseLineTerminatorSequence();
        if (s1 === peg$FAILED) {
          s1 = peg$parseComment();
        }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = peg$parseWhiteSpace();
        if (s1 === peg$FAILED) {
          s1 = peg$parseLineTerminatorSequence();
          if (s1 === peg$FAILED) {
            s1 = peg$parseComment();
          }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c227); }
      }

      return s0;
    }


      var p, parser, vfls, virtuals, ccss, asts, blankCount; 

      p = parser = this;
      
      blankCount = 0;
      
      p.getBlankName = function () {
        blankCount++;
        return "blank-" + blankCount;
      };
      
      p.size = ['width','height'];
      p.pos = ['x','y'];

      p.getResults = function () {
        var _ccss = virtuals.sort().join(" ");
        if (_ccss.length == 0) {
          _ccss = ccss;
        }
        else {
          _ccss = ["@virtual "+_ccss].concat(ccss);
        }
        return {
            //asts: asts, // DEBUG
            ccss: _ccss,
            vfl: vfls
          }
      }

      asts = [];
      
      p.addAST = function (stuff) {
        asts.push(stuff);
      }

      ccss = [];
      
      p.addCCSS = function (statement) {
        ccss.push(statement)
      }

      virtuals = [];
      
      p.addVirtual = function (virtual) {
        if (virtuals.indexOf(virtual) === -1) {
          virtuals.push('"'+virtual+'"');
        }
      }

      vfls = [];

      p.addVFL = function (vfl) {
        vfls.push(vfl);
      }


      p.addTemplate = function (lines,name,options) {
        var ast, prefix, container;
        
        prefix = name+'-';
        ast = p.processHLines(lines);
        ast.name = name;
        
        if (options.in) {
          container = options.in;
        }
        else {
          container = "::";
        }

        var md, mdOp, outergap, gaps, g, hasGap;
        
        gaps = {};
        hasGap = false;
        
        g = options.gap;
        if (g) { 
          hasGap = true;
          gaps.top = g;
          gaps.right = g;
          gaps.bottom = g;
          gaps.left = g;
          gaps.h = g;
          gaps.v = g;
        }    
        g = options['h-gap'];
        if (g) { 
          hasGap = true;
          gaps.right = g;
          gaps.left = g;
          gaps.h = g;
        }
        g = options['v-gap'];
        if (g) { 
          hasGap = true;
          gaps.top = g;
          gaps.bottom = g;
          gaps.v = g;
        }
        g = options['outer-gap'];
        if (g) { 
          hasGap = true;
          gaps.top = g;
          gaps.right = g;
          gaps.bottom = g;
          gaps.left = g;
        }
        g = options['top-gap'];
        if (g) { 
          hasGap = true;
          gaps.top = g;
        }
        g = options['right-gap']; 
        if (g) { 
          hasGap = true;
          gaps.right = g;
        }
        g = options['bottom-gap']; 
        if (g) { 
          hasGap = true;
          gaps.bottom = g;
        }
        g = options['left-gap']; 
        if (g) { 
          hasGap = true;
          gaps.left = g;
        }
        
        
        if (hasGap) {
          mdOp = "<=";
        } else {
          mdOp = "==";
        }
        
        
        // md-width     
        // -------------------------------------------------
        // == (this[width] - gap.left - gap.right - gap * (span - 1)) / span
        
        md = '::['+name+'-md-width] ' + mdOp + ' ';
        if (gaps.right || gaps.left || gaps.h) {
          md += '(' + container + '[width]';
          if (gaps.right) {md += ' - ' + gaps.right;}
          if (gaps.left ) {md += ' - ' + gaps.left;}      
          if (gaps.h && ast.yspan > 1){
            md += ' - ' + gaps.h;
            if (ast.yspan > 2) {md += ' * ' + (ast.yspan - 1);}
          }
          md += ')';
        } else {
          md += container + '[width]';
        }
        if (ast.yspan > 1){md += ' / ' + ast.yspan;}
        md += " !require";
        p.addCCSS(md);
        
        
        // md-height
        // -------------------------------------------------
      
        md = '::['+name+'-md-height] ' + mdOp + ' ';
        if (gaps.top || gaps.bottom || gaps.v) {
          md += '(' + container + '[height]';
          if (gaps.top) {md += ' - ' + gaps.top;}
          if (gaps.bottom ) {md += ' - ' + gaps.bottom;}
          if (gaps.v && ast.xspan > 1){
            md += ' - ' + gaps.v;
            if (ast.xspan > 2) {md += ' * ' + (ast.xspan - 1);}
          }
          md += ')';
        } else {
          md += container + '[height]';
        }    
        if (ast.xspan > 1){md += ' / ' + ast.xspan;}
        md += " !require";
        p.addCCSS(md);
        
        
        // virtual widths
        // -------------------------------------------------
        // == md-width * span - gap * (span - 1)
        
        var xspan, wccss;
        for (var el in ast.widths) {
          p.addVirtual(prefix+el);
          xspan = ast.widths[el];
          wccss = '"'+prefix+el+'"[width] == ';
          wccss +='::['+ast.name+'-md-width]';
          if (xspan > 1) {
            wccss += ' * ' + xspan;
            if (gaps.h) {
              wccss += ' + ' + gaps.h;
              if (xspan > 2) {
                wccss += ' * ' + (xspan - 1);
              }
            }
          }
          p.addCCSS(wccss)
        }
        
        
        // virtual heights
        // -------------------------------------------------
        
        var yspan, hccss;
        for (var el in ast.heights) {
          yspan = ast.heights[el];
          hccss = '"'+prefix+el+'"[height] == ';
          hccss +='::['+ast.name+'-md-height]';
          if (yspan > 1) {
            hccss += ' * ' + yspan;
            if (gaps.v) {
              hccss += ' + ' + gaps.v;
              if (yspan > 2) {
                hccss += ' * ' + (yspan - 1);
              }
            }
          }
          p.addCCSS(hccss);
        }

        var vfl, vflFooter;
        ast.v.forEach(function(brij){
          brij = brij.split("%-v-%");
          vfl = '@v ["'+prefix+brij[0]+'"]';
          if (gaps.v) {vfl += '-';}
          vfl += '["'+prefix+brij[1]+'"]';
          if (gaps.v) {vfl += ' gap('+gaps.v+')';}
          p.addVFL(vfl);
        });
       
        ast.h.forEach(function(brij){
          brij = brij.split("%-h-%");
          vfl = '@h ["'+prefix+brij[0]+'"]';
          if (gaps.h) {vfl += '-';}
          vfl += '["'+prefix+brij[1]+'"]';
          if (gaps.h) {vfl += ' gap('+gaps.h+')';}
          p.addVFL(vfl);
        });
        
        var edgeEls;
        
        edgeEls = [];
        ast.cols[0].y.forEach(function(el){
          if (edgeEls.indexOf(el) > -1) {return null;}
          edgeEls.push(el);
          vfl = '@h |';
          if (gaps.left) {vfl += '-';}
          vfl += '["'+prefix+el+'"]'+' in('+container+')';   
          if (gaps.left) {vfl += ' gap('+gaps.left+')';}
          p.addVFL(vfl);
        });

        edgeEls = [];
        ast.rows[0].x.forEach(function(el){
          if (edgeEls.indexOf(el) > -1) {return null;}
          edgeEls.push(el);
          vfl = '@v |';
          if (gaps.top) {vfl += '-';}
          vfl += '["'+prefix+el+'"]'+' in('+container+')';
          if (gaps.top) {vfl += ' gap('+gaps.top+')';}
          p.addVFL(vfl);
        });

        edgeEls = [];
        ast.cols[ast.cols.length-1].y.forEach(function(el){
          if (edgeEls.indexOf(el) > -1) {return null;}
          edgeEls.push(el);
          vfl = '@h ["'+prefix+el+'"]';
          if (gaps.right) {vfl += '-';}
          vfl +='|'+' in('+container+')';
          if (gaps.right) {vfl += ' gap('+gaps.right+')';}
          p.addVFL(vfl);
        });

        edgeEls = [];
        ast.rows[ast.rows.length-1].x.forEach(function(el){
          if (edgeEls.indexOf(el) > -1) {return null;}
          edgeEls.push(el);
          vfl = '@v ["'+prefix+el+'"]';
          if (gaps.bottom) {vfl += '-';}
          vfl += '|'+' in('+container+')';
          if (gaps.bottom) {vfl += ' gap('+gaps.bottom+')';}
          p.addVFL(vfl);
        });

        

        //p.addVFL(ast);
        p.addAST(ast);
        
        return ast;
      }

      p.processHZones = function (zones) {
        var xspan, curr, prev, h, x, widths,
          dotCounter, isDot;
        xspan = 0;
        h = [];
        widths = {};
        x = [];
        dotCounter = 0;    
        zones.forEach(function(zone){
          isDot = false;
          curr = zone.name;
          
          // "." are each treated as an empty zone
          if (curr === "-DOT-") {
            isDot = false;
            dotCounter++;
            curr += dotCounter;
          }
          x = x.concat(zone.x);
          delete zone.x;
          if (prev && prev !== curr) {   
            h.push([prev,curr].join("%-h-%"));
          }
          widths[zone.name] = zone.xspan;
          xspan += zone.xspan;
          prev = curr;
        });
        return {xspan:xspan,x:x,h:h,widths:widths};
      }
      
      p.processHLines = function (lines) {
        var cols,i,j,col,results;
        results = {heights:{},widths:{},v:[],h:[]};
        cols = [];
        i = 0;


        lines.forEach(function(row){
          j = 0;
          for (var nam in row.widths) {        
            results.widths[nam] = row.widths[nam];
          }
          row.h.forEach(function(hh){
            if (results.h.indexOf(hh) === -1) {results.h.push(hh);}
          })
          row.x.forEach(function(xx){
            var col;
            if (!cols[j]) {cols[j] = {y:[]};}
            col = cols[j];
            col.y.push(xx);
            j++;
          })
          i++;
        });    

        cols.forEach(function(col){
          var curr, currspan, prev, vStr, heights, i, v;
          v = [];            
          currspan = 0;
          prev = null;
          i = 0;
          col.y.forEach(function(name){        
            curr = name;
            currspan++;
            if (col.y[i+1]!==curr) {
              results.heights[name] = currspan;
              currspan = 0;
            }
            if (prev && prev !== curr) {
              vStr = [prev,curr].join("%-v-%")
              if (results.v.indexOf(vStr) === -1) {results.v.push(vStr);}
            }
            prev = curr;
            i++;
          })
        })

        results.yspan = cols.length;
        results.xspan = lines.length;
        results.cols = cols;
        results.rows = lines;           

        return results;
      }  


      p.trim = function (x) {
        if (typeof x === "string") {return x.trim();}
        if (x instanceof Array) {return x.join("").trim();}
        return ""
      };

      p.flatten = function (array, isShallow) {
        var index = -1,
          length = array ? array.length : 0,
          result = [];

        while (++index < length) {
          var value = array[index];

          if (value instanceof Array) {
            Array.prototype.push.apply(result, isShallow ? value : p.flatten(value));
          }
          else {
            result.push(value);
          }
        }
        return result;
      }

      p.stringify = function (array) {
        return p.trim(p.flatten(array));
      };
      


    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
})();
},{}],12:[function(require,module,exports){
arguments[4][10][0].apply(exports,arguments)
},{"../lib/parser":13,"./parser":13,"dup":10,"error-reporter":14}],13:[function(require,module,exports){
module.exports = (function() {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = peg$FAILED,
        peg$c1 = [],
        peg$c2 = function() { return p.getResults(); },
        peg$c3 = function(vfl) { return p.getResults().concat(vfl); },
        peg$c4 = function(exp) { return exp; },
        peg$c5 = null,
        peg$c6 = function(d, head, tail, o) {
              var connection, result, ccss, chainedViews, withContainer,
                tailView, tailViewObj, headView, headViewObj;
              p.addSplatIfNeeded(head, d, o);
              result = head;
              headViewObj = head;
              headView = headViewObj.view;
              chainedViews = [];
              if (headView !== "|") {chainedViews.push(headView);}
              p.addPreds(headView,head.preds,d);
              for (var i = 0; i < tail.length; i++) {
                connection = tail[i][1];
                tailViewObj = tail[i][3];
                p.addSplatIfNeeded(tailViewObj, d, o);
                tailView = tailViewObj.view;
                if (tailView !== "|") {chainedViews.push(tailView);}
                p.addPreds(tailView,tail[i][3].preds,d);
                result = [
                  //"c",
                  connection,
                  result,
                  tailView
                ];
                if (!(headViewObj.isPoint && tailViewObj.isPoint)) {
                  withContainer = ( headView =="|" || tailView === "|") && !(headViewObj.isPoint || tailViewObj.isPoint);          
                  ccss = p.getLeftVar(headView, d, o, headViewObj) + " "
                    + p.getConnectionString(connection, d, o, withContainer) + " "
                    + p.getRightVar(tailView, d, o, tailViewObj)
                    + p.getTrailingOptions(o)
                    + p.getSW(o);
                  p.addC(
                    ccss.trim()
                );}
                headViewObj = tailViewObj;
                headView = tailView;
              }
              p.addChains(chainedViews,o);
              return {'vfl':d, o:o};
            },
        peg$c7 = "@horizontal",
        peg$c8 = { type: "literal", value: "@horizontal", description: "\"@horizontal\"" },
        peg$c9 = "@-gss-horizontal",
        peg$c10 = { type: "literal", value: "@-gss-horizontal", description: "\"@-gss-horizontal\"" },
        peg$c11 = "@-gss-h",
        peg$c12 = { type: "literal", value: "@-gss-h", description: "\"@-gss-h\"" },
        peg$c13 = "@h",
        peg$c14 = { type: "literal", value: "@h", description: "\"@h\"" },
        peg$c15 = function() {return 0;},
        peg$c16 = "@vertical",
        peg$c17 = { type: "literal", value: "@vertical", description: "\"@vertical\"" },
        peg$c18 = "@-gss-vertical",
        peg$c19 = { type: "literal", value: "@-gss-vertical", description: "\"@-gss-vertical\"" },
        peg$c20 = "@-gss-v",
        peg$c21 = { type: "literal", value: "@-gss-v", description: "\"@-gss-v\"" },
        peg$c22 = "@v",
        peg$c23 = { type: "literal", value: "@v", description: "\"@v\"" },
        peg$c24 = function() {return 1;},
        peg$c25 = function(os) {
            var obj = {};
            obj.chains = [];
            for (var i = 0; i < os.length; i++) {
              // proccess chains
              if (!!os[i].chain) {
                obj.chains.push(os[i].chain);
              }
              // or just add option
              else {
                obj[os[i].key] = os[i].value;
              }
            }
            return obj;
          },
        peg$c26 = { type: "other", description: "Option" },
        peg$c27 = function(chain) { return chain; },
        peg$c28 = "in",
        peg$c29 = { type: "literal", value: "in", description: "\"in\"" },
        peg$c30 = "(",
        peg$c31 = { type: "literal", value: "(", description: "\"(\"" },
        peg$c32 = /^[^) ]/,
        peg$c33 = { type: "class", value: "[^) ]", description: "[^) ]" },
        peg$c34 = ")",
        peg$c35 = { type: "literal", value: ")", description: "\")\"" },
        peg$c36 = function(simple) {
              return {key:"in", value:simple.join('')};
            },
        peg$c37 = /^[^)]/,
        peg$c38 = { type: "class", value: "[^)]", description: "[^)]" },
        peg$c39 = function(complex) {
              return {key:"in", value:"(" + complex.join('') + ")"};
            },
        peg$c40 = function(key, value) {
              return {key:key.join(''), value:value.join('')};
            },
        peg$c41 = function(sw) {return {key:"sw",value:sw}; },
        peg$c42 = /^[^>=<!)]/,
        peg$c43 = { type: "class", value: "[^>=<!)]", description: "[^>=<!)]" },
        peg$c44 = /^[>=<!]/,
        peg$c45 = { type: "class", value: "[>=<!]", description: "[>=<!]" },
        peg$c46 = function() {
              throw new SyntaxError('invalid character in option', null, null, null, line(), column());
            },
        peg$c47 = { type: "other", description: "Chain" },
        peg$c48 = "chain-",
        peg$c49 = { type: "literal", value: "chain-", description: "\"chain-\"" },
        peg$c50 = function(prop, preds) { return {'chain':[prop.join(""),preds]};},
        peg$c51 = { type: "other", description: "ChainPredicate" },
        peg$c52 = function(items) {
            items.raw = "";
            items.forEach( function (item){
              items.raw += item.raw;
            });
            return items;
          },
        peg$c53 = "()",
        peg$c54 = { type: "literal", value: "()", description: "\"()\"" },
        peg$c55 = function() {return {raw:""};},
        peg$c56 = ",",
        peg$c57 = { type: "literal", value: ",", description: "\",\"" },
        peg$c58 = function(item) {
            item.raw = item.headEq + item.value + item.tailEq + item.s;
            return item;
          },
        peg$c59 = function(headEq, value, tailEq, s) {
              return {headEq:p.join(headEq),value:p.join(value),tailEq:p.join(tailEq),s:p.join(s)};},
        peg$c60 = /^[^>=<!) ]/,
        peg$c61 = { type: "class", value: "[^>=<!) ]", description: "[^>=<!) ]" },
        peg$c62 = { type: "other", description: "VFL Element" },
        peg$c63 = function(point) {return {view:"|", isPoint:true, pos:point};},
        peg$c64 = "|",
        peg$c65 = { type: "literal", value: "|", description: "\"|\"" },
        peg$c66 = function() {return {view:"|"};},
        peg$c67 = function(view, pred) {
              view = p.stringify(view); 
              p.addSelector(view); 
              return {view:view,preds:pred};
            },
        peg$c68 = /^[^()]/,
        peg$c69 = { type: "class", value: "[^()]", description: "[^()]" },
        peg$c70 = function(view, pred) {
              view = "(" + p.stringify(view) + ")"; 
              p.addSelector(view); 
              return {view:view,preds:pred};
            },
        peg$c71 = "...",
        peg$c72 = { type: "literal", value: "...", description: "\"...\"" },
        peg$c73 = function(o, connection) {o.isSplat = true; o.connection = connection; return o;},
        peg$c74 = { type: "other", description: "Point" },
        peg$c75 = "<",
        peg$c76 = { type: "literal", value: "<", description: "\"<\"" },
        peg$c77 = /^[^>]/,
        peg$c78 = { type: "class", value: "[^>]", description: "[^>]" },
        peg$c79 = ">",
        peg$c80 = { type: "literal", value: ">", description: "\">\"" },
        peg$c81 = function(position) {
            return p.stringify(position);
          },
        peg$c82 = { type: "other", description: "Predicate" },
        peg$c83 = function(preds) {return preds;},
        peg$c84 = { type: "other", description: "Predicate Expression" },
        peg$c85 = "==",
        peg$c86 = { type: "literal", value: "==", description: "\"==\"" },
        peg$c87 = "<=",
        peg$c88 = { type: "literal", value: "<=", description: "\"<=\"" },
        peg$c89 = ">=",
        peg$c90 = { type: "literal", value: ">=", description: "\">=\"" },
        peg$c91 = "=<",
        peg$c92 = { type: "literal", value: "=<", description: "\"=<\"" },
        peg$c93 = function() {return "<=";},
        peg$c94 = "=>",
        peg$c95 = { type: "literal", value: "=>", description: "\"=>\"" },
        peg$c96 = function() {return ">=";},
        peg$c97 = function(eq) {return eq;},
        peg$c98 = /^[+\-\/*]/,
        peg$c99 = { type: "class", value: "[+\\-\\/*]", description: "[+\\-\\/*]" },
        peg$c100 = function(op) {return op;},
        peg$c101 = function(name) {return ["view",name.join("")];},
        peg$c102 = function(n) {return n.join("");},
        peg$c103 = "[",
        peg$c104 = { type: "literal", value: "[", description: "\"[\"" },
        peg$c105 = "]",
        peg$c106 = { type: "literal", value: "]", description: "\"]\"" },
        peg$c107 = function(name) {return "[" + name.join("") + "]";},
        peg$c108 = function(view, prop) {return view.join("") + "[" + prop.join("") + "]";},
        peg$c109 = function() {return "";},
        peg$c110 = { type: "other", description: "VFL Connection" },
        peg$c111 = "-",
        peg$c112 = { type: "literal", value: "-", description: "\"-\"" },
        peg$c113 = function(gap) {return {op:"==",gap:gap};},
        peg$c114 = function() {return {op:"==",gap:"__STANDARD__"};},
        peg$c115 = "~",
        peg$c116 = { type: "literal", value: "~", description: "\"~\"" },
        peg$c117 = function(gap) {return {op:"<=",gap:gap};},
        peg$c118 = function() {return {op:"<=",gap:"__STANDARD__"};},
        peg$c119 = function() {return {op:"<="};},
        peg$c120 = "",
        peg$c121 = function() {return {op:"=="};},
        peg$c122 = "&",
        peg$c123 = { type: "literal", value: "&", description: "\"&\"" },
        peg$c124 = function(local) {
            if (local.length > 1) {
              throw new SyntaxError('Invalid local variable scope', null, null, null, line(), column());
            }
            return local.join("");
          },
        peg$c125 = "^",
        peg$c126 = { type: "literal", value: "^", description: "\"^\"" },
        peg$c127 = function(parent) {return parent.join("");},
        peg$c128 = "$",
        peg$c129 = { type: "literal", value: "$", description: "\"$\"" },
        peg$c130 = function(global) {
            if (global.length > 1) {
              throw new SyntaxError('Invalid global variable scope', null, null, null, line(), column());
            }
            return global.join("");
          },
        peg$c131 = { type: "other", description: "VFL Connection Gap" },
        peg$c132 = /^[a-zA-Z0-9_]/,
        peg$c133 = { type: "class", value: "[a-zA-Z0-9_]", description: "[a-zA-Z0-9_]" },
        peg$c134 = function(scope, gap) {return scope + gap.join("");},
        peg$c135 = function(gap) {return gap.join("");},
        peg$c136 = /^[^[]/,
        peg$c137 = { type: "class", value: "[^[]", description: "[^[]" },
        peg$c138 = /^[^\]]/,
        peg$c139 = { type: "class", value: "[^\\]]", description: "[^\\]]" },
        peg$c140 = function(gap, varr) {return gap.join("") + "[" + varr.join("") + "]";},
        peg$c141 = { type: "other", description: "Strength / Weight" },
        peg$c142 = "!",
        peg$c143 = { type: "literal", value: "!", description: "\"!\"" },
        peg$c144 = /^[a-zA-Z]/,
        peg$c145 = { type: "class", value: "[a-zA-Z]", description: "[a-zA-Z]" },
        peg$c146 = /^[0-9]/,
        peg$c147 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c148 = function(s, w) {
            var val;
            val = "!" + p.join(s) + p.join(w);
            return val.trim();
          },
        peg$c149 = { type: "any", description: "any character" },
        peg$c150 = function() {
            throw new SyntaxError('Invalid Strength or Weight', null, null, null, line(), column());
          },
        peg$c151 = /^[a-zA-Z0-9#.\-_$:""&]/,
        peg$c152 = { type: "class", value: "[a-zA-Z0-9#.\\-_$:\"\"&]", description: "[a-zA-Z0-9#.\\-_$:\"\"&]" },
        peg$c153 = " ",
        peg$c154 = { type: "literal", value: " ", description: "\" \"" },
        peg$c155 = function(val) {
            return [ "number",
              val
            ];
          },
        peg$c156 = function(digits) {
            return parseInt(digits.join(""), 10);
          },
        peg$c157 = ".",
        peg$c158 = { type: "literal", value: ".", description: "\".\"" },
        peg$c159 = function(digits) {
            return parseFloat(digits.join(""));
          },
        peg$c160 = /^[\-+]/,
        peg$c161 = { type: "class", value: "[\\-+]", description: "[\\-+]" },
        peg$c162 = { type: "other", description: "whitespace" },
        peg$c163 = /^[\t\x0B\f \xA0\uFEFF]/,
        peg$c164 = { type: "class", value: "[\\t\\x0B\\f \\xA0\\uFEFF]", description: "[\\t\\x0B\\f \\xA0\\uFEFF]" },
        peg$c165 = /^[\n\r\u2028\u2029]/,
        peg$c166 = { type: "class", value: "[\\n\\r\\u2028\\u2029]", description: "[\\n\\r\\u2028\\u2029]" },
        peg$c167 = { type: "other", description: "end of line" },
        peg$c168 = "\n",
        peg$c169 = { type: "literal", value: "\n", description: "\"\\n\"" },
        peg$c170 = "\r\n",
        peg$c171 = { type: "literal", value: "\r\n", description: "\"\\r\\n\"" },
        peg$c172 = "\r",
        peg$c173 = { type: "literal", value: "\r", description: "\"\\r\"" },
        peg$c174 = "\u2028",
        peg$c175 = { type: "literal", value: "\u2028", description: "\"\\u2028\"" },
        peg$c176 = "\u2029",
        peg$c177 = { type: "literal", value: "\u2029", description: "\"\\u2029\"" },
        peg$c178 = ";",
        peg$c179 = { type: "literal", value: ";", description: "\";\"" },
        peg$c180 = void 0,
        peg$c181 = { type: "other", description: "comment" },
        peg$c182 = "/*",
        peg$c183 = { type: "literal", value: "/*", description: "\"/*\"" },
        peg$c184 = "*/",
        peg$c185 = { type: "literal", value: "*/", description: "\"*/\"" },
        peg$c186 = "//",
        peg$c187 = { type: "literal", value: "//", description: "\"//\"" },

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$parsestart() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parse__();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseStatement();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseStatement();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse__();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c2();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsedebug() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parse__();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseStatement();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseStatement();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse__();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c3(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseStatement() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseVFLStatement();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseEOS();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse__();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c4(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseVFLStatement() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      s0 = peg$currPos;
      s1 = peg$parseDimension();
      if (s1 !== peg$FAILED) {
        s2 = peg$parse__();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseView();
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$currPos;
            s6 = peg$parse__();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseConnection();
              if (s7 === peg$FAILED) {
                s7 = peg$c5;
              }
              if (s7 !== peg$FAILED) {
                s8 = peg$parse__();
                if (s8 !== peg$FAILED) {
                  s9 = peg$parseView();
                  if (s9 !== peg$FAILED) {
                    s6 = [s6, s7, s8, s9];
                    s5 = s6;
                  } else {
                    peg$currPos = s5;
                    s5 = peg$c0;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$c0;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$c0;
            }
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$currPos;
              s6 = peg$parse__();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseConnection();
                if (s7 === peg$FAILED) {
                  s7 = peg$c5;
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse__();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parseView();
                    if (s9 !== peg$FAILED) {
                      s6 = [s6, s7, s8, s9];
                      s5 = s6;
                    } else {
                      peg$currPos = s5;
                      s5 = peg$c0;
                    }
                  } else {
                    peg$currPos = s5;
                    s5 = peg$c0;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$c0;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse__();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseOptions();
                if (s6 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c6(s1, s3, s4, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseDimension() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 11) === peg$c7) {
        s1 = peg$c7;
        peg$currPos += 11;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c8); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 16) === peg$c9) {
          s1 = peg$c9;
          peg$currPos += 16;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c10); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 7) === peg$c11) {
            s1 = peg$c11;
            peg$currPos += 7;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c12); }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c13) {
              s1 = peg$c13;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c14); }
            }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c15();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 9) === peg$c16) {
          s1 = peg$c16;
          peg$currPos += 9;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c17); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 14) === peg$c18) {
            s1 = peg$c18;
            peg$currPos += 14;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c19); }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c20) {
              s1 = peg$c20;
              peg$currPos += 7;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c21); }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c22) {
                s1 = peg$c22;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c23); }
              }
            }
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c24();
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parseOptions() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseOption();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseOption();
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c25(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseOption() {
      var s0, s1, s2, s3, s4, s5;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parse__();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseChain();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c27(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parse__();
        if (s1 !== peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c28) {
            s2 = peg$c28;
            peg$currPos += 2;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c29); }
          }
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 40) {
              s3 = peg$c30;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c31); }
            }
            if (s3 !== peg$FAILED) {
              s4 = [];
              if (peg$c32.test(input.charAt(peg$currPos))) {
                s5 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c33); }
              }
              if (s5 !== peg$FAILED) {
                while (s5 !== peg$FAILED) {
                  s4.push(s5);
                  if (peg$c32.test(input.charAt(peg$currPos))) {
                    s5 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c33); }
                  }
                }
              } else {
                s4 = peg$c0;
              }
              if (s4 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 41) {
                  s5 = peg$c34;
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c35); }
                }
                if (s5 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c36(s4);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parse__();
          if (s1 !== peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c28) {
              s2 = peg$c28;
              peg$currPos += 2;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c29); }
            }
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 40) {
                s3 = peg$c30;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c31); }
              }
              if (s3 !== peg$FAILED) {
                s4 = [];
                if (peg$c37.test(input.charAt(peg$currPos))) {
                  s5 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c38); }
                }
                if (s5 !== peg$FAILED) {
                  while (s5 !== peg$FAILED) {
                    s4.push(s5);
                    if (peg$c37.test(input.charAt(peg$currPos))) {
                      s5 = input.charAt(peg$currPos);
                      peg$currPos++;
                    } else {
                      s5 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c38); }
                    }
                  }
                } else {
                  s4 = peg$c0;
                }
                if (s4 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s5 = peg$c34;
                    peg$currPos++;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c35); }
                  }
                  if (s5 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c39(s4);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parse__();
            if (s1 !== peg$FAILED) {
              s2 = [];
              s3 = peg$parseNameChars();
              if (s3 !== peg$FAILED) {
                while (s3 !== peg$FAILED) {
                  s2.push(s3);
                  s3 = peg$parseNameChars();
                }
              } else {
                s2 = peg$c0;
              }
              if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 40) {
                  s3 = peg$c30;
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c31); }
                }
                if (s3 !== peg$FAILED) {
                  s4 = [];
                  s5 = peg$parseOpionValueChars();
                  if (s5 !== peg$FAILED) {
                    while (s5 !== peg$FAILED) {
                      s4.push(s5);
                      s5 = peg$parseOpionValueChars();
                    }
                  } else {
                    s4 = peg$c0;
                  }
                  if (s4 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s5 = peg$c34;
                      peg$currPos++;
                    } else {
                      s5 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c35); }
                    }
                    if (s5 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c40(s2, s4);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = peg$parse__();
              if (s1 !== peg$FAILED) {
                s2 = peg$parseStrengthAndWeight();
                if (s2 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c41(s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            }
          }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c26); }
      }

      return s0;
    }

    function peg$parseOpionValueChars() {
      var s0, s1;

      if (peg$c42.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c43); }
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (peg$c44.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c45); }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c46();
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parseChain() {
      var s0, s1, s2, s3;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c48) {
        s1 = peg$c48;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c49); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseNameChars();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parseNameChars();
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseChainPredicate();
          if (s3 === peg$FAILED) {
            s3 = peg$c5;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c50(s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c47); }
      }

      return s0;
    }

    function peg$parseChainPredicate() {
      var s0, s1, s2, s3;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c30;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c31); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseChainPredicateItems();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parseChainPredicateItems();
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 41) {
            s3 = peg$c34;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c35); }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c52(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c53) {
          s1 = peg$c53;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c54); }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c55();
        }
        s0 = s1;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c51); }
      }

      return s0;
    }

    function peg$parseChainPredicateItems() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseChainPredicateItem();
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 === peg$FAILED) {
          s2 = peg$c5;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c56;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c57); }
          }
          if (s3 === peg$FAILED) {
            s3 = peg$c5;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c58(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseChainPredicateItem() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parsePredEq();
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseChainPredVal();
          if (s3 === peg$FAILED) {
            s3 = peg$c5;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 === peg$FAILED) {
              s4 = peg$c5;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsePredEq();
              if (s5 === peg$FAILED) {
                s5 = peg$c5;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parse_();
                if (s6 === peg$FAILED) {
                  s6 = peg$c5;
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseStrengthAndWeight();
                  if (s7 === peg$FAILED) {
                    s7 = peg$c5;
                  }
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c59(s1, s3, s5, s7);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsePredEq();
        if (s1 === peg$FAILED) {
          s1 = peg$c5;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 === peg$FAILED) {
            s2 = peg$c5;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parseChainPredVal();
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 === peg$FAILED) {
                s4 = peg$c5;
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parsePredEq();
                if (s5 === peg$FAILED) {
                  s5 = peg$c5;
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 === peg$FAILED) {
                    s6 = peg$c5;
                  }
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parseStrengthAndWeight();
                    if (s7 === peg$FAILED) {
                      s7 = peg$c5;
                    }
                    if (s7 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c59(s1, s3, s5, s7);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parsePredEq();
          if (s1 === peg$FAILED) {
            s1 = peg$c5;
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 === peg$FAILED) {
              s2 = peg$c5;
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parseChainPredVal();
              if (s3 === peg$FAILED) {
                s3 = peg$c5;
              }
              if (s3 !== peg$FAILED) {
                s4 = peg$parse_();
                if (s4 === peg$FAILED) {
                  s4 = peg$c5;
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$parsePredEq();
                  if (s5 === peg$FAILED) {
                    s5 = peg$c5;
                  }
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parse_();
                    if (s6 === peg$FAILED) {
                      s6 = peg$c5;
                    }
                    if (s6 !== peg$FAILED) {
                      s7 = peg$parseStrengthAndWeight();
                      if (s7 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c59(s1, s3, s5, s7);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        }
      }

      return s0;
    }

    function peg$parseChainPredVal() {
      var s0, s1;

      s0 = [];
      if (peg$c60.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c61); }
      }
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          if (peg$c60.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c61); }
          }
        }
      } else {
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseView() {
      var s0, s1;

      peg$silentFails++;
      s0 = peg$parseSplat();
      if (s0 === peg$FAILED) {
        s0 = peg$parseViewSelector();
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parsePoint();
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c63(s1);
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 124) {
              s1 = peg$c64;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c65); }
            }
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c66();
            }
            s0 = s1;
          }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c62); }
      }

      return s0;
    }

    function peg$parseViewSelector() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c30;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c31); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseNameChars();
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseNameChars();
            }
          } else {
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsePredicate();
              if (s5 === peg$FAILED) {
                s5 = peg$c5;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parse_();
                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s7 = peg$c34;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c35); }
                  }
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c67(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parseComplexViewSelector();
      }

      return s0;
    }

    function peg$parseComplexViewSelector() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c30;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c31); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = [];
          if (peg$c68.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c69); }
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            if (peg$c68.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c69); }
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsePredicate();
              if (s5 === peg$FAILED) {
                s5 = peg$c5;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parse_();
                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s7 = peg$c34;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c35); }
                  }
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c70(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseSplat() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parseViewSelector();
      if (s1 !== peg$FAILED) {
        s2 = peg$parse__();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseConnection();
          if (s3 === peg$FAILED) {
            s3 = peg$c5;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse__();
            if (s4 !== peg$FAILED) {
              if (input.substr(peg$currPos, 3) === peg$c71) {
                s5 = peg$c71;
                peg$currPos += 3;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c72); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c73(s1, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsePoint() {
      var s0, s1, s2, s3, s4, s5;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 60) {
        s1 = peg$c75;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c76); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 === peg$FAILED) {
          s2 = peg$c5;
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          if (peg$c77.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c78); }
          }
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              if (peg$c77.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c78); }
              }
            }
          } else {
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 === peg$FAILED) {
              s4 = peg$c5;
            }
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 62) {
                s5 = peg$c79;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c80); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c81(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c74); }
      }

      return s0;
    }

    function peg$parsePredicate() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c30;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c31); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parsePredEq();
        if (s4 !== peg$FAILED) {
          s5 = peg$parsePredExpression();
          if (s5 !== peg$FAILED) {
            s6 = peg$parseStrengthAndWeight();
            if (s6 === peg$FAILED) {
              s6 = peg$c5;
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parse_();
              if (s7 === peg$FAILED) {
                s7 = peg$c5;
              }
              if (s7 !== peg$FAILED) {
                s8 = peg$parsePredSeperator();
                if (s8 !== peg$FAILED) {
                  s9 = peg$parse_();
                  if (s9 === peg$FAILED) {
                    s9 = peg$c5;
                  }
                  if (s9 !== peg$FAILED) {
                    s4 = [s4, s5, s6, s7, s8, s9];
                    s3 = s4;
                  } else {
                    peg$currPos = s3;
                    s3 = peg$c0;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parsePredEq();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsePredExpression();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseStrengthAndWeight();
                if (s6 === peg$FAILED) {
                  s6 = peg$c5;
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 === peg$FAILED) {
                    s7 = peg$c5;
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parsePredSeperator();
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parse_();
                      if (s9 === peg$FAILED) {
                        s9 = peg$c5;
                      }
                      if (s9 !== peg$FAILED) {
                        s4 = [s4, s5, s6, s7, s8, s9];
                        s3 = s4;
                      } else {
                        peg$currPos = s3;
                        s3 = peg$c0;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$c0;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$c0;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 41) {
            s3 = peg$c34;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c35); }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c83(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c82); }
      }

      return s0;
    }

    function peg$parsePredExpression() {
      var s0, s1;

      peg$silentFails++;
      s0 = [];
      s1 = peg$parsePredOp();
      if (s1 === peg$FAILED) {
        s1 = peg$parsePredLiteral();
        if (s1 === peg$FAILED) {
          s1 = peg$parsePredVariable();
          if (s1 === peg$FAILED) {
            s1 = peg$parsePredViewVariable();
            if (s1 === peg$FAILED) {
              s1 = peg$parsePredView();
            }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          s1 = peg$parsePredOp();
          if (s1 === peg$FAILED) {
            s1 = peg$parsePredLiteral();
            if (s1 === peg$FAILED) {
              s1 = peg$parsePredVariable();
              if (s1 === peg$FAILED) {
                s1 = peg$parsePredViewVariable();
                if (s1 === peg$FAILED) {
                  s1 = peg$parsePredView();
                }
              }
            }
          }
        }
      } else {
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c84); }
      }

      return s0;
    }

    function peg$parsePredEq() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 === peg$FAILED) {
        s1 = peg$c5;
      }
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c85) {
          s2 = peg$c85;
          peg$currPos += 2;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c86); }
        }
        if (s2 === peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c87) {
            s2 = peg$c87;
            peg$currPos += 2;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c88); }
          }
          if (s2 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 60) {
              s2 = peg$c75;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c76); }
            }
            if (s2 === peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c89) {
                s2 = peg$c89;
                peg$currPos += 2;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c90); }
              }
              if (s2 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 62) {
                  s2 = peg$c79;
                  peg$currPos++;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c80); }
                }
                if (s2 === peg$FAILED) {
                  s2 = peg$currPos;
                  if (input.substr(peg$currPos, 2) === peg$c91) {
                    s3 = peg$c91;
                    peg$currPos += 2;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c92); }
                  }
                  if (s3 !== peg$FAILED) {
                    peg$reportedPos = s2;
                    s3 = peg$c93();
                  }
                  s2 = s3;
                  if (s2 === peg$FAILED) {
                    s2 = peg$currPos;
                    if (input.substr(peg$currPos, 2) === peg$c94) {
                      s3 = peg$c94;
                      peg$currPos += 2;
                    } else {
                      s3 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c95); }
                    }
                    if (s3 !== peg$FAILED) {
                      peg$reportedPos = s2;
                      s3 = peg$c96();
                    }
                    s2 = s3;
                  }
                }
              }
            }
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 === peg$FAILED) {
            s3 = peg$c5;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c97(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsePredOp() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (peg$c98.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c99); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 === peg$FAILED) {
          s2 = peg$c5;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c100(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsePredView() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseNameChars();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseNameChars();
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 === peg$FAILED) {
          s2 = peg$c5;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c101(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsePredLiteral() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseNumber();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseNumber();
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 === peg$FAILED) {
          s2 = peg$c5;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c102(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsePredVariable() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 91) {
        s1 = peg$c103;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c104); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseNameChars();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parseNameChars();
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 93) {
            s3 = peg$c105;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c106); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 === peg$FAILED) {
              s4 = peg$c5;
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c107(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsePredViewVariable() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseNameChars();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseNameChars();
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 91) {
          s2 = peg$c103;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c104); }
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseNameChars();
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseNameChars();
            }
          } else {
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 93) {
              s4 = peg$c105;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c106); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 === peg$FAILED) {
                s5 = peg$c5;
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c108(s1, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsePredSeperator() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 44) {
        s1 = peg$c56;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c57); }
      }
      if (s1 === peg$FAILED) {
        s1 = peg$c5;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c109();
      }
      s0 = s1;

      return s0;
    }

    function peg$parseConnection() {
      var s0, s1, s2, s3, s4, s5;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 45) {
        s1 = peg$c111;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c112); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseExplicitGap();
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 45) {
                s5 = peg$c111;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c112); }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c113(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 45) {
          s1 = peg$c111;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c112); }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c114();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 126) {
            s1 = peg$c115;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c116); }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
              s3 = peg$parseExplicitGap();
              if (s3 !== peg$FAILED) {
                s4 = peg$parse_();
                if (s4 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 126) {
                    s5 = peg$c115;
                    peg$currPos++;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c116); }
                  }
                  if (s5 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c117(s3);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 126) {
              s1 = peg$c115;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c116); }
            }
            if (s1 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 45) {
                s2 = peg$c111;
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c112); }
              }
              if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 126) {
                  s3 = peg$c115;
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c116); }
                }
                if (s3 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c118();
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 126) {
                s1 = peg$c115;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c116); }
              }
              if (s1 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c119();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$c120;
                if (s1 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c121();
                }
                s0 = s1;
              }
            }
          }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c110); }
      }

      return s0;
    }

    function peg$parseScope() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (input.charCodeAt(peg$currPos) === 38) {
        s2 = peg$c122;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c123); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (input.charCodeAt(peg$currPos) === 38) {
            s2 = peg$c122;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c123); }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c124(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = [];
        if (input.charCodeAt(peg$currPos) === 94) {
          s2 = peg$c125;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c126); }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (input.charCodeAt(peg$currPos) === 94) {
              s2 = peg$c125;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c126); }
            }
          }
        } else {
          s1 = peg$c0;
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c127(s1);
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = [];
          if (input.charCodeAt(peg$currPos) === 36) {
            s2 = peg$c128;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c129); }
          }
          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              if (input.charCodeAt(peg$currPos) === 36) {
                s2 = peg$c128;
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c129); }
              }
            }
          } else {
            s1 = peg$c0;
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c130(s1);
          }
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parseExplicitGap() {
      var s0, s1, s2, s3, s4;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseScope();
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c132.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c133); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c132.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c133); }
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c134(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = [];
        if (peg$c132.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c133); }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c132.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c133); }
            }
          }
        } else {
          s1 = peg$c0;
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c135(s1);
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = [];
          if (peg$c136.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c137); }
          }
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c136.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c137); }
            }
          }
          if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 91) {
              s2 = peg$c103;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c104); }
            }
            if (s2 !== peg$FAILED) {
              s3 = [];
              if (peg$c138.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c139); }
              }
              if (s4 !== peg$FAILED) {
                while (s4 !== peg$FAILED) {
                  s3.push(s4);
                  if (peg$c138.test(input.charAt(peg$currPos))) {
                    s4 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c139); }
                  }
                }
              } else {
                s3 = peg$c0;
              }
              if (s3 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 93) {
                  s4 = peg$c105;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c106); }
                }
                if (s4 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c140(s1, s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c131); }
      }

      return s0;
    }

    function peg$parseStrengthAndWeight() {
      var s0, s1, s2, s3, s4;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 33) {
        s1 = peg$c142;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c143); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c144.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c145); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c144.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c145); }
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 === peg$FAILED) {
          s2 = peg$c5;
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          if (peg$c146.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c147); }
          }
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              if (peg$c146.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c147); }
              }
            }
          } else {
            s3 = peg$c0;
          }
          if (s3 === peg$FAILED) {
            s3 = peg$c5;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c148(s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 33) {
          s1 = peg$c142;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c143); }
        }
        if (s1 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c149); }
          }
          if (s2 === peg$FAILED) {
            s2 = peg$c5;
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c150();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c141); }
      }

      return s0;
    }

    function peg$parseNameChars() {
      var s0;

      if (peg$c151.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c152); }
      }

      return s0;
    }

    function peg$parseNameCharsWithSpace() {
      var s0;

      s0 = peg$parseNameChars();
      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 32) {
          s0 = peg$c153;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c154); }
        }
      }

      return s0;
    }

    function peg$parseLiteral() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseNumber();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c155(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseNumber() {
      var s0;

      s0 = peg$parseReal();
      if (s0 === peg$FAILED) {
        s0 = peg$parseInteger();
      }

      return s0;
    }

    function peg$parseInteger() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c146.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c147); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c146.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c147); }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c156(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseReal() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parseInteger();
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s3 = peg$c157;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c158); }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parseInteger();
          if (s4 !== peg$FAILED) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c159(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseSignedInteger() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (peg$c160.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c161); }
      }
      if (s1 === peg$FAILED) {
        s1 = peg$c5;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c146.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c147); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c146.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c147); }
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseSourceCharacter() {
      var s0;

      if (input.length > peg$currPos) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c149); }
      }

      return s0;
    }

    function peg$parseWhiteSpace() {
      var s0, s1;

      peg$silentFails++;
      if (peg$c163.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c164); }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c162); }
      }

      return s0;
    }

    function peg$parseLineTerminator() {
      var s0;

      if (peg$c165.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c166); }
      }

      return s0;
    }

    function peg$parseLineTerminatorSequence() {
      var s0, s1;

      peg$silentFails++;
      if (input.charCodeAt(peg$currPos) === 10) {
        s0 = peg$c168;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c169); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c170) {
          s0 = peg$c170;
          peg$currPos += 2;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c171); }
        }
        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 13) {
            s0 = peg$c172;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c173); }
          }
          if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 8232) {
              s0 = peg$c174;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c175); }
            }
            if (s0 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 8233) {
                s0 = peg$c176;
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c177); }
              }
            }
          }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c167); }
      }

      return s0;
    }

    function peg$parseEOS() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parse__();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 59) {
          s2 = peg$c178;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c179); }
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseLineTerminatorSequence();
          if (s2 !== peg$FAILED) {
            s1 = [s1, s2];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parse__();
          if (s1 !== peg$FAILED) {
            s2 = peg$parseEOF();
            if (s2 !== peg$FAILED) {
              s1 = [s1, s2];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        }
      }

      return s0;
    }

    function peg$parseEOF() {
      var s0, s1;

      s0 = peg$currPos;
      peg$silentFails++;
      if (input.length > peg$currPos) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c149); }
      }
      peg$silentFails--;
      if (s1 === peg$FAILED) {
        s0 = peg$c180;
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseComment() {
      var s0, s1;

      peg$silentFails++;
      s0 = peg$parseMultiLineComment();
      if (s0 === peg$FAILED) {
        s0 = peg$parseSingleLineComment();
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c181); }
      }

      return s0;
    }

    function peg$parseMultiLineComment() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c182) {
        s1 = peg$c182;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c183); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;
        if (input.substr(peg$currPos, 2) === peg$c184) {
          s5 = peg$c184;
          peg$currPos += 2;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c185); }
        }
        peg$silentFails--;
        if (s5 === peg$FAILED) {
          s4 = peg$c180;
        } else {
          peg$currPos = s4;
          s4 = peg$c0;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parseSourceCharacter();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$currPos;
          peg$silentFails++;
          if (input.substr(peg$currPos, 2) === peg$c184) {
            s5 = peg$c184;
            peg$currPos += 2;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c185); }
          }
          peg$silentFails--;
          if (s5 === peg$FAILED) {
            s4 = peg$c180;
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseSourceCharacter();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c184) {
            s3 = peg$c184;
            peg$currPos += 2;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c185); }
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseMultiLineCommentNoLineTerminator() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c182) {
        s1 = peg$c182;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c183); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;
        if (input.substr(peg$currPos, 2) === peg$c184) {
          s5 = peg$c184;
          peg$currPos += 2;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c185); }
        }
        if (s5 === peg$FAILED) {
          s5 = peg$parseLineTerminator();
        }
        peg$silentFails--;
        if (s5 === peg$FAILED) {
          s4 = peg$c180;
        } else {
          peg$currPos = s4;
          s4 = peg$c0;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parseSourceCharacter();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$currPos;
          peg$silentFails++;
          if (input.substr(peg$currPos, 2) === peg$c184) {
            s5 = peg$c184;
            peg$currPos += 2;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c185); }
          }
          if (s5 === peg$FAILED) {
            s5 = peg$parseLineTerminator();
          }
          peg$silentFails--;
          if (s5 === peg$FAILED) {
            s4 = peg$c180;
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseSourceCharacter();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c184) {
            s3 = peg$c184;
            peg$currPos += 2;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c185); }
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseSingleLineComment() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c186) {
        s1 = peg$c186;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c187); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;
        s5 = peg$parseLineTerminator();
        peg$silentFails--;
        if (s5 === peg$FAILED) {
          s4 = peg$c180;
        } else {
          peg$currPos = s4;
          s4 = peg$c0;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parseSourceCharacter();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$currPos;
          peg$silentFails++;
          s5 = peg$parseLineTerminator();
          peg$silentFails--;
          if (s5 === peg$FAILED) {
            s4 = peg$c180;
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseSourceCharacter();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseLineTerminator();
          if (s3 === peg$FAILED) {
            s3 = peg$parseEOF();
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parse_() {
      var s0, s1;

      s0 = [];
      s1 = peg$parseWhiteSpace();
      if (s1 === peg$FAILED) {
        s1 = peg$parseMultiLineCommentNoLineTerminator();
        if (s1 === peg$FAILED) {
          s1 = peg$parseSingleLineComment();
        }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = peg$parseWhiteSpace();
        if (s1 === peg$FAILED) {
          s1 = peg$parseMultiLineCommentNoLineTerminator();
          if (s1 === peg$FAILED) {
            s1 = peg$parseSingleLineComment();
          }
        }
      }

      return s0;
    }

    function peg$parse__() {
      var s0, s1;

      s0 = [];
      s1 = peg$parseWhiteSpace();
      if (s1 === peg$FAILED) {
        s1 = peg$parseLineTerminatorSequence();
        if (s1 === peg$FAILED) {
          s1 = peg$parseComment();
        }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = peg$parseWhiteSpace();
        if (s1 === peg$FAILED) {
          s1 = peg$parseLineTerminatorSequence();
          if (s1 === peg$FAILED) {
            s1 = peg$parseComment();
          }
        }
      }

      return s0;
    }


      var p, parser, cs, leftVarNames, superLeftVarNames, rightVarNames, superRightVarNames, standardGapNames, getSuperViewName, getGapString, sizeVarNames;

      p = parser = this;

      p.trickleDownOptions = ["name"];
      sizeVarNames = p.sizeVarNames = ["width", "height"];
      leftVarNames = p.leftVarNames = ["right", "bottom"];
      superLeftVarNames = p.superLeftVarNames = ["left", "top"];
      rightVarNames = p.rightVarNames = ["left", "top"];
      superRightVarNames = p.superRightVarNames = ["right", "bottom"];

      cs = p.cs = [];

      p.addC = function (c) {
        cs.push(c);
      };


      p.selectors = [];
      p.addSelector = function (sel) {
        if (p.selectors.indexOf(sel) === -1) {
          p.selectors.push(sel);
        }
      }

      p.addSplatIfNeeded = function (v, d, o) { // viewObj, dimension, options
        var statement, op, gap;
        if (v.connection) {
          op = v.connection.op;
          gap = v.connection.gap;
        }
        else {
          op = "==";
          gap = 0;
        }
        if (v.isSplat) {
          statement = v.view + " { " +
            "&[" + leftVarNames[d] + "] ";
          statement += p.getConnectionString(v.connection, d, o, false) + " ";
          statement += "&:next[" + rightVarNames[d] + "];" +
            " }";

          p.addC(statement);
        }
      }
      p.addPreds = function (view,preds,d) {
        var pred, ccss, eq, exps, exp;
        if (preds) {
          for (var i = 0; i < preds.length; i++) {
            pred = preds[i];
            eq = pred[0];
            ccss = view + "[" + sizeVarNames[d] + "] " + eq + " ";
            exps = pred[1];
            for (var j = 0; j < exps.length; j++) {
              exp = exps[j];
              if (exp[0] === "view") {
                exp = exp[1] + "[" + sizeVarNames[d] + "]";
              }
              ccss += exp + " ";
            }
            if (pred[2]) {
              ccss += pred[2];
            } // strength & weight
            cs.push(ccss.trim());
          }
        }
      };

      p.defaultChainObject = {
        headEq: "==",
        value: "",
        tailEq: "",
        s: ""
      };

      p.chainTailEqMap = {
        "<=": ">=",
        ">=": "<=",
        "==": "==",
        "<" : ">",
        ">" : "<"
      };

      p.addChains = function (views,o) {
        var chains, chain, prop, preds, connector, ccss, view, pred;
        chains = o.chains;
        if (chains) {
          for (var i = 0; i < chains.length; i++) {
            chain = chains[i];
            prop = chain[0];
            preds = chain[1];
            if (preds === "" || !preds) {
              // load default chain predicate
              preds = [p.defaultChainObject];
            }
            for (var j = 0; j < preds.length; j++) {
              pred = preds[j];
              ccss = "";
              for (var k = 0; k < views.length - 1; k++) {
                view = views[k];
                if (pred.headEq === "") {
                  pred.headEq = p.defaultChainObject.headEq;
                }
                ccss += " " + view + "[" + prop + "] " + pred.headEq;
                if (pred.value !== "") {
                  ccss += " " + pred.value;
                  if (views.length > 1) {
                    if (pred.tailEq === "") {
                      pred.tailEq = p.chainTailEqMap[pred.headEq];
                    }
                    ccss += " " + pred.tailEq;
                  }
                  else {
                    ccss += " " + pred.s;
                    cs.push(ccss.trim());
                  }
                }
              }
              if (views.length > 1) {
                 ccss += " " + views[views.length-1] + "[" + prop + "]";
                 ccss += p.getTrailingOptions(o);
                 ccss += " " + pred.s;
                 cs.push(ccss.trim());
              }
            }
          }
        }
      };

      getSuperViewName = function (o) {
        if (o.in === undefined) {
          return "::this";
        }
        return o.in;
      };

      p.getLeftVar = function (view, dimension, o, viewObj) {
        var varName;
        if (viewObj.isPoint) {
          return viewObj.pos;
        }
        else if (view === "|") {
          view = getSuperViewName(o);
          varName = superLeftVarNames[dimension];
        }
        else {
          if (viewObj.isSplat) {
            view += ":last";
            if (view[0] === "(") {
              view = "(" + view + ")";
            }
          }
          varName = leftVarNames[dimension];
        }
        return view + "[" + varName + "]";
      };

      p.getRightVar = function (view, dimension, o, viewObj) {
        var varName;
        if (viewObj.isPoint) {
          return viewObj.pos;
        }
        else if (view === "|") {
          view = getSuperViewName(o);
          varName = superRightVarNames[dimension];
        }
        else {
          if (viewObj.isSplat) {
            view += ":first";
            if (view[0] === "(") {
              view = "(" + view + ")";
            }
          }
          varName = rightVarNames[dimension];
        }
        return view + "[" + varName + "]";
      };

      standardGapNames = ["[hgap]", "[vgap]"];

      getGapString = function (g,d,o,withContainer) {
        if (g === undefined) {return "";}
        if (g === "__STANDARD__") {
          // use gap if given with `gap()` or `outer-gap`
          if (withContainer && o['outer-gap']) {
            g = o['outer-gap'];
          } else if (o.gap) {
            g = o.gap;
          // else use standard var
          } else {
            g = standardGapNames[d];
          }
        }
        return "+ " + g;
      };

      p.getConnectionString = function (c, d, o, withContainer) {

        return (getGapString(c.gap,d,o,withContainer) + " " + c.op).trim();
      };

      p.getTrailingOptions = function (o) {
        var string = "";
        if (o) {
          p.trickleDownOptions.forEach(function(key){
            if (o[key] != null) {
              string = string + " " + key + "(" + o[key] + ")";
            }
          });
        }
        return string;
      };

      p.getSW = function (o) {
        if (o.sw) {
          return " " + o.sw.trim();
        }
        return "";
      };


      p.getResults = function () {
        return { statements:this.cs, selectors:p.selectors};
      };

      p.flatten = function (array, isShallow) {

        if (typeof array === "string") {return array;}

        var index = -1,
          length = array ? array.length : 0,
          result = [];

        while (++index < length) {
          var value = array[index];

          if (value instanceof Array) {
            Array.prototype.push.apply(result, isShallow ? value : p.flatten(value));
          }
          else {
            result.push(value);
          }
        }
        return result;
      }

      p.trim = function (x) {
        if (typeof x === "string") {return x.trim();}
        if (x instanceof Array) {return x.join("").trim();}
        return ""
      };

      p.join = function (a) {
        if (!a) {return "";}
        if (a.join){return a.join("");}
        return a;
      };

      p.stringify = function (array) {
        if (!array) {return "";}
        return p.trim(p.join(p.flatten(array)));
      };



    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
})();
},{}],14:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"dup":9}],15:[function(require,module,exports){
var Command,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Command = (function() {
  var _i, _results;

  Command.prototype.type = 'Command';

  function Command(operation, parent, index, context) {
    var command, match;
    if (!(command = operation.command)) {
      match = Command.match(this, operation, parent, index, context);
      command = Command.assign(this, operation, match, context);
      if (!parent) {
        command = Command.descend(command, this, operation);
      }
    }
    return command;
  }

  Command.prototype.solve = function(engine, operation, continuation, scope, ascender, ascending) {
    var args, domain, result;
    domain = operation.domain || engine;
    switch (typeof (result = this.retrieve(domain, operation, continuation, scope, ascender, ascending))) {
      case 'undefined':
        break;
      case 'function':
        if ((continuation = result.call(this, engine, operation, continuation, scope)) == null) {
          return;
        }
        result = void 0;
        break;
      default:
        if (continuation.indexOf(this.PAIR) > -1 || this.reference) {
          return result;
        }
    }
    if (result === void 0) {
      if (this.head) {
        return this.jump(domain, operation, continuation, scope, ascender, ascending);
      }
      args = this.descend(domain, operation, continuation, scope, ascender, ascending);
      if (args === false) {
        return;
      }
      this.log(args, engine, operation, continuation, scope);
      result = this.before(args, domain, operation, continuation, scope, ascender, ascending);
      if (result == null) {
        result = this.execute.apply(this, args);
      }
      if (result = this.after(args, result, domain, operation, continuation, scope, ascender, ascending)) {
        continuation = this["continue"](domain, operation, continuation, scope, ascender, ascending);
      }
      this.unlog(engine, result);
    }
    if (result != null) {
      return this.ascend(engine, operation, continuation, scope, result, ascender, ascending);
    }
  };

  Command.prototype.descend = function(engine, operation, continuation, scope, ascender, ascending) {
    var args, argument, command, contd, extras, i, index, length, shift, _i, _ref;
    length = operation.length - 1 + this.padding;
    args = Array(length);
    index = 0;
    shift = this.contextualize(args, engine, operation, continuation, scope, ascender, ascending);
    while (++index < operation.length) {
      if (ascender === index) {
        argument = ascending;
      } else {
        argument = operation[index];
        if (argument instanceof Array) {
          command = argument.command || engine.Command(argument);
          argument.parent || (argument.parent = operation);
          if (continuation && ascender) {
            contd = this.connect(engine, operation, continuation, scope, args, ascender);
          }
          argument = command.solve(operation.domain || engine, argument, contd || continuation, scope, void 0, ascending);
          if (argument === void 0) {
            return false;
          }
        }
      }
      args[this.permutation[index - 1] + shift] = argument;
    }
    extras = (_ref = this.extras) != null ? _ref : this.execute.length - length;
    if (extras > 0) {
      for (i = _i = 0; _i < extras; i = _i += 1) {
        args.push(arguments[i]);
      }
    }
    return args;
  };

  Command.prototype.ascend = function(engine, operation, continuation, scope, result, ascender, ascending) {
    var domain, parent, top, wrapper, yielded;
    if ((parent = operation.parent)) {
      if (domain = operation.domain) {
        if ((wrapper = parent.domain) && wrapper !== domain && wrapper !== engine) {
          this.transfer(operation.domain, parent, continuation, scope, ascender, ascending, parent.command);
          return;
        }
      }
      if (top = parent.command) {
        if (yielded = typeof top["yield"] === "function" ? top["yield"](result, engine, operation, continuation, scope, ascender) : void 0) {
          if (yielded === true) {
            return;
          }
          if (yielded.command) {
            return yielded.command.solve(yielded.domain || engine, yielded, continuation, scope, -1, result);
          }
          return yielded;
        }
      }
      if (ascender > -1) {
        return top.solve(parent.domain || engine, parent, continuation, scope, parent.indexOf(operation), result);
      }
    }
    return result;
  };

  Command.prototype.contextualize = function(args, engine, operation, continuation, scope, ascender, ascending) {
    var command, context, node, parent, _ref;
    if (ascender === -1 && (ascending != null)) {
      node = ascending;
    } else if (context = operation.context || ((parent = operation.parent) && ((_ref = parent.command) != null ? _ref.sequence : void 0) && parent.context)) {
      if ((command = context.command).key != null) {
        if (context[0] === '&') {
          node = scope;
        } else {
          node = this.getByPath(engine, this.delimit(continuation));
        }
      } else {
        node = command.solve(context.domain || engine, context, continuation, scope, -2);
      }
    }
    if (node) {
      args.length++;
      args[0] = this.precontextualize(engine, scope, node);
    }
    return operation.context && 1 || 0;
  };

  Command.prototype.precontextualize = function(engine, scope, element) {
    return element || scope;
  };

  Command.match = function(engine, operation, parent, index, context) {
    var Default, argument, command, i, implicit, j, kind, match, signature, type, typed;
    i = -1;
    j = operation.length;
    while (++i < j) {
      argument = operation[i];
      typed = typeof argument;
      if (typed === 'object') {
        if (argument.push) {
          if (argument.parent == null) {
            argument.parent = operation;
          }
          command = (argument.domain || engine).Command(argument, operation, i, implicit);
          type = command.type;
          if (i) {
            if (implicit) {
              implicit = argument;
            }
          } else {
            if ((Default = command.Sequence)) {
              implicit = argument;
            } else {
              Default = Command.Sequence;
            }
          }
        } else if (i) {
          type = this.typeOfObject(argument);
        } else {
          kind = this.typeOfObject(argument);
          if (!(signature = engine.signatures[kind.toLowerCase()])) {
            return this.uncallable(kind.toLowerCase(), operation, engine);
          }
          if (!(type = context && context.command.type)) {
            continue;
          }
        }
      } else if (i) {
        type = this.types[typed];
      } else {
        if (typed === 'number') {
          if (!(signature = engine.signatures.number)) {
            return this.uncallable('number', operation, engine);
          }
        } else {
          if (!(signature = engine.signatures[argument])) {
            if (!(Default = engine.Default)) {
              return this.uncallable(argument, operation, engine);
            }
          }
        }
        if (!(type = context != null ? context.command.type : void 0)) {
          continue;
        }
      }
      if (signature) {
        if (match = signature[type] || signature.Any) {
          signature = match;
        } else if (!(Default || (Default = signature.Default || engine.Default))) {
          return this.unexpected(type, operation, signature, engine);
        }
      }
      if (Default != null ? Default.prototype.proxy : void 0) {
        implicit = context;
      }
    }
    if (command = Default || (signature != null ? signature.resolved : void 0) || engine.Default) {
      return command;
    } else {
      return this.unexpected('end of arguments', operation, signature, engine);
    }
  };

  Command.uncallable = function(type, operation, engine) {
    throw new Error("[" + engine.displayName + "] Undefined command: `" + type + "` called as `" + this.prototype.toExpression(operation) + '`');
  };

  Command.unexpected = function(type, operation, signature, engine) {
    var expected, property;
    expected = [];
    for (property in signature) {
      if (property !== 'resolved') {
        expected.push(property);
      }
    }
    if (expected.length) {
      throw new Error("[" + engine.displayName + "] Unexpected argument: `" + type + "` in `" + this.prototype.toExpression(operation) + '` expected ' + expected.join(', '));
    } else {
      throw new Error("[" + engine.displayName + "] Too many arguments: got `" + type + "` in `" + this.prototype.toExpression(operation) + "`");
    }
  };

  Command.assign = function(engine, operation, match, context) {
    var command;
    if (!(command = match.instance)) {
      command = new match(operation, engine);
    }
    if (context) {
      operation.context = context;
    }
    operation.command = command;
    if (command.key != null) {
      command.push(operation, context);
    } else {
      (command.definition || match).instance = command;
    }
    return command;
  };

  Command.descend = function(command, engine, operation) {
    var advices, argument, cmd, proto, result, type, _i, _j, _len, _len1;
    if (advices = command.advices) {
      for (_i = 0, _len = advices.length; _i < _len; _i++) {
        type = advices[_i];
        result = (proto = type.prototype).condition ? proto.condition(engine, operation, command) : type(engine, operation, command);
        if (!result) {
          continue;
        }
        if (result !== true) {
          type = result;
        }
        if (!(command = type.instance)) {
          command = new type(operation);
        }
        operation.command = command;
        if (command.key == null) {
          type.instance = command;
        }
        break;
      }
    }
    for (_j = 0, _len1 = operation.length; _j < _len1; _j++) {
      argument = operation[_j];
      if (cmd = argument.command) {
        Command.descend(cmd, engine, argument);
      }
    }
    return command;
  };

  Command.prototype["continue"] = function(engine, operation, continuation) {
    return continuation;
  };

  Command.prototype.before = function() {};

  Command.prototype.after = function(args, result) {
    return result;
  };

  Command.prototype.log = function(args, engine, operation, continuation, scope, name) {
    return engine.console.push(name || operation[0], args, continuation || "");
  };

  Command.prototype.unlog = function(engine, result) {
    return engine.console.pop(result);
  };

  Command.prototype.patch = function(engine, operation, continuation, scope, replacement) {
    var domain, op, _ref;
    op = this.sanitize(engine, operation, void 0, replacement);
    if (!((_ref = op.parent.command) != null ? _ref.boundaries : void 0)) {
      op = op.parent;
    }
    domain = replacement || engine;
    if (op.domain !== domain && op.command) {
      return op.command.transfer(domain, op, continuation, scope, void 0, void 0, op.command, replacement);
    }
  };

  Command.prototype.transfer = function(engine, operation, continuation, scope, ascender, ascending, top, replacement) {
    var domain, meta, parent, path, value, _ref, _ref1, _ref2;
    if ((meta = this.getMeta(operation)) && !engine.finalized) {
      for (path in operation.variables) {
        if ((value = (replacement || engine).values[path]) != null) {
          (meta.values || (meta.values = {}))[path] = value;
        } else if ((_ref = meta.values) != null ? _ref[path] : void 0) {
          delete meta.values[path];
        }
      }
    }
    if (top) {
      parent = operation;
      while (((_ref1 = parent.parent) != null ? _ref1.domain : void 0) === parent.domain && !parent.parent.command.boundaries) {
        operation = parent;
        parent = parent.parent;
      }
      if (!(domain = parent.domain)) {
        if (domain = (_ref2 = parent.command.domains) != null ? _ref2[parent.indexOf(operation)] : void 0) {
          domain = engine[domain];
        }
      }
      return engine.updating.push([parent], domain);
    }
  };

  Command.prototype.getMeta = function(operation) {
    var parent;
    parent = operation;
    while (parent = parent.parent) {
      if (parent[0].key != null) {
        return parent[0];
      }
    }
  };

  Command.prototype.connect = function(engine, operation, continuation, scope, args, ascender) {
    if ((ascender != null) && continuation[continuation.length - 1] !== this.DESCEND) {
      return this.delimit(continuation, this.PAIR);
    }
  };

  Command.prototype.rewind = function(engine, operation, continuation, scope) {
    return this.getPrefixPath(engine, continuation);
  };

  Command.prototype.fork = function(engine, continuation, item) {
    return this.delimit(continuation + engine.identify(item), this.ASCEND);
  };

  Command.prototype.jump = function() {};

  Command.prototype.retrieve = function() {};

  Command.prototype.permutation = (function() {
    _results = [];
    for (_i = 0; _i < 640; _i++){ _results.push(_i); }
    return _results;
  }).apply(this);

  Command.prototype.padding = 0;

  Command.prototype.extras = void 0;

  Command.prototype.toExpression = function(operation) {
    var i, str, _j, _k, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
    switch (typeof operation) {
      case 'number':
        return operation;
      case 'string':
        return '"' + operation + '"';
    }
    if (typeof (str = operation[0]) === 'string') {
      if (str === 'get') {
        if (operation.length === 2) {
          return operation[1];
        } else {
          return operation[1].command.path + '[' + operation[2] + ']';
        }
      } else if (str.match(/^[a-zA-Z]/)) {
        str += '(';
        for (i = _j = 1, _ref = operation.length; _j < _ref; i = _j += 1) {
          if (i > 1) {
            str += ', ';
          }
          str += this.toExpression((_ref1 = operation[i]) != null ? _ref1 : '');
        }
        return str + ')';
      } else {
        return this.toExpression((_ref2 = operation[1]) != null ? _ref2 : '') + str + this.toExpression((_ref3 = operation[2]) != null ? _ref3 : '');
      }
    }
    str = '';
    for (i = _k = 0, _ref4 = operation.length; _k < _ref4; i = _k += 1) {
      if (i) {
        str += ', ';
      }
      str += this.toExpression((_ref5 = operation[i]) != null ? _ref5 : '');
    }
    return str;
  };

  Command.prototype.sanitize = function(engine, operation, ascend, replacement) {
    var argument, parent, _j, _len;
    if (ascend !== false) {
      for (_j = 0, _len = operation.length; _j < _len; _j++) {
        argument = operation[_j];
        if (ascend !== argument) {
          if (argument.push && (engine === true || (argument != null ? argument.domain : void 0) === engine)) {
            if (argument[0] === 'get' && engine !== true) {
              return ascend;
            }
            this.sanitize(engine, argument, false, replacement);
          }
        }
      }
    }
    operation.domain = operation.command = void 0;
    if (replacement) {
      operation.domain = replacement;
      replacement.Command(operation);
    }
    if (ascend !== false) {
      if ((parent = operation.parent) && parent.domain === engine && !parent.command.boundaries) {
        return this.sanitize(engine, parent, operation, replacement);
      }
    }
    return operation;
  };

  Command.prototype.ASCEND = String.fromCharCode(8593);

  Command.prototype.PAIR = String.fromCharCode(8594);

  Command.prototype.DESCEND = String.fromCharCode(8595);

  Command.prototype.DELIMITERS = [8593, 8594, 8595];

  Command.prototype.delimit = function(path, delimeter) {
    if (delimeter == null) {
      delimeter = '';
    }
    if (!path) {
      return path;
    }
    if (this.DELIMITERS.indexOf(path.charCodeAt(path.length - 1)) > -1) {
      return path.substring(0, path.length - 1) + delimeter;
    } else {
      return path + delimeter;
    }
  };

  Command.prototype.getRoot = function(operation) {
    while (operation.parent && operation.command.type !== 'Default') {
      operation = operation.parent;
    }
    return operation;
  };

  Command.extend = function(definition, methods) {
    var Constructor, Kommand, Prototype, property, value;
    if ((Constructor = this.prototype.constructor) === Command || Constructor.length === 0) {
      Constructor = void 0;
    }
    Kommand = function() {
      if (Constructor) {
        return Constructor.apply(this, arguments);
      }
    };
    Kommand.__super__ = this;
    Prototype = function() {};
    Prototype.prototype = this.prototype;
    Kommand.prototype = new Prototype;
    Kommand.prototype.definition = Kommand;
    Kommand.extend = Command.extend;
    Kommand.define = Command.define;
    for (property in definition) {
      value = definition[property];
      Kommand.prototype[property] = value;
    }
    if (methods) {
      Kommand.define(methods);
    }
    return Kommand;
  };

  Command.define = function(name, options) {
    var property, value;
    if (!options) {
      for (property in name) {
        value = name[property];
        Command.define.call(this, property, value);
      }
    } else {
      if (typeof options === 'function') {
        options = {
          execute: options
        };
      }
      this[name] = this.extend(options);
    }
  };

  Command.types = {
    'string': 'String',
    'number': 'Number',
    'object': 'Object',
    'boolean': 'Boolean'
  };

  Command.typeOfObject = function(object) {
    if (object.nodeType) {
      return 'Node';
    }
    if (object.push) {
      return 'List';
    }
    return 'Object';
  };

  Command.orphanize = function(operation) {
    var arg, _j, _len;
    if (operation.domain) {
      operation.domain = void 0;
    }
    if (operation.variables) {
      operation.variables = void 0;
    }
    for (_j = 0, _len = operation.length; _j < _len; _j++) {
      arg = operation[_j];
      if (arg != null ? arg.push : void 0) {
        this.orphanize(arg);
      }
    }
    return operation;
  };

  Command.compile = function(engine, command, force) {
    var Types, aliases, name, property, proto, value, _base, _j, _len, _ref, _ref1;
    if (!command) {
      if (engine.proto.hasOwnProperty('$signatures') && !force) {
        _ref = engine.proto.$signatures;
        for (property in _ref) {
          value = _ref[property];
          engine.signatures[property] = value;
        }
      } else {
        for (property in engine) {
          value = engine[property];
          if (((proto = value != null ? value.prototype : void 0) != null) && proto instanceof Command) {
            if (property.match(/^[A-Z]/)) {
              this.compile(engine, value);
            }
          }
        }
        engine.proto.$signatures = {};
        _ref1 = engine.signatures;
        for (property in _ref1) {
          value = _ref1[property];
          engine.proto.$signatures[property] = value;
        }
      }
      return;
    }
    if ((engine.compiled || (engine.compiled = [])).indexOf(command) > -1) {
      return;
    }
    engine.compiled.push(command);
    Types = command.types = {};
    for (property in command) {
      value = command[property];
      if (property.match(/^[A-Z]/)) {
        if ((value != null ? value.prototype : void 0) instanceof Command) {
          Types[property] = value;
          this.compile(engine, value);
        }
      }
    }
    for (property in command) {
      value = command[property];
      if (value !== Command[property] && property !== '__super__') {
        if ((value != null ? value.prototype : void 0) instanceof Command) {
          if (!property.match(/^[A-Z]/)) {
            if (value.__super__ === command) {
              this.register(engine.signatures, property, value, Types);
              if (engine.helps) {
                (_base = engine.$prototype)[property] || (_base[property] = this.Helper(engine, property));
                if (aliases = value.prototype.helpers) {
                  for (_j = 0, _len = aliases.length; _j < _len; _j++) {
                    name = aliases[_j];
                    engine.$prototype[name] = engine.$prototype[property];
                  }
                }
              }
            }
          }
        }
      }
    }
    this.Types = Types;
    return this;
  };

  Command.Helper = function(engine, name) {
    return function() {
      var arg, args, command, extras, index, length, parent, permutation, permuted, result, _j, _len, _ref;
      args = Array.prototype.slice.call(arguments);
      command = Command.match(engine, [name].concat(args)).prototype;
      if (!(parent = command.constructor.__super__)) {
        return this.engine.solve([name].concat(__slice.call(arguments)));
      }
      length = command.padding;
      if (command.hasOwnProperty('permutation')) {
        length += (permutation = command.permutation).length;
        permuted = [];
        for (index = _j = 0, _len = args.length; _j < _len; index = ++_j) {
          arg = args[index];
          permuted[permutation[index]] = arg;
        }
        args = permuted;
      }
      if (length > args.length) {
        args.length = length;
      }
      if (extras = (_ref = command.extras) != null ? _ref : command.execute.length) {
        args.push(this.input);
        if (extras > 1) {
          args.push(args);
          if (extras > 2) {
            args.push('');
            if (extras > 3) {
              args.push(this.scope);
            }
          }
        }
        if ((result = command.execute.apply(command, args)) != null) {
          if (command.ascend !== parent.ascend) {
            command.ascend(engine.input, args, '', this.scope, result);
          }
          return result;
        }
      }
    };
  };


  /*
  
  Generate lookup structures to match methods by name and argument type signature
  
  Signature for `['==', ['get', 'a'], 10]` would be `engine.signatures['==']['Variable']['Number']`
  
  A matched signature returns customized class for an operation that can further
  pick a sub-class dynamically. Signatures allows special case optimizations and
  composition to be implemented structurally, instead of branching in runtime.
  
  Signatures are shared between commands. Dispatcher support css-style
  typed optional argument groups, but has no support for keywords or repeating groups yet
   */

  Command.sign = function(command, object) {
    var signature, signatures, signed, storage, _j, _len;
    if (signed = command.signed) {
      return signed;
    }
    command.signed = storage = [];
    if (signature = object.signature) {
      this.get(command, storage, signature);
    } else if (signature === false) {
      storage.push(['default']);
    } else if (signatures = object.signatures) {
      for (_j = 0, _len = signatures.length; _j < _len; _j++) {
        signature = signatures[_j];
        this.get(command, storage, signature);
      }
    }
    return storage;
  };

  Command.permute = function(arg, permutation) {
    var group, i, index, j, keys, position, values, _j, _k, _l, _len, _len1, _m, _ref, _ref1, _ref2;
    keys = Object.keys(arg);
    if (!permutation) {
      return keys;
    }
    values = Object.keys(arg);
    group = [];
    for (index = _j = 0, _len = permutation.length; _j < _len; index = ++_j) {
      position = permutation[index];
      if (position !== null) {
        group[position] = keys[index];
      }
    }
    for (i = _k = _ref = permutation.length, _ref1 = keys.length; _k < _ref1; i = _k += 1) {
      for (j = _l = 0, _ref2 = keys.length; _l < _ref2; j = _l += 1) {
        if (group[j] == null) {
          group[j] = keys[i];
          break;
        }
      }
    }
    for (_m = 0, _len1 = group.length; _m < _len1; _m++) {
      arg = group[_m];
      if (arg === void 0) {
        return;
      }
    }
    return group;
  };

  Command.getPermutation = function(args, properties) {
    var arg, index, result, _j, _k, _len;
    result = [];
    for (index = _j = 0, _len = args.length; _j < _len; index = ++_j) {
      arg = args[index];
      if (arg !== null) {
        result[arg] = properties[index];
      }
    }
    for (index = _k = result.length - 1; _k >= 0; index = _k += -1) {
      arg = result[index];
      if (arg == null) {
        result.splice(index, 1);
      }
    }
    return result;
  };

  Command.getPositions = function(args) {
    var arg, index, result, value, _j, _k, _len;
    result = [];
    for (index = _j = 0, _len = args.length; _j < _len; index = ++_j) {
      value = args[index];
      if (value != null) {
        result[value] = index;
      }
    }
    for (index = _k = result.length - 1; _k >= 0; index = _k += -1) {
      arg = result[index];
      if (arg == null) {
        result.splice(index, 1);
      }
    }
    return result;
  };

  Command.getProperties = function(signature) {
    var a, arg, definition, properties, property, _j, _k, _len, _len1;
    if (properties = signature.properties) {
      return properties;
    }
    signature.properties = properties = [];
    for (_j = 0, _len = signature.length; _j < _len; _j++) {
      arg = signature[_j];
      if (arg.push) {
        for (_k = 0, _len1 = arg.length; _k < _len1; _k++) {
          a = arg[_k];
          for (property in a) {
            definition = a[property];
            properties.push(definition);
          }
        }
      } else {
        for (property in arg) {
          definition = arg[property];
          properties.push(definition);
        }
      }
    }
    return properties;
  };

  Command.generate = function(combinations, positions, properties, combination, length) {
    var i, j, position, props, type, _j, _len, _ref;
    if (combination) {
      i = combination.length;
    } else {
      combination = [];
      combinations.push(combination);
      i = 0;
    }
    while ((props = properties[i]) === void 0 && i < properties.length) {
      i++;
    }
    if (i === properties.length) {
      combination.length = length;
      combination.push(positions);
    } else {
      _ref = properties[i];
      for (j = _j = 0, _len = _ref.length; _j < _len; j = ++_j) {
        type = _ref[j];
        if (j === 0) {
          combination.push(type);
        } else {
          position = combinations.indexOf(combination);
          combination = combination.slice(0, i);
          combination.push(type);
          combinations.push(combination);
        }
        this.generate(combinations, positions, properties, combination, length);
      }
    }
    return combinations;
  };

  Command.write = function(command, storage, combination) {
    var arg, i, last, proto, resolved, variant, _j, _ref, _ref1, _ref2;
    for (i = _j = 0, _ref = combination.length; 0 <= _ref ? _j < _ref : _j > _ref; i = 0 <= _ref ? ++_j : --_j) {
      if ((arg = combination[i]) === 'default') {
        storage.Default = command;
      } else {
        last = combination.length - 1;
        if (arg !== void 0 && i < last) {
          storage = storage[arg] || (storage[arg] = {});
        } else {
          variant = command.extend({
            permutation: combination[last],
            padding: last - i,
            definition: command
          });
          if (resolved = storage.resolved) {
            proto = resolved.prototype;
            if (variant.prototype.condition) {
              if (!proto.hasOwnProperty('advices')) {
                proto.advices = ((_ref1 = proto.advices) != null ? _ref1.slice() : void 0) || [];
                if (proto.condition) {
                  proto.advices.push(resolved);
                }
              }
              proto.advices.push(variant);
            } else {
              if (proto.condition) {
                variant.prototype.advices = ((_ref2 = proto.advices) != null ? _ref2.slice() : void 0) || [resolved];
                storage.resolved = variant;
              }
            }
          } else {
            storage.resolved = variant;
          }
        }
      }
    }
  };

  Command.register = function(signatures, property, command, types) {
    var Prototype, combination, execute, kind, proto, storage, subcommand, type, value, _j, _k, _len, _len1, _ref, _ref1;
    storage = signatures[property] || (signatures[property] = {});
    for (type in types) {
      subcommand = types[type];
      if (proto = command.prototype) {
        if ((execute = proto[type]) || ((kind = subcommand.prototype.kind) && ((kind === 'auto') || (execute = proto[kind])))) {
          Prototype = subcommand.extend();
          for (property in proto) {
            if (!__hasProp.call(proto, property)) continue;
            value = proto[property];
            Prototype.prototype[property] = value;
          }
          if (typeof execute === 'object') {
            for (property in execute) {
              value = execute[property];
              Prototype.prototype[property] = value;
            }
          } else if (execute) {
            Prototype.prototype.execute = execute;
          }
          _ref = this.sign(subcommand, Prototype.prototype);
          for (_j = 0, _len = _ref.length; _j < _len; _j++) {
            combination = _ref[_j];
            this.write(Prototype, storage, combination);
          }
        }
      }
    }
    _ref1 = this.sign(command, command.prototype);
    for (_k = 0, _len1 = _ref1.length; _k < _len1; _k++) {
      combination = _ref1[_k];
      this.write(command, storage, combination);
    }
  };

  Command.get = function(command, storage, signature, args, permutation) {
    var arg, argument, group, i, j, k, keys, obj, property, _j, _k, _l, _len, _len1, _ref;
    args || (args = []);
    i = args.length;
    seeker: {;
    for (_j = 0, _len = signature.length; _j < _len; _j++) {
      arg = signature[_j];
      if (arg.push) {
        for (k = _k = 0, _len1 = arg.length; _k < _len1; k = ++_k) {
          obj = arg[k];
          j = 0;
          group = arg;
          for (property in obj) {
            if (!i) {
              arg = obj;
              if (!(keys = this.permute(arg, permutation))) {
                return;
              }
              argument = arg[property];
              break seeker;
            }
            i--;
            j++;
          }
        }
      } else {
        j = void 0;
        for (property in arg) {
          if (!i) {
            argument = arg[property];
            break seeker;
          }
          i--;
        }
      }
    }
    };
    if (!argument) {
      this.generate(storage, this.getPositions(args), this.getPermutation(args, this.getProperties(signature)), void 0, args.length);
      return;
    }
    if (keys && (j != null)) {
      permutation || (permutation = []);
      for (i = _l = 0, _ref = keys.length; _l < _ref; i = _l += 1) {
        if (permutation.indexOf(i) === -1) {
          this.get(command, storage, signature, args.concat(args.length - j + i), permutation.concat(i));
        }
      }
      this.get(command, storage, signature, args.concat(null), permutation.concat(null));
      return;
    }
    return this.get(command, storage, signature, args.concat(args.length));
  };

  return Command;

})();

Command.Sequence = (function(_super) {
  __extends(Sequence, _super);

  function Sequence() {}

  Sequence.prototype.descend = function(engine, operation, continuation, scope, ascender, ascending) {
    var argument, command, index, result, _i, _ref, _ref1;
    if (ascender > -1) {
      index = ascender + 1;
      result = ascending;
    } else if (ascender === -1 && ascending) {
      result = ascending;
      continuation = this.delimit(continuation, this.ASCEND);
    }
    for (index = _i = _ref = index || 0, _ref1 = operation.length; _i < _ref1; index = _i += 1) {
      argument = operation[index];
      argument.parent || (argument.parent = operation);
      if (command = argument.command || engine.Command(argument)) {
        result = command.solve(engine, argument, continuation, scope, -1, result);
        if (result === void 0) {
          return;
        }
      }
      break;
    }
    return [result, engine, operation, continuation, scope];
  };

  Sequence.prototype.log = function() {};

  Sequence.prototype.unlog = function() {};

  Sequence.prototype.sequence = true;

  Sequence.prototype.execute = function(result) {
    return result;
  };

  Sequence.prototype.release = function(result, engine, operation, continuation, scope) {
    var parent, _base;
    parent = operation.parent;
    if (operation === parent[parent.length - 1]) {
      return typeof (_base = parent.parent.command).release === "function" ? _base.release(result, engine, parent, continuation, scope) : void 0;
    }
  };

  Sequence.prototype["yield"] = function(result, engine, operation, continuation, scope, ascender, ascending) {
    var next, parent;
    if (ascender === -2) {
      return;
    }
    parent = operation.parent;
    if ((next = parent[parent.indexOf(operation) + 1])) {
      return next;
    } else {
      if (parent.parent) {
        this.ascend(engine, parent, continuation, scope, result, parent.parent.indexOf(parent), ascending);
        return true;
      } else {
        return result;
      }
    }
  };

  return Sequence;

})(Command);

Command.List = (function(_super) {
  __extends(List, _super);

  List.prototype.type = 'List';

  List.prototype.condition = function(engine, operation) {
    var parent, _ref;
    if (parent = operation.parent) {
      return ((_ref = parent.command.List) != null ? _ref[parent.indexOf(operation)] : void 0) || parent[0] === true;
    } else {
      return !operation[0].command.Sequence;
    }
  };

  function List() {}

  List.prototype.extras = 0;

  List.prototype.boundaries = true;

  List.prototype.execute = function() {};

  List.prototype["yield"] = function() {
    return true;
  };

  List.prototype.descend = function(engine, operation, continuation, scope, ascender, ascending) {
    var argument, command, index, _i, _len;
    for (index = _i = 0, _len = operation.length; _i < _len; index = ++_i) {
      argument = operation[index];
      if (argument != null ? argument.push : void 0) {
        argument.parent || (argument.parent = operation);
        if (command = argument.command || engine.Command(argument)) {
          command.solve(engine, argument, continuation, scope);
        }
      }
    }
  };

  return List;

})(Command.Sequence);

Command.Sequence.prototype.advices = [Command.List];

Command.Default = (function(_super) {
  __extends(Default, _super);

  Default.prototype.type = 'Default';

  Default.prototype.extras = 2;

  Default.prototype.execute = function() {
    var args, engine, operation, _i;
    args = 3 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 2) : (_i = 0, []), engine = arguments[_i++], operation = arguments[_i++];
    args.unshift(operation[0]);
    return args;
  };

  function Default() {}

  return Default;

})(Command);

Command.Object = (function(_super) {
  __extends(Object, _super);

  function Object() {}

  return Object;

})(Command);

Command.Meta = (function(_super) {
  __extends(Meta, _super);

  function Meta() {
    return Meta.__super__.constructor.apply(this, arguments);
  }

  Meta.prototype.type = 'Meta';

  Meta.prototype.signature = [
    {
      body: ['Any']
    }
  ];

  Meta.prototype.execute = function(data) {
    return data;
  };

  return Meta;

})(Command);

module.exports = Command;



},{}],16:[function(require,module,exports){

/* Domain: Observable object. 

Has 3 use cases:

1) Base  

Interface:

  - (un)watch() - (un)subscribe expression to property updates
  - set()       - dispatches updates to subscribed expressions
  - get()       - retrieve value
  - remove()    - detach observes by continuation


State:
  - @watchers[key] - List of oservers of specific properties
                      as [operation, continuation, scope] triplets

  - @observers[continuation] - List of observers by continuation
                                as [operation, key, scope] triplets
 */
var Domain,
  __hasProp = {}.hasOwnProperty;

Domain = (function() {
  Domain.prototype.strategy = void 0;

  function Domain(values) {
    this.signatures = {};
    if (values) {
      this.merge(values);
    }
    if (this.url) {
      this.useWorker(this.url);
    }
    if (this.events !== this.engine.events) {
      this.addListeners(this.events);
    }
    if (this.Properties) {
      this.properties = new this.Properties(this);
      this.Property.compile(this.properties, this);
    } else {
      this.properties = {};
    }
    return this;
  }

  Domain.prototype.setup = function() {
    if (!this.hasOwnProperty('values')) {
      this.values = {};
      return this.construct();
    }
  };

  Domain.prototype.construct = function() {
    this.watchers = {};
    return this.watched = {};
  };

  Domain.prototype.solve = function(operation, continuation, scope, ascender, ascending) {
    var commands, commited, result, transacting, _ref;
    transacting = this.transact();
    if (typeof operation === 'object') {
      if (operation instanceof Array) {
        result = this.Command(operation).solve(this, operation, continuation || '', scope || this.scope, ascender, ascending);
      } else {
        result = this.data.merge(operation, continuation);
      }
    }
    if (this.constrained || this.unconstrained) {
      commands = this.Constraint.prototype.split(this);
      this.Constraint.prototype.reset(this);
    }
    if (typeof result !== 'object') {
      if (result = (_ref = this.perform) != null ? _ref.apply(this, arguments) : void 0) {
        result = this.apply(result);
      }
    }
    if (commands) {
      this.update(commands);
    }
    if (transacting) {
      commited = this.commit();
    }
    return result || commited;
  };

  Domain.prototype.watch = function(object, property, operation, continuation, scope) {
    var id, j, obj, observers, path, prop, value, watchers, _base, _base1, _base2;
    this.setup();
    path = this.getPath(object, property);
    value = this.get(path);
    if (this.indexOfTriplet(this.watchers[path], operation, continuation, scope) === -1) {
      observers = (_base = this.watched)[continuation] || (_base[continuation] = []);
      observers.push(operation, path, scope);
      watchers = (_base1 = this.watchers)[path] || (_base1[path] = []);
      watchers.push(operation, continuation, scope);
      if (this.subscribe && watchers.length === 3) {
        if ((j = path.indexOf('[')) > -1) {
          id = path.substring(0, j);
          obj = (_base2 = (this.subscribers || (this.subscribers = {})))[id] || (_base2[id] = {});
          prop = path.substring(j + 1, path.length - 1);
          obj[prop] = true;
          this.subscribe(id, prop, path);
        }
      }
    }
    return value;
  };

  Domain.prototype.unwatch = function(object, property, operation, continuation, scope) {
    var id, index, j, obj, observers, old, path, prop, watchers, _base;
    path = this.getPath(object, property);
    observers = this.watched[continuation];
    index = this.indexOfTriplet(observers, operation, path, scope);
    observers.splice(index, 3);
    if (!observers.length) {
      delete this.watched[continuation];
    }
    watchers = this.watchers[path];
    index = this.indexOfTriplet(watchers, operation, continuation, scope);
    watchers.splice(index, 3);
    if (!watchers.length) {
      delete this.watchers[path];
      if (this.subscribe) {
        if ((j = path.indexOf('[')) > -1) {
          id = path.substring(0, j);
          obj = (_base = this.subscribers)[id] || (_base[id] = {});
          prop = path.substring(j + 1, path.length - 1);
          old = obj[prop];
          delete obj[prop];
          if (this.updating) {
            this.transact();
            this.changes[path] = null;
            if (!(this.updating.domains.indexOf(this) > this.updating.index)) {
              this.updating.apply(this.changes);
            }
          }
          this.unsubscribe(id, prop, path);
          if (!Object.keys(obj).length) {
            delete this.subscribers[id];
            if (!Object.keys(this.subscribers).length) {
              return this.subscribers = void 0;
            }
          }
        }
      }
    }
  };

  Domain.prototype.get = function(object, property) {
    return this.values[this.getPath(object, property)];
  };

  Domain.prototype.merge = function(object, continuation, operation) {
    if (object && !object.push) {
      if (object instanceof Domain) {
        return;
      }
      if (this.updating) {
        return this.merger(object, void 0, continuation);
      } else {
        return this.engine.solve(this.displayName || 'GSS', this.merger, object, this, continuation, operation);
      }
    }
  };

  Domain.prototype.merger = function(object, domain, continuation, operation) {
    var async, path, transacting, value;
    if (domain == null) {
      domain = this;
    }
    transacting = domain.transact();
    async = false;
    for (path in object) {
      value = object[path];
      domain.set(void 0, path, value, continuation, operation);
    }
    if (transacting) {
      return domain.commit();
    }
  };

  Domain.prototype.set = function(object, property, value, continuation, operation) {
    var i, old, op, path, stack, updated, _base, _i, _len, _ref;
    path = this.getPath(object, property);
    old = this.values[path];
    if (continuation) {
      _ref = stack = (_base = (this.stacks || (this.stacks = {})))[path] || (_base[path] = []);
      for (i = _i = 0, _len = _ref.length; _i < _len; i = _i += 3) {
        op = _ref[i];
        if (op === operation && stack[i + 1] === continuation) {
          if (value != null) {
            stack[i + 2] = value;
            if (stack.length > i + 3) {
              return;
            }
          } else {
            stack.splice(i, 3);
            if (stack.length > i + 3) {
              return;
            }
            value = stack[stack.length - 1];
          }
          updated = true;
          break;
        }
      }
      if (!updated && value !== null) {
        stack.push(operation, continuation, value);
      }
    }
    if (old === value || ((value == null) && (old == null))) {
      return;
    }
    this.transact();
    this.changes[path] = value != null ? value : null;
    if (value != null) {
      this.values[path] = value;
    } else {
      delete this.values[path];
    }
    if (this.updating) {
      this.callback(path, value);
    } else {
      this.engine.solve(this.displayName || 'GSS', function(domain) {
        return domain.callback(path, value);
      }, this);
    }
    return value;
  };

  Domain.prototype.callback = function(path, value) {
    var command, constraint, index, op, operation, url, values, variable, watcher, watchers, worker, workers, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
    if (watchers = (_ref = this.watchers) != null ? _ref[path] : void 0) {
      for (index = _i = 0, _len = watchers.length; _i < _len; index = _i += 3) {
        watcher = watchers[index];
        if (!watcher) {
          break;
        }
        command = watcher.command;
        if (command.deferred) {
          this.Query.prototype.defer(this, watcher, watchers[index + 1], watchers[index + 2]);
        } else if (value != null) {
          watcher.command.solve(this, watcher, watchers[index + 1], watchers[index + 2], true);
        } else {
          watcher.command.patch(this, watcher, watchers[index + 1], watchers[index + 2]);
        }
      }
    }
    if (this.immutable) {
      return;
    }
    if (!(this instanceof this.Solver) && (variable = this.variables[path])) {
      _ref1 = variable.constraints;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        constraint = _ref1[_j];
        _ref2 = constraint.operations;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          operation = _ref2[_k];
          if (op = operation.variables[path]) {
            if (op.domain && op.domain.displayName !== this.displayName) {
              if (!watchers || watchers.indexOf(op) === -1) {
                op.command.patch(op.domain, op, void 0, void 0, this);
                op.command.solve(this, op);
              }
            }
          }
        }
      }
    }
    if (workers = this.workers) {
      for (url in workers) {
        worker = workers[url];
        if (values = worker.values) {
          if (values.hasOwnProperty(path)) {
            this.updating.push([['value', path, value != null ? value : null]], worker);
          }
        }
      }
    }
  };

  Domain.prototype.toObject = function() {
    var object, property, value;
    object = {};
    for (property in this) {
      if (!__hasProp.call(this, property)) continue;
      value = this[property];
      if (property !== 'engine' && property !== 'observers' && property !== 'watchers' && property !== 'values') {
        object[property] = value;
      }
    }
    return object;
  };

  Domain.prototype.compile = function(force) {
    return this.Command.compile(this, void 0, force);
  };

  Domain.prototype.add = function(path, value) {
    var group, _base;
    group = (_base = (this.paths || (this.paths = {})))[path] || (_base[path] = []);
    group.push(value);
  };

  Domain.prototype.transform = function(result) {
    var nullified, path, replaced, value, variable, _ref, _ref1, _ref2;
    if (result == null) {
      result = {};
    }
    nullified = this.nullified;
    replaced = this.replaced;
    if (this.declared) {
      _ref = this.declared;
      for (path in _ref) {
        variable = _ref[path];
        value = (_ref1 = variable.value) != null ? _ref1 : 0;
        if (this.values[path] !== value) {
          if (path.charAt(0) !== '%') {
            if (result[path] == null) {
              result[path] = value;
            }
            this.values[path] = value;
          }
        }
      }
      this.declared = void 0;
    }
    this.replaced = void 0;
    if (nullified) {
      for (path in nullified) {
        variable = nullified[path];
        if (path.charAt(0) !== '%') {
          result[path] = (_ref2 = this.data.values[path]) != null ? _ref2 : null;
        }
        this.nullify(variable);
      }
      this.nullified = void 0;
    }
    return result;
  };

  Domain.prototype.apply = function(solution) {
    var nullified, path, replaced, result, value;
    result = {};
    nullified = this.nullified;
    replaced = this.replaced;
    for (path in solution) {
      value = solution[path];
      if (!(nullified != null ? nullified[path] : void 0) && !(replaced != null ? replaced[path] : void 0) && path.charAt(0) !== '%') {
        result[path] = value;
      }
    }
    result = this.transform(result);
    this.merge(result);
    return result;
  };

  Domain.prototype.register = function(constraints) {
    var domains, index;
    if (constraints == null) {
      constraints = this.constraints;
    }
    domains = this.engine.domains;
    if (constraints != null ? constraints.length : void 0) {
      if (domains.indexOf(this) === -1) {
        return domains.push(this);
      }
    } else {
      if ((index = domains.indexOf(this)) > -1) {
        return domains.splice(index, 1);
      }
    }
  };

  Domain.prototype.remove = function() {
    var contd, i, observer, operation, operations, path, property, stack, stacks, _i, _j, _k, _len, _len1, _ref, _ref1, _ref2;
    for (_i = 0, _len = arguments.length; _i < _len; _i++) {
      path = arguments[_i];
      if (stacks = this.stacks) {
        _ref = this.stacks;
        for (property in _ref) {
          stack = _ref[property];
          while ((i = stack.indexOf(path)) > -1) {
            stack.splice(i - 1, 3);
            if (stack.length < i) {
              this.set(null, property, stack[stack.length - 1]);
              if (!stack.length) {
                delete this.stacks[property];
              }
            }
          }
        }
      }
      if (this.watched) {
        _ref1 = this.Query.prototype.getVariants(path) || [path];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          contd = _ref1[_j];
          if (observer = this.watched[contd]) {
            while (observer[0]) {
              this.unwatch(observer[1], void 0, observer[0], contd, observer[2]);
            }
          }
        }
      }
      if (operations = (_ref2 = this.paths) != null ? _ref2[path] : void 0) {
        for (i = _k = operations.length - 1; _k >= 0; i = _k += -1) {
          operation = operations[i];
          operation.command.remove(this, operation, path);
        }
      }
    }
  };

  Domain.prototype["export"] = function(constraints) {
    var constraint, operation, operations, ops, _i, _j, _len, _len1;
    if (constraints || (constraints = this.constraints)) {
      operations = [];
      for (_i = 0, _len = constraints.length; _i < _len; _i++) {
        constraint = constraints[_i];
        if (ops = constraint.operations) {
          for (_j = 0, _len1 = ops.length; _j < _len1; _j++) {
            operation = ops[_j];
            operations.push(operation.parent);
          }
        }
      }
      return operations;
    }
  };

  Domain.prototype.transfer = function(update, parent) {
    var prop, solution;
    if (parent) {
      parent.perform(this);
    }
    if (update) {
      update.perform(this);
    }
    this.updating.perform(this);
    if (this.unconstrained) {
      this.Constraint.prototype.reset(this);
      this.register();
    }
    if (this.nullified) {
      solution = {};
      for (prop in this.nullified) {
        (solution || (solution = {}))[prop] = null;
      }
      return this.updating.apply(solution);
    }
  };

  Domain.prototype.maybe = function() {
    var Base;
    if (!this.Maybe) {
      Base = function() {};
      Base.prototype = this;
      this.Maybe = function() {};
      this.Maybe.prototype = new Base;
    }
    return new this.Maybe;
  };

  Domain.prototype.transact = function() {
    if (!this.changes) {
      this.setup();
      return this.changes = {};
    }
  };

  Domain.prototype.commit = function() {
    var changes, prop;
    if (changes = this.changes) {
      if (this instanceof this.Solver) {
        this.register();
      }
      this.changes = void 0;
      for (prop in changes) {
        return changes;
      }
    }
  };

  Domain.compile = function(engine) {
    var EngineDomain, EngineDomainWrapper, domain, name, property, value, _ref;
    for (name in engine) {
      domain = engine[name];
      if (domain.prototype && domain.prototype instanceof Domain) {
        EngineDomain = engine[name] = function(values) {
          return domain.prototype.constructor.call(this, void 0, void 0, values);
        };
        EngineDomainWrapper = function() {};
        EngineDomainWrapper.prototype = engine;
        EngineDomain.prototype = new EngineDomainWrapper;
        EngineDomain.prototype.proto = domain;
        EngineDomain.prototype.engine = engine;
        EngineDomain.prototype.displayName = name;
        _ref = domain.prototype;
        for (property in _ref) {
          value = _ref[property];
          EngineDomain.prototype[property] = value;
        }
        engine[name.toLowerCase()] = new EngineDomain();
      }
    }
    return this;
  };

  Domain.prototype.Property = function(property, reference, properties) {
    var index, key, left, path, right, value, _base;
    if (typeof property === 'object') {
      if (property.push) {
        return properties[reference] = this.Style(property, reference, properties);
      } else {
        for (key in property) {
          value = property[key];
          if ((index = reference.indexOf('[')) > -1) {
            path = reference.replace(']', '-' + key + ']');
            left = reference.substring(0, index);
            right = path.substring(index + 1, path.length - 1);
            (_base = properties[left])[right] || (_base[right] = this.Property(value, path, properties));
          } else if (reference.match(/^[a-z]/i)) {
            path = reference + '-' + key;
          } else {
            path = reference + '[' + key + ']';
          }
          properties[path] = this.Property(value, path, properties);
        }
      }
    }
    return property;
  };

  Domain.prototype.Property.compile = function(properties, engine) {
    var key, property;
    for (key in properties) {
      property = properties[key];
      if (key === 'engine') {
        continue;
      }
      this.call(engine, property, key, properties);
    }
    return properties;
  };

  return Domain;

})();

module.exports = Domain;



},{}],17:[function(require,module,exports){

/* Base class: Engine

Engine is a base class for scripting environment.
It initializes and orchestrates all moving parts.

It operates over workers and domains. Workers are
separate engines running in web worker thread. 
Domains are either independent constraint graphs or
pseudo-solvers like DOM measurements.
 */
var Engine,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Engine = (function() {
  Engine.prototype.Command = require('./Command');

  Engine.prototype.Domain = require('./Domain');

  Engine.prototype.Update = require('./Update');

  Engine.prototype.Query = require('./Query');

  Engine.prototype.Solver = require('./domains/Linear');

  Engine.prototype.Input = require('./domains/Input');

  Engine.prototype.Data = require('./domains/Data');

  Engine.prototype.Output = require('./domains/Output');

  Engine.prototype.Console = require('./utilities/Console');

  Engine.prototype.Inspector = require('./utilities/Inspector');

  Engine.prototype.Exporter = require('./utilities/Exporter');

  function Engine(data, url) {
    var events, property, value, _i, _len, _ref;
    this.engine = this;
    this.$prototype = Engine.prototype;
    if ((url != null) && (typeof Worker !== "undefined" && Worker !== null)) {
      this.url = this.getWorkerURL(url);
    }
    this.eventHandler = this.handleEvent.bind(this);
    this.listeners = {};
    _ref = [this.events, this.$events, this.$$events];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      events = _ref[_i];
      this.addListeners(events);
    }
    this.observers = {};
    this.queries = {};
    this.lefts = [];
    this.pairs = {};
    this.variables = {};
    this.domains = [];
    this.stylesheets = [];
    this.imported = {};
    this.inspector = new this.Inspector(this);
    this.exporter = new this.Exporter(this);
    this.update = this.Update.compile(this);
    this.Domain.compile(this);
    this.data.setup();
    this.output.setup();
    this.values = this.output.values;
    if (data) {
      for (property in data) {
        value = data[property];
        this.data.values[property] = this.values[property] = value;
      }
    }
    if ((typeof window === "undefined" || window === null) && (typeof self !== "undefined" && self !== null)) {
      this.strategy = 'update';
    }
    if (typeof self !== "undefined" && self !== null) {
      self.addEventListener('error', this.eventHandler);
    }
    return this;
  }

  Engine.prototype.solve = function(a, b, c, d, e, f, g) {
    var args, result, strategy, transacting;
    if (!this.transacting) {
      this.transacting = transacting = true;
    }
    args = this.transact(a, b, c, d, e, f, g);
    if (typeof args[0] === 'function') {
      if (result = args.shift().apply(this, args)) {
        this.updating.apply(result);
      }
    } else if (args[0] != null) {
      strategy = this[this.strategy || 'input'];
      if (strategy.solve) {
        this.data.transact();
        this.console.start(strategy.displayName, args);
        strategy.solve.apply(strategy, args);
        this.console.end(result);
        result = this.data.commit();
      } else {
        result = strategy.apply(this, args);
      }
    }
    if (transacting) {
      this.transacting = void 0;
      return this.commit(result);
    }
  };

  Engine.prototype.propagate = function(values) {
    if (values) {
      this.updating.apply(values);
      this.output.merge(values);
    }
    return values;
  };

  Engine.prototype.transact = function() {
    var arg, args, index, problematic, reason, _i, _len;
    if (typeof arguments[0] === 'string') {
      reason = arguments[0];
      if (typeof arguments[1] === 'string') {
        arg = arguments[1];
      }
    }
    args = Array.prototype.slice.call(arguments, +(reason != null) + +(arg != null));
    if (!this.updating) {
      this.console.start(reason || (this.updated && 'Update' || 'Initialize'), arg || args);
      this.updating = new this.update;
      this.updating.start();
      this.triggerEvent('transact', this.updating);
    }
    if (!this.running) {
      this.compile();
    }
    problematic = void 0;
    for (index = _i = 0, _len = args.length; _i < _len; index = ++_i) {
      arg = args[index];
      if (arg && typeof arg !== 'string') {
        if (problematic) {
          if (typeof arg === 'function') {
            this.then(arg);
            args.splice(index, 1);
            break;
          }
        } else {
          problematic = arg;
        }
      }
    }
    return args;
  };

  Engine.prototype.write = function(update) {
    this.output.merge(update.changes);
    return update.changes = void 0;
  };

  Engine.prototype.commit = function(solution, update) {
    var _ref;
    if (update == null) {
      update = this.updating;
    }
    if (update.blocking) {
      return;
    }
    if (solution) {
      this.propagate(solution);
    }
    while (!(update.isDone() && !update.isDirty())) {
      this.triggerEvent('commit', update);
      if (update.blocking) {
        update.reset();
        return update;
      }
      this.triggerEvent('assign', update);
      this.triggerEvent('perform', update);
      if ((_ref = update.busy) != null ? _ref.length : void 0) {
        return update;
      }
      if (this.write(update) || ((update.written || update.reflown) && update.isDone())) {
        update.written = true;
        this.triggerEvent('validate', update);
      }
      update.commit();
    }
    if (update.hadSideEffects()) {
      this.triggerEvent('finish', update);
      this.fireEvent('solve', update.solution, update);
      this.fireEvent('solved', update.solution, update);
      return update.solution;
    } else {
      return this.triggerEvent('finish');
    }
  };

  Engine.prototype.resolve = function(domain, problems, index, update) {
    var problem, result, _i, _len;
    if (domain && !domain.solve && domain.postMessage) {
      update.postMessage(domain, problems);
      update.await(domain.url);
      return domain;
    }
    for (index = _i = 0, _len = problems.length; _i < _len; index = ++_i) {
      problem = problems[index];
      if (problem instanceof Array && problem.length === 1 && problem[0] instanceof Array) {
        problem = problems[index] = problem[0];
      }
    }
    if (!domain) {
      return this.broadcast(problems, update);
    }
    this.console.start(domain.displayName, problems);
    result = domain.solve(problems) || void 0;
    if (result && result.postMessage) {
      update.await(result.url);
    } else {
      if ((result != null ? result.length : void 0) === 1) {
        result = result[0];
      }
    }
    this.console.end(result);
    return result;
  };

  Engine.prototype.broadcast = function(problems, update, insert) {
    var broadcasted, i, index, locals, other, others, path, problem, property, remove, removes, result, stacks, url, value, worker, working, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3, _ref4;
    if (update == null) {
      update = this.updating;
    }
    others = [];
    removes = [];
    if (insert) {
      if (update.domains[update.index + 1] !== null) {
        update.domains.splice(update.index, 0, null);
        update.problems.splice(update.index, 0, problems);
      } else {
        broadcasted = update.problems[update.index + 1];
        broadcasted.push.apply(broadcasted, problems);
      }
    }
    if (problems[0] === 'remove') {
      removes.push(problems);
    } else {
      for (_i = 0, _len = problems.length; _i < _len; _i++) {
        problem = problems[_i];
        if (problem[0] === 'remove') {
          removes.push(problem);
        } else {
          others.push(problem);
        }
      }
    }
    _ref = [this.data, this.output].concat(this.domains);
    for (i = _j = 0, _len1 = _ref.length; _j < _len1; i = ++_j) {
      other = _ref[i];
      locals = [];
      other.changes = void 0;
      stacks = other.stacks;
      for (_k = 0, _len2 = removes.length; _k < _len2; _k++) {
        remove = removes[_k];
        for (index = _l = 0, _len3 = remove.length; _l < _len3; index = ++_l) {
          path = remove[index];
          if (index === 0) {
            continue;
          }
          if ((_ref1 = other.paths) != null ? _ref1[path] : void 0) {
            locals.push(path);
          } else if (((_ref2 = other.watched) != null ? _ref2[path] : void 0) || other.stacks) {
            other.remove(path);
          }
        }
      }
      if (other.changes) {
        _ref3 = other.changes;
        for (property in _ref3) {
          value = _ref3[property];
          (result || (result = {}))[property] = value;
        }
        other.changes = void 0;
      }
      if (locals.length) {
        locals.unshift('remove');
        locals.index = -1;
        update.push([locals], other, true);
      }
      if (others.length) {
        update.push(others, other);
      }
    }
    if (typeof problems[0] === 'string') {
      problems = [problems];
    }
    _ref4 = this.workers;
    for (url in _ref4) {
      worker = _ref4[url];
      working = problems.filter(function(command) {
        var _ref5;
        return command[0] !== 'remove' || ((_ref5 = worker.paths) != null ? _ref5[command[1]] : void 0);
      });
      update.push(working, worker, true);
    }
    if (result) {
      update.apply(result);
    }
  };

  Engine.prototype.compile = function() {
    var domain, name;
    for (name in this) {
      domain = this[name];
      if (domain && domain !== this && domain.engine) {
        if (typeof domain.compile === "function") {
          domain.compile();
        }
      }
    }
    this.running = true;
    return this.triggerEvent('compile', this);
  };

  Engine.prototype.fireEvent = function(name, data, object) {
    this.triggerEvent(name, data, object);
  };

  Engine.prototype.$events = {
    perform: function(update) {
      var _ref;
      if (update.domains.length) {
        if (!((_ref = update.busy) != null ? _ref.length : void 0)) {
          this.console.start('Solvers', update.problems.slice(update.index + 1));
          update.each(this.resolve, this);
          this.console.end(update.changes);
        }
        this.output.merge(update.solution);
      }
      return this.propagate(this.data.commit());
    },
    finish: function(update) {
      this.console.end(update != null ? update.solution : void 0);
      this.updating = void 0;
      if (update) {
        this.inspector.update();
        return this.updated = update;
      }
    },
    commit: function(update) {
      while (!update.isDocumentDone()) {
        this.Query.prototype.commit(this.input);
        this.Query.prototype.repair(this.input);
        this.Query.prototype.branch(this.input);
        this;
      }
    },
    remove: function(path) {
      var paths, ranges, subpath, _i, _len, _ref, _ref1, _results;
      this.output.remove(path);
      if ((_ref = this.updating) != null) {
        _ref.remove(path);
      }
      if (this.ranges) {
        paths = this.input.Query.prototype.getVariants(path);
        _results = [];
        for (_i = 0, _len = paths.length; _i < _len; _i++) {
          subpath = paths[_i];
          if (ranges = (_ref1 = this.ranges) != null ? _ref1[subpath] : void 0) {
            delete this.ranges[subpath];
            if (!Object.keys(this.ranges).length) {
              _results.push(this.ranges = void 0);
            } else {
              _results.push(void 0);
            }
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    },
    assign: function(update) {
      var assignments, changes, constraints, continuation, index, operation, path, range, ranges, tickers, _ref;
      while (!!(assignments = update.assignments) + !!(ranges = update.ranges)) {
        if (assignments) {
          this.console.start('Assignments', assignments);
          index = 0;
          while (path = assignments[index]) {
            this.data.set(path, null, assignments[index + 1], assignments[index + 2], assignments[index + 3]);
            index += 4;
          }
          update.assignments = void 0;
          changes = this.propagate(this.data.commit());
          this.console.end(changes);
        }
        if (ranges) {
          this.console.start('Ranges', this.ranges);
          _ref = this.ranges;
          for (continuation in _ref) {
            tickers = _ref[continuation];
            index = 0;
            while (operation = tickers[index]) {
              range = tickers[index + 2];
              if (range.update !== update) {
                range.update = update;
                if (operation.command.update(range, this, operation, continuation, tickers[index + 1])) {
                  tickers.splice(index, 3);
                  if (!tickers.length) {
                    delete this.ranges[continuation];
                    if (!Object.keys(this.ranges).length) {
                      this.ranges = void 0;
                    }
                  }
                  continue;
                }
              }
              index += 3;
            }
          }
          this.console.end();
          this.updating.ranges = void 0;
        }
      }
      this.propagate(this.data.commit());
      if (constraints = update.constraints) {
        index = 0;
        this.console.start('Constraints', constraints);
        while (operation = constraints[index]) {
          this.update(operation, void 0, void 0, constraints[index + 1]);
          index += 2;
        }
        update.constraints = void 0;
        return this.console.end();
      }
    },
    destroy: function(e) {
      if (this.worker) {
        this.worker.removeEventListener('message', this.eventHandler);
        this.worker.removeEventListener('error', this.eventHandler);
      }
      return typeof self !== "undefined" && self !== null ? self.removeEventListener('error', this.eventHandler) : void 0;
    },
    message: function(e) {
      var property, value, values, _base, _ref, _ref1;
      values = (_base = e.target).values || (_base.values = {});
      _ref = e.data;
      for (property in _ref) {
        value = _ref[property];
        if (value != null) {
          values[property] = value;
        } else {
          delete values[property];
        }
      }
      if ((_ref1 = this.updating) != null ? _ref1.busy.length : void 0) {
        this.updating.solutions[this.updating.solutions.indexOf(e.target, this.updating.index)] = e.data;
        this.updating.busy.splice(this.updating.busy.indexOf(e.target.url), 1);
        return this.commit(e.data);
      }
    },
    error: function(e) {
      this.updating = void 0;
      if ((typeof window !== "undefined" && window !== null) && e.target !== window) {
        throw new Error(e.message + " (" + e.filename + ":" + e.lineno + ")");
      }
    }
  };

  Engine.prototype.getWorkerURL = (function() {
    var scripts, src, _ref, _ref1;
    if (typeof document !== "undefined" && document !== null) {
      scripts = document.getElementsByTagName('script');
      src = scripts[scripts.length - 1].src;
      if (!src.match(/gss/i)) {
        src = (_ref = document.querySelectorAll('script[src*=gss]')) != null ? (_ref1 = _ref[0]) != null ? _ref1.src : void 0 : void 0;
      }
    }
    return function(url) {
      if (typeof url !== 'string') {
        url = src;
      }
      if (!url) {
        throw new Error("Can not detect GSS source file to set up worker.\n\n- You can rename the gss file to contain \"gss\" in it:\n  `<script src=\"my-custom-path/my-gss.js\"></script>`\n\n- or provide worker path explicitly: \n  `GSS(<scope>, \"http://absolute.path/to/worker.js\")`");
      }
      return url;
    };
  })();

  Engine.prototype.useWorker = function(url) {
    var _base;
    if (typeof url !== 'string') {
      return;
    }
    if (typeof Worker === "undefined" || Worker === null) {
      return;
    }
    if (!url.match(/^http:/i) && (typeof location !== "undefined" && location !== null ? location.protocol.match(/^file:/i) : void 0)) {
      return;
    }
    (_base = this.engine).worker || (_base.worker = this.engine.getWorker(url));
    this.solve = (function(_this) {
      return function(commands) {
        var _base1;
        (_base1 = _this.engine).updating || (_base1.updating = new _this.update);
        _this.engine.updating.postMessage(_this.worker, commands);
        return _this.worker;
      };
    })(this);
    return this.worker;
  };

  Engine.prototype.getWorker = function(url) {
    var worker, _base, _base1, _base2;
    worker = (_base = ((_base1 = this.engine).workers || (_base1.workers = {})))[url] || (_base[url] = (_base2 = (Engine.workers || (Engine.workers = {})))[url] || (_base2[url] = new Worker(url)));
    worker.url || (worker.url = url);
    worker.addEventListener('message', this.engine.eventHandler);
    worker.addEventListener('error', this.engine.eventHandler);
    return worker;
  };

  Engine.prototype.getVariableDomainByConvention = function(operation, Default) {
    var i, path, property, props;
    if (operation.domain) {
      return operation.domain;
    }
    path = operation[1];
    if ((i = path.indexOf('[')) > -1) {
      property = path.substring(i + 1, path.length - 1);
    }
    if (this.data.values.hasOwnProperty(path)) {
      return this.data;
    } else if (property) {
      if (props = this.data.properties) {
        if ((props[path] != null) || (props[property] && !props[property].matcher)) {
          return this.data;
        }
      }
      if (property.indexOf('computed-') === 0 || property.indexOf('intrinsic-') === 0) {
        return this.data;
      }
    }
  };

  Engine.prototype.getPath = function(id, property) {
    var _ref;
    if (!property) {
      property = id;
      id = void 0;
    }
    if (property.indexOf('[') > -1 || !id) {
      return property;
    } else {
      if (typeof id !== 'string') {
        id = this.identify(id);
      }
      if (id === ((_ref = this.scope) != null ? _ref._gss_id : void 0) && !this.data.check(id, property)) {
        return property;
      }
      if (id.substring(0, 2) === '$"') {
        id = id.substring(1);
      }
      return id + '[' + property + ']';
    }
  };

  Engine.prototype.url = false;

  Engine.prototype.getVariableDomain = function(operation, Default) {
    var domain, op, _ref, _ref1, _ref2, _ref3;
    if (domain = this.getVariableDomainByConvention(operation)) {
      return domain;
    }
    if (Default) {
      return Default;
    }
    if (op = (_ref = this.variables[operation[1]]) != null ? (_ref1 = _ref.constraints) != null ? (_ref2 = _ref1[0]) != null ? (_ref3 = _ref2.operations[0]) != null ? _ref3.domain : void 0 : void 0 : void 0 : void 0) {
      return op;
    }
    if (this.solver.url) {
      return this.solver;
    } else {
      return this.solver.maybe();
    }
  };

  Engine.prototype.getScopeElement = function(node) {
    switch (node.tagName) {
      case 'HTML':
      case 'BODY':
      case 'HEAD':
        return document;
      case 'STYLE':
      case 'LINK':
        if (node.scoped) {
          return this.getScopeElement(node.parentNode);
        }
    }
    return node;
  };

  Engine.prototype.indexOfTriplet = function(array, a, b, c) {
    var index, op, _i, _len;
    if (array) {
      for (index = _i = 0, _len = array.length; _i < _len; index = _i += 3) {
        op = array[index];
        if (op === a && array[index + 1] === b && array[index + 2] === c) {
          return index;
        }
      }
    }
    return -1;
  };

  Engine.prototype.destroy = function() {
    this.triggerEvent('destroy');
    if (this.events) {
      return this.removeListeners(this.events);
    }
  };

  Engine.prototype.addListeners = function(listeners) {
    var callback, name, _results;
    _results = [];
    for (name in listeners) {
      callback = listeners[name];
      _results.push(this.addEventListener(name, callback));
    }
    return _results;
  };

  Engine.prototype.removeListeners = function(listeners) {
    var callback, name, _results;
    _results = [];
    for (name in listeners) {
      callback = listeners[name];
      _results.push(this.removeEventListener(name, callback));
    }
    return _results;
  };

  Engine.prototype.once = function(type, fn) {
    fn.once = true;
    return this.addEventListener(type, fn);
  };

  Engine.prototype.addEventListener = function(type, fn) {
    var _base;
    return ((_base = this.listeners)[type] || (_base[type] = [])).push(fn);
  };

  Engine.prototype.removeEventListener = function(type, fn) {
    var group, index;
    if (group = this.listeners[type]) {
      if ((index = group.indexOf(fn)) > -1) {
        return group.splice(index, 1);
      }
    }
  };

  Engine.prototype.triggerEvent = function(type, a, b, c) {
    var fn, group, index, j, method, _ref;
    if (group = (_ref = this.listeners) != null ? _ref[type] : void 0) {
      index = 0;
      j = group.length;
      while (index < j) {
        fn = group[index];
        if (fn.once) {
          group.splice(index--, 1);
          j--;
        }
        fn.call(this, a, b, c);
        index++;
      }
    }
    if (this[method = 'on' + type]) {
      return this[method](a, b, c);
    }
  };

  Engine.prototype.dispatchEvent = function(element, type, data, bubbles, cancelable) {
    var detail, e, event, prop, value;
    if (!this.scope) {
      return;
    }
    detail = {
      engine: this
    };
    for (prop in data) {
      value = data[prop];
      detail[prop] = value;
    }
    try {
      event = new window.CustomEvent(type, {
        detail: detail,
        bubbles: bubbles,
        cancelable: cancelable
      });
    } catch (_error) {
      e = _error;
      window.CustomEvent = function(event, params) {
        var evt;
        params = params || {
          bubbles: false,
          cancelable: false,
          detail: void 0
        };
        evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      };
      window.CustomEvent.prototype = window.Event.prototype;
      event = new window.CustomEvent(type, {
        detail: detail,
        bubbles: bubbles,
        cancelable: cancelable
      });
    }
    return element.dispatchEvent(event);
  };

  Engine.prototype.handleEvent = function(e) {
    return this.triggerEvent(e.type, e);
  };

  Engine.prototype.then = function(callback) {
    return this.once('solve', callback);
  };

  return Engine;

})();

Engine.prototype.Identity = (function() {
  function Identity() {
    this.set = __bind(this.set, this);
  }

  Identity.uid = 0;

  Identity.prototype.excludes = ['$'.charCodeAt(0), ':'.charCodeAt(0), '@'.charCodeAt(0)];

  Identity.prototype.set = function(object, generate) {
    var id;
    if (!object) {
      return '';
    }
    if (typeof object === 'string') {
      if (this.excludes.indexOf(object.charCodeAt(0)) === -1) {
        return '$' + object;
      }
      return object;
    }
    if (!(id = object._gss_id)) {
      if (object === document) {
        id = "::document";
      } else if (object === window) {
        id = "::window";
      }
      if (generate !== false) {
        object._gss_id = id || (id = "$" + (object.id || object._gss_uid || ++Identity.uid));
        this[id] = object;
      }
    }
    return id;
  };

  Identity.prototype.get = function(id) {
    return this[id];
  };

  Identity.prototype.solve = function(id) {
    return this[id];
  };

  Identity.prototype.unset = function(element) {
    var id;
    if (id = element._gss_id) {
      delete this[id];
      return element._gss_id = void 0;
    }
  };

  Identity.prototype.find = function(object) {
    return this.set(object, false);
  };

  return Identity;

})();

if ((typeof self !== "undefined" && self !== null) && !self.window && self.onmessage !== void 0) {
  self.addEventListener('message', function(e) {
    var commands, data, engine, property, removes, result, solution, value, values;
    if (!(engine = Engine.messenger)) {
      engine = Engine.messenger = new Engine();
    }
    data = e.data;
    values = void 0;
    commands = [];
    removes = [];
    solution = engine.solve(function() {
      var command, index, _i, _len, _ref;
      if ((values = data[0]) && !values.push) {
        for (index = _i = 0, _len = data.length; _i < _len; index = ++_i) {
          command = data[index];
          if (index) {
            if (command[0] === 'remove') {
              removes.push(command);
            } else {
              if (((_ref = command[0]) != null ? _ref.key : void 0) != null) {
                command[1].parent = command;
                command.index = command[0].index;
              }
              commands.push(command);
            }
          }
        }
      }
      if (removes.length) {
        this.solve(removes);
        if (this.updating.domains[0] === null) {
          this.broadcast(this.updating.problems[0]);
          this.updating.index++;
        }
      }
      if (values) {
        this.data.merge(values);
      }
      if (commands.length) {
        return this.solve(commands);
      }
    });
    result = {};
    if (values) {
      for (property in values) {
        value = values[property];
        result[property] = value;
      }
      for (property in solution) {
        value = solution[property];
        result[property] = value;
      }
    }
    if (!engine.domains.length) {
      engine.variables = {};
      engine.solver.operations = void 0;
    }
    return postMessage(result);
  });
}

Engine.prototype.console = new Engine.prototype.Console;

Engine.prototype.identity = new Engine.prototype.Identity;

Engine.prototype.identify = Engine.prototype.identity.set;

Engine.prototype.clone = function(object) {
  if (object && object.map) {
    return object.map(this.clone, this);
  }
  return object;
};

module.exports = Engine;



},{"./Command":15,"./Domain":16,"./Query":19,"./Update":20,"./domains/Data":26,"./domains/Input":27,"./domains/Linear":28,"./domains/Output":29,"./utilities/Console":30,"./utilities/Exporter":31,"./utilities/Inspector":32}],18:[function(require,module,exports){

/* Constructor: GSS
  Dispatches arguments by type
  When element is given, creates Document
  Otherwise creates abstract Engine
 */
var GSS;

GSS = function() {
  var argument, data, engine, id, index, parent, scope, url, _i, _len;
  for (index = _i = 0, _len = arguments.length; _i < _len; index = ++_i) {
    argument = arguments[index];
    if (!argument) {
      continue;
    }
    switch (typeof argument) {
      case 'object':
        if (argument.nodeType) {
          scope = argument;
        } else {
          data = argument;
        }
        break;
      case 'string':
      case 'boolean':
        url = argument;
    }
  }
  if (!(this instanceof GSS) && scope) {
    parent = scope;
    while (parent) {
      if (id = GSS.identity.find(parent)) {
        if (engine = GSS.Engine[id]) {
          return engine;
        }
      }
      if (!parent.parentNode) {
        break;
      }
      parent = parent.parentNode;
    }
  }
  if (scope && GSS.Document) {
    return new GSS.Document(data, url, scope);
  } else {
    return new GSS.Engine(data, url, scope);
  }
};

GSS.Engine = require('./Engine');

GSS.identity = GSS.Engine.prototype.identity;

GSS.identify = GSS.Engine.prototype.identify;

GSS.console = GSS.Engine.prototype.console;

module.exports = GSS;



},{"./Engine":17}],19:[function(require,module,exports){
var Command, Query,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __hasProp = {}.hasOwnProperty;

Command = require('./Command');

Query = (function(_super) {
  __extends(Query, _super);

  Query.prototype.type = 'Query';

  function Query(operation) {
    this.key = this.path = this.serialize(operation);
  }

  Query.prototype.ascend = function(engine, operation, continuation, scope, result, ascender, ascending) {
    var contd, node, parent, yielded, _base, _base1, _i, _len, _ref, _ref1;
    if (parent = operation.parent) {
      if (this.isCollection(result)) {
        for (_i = 0, _len = result.length; _i < _len; _i++) {
          node = result[_i];
          contd = this.fork(engine, continuation, node);
          if (yielded = typeof (_base = parent.command)["yield"] === "function" ? _base["yield"](node, engine, operation, contd, scope, ascender, ascending) : void 0) {
            if ((_ref = yielded.command) != null) {
              _ref.solve(yielded.domain || engine, yielded, contd, scope, -1, node);
            }
          } else {
            parent.command.solve(engine, parent, contd, scope, parent.indexOf(operation), node);
          }
        }
      } else {
        if (yielded = typeof (_base1 = parent.command)["yield"] === "function" ? _base1["yield"](result, engine, operation, continuation, scope, ascender, ascending) : void 0) {
          return (_ref1 = yielded.command) != null ? _ref1.solve(yielded.domain || engine, yielded, continuation, scope, -1, result) : void 0;
        } else if ((ascender != null) || !this.hidden || !this.reference) {
          return parent.command.solve(engine, parent, continuation, scope, parent.indexOf(operation), result);
        } else {
          return result;
        }
      }
    }
  };

  Query.prototype.serialize = function(operation) {
    var argument, cmd, index, length, start, string, _i, _ref;
    if (this.prefix != null) {
      string = this.prefix;
    } else {
      string = operation[0];
    }
    if (typeof operation[1] === 'object') {
      start = 2;
    }
    length = operation.length;
    for (index = _i = _ref = start || 1; _ref <= length ? _i < length : _i > length; index = _ref <= length ? ++_i : --_i) {
      if (argument = operation[index]) {
        if (cmd = argument.command) {
          string += cmd.key;
        } else {
          string += argument;
          if (length - 1 > index) {
            string += this.separator;
          }
        }
      }
    }
    if (this.suffix) {
      string += this.suffix;
    }
    return string;
  };

  Query.prototype.push = function(operation, context) {
    var arg, cmd, i, index, inherited, match, tag, tags, _i, _j, _k, _l, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
    if (context) {
      if (this.proxy) {
        this.proxied = context.command.path;
      }
      this.inherit(context.command, inherited, context);
    }
    for (index = _i = 1, _ref = operation.length; 1 <= _ref ? _i < _ref : _i > _ref; index = 1 <= _ref ? ++_i : --_i) {
      if (cmd = (_ref1 = operation[index]) != null ? _ref1.command : void 0) {
        inherited = this.inherit(cmd, inherited, context);
      }
    }
    if (tags = this.tags) {
      for (i = _j = 0, _len = tags.length; _j < _len; i = ++_j) {
        tag = tags[i];
        if (context) {
          if (cmd = context.command) {
            if ((((_ref2 = cmd.tags) != null ? _ref2.indexOf(tag) : void 0) > -1) && this.checkers[tag](this, cmd, operation, context, inherited)) {
              inherited = this.mergers[tag](this, cmd, operation, context);
            }
          }
        }
        match = true;
        for (index = _k = 1, _ref3 = operation.length; 1 <= _ref3 ? _k < _ref3 : _k > _ref3; index = 1 <= _ref3 ? ++_k : --_k) {
          if (cmd = (_ref4 = (arg = operation[index])) != null ? _ref4.command : void 0) {
            if (!(((_ref5 = cmd.tags) != null ? _ref5.indexOf(tag) : void 0) > -1) || !this.checkers[tag](this, cmd, operation, arg, inherited)) {
              match = false;
              break;
            }
          }
        }
        if (match) {
          inherited = false;
          for (index = _l = 1, _ref6 = operation.length; 1 <= _ref6 ? _l < _ref6 : _l > _ref6; index = 1 <= _ref6 ? ++_l : --_l) {
            if (cmd = (_ref7 = (arg = operation[index])) != null ? _ref7.command : void 0) {
              inherited = this.mergers[tag](this, cmd, operation, arg, inherited);
            }
          }
        }
      }
    }
    return this;
  };

  Query.prototype.inherit = function(command, inherited, context) {
    var path, proxied;
    if (command.scoped) {
      this.scoped = command.scoped;
    }
    if (path = command.path) {
      if (proxied = (proxied = this.proxied)) {
        path = path.slice(proxied.length);
      }
      if (inherited) {
        this.path += this.separator + path;
      } else {
        this.path = path + this.path;
      }
    }
    return true;
  };

  Query.prototype["continue"] = function(engine, operation, continuation) {
    if (continuation == null) {
      continuation = '';
    }
    return continuation + this.getKey(engine, operation, continuation);
  };

  Query.prototype.jump = function(engine, operation, continuation, scope, ascender, ascending) {
    var tail, _ref, _ref1;
    if (tail = this.tail) {
      if ((((_ref = tail[1]) != null ? (_ref1 = _ref.command) != null ? _ref1.key : void 0 : void 0) != null) && (ascender == null) && (continuation.lastIndexOf(this.PAIR) === continuation.indexOf(this.PAIR))) {
        return tail[1].command.solve(engine, tail[1], continuation, scope);
      }
    }
    return this.head.command.perform(engine, this.head, continuation, scope, ascender, ascending);
  };

  Query.prototype.prepare = function() {};

  Query.prototype.mergers = {};

  Query.prototype.checkers = {};

  Query.prototype.before = function(args, engine, operation, continuation, scope, ascender, ascending) {
    var alias, node, query, _ref, _ref1, _ref2, _ref3;
    node = ((_ref = args[0]) != null ? _ref.nodeType : void 0) === 1 ? args[0] : scope;
    query = this.getGlobalPath(engine, operation, continuation, node);
    alias = ((_ref1 = engine.updating.aliases) != null ? _ref1[query] : void 0) || query;
    if ((_ref2 = engine.updating.queries) != null ? _ref2.hasOwnProperty(alias) : void 0) {
      return engine.updating.queries[alias];
    }
    return (_ref3 = engine.updating.queries) != null ? _ref3[query] : void 0;
  };

  Query.prototype.after = function(args, result, engine, operation, continuation, scope) {
    var added, alias, aliases, child, index, isCollection, node, old, path, query, removed, updating, _base, _i, _j, _len, _len1, _ref, _ref1, _ref2;
    updating = engine.updating;
    node = this.precontextualize(engine, scope, args[0]);
    path = this.getLocalPath(engine, operation, continuation, node);
    if (!this.relative) {
      query = this.getGlobalPath(engine, operation, continuation, node);
      aliases = updating.aliases || (updating.aliases = {});
      if (!(alias = aliases[query]) || alias.length > path.length || !((_ref = updating.queries) != null ? _ref.hasOwnProperty(alias) : void 0)) {
        aliases[query] = path;
      }
    }
    old = this.get(engine, path);
    (updating.queries || (updating.queries = {}))[path] = result;
    if ((_ref1 = updating.snapshots) != null ? _ref1.hasOwnProperty(path) : void 0) {
      old = updating.snapshots[path];
    } else if ((old == null) && (result && result.length === 0) && continuation) {
      old = this.getCanonicalCollection(engine, path);
    }
    isCollection = this.isCollection(result);
    if (old) {
      if (this.isCollection(old)) {
        removed = void 0;
        for (index = _i = 0, _len = old.length; _i < _len; index = ++_i) {
          child = old[index];
          if (!old.scopes || ((_ref2 = old.scopes) != null ? _ref2[index] : void 0) === scope) {
            if (!result || Array.prototype.indexOf.call(result, child) === -1) {
              (removed || (removed = [])).push(child);
            }
          }
        }
      } else if (result !== old) {
        if (!result) {
          removed = old;
        }
        this.clean(engine, path, void 0, operation, scope);
      } else if (!this.unexpiring) {
        return;
      }
    }
    if (isCollection) {
      (_base = engine.queries)[path] || (_base[path] = []);
      added = void 0;
      for (_j = 0, _len1 = result.length; _j < _len1; _j++) {
        child = result[_j];
        if (!old || Array.prototype.indexOf.call(old, child) === -1) {
          (added || (added = [])).push(child);
          added.isCollection = true;
        }
      }
      if (result && result.item) {
        result = Array.prototype.slice.call(result, 0);
      }
    } else {
      added = result;
      removed = old;
    }
    if (this.write(engine, operation, continuation, scope, node, path, result, old, added, removed)) {
      this.set(engine, path, result);
    }
    return added;
  };

  Query.prototype.write = function(engine, operation, continuation, scope, node, path, result, old, added, removed) {
    if (result != null ? result.operations : void 0) {
      this.reduce(engine, operation, path, scope, void 0, void 0, void 0, continuation);
    } else {
      this.reduce(engine, operation, path, scope, added, removed, void 0, continuation);
    }
    this.subscribe(engine, operation, continuation, scope, node);
    this.snapshot(engine, path, old);
    if (result !== old) {
      return !(result != null ? result.push : void 0);
    }
  };

  Query.prototype.subscribe = function(engine, operation, continuation, scope, node) {
    var id, observers, _base, _base1;
    id = engine.identify(node);
    observers = (_base = engine.engine.observers)[id] || (_base[id] = []);
    if (engine.indexOfTriplet(observers, operation, continuation, scope) === -1) {
      if (typeof (_base1 = operation.command).prepare === "function") {
        _base1.prepare(operation);
      }
      return observers.push(operation, continuation, scope);
    }
  };

  Query.prototype.commit = function(engine, solution) {
    var collection, contd, deferred, i, index, item, mutations, old, op, watcher, _i, _ref;
    if (mutations = engine.updating.mutations) {
      engine.console.start('Queries', mutations.slice());
      index = 0;
      while (mutations[index]) {
        watcher = mutations.splice(0, 3);
        engine.input.solve(watcher[0], watcher[1], watcher[2]);
      }
      engine.updating.mutations = void 0;
      engine.console.end();
    }
    if (deferred = engine.updating.deferred) {
      index = 0;
      engine.console.start('Deferred', deferred);
      while (deferred[index]) {
        contd = deferred[index + 1];
        collection = this.get(engine, contd);
        op = deferred[index];
        if (!op.command.singular) {
          if (old = (_ref = engine.updating.snapshots) != null ? _ref[contd] : void 0) {
            collection = collection.slice();
            collection.isCollection = true;
            for (i = _i = collection.length - 1; _i >= 0; i = _i += -1) {
              item = collection[i];
              if (old.indexOf(item) > -1) {
                collection.splice(i, 1);
              }
            }
          }
          if (collection != null ? collection.length : void 0) {
            op.command.ascend(engine.input, op, contd, deferred[index + 2], collection);
          }
        } else {
          op.command.solve(engine.input, op, contd, deferred[index + 2], true);
        }
        index += 3;
      }
      engine.updating.deferred = void 0;
      engine.console.end();
    }
  };

  Query.prototype.add = function(engine, node, continuation, operation, scope, key, contd) {
    var collection, continuations, dup, duplicates, el, index, operations, parent, scopes, _base, _base1, _i, _j, _len, _len1, _ref;
    collection = (_base = engine.queries)[continuation] || (_base[continuation] = []);
    if (!collection.push) {
      return;
    }
    collection.isCollection = true;
    operations = collection.operations || (collection.operations = []);
    continuations = collection.continuations || (collection.continuations = []);
    scopes = collection.scopes || (collection.scopes = []);
    if (engine.pairs[continuation]) {
      ((_base1 = engine.updating).pairs || (_base1.pairs = {}))[continuation] = true;
    }
    this.snapshot(engine, continuation, collection);
    if ((index = collection.indexOf(node)) === -1) {
      for (index = _i = 0, _len = collection.length; _i < _len; index = ++_i) {
        el = collection[index];
        if (!this.comparePosition(el, node, operations[index], key)) {
          break;
        }
      }
      collection.splice(index, 0, node);
      operations.splice(index, 0, key);
      continuations.splice(index, 0, contd);
      scopes.splice(index, 0, scope);
      this.chain(engine, collection[index - 1], node, continuation);
      this.chain(engine, node, collection[index + 1], continuation);
      parent = operation;
      while (parent = parent.parent) {
        if (!(parent.command.sequence && parent[parent.length - 1] === operation)) {
          break;
        }
      }
      if (parent[0] === 'rule') {
        if (continuation === this.getCanonicalPath(continuation)) {
          if ((_ref = engine.Stylesheet) != null) {
            _ref.match(engine, node, continuation, true);
          }
        }
      }
      return true;
    } else if (!(scopes[index] === scope && continuations[index] === contd)) {
      duplicates = (collection.duplicates || (collection.duplicates = []));
      for (index = _j = 0, _len1 = duplicates.length; _j < _len1; index = ++_j) {
        dup = duplicates[index];
        if (dup === node) {
          if (scopes[index] === scope && continuations[index] === contd) {
            return;
          }
        }
      }
      duplicates.push(node);
      operations.push(key);
      continuations.push(contd);
      scopes.push(scope);
      return;
    }
    return collection;
  };

  Query.prototype.get = function(engine, continuation) {
    return engine.queries[continuation];
  };

  Query.prototype.unobserve = function(engine, id, path, continuation, scope) {
    var index, observers, query, refs, subscope, watcher, _base;
    if (typeof id === 'object') {
      observers = id;
      id = void 0;
    } else {
      if (!(observers = engine.observers[id])) {
        return;
      }
    }
    if (path !== true) {
      refs = this.getVariants(path);
    }
    index = 0;
    while (watcher = observers[index]) {
      query = observers[index + 1];
      if (refs && refs.indexOf(query) === -1) {
        index += 3;
        continue;
      }
      subscope = observers[index + 2];
      observers.splice(index, 3);
      if ((id != null) && (engine.identity[id] != null)) {
        if (typeof (_base = watcher.command).onClean === "function") {
          _base.onClean(engine, watcher, query, watcher, subscope);
        }
        this.clean(engine, watcher, query, watcher, subscope, continuation);
        if (!observers.length) {
          delete engine.observers[id];
        }
      }
    }
  };

  Query.prototype.snapshot = function(engine, key, collection) {
    var c, snapshots, _base;
    if ((snapshots = (_base = engine.updating).snapshots || (_base.snapshots = {})).hasOwnProperty(key)) {
      return;
    }
    if (collection != null ? collection.push : void 0) {
      c = collection.slice();
      if (collection.isCollection) {
        c.isCollection = true;
      }
      if (collection.duplicates) {
        c.duplicates = collection.duplicates.slice();
      }
      if (collection.scopes) {
        c.scopes = collection.scopes.slice();
      }
      if (collection.operations) {
        c.operations = collection.operations.slice();
      }
      collection = c;
    }
    return snapshots[key] = collection;
  };

  Query.prototype.defer = function(engine, operation, continuation, scope) {
    var _base;
    (_base = engine.updating).deferred || (_base.deferred = []);
    if (engine.indexOfTriplet(engine.updating.deferred, operation, continuation, scope) === -1) {
      return engine.updating.deferred.push(operation, continuation, scope);
    }
  };

  Query.prototype.removeFromCollection = function(engine, node, continuation, operation, scope, needle, contd) {
    var collection, continuations, dup, duplicate, duplicates, index, length, negative, operations, parent, refs, scopes, _i, _len, _ref;
    collection = this.get(engine, continuation);
    length = collection.length;
    operations = collection.operations;
    continuations = collection.continuations;
    scopes = collection.scopes;
    duplicate = null;
    refs = this.getVariants(contd);
    if ((duplicates = collection.duplicates)) {
      for (index = _i = 0, _len = duplicates.length; _i < _len; index = ++_i) {
        dup = duplicates[index];
        if (dup === node) {
          if (refs.indexOf(continuations[length + index]) > -1 && scopes[length + index] === scope) {
            this.snapshot(engine, continuation, collection);
            duplicates.splice(index, 1);
            operations.splice(length + index, 1);
            continuations.splice(length + index, 1);
            scopes.splice(length + index, 1);
            return false;
          } else {
            if (duplicate == null) {
              duplicate = index;
            }
          }
        }
      }
    }
    if (operation && length && (needle != null)) {
      this.snapshot(engine, continuation, collection);
      if ((index = collection.indexOf(node)) > -1) {
        if (operations) {
          negative = false;
          if (scopes[index] !== scope) {
            return null;
          }
          if (refs.indexOf(continuations[index]) === -1) {
            return null;
          }
          if (duplicate != null) {
            duplicates.splice(duplicate, 1);
            continuations[index] = continuations[duplicate + length];
            continuations.splice(duplicate + length, 1);
            operations[index] = operations[duplicate + length];
            operations.splice(duplicate + length, 1);
            scopes[index] = scopes[duplicate + length];
            scopes.splice(duplicate + length, 1);
            return false;
          }
        }
        collection.splice(index, 1);
        if (operations) {
          operations.splice(index, 1);
          continuations.splice(index, 1);
          scopes.splice(index, 1);
        }
        this.chain(engine, collection[index - 1], node, continuation);
        this.chain(engine, node, collection[index], continuation);
        parent = operation;
        while (parent = parent.parent) {
          if (!(parent.command.sequence && parent[parent.length - 1] === operation)) {
            break;
          }
        }
        if (parent[0] === 'rule') {
          if ((_ref = engine.Stylesheet) != null) {
            _ref.match(engine, node, continuation, false);
          }
        }
        return true;
      }
    }
    return false;
  };

  Query.prototype.remove = function(engine, id, continuation, operation, scope, needle, recursion, contd) {
    var collection, node, parent, ref, removed, _base, _base1;
    if (needle == null) {
      needle = operation;
    }
    if (contd == null) {
      contd = continuation;
    }
    if (typeof id === 'object') {
      node = id;
      id = engine.identity.find(id);
    } else {
      if (id.indexOf('"') > -1) {
        node = id;
      } else {
        node = engine.identity[id];
      }
    }
    if (engine.pairs[continuation]) {
      ((_base = engine.updating).pairs || (_base.pairs = {}))[continuation] = true;
    }
    collection = this.get(engine, continuation);
    if (collection && this.isCollection(collection)) {
      this.snapshot(engine, continuation, collection);
      removed = this.removeFromCollection(engine, node, continuation, operation, scope, needle, contd);
    }
    if (removed !== false) {
      if (this.isCollection(collection)) {
        ref = continuation + id;
      } else {
        ref = continuation;
      }
      if (parent = operation != null ? operation.parent : void 0) {
        if (typeof (_base1 = parent.command).release === "function") {
          _base1.release(node, engine, operation, ref, scope);
        }
      }
      this.unobserve(engine, id, ref, ref);
      if (recursion !== continuation) {
        if (removed !== false) {
          this.reduce(engine, operation, continuation, scope, recursion, node, continuation, contd);
        }
        if (removed) {
          this.clean(engine, continuation + id, void 0, void 0, node.scoped && node.parentNode);
        }
      }
    }
    return removed;
  };

  Query.prototype.getKey = function() {
    return this.key || '';
  };

  Query.prototype.clean = function(engine, path, continuation, operation, scope, contd) {
    var command, key, result;
    if (contd == null) {
      contd = continuation;
    }
    if (command = path.command) {
      if (key = command.getKey(engine, operation, continuation)) {
        path = continuation + key;
      } else {
        path = this.delimit(continuation);
      }
    }
    if ((result = this.get(engine, path)) !== void 0) {
      this.each(this.remove, engine, result, path, operation, scope, operation, false, contd);
    }
    this.set(engine, path, void 0);
    if (engine.updating.mutations) {
      this.unobserve(engine, engine.updating.mutations, path);
    }
    this.unobserve(engine, engine.identify(scope || engine.scope), path);
    if (!result || !this.isCollection(result)) {
      engine.triggerEvent('remove', path);
    }
    return true;
  };

  Query.prototype.chain = function(engine, left, right, continuation) {
    if (left) {
      this.match(engine, left, ':last', '*', void 0, continuation);
      this.match(engine, left, ':next', '*', void 0, continuation);
    }
    if (right) {
      this.match(engine, right, ':previous', '*', void 0, continuation);
      return this.match(engine, right, ':first', '*', void 0, continuation);
    }
  };

  Query.prototype.reduce = function(engine, operation, path, scope, added, removed, recursion, contd) {
    var oppath;
    oppath = this.getCanonicalPath(path);
    if (path !== oppath && recursion !== oppath) {
      this.collect(engine, operation, oppath, scope, added, removed, oppath, path);
    }
    return this.collect(engine, operation, path, scope, added, removed, recursion, contd || '');
  };

  Query.prototype.collect = function(engine, operation, path, scope, added, removed, recursion, contd) {
    var collection, i, index, node, self, sorted, updated, _i, _len, _ref, _results;
    if (removed) {
      this.each(this.remove, engine, removed, path, operation, scope, operation, recursion, contd);
    }
    if (added) {
      this.each(this.add, engine, added, path, operation, scope, operation, contd);
    }
    if ((_ref = (collection = this.get(engine, path))) != null ? _ref.operations : void 0) {
      self = this;
      sorted = collection.slice().sort(function(a, b) {
        var i, j;
        i = collection.indexOf(a);
        j = collection.indexOf(b);
        return self.comparePosition(a, b, collection.operations[i], collection.operations[j]) && -1 || 1;
      });
      updated = void 0;
      _results = [];
      for (index = _i = 0, _len = sorted.length; _i < _len; index = ++_i) {
        node = sorted[index];
        if (node !== collection[index]) {
          if (!updated) {
            updated = collection.slice();
            this.set(engine, path, updated);
            updated.operations = collection.operations.slice();
            updated.continuations = collection.continuations.slice();
            updated.scopes = collection.scopes.slice();
            updated.duplicates = collection.duplicates;
            updated.isCollection = collection.isCollection;
            updated[index] = node;
          }
          i = collection.indexOf(node);
          updated[index] = node;
          updated.operations[index] = collection.operations[i];
          updated.continuations[index] = collection.continuations[i];
          updated.scopes[index] = collection.scopes[i];
          this.chain(engine, sorted[index - 1], node, path);
          _results.push(this.chain(engine, node, sorted[index + 1], path));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

  Query.prototype.each = function(method, engine, result, continuation, operation, scope, needle, recursion, contd) {
    var child, copy, returned, _i, _len;
    if (result == null) {
      result = void 0;
    }
    if (this.isCollection(result)) {
      copy = result.slice();
      returned = void 0;
      for (_i = 0, _len = copy.length; _i < _len; _i++) {
        child = copy[_i];
        if (method.call(this, engine, child, continuation, operation, scope, needle, recursion, contd)) {
          returned = true;
        }
      }
      return returned;
    } else if (result && typeof result !== 'number') {
      return method.call(this, engine, result, continuation, operation, scope, needle, recursion, contd);
    }
  };

  Query.prototype.set = function(engine, path, result) {
    var left, observers, old, _base, _ref;
    old = engine.queries[path];
    this.snapshot(engine, path, old);
    if (result != null) {
      engine.queries[path] = result;
    } else if (engine.queries.hasOwnProperty(path)) {
      delete engine.queries[path];
      if (engine.updating.branching) {
        engine.updating.branching.push(path);
      }
    }
    path = this.getCanonicalPath(path);
    _ref = engine.pairs;
    for (left in _ref) {
      observers = _ref[left];
      if (observers.indexOf(path) > -1) {
        ((_base = engine.updating).pairs || (_base.pairs = {}))[left] = true;
      }
    }
  };

  Query.prototype.onLeft = function(engine, operation, parent, continuation, scope) {
    var left;
    left = this.getCanonicalPath(continuation);
    if (engine.indexOfTriplet(engine.lefts, parent, left, scope) === -1) {
      parent.right = operation;
      engine.lefts.push(parent, left, scope);
      return this.rewind;
    } else {
      (engine.pairing || (engine.pairing = {}))[left] = true;
      return this.nothing;
    }
  };

  Query.prototype.nothing = function() {};

  Query.prototype.onRight = function(engine, operation, parent, continuation, scope, left, right) {
    var index, op, pairs, pushed, _base, _base1, _i, _len, _ref;
    right = this.getCanonicalPath(continuation.substring(0, continuation.length - 1));
    _ref = engine.lefts;
    for (index = _i = 0, _len = _ref.length; _i < _len; index = _i += 3) {
      op = _ref[index];
      if (op === parent && engine.lefts[index + 2] === scope) {
        left = engine.lefts[index + 1];
        this.listen(engine, operation, continuation, scope, left, right);
      }
    }
    if (!left) {
      return;
    }
    left = this.getCanonicalPath(left);
    pairs = (_base = engine.pairs)[left] || (_base[left] = []);
    if (pairs.indexOf(right) === -1) {
      pushed = pairs.push(right, operation, scope);
    }
    if (engine.updating.pairs !== false) {
      ((_base1 = engine.updating).pairs || (_base1.pairs = {}))[left] = true;
    }
    return this.nothing;
  };

  Query.prototype.retrieve = function(engine, operation, continuation, scope, ascender, ascending, single) {
    var contd, index, last, parent, prev, result;
    last = continuation.lastIndexOf(this.PAIR);
    if (last > -1 && !operation.command.reference) {
      prev = -1;
      while ((index = continuation.indexOf(this.PAIR, prev + 1)) > -1) {
        if (result = this.retrieve(engine, operation, continuation.substring(prev + 1, index), scope, ascender, ascending, true)) {
          return result;
        }
        prev = index;
      }
      if (last === continuation.length - 1 && ascending) {
        parent = this.getRoot(operation);
        if (!parent.right || parent.right === operation) {
          return this.onLeft(engine, operation, parent, continuation, scope, ascender, ascending);
        } else {
          return this.onRight(engine, operation, parent, continuation, scope, ascender, ascending);
        }
      }
    } else {
      if (continuation.length === 1) {
        return;
      }
      contd = this.getCanonicalPath(continuation, true);
      if (contd.charAt(0) === this.PAIR) {
        contd = contd.substring(1);
      }
      if (contd === operation.command.path) {
        return this.getByPath(engine, continuation);
      }
    }
  };

  Query.prototype.repair = function(engine, reversed) {
    var dirty, index, pair, pairs, property, value, _i, _len, _ref;
    if (!(dirty = engine.updating.pairs)) {
      return;
    }
    engine.console.start('Pairs', dirty);
    engine.updating.pairs = false;
    for (property in dirty) {
      value = dirty[property];
      if (pairs = (_ref = engine.pairs[property]) != null ? _ref.slice() : void 0) {
        for (index = _i = 0, _len = pairs.length; _i < _len; index = _i += 3) {
          pair = pairs[index];
          this.pair(engine, property, pair, pairs[index + 1], pairs[index + 2], reversed);
        }
      }
    }
    engine.updating.pairs = void 0;
    return engine.console.end();
  };

  Query.prototype.count = function(value) {
    if (value != null ? value.push : void 0) {
      return value.length;
    } else {
      return (value != null) && 1 || 0;
    }
  };

  Query.prototype.pad = function(value, length) {
    var i, result, _i;
    if (value && !value.push) {
      result = [];
      for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
        result.push(value);
      }
      result.single = true;
      return result;
    } else if (value != null ? value.splice : void 0) {
      return value.slice();
    } else {
      return value || [];
    }
  };

  Query.prototype.restore = function(engine, path) {
    var _ref;
    if ((_ref = engine.updating.snapshots) != null ? _ref.hasOwnProperty(path) : void 0) {
      return engine.updating.snapshots[path];
    } else {
      return this.get(engine, path);
    }
  };

  Query.prototype.fetch = function(engine, path, reversed) {
    if (reversed) {
      return this.restore(engine, path);
    } else {
      return this.get(engine, path);
    }
  };

  Query.prototype.pair = function(engine, left, right, operation, scope, reversed) {
    var I, J, added, cleaned, cleaning, contd, el, index, leftNew, leftOld, object, op, pair, removed, rightNew, rightOld, root, solved, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _n, _ref, _ref1;
    root = this.getRoot(operation);
    right = this.getPrefixPath(engine, left) + root.right.command.path;
    if (reversed) {
      leftOld = engine.updating.queries.hasOwnProperty(left) ? engine.updating.queries[left] : this.restore(engine, left);
      rightOld = engine.updating.queries.hasOwnProperty(right) ? engine.updating.queries[right] : this.restore(engine, right);
    } else {
      leftNew = this.get(engine, left);
      rightNew = this.get(engine, right);
      leftOld = this.restore(engine, left);
      rightOld = this.restore(engine, right);
    }
    if (operation.command.singular) {
      if (leftNew != null ? leftNew.push : void 0) {
        leftNew = leftNew[0];
      }
      if (leftOld != null ? leftOld.push : void 0) {
        leftOld = leftOld[0];
      }
    }
    if (root.right.command.singular) {
      if (rightNew != null ? rightNew.push : void 0) {
        rightNew = rightNew[0];
      }
      if (rightOld != null ? rightOld.push : void 0) {
        rightOld = rightOld[0];
      }
    }
    I = Math.max(this.count(leftNew), this.count(rightNew));
    J = Math.max(this.count(leftOld), this.count(rightOld));
    leftNew = this.pad(leftNew, I);
    leftOld = this.pad(leftOld, J);
    rightNew = this.pad(rightNew, I);
    rightOld = this.pad(rightOld, J);
    removed = [];
    added = [];
    for (index = _i = 0, _len = leftOld.length; _i < _len; index = ++_i) {
      object = leftOld[index];
      if (leftNew[index] !== object || rightOld[index] !== rightNew[index]) {
        if (rightOld && rightOld[index]) {
          removed.push([object, rightOld[index]]);
        }
        if (leftNew[index] && rightNew[index]) {
          added.push([leftNew[index], rightNew[index]]);
        }
      }
    }
    if (leftOld.length < leftNew.length) {
      for (index = _j = _ref = leftOld.length, _ref1 = leftNew.length; _j < _ref1; index = _j += 1) {
        if (rightNew[index]) {
          added.push([leftNew[index], rightNew[index]]);
        }
      }
    }
    cleaned = [];
    for (_k = 0, _len1 = removed.length; _k < _len1; _k++) {
      pair = removed[_k];
      if (!pair[0] || !pair[1]) {
        continue;
      }
      contd = left;
      contd += engine.identify(pair[0]);
      contd += this.PAIR;
      contd += root.right.command.path;
      contd += engine.identify(pair[1]);
      cleaned.push(contd);
    }
    solved = [];
    for (_l = 0, _len2 = added.length; _l < _len2; _l++) {
      pair = added[_l];
      contd = left;
      contd += engine.identify(pair[0]);
      contd += this.PAIR;
      contd += root.right.command.path;
      contd += engine.identify(pair[1]);
      if ((index = cleaned.indexOf(contd)) > -1) {
        cleaned.splice(index, 1);
      } else {
        op = operation.parent;
        engine.input.solve(op, contd + this.PAIR, scope, true);
      }
    }
    for (_m = 0, _len3 = cleaned.length; _m < _len3; _m++) {
      contd = cleaned[_m];
      this.clean(engine, contd);
    }
    cleaning = true;
    for (_n = 0, _len4 = leftNew.length; _n < _len4; _n++) {
      el = leftNew[_n];
      if (el) {
        cleaning = false;
        break;
      }
    }
    if (cleaning) {
      return this.unpair(engine, left, scope, operation);
    }
  };

  Query.prototype.unpair = function(engine, left, scope, operation) {
    var contd, index, pairs, _ref;
    if (pairs = (_ref = engine.pairs) != null ? _ref[left] : void 0) {
      delete engine.pairs[left];
    }
    index = 0;
    while (contd = engine.lefts[index + 1]) {
      if (contd === left && engine.lefts[index + 2] === scope) {
        engine.lefts.splice(index, 3);
      } else {
        index += 3;
      }
    }
    return this;
  };

  Query.prototype.listen = function(engine, operation, continuation, scope, left, right) {
    var observers, _base;
    observers = (_base = engine.pairs)[left] || (_base[left] = []);
    if (engine.indexOfTriplet(observers, right, operation, scope) === -1) {
      return observers.push(right, operation, scope);
    }
  };

  Query.prototype.unlisten = function(engine, operation, continuation, scope, left, right) {
    var index, observers, _base;
    observers = (_base = engine.pairs)[left] || (_base[left] = []);
    if ((index = engine.indexOfTriplet(observers, right, operation, scope)) !== -1) {
      return observers.splice(index, 3);
    }
  };

  Query.prototype.getScope = function(engine, node, continuation) {
    var index, parent, path, scope;
    if (!node) {
      if ((index = continuation.lastIndexOf('$')) > -1) {
        if (path = this.getScopePath(continuation, 0)) {
          if (scope = this.getByPath(engine, path)) {
            if (scope.scoped) {
              if ((parent = engine.getScopeElement(scope.parentNode)) === engine.scope) {
                return;
              }
              return parent;
            }
            return scope._gss_id;
          }
        }
        if (scope = engine.scope) {
          return scope.gss_id;
        }
      }
    } else if (node !== engine.scope) {
      return node._gss_id || node;
    }
  };

  Query.prototype.getScopePath = function(continuation, level, virtualize) {
    var index, last;
    if (level == null) {
      level = 0;
    }
    last = continuation.length - 1;
    if (continuation.charCodeAt(last) === 8594) {
      last = continuation.lastIndexOf(this.DESCEND, last);
    }
    while (true) {
      if ((index = continuation.lastIndexOf(this.DESCEND, last)) === -1) {
        if (level > -1) {
          return '';
        }
      }
      if (continuation.charCodeAt(index + 1) === 64) {
        if (virtualize && level === -1) {
          break;
        } else {
          ++level;
        }
      }
      if (level === -1) {
        break;
      }
      last = index - 1;
      --level;
    }
    return continuation.substring(0, last + 1);
  };

  Query.prototype.getPrefixPath = function(engine, continuation, level) {
    var path;
    if (level == null) {
      level = 0;
    }
    if (path = this.getScopePath(continuation, level, true)) {
      return path + this.DESCEND;
    }
    return '';
  };

  Query.prototype.getParentScope = function(engine, scope, continuation, level) {
    var path, result;
    if (level == null) {
      level = 1;
    }
    if (!continuation) {
      return scope._gss_id;
    }
    if (path = this.getScopePath(continuation, level)) {
      if (result = this.getByPath(engine, path)) {
        if (result.scoped) {
          result = engine.getScopeElement(result);
        }
      }
      return result;
    }
    return engine.scope;
  };

  Query.prototype.getByPath = function(engine, path) {
    var id, j, last;
    if ((j = path.lastIndexOf('$')) > -1 && j > path.lastIndexOf(this.DESCEND)) {
      id = path.substring(j);
      last = id.length - 1;
      if (this.DELIMITERS.indexOf(id.charCodeAt(last)) > -1) {
        id = id.substring(0, last);
      }
      if (id.indexOf('"') > -1) {
        return id;
      }
    }
    return engine.identity[id] || this.get(engine, path);
  };

  Query.prototype.getCanonicalPath = function(continuation, compact) {
    var PopDirectives, RemoveForkMarks, bits, last;
    PopDirectives = Query.PopDirectives || (Query.PopDirectives = new RegExp("(?:" + "@[^@" + this.DESCEND + "]+" + this.DESCEND + ")+$", "g"));
    bits = this.delimit(continuation.replace(PopDirectives, '')).split(this.DESCEND);
    last = bits[bits.length - 1];
    RemoveForkMarks = Query.RemoveForkMarks || (Query.RemoveForkMarks = new RegExp("" + "([^" + this.PAIR + ",@])" + "\\$[^\[" + this.ASCEND + "]+" + "(?:" + this.ASCEND + "|$)", "g"));
    last = bits[bits.length - 1] = last.replace(RemoveForkMarks, '$1');
    if (compact) {
      return last;
    }
    return bits.join(this.DESCEND);
  };

  Query.prototype.getVariants = function(path) {
    return [path, path + this.ASCEND, path + this.PAIR, path + this.DESCEND, path + this.DESCEND + '&'];
  };

  Query.prototype.getCanonicalCollection = function(engine, path) {
    return engine.queries[this.getCanonicalPath(path)];
  };

  Query.prototype.getLocalPath = function(engine, operation, continuation) {
    return this["continue"](engine, operation, continuation);
  };

  Query.prototype.getGlobalPath = function(engine, operation, continuation, node) {
    return engine.identify(node) + ' ' + this.getKey(engine, operation, continuation, node);
  };

  Query.prototype.comparePosition = function(a, b, op1, op2) {
    var i, index, j, left, next, parent, right;
    if (op1 !== op2) {
      parent = op1.parent;
      i = parent.indexOf(op1);
      j = parent.indexOf(op2);
      if (i > j) {
        left = op2;
        right = op1;
      } else {
        left = op1;
        right = op2;
      }
      index = i;
      while (next = parent[++index]) {
        if (next === right) {
          break;
        }
        if (next[0] === 'virtual') {
          return i < j;
        }
      }
      if (!(a.nodeType && b.nodeType)) {
        return i < j;
      }
    }
    if (a.compareDocumentPosition) {
      return a.compareDocumentPosition(b) & 4;
    }
    return a.sourceIndex < b.sourceIndex;
  };

  Query.prototype.match = function(engine, node, group, qualifier, changed, continuation) {
    var change, contd, groupped, id, index, operation, path, scope, watchers, _i, _j, _len, _len1;
    if (!(id = engine.identify(node))) {
      return;
    }
    if (!(watchers = engine.observers[id])) {
      return;
    }
    if (continuation) {
      path = this.getCanonicalPath(continuation);
    }
    for (index = _i = 0, _len = watchers.length; _i < _len; index = _i += 3) {
      operation = watchers[index];
      if (groupped = operation.command[group]) {
        contd = watchers[index + 1];
        if (path && path !== this.getCanonicalPath(contd)) {
          continue;
        }
        scope = watchers[index + 2];
        if (qualifier) {
          this.qualify(engine, operation, contd, scope, groupped, qualifier);
        } else if (changed.nodeType) {
          this.qualify(engine, operation, contd, scope, groupped, changed.tagName, '*');
        } else if (typeof changed === 'string') {
          this.qualify(engine, operation, contd, scope, groupped, changed, '*');
        } else {
          for (_j = 0, _len1 = changed.length; _j < _len1; _j++) {
            change = changed[_j];
            if (typeof change === 'string') {
              this.qualify(engine, operation, contd, scope, groupped, change, '*');
            } else {
              this.qualify(engine, operation, contd, scope, groupped, change.tagName, '*');
            }
          }
        }
      }
    }
  };

  Query.prototype.qualify = function(engine, operation, continuation, scope, groupped, qualifier, fallback) {
    var indexed;
    if ((indexed = groupped[qualifier]) || (fallback && groupped[fallback])) {
      this.schedule(engine, operation, continuation, scope);
    }
  };

  Query.prototype.notify = function(engine, continuation, scope) {
    var index, watcher, watchers, _i, _len;
    if (watchers = engine.observers[engine.identify(scope)]) {
      for (index = _i = 0, _len = watchers.length; _i < _len; index = _i += 3) {
        watcher = watchers[index];
        if (watchers[index + 1] + watcher.command.key === continuation) {
          this.schedule(engine, watcher, continuation, scope);
        }
      }
    }
  };

  Query.prototype.continuate = function(engine, scope) {
    var contd, index, scoped, watcher, watchers, _i, _len;
    if (watchers = engine.observers[engine.identify(scope)]) {
      for (index = _i = 0, _len = watchers.length; _i < _len; index = _i += 3) {
        watcher = watchers[index];
        scoped = watchers[index + 2];
        contd = watcher.command["continue"](engine, watcher, watchers[index + 1], scoped);
        this.schedule(engine, watcher, contd, scoped);
      }
    }
  };

  Query.prototype.uncontinuate = function(engine, scope) {
    var index, watcher, watchers, _i, _len;
    if (watchers = engine.observers[engine.identify(scope)]) {
      for (index = _i = 0, _len = watchers.length; _i < _len; index = _i += 3) {
        watcher = watchers[index];
        this.clean(engine, watcher, this.delimit(watchers[index + 1]), watcher, watchers[index + 2]);
      }
    }
  };

  Query.prototype.schedule = function(engine, operation, continuation, scope) {
    var contd, index, last, length, mutations, other, stylesheet, watcher, _base, _i, _len;
    mutations = (_base = engine.updating).mutations || (_base.mutations = []);
    length = (continuation || '').length;
    last = null;
    stylesheet = operation.stylesheet;
    for (index = _i = 0, _len = mutations.length; _i < _len; index = _i += 3) {
      watcher = mutations[index];
      contd = mutations[index + 1] || '';
      if (watcher === operation && continuation === contd && scope === mutations[index + 2]) {
        return;
      }
      if (other = stylesheet) {
        if ((last == null) && !this.comparePosition(other, stylesheet, operation, operation)) {
          last = index + 3;
        }
      } else if (contd.length < length) {
        last = index + 3;
      }
    }
    return mutations.splice(last != null ? last : 0, 0, operation, continuation, scope);
  };

  Query.prototype.branch = function(engine) {
    var condition, conditions, index, next, number, op, path, prefix, queries, rebranches, removed, snapshots, unbranches, _base, _base1, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m;
    if (conditions = engine.updating.branches) {
      engine.console.start('Branches', conditions.slice());
      engine.updating.branches = void 0;
      removed = engine.updating.branching = [];
      rebranches = [];
      unbranches = [];
      for (index = _i = 0, _len = conditions.length; _i < _len; index = _i += 3) {
        condition = conditions[index];
        if (condition.command.unbranch(engine, condition, conditions[index + 1], conditions[index + 2])) {
          op = condition;
          while (next = op.command.next) {
            if (prefix = this.getPrefixPath(engine, conditions[index + 1])) {
              prefix += this.DESCEND;
            }
            path = prefix + next.command.key;
            if (engine.indexOfTriplet(conditions, next, path, conditions[index + 2]) === -1) {
              if (next.command.getOldValue(engine, path)) {
                if (next.command.getOldValue(engine, conditions[index + 1])) {
                  rebranches.push(next, path, conditions[index + 2]);
                } else {
                  unbranches.push(next, path, conditions[index + 2]);
                }
                break;
              }
            }
            op = next;
          }
          engine.queries[conditions[index + 1]] = 0;
        }
      }
      for (index = _j = 0, _len1 = unbranches.length; _j < _len1; index = _j += 3) {
        condition = unbranches[index];
        number = engine.queries[unbranches[index + 1]];
        this.clean(engine, unbranches[index + 1], unbranches[index + 1], unbranches[index], unbranches[index + 2]);
        engine.queries[unbranches[index + 1]] = 0;
      }
      engine.triggerEvent('branch');
      queries = (_base = engine.updating).queries || (_base.queries = {});
      snapshots = (_base1 = engine.updating).snapshots || (_base1.snapshots = {});
      this.repair(engine, true);
      engine.updating.branching = void 0;
      for (_k = 0, _len2 = removed.length; _k < _len2; _k++) {
        path = removed[_k];
        if (conditions.indexOf(path) > -1) {
          continue;
        }
        if (snapshots) {
          delete snapshots[path];
        }
        if (queries) {
          delete queries[path];
        }
      }
      for (index = _l = 0, _len3 = conditions.length; _l < _len3; index = _l += 3) {
        condition = conditions[index];
        condition.command.rebranch(engine, condition, conditions[index + 1], conditions[index + 2]);
      }
      for (index = _m = 0, _len4 = rebranches.length; _m < _len4; index = _m += 3) {
        condition = rebranches[index];
        condition.command.branch(engine, condition, rebranches[index + 1], rebranches[index + 2]);
      }
      return engine.console.end();
    }
  };

  Query.prototype.isCollection = function(object) {
    if (object && object.length !== void 0 && !object.substring && !object.nodeType) {
      if (object.isCollection) {
        return true;
      }
      switch (typeof object[0]) {
        case "object":
          return object[0].nodeType;
        case "undefined":
          return object.length === 0;
      }
    }
  };

  Query.prototype.Sequence = Command.Sequence;

  return Query;

})(Command);

module.exports = Query;



},{"./Command":15}],20:[function(require,module,exports){
var Update, Updater,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Updater = function(engine) {
  var Update, property, value, _ref;
  Update = function(problem, domain, parent, Domain, Auto) {
    var arg, index, object, result, update, vardomain, _i, _len;
    if (this instanceof Update) {
      this.problems = problem && (domain.push && problem || [problem]) || [];
      this.domains = domain && (domain.push && domain || [domain]) || [];
      return;
    }
    update = void 0;
    if (typeof problem[0] === 'string') {
      if (!this.solver.signatures[problem[0]]) {
        Domain = this.output;
      }
    }
    for (index = _i = 0, _len = problem.length; _i < _len; index = ++_i) {
      arg = problem[index];
      if (!(arg != null ? arg.push : void 0)) {
        continue;
      }
      if (!(arg[0] instanceof Array)) {
        arg.parent || (arg.parent = problem);
        if (arg[0] === 'get') {
          vardomain = arg.domain || (arg.domain = this.getVariableDomain(arg, Domain));
          (update || (update = new this.update)).push([arg], vardomain);
        } else {
          if (result = this.update(arg, domain, update || false, Domain)) {
            update || (update = result);
          }
        }
        object = true;
      }
    }
    if (!object) {
      if (!(problem instanceof Array)) {
        update.push([problem], null);
      }
    }
    if (!(problem[0] instanceof Array)) {
      if (update) {
        update.wrap(problem, parent, domain || Domain);
      } else if (problem[0] !== 'remove') {
        if (Domain) {
          problem.domain = Domain;
        }
        return;
      } else {
        update = new this.update([problem], [domain || Domain || null]);
      }
    }
    if (parent === false) {
      return update;
    } else if (parent || (parent = this.updating)) {
      return parent.push(update);
    } else {
      return update.each(this.resolve, this);
    }
  };
  if (this.prototype) {
    _ref = this.prototype;
    for (property in _ref) {
      value = _ref[property];
      Update.prototype[property] = value;
    }
  }
  if (engine) {
    Update.prototype.engine = engine;
  }
  return Update;
};

Update = Updater();

Update.compile = Updater;

Update.prototype = {
  push: function(problems, domain, reverse) {
    var index, other, position, _i, _len, _ref;
    if (domain === void 0) {
      _ref = problems.domains;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        domain = _ref[index];
        this.push(problems.problems[index], domain);
      }
      return this;
    }
    if ((position = this.domains.indexOf(domain, this.index + 1)) > -1) {
      return this.append(position, problems, reverse);
    }
    if (!domain) {
      position = this.index + 1;
    } else {
      position = this.domains.length;
      while (position - 1 > this.index && (other = this.domains[position - 1])) {
        if (!(other.priority < domain.priority || (reverse && this.problems[position - 1][0][0] !== 'remove'))) {
          break;
        }
        --position;
      }
    }
    this.insert(position, domain, problems);
    return position;
  },
  append: function(position, problems, reverse) {
    var cmds, domain, problem, _i, _len;
    cmds = this.problems[position];
    domain = this.domains[position];
    this.mix(cmds, problems);
    for (_i = 0, _len = problems.length; _i < _len; _i++) {
      problem = problems[_i];
      if (domain) {
        this.setVariables(cmds, problem);
        this.reify(problem, domain);
      }
    }
    if (domain) {
      return this.connect(position);
    }
  },
  insert: function(position, domain, problems) {
    var problem, property, variable, variables, _i, _len;
    for (_i = 0, _len = problems.length; _i < _len; _i++) {
      problem = problems[_i];
      this.setVariables(problems, problem);
    }
    this.domains.splice(position, 0, domain);
    this.problems.splice(position, 0, problems);
    if (variables = this.variables) {
      for (property in variables) {
        variable = variables[property];
        if (variable >= position) {
          variables[property]++;
        }
      }
    }
    this.reify(problems, domain);
    return this.connect(position);
  },
  splice: function(index) {
    var domain, name, variable, _ref;
    domain = this.domains[index];
    this.domains.splice(index, 1);
    this.problems.splice(index, 1);
    if (this.variables) {
      _ref = this.variables;
      for (name in _ref) {
        variable = _ref[name];
        if (variable >= index) {
          if (variable === index) {
            this.variables[name] = void 0;
          } else {
            this.variables[name] = variable - 1;
          }
        }
      }
    }
  },
  wrap: function(operation, parent, Domain, Auto) {
    var argument, domain, i, index, j, other, position, positions, problems, signed, _i, _j, _k, _l, _len, _len1, _len2, _len3, _m, _ref;
    positions = void 0;
    _ref = this.problems;
    for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
      problems = _ref[index];
      if (domain = this.domains[index]) {
        signed = typeof operation[0] !== 'string' || domain.signatures[operation[0]];
        for (_j = 0, _len1 = operation.length; _j < _len1; _j++) {
          argument = operation[_j];
          if (signed && problems.indexOf(argument) > -1) {
            if (!other || (domain.Engine && !other.Engine)) {
              position = index;
              other = domain;
            }
          }
          if (!positions || positions.indexOf(index) === -1) {
            (positions || (positions = [])).push(index);
          }
        }
      }
    }
    if (!other || (Domain && other.displayName !== Domain.displayName)) {
      other = Domain;
      position = this.push([operation], other);
    }
    if (!positions) {
      this.push([operation], null);
      return;
    }
    for (j = _k = positions.length - 1; _k >= 0; j = _k += -1) {
      index = positions[j];
      if ((domain = this.domains[index]).displayName !== other.displayName) {
        positions.splice(j, 1);
      } else {
        problems = this.problems[index];
        for (_l = 0, _len2 = operation.length; _l < _len2; _l++) {
          argument = operation[_l];
          if ((i = problems.indexOf(argument)) > -1) {
            if (argument.push) {
              this.reify(argument, other, domain);
            }
            if (index === position && problems.indexOf(operation) === -1) {
              problems[i] = operation;
              positions.splice(j, 1);
              operation.domain = domain;
            } else {
              problems.splice(i, 1);
              if (problems.length === 0 && !domain.paths) {
                this.splice(index, 1);
                if (index < position) {
                  position--;
                }
                positions.splice(j, 1);
              }
            }
          }
        }
      }
    }
    if (other) {
      operation.domain = other;
      for (_m = 0, _len3 = operation.length; _m < _len3; _m++) {
        argument = operation[_m];
        if (argument.push) {
          operation.variables = argument.variables = this.setVariables(operation, argument, true);
        }
      }
      this.setVariables(this.problems[position], operation);
    }
    if (positions.length) {
      return this.connect(position, positions);
    } else {
      return this.connect(position);
    }
  },
  match: function(target, domain, positions) {
    var Solver, i, index, problems, property, variable, variables, _ref;
    problems = this.problems[target];
    variables = this.variables || (this.variables = {});
    if (Solver = domain.Engine) {
      _ref = problems.variables;
      for (property in _ref) {
        variable = _ref[property];
        if (variable.domain.Engine === Solver) {
          if (((i = variables[property]) != null) && (i !== target)) {
            if (__indexOf.call((positions || (positions = [])), i) < 0) {
              index = 0;
              while (positions[index] < i) {
                index++;
              }
              positions.splice(index, 0, i);
            }
          } else {
            variables[property] = target;
          }
        }
      }
    }
    return positions;
  },
  connect: function(target, positions) {
    var a, b, condition, domain, from, i, index, j, to, _i, _j, _ref, _ref1, _ref2;
    if (!(domain = this.domains[target])) {
      return;
    }
    if (positions || (positions = this.match(target, domain, positions))) {
      b = domain.constraints;
      for (index = _i = 0, _ref = positions.length; _i < _ref; index = _i += 1) {
        i = positions[index];
        a = this.domains[i].constraints;
        condition = a || b ? (a && a.length) < (b && b.length) : target < i;
        if (condition) {
          from = i;
          to = target;
        } else {
          from = target;
          to = i;
        }
        target = this.merge(from, to);
        for (j = _j = _ref1 = index + 1, _ref2 = positions.length; _j < _ref2; j = _j += 1) {
          if (positions[j] >= from) {
            positions[j]--;
          }
        }
      }
    }
    return target;
  },
  merge: function(from, to, parent) {
    var Solver, domain, exported, other, prob, problems, property, result, variable, _i, _j, _len, _len1, _ref;
    other = this.domains[to];
    problems = this.problems[from];
    result = this.problems[to];
    if (domain = this.domains[from]) {
      if (domain.paths && !domain.consumed) {
        domain.transfer(parent, this, other);
        exported = domain["export"]();
        domain.register(false);
      }
      for (_i = 0, _len = problems.length; _i < _len; _i++) {
        prob = problems[_i];
        if (result.indexOf(prob) === -1) {
          (exported || (exported = [])).push(prob);
        } else {
          this.reify(prob, other, domain);
        }
      }
    }
    this.splice(from, 1);
    if (from < to) {
      to--;
    }
    if (exported) {
      this.mix(result, exported);
      for (_j = 0, _len1 = exported.length; _j < _len1; _j++) {
        prob = exported[_j];
        this.setVariables(result, prob);
      }
      this.reify(exported, other, domain);
      if (Solver = domain.Engine) {
        _ref = result.variables;
        for (property in _ref) {
          variable = _ref[property];
          if (variable.domain.Engine === Solver) {
            (this.variables || (this.variables = {}))[property] = to;
          }
        }
      }
    }
    other.register();
    return to;
  },
  mix: function(result, exported) {
    var index, prob, problem, _i, _j, _len, _len1, _ref, _results;
    _results = [];
    for (_i = 0, _len = exported.length; _i < _len; _i++) {
      prob = exported[_i];
      for (index = _j = 0, _len1 = result.length; _j < _len1; index = ++_j) {
        problem = result[index];
        if (((_ref = problem.index) != null ? _ref : Infinity) > prob.index) {
          break;
        }
      }
      _results.push(result.splice(index, 0, prob));
    }
    return _results;
  },
  await: function(url) {
    return (this.busy || (this.busy = [])).push(url);
  },
  postMessage: function(url, message) {
    var _base, _name;
    return ((_base = (this.posted || (this.posted = {})))[_name = url.url || url] || (_base[_name] = [])).push(this.engine.clone(message));
  },
  terminate: function() {
    var changes, command, commands, constants, first, group, i, message, path, paths, property, removes, url, value, values, worker, _i, _j, _k, _len, _len1, _ref, _ref1;
    if (this.posted) {
      _ref = this.posted;
      for (url in _ref) {
        message = _ref[url];
        worker = this.engine.workers[url];
        paths = (worker.paths || (worker.paths = {}));
        values = (worker.values || (worker.values = {}));
        changes = {};
        commands = [changes];
        removes = [];
        for (_i = 0, _len = message.length; _i < _len; _i++) {
          group = message[_i];
          for (_j = 0, _len1 = group.length; _j < _len1; _j++) {
            command = group[_j];
            first = command[0];
            if (first === 'remove') {
              for (i = _k = 1, _ref1 = command.length; 1 <= _ref1 ? _k < _ref1 : _k > _ref1; i = 1 <= _ref1 ? ++_k : --_k) {
                delete paths[command[i]];
                removes.push(command[i]);
              }
            } else if (first === 'value') {
              if (command[2] !== values[command[1]]) {
                changes[command[1]] = command[2];
              }
            } else {
              if ((path = first.key) != null) {
                paths[path] = true;
                if (constants = first.values) {
                  for (property in constants) {
                    value = constants[property];
                    if (value !== values[property]) {
                      changes[property] = value;
                    }
                  }
                }
              }
              commands.push(command);
            }
          }
        }
        if (removes.length) {
          removes.unshift('remove');
          commands.splice(1, 0, removes);
        }
        worker.postMessage(commands);
        while ((i = this.busy.indexOf(url)) > -1 && this.busy.lastIndexOf(url) !== i) {
          this.busy.splice(i, 1);
        }
      }
      return this.posted = void 0;
    }
  },
  each: function(callback, bind, solution) {
    var domain, previous, property, result, variable, _ref, _ref1, _ref2;
    if (solution) {
      this.apply(solution);
    }
    if (!this.problems[this.index + 1]) {
      return;
    }
    previous = this.domains[this.index];
    while ((domain = this.domains[++this.index]) !== void 0) {
      previous = domain;
      if (this.variables) {
        _ref = this.variables;
        for (property in _ref) {
          variable = _ref[property];
          if (variable <= this.index) {
            delete this.variables[property];
          }
        }
      }
      result = (this.solutions || (this.solutions = []))[this.index] = callback.call(bind || this, domain, this.problems[this.index], this.index, this);
      if (((_ref1 = this.busy) != null ? _ref1.length : void 0) && this.busy.indexOf((_ref2 = this.domains[this.index + 1]) != null ? _ref2.url : void 0) === -1) {
        this.terminate();
        return result;
      }
      if (result && result.onerror === void 0) {
        if (result.push) {
          this.engine.update(result);
        } else {
          this.apply(result);
          solution = this.apply(result, solution || {});
        }
      }
    }
    this.terminate();
    this.index--;
    return solution || this;
  },
  apply: function(result) {
    var last, now, property, solution, value;
    solution = this.solution || (this.solution = {});
    last = this.last || (this.last = {});
    for (property in result) {
      value = result[property];
      now = solution[property];
      if (last[property] === value) {
        if (Math.abs(now - value) < 2) {
          (this.changes || (this.changes = {}))[property] = solution[property] = now;
        }
        continue;
      }
      if (now !== value) {
        if (solution === this.solution && (value != null)) {
          last[property] = now;
        }
        (this.changes || (this.changes = {}))[property] = value;
        solution[property] = value;
      }
    }
    return solution;
  },
  remove: function(continuation, problem) {
    var i, index, problems, _i, _j, _ref;
    this.push([['remove', continuation]], null);
    _ref = this.problems;
    for (index = _i = _ref.length - 1; _i >= 0; index = _i += -1) {
      problems = _ref[index];
      if (index === this.index) {
        break;
      }
      for (i = _j = problems.length - 1; _j >= 0; i = _j += -1) {
        problem = problems[i];
        if (problem && problem[0] && problem[0].key === continuation) {
          problems.splice(i, 1);
          if (problems.length === 0) {
            this.splice(index, 1);
          }
        }
      }
    }
  },
  perform: function(domain) {
    var glob, globals, globs, _i, _len;
    globals = this.domains.indexOf(null, this.index);
    if (globals > -1) {
      globs = this.problems[globals];
      if (typeof globs[0] === 'string') {
        if (globs[0] === 'remove') {
          domain.remove.apply(domain, globs.slice(1));
        }
      } else {
        for (_i = 0, _len = globs.length; _i < _len; _i++) {
          glob = globs[_i];
          if (glob[0] === 'remove') {
            domain.remove.apply(domain, glob.slice(1));
          }
        }
      }
    }
  },
  setVariables: function(result, operation, share) {
    var property, variable, variables;
    if (variables = operation.variables) {
      if (!result.variables && share) {
        result.variables = variables;
      } else {
        for (property in variables) {
          variable = variables[property];
          (result.variables || (result.variables = {}))[property] = variable;
        }
      }
    } else if (operation[0] === 'get') {
      (result.variables || (result.variables = {}))[operation[1]] = operation;
    }
    return result.variables;
  },
  reify: function(operation, domain, from) {
    var arg, _i, _len;
    if (operation.domain === from) {
      operation.domain = domain;
    }
    for (_i = 0, _len = operation.length; _i < _len; _i++) {
      arg = operation[_i];
      if (arg && arg.push) {
        this.reify(arg, domain, from);
      }
    }
    return operation;
  },
  cleanup: function(name, continuation) {
    var length, old, prop, _results;
    old = this[name];
    if (continuation) {
      if (old) {
        length = continuation.length;
        _results = [];
        for (prop in old) {
          if (prop.length > length) {
            if (prop.substring(0, length) === continuation) {
              _results.push(delete old[prop]);
            } else {
              _results.push(void 0);
            }
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    } else {
      return this[name] = void 0;
    }
  },
  reset: function(continuation) {
    this.cleanup('queries', continuation);
    this.cleanup('snapshots', continuation);
    return this.cleanup('mutations');
  },
  commit: function() {
    var changes;
    if (this.restyled) {
      this.restyled = void 0;
    }
    if (this.reflown) {
      this.reflown = void 0;
    }
    if (changes = this.changes) {
      this.changes = void 0;
    }
    return changes;
  },
  getProblems: function(callback, bind) {
    return this.engine.clone(this.problems);
  },
  finish: function() {
    this.time = this.engine.console.getTime(this.started);
    return this.started = void 0;
  },
  start: function() {
    return this.started != null ? this.started : this.started = this.engine.console.getTime();
  },
  isDone: function() {
    return (this.domains.length === this.index + 1) && this.isDocumentDone() && this.isDataDone();
  },
  isDocumentDone: function() {
    return !(this.mutations || this.deferred || this.pairs || this.stylesheets || this.branches);
  },
  isDataDone: function() {
    return !(this.constraints || this.assignments || this.ranges);
  },
  isDirty: function() {
    return this.restyled || this.changes || this.reflown || this.engine.data.changes;
  },
  hadSideEffects: function(solution) {
    return this.solution || this.domains.length > 0 || this.hasOwnProperty('restyled');
  },
  block: function() {
    return this.blocking++;
  },
  unblock: function() {
    return --this.blocking === 0;
  },
  blocking: 0,
  index: -1
};

module.exports = Update;



},{}],21:[function(require,module,exports){
var Condition, Query,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __hasProp = {}.hasOwnProperty;

Query = require('../Query');

Condition = (function(_super) {
  __extends(Condition, _super);

  Condition.prototype.type = 'Condition';

  Condition.prototype.Sequence = void 0;

  Condition.prototype.signature = [
    {
      "if": ['Query', 'Selector', 'Variable', 'Constraint', 'Default'],
      then: ['Any']
    }, [
      {
        "else": ['Any']
      }
    ]
  ];

  Condition.prototype.List = {
    2: true,
    3: true
  };

  Condition.prototype.cleaning = true;

  Condition.prototype.conditional = 1;

  Condition.prototype.boundaries = true;

  Condition.prototype.domains = {
    1: 'output'
  };

  function Condition(operation, engine) {
    var command, parent, previous;
    this.path = this.key = this.serialize(operation, engine);
    if (this.linked) {
      if (parent = operation.parent) {
        previous = parent[parent.indexOf(operation) - 1];
        if (command = previous.command) {
          if (command.type === 'Condition') {
            command.next = operation;
            this.previous = command;
            this.key = this.path = this.delimit(this.previous.key, this.ASCEND) + this.key;
          }
        }
      }
    }
  }

  Condition.prototype.descend = function(engine, operation, continuation, scope) {
    var branch, evaluate, path;
    continuation = this.delimit(continuation, this.DESCEND);
    if (this.conditional) {
      path = continuation + this.key;
      if (!engine.queries.hasOwnProperty(path)) {
        engine.queries[path] = 0;
        evaluate = true;
      }
      this.after([], engine.queries[path], engine, operation, continuation, scope);
      if (evaluate) {
        branch = operation[this.conditional];
        branch.command.solve(engine, branch, continuation, scope);
      }
    }
    return false;
  };

  Condition.prototype.execute = function(value) {
    return value;
  };

  Condition.prototype.serialize = function(operation, engine) {
    return '@' + this.toExpression(operation[1]);
  };

  Condition.prototype.getOldValue = function(engine, continuation) {
    var old, _ref, _ref1;
    old = (_ref = (_ref1 = engine.updating.snapshots) != null ? _ref1[continuation] : void 0) != null ? _ref : 0;
    return old > 0 || (old === 0 && 1 / old !== -Infinity);
  };

  Condition.prototype.ascend = function(engine, operation, continuation, scope, result, recursive) {
    var condition, conditions, contd, index, length, _base, _i, _len;
    if (conditions = ((_base = engine.updating).branches || (_base.branches = []))) {
      if (engine.indexOfTriplet(conditions, operation, continuation, scope) === -1) {
        length = continuation.length;
        for (index = _i = 0, _len = conditions.length; _i < _len; index = _i += 3) {
          condition = conditions[index];
          contd = conditions[index + 1];
          if (contd.length >= length) {
            break;
          } else if (continuation.charAt(contd.length) === this.DESCEND && continuation.substring(0, contd.length) === contd) {
            return;
          }
        }
        return conditions.splice(index || 0, 0, operation, continuation, scope);
      }
    }
  };

  Condition.prototype.rebranch = function(engine, operation, continuation, scope) {
    var branch, increment, path, prefix;
    increment = this.getOldValue(engine, continuation) ? -1 : 1;
    engine.queries[continuation] = (engine.queries[continuation] || 0) + increment;
    if (branch = this.previous) {
      if (prefix = this.getPrefixPath(engine, continuation)) {
        prefix += this.DESCEND;
      }
      while (branch) {
        path = prefix + branch.key;
        if (engine.queries[path] > 0) {
          return;
        }
        branch = branch.previous;
      }
    }
    return this.branch(engine, operation, continuation, scope, increment === -1);
  };

  Condition.prototype.branch = function(engine, operation, continuation, scope, choice) {
    var branch, index, inverted, result;
    inverted = operation[0] === 'unless';
    index = this.conditional + 1 + (choice ^ inverted);
    if (branch = operation[index]) {
      engine.console.start(index === 2 && 'if' || 'else', operation[index], continuation);
      result = engine.input.Command(branch).solve(engine.input, branch, this.delimit(continuation, this.DESCEND), scope);
      engine.console.end(result);
    }
    return result;
  };

  Condition.prototype.unbranch = function(engine, operation, continuation, scope) {
    var increment, old, _ref;
    if (old = (_ref = engine.updating.snapshots) != null ? _ref[continuation] : void 0) {
      increment = this.getOldValue(engine, continuation) ? -1 : 1;
      if ((engine.queries[continuation] += increment) === 0) {
        this.clean(engine, continuation, continuation, operation, scope);
        return true;
      }
    }
  };

  Condition.prototype["yield"] = function(result, engine, operation, continuation, scope) {
    var old, path, scoped, value, _base, _ref;
    if (!(operation.parent.indexOf(operation) > 1)) {
      if (operation[0].key != null) {
        continuation = operation[0].key;
        if (scoped = operation[0].scope) {
          scope = engine.identity[scoped];
        }
      }
      if (this.bound) {
        continuation = this.getPrefixPath(engine, continuation);
      }
      path = this.delimit(continuation, this.DESCEND) + this.key;
      if ((result != null ? result.push : void 0) && result.valueOf !== Array.prototype.valueOf) {
        result = result.valueOf() || false;
      }
      value = engine.queries[path];
      if (result && !value) {
        value = -0;
      }
      ((_base = engine.updating).snapshots || (_base.snapshots = {}))[path] = value;
      if (old = (_ref = engine.updating.snapshots) != null ? _ref[path] : void 0) {
        if (this.getOldValue(engine, path) === !!result) {
          return true;
        }
      }
      this.notify(engine, path, scope, result);
      return true;
    }
  };

  return Condition;

})(Query);

Condition.Global = Condition.extend({
  condition: function(engine, operation, command) {
    var argument, _i, _len;
    if (command) {
      operation = operation[1];
    }
    if (operation[0] === 'get' || operation[1] === 'virtual') {
      if (operation.length === 2) {
        return false;
      }
    } else if (operation[0] === '&') {
      return false;
    }
    for (_i = 0, _len = operation.length; _i < _len; _i++) {
      argument = operation[_i];
      if (argument && argument.push && this.condition(engine, argument) === false) {
        return false;
      }
    }
    return true;
  },
  global: true
});

Condition.Selector = Condition.extend({
  condition: function(engine, operation, command) {
    var argument, _i, _len;
    if (command) {
      operation = operation[1];
    }
    if (operation.command.type === 'Selector' && (operation.length > 1 || (operation.parent.command.type === 'Selector' && operation.parent.command.type === 'Iterator'))) {
      return true;
    }
    for (_i = 0, _len = operation.length; _i < _len; _i++) {
      argument = operation[_i];
      if (argument && argument.push && this.condition(engine, argument)) {
        return true;
      }
    }
    return false;
  },
  bound: true
});

Condition.prototype.advices = [Condition.Selector, Condition.Global];

Condition.define('if', {});

Condition.define('unless', {
  inverted: true
});

Condition.define('else', {
  signature: [
    {
      then: ['Any']
    }
  ],
  linked: true,
  conditional: null,
  domains: {}
});

Condition.define('elseif', {
  linked: true
});

Condition.define('elsif', {});

module.exports = Condition;



},{"../Query":19}],22:[function(require,module,exports){
var Command, Constraint;

Command = require('../Command');

Constraint = Command.extend({
  type: 'Constraint',
  signature: [
    {
      left: ['Variable', 'Number'],
      right: ['Variable', 'Number']
    }, [
      {
        strength: ['String'],
        weight: ['Number']
      }
    ]
  ],
  log: function(args, engine, operation, continuation, scope, name) {
    return engine.console.push(name || operation[0], args, operation.hash || (operation.hash = this.toExpression(operation)));
  },
  toHash: function(meta) {
    var hash, property;
    hash = '';
    if (meta.values) {
      for (property in meta.values) {
        hash += property;
      }
    }
    return hash;
  },
  fetch: function(engine, operation) {
    var constraint, operations, signature, _ref, _ref1;
    if (operations = (_ref = engine.operations) != null ? _ref[operation.hash || (operation.hash = this.toExpression(operation))] : void 0) {
      for (signature in operations) {
        constraint = operations[signature];
        if (((_ref1 = engine.constraints) != null ? _ref1.indexOf(constraint) : void 0) > -1) {
          return constraint;
        }
      }
    }
  },
  declare: function(engine, constraint) {
    var constraints, definition, op, path, _ref, _ref1, _ref2, _ref3;
    _ref = constraint.variables;
    for (path in _ref) {
      op = _ref[path];
      if (definition = engine.variables[path]) {
        constraints = definition.constraints || (definition.constraints = []);
        if (((_ref1 = constraints[0]) != null ? (_ref2 = _ref1.operations[0]) != null ? (_ref3 = _ref2.parent.values) != null ? _ref3[path] : void 0 : void 0 : void 0) == null) {
          if (constraints.indexOf(constraint) === -1) {
            constraints.push(constraint);
          }
        }
      }
    }
  },
  undeclare: function(engine, constraint, quick) {
    var i, matched, object, op, other, path, _i, _len, _ref, _ref1, _ref2, _ref3;
    _ref = constraint.variables;
    for (path in _ref) {
      op = _ref[path];
      if (object = engine.variables[path]) {
        if ((i = (_ref1 = object.constraints) != null ? _ref1.indexOf(constraint) : void 0) > -1) {
          object.constraints.splice(i, 1);
          matched = false;
          _ref2 = object.constraints;
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            other = _ref2[_i];
            if (engine.constraints.indexOf(other) > -1 && (((_ref3 = other.operations[0].parent[0].values) != null ? _ref3[path] : void 0) == null)) {
              matched = true;
              break;
            }
          }
          if (!matched) {
            op.command.undeclare(engine, object, quick);
          }
        }
      }
    }
  },
  add: function(constraint, engine, operation, continuation) {
    var i, op, operations, other, _i;
    other = this.fetch(engine, operation);
    operations = constraint.operations || (constraint.operations = (other != null ? other.operations : void 0) || []);
    constraint.variables = operation.variables;
    if (operations.indexOf(operation) === -1) {
      for (i = _i = operations.length - 1; _i >= 0; i = _i += -1) {
        op = operations[i];
        if (op.hash === operation.hash && op.parent[0].key === continuation) {
          operations.splice(i, 1);
          this.unwatch(engine, op, continuation);
        }
      }
      operations.push(operation);
    }
    this.watch(engine, operation, continuation);
    if (other !== constraint) {
      if (other) {
        this.unset(engine, other);
      }
      this.set(engine, constraint);
    }
  },
  reset: function(engine) {
    var constraint, editing, property, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3, _ref4;
    if (engine.constrained) {
      _ref = engine.constrained;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        constraint = _ref[_i];
        engine.Constraint.prototype.declare(engine, constraint);
      }
    }
    if (engine.unconstrained) {
      _ref1 = engine.unconstrained;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        constraint = _ref1[_j];
        engine.Constraint.prototype.undeclare(engine, constraint);
      }
    }
    if (false) {
      engine.instance = void 0;
      engine.construct();
      if (editing = engine.editing) {
        engine.editing = void 0;
        for (property in editing) {
          constraint = editing[property];
          engine.edit(engine.variables[property], engine.variables[property].value);
        }
      }
      if (engine.constraints) {
        _ref2 = engine.constraints;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          constraint = _ref2[_k];
          engine.Constraint.prototype.inject(engine, constraint);
        }
      }
    } else {
      if (engine.unconstrained) {
        _ref3 = engine.unconstrained;
        for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
          constraint = _ref3[_l];
          engine.Constraint.prototype.eject(engine, constraint);
        }
      }
      if (engine.constrained) {
        _ref4 = engine.constrained;
        for (_m = 0, _len4 = _ref4.length; _m < _len4; _m++) {
          constraint = _ref4[_m];
          engine.Constraint.prototype.inject(engine, constraint);
        }
      }
      engine.constrained || (engine.constrained = []);
    }
    return engine.unconstrained = void 0;
  },
  set: function(engine, constraint) {
    var index, _ref, _ref1;
    if ((engine.constraints || (engine.constraints = [])).indexOf(constraint) === -1) {
      engine.constraints.push(constraint);
      if ((index = (_ref = engine.unconstrained) != null ? _ref.indexOf(constraint) : void 0) > -1) {
        return engine.unconstrained.splice(index, 1);
      } else if (!(((_ref1 = engine.constrained) != null ? _ref1.indexOf(constraint) : void 0) > -1)) {
        return (engine.constrained || (engine.constrained = [])).push(constraint);
      }
    }
  },
  unset: function(engine, constraint) {
    var index, operation, path, _i, _len, _ref, _ref1;
    if ((index = engine.constraints.indexOf(constraint)) > -1) {
      engine.constraints.splice(index, 1);
      if ((index = (_ref = engine.constrained) != null ? _ref.indexOf(constraint) : void 0) > -1) {
        engine.constrained.splice(index, 1);
      } else if ((engine.unconstrained || (engine.unconstrained = [])).indexOf(constraint) === -1) {
        engine.unconstrained.push(constraint);
      }
    }
    _ref1 = constraint.operations;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      operation = _ref1[_i];
      if ((path = operation.parent[0].key) != null) {
        this.unwatch(engine, operation, path);
      }
    }
  },
  unwatch: function(engine, operation, continuation) {
    var i, paths;
    if (paths = engine.paths[continuation]) {
      if ((i = paths.indexOf(operation)) > -1) {
        paths.splice(i, 1);
        if (paths.length === 0) {
          return delete engine.paths[continuation];
        }
      }
    }
  },
  watch: function(engine, operation, continuation) {
    return engine.add(continuation, operation);
  },
  remove: function(engine, operation, continuation) {
    var constraint, index, operations;
    if (constraint = this.fetch(engine, operation)) {
      if (operations = constraint.operations) {
        if ((index = operations.indexOf(operation)) > -1) {
          operations.splice(index, 1);
          if (operations.length === 0) {
            this.unset(engine, constraint);
          }
          return this.unwatch(engine, operation, continuation);
        }
      }
    }
  },
  find: function(engine, variable) {
    var other, _i, _len, _ref;
    _ref = variable.constraints;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      other = _ref[_i];
      if (other.operations[0].variables[variable.name].domain === engine) {
        if (engine.constraints.indexOf(other) > -1) {
          return true;
        }
      }
    }
  },
  group: function(constraints) {
    var constraint, group, groupped, groups, other, others, path, vars, _i, _j, _k, _len, _len1;
    groups = [];
    for (_i = 0, _len = constraints.length; _i < _len; _i++) {
      constraint = constraints[_i];
      groupped = void 0;
      vars = constraint.variables;
      for (_j = groups.length - 1; _j >= 0; _j += -1) {
        group = groups[_j];
        for (_k = 0, _len1 = group.length; _k < _len1; _k++) {
          other = group[_k];
          others = other.variables;
          for (path in vars) {
            if (others[path]) {
              if (groupped && groupped !== group) {
                groupped.push.apply(groupped, group);
                groups.splice(groups.indexOf(group), 1);
              } else {
                groupped = group;
              }
              break;
            }
          }
          if (groups.indexOf(group) === -1) {
            break;
          }
        }
      }
      if (!groupped) {
        groups.push(groupped = []);
      }
      groupped.push(constraint);
    }
    return groups;
  },
  split: function(engine) {
    var arg, args, commands, constraint, equal, group, groups, i, index, operation, separated, shift, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref;
    groups = this.group(engine.constraints).sort(function(a, b) {
      var al, bl;
      al = a.length;
      bl = b.length;
      return bl - al;
    });
    separated = groups.splice(1);
    commands = [];
    if (separated.length) {
      shift = 0;
      for (index = _i = 0, _len = separated.length; _i < _len; index = ++_i) {
        group = separated[index];
        for (index = _j = 0, _len1 = group.length; _j < _len1; index = ++_j) {
          constraint = group[index];
          this.unset(engine, constraint);
          _ref = constraint.operations;
          for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
            operation = _ref[_k];
            commands.push(operation.parent);
          }
        }
      }
    }
    if (commands != null ? commands.length : void 0) {
      if (commands.length === 1) {
        commands = commands[0];
      }
      args = arguments;
      if (args.length === 1) {
        args = args[0];
      }
      if (commands.length === args.length) {
        equal = true;
        for (i = _l = 0, _len3 = args.length; _l < _len3; i = ++_l) {
          arg = args[i];
          if (commands.indexOf(arg) === -1) {
            equal = false;
            break;
          }
        }
        if (equal) {
          throw new Error('Trying to separate what was just added. Means loop. ');
        }
      }
      return engine.Command.orphanize(commands);
    }
  }
});

module.exports = Constraint;



},{"../Command":15}],23:[function(require,module,exports){
var Command, Iterator,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __hasProp = {}.hasOwnProperty;

Command = require('../Command');

Iterator = (function(_super) {
  __extends(Iterator, _super);

  function Iterator() {
    return Iterator.__super__.constructor.apply(this, arguments);
  }

  Iterator.prototype.type = 'Iterator';

  Iterator.prototype.signature = [
    {
      collection: ['Query', 'Selector'],
      body: ['Any']
    }
  ];

  Iterator.prototype.List = {
    2: true
  };

  Iterator.prototype["yield"] = function(result, engine, operation, continuation, scope) {
    var contd, op;
    if (operation.parent.indexOf(operation) === 1) {
      contd = this.delimit(continuation, this.DESCEND);
      op = operation.parent[2];
      op.command.solve(engine, op, contd, result);
      return true;
    }
  };

  Iterator.prototype.descend = function(engine, operation, continuation, scope, ascender, ascending) {
    var argument, command;
    argument = operation[1];
    command = argument.command || engine.Command(argument);
    argument.parent || (argument.parent = operation);
    command.solve(operation.domain || engine, argument, continuation, scope);
    return false;
  };

  return Iterator;

})(Command);

Iterator.define({
  "rule": {
    index: 'rules',
    advices: [
      function(engine, operation, command) {
        var parent;
        parent = operation;
        while (parent.parent) {
          parent = parent.parent;
        }
        operation.index = parent.rules = (parent.rules || 0) + 1;
      }
    ]
  },
  "each": {}
});

module.exports = Iterator;



},{"../Command":15}],24:[function(require,module,exports){
var Command, Range,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __hasProp = {}.hasOwnProperty;

Command = require('../Command');

Range = (function(_super) {
  __extends(Range, _super);

  function Range() {
    return Range.__super__.constructor.apply(this, arguments);
  }

  Range.prototype.type = 'Range';

  Range.prototype.signature = [
    {
      from: ['Boolean', 'Number', 'Variable', 'Range']
    }, [
      {
        to: ['Boolean', 'Number', 'Variable', 'Range'],
        now: ['Number']
      }
    ]
  ];

  Range.prototype.extras = 0;

  Range.define({
    '...': function(from, to, progress) {
      var range, size;
      if (to != null) {
        if (to === false) {
          range = [from];
        } else {
          range = [from, to];
        }
      } else {
        range = [false, from];
      }
      if (size = this.size) {
        range.length = size;
      }
      if (progress != null) {
        range[2] = progress;
      }
      this.wrap(range);
      return range;
    }
  });

  Range.prototype.valueOf = function() {
    var end, start;
    start = this[0];
    end = this[1];
    return this[2] * ((end - start) || 1) + start;
  };

  Range.prototype.wrap = function(range) {
    range.valueOf = this.valueOf;
    return range;
  };

  Range.prototype.pause = function(range, engine, operation, continuation, scope) {
    range.operation = operation;
    range.continuation = continuation;
    range.scope = scope;
    return range;
  };

  Range.prototype.resume = function(range, engine) {
    this.start(range, engine, range.operation, range.continuation, range.scope);
    return range.operation.command.update(range, engine, range.operation, range.continuation, range.scope);
  };

  Range.prototype.copy = function(range) {
    var copy;
    copy = range.slice();
    copy.valueOf = range.valueOf;
    if (range.operation) {
      copy.operation = range.operation;
      copy.continuation = range.continuation;
      copy.scope = range.scope;
    }
    return copy;
  };

  Range.prototype.start = function(range, engine, operation, continuation, scope) {
    var i, index, other, ranges, _base, _base1;
    ranges = (_base = ((_base1 = engine.engine).ranges || (_base1.ranges = {})))[continuation] || (_base[continuation] = []);
    if ((index = ranges.indexOf(operation)) === -1) {
      i = 0;
      while ((other = ranges[i]) && other.length < range.length) {
        i += 3;
      }
      ranges.splice(i, 0, operation, scope, range);
    } else {
      ranges[index + 2] = range;
    }
    return range;
  };

  return Range;

})(Command);

Range.Modifier = (function(_super) {
  __extends(Modifier, _super);

  function Modifier() {
    return Modifier.__super__.constructor.apply(this, arguments);
  }

  Modifier.prototype.signature = [
    [
      {
        from: ['Boolean', 'Number', 'Variable', 'Range'],
        to: ['Boolean', 'Number', 'Variable', 'Range']
      }
    ]
  ];

  Modifier.prototype.before = function(args, domain, operation, continuation, scope, ascender, ascending) {
    if (typeof args[0] !== 'number' || typeof args[1] === 'number') {
      if (operation[0].indexOf('>') === -1) {
        return this.scale(args[0], null, args[1]);
      } else if (typeof args[1] === 'number') {
        return this.scale(args[0], args[1], null);
      }
    } else {
      if (operation[0].indexOf('>') === -1) {
        return this.scale(args[1], args[0], null);
      }
    }
    return this.scale(args[1], null, args[0]);
  };

  Modifier.prototype.valueOf = function() {
    var end, start, value;
    if ((value = this[2]) != null) {
      if ((start = this[0]) === false || value > 0) {
        if ((end = this[1]) === false || value < 1) {
          return value * ((end - start) || 1) + start;
        }
      }
    }
  };

  Modifier.prototype.scale = function(range, start, finish) {
    var from, progress, reversed, to, value;
    if (!range.push) {
      if (start != null) {
        if (start <= range) {
          return this.wrap([start, false, range / (start || 1)]);
        } else {
          return this.wrap([start, false, range / (start || 1) - 1]);
        }
      } else if (finish != null) {
        return this.wrap([false, finish, range / finish]);
      } else {
        return this.wrap([start, false, range / start]);
      }
    }
    reversed = +((range[0] > range[1]) && (range[1] != null));
    from = range[reversed];
    to = range[1 - reversed];
    if (start !== null && !(from > start)) {
      range = this.copy(range);
      if ((value = range[2]) != null) {
        to || (to = 0);
        progress = value * (to - from);
        range[2] = (progress - (start - from)) / (to - start);
      }
      range[+reversed] = from = start;
    }
    if (finish !== null && !(to < finish)) {
      range = this.copy(range);
      if ((value = range[2]) != null) {
        from || (from = 0);
        to || (to = 0);
        progress = value * (to - from);
        range[2] = progress / (finish - from);
      }
      range[1 - reversed] = finish;
    }
    if (range[2] < 0 || range[2] > 1) {
      range.valueOf = this.execute;
    }
    return range;
  };

  Modifier.prototype.after = function(args, result) {
    if (result === false) {
      return;
    }
    return result;
  };

  Modifier.define({
    '-': function(from, to, progress) {
      return progress;
    },
    '~': function(from, to, progress) {
      if (Math.floor(progress % 2)) {
        return 1 - progress % 1;
      } else {
        return progress % 1;
      }
    },
    '|': function(from, to, progress) {
      if (progress > to) {
        return to;
      }
      if (progress < from) {
        return from;
      }
    },
    '<=': function(from, to, progress) {},
    '<': function(from, to, progress) {},
    '>=': function(from, to, progress) {},
    '>': function(from, to, progress) {}
  });

  return Modifier;

})(Range);

Range.Progress = (function(_super) {
  __extends(Progress, _super);

  function Progress() {
    return Progress.__super__.constructor.apply(this, arguments);
  }

  Progress.prototype.after = function(args, result, engine, operation, continuation, scope) {
    if (operation.anonymous) {
      this.start(result, engine, operation, continuation, scope);
    } else {
      this.pause(result, engine, operation, continuation, scope);
    }
    return result;
  };

  Progress.prototype.advices = [
    function(engine, operation, command) {
      var op, parent;
      op = operation;
      while (parent = op.parent) {
        if (parent[0] === 'map') {
          operation.anonymous = true;
        }
        op = parent;
      }
    }
  ];

  return Progress;

})(Range);

Range.Easing = (function(_super) {
  __extends(Easing, _super);

  function Easing(obj) {
    if (typeof obj === 'string') {
      if (obj = this.Type.Timings[obj]) {
        return obj;
      }
    } else if (obj[0] === 'steps' || obj[0] === 'cubic-bezier') {
      return obj;
    }
  }

  Easing.define({
    'ease': ['cubic-bezier', .42, 0, 1, 1],
    'ease-in': ['cubic-bezier', .42, 0, 1, 1],
    'ease-out': ['cubic-bezier', 0, 0, .58, 1],
    'ease-in-out': ['cubic-bezier', .42, 0, .58, 1],
    'linear': ['cubic-bezier', 0, 0, 1, 1],
    'step-start': function(value) {
      return Math.floor(value);
    },
    'step-end': function(value) {
      return Math.ceil(value);
    },
    out: function(value) {
      return 1 - value;
    },
    linear: function(value) {
      return value;
    },
    quad: function(value) {
      return Math.pow(value, 2);
    },
    cubic: function(value) {
      return Math.pow(value, 3);
    },
    quart: function(value) {
      return Math.pow(value, 4);
    },
    expo: function(value) {
      return Math.pow(2, 8 * (value - 1));
    },
    circ: function(value) {
      return 1 - Math.sin(Math.acos(value));
    },
    sine: function(value) {
      return 1 - Math.cos(value * Math.PI / 2);
    },
    back: function(value) {
      return Math.pow(value, 2) * ((1.618 + 1) * value - 1.618);
    },
    elastic: function(value) {
      return Math.pow(2, 10 * --value) * Math.cos(20 * value * Math.PI * 1 / 3);
    }
  });

  return Easing;

})(Range.Progress);

Range.Mapper = (function(_super) {
  __extends(Mapper, _super);

  function Mapper() {
    return Mapper.__super__.constructor.apply(this, arguments);
  }

  Mapper.prototype.signature = [
    {
      from: ['Number', 'Variable', 'Range'],
      to: ['Number', 'Variable', 'Range']
    }
  ];

  Mapper.prototype.extras = null;

  Mapper.define({
    map: function(left, right, engine, operation, continuation, scope, ascender, ascending) {
      var end, start, _ref, _ref1, _ref2;
      if (ascender === 2) {
        if ((start = (_ref = left[2]) != null ? _ref : left[0]) != null) {
          if (start !== false && right < start) {
            right = start;
          } else if ((end = left.push ? left[1] : left) < right) {
            right = end;
          }
        } else if ((end = left.push ? left[1] : left) < right) {
          right = end;
        } else if (right < 0) {
          return;
        }
        return right;
      } else {
        engine.updating.ranges = true;
        if (left.length < 4) {
          if ((left[0] != null) && (left[1] != null)) {
            right[2] = left[0] || null;
            right[3] = ((_ref1 = (_ref2 = left[2]) != null ? _ref2 : left[1]) != null ? _ref1 : left) || 0;
          }
        } else {
          if (right.length < 4) {
            right[2] = +left;
          } else {
            right[3] = +left || 0;
          }
        }
        if (right.operation) {
          this.resume(right, engine);
        }
        if (!left.push) {
          return this.valueOf.call(right);
        } else {
          return right;
        }
      }
    }
  });

  return Mapper;

})(Range);

module.exports = Range;



},{"../Command":15}],25:[function(require,module,exports){
var Command, Variable,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __hasProp = {}.hasOwnProperty;

Command = require('../Command');

Variable = (function(_super) {
  __extends(Variable, _super);

  Variable.prototype.type = 'Variable';

  Variable.prototype.signature = [
    {
      property: ['String']
    }
  ];

  Variable.prototype.log = function() {};

  Variable.prototype.unlog = function() {};

  function Variable() {}

  Variable.prototype.before = function(args, engine, operation, continuation, scope, ascender, ascending) {
    var value, _ref;
    if ((value = ascending != null ? (_ref = ascending.values) != null ? _ref[args[0]] : void 0 : void 0) != null) {
      return value;
    }
  };

  Variable.prototype.declare = function(engine, name) {
    var variable, variables;
    variables = engine.variables;
    if (!(variable = variables[name])) {
      variable = variables[name] = engine.variable(name);
    }
    (engine.declared || (engine.declared = {}))[name] = variable;
    return variable;
  };

  Variable.prototype.undeclare = function(engine, variable, quick) {
    var _ref;
    if (quick) {
      (engine.replaced || (engine.replaced = {}))[variable.name] = variable;
    } else {
      (engine.nullified || (engine.nullified = {}))[variable.name] = variable;
      if ((_ref = engine.declared) != null ? _ref[variable.name] : void 0) {
        delete engine.declared[variable.name];
      }
    }
    delete engine.values[variable.name];
    engine.nullify(variable);
    return engine.unedit(variable);
  };

  return Variable;

})(Command);

Variable.Expression = (function(_super) {
  __extends(Expression, _super);

  function Expression() {
    return Expression.__super__.constructor.apply(this, arguments);
  }

  Expression.prototype.signature = [
    {
      left: ['Variable', 'Number', 'Range'],
      right: ['Variable', 'Number', 'Range']
    }
  ];

  return Expression;

})(Variable);

Variable.Expression.algebra = {
  '+': function(left, right) {
    return left + right;
  },
  '-': function(left, right) {
    return left - right;
  },
  '*': function(left, right) {
    return left * right;
  },
  '/': function(left, right) {
    return left / right;
  },
  '%': function(left, right) {
    return left % right;
  },
  'min': function(left, right) {
    return Math.min(left, right);
  },
  'max': function(left, right) {
    return Math.max(left, right);
  },
  'pow': function(left, right) {
    return Math.pow(left, right);
  }
};

module.exports = Variable;



},{"../Command":15}],26:[function(require,module,exports){

/* Domain: Given values

Provides values that don't need to be solved
 */
var Command, Data, Domain, Variable,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __hasProp = {}.hasOwnProperty;

Domain = require('../Domain');

Command = require('../Command');

Variable = require('../commands/Variable');

Data = (function(_super) {
  __extends(Data, _super);

  function Data() {
    return Data.__super__.constructor.apply(this, arguments);
  }

  Data.prototype.priority = 200;

  Data.prototype["static"] = true;

  Data.prototype.url = null;

  Data.prototype.check = function(id, property) {
    return this.output.properties[property] || (this.properties[property] != null) || property.indexOf('intrinsic-') === 0 || property.indexOf('computed-') === 0 || ((this.properties[id._gss_id || id] && this.properties[(id._gss_id || id) + '[' + property + ']']) != null);
  };

  Data.prototype.verify = function(object, property) {
    var path;
    path = this.getPath(object, property);
    if (this.values.hasOwnProperty(path)) {
      return this.set(null, path, this.fetch(path));
    }
  };

  return Data;

})(Domain);

Data.prototype.Assignment = Command.extend({
  type: 'Assignment',
  signature: [
    {
      variable: ['String', 'Variable'],
      value: ['Variable', 'Number', 'Matrix', 'Command', 'Object', 'Range']
    }
  ]
}, {
  '=': function(variable, value, engine, operation, continuation) {
    var name, _base;
    if (typeof variable === 'string') {
      name = variable;
    } else if (variable[0] === 'get' && variable.length === 2) {
      name = variable[1];
    }
    if (value !== value) {
      return;
    }
    if (name) {
      ((_base = engine.updating).assignments || (_base.assignments = [])).push(name, value, this.delimit(continuation), operation);
    } else {
      throw new Error('[Input] Unexpected expression on left side of `=`: ' + JSON.stringify(variable));
    }
  }
});

Data.prototype.Variable = Variable.extend({}, {
  get: function(path, engine, operation, continuation, scope) {
    var meta, prefix;
    if (meta = this.getMeta(operation)) {
      continuation = meta.key;
      scope = meta.scope && engine.identity[meta.scope] || scope || engine.scope;
    } else {
      if (engine.queries) {
        prefix = engine.Query.prototype.getScope(engine, void 0, continuation);
      }
      if (!prefix && engine.scope && engine.data.check(engine.scope, path)) {
        prefix = engine.scope;
        engine = engine.data;
      }
    }
    return engine.watch(prefix, path, operation, continuation, scope);
  }
});

Data.prototype.Variable.Getter = Data.prototype.Variable.extend({
  signature: [
    {
      object: ['Query', 'Selector', 'String'],
      property: ['String']
    }
  ]
}, {
  'get': function(object, property, engine, operation, continuation, scope) {
    var domain, prefix;
    if (engine.queries) {
      prefix = engine.Query.prototype.getScope(engine, object, continuation);
    }
    if (!prefix && engine.data.check(engine.scope, property)) {
      prefix = engine.scope;
      domain = engine.data;
    }
    return (domain || engine).watch(prefix, property, operation, continuation, scope);
  }
});

Data.prototype.Variable.Expression = Variable.Expression.extend({
  before: function(args, engine) {
    var arg, _i, _len;
    for (_i = 0, _len = args.length; _i < _len; _i++) {
      arg = args[_i];
      if ((arg == null) || arg !== arg) {
        return NaN;
      }
    }
  }
});

Data.prototype.Variable.Expression.define(Variable.Expression.algebra);

Data.prototype.Meta = Command.Meta.extend({}, {
  'object': {
    execute: function(result) {
      return result;
    },
    descend: function(engine, operation, continuation, scope, ascender, ascending) {
      var meta;
      if (ascender != null) {
        return [ascending];
      }
      meta = operation[0];
      scope = meta.scope && engine.identity[meta.scope] || engine.scope;
      return [operation[1].command.solve(engine, operation[1], meta.key, scope, void 0, operation[0])];
    }
  }
});

module.exports = Data;



},{"../Command":15,"../Domain":16,"../commands/Variable":25}],27:[function(require,module,exports){
var Command, Constraint, Domain, Input, Outputting, Solving, Variable,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __hasProp = {}.hasOwnProperty,
  __slice = [].slice;

Domain = require('../Domain');

Command = require('../Command');

Variable = require('../commands/Variable');

Constraint = require('../commands/Constraint');

Input = (function(_super) {
  __extends(Input, _super);

  function Input() {
    return Input.__super__.constructor.apply(this, arguments);
  }

  Input.prototype.displayName = 'Input';

  Input.prototype.url = void 0;

  Input.prototype.helps = true;

  Input.prototype.Iterator = require('../commands/Iterator');

  Input.prototype.Condition = require('../commands/Condition');

  Input.prototype.Properties = (function() {
    function _Class() {}

    _Class.prototype.right = function(scope) {
      var id;
      id = this.identify(scope);
      return ['+', ['get', this.getPath(id, 'x')], ['get', this.getPath(id, 'width')]];
    };

    _Class.prototype.bottom = function(scope, path) {
      var id;
      id = this.identify(scope);
      return ['+', ['get', this.getPath(id, 'y')], ['get', this.getPath(id, 'height')]];
    };

    _Class.prototype.center = {
      x: function(scope, path) {
        var id;
        id = this.identify(scope);
        return ['+', ['get', this.getPath(id, 'x')], ['/', ['get', this.getPath(id, 'width')], 2]];
      },
      y: function(scope, path) {
        var id;
        id = this.identify(scope);
        return ['+', ['get', this.getPath(id, 'y')], ['/', ['get', this.getPath(id, 'height')], 2]];
      }
    };

    _Class.prototype.computed = {
      right: function(scope) {
        var id;
        id = this.identify(scope);
        return ['+', ['get', this.getPath(id, 'computed-x')], ['get', this.getPath(id, 'computed-width')]];
      },
      bottom: function(scope, path) {
        var id;
        id = this.identify(scope);
        return ['+', ['get', this.getPath(id, 'computed-y')], ['get', this.getPath(id, 'computed-height')]];
      }
    };

    return _Class;

  })();

  return Input;

})(Domain);

Input.prototype.Remove = Command.extend({
  signature: false,
  extras: 1
}, {
  remove: function() {
    var args, engine, path, _i, _j, _len;
    args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), engine = arguments[_i++];
    for (_j = 0, _len = args.length; _j < _len; _j++) {
      path = args[_j];
      engine.triggerEvent('remove', path);
    }
    return true;
  }
});

Input.prototype.Default = Command.Default.extend({
  extras: 2,
  execute: function() {
    var args, engine, operation, _i;
    args = 3 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 2) : (_i = 0, []), engine = arguments[_i++], operation = arguments[_i++];
    args.unshift(operation[0]);
    return args;
  }
});

Solving = Input.prototype.Default.extend({
  condition: function(engine, operation) {
    var parent;
    if (parent = operation.parent) {
      if (parent.command instanceof Input.prototype.Default) {
        return false;
      }
    }
    operation.index || (operation.index = engine.input.index = (engine.input.index || 0) + 1);
    return true;
  },
  extras: 4,
  execute: function() {
    var args, continuation, domain, engine, meta, operation, scope, wrapper, _base, _i;
    args = 5 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 4) : (_i = 0, []), engine = arguments[_i++], operation = arguments[_i++], continuation = arguments[_i++], scope = arguments[_i++];
    meta = {
      key: this.delimit(continuation)
    };
    if (scope !== engine.scope) {
      meta.scope = engine.identify(scope);
    }
    args.unshift(operation[0]);
    wrapper = this.produce(meta, args, operation);
    wrapper.index = operation.index;
    args.parent = wrapper;
    if (domain = typeof this.domain === "function" ? this.domain(engine, operation) : void 0) {
      wrapper.parent = operation.parent;
      wrapper.domain || (wrapper.domain = domain);
    }
    ((_base = engine.updating).constraints || (_base.constraints = [])).push(wrapper, domain);
  },
  produce: function(meta, args) {
    return [meta, args];
  },
  domain: function(engine, operation) {
    var domain, parent, _ref;
    if (parent = operation.parent) {
      if (domain = (_ref = parent.command.domains) != null ? _ref[parent.indexOf(operation)] : void 0) {
        return engine[domain];
      }
    }
  }
});

Outputting = function(engine, operation, command) {
  var _ref;
  if (operation[0] === '=') {
    if (operation[2].push) {
      Outputting.patch(engine.output, operation[2], true);
    }
    return Outputting.patch(engine.output, operation, false);
  } else if (operation.command.type === 'Default' && !engine.solver.signatures[operation[0]] && (!engine.data.signatures[operation[0]]) && engine.output.signatures[operation[0]]) {
    if (((_ref = operation.parent) != null ? _ref.command.type : void 0) === 'Default') {
      return Outputting.patch(engine.output, operation);
    } else {
      return Outputting.patch(engine.output, operation, true);
    }
  }
};

Outputting.patch = function(engine, operation, rematch) {
  var argument, context, i, match, parent, _i, _len, _ref;
  operation.domain = engine.output;
  parent = operation.parent;
  if ((parent != null ? parent.command.sequence : void 0) && parent.command.type !== 'List') {
    context = parent[parent.indexOf(operation) - 1];
  }
  if (rematch !== false) {
    for (i = _i = 0, _len = operation.length; _i < _len; i = ++_i) {
      argument = operation[i];
      if (argument.push) {
        if (rematch || argument.command.type === 'Default' || argument.command.type === 'Variable') {
          if (engine.output.signatures[argument[0]]) {
            Outputting.patch(engine, argument, rematch);
          }
        }
      }
    }
  }
  if (rematch || !engine.solver.signatures[operation[0]]) {
    if (operation[0] === true) {
      match = Command.List;
    } else {
      match = engine.Command.match(engine.output, operation, operation.parent, (_ref = operation.parent) != null ? _ref.indexOf(operation) : void 0, context);
    }
    Command.assign(engine, operation, match, context);
    if (context == null) {
      Command.descend(operation.command, engine, operation);
    }
  }
  return match;
};

Input.prototype.Default.prototype.advices = [Outputting, Solving];

Input.prototype.List = Command.List;

Input.prototype.Variable = Variable.extend({
  signature: [
    {
      property: ['String']
    }
  ]
}, {
  'get': function(property, engine, operation, continuation, scope) {
    var object, variable;
    if (engine.queries) {
      if (scope === engine.scope) {
        scope = void 0;
      }
      object = engine.Query.prototype.getScope(engine, scope, continuation);
    }
    variable = ['get', engine.getPath(object, property)];
    if (operation.domain !== engine.input) {
      variable.domain = operation.domain;
    }
    return variable;
  }
});

Input.prototype.Variable.Getter = Input.prototype.Variable.extend({
  signature: [
    {
      object: ['Query', 'Selector', 'String'],
      property: ['String']
    }
  ]
}, {
  'get': function(object, property, engine, operation, continuation, scope) {
    var prefix, prop, variable;
    if (engine.queries) {
      prefix = engine.Query.prototype.getScope(engine, object, continuation);
    }
    if (prop = engine.properties[property]) {
      if (!prop.matcher) {
        return prop.call(engine, object, continuation);
      }
    }
    if (!prefix && engine.data.check(engine.scope, property)) {
      prefix = engine.scope;
    }
    variable = ['get', engine.getPath(prefix, property)];
    if (operation.domain !== engine.input) {
      variable.domain = operation.domain;
    }
    return variable;
  }
});

Input.prototype.Variable.Expression = Variable.Expression.extend({}, {
  '+': function(left, right) {
    return ['+', left, right];
  },
  '-': function(left, right) {
    return ['-', left, right];
  },
  '/': function(left, right) {
    return ['/', left, right];
  },
  '*': function(left, right) {
    return ['*', left, right];
  }
});

Input.prototype.Assignment = Command.extend({
  type: 'Assignment',
  signature: [
    {
      variable: ['String', 'Variable'],
      value: ['Variable', 'Number', 'Matrix', 'Command', 'Range', 'Default', 'String']
    }
  ]
});

module.exports = Input;



},{"../Command":15,"../Domain":16,"../commands/Condition":21,"../commands/Constraint":22,"../commands/Iterator":23,"../commands/Variable":25}],28:[function(require,module,exports){
var Command, Constraint, Domain, Linear, Variable, c,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __hasProp = {}.hasOwnProperty,
  __slice = [].slice;

Domain = require('../Domain');

Command = require('../Command');

Variable = require('../commands/Variable');

Constraint = require('../commands/Constraint');

c = require('cassowary');

c.Strength.require = c.Strength.required;

Linear = (function(_super) {
  __extends(Linear, _super);

  function Linear() {
    return Linear.__super__.constructor.apply(this, arguments);
  }

  Linear.prototype.displayName = 'Linear';

  Linear.prototype.priority = 0;

  Linear.prototype.Engine = c;

  Linear.prototype.construct = function() {
    if (this.paths == null) {
      this.paths = {};
    }
    this.instance = new c.SimplexSolver();
    this.instance.autoSolve = false;
    if (this.console.level > 2) {
      c.debug = true;
      return c.trace = true;
    }
  };

  Linear.prototype.perform = function() {
    if (this.constrained) {
      this.constrained = this.suggested = void 0;
      if (this.instance._needsSolving) {
        this.instance.solve();
        return this.instance._changed;
      }
    } else if (this.suggested) {
      this.suggested = void 0;
      this.instance.resolve();
      return this.instance._changed;
    }
  };

  Linear.prototype.unedit = function(variable) {
    var constraint, _ref;
    if (constraint = (_ref = this.editing) != null ? _ref['%' + (variable.name || variable)] : void 0) {
      this.instance.removeConstraint(constraint);
      return delete this.editing[variable.name || variable];
    }
  };

  Linear.prototype.edit = function(variable, strength, weight, continuation) {
    var constraint, _ref;
    if (!((_ref = this.editing) != null ? _ref[variable.name] : void 0)) {
      constraint = new c.EditConstraint(variable, this.strength(strength, 'strong'), this.weight(weight));
      constraint.variable = variable;
      this.Constraint.prototype.inject(this, constraint);
      (this.editing || (this.editing = {}))[variable.name] = constraint;
    }
    return constraint;
  };

  Linear.prototype.nullify = function(variable, full) {
    this.instance._externalParametricVars["delete"](variable);
    return variable.value = 0;
  };

  Linear.prototype.suggest = function(path, value, strength, weight, continuation) {
    var variable;
    if (typeof path === 'string') {
      if (!(variable = this.variables[path])) {
        variable = this.Variable.prototype.declare(this, path);
      }
    } else {
      variable = path;
    }
    this.edit(variable, strength, weight, continuation);
    this.instance.suggestValue(variable, value);
    variable.value = value;
    this.suggested = true;
    return variable;
  };

  Linear.prototype.variable = function(name) {
    return new c.Variable({
      name: name
    });
  };

  Linear.prototype.strength = function(strength, byDefault) {
    if (byDefault == null) {
      byDefault = 'medium';
    }
    return strength && c.Strength[strength] || c.Strength[byDefault];
  };

  Linear.prototype.weight = function(weight, operation) {
    return weight;
  };

  return Linear;

})(Domain);

Linear.Mixin = {
  "yield": function(result, engine, operation, continuation, scope, ascender) {
    if (typeof result === 'number') {
      return operation.parent.domain.suggest('%' + operation.command.toExpression(operation), result, 'require');
    }
  }
};

Linear.prototype.Constraint = Constraint.extend({
  before: function(args, engine, operation, continuation, scope, ascender, ascending) {
    return this.get(engine, operation, ascending);
  },
  after: function(args, result, engine, operation, continuation, scope, ascender, ascending) {
    var _base, _base1, _name, _name1;
    if (result.hashCode) {
      return (_base = ((_base1 = (engine.operations || (engine.operations = {})))[_name1 = operation.hash || (operation.hash = this.toExpression(operation))] || (_base1[_name1] = {})))[_name = this.toHash(ascending)] || (_base[_name] = result);
    }
    return result;
  },
  get: function(engine, operation, scope) {
    var _ref, _ref1;
    return (_ref = engine.operations) != null ? (_ref1 = _ref[operation.hash || (operation.hash = this.toExpression(operation))]) != null ? _ref1[this.toHash(scope)] : void 0 : void 0;
  },
  "yield": Linear.Mixin["yield"],
  inject: function(engine, constraint) {
    return engine.instance.addConstraint(constraint);
  },
  eject: function(engine, constraint) {
    return engine.instance.removeConstraint(constraint);
  }
}, {
  '==': function(left, right, strength, weight, engine, operation) {
    return new c.Equation(left, right, engine.strength(strength), engine.weight(weight, operation));
  },
  '<=': function(left, right, strength, weight, engine, operation) {
    return new c.Inequality(left, c.LEQ, right, engine.strength(strength), engine.weight(weight, operation));
  },
  '>=': function(left, right, strength, weight, engine, operation) {
    return new c.Inequality(left, c.GEQ, right, engine.strength(strength), engine.weight(weight, operation));
  },
  '<': function(left, right, strength, weight, engine, operation) {
    return new c.Inequality(left, c.LEQ, engine['+'](right, 1), engine.strength(strength), engine.weight(weight, operation));
  },
  '>': function(left, right, strength, weight, engine, operation) {
    return new c.Inequality(left, c.GEQ, engine['+'](right, 1), engine.strength(strength), engine.weight(weight, operation));
  }
});

Linear.prototype.Variable = Variable.extend(Linear.Mixin, {
  get: function(path, engine, operation) {
    var variable;
    variable = this.declare(engine, path);
    engine.unedit(variable);
    return variable;
  }
});

Linear.prototype.Variable.Expression = Variable.Expression.extend(Linear.Mixin, {
  '+': function(left, right) {
    return c.plus(left, right);
  },
  '-': function(left, right) {
    return c.minus(left, right);
  },
  '*': function(left, right) {
    return c.times(left, right);
  },
  '/': function(left, right) {
    return c.divide(left, right);
  }
});

Linear.prototype.Meta = Command.Meta.extend({}, {
  'object': {
    execute: function(constraint, engine, operation) {
      if ((constraint != null ? constraint.hashCode : void 0) != null) {
        return operation[1].command.add(constraint, engine, operation[1], operation[0].key);
      }
    },
    descend: function(engine, operation) {
      var continuation, meta, scope;
      if (meta = operation[0]) {
        continuation = meta.key;
        scope = meta.scope && engine.identity[meta.scope] || engine.scope;
      }
      operation[1].parent = operation;
      return [operation[1].command.solve(engine, operation[1], continuation, scope, void 0, operation[0]), engine, operation];
    }
  }
});

Linear.prototype.Stay = Command.extend({
  signature: [
    {
      value: ['Variable']
    }
  ]
}, {
  stay: function(value, engine, operation) {
    engine.suggested = true;
    engine.instance.addStay(value);
  }
});

Linear.prototype.Remove = Command.extend({
  extras: 1,
  signature: false
}, {
  remove: function() {
    var args, engine, _i;
    args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), engine = arguments[_i++];
    return engine.remove.apply(engine, args);
  }
});

(function() {
  var obj, property, set;
  if (c.isUnordered == null) {
    obj = {
      '10': 1,
      '9': 1
    };
    for (property in obj) {
      break;
    }
    if (c.isUnordered = property > 9) {
      set = c.HashTable.prototype.set;
      return c.HashTable.prototype.set = function() {
        var store;
        if (!this._store.push) {
          store = this._store;
          this._store = [];
          for (property in store) {
            this._store[property] = store[property];
          }
        }
        return set.apply(this, arguments);
      };
    }
  }
})();

module.exports = Linear;



},{"../Command":15,"../Domain":16,"../commands/Constraint":22,"../commands/Variable":25,"cassowary":3}],29:[function(require,module,exports){
var Constraint, Data, Output,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __hasProp = {}.hasOwnProperty;

Data = require('./Data');

Constraint = require('../commands/Constraint');

Output = (function(_super) {
  __extends(Output, _super);

  function Output() {
    return Output.__super__.constructor.apply(this, arguments);
  }

  Output.prototype.Range = require('../commands/Range');

  Output.prototype.displayName = 'Output';

  Output.prototype.immutable = true;

  Output.prototype.priority = -200;

  Output.prototype.finalized = true;

  return Output;

})(Data);

Output.prototype.Constraint = Constraint.extend({
  signature: [
    {
      left: ['Variable', 'Number', 'Constraint', 'Range'],
      right: ['Variable', 'Number', 'Constraint', 'Range']
    }
  ]
}, {
  "&&": function(a, b) {
    return a.valueOf() && b.valueOf() || false;
  },
  "||": function(a, b) {
    return a.valueOf() || b.valueOf() || false;
  },
  "!=": function(a, b) {
    return a.valueOf() !== b.valueOf() || false;
  },
  "==": function(a, b) {
    return a === b;
  }
});

module.exports = Output;



},{"../commands/Constraint":22,"../commands/Range":24,"./Data":26}],30:[function(require,module,exports){
var Console, method, _i, _len, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Console = (function() {
  function Console(_at_level) {
    var _ref, _ref1, _ref2;
    this.level = _at_level;
    this.onError = __bind(this.onError, this);
    if (this.level == null) {
      this.level = (_ref = typeof self !== "undefined" && self !== null ? self.GSS_LOG : void 0) != null ? _ref : parseFloat((typeof self !== "undefined" && self !== null ? (_ref1 = self.location) != null ? (_ref2 = _ref1.search.match(/log=([\d.]+)/)) != null ? _ref2[1] : void 0 : void 0 : void 0) || 0);
    }
    if (!Console.bind) {
      this.level = 0;
    }
    this.stack = [];
    this.buffer = [];
    if (typeof self !== "undefined" && self !== null) {
      self.addEventListener('error', this.onError, true);
    }
  }

  Console.prototype.methods = ['log', 'warn', 'info', 'error', 'group', 'groupEnd', 'groupCollapsed', 'time', 'timeEnd', 'profile', 'profileEnd'];

  Console.prototype.groups = 0;

  Console.prototype.onError = function(e) {
    var _results;
    _results = [];
    while (this.pop(e)) {
      _results.push(true);
    }
    return _results;
  };

  Console.prototype.push = function(a, b, c, type) {
    var index;
    if (this.level >= 0.5 || type) {
      if (!this.buffer.length) {
        if (this.level > 1) {
          if (typeof console !== "undefined" && console !== null) {
            console.profile();
          }
        }
      }
      index = this.buffer.push(a, b, c, void 0, type || this.row);
      return this.stack.push(index - 5);
    }
  };

  Console.prototype.pop = function(d, type, update) {
    var index;
    if (type == null) {
      type = this.row;
    }
    if ((this.level >= 0.5 || type !== this.row) && this.stack.length) {
      index = this.stack.pop();
      this.buffer[index + 3] = d;
      if (type !== this.row) {
        this.buffer[index + 2] = this.getTime(this.buffer[index + 2]);
      }
      if (!this.stack.length) {
        this.flush();
      }
      return true;
    }
    return false;
  };

  Console.prototype.flush = function() {
    var index, item, _i, _len, _ref;
    if (this.level > 1) {
      if (typeof console !== "undefined" && console !== null) {
        console.profileEnd();
      }
    }
    _ref = this.buffer;
    for (index = _i = 0, _len = _ref.length; _i < _len; index = _i += 5) {
      item = _ref[index];
      this.buffer[index + 4].call(this, this.buffer[index], this.buffer[index + 1], this.buffer[index + 2], this.buffer[index + 3]);
    }
    return this.buffer = [];
  };

  Console.prototype.pad = function(object, length) {
    if (length == null) {
      length = 17;
    }
    if (object.length > length) {
      return object.substring(0, length - 1) + '…';
    } else {
      return object + Array(length - object.length).join(' ');
    }
  };

  Console.prototype.openGroup = function(name, reason, time, result) {
    var fmt, method;
    if (reason == null) {
      reason = '';
    }
    if (result == null) {
      result = '';
    }
    if (this.level < 0.5) {
      return;
    }
    fmt = '%c%s';
    switch (typeof reason) {
      case 'string':
        fmt += '%s';
        reason = this.pad(reason, 16);
        break;
      case 'object':
        fmt += '%O\t';
        if (reason.length == null) {
          fmt += '\t';
        }
    }
    switch (typeof result) {
      case 'string':
        fmt += '%s';
        result = this.pad(result, 17);
        break;
      case 'object':
        fmt += '%O\t';
        if (!(result.length > 9)) {
          fmt += '\t';
        }
    }
    fmt += ' %c%sms';
    name = this.pad(name, 13);
    if (this.level <= 1.5) {
      method = 'groupCollapsed';
    }
    return this[method || 'group'](fmt, 'font-weight: normal', name, reason, result, 'color: #999; font-weight: normal; font-style: italic;', time);
  };

  Console.prototype.closeGroup = function() {
    if (this.level >= 0.5) {
      return this.groupEnd();
    }
  };

  Console.prototype.stringify = function(obj) {
    if (!obj) {
      return '';
    }
    if (obj.push) {
      return obj.map(this.stringify, this);
    } else if (obj.nodeType) {
      return obj._gss_id;
    } else if (obj.toString !== Object.prototype.toString) {
      return obj.toString();
    } else if (obj.displayName) {
      return obj.displayName;
    } else {
      return JSON.stringify(obj);
    }
  };

  Console.prototype.debug = function(exp) {
    return document.location = document.location.toString().replace(/[&?]breakpoint=[^&]+|$/, ((document.location.search.indexOf('?') > -1) && '&' || '?') + 'breakpoint=' + exp.trim().replace(/\r?\n+|\r|\s+/g, ' '));
  };

  Console.prototype.breakpoint = decodeURIComponent(((typeof document !== "undefined" && document !== null ? document.location.search.match(/breakpoint=([^&]+)/, '') : void 0) || ['', ''])[1]);

  Console.prototype.row = function(a, b, c, d) {
    var fmt, index, p1, _ref;
    if (b == null) {
      b = '';
    }
    if (c == null) {
      c = '';
    }
    if (d == null) {
      d = '';
    }
    if (this.level < 1) {
      return;
    }
    a = a.name || a;
    if (typeof a !== 'string') {
      return;
    }
    p1 = Array(4 - Math.floor((a.length + 1) / 4)).join('\t');
    if ((index = c.indexOf((_ref = self.GSS) != null ? _ref.Engine.prototype.Command.prototype.DESCEND : void 0)) > -1) {
      if (c.indexOf('style[type*="gss"]') > -1) {
        c = c.substring(index + 1);
      }
    }
    c = c.replace(/\r?\n|\r|\s+/g, ' ');
    fmt = '%c%s';
    switch (typeof b) {
      case 'string':
        fmt += '%s';
        b = this.pad(b, 14);
        break;
      case 'object':
        fmt += '%O\t';
        if (!b.push) {
          b = [b];
        }
    }
    switch (typeof d) {
      case 'string':
      case 'boolean':
      case 'number':
        fmt += '  %s ';
        d = this.pad(String(d), 17);
        break;
      case 'object':
        fmt += '  %O\t   ';
        if (d.item) {
          d = Array.prototype.slice.call(d);
        } else if (d.length == null) {
          d = [d];
        }
    }
    if (typeof document !== "undefined" && document !== null) {
      return this.log(fmt + '%c%s', 'color: #666', this.pad(a, 11), b, d, 'color: #999', c);
    } else {
      return this.log(a, b, c);
    }
  };

  Console.prototype.start = function(reason, name) {
    if (this.level) {
      return this.push(reason, name, this.getTime(), this.openGroup);
    }
  };

  Console.prototype.end = function(result) {
    if (this.level) {
      this.buffer.push(void 0, void 0, void 0, void 0, this.closeGroup);
      return this.pop(result, this.openGroup, true);
    }
  };

  Console.prototype.getTime = function(other, time) {
    time || (time = (typeof performance !== "undefined" && performance !== null ? typeof performance.now === "function" ? performance.now() : void 0 : void 0) || (typeof Date.now === "function" ? Date.now() : void 0) || +(new Date));
    if (time && !other) {
      return time;
    }
    return Math.floor((time - other) * 100) / 100;
  };

  return Console;

})();

_ref = Console.prototype.methods;
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  method = _ref[_i];
  Console.prototype[method] = (function(method) {
    return function() {
      if (method === 'group' || method === 'groupCollapsed') {
        Console.prototype.groups++;
      } else if (method === 'groupEnd') {
        if (!Console.prototype.groups) {
          return;
        }
        Console.prototype.groups--;
      }
      if (this.level || method === 'error') {
        if (this.level > 0.5 || method === 'warn') {
          return typeof console !== "undefined" && console !== null ? typeof console[method] === "function" ? console[method].apply(console, arguments) : void 0 : void 0;
        }
      }
    };
  })(method);
}

module.exports = Console;



},{}],31:[function(require,module,exports){
var Exporter,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Exporter = (function() {
  function Exporter(_at_engine) {
    var _ref;
    this.engine = _at_engine;
    this.postexport = __bind(this.postexport, this);
    this.preexport = __bind(this.preexport, this);
    if (!(this.command = typeof location !== "undefined" && location !== null ? (_ref = location.search.match(/export=([a-z0-9]+)/)) != null ? _ref[1] : void 0 : void 0)) {
      return;
    }
    this.preexport();
  }

  Exporter.prototype.preexport = function() {
    var baseline, element, height, pairs, scope, width, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
    if ((scope = this.engine.scope).nodeType === 9) {
      scope = this.engine.scope.body;
    }
    this.engine.identify(scope);
    _ref = scope.getElementsByTagName('*');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      element = _ref[_i];
      if (element.tagName !== 'SCRIPT' && (element.tagName !== 'STYLE' || ((_ref1 = element.getAttribute('type')) != null ? _ref1.indexOf('gss') : void 0) > -1)) {
        this.engine.identify(element);
      }
    }
    if (window.Sizes) {
      this.sizes = [];
      _ref2 = window.Sizes;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        pairs = _ref2[_j];
        _ref3 = pairs[0];
        for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
          width = _ref3[_k];
          _ref4 = pairs[1];
          for (_l = 0, _len3 = _ref4.length; _l < _len3; _l++) {
            height = _ref4[_l];
            this.sizes.push(width + 'x' + height);
          }
        }
      }
    }
    if (this.command.indexOf('x') > -1) {
      _ref5 = this.command.split('x'), width = _ref5[0], height = _ref5[1];
      baseline = 72;
      width = parseInt(width) * baseline;
      height = parseInt(height) * baseline;
      window.addEventListener('load', (function(_this) {
        return function() {
          localStorage[_this.command] = JSON.stringify(_this["export"]());
          return _this.postexport();
        };
      })(this));
      document.body.style.width = width + 'px';
      this.engine.data.properties['::window[height]'] = function() {
        return height;
      };
      return this.engine.data.properties['::window[width]'] = function() {
        return width;
      };
    } else {
      if (this.command === 'true') {
        localStorage.clear();
        return this.postexport();
      }
    }
  };

  Exporter.prototype.postexport = function() {
    var property, result, size, value, _i, _len, _ref;
    _ref = this.sizes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      size = _ref[_i];
      if (!localStorage[size]) {
        location.search = location.search.replace(/[&?]export=([a-z0-9])+/, '') + '?export=' + size;
        return;
      }
    }
    result = {};
    for (property in localStorage) {
      value = localStorage[property];
      if (property.match(/^\d+x\d+$/)) {
        result[property] = JSON.parse(value);
      }
    }
    return document.write(JSON.stringify(result));
  };

  Exporter.prototype["export"] = function() {
    var id, index, path, property, value, values, _ref;
    values = {};
    _ref = this.engine.values;
    for (path in _ref) {
      value = _ref[path];
      if ((index = path.indexOf('[')) > -1 && path.indexOf('"') === -1) {
        property = this.engine.data.camelize(path.substring(index + 1, path.length - 1));
        id = path.substring(0, index);
        if (property === 'x' || property === 'y' || document.body.style[property] !== void 0) {
          if (this.engine.values[id + '[intrinsic-' + property + ']'] == null) {
            values[path] = Math.ceil(value);
          }
        }
      }
    }
    values.stylesheets = this.engine.document.Stylesheet["export"]();
    return values;
  };

  return Exporter;

})();

module.exports = Exporter;



},{}],32:[function(require,module,exports){
var Inspector,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty;

Inspector = (function() {
  function Inspector(_at_engine) {
    this.engine = _at_engine;
    this.draw = __bind(this.draw, this);
    this.onMouseMove = __bind(this.onMouseMove, this);
    this.onClick = __bind(this.onClick, this);
    this.onKeyUp = __bind(this.onKeyUp, this);
    this.onKeyDown = __bind(this.onKeyDown, this);
  }

  Inspector.prototype.toExpressionString = function(operation) {
    var i, klass, path, prop, _ref, _ref1, _ref2;
    if (operation != null ? operation.push : void 0) {
      if (operation[0] === 'get') {
        path = operation[1];
        i = path.indexOf('[');
        prop = path.substring(i + 1, path.length - 1);
        if ((this.engine.values[path.replace('[', '[intrinsic-')] != null) || prop.indexOf('intrinsic-') > -1) {
          klass = 'intrinsic';
        } else if (path.indexOf('"') > -1) {
          klass = 'virtual';
        } else if (i > -1) {
          if (prop === 'x' || prop === 'y') {
            klass = 'position';
          } else if (!((_ref = this.engine.data.properties[prop]) != null ? _ref.matcher : void 0)) {
            klass = 'local';
          }
        }
        return '<strong class="' + (klass || 'variable') + '" for="' + path + '" title="' + this.engine.values[path] + '">' + path + '</strong>';
      }
      return this.toExpressionString(operation[1]) + ' <b title=\'' + ((_ref1 = operation.parent) != null ? (_ref2 = _ref1[0]) != null ? _ref2.key : void 0 : void 0) + '\'>' + operation[0] + '</b> ' + this.toExpressionString(operation[2]);
    } else {
      return operation != null ? operation : '';
    }
  };

  Inspector.prototype.update = function() {
    if (this.engine.console.level > 0) {
      this.domains(this.engine.domains);
    }
    if (this.engine.console.level > 1.5 || this.rulers) {
      return this.refresh();
    }
  };

  Inspector.prototype.stylesheet = function() {
    var sheet;
    this.sheet = sheet = document.createElement('style');
    sheet.textContent = sheet.innerText = "domains {\n  display: block;\n  position: fixed;\n  z-index: 999999;\n  top: 0;\n  left: 0;\n  background: rgba(255,255,255,0.76);\n  font-family: Helvetica, Arial;\n}\ndomain {\n  -webkit-user-select: none;  /* Chrome all / Safari all */\n  -moz-user-select: none;     /* Firefox all */\n  -ms-user-select: none;      /* IE 10+ */\n\n  user-select: none;     \n}\npanel {\n  padding: 10px;\n  left: 0;\n  max-height: 800px;\n  overflow: auto;\n}\npanel strong, panel b{\n  font-weight: normal;\n}\npanel em {\n  color: red;\n}\npanel strong {\n  color: MidnightBlue;\n}\npanel strong.virtual {\n  color: green;\n}\npanel strong.intrinsic {\n  color: red;\n}\npanel strong.local {\n  color: black;\n}\npanel strong.position {\n  color: olive;\n}\npanel strong[mark] {\n  text-decoration: underline;\n}\ndomains domain{\n  padding: 5px;\n  text-align: center;\n  display: inline-block;\n  cursor: pointer;\n}\ndomain[hidden] {\n  color: #999;\n  background: none;\n}\ndomain.singles:before {\n  content: ' + ';\n  display: 'inline'\n}\ndomain, domain.active {\n  background: #fff;\n  color: #000;\n}\ndomain.active {\n  font-weight: bold;\n}\ndomains:hover domain {\n  background: none;\n}\ndomains:hover domain:hover {\n  background: #fff\n}\ndomain panel {\n  display: block;\n  position: absolute;\n  background: #fff;\n  text-align: left;\n  white-space: pre;\n  line-height: 18px;\n  font-size: 13px;\n  font-family: monospace, serif;\n}\ndomain panel {\n  display: none;\n}\ndomain:hover panel, body[reaching] panel {\n  display: block;\n}\nruler {\n  display: block;\n  position: absolute;\n  z-index: 99999;\n  border-width: 0;\n}\nruler[hidden] {\n  display: none;\n}\nruler.x {\n  border-bottom: 1px dotted orange;\n}\nruler.y {\n  border-right: 1px dotted orange;\n}\nruler.width {\n  border-bottom: 1px dashed blue;\n}\nruler.height {\n  border-right: 1px dashed blue;\n}\nruler.virtual {\n  border-color: green;\n}\nruler.virtual.height {\n  z-index: 99998;\n}\nbody:not([inspecting]) ruler.virtual.height {\n  width: 0px !important;\n}\nbody[inspecting][reaching] ruler.virtual.height:not(:hover) {\n  width: 0px !important;\n}\nruler.virtual.height:hover, body[inspecting]:not([reaching]) ruler.virtual.height {\n  background: rgba(0,255,0,0.15);\n}\nruler.constant {\n  border-style: solid;\n}\nruler.intrinsic {\n  border-color: red;\n}\nruler:before {\n  content: \"\";\n  display: block;\n  position: absolute;\n  right: 0;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  cursor: pointer;\n}\nruler.y:before, ruler.height:before, ruler.intrinsic-height:before {\n  left: -10px;\n  right: -10px;\n}\nruler.x:before, ruler.width:before, ruler.intrinsic-width:before {\n  top: -10px;\n  bottom: -10px;\n}\ndomain panel.filtered {\n  display: block\n}\nbody[reaching] ruler {\n  opacity: 0.2\n}\nbody[reaching] ruler.reached {\n  opacity: 1\n}";
    document.body.appendChild(sheet);
    document.addEventListener('mousedown', this.onClick);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('keydown', this.onKeyDown);
    return document.addEventListener('keyup', this.onKeyUp);
  };

  Inspector.prototype.refresh = function() {
    var bits, id, ids, property, value, values, _i, _len, _ref, _ref1, _results;
    values = {};
    _ref = this.engine.values;
    for (property in _ref) {
      value = _ref[property];
      values[property] = value;
    }
    if (this.rulers) {
      _ref1 = this.rulers;
      for (property in _ref1) {
        value = _ref1[property];
        if (!values.hasOwnProperty(property)) {
          values[property] = null;
        }
      }
    }
    ids = this.ids = [];
    for (property in values) {
      value = values[property];
      if ((bits = property.split('[')).length > 1) {
        if (ids.indexOf(bits[0]) === -1) {
          ids.push(bits[0]);
        }
      }
    }
    _results = [];
    for (_i = 0, _len = ids.length; _i < _len; _i++) {
      id = ids[_i];
      _results.push(this.draw(id, values));
    }
    return _results;
  };

  Inspector.prototype.onKeyDown = function(e) {
    if (e.altKey) {
      return document.body.setAttribute('inspecting', 'inspecting');
    }
  };

  Inspector.prototype.onKeyUp = function(e) {
    if (document.body.getAttribute('inspecting') != null) {
      return document.body.removeAttribute('inspecting');
    }
  };

  Inspector.prototype.getDomains = function(ids) {
    var domain, domains, id, property, value, _i, _len, _ref, _ref1;
    domains = [];
    _ref = this.engine.domains;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      domain = _ref[_i];
      if (domain.displayName !== 'Solved' && domain.constraints.length) {
        _ref1 = domain.values;
        for (property in _ref1) {
          if (!__hasProp.call(_ref1, property)) continue;
          value = _ref1[property];
          id = property.split('[');
          if (id.length > 1) {
            if (ids.indexOf(id[0]) > -1) {
              if (domains.indexOf(domain) === -1) {
                domains.push(domain);
              }
            }
          }
        }
      }
    }
    return domains;
  };

  Inspector.prototype.onClick = function(e) {
    var distance, domain, domains, ids, inspecting, prop, properties, property, props, target, _ref, _ref1, _ref2;
    if (((_ref = e.target.tagName) != null ? _ref.toLowerCase() : void 0) === 'domain') {
      if (!this.rulers) {
        this.refresh();
      }
      this.filter([e.target.getAttribute('for')], e.shiftKey || e.ctrlKey, true);
      e.preventDefault();
      return e.stopPropagation();
    } else {
      if (e.metaKey) {
        if (!this.rulers) {
          this.refresh();
        }
      }
      if (e.altKey || e.metaKey) {
        target = e.target;
        ids = [];
        inspecting = [];
        while (target) {
          if (target.nodeType === 1) {
            if (e.altKey && target._gss && target.classList.contains('virtual')) {
              inspecting.push(target.getAttribute('for'));
            } else if (target._gss_id) {
              inspecting.push(target._gss_id);
            }
          }
          target = target.parentNode;
        }
        domains = this.getDomains(inspecting);
        ids = domains.map(function(d) {
          return String(d.uid);
        });
        if (e.altKey) {
          this.visualize(null, inspecting, e.shiftKey);
          this.constraints(ids[0], null, inspecting, e.shiftKey);
        }
        if (e.metaKey) {
          this.filter(ids, e.shiftKey);
        }
      } else if ((property = document.body.getAttribute('reaching')) && ((_ref1 = e.target.tagName) != null ? _ref1.toLowerCase() : void 0) === 'ruler') {
        domain = this.reaching;
        if (domain && (properties = (_ref2 = domain.distances) != null ? _ref2[property] : void 0)) {
          props = [];
          for (prop in properties) {
            distance = properties[prop];
            if (!distance) {
              props.push(prop);
            }
          }
          this.constraints(domain.uid, null, props);
        }
      } else {
        return;
      }
      e.preventDefault();
      return e.stopPropagation();
    }
  };

  Inspector.prototype.constraints = function(id, element, props, all) {
    var d, diff, domain, el, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
    if (!this.panel) {
      this.panel = document.createElement('panel');
    } else {
      this.panel.classList.remove('filtered');
    }
    if (!element) {
      _ref = this.list.childNodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        if (el.getAttribute('for') === String(id)) {
          element = el;
          break;
        }
      }
      if (!element) {
        return;
      }
    }
    if (this.panel.parentNode !== element) {
      if ((_ref1 = this.panel.parentNode) != null) {
        _ref1.classList.remove('active');
      }
      element.appendChild(this.panel);
    }
    if (id === 'singles') {
      domain = this.singles;
    } else {
      _ref2 = this.engine.domains;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        d = _ref2[_j];
        if (String(d.uid) === String(id)) {
          domain = d;
          break;
        }
      }
    }
    if (domain) {
      this.panel.innerHTML = (_ref3 = domain.constraints) != null ? _ref3.map((function(_this) {
        return function(constraint) {
          return _this.toExpressionString(constraint.operations[0]);
        };
      })(this)).filter(function(string) {
        var prop, _k, _len2;
        if (!props) {
          return true;
        }
        for (_k = 0, _len2 = props.length; _k < _len2; _k++) {
          prop = props[_k];
          if (string.indexOf(prop) > -1) {
            if (!all && props.length > 1) {
              props.splice(1);
            }
            return true;
          }
        }
        return false;
      }).map(function(string) {
        var prop, _k, _len2;
        if (props) {
          for (_k = 0, _len2 = props.length; _k < _len2; _k++) {
            prop = props[_k];
            prop = prop.replace(/([\[\]$])/g, '\\$1');
            string = string.replace(new RegExp('\\>(' + prop + '[\\[\\"])', 'g'), ' mark>$1');
          }
        }
        return string;
      }).join('\n') : void 0;
      if (props) {
        this.panel.classList.add('filtered');
      }
      diff = element.offsetLeft + element.offsetWidth + 10 - this.panel.offsetWidth;
      if (diff > 0) {
        this.panel.style.left = diff + 'px';
      } else {
        this.panel.style.left = '';
      }
      return element.classList.add('active');
    }
  };

  Inspector.prototype.onMouseMove = function(e) {
    var target, _ref;
    target = e.target;
    if (target._gss) {
      return this.visualize(e.target.getAttribute('property'));
    }
    while (target) {
      if (target.nodeType === 1) {
        if (target.tagName.toLowerCase() === 'domain') {
          return this.constraints(target.getAttribute('for'), target);
        }
      }
      target = target.parentNode;
    }
    if ((_ref = this.panel) != null ? _ref.parentNode : void 0) {
      this.panel.parentNode.classList.remove('active');
      this.panel.parentNode.removeChild(this.panel);
    }
    if (this.reaching) {
      return this.visualize();
    }
  };

  Inspector.prototype.visualize = function(property, ids, all) {
    var distance, domain, id, key, prop, properties, props, reached, ruler, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _results;
    if (!property && !ids) {
      if (this.reaching) {
        this.reaching = void 0;
        document.body.removeAttribute('reaching');
        _ref = document.getElementsByTagName('ruler');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ruler = _ref[_i];
          ruler.classList.remove('reached');
        }
      }
      return;
    }
    if (!ids && document.body.getAttribute('reaching') === property) {
      return;
    }
    if (ids) {
      props = [];
      for (property in this.rulers) {
        for (_j = 0, _len1 = ids.length; _j < _len1; _j++) {
          id = ids[_j];
          if (property.substring(0, id.length) === id) {
            if (property.substring(id.length, id.length + 1) === '[') {
              props.push(property);
              if (!all && ids.length > 1) {
                ids.splice(1);
                break;
              }
            }
          }
        }
      }
    } else {
      props = [property];
      ids = [property.split('[')[0]];
    }
    domain = this.getDomains(ids)[0];
    reached = false;
    _results = [];
    for (_k = 0, _len2 = props.length; _k < _len2; _k++) {
      prop = props[_k];
      if (domain && (properties = (_ref1 = domain.distances) != null ? _ref1[prop] : void 0)) {
        _results.push((function() {
          var _ref2, _results1;
          _results1 = [];
          for (key in properties) {
            distance = properties[key];
            if (!distance) {
              reached = true;
              if ((_ref2 = this.rulers[key]) != null) {
                _ref2.classList.add('reached');
              }
              this.reaching = domain;
              _results1.push(document.body.setAttribute('reaching', prop || id));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        }).call(this));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Inspector.prototype.filter = function(ids, all, scroll) {
    var domain, i, id, index, node, offsetTop, property, ruler, top, _i, _j, _len, _len1, _ref, _ref1, _ref2;
    this.indexes || (this.indexes = (function() {
      var _i, _len, _ref, _results;
      _ref = this.list.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if (node.getAttribute('hidden') == null) {
          _results.push(node.getAttribute('for'));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }).call(this));
    if (all) {
      ids = (function() {
        var _i, _len, _ref, _results;
        _ref = this.list.childNodes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          _results.push(node.getAttribute('for'));
        }
        return _results;
      }).call(this);
      if (ids.toString() === this.indexes.toString()) {
        ids = [];
      }
      this.indexes = ids || [];
    } else {
      for (_i = 0, _len = ids.length; _i < _len; _i++) {
        id = ids[_i];
        if ((i = this.indexes.indexOf(id)) === -1) {
          this.indexes.push(id);
        } else {
          this.indexes.splice(i, 1);
        }
      }
    }
    _ref = this.list.childNodes;
    for (index = _j = 0, _len1 = _ref.length; _j < _len1; index = ++_j) {
      domain = _ref[index];
      if (this.engine.domains[index] != null) {
        if (this.indexes.indexOf(String(this.engine.domains[index].uid)) === -1) {
          domain.setAttribute('hidden', 'hidden');
          if (((_ref1 = this.panel) != null ? _ref1.parentNode : void 0) === domain) {
            domain.classList.remove('active');
            domain.removeChild(this.panel);
          }
        } else {
          domain.removeAttribute('hidden');
        }
      }
    }
    top = null;
    _ref2 = this.rulers;
    for (property in _ref2) {
      ruler = _ref2[property];
      if (this.indexes.indexOf(ruler.getAttribute('domain')) === -1) {
        ruler.setAttribute('hidden', 'hidden');
      } else {
        if (ruler.getAttribute('hidden') != null) {
          ruler.removeAttribute('hidden');
          offsetTop = 0;
          while (ruler) {
            offsetTop += ruler.offsetTop;
            ruler = ruler.offsetParent;
          }
          if ((top == null) || top > offsetTop) {
            top = offsetTop;
          }
        }
      }
    }
    if ((top != null) && scroll) {
      return window.scrollTo(0, top);
    }
  };

  Inspector.prototype.domains = function(domains) {
    var domain, index, innerHTML, multiples, singles, total, _i;
    this.singles = void 0;
    if (!this.sheet) {
      this.stylesheet();
    }
    if (!this.list) {
      this.list = document.createElement('domains');
      this.list._gss = true;
      document.body.appendChild(this.list);
    }
    total = 0;
    multiples = [];
    for (index = _i = domains.length - 1; _i >= 0; index = _i += -1) {
      domain = domains[index];
      if (domain.constraints.length === 1) {
        singles = this.singles || (this.singles = {
          constraints: [],
          uid: 'singles',
          displayName: 'Singles'
        });
        singles.constraints.push(domain.constraints[0]);
      } else {
        multiples.push(domain);
      }
    }
    multiples = multiples.sort(function(a, b) {
      return b.constraints.length - a.constraints.length;
    });
    if (singles) {
      multiples.push(singles);
    }
    Inspector.uid || (Inspector.uid = 0);
    innerHTML = multiples.map((function(_this) {
      return function(d) {
        var length, _ref;
        d.uid || (d.uid = ++Inspector.uid);
        length = ((_ref = d.constraints) != null ? _ref.length : void 0) || 0;
        total += length;
        return "<domain for=\"" + d.uid + "\" count=\"" + length + "\" " + (_this.engine.console.level <= 1 && 'hidden') + " class=\"" + (d.displayName.toLowerCase()) + "\">" + length + "</domain>";
      };
    })(this)).join('');
    innerHTML += '<label> = <strong>' + total + '</strong></label>';
    return this.list.innerHTML = innerHTML;
  };


  /*remap: (domain) ->
    if !(distances = domain.distances)
      distances = domain.distances = {}
      for constraint in domain.constraints
        for a of constraint.operations[0].variables
          if a.match(/width\]|height\]|\[\x]|\[\y\]|/)
            for b of constraint.operations[0].variables
              if b.match(/width\]|height\]|\[\x]|\[\y\]|/)
                @reach distances, a, b
   */

  Inspector.prototype.ruler = function(element, path, value, x, y, width, height, inside) {
    var bits, constraint, domain, id, konst, other, property, ruler, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
    bits = path.split('[');
    id = bits[0];
    property = bits[1].split(']')[0];
    if (!(ruler = (this.rulers || (this.rulers = {}))[path])) {
      if (value == null) {
        return;
      }
      ruler = this.rulers[path] = document.createElement('ruler');
      ruler.className = property;
      ruler._gss = true;
      id = path.split('[')[0];
      ruler.setAttribute('for', id);
      ruler.setAttribute('property', path);
      ruler.setAttribute('title', path);
      ruler.removeAttribute('hidden');
    } else if (value == null) {
      if ((_ref = ruler.parentNode) != null) {
        _ref.removeChild(ruler);
      }
      delete this.rulers[path];
      return;
    }
    domain = void 0;
    _ref1 = this.engine.domains;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      other = _ref1[_i];
      if (other.values.hasOwnProperty(path) && other.displayName !== 'Solved') {
        domain = other;
        break;
      }
    }
    if (!domain) {
      if ((_ref2 = ruler.parentNode) != null) {
        _ref2.removeChild(ruler);
      }
      return;
    }
    ruler.setAttribute('domain', domain.uid);
    if (!(konst = typeof this.engine.variables[path] === 'string')) {
      _ref3 = domain.constraints;
      for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
        constraint = _ref3[_j];
        if (constraint.operations[0].variables[path] && Object.keys(constraint.operations[0].variables).length === 1) {
          konst = true;
          break;
        }
      }
    }
    if (konst) {
      ruler.classList.add('constant');
    } else {
      ruler.classList.remove('constant');
    }
    if (this.engine.values[path.replace('[', '[intrinsic-')] != null) {
      ruler.classList.add('intrinsic');
    } else {
      ruler.classList.remove('intrinsic');
    }
    if (inside) {
      ruler.classList.add('virtual');
    } else {
      ruler.classList.remove('virtual');
    }
    ruler.style.top = Math.floor(y) + 'px';
    ruler.style.left = Math.floor(x) + 'px';
    ruler.style.width = width + 'px';
    ruler.style.height = height + 'px';
    if (inside) {
      if (!element.offsetHeight) {
        element = element.parentNode;
      }
      element.appendChild(ruler);
      if (property === 'height' && (this.engine.values[id + '[width]'] != null)) {
        return ruler.style.width = this.engine.values[id + '[width]'] + 'px';
      }
    } else {
      return element.parentNode.appendChild(ruler);
    }
  };

  Inspector.prototype.reach = function(distances, a, b, level) {
    var bc, c, _results;
    if (level == null) {
      level = 0;
    }
    (distances[a] || (distances[a] = {}))[b] = level;
    (distances[b] || (distances[b] = {}))[a] = level;
    _results = [];
    for (c in distances[a]) {
      bc = distances[b][c];
      if ((bc == null) || bc > level + 1) {
        _results.push(this.reach(distances, b, c, level + 1));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Inspector.prototype.draw = function(id, data) {
    var bits, clientLeft, clientTop, element, left, offsetLeft, offsetTop, parenting, prop, scope, top, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;
    if ((bits = id.split('"')).length > 1) {
      scope = bits[0];
    } else {
      scope = id;
    }
    if (((_ref = (element = this.engine.identity[scope])) != null ? _ref.nodeType : void 0) === 1) {
      if (scope !== id) {
        if (!element.offsetHeight && !element.offsetTop) {
          element = element.parentNode;
          scope = this.engine.identify(element);
          parenting = true;
        }
        top = (_ref1 = data[scope + '[y]']) != null ? _ref1 : 0;
        left = (_ref2 = data[scope + '[x]']) != null ? _ref2 : 0;
        clientTop = (_ref3 = data[id + '[y]']) != null ? _ref3 : 0;
        clientLeft = (_ref4 = data[id + '[x]']) != null ? _ref4 : 0;
        offsetTop = top + clientTop;
        offsetLeft = left + clientLeft;
      } else {
        top = element.offsetTop;
        left = element.offsetLeft;
      }
      if (!parenting) {
        if ((_ref5 = element.offsetWidth !== data[scope + '[width]']) != null ? _ref5 : data[scope + '[intrinsic-width]']) {
          clientLeft = left + element.clientLeft;
        }
        if ((_ref6 = element.offsetHeight !== data[scope + '[height]']) != null ? _ref6 : data[scope + '[intrinsic-height]']) {
          clientTop = top + element.clientTop;
        }
      }
    } else {
      element = document.body;
      left = (_ref7 = data[id + '[x]']) != null ? _ref7 : 0;
      top = (_ref8 = data[id + '[y]']) != null ? _ref8 : 0;
    }
    if (data.hasOwnProperty(prop = id + '[width]')) {
      this.ruler(element, prop, data[prop], clientLeft != null ? clientLeft : left, clientTop != null ? clientTop : top, data[prop], 0, scope !== id);
    }
    if (data.hasOwnProperty(prop = id + '[height]')) {
      this.ruler(element, prop, data[prop], clientLeft != null ? clientLeft : left, clientTop != null ? clientTop : top, 0, data[prop], scope !== id);
    }
    if (data.hasOwnProperty(prop = id + '[x]')) {
      this.ruler(element, prop, data[prop], (offsetLeft != null ? offsetLeft : left) - data[prop], offsetTop != null ? offsetTop : top, data[prop], 0, scope !== id);
    }
    if (data.hasOwnProperty(prop = id + '[y]')) {
      return this.ruler(element, prop, data[prop], offsetLeft != null ? offsetLeft : left, (offsetTop != null ? offsetTop : top) - data[prop], 0, data[prop], scope !== id);
    }
  };

  return Inspector;

})();

module.exports = Inspector;



},{}]},{},[2]);