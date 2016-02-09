(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global Y */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function extend(Y) {
  require('./RedBlackTree.js')(Y);

  var Transaction = (function (_Y$Transaction) {
    _inherits(Transaction, _Y$Transaction);

    function Transaction(store) {
      _classCallCheck(this, Transaction);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Transaction).call(this, store));

      _this.store = store;
      _this.ss = store.ss;
      _this.os = store.os;
      _this.ds = store.ds;
      return _this;
    }

    return Transaction;
  })(Y.Transaction);

  var Database = (function (_Y$AbstractDatabase) {
    _inherits(Database, _Y$AbstractDatabase);

    function Database(y, opts) {
      _classCallCheck(this, Database);

      var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Database).call(this, y, opts));

      _this2.os = new Y.utils.RBTree();
      _this2.ds = new Y.utils.RBTree();
      _this2.ss = new Y.utils.RBTree();
      return _this2;
    }

    _createClass(Database, [{
      key: 'logTable',
      value: function logTable() {
        var self = this;
        self.requestTransaction(regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  console.log('User: ', this.store.y.connector.userId, "=============================="); // eslint-disable-line
                  _context.t0 = console;
                  return _context.delegateYield(this.getStateSet(), 't1', 3);

                case 3:
                  _context.t2 = _context.t1;

                  _context.t0.log.call(_context.t0, "State Set (SS):", _context.t2);

                  // eslint-disable-line
                  console.log("Operation Store (OS):"); // eslint-disable-line
                  return _context.delegateYield(this.os.logTable(), 't3', 7);

                case 7:
                  // eslint-disable-line
                  console.log("Deletion Store (DS):"); //eslint-disable-line
                  return _context.delegateYield(this.ds.logTable(), 't4', 9);

                case 9:
                  // eslint-disable-line
                  if (this.store.gc1.length > 0 || this.store.gc2.length > 0) {
                    console.warn('GC1|2 not empty!', this.store.gc1, this.store.gc2);
                  }
                  if (JSON.stringify(this.store.listenersById) !== '{}') {
                    console.warn('listenersById not empty!');
                  }
                  if (JSON.stringify(this.store.listenersByIdExecuteNow) !== '[]') {
                    console.warn('listenersByIdExecuteNow not empty!');
                  }
                  if (this.store.transactionInProgress) {
                    console.warn('Transaction still in progress!');
                  }

                case 13:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }), true);
      }
    }, {
      key: 'transact',
      value: function transact(makeGen) {
        var t = new Transaction(this);
        while (makeGen !== null) {
          var gen = makeGen.call(t);
          var res = gen.next();
          while (!res.done) {
            res = gen.next(res.value);
          }
          makeGen = this.getNextRequest();
        }
      }
    }, {
      key: 'destroy',
      value: regeneratorRuntime.mark(function destroy() {
        return regeneratorRuntime.wrap(function destroy$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _get(Object.getPrototypeOf(Database.prototype), 'destroy', this).call(this);
                delete this.os;
                delete this.ss;
                delete this.ds;

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, destroy, this);
      })
    }]);

    return Database;
  })(Y.AbstractDatabase);

  Y.extend('memory', Database);
}

module.exports = extend;
if (typeof Y !== 'undefined') {
  extend(Y);
}

},{"./RedBlackTree.js":2}],2:[function(require,module,exports){
'use strict';

/*
  This file contains a not so fancy implemantion of a Red Black Tree.
*/

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function (Y) {
  var N = (function () {
    // A created node is always red!

    function N(val) {
      _classCallCheck(this, N);

      this.val = val;
      this.color = true;
      this._left = null;
      this._right = null;
      this._parent = null;
      if (val.id === null) {
        throw new Error('You must define id!');
      }
    }

    _createClass(N, [{
      key: 'isRed',
      value: function isRed() {
        return this.color;
      }
    }, {
      key: 'isBlack',
      value: function isBlack() {
        return !this.color;
      }
    }, {
      key: 'redden',
      value: function redden() {
        this.color = true;return this;
      }
    }, {
      key: 'blacken',
      value: function blacken() {
        this.color = false;return this;
      }
    }, {
      key: 'rotateLeft',
      value: function rotateLeft(tree) {
        var parent = this.parent;
        var newParent = this.right;
        var newRight = this.right.left;
        newParent.left = this;
        this.right = newRight;
        if (parent === null) {
          tree.root = newParent;
          newParent._parent = null;
        } else if (parent.left === this) {
          parent.left = newParent;
        } else if (parent.right === this) {
          parent.right = newParent;
        } else {
          throw new Error('The elements are wrongly connected!');
        }
      }
    }, {
      key: 'next',
      value: function next() {
        if (this.right !== null) {
          // search the most left node in the right tree
          var o = this.right;
          while (o.left !== null) {
            o = o.left;
          }
          return o;
        } else {
          var p = this;
          while (p.parent !== null && p !== p.parent.left) {
            p = p.parent;
          }
          return p.parent;
        }
      }
    }, {
      key: 'prev',
      value: function prev() {
        if (this.left !== null) {
          // search the most right node in the left tree
          var o = this.left;
          while (o.right !== null) {
            o = o.right;
          }
          return o;
        } else {
          var p = this;
          while (p.parent !== null && p !== p.parent.right) {
            p = p.parent;
          }
          return p.parent;
        }
      }
    }, {
      key: 'rotateRight',
      value: function rotateRight(tree) {
        var parent = this.parent;
        var newParent = this.left;
        var newLeft = this.left.right;
        newParent.right = this;
        this.left = newLeft;
        if (parent === null) {
          tree.root = newParent;
          newParent._parent = null;
        } else if (parent.left === this) {
          parent.left = newParent;
        } else if (parent.right === this) {
          parent.right = newParent;
        } else {
          throw new Error('The elements are wrongly connected!');
        }
      }
    }, {
      key: 'getUncle',
      value: function getUncle() {
        // we can assume that grandparent exists when this is called!
        if (this.parent === this.parent.parent.left) {
          return this.parent.parent.right;
        } else {
          return this.parent.parent.left;
        }
      }
    }, {
      key: 'grandparent',
      get: function get() {
        return this.parent.parent;
      }
    }, {
      key: 'parent',
      get: function get() {
        return this._parent;
      }
    }, {
      key: 'sibling',
      get: function get() {
        return this === this.parent.left ? this.parent.right : this.parent.left;
      }
    }, {
      key: 'left',
      get: function get() {
        return this._left;
      },
      set: function set(n) {
        if (n !== null) {
          n._parent = this;
        }
        this._left = n;
      }
    }, {
      key: 'right',
      get: function get() {
        return this._right;
      },
      set: function set(n) {
        if (n !== null) {
          n._parent = this;
        }
        this._right = n;
      }
    }]);

    return N;
  })();

  var RBTree = (function () {
    function RBTree() {
      _classCallCheck(this, RBTree);

      this.root = null;
      this.length = 0;
    }

    _createClass(RBTree, [{
      key: 'findNext',
      value: regeneratorRuntime.mark(function findNext(id) {
        return regeneratorRuntime.wrap(function findNext$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.delegateYield(this.findWithLowerBound([id[0], id[1] + 1]), 't0', 1);

              case 1:
                return _context.abrupt('return', _context.t0);

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, findNext, this);
      })
    }, {
      key: 'findPrev',
      value: regeneratorRuntime.mark(function findPrev(id) {
        return regeneratorRuntime.wrap(function findPrev$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.delegateYield(this.findWithUpperBound([id[0], id[1] - 1]), 't0', 1);

              case 1:
                return _context2.abrupt('return', _context2.t0);

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, findPrev, this);
      })
    }, {
      key: 'findNodeWithLowerBound',
      value: function findNodeWithLowerBound(from) {
        if (from === void 0) {
          throw new Error('You must define from!');
        }
        var o = this.root;
        if (o === null) {
          return null;
        } else {
          while (true) {
            if ((from === null || Y.utils.smaller(from, o.val.id)) && o.left !== null) {
              // o is included in the bound
              // try to find an element that is closer to the bound
              o = o.left;
            } else if (from !== null && Y.utils.smaller(o.val.id, from)) {
              // o is not within the bound, maybe one of the right elements is..
              if (o.right !== null) {
                o = o.right;
              } else {
                // there is no right element. Search for the next bigger element,
                // this should be within the bounds
                return o.next();
              }
            } else {
              return o;
            }
          }
        }
      }
    }, {
      key: 'findNodeWithUpperBound',
      value: function findNodeWithUpperBound(to) {
        if (to === void 0) {
          throw new Error('You must define from!');
        }
        var o = this.root;
        if (o === null) {
          return null;
        } else {
          while (true) {
            if ((to === null || Y.utils.smaller(o.val.id, to)) && o.right !== null) {
              // o is included in the bound
              // try to find an element that is closer to the bound
              o = o.right;
            } else if (to !== null && Y.utils.smaller(to, o.val.id)) {
              // o is not within the bound, maybe one of the left elements is..
              if (o.left !== null) {
                o = o.left;
              } else {
                // there is no left element. Search for the prev smaller element,
                // this should be within the bounds
                return o.prev();
              }
            } else {
              return o;
            }
          }
        }
      }
    }, {
      key: 'findWithLowerBound',
      value: regeneratorRuntime.mark(function findWithLowerBound(from) {
        var n;
        return regeneratorRuntime.wrap(function findWithLowerBound$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                n = this.findNodeWithLowerBound(from);
                return _context3.abrupt('return', n == null ? null : n.val);

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, findWithLowerBound, this);
      })
    }, {
      key: 'findWithUpperBound',
      value: regeneratorRuntime.mark(function findWithUpperBound(to) {
        var n;
        return regeneratorRuntime.wrap(function findWithUpperBound$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                n = this.findNodeWithUpperBound(to);
                return _context4.abrupt('return', n == null ? null : n.val);

              case 2:
              case 'end':
                return _context4.stop();
            }
          }
        }, findWithUpperBound, this);
      })
    }, {
      key: 'iterate',
      value: regeneratorRuntime.mark(function iterate(t, from, to, f) {
        var o;
        return regeneratorRuntime.wrap(function iterate$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                o = this.findNodeWithLowerBound(from);

              case 1:
                if (!(o !== null && (to === null || Y.utils.smaller(o.val.id, to) || Y.utils.compareIds(o.val.id, to)))) {
                  _context5.next = 6;
                  break;
                }

                return _context5.delegateYield(f.call(t, o.val), 't0', 3);

              case 3:
                o = o.next();
                _context5.next = 1;
                break;

              case 6:
                return _context5.abrupt('return', true);

              case 7:
              case 'end':
                return _context5.stop();
            }
          }
        }, iterate, this);
      })
    }, {
      key: 'logTable',
      value: regeneratorRuntime.mark(function logTable(from, to, filter) {
        var os;
        return regeneratorRuntime.wrap(function logTable$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (filter == null) {
                  filter = function () {
                    return true;
                  };
                }
                if (from == null) {
                  from = null;
                }
                if (to == null) {
                  to = null;
                }
                os = [];
                return _context7.delegateYield(this.iterate(this, from, to, regeneratorRuntime.mark(function _callee(o) {
                  var o_, key;
                  return regeneratorRuntime.wrap(function _callee$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          if (filter(o)) {
                            o_ = {};

                            for (key in o) {
                              if (_typeof(o[key]) === 'object') {
                                o_[key] = JSON.stringify(o[key]);
                              } else {
                                o_[key] = o[key];
                              }
                            }
                            os.push(o_);
                          }

                        case 1:
                        case 'end':
                          return _context6.stop();
                      }
                    }
                  }, _callee, this);
                })), 't0', 5);

              case 5:
                if (console.table != null) {
                  console.table(os);
                }

              case 6:
              case 'end':
                return _context7.stop();
            }
          }
        }, logTable, this);
      })
    }, {
      key: 'find',
      value: regeneratorRuntime.mark(function find(id) {
        var n;
        return regeneratorRuntime.wrap(function find$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt('return', (n = this.findNode(id)) ? n.val : null);

              case 1:
              case 'end':
                return _context8.stop();
            }
          }
        }, find, this);
      })
    }, {
      key: 'findNode',
      value: function findNode(id) {
        if (id == null || id.constructor !== Array) {
          throw new Error('Expect id to be an array!');
        }
        var o = this.root;
        if (o === null) {
          return false;
        } else {
          while (true) {
            if (o === null) {
              return false;
            }
            if (Y.utils.smaller(id, o.val.id)) {
              o = o.left;
            } else if (Y.utils.smaller(o.val.id, id)) {
              o = o.right;
            } else {
              return o;
            }
          }
        }
      }
    }, {
      key: 'delete',
      value: regeneratorRuntime.mark(function _delete(id) {
        var d, o, isFakeChild, child;
        return regeneratorRuntime.wrap(function _delete$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!(id == null || id.constructor !== Array)) {
                  _context9.next = 2;
                  break;
                }

                throw new Error('id is expected to be an Array!');

              case 2:
                d = this.findNode(id);

                if (!(d == null)) {
                  _context9.next = 5;
                  break;
                }

                throw new Error('Element does not exist!');

              case 5:
                this.length--;
                if (d.left !== null && d.right !== null) {
                  // switch d with the greates element in the left subtree.
                  // o should have at most one child.
                  o = d.left;
                  // find

                  while (o.right !== null) {
                    o = o.right;
                  }
                  // switch
                  d.val = o.val;
                  d = o;
                }
                // d has at most one child
                // let n be the node that replaces d
                child = d.left || d.right;

                if (child === null) {
                  isFakeChild = true;
                  child = new N({ id: 0 });
                  child.blacken();
                  d.right = child;
                } else {
                  isFakeChild = false;
                }

                if (!(d.parent === null)) {
                  _context9.next = 14;
                  break;
                }

                if (!isFakeChild) {
                  this.root = child;
                  child.blacken();
                  child._parent = null;
                } else {
                  this.root = null;
                }
                return _context9.abrupt('return');

              case 14:
                if (!(d.parent.left === d)) {
                  _context9.next = 18;
                  break;
                }

                d.parent.left = child;
                _context9.next = 23;
                break;

              case 18:
                if (!(d.parent.right === d)) {
                  _context9.next = 22;
                  break;
                }

                d.parent.right = child;
                _context9.next = 23;
                break;

              case 22:
                throw new Error('Impossible!');

              case 23:
                if (d.isBlack()) {
                  if (child.isRed()) {
                    child.blacken();
                  } else {
                    this._fixDelete(child);
                  }
                }
                this.root.blacken();

                if (!isFakeChild) {
                  _context9.next = 35;
                  break;
                }

                if (!(child.parent.left === child)) {
                  _context9.next = 30;
                  break;
                }

                child.parent.left = null;
                _context9.next = 35;
                break;

              case 30:
                if (!(child.parent.right === child)) {
                  _context9.next = 34;
                  break;
                }

                child.parent.right = null;
                _context9.next = 35;
                break;

              case 34:
                throw new Error('Impossible #3');

              case 35:
              case 'end':
                return _context9.stop();
            }
          }
        }, _delete, this);
      })
    }, {
      key: '_fixDelete',
      value: function _fixDelete(n) {
        function isBlack(node) {
          return node !== null ? node.isBlack() : true;
        }
        function isRed(node) {
          return node !== null ? node.isRed() : false;
        }
        if (n.parent === null) {
          // this can only be called after the first iteration of fixDelete.
          return;
        }
        // d was already replaced by the child
        // d is not the root
        // d and child are black
        var sibling = n.sibling;
        if (isRed(sibling)) {
          // make sibling the grandfather
          n.parent.redden();
          sibling.blacken();
          if (n === n.parent.left) {
            n.parent.rotateLeft(this);
          } else if (n === n.parent.right) {
            n.parent.rotateRight(this);
          } else {
            throw new Error('Impossible #2');
          }
          sibling = n.sibling;
        }
        // parent, sibling, and children of n are black
        if (n.parent.isBlack() && sibling.isBlack() && isBlack(sibling.left) && isBlack(sibling.right)) {
          sibling.redden();
          this._fixDelete(n.parent);
        } else if (n.parent.isRed() && sibling.isBlack() && isBlack(sibling.left) && isBlack(sibling.right)) {
          sibling.redden();
          n.parent.blacken();
        } else {
          if (n === n.parent.left && sibling.isBlack() && isRed(sibling.left) && isBlack(sibling.right)) {
            sibling.redden();
            sibling.left.blacken();
            sibling.rotateRight(this);
            sibling = n.sibling;
          } else if (n === n.parent.right && sibling.isBlack() && isRed(sibling.right) && isBlack(sibling.left)) {
            sibling.redden();
            sibling.right.blacken();
            sibling.rotateLeft(this);
            sibling = n.sibling;
          }
          sibling.color = n.parent.color;
          n.parent.blacken();
          if (n === n.parent.left) {
            sibling.right.blacken();
            n.parent.rotateLeft(this);
          } else {
            sibling.left.blacken();
            n.parent.rotateRight(this);
          }
        }
      }
    }, {
      key: 'put',
      value: regeneratorRuntime.mark(function put(v) {
        var node, p;
        return regeneratorRuntime.wrap(function put$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(v == null || v.id == null || v.id.constructor !== Array)) {
                  _context10.next = 2;
                  break;
                }

                throw new Error('v is expected to have an id property which is an Array!');

              case 2:
                node = new N(v);

                if (!(this.root !== null)) {
                  _context10.next = 31;
                  break;
                }

                p = this.root; // p abbrev. parent

              case 5:
                if (!true) {
                  _context10.next = 28;
                  break;
                }

                if (!Y.utils.smaller(node.val.id, p.val.id)) {
                  _context10.next = 15;
                  break;
                }

                if (!(p.left === null)) {
                  _context10.next = 12;
                  break;
                }

                p.left = node;
                return _context10.abrupt('break', 28);

              case 12:
                p = p.left;

              case 13:
                _context10.next = 26;
                break;

              case 15:
                if (!Y.utils.smaller(p.val.id, node.val.id)) {
                  _context10.next = 24;
                  break;
                }

                if (!(p.right === null)) {
                  _context10.next = 21;
                  break;
                }

                p.right = node;
                return _context10.abrupt('break', 28);

              case 21:
                p = p.right;

              case 22:
                _context10.next = 26;
                break;

              case 24:
                p.val = node.val;
                return _context10.abrupt('return', p);

              case 26:
                _context10.next = 5;
                break;

              case 28:
                this._fixInsert(node);
                _context10.next = 32;
                break;

              case 31:
                this.root = node;

              case 32:
                this.length++;
                this.root.blacken();
                return _context10.abrupt('return', node);

              case 35:
              case 'end':
                return _context10.stop();
            }
          }
        }, put, this);
      })
    }, {
      key: '_fixInsert',
      value: function _fixInsert(n) {
        if (n.parent === null) {
          n.blacken();
          return;
        } else if (n.parent.isBlack()) {
          return;
        }
        var uncle = n.getUncle();
        if (uncle !== null && uncle.isRed()) {
          // Note: parent: red, uncle: red
          n.parent.blacken();
          uncle.blacken();
          n.grandparent.redden();
          this._fixInsert(n.grandparent);
        } else {
          // Note: parent: red, uncle: black or null
          // Now we transform the tree in such a way that
          // either of these holds:
          //   1) grandparent.left.isRed
          //     and grandparent.left.left.isRed
          //   2) grandparent.right.isRed
          //     and grandparent.right.right.isRed
          if (n === n.parent.right && n.parent === n.grandparent.left) {
            n.parent.rotateLeft(this);
            // Since we rotated and want to use the previous
            // cases, we need to set n in such a way that
            // n.parent.isRed again
            n = n.left;
          } else if (n === n.parent.left && n.parent === n.grandparent.right) {
            n.parent.rotateRight(this);
            // see above
            n = n.right;
          }
          // Case 1) or 2) hold from here on.
          // Now traverse grandparent, make parent a black node
          // on the highest level which holds two red nodes.
          n.parent.blacken();
          n.grandparent.redden();
          if (n === n.parent.left) {
            // Case 1
            n.grandparent.rotateRight(this);
          } else {
            // Case 2
            n.grandparent.rotateLeft(this);
          }
        }
      }
    }]);

    return RBTree;
  })();

  Y.utils.RBTree = RBTree;
};

},{}]},{},[1])

