(function (g, f) {
    var hasExports = typeof exports === 'object';
    if (typeof define === "function" && define.amd) {
      define(['reflect-metadata', 'class-transformer', 'emath.js', 'pixi.js'], f);
    } else if (typeof module === "object" && module.exports) {
      module.exports = f(require('reflect-metadata'), require('class-transformer'), require('emath.js'), require('pixi.js'));
    } else {
      var m = hasExports ? f(require('reflect-metadata'), require('class-transformer'), require('emath.js'), require('pixi.js')) : f(g["reflect-metadata"], g["class-transformer"], g["emath.js"], g["pixi.js"]);
      var root = hasExports ? exports : g;
      for(var i in m) root[i] = m[i];
    }}(typeof self !== 'undefined' ? self : this, (__da, __db, __dc, __dd) => {
  var exports = {};
  var module = { exports };
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/yy-intersects/src/shape.js
var require_shape = __commonJS({
  "node_modules/yy-intersects/src/shape.js"(exports, module2) {
    var Shape2 = class _Shape {
      /**
       * @param {object} [article] that uses this shape
       */
      constructor(article) {
        this.article = article;
      }
      update() {
      }
      /**
       * collides with this shape's AABB box
       * @param {object} AABB
       */
      AABBs(AABB) {
        var AABB2 = this.AABB;
        return !(AABB[2] < AABB2[0] || AABB2[2] < AABB[0] || AABB[3] < AABB2[1] || AABB2[3] < AABB[1]);
      }
      /**
       * point-polygon collision test based on this.vertices
       * based on http://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon/2922778#2922778
       * @param {Point} point
       * @return {boolean}
       */
      collidesPoint(point) {
        const vertices = this.vertices;
        const length = vertices.length;
        let c = false;
        for (let i = 0, j = length - 2; i < length; i += 2) {
          if (vertices[i + 1] > point.y !== vertices[j + 1] > point.y && point.x < (vertices[j] - vertices[i]) * (point.y - vertices[i + 1]) / (vertices[j + 1] - vertices[i + 1]) + vertices[i]) {
            c = !c;
          }
          j = i;
        }
        return c;
      }
      collidesCircle() {
      }
      collidesRectangle() {
      }
      /**
       * Does Polygon collide Polygon or AABB?
       * based on http://stackoverflow.com/questions/10962379/how-to-check-intersection-between-2-rotated-rectangles
       * @param {Array} polygon
       * @param {boolean} isAABB
       * @return {boolean}
       */
      collidesPolygon(polygon, isAABB) {
        const a = this.vertices;
        const b = isAABB ? polygon : polygon.vertices;
        const polygons = [a, b];
        let minA, maxA, projected, minB, maxB;
        for (let i = 0; i < polygons.length; i++) {
          const polygon2 = polygons[i];
          for (let i1 = 0; i1 < polygon2.length; i1 += 2) {
            var i2 = (i1 + 2) % polygon2.length;
            var normal = { x: polygon2[i2 + 1] - polygon2[i1 + 1], y: polygon2[i1] - polygon2[i2] };
            minA = maxA = null;
            for (let j = 0; j < a.length; j += 2) {
              projected = normal.x * a[j] + normal.y * a[j + 1];
              if (minA === null || projected < minA) {
                minA = projected;
              }
              if (maxA === null || projected > maxA) {
                maxA = projected;
              }
            }
            minB = maxB = null;
            for (let j = 0; j < b.length; j += 2) {
              projected = normal.x * b[j] + normal.y * b[j + 1];
              if (minB === null || projected < minB) {
                minB = projected;
              }
              if (maxB === null || projected > maxB) {
                maxB = projected;
              }
            }
            if (maxA < minB || maxB < minA) {
              return false;
            }
          }
        }
        return true;
      }
      /**
       * Does polygon collide Line?
       * @param {Point} p1
       * @param {Point} p2
       * @return {boolean}
       */
      collidesLine(p1, p2) {
        const vertices = this.vertices;
        const length = vertices.length;
        if (this.collidesPoint(p1)) {
          return true;
        }
        for (let i = 0; i < length; i += 2) {
          const j = (i + 2) % length;
          if (_Shape.lineLine(p1, p2, { x: vertices[i], y: vertices[i + 1] }, { x: vertices[j], y: vertices[j + 1] })) {
            return true;
          }
        }
        return false;
      }
      /** catch all for automatic collision checking */
      collides(shape) {
        return this["collides" + shape.SHAPE](shape);
      }
      /**
       * Do two lines intersect?
       * from http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
       * @param {Point} p1
       * @param {Point} p2
       * @param {Point} p3
       * @param {Point} p4
       * @return {boolean}
       */
      static lineLine(p1, p2, p3, p4) {
        const p0_x = p1.x;
        const p0_y = p1.y;
        const p1_x = p2.x;
        const p1_y = p2.y;
        const p2_x = p3.x;
        const p2_y = p3.y;
        const p3_x = p4.x;
        const p3_y = p4.y;
        const s1_x = p1_x - p0_x;
        const s1_y = p1_y - p0_y;
        const s2_x = p3_x - p2_x;
        const s2_y = p3_y - p2_y;
        const s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
        const t = (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);
        return s >= 0 && s <= 1 && t >= 0 && t <= 1;
      }
    };
    module2.exports = Shape2;
  }
});

// node_modules/yy-intersects/src/rectangle.js
var require_rectangle = __commonJS({
  "node_modules/yy-intersects/src/rectangle.js"(exports, module2) {
    var Shape2 = require_shape();
    var Rectangle2 = class _Rectangle extends Shape2 {
      /**
       * @param {object} article that uses this shape
       * @param {object} [options] @see {@link Rectangle.set}
       */
      constructor(article, options) {
        super(article);
        this.SHAPE = "Rectangle";
        options = options || {};
        this._vertices = [];
        this.AABB = [0, 0, 0, 0];
        this.set(options);
      }
      /**
       * @param {object} options
       * @param {number} [options.width] width of object when aligned
       * @param {number} [options.height] height of object when aligned
       * @param {number} [options.square] side size of a square
       * @param {object} [options.center] object to use for position (and rotation, unless separately defined)
       * @param {object} [options.rotation] object to use for rotation instead of options.center or article
       * @param {boolean} [options.noRotate] object does not rotate (simplifies math)
       */
      set(options) {
        this.center = options.center || this.article;
        this.rotation = options.rotation ? options.rotation : options.center ? options.center : this.article;
        if (typeof options.square !== "undefined") {
          this._width = this._height = options.square;
        } else {
          this._width = options.width || this.article.width;
          this._height = options.height || this.article.height;
        }
        this.noRotate = options.noRotate;
        this.hw = this._width / 2;
        this.hh = this._height / 2;
        this.update();
      }
      /** width of rectangle */
      get width() {
        return this._width;
      }
      set width(value) {
        this._width = value;
        this.hw = value / 2;
      }
      /** height of rectangle */
      get height() {
        return this._height;
      }
      set height(value) {
        this._height = value;
        this.hh = value / 2;
      }
      /**
       * based on http://www.willperone.net/Code/coderr.php
       * update AABB and sets vertices to dirty
       */
      update() {
        const AABB = this.AABB;
        const center = this.center;
        if (this.noRotate) {
          const hw = this.hw;
          const hh = this.hh;
          AABB[0] = center.x - hw;
          AABB[1] = center.y - hh;
          AABB[2] = center.x + hw;
          AABB[3] = center.y + hh;
        } else {
          const s = Math.abs(Math.sin(this.rotation.rotation) / 2);
          const c = Math.abs(Math.cos(this.rotation.rotation) / 2);
          const width = this._width;
          const height = this._height;
          const ex = height * s + width * c;
          const ey = height * c + width * s;
          AABB[0] = center.x - ex;
          AABB[1] = center.y - ey;
          AABB[2] = center.x + ex;
          AABB[3] = center.y + ey;
        }
        this.verticesDirty = true;
      }
      /** updates vertices automatically when dirty */
      updateVertices() {
        const vertices = this._vertices;
        const center = this.center;
        const hw = this.hw;
        const hh = this.hh;
        if (this.noRotate) {
          const AABB = this.AABB;
          vertices[0] = AABB[0];
          vertices[1] = AABB[1];
          vertices[2] = AABB[2];
          vertices[3] = AABB[1];
          vertices[4] = AABB[2];
          vertices[5] = AABB[3];
          vertices[6] = AABB[0];
          vertices[7] = AABB[3];
        } else {
          const rotation = this.rotation.rotation;
          const sin = Math.sin(rotation);
          const cos = Math.cos(rotation);
          vertices[0] = center.x - hw * cos + hh * sin;
          vertices[1] = center.y - hw * sin - hh * cos;
          vertices[2] = center.x + hw * cos + hh * sin;
          vertices[3] = center.y + hw * sin - hh * cos;
          vertices[4] = center.x + hw * cos - hh * sin;
          vertices[5] = center.y + hw * sin + hh * cos;
          vertices[6] = center.x - hw * cos - hh * sin;
          vertices[7] = center.y - hw * sin + hh * cos;
        }
        this.verticesDirty = false;
      }
      /** sets vertices Array[8] */
      get vertices() {
        if (this.verticesDirty) {
          this.updateVertices();
        }
        return this._vertices;
      }
      /**
       * Does Rectangle collide Rectangle?
       * @param {Rectangle} rectangle
       * @return {boolean}
       */
      collidesRectangle(rectangle) {
        if (this.noRotate && rectangle.noRotate) {
          return this.AABBs(rectangle.AABB);
        } else {
          return this.collidesPolygon(rectangle);
        }
      }
      /**
       * Does Rectangle collide Circle?
       * @param {Circle} circle
       * @return {boolean}
       */
      collidesCircle(circle) {
        return circle.collidesRectangle(this);
      }
      static fromRectangle(x, y, width, height) {
        const center = { x: x + width / 2, y: y + height / 2 };
        return new _Rectangle(center, { width, height, noRotate: true });
      }
    };
    module2.exports = Rectangle2;
  }
});

// node_modules/yy-intersects/src/polygon.js
var require_polygon = __commonJS({
  "node_modules/yy-intersects/src/polygon.js"(exports, module2) {
    var Shape2 = require_shape();
    var Polygon2 = class extends Shape2 {
      /**
       * @param {Article} article that uses this shape
       * @param {array} points in the form of [x, y, x2, y2, x3, y3, . . .]
       * @param {object} [options] @see {@link Polygon.set}
       */
      constructor(article, points, options) {
        super(article);
        this.SHAPE = "Polygon";
        options = options || {};
        this.points = points;
        this.vertices = [];
        this.AABB = [];
        this.set(options);
      }
      /**
       * @param {object} options
       * @param {PIXI.Point[]} options.points
       * @param {PIXI.DisplayObject} [options.center] - object to use for position (and rotation, unless separately defined)
       * @param {PIXI.DisplayObject} [options.rotation] - object to use for rotation instead of options.center or article
       */
      set(options) {
        if (options.point) {
          this.points = options.points;
        }
        this.center = options.center || this.article;
        this.rotation = options.rotation ? options.rotation : options.center ? options.center : this.article;
        this.update();
      }
      /**
       * based on http://www.willperone.net/Code/coderr.php
       */
      update() {
        const rotation = this.rotation.rotation;
        const sin = Math.sin(rotation);
        const cos = Math.cos(rotation);
        let minX = Infinity, maxX = 0, minY = Infinity, maxY = 0;
        const points = this.points;
        const count = points.length;
        const vertices = this.vertices;
        const center = this.center;
        for (let i = 0; i < count; i += 2) {
          const pointX = points[i];
          const pointY = points[i + 1];
          const x = vertices[i] = center.x + pointX * cos - pointY * sin;
          const y = vertices[i + 1] = center.y + pointX * sin + pointY * cos;
          minX = x < minX ? x : minX;
          maxX = x > maxX ? x : maxX;
          minY = y < minY ? y : minY;
          maxY = y > maxY ? y : maxY;
        }
        this.AABB[0] = minX;
        this.AABB[1] = minY;
        this.AABB[2] = maxX;
        this.AABB[3] = maxY;
        this.width = maxX - minX;
        this.height = maxY - minY;
        this.hw = (maxX - minX) / 2;
        this.hh = (maxY - minY) / 2;
      }
      /**
       * Does Rectangle collide Rectangle?
       * @param {Rectangle} rectangle
       * @return {boolean}
       */
      collidesRectangle(rectangle) {
        return this.collidesPolygon(rectangle);
      }
      /**
       * Does Rectangle collide Circle?
       * @param {Circle} circle
       * @return {boolean}
       */
      collidesCircle(circle) {
        return circle.collidesPolygon(this);
      }
    };
    module2.exports = Polygon2;
  }
});

// node_modules/yy-intersects/src/circle.js
var require_circle = __commonJS({
  "node_modules/yy-intersects/src/circle.js"(exports, module2) {
    var Shape2 = require_shape();
    var Circle2 = class extends Shape2 {
      /**
       * @param {Article} article that uses this shape
       * @param {object} [options] - @see {@link Circle.set}
       */
      constructor(article, options) {
        super(article);
        this.SHAPE = "Circle";
        this.AABB = [];
        options = options || {};
        this.set(options);
      }
      /**
       * @param {object} options
       * @param {object} [options.positionObject=this.article] use this to update position
       * @param {number} [options.radius] otherwise article.width / 2 is used as radius
       */
      set(options) {
        this.radius = options.radius || this.article.width / 2;
        this.radiusSquared = this.radius * this.radius;
        this.center = options.positionObject ? options.positionObject : this.article;
        this.update();
      }
      /** update AABB */
      update() {
        const AABB = this.AABB;
        const radius = this.radius;
        const center = this.center;
        AABB[0] = center.x - radius;
        AABB[1] = center.y - radius;
        AABB[2] = center.x + radius;
        AABB[3] = center.y + radius;
      }
      /**
       * Does Circle collide with Circle?
       * @param {Circle} circle
       * @return {boolean}
       */
      collidesCircle(circle) {
        const thisCenter = this.center;
        const center = circle.center;
        const x = center.x - thisCenter.x;
        const y = center.y - thisCenter.y;
        const radii = circle.radius + this.radius;
        return x * x + y * y <= radii * radii;
      }
      /**
       * Does Circle collide with point?
       * @param {Point} point
       * @return {boolean}
       */
      collidesPoint(point) {
        const x = point.x - this.center.x;
        const y = point.y - this.center.y;
        return x * x + y * y <= this.radiusSquared;
      }
      /**
       * Does Circle collide with a line?
       * from http://stackoverflow.com/a/10392860/1955997
       * @param {Point} p1
       * @param {Point} p2
       * @return {boolean}
       */
      collidesLine(p1, p2) {
        function dot(v1, v2) {
          return v1[0] * v2[0] + v1[1] * v2[1];
        }
        const center = this.center;
        const ac = [center.x - p1.x, center.y - p1.y];
        const ab = [p2.x - p1.x, p2.y - p1.y];
        const ab2 = dot(ab, ab);
        const acab = dot(ac, ab);
        let t = acab / ab2;
        t = t < 0 ? 0 : t;
        t = t > 1 ? 1 : t;
        let h = [ab[0] * t + p1.x - center.x, ab[1] * t + p1.y - center.y];
        const h2 = dot(h, h);
        return h2 <= this.radiusSquared;
      }
      /**
       * Does circle collide with Rectangle?
       * @param {Rectangle} rectangle
       */
      collidesRectangle(rectangle) {
        if (rectangle.noRotate) {
          const AABB = rectangle.AABB;
          const hw = (AABB[2] - AABB[0]) / 2;
          const hh = (AABB[3] - AABB[1]) / 2;
          const center = this.center;
          const radius = this.radius;
          const distX = Math.abs(center.x - AABB[0]);
          const distY = Math.abs(center.y - AABB[1]);
          if (distX > hw + radius || distY > hh + radius) {
            return false;
          }
          if (distX <= hw || distY <= hh) {
            return true;
          }
          const x = distX - hw;
          const y = distY - hh;
          return x * x + y * y <= this.radiusSquared;
        } else {
          const center = this.center;
          if (rectangle.collidesPoint(center)) {
            return true;
          }
          const vertices = rectangle.vertices;
          return this.collidesLine({ x: vertices[0], y: vertices[1] }, { x: vertices[2], y: vertices[3] }) || this.collidesLine({ x: vertices[2], y: vertices[3] }, { x: vertices[4], y: vertices[5] }) || this.collidesLine({ x: vertices[4], y: vertices[5] }, { x: vertices[6], y: vertices[7] }) || this.collidesLine({ x: vertices[6], y: vertices[7] }, { x: vertices[0], y: vertices[1] });
        }
      }
      // from http://stackoverflow.com/a/402019/1955997
      collidesPolygon(polygon) {
        const center = this.center;
        if (polygon.collidesPoint(center)) {
          return true;
        }
        const vertices = polygon.vertices;
        const count = vertices.length;
        for (let i = 0; i < count - 2; i += 2) {
          if (this.collidesLine({ x: vertices[i], y: vertices[i + 1] }, { x: vertices[i + 2], y: vertices[i + 3] })) {
            return true;
          }
        }
        return this.collidesLine({ x: vertices[0], y: vertices[1] }, { x: vertices[count - 2], y: vertices[count - 1] });
      }
    };
    module2.exports = Circle2;
  }
});

// node_modules/yy-intersects/intersects.js
var require_intersects = __commonJS({
  "node_modules/yy-intersects/intersects.js"(exports, module2) {
    module2.exports = {
      Shape: require_shape(),
      Rectangle: require_rectangle(),
      Polygon: require_polygon(),
      Circle: require_circle()
    };
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  GameSprite: () => GameSprite,
  PixiGame: () => PixiGame,
  pixiGameDefaultConfig: () => pixiGameDefaultConfig
});
module.exports = __toCommonJS(src_exports);

// src/hookPixiGame.ts
function hookPixiGame() {
  if (!(typeof process !== "object" && typeof window !== "undefined")) {
    return;
  }
  if (typeof process !== "undefined") {
    console.error("eMath.js/pixiGame is not supported in browser environments. \n This requirement might be removed in the future.");
    return;
  }
  return;
}

// src/Sprite.ts
var import_yy_intersects = __toESM(require_intersects());
var GameSprite = class {
  /**
   * Constructs a new game sprite.
   * @param gameRef - The game reference.
   * @param spr - The PIXI sprite to create the game sprite from.
   * @param collisionShape - The type of collision shape to use for the sprite.
   * Default: "Rectangle"
   * Allowed values: "Circle", "Polygon", "Rectangle", "Shape", "Line".
   */
  constructor(gameRef, spr, collisionShape = "Rectangle") {
    this.gameRef = gameRef;
    this.sprite = this.gameRef.PIXI.app.stage.addChild(spr);
    this.x = this.sprite.x;
    this.y = this.sprite.y;
    this.collisionShape = collisionShape;
    this.intersects = new import_yy_intersects.default[this.collisionShape](this.sprite);
    this.gameRef.PIXI.app.ticker.add(this.tickerFn.bind(this), this);
  }
  /**
   * The ticker function for the sprite, used to offset the sprite by the camera.
   */
  tickerFn() {
    this.sprite.x = this.x - this.gameRef.PIXI.camera.x;
    this.sprite.y = this.y - this.gameRef.PIXI.camera.y;
  }
  /**
   * Checks if this sprite collides with another sprite.
   * @param other - The other sprite to check for collision with.
   * @returns True if a collision occurs, otherwise false.
   */
  collides(other) {
    if (this.x === Infinity || other.x === Infinity) return false;
    return Boolean(this.intersects[`collides${other.collisionShape}`](other.intersects));
  }
  /**
   * Removes the sprite from its parent container.
   * Note: This does not delete the sprite object, it only removes it from the parent container.
   * You should delete the sprite object after calling this method, or it will still exist in memory.
   */
  remove() {
    this.x = this.y = Infinity;
    this.sprite.parent.removeChild(this.sprite);
  }
};

// src/PixiGame.ts
var import_game = require("emath.js/ts/game");
var pixiGameDefaultConfig = {
  ...import_game.gameDefaultConfig,
  initIntervalBasedManagers: false,
  pixi: {
    app: null
  }
};
var PixiGame = class _PixiGame extends import_game.Game {
  static {
    this.configManager = new import_game.ConfigManager(pixiGameDefaultConfig);
  }
  /**
   * Creates a new instance of the pixiGame class.
   * @param config - The configuration for the game.
   */
  constructor(config) {
    super(config);
    this.config = _PixiGame.configManager.parse(config);
    if (!this.config.pixi.app) throw new Error(`No PIXI app was provided in config: ${JSON.stringify(this.config)}`);
    const app = this.config.pixi.app;
    this.PIXI = {
      app,
      camera: {
        x: 0,
        y: 0
      }
    };
    this.keyManager = new import_game.KeyManager({
      autoAddInterval: true
      // pixiApp: this.PIXI.app,
    });
    this.eventManager = new import_game.EventManager({
      autoAddInterval: true
      // pixiApp: this.PIXI.app,
    });
  }
  /**
   * Adds a sprite to the game.
   * @param spriteToAdd - The sprite to add.
   * @param collisionShape - The collision shape to use for the sprite.
   * @returns The sprite object.
   */
  addSprite(spriteToAdd, collisionShape = "Rectangle") {
    return new GameSprite(this, spriteToAdd, collisionShape);
  }
};

// src/index.ts
hookPixiGame();
/*! Bundled license information:

yy-intersects/src/shape.js:
  (**
   * @file src/shape.js
   * @author David Figatner
   * @license MIT
   * Copyright (c) 2016 YOPEY YOPEY LLC
   * {@link https://github.com/davidfig/intersects}
   *)

yy-intersects/src/rectangle.js:
  (**
   * @file src/rectangle.js
   * @author David Figatner
   * @license MIT
   * Copyright (c) 2016 YOPEY YOPEY LLC
   * {@link https://github.com/davidfig/intersects}
   *)

yy-intersects/src/polygon.js:
  (**
   * @file src/polygon.js
   * @author David Figatner
   * @license MIT
   * Copyright (c) 2016 YOPEY YOPEY LLC
   * {@link https://github.com/davidfig/intersects}
   *)

yy-intersects/src/circle.js:
  (**
   * @file src/circle.js
   * @author David Figatner
   * @license MIT
   * Copyright (c) 2016 YOPEY YOPEY LLC
   * {@link https://github.com/davidfig/intersects}
   *)

yy-intersects/intersects.js:
  (**
   * @file intersects.js
   * @author David Figatner
   * @license MIT
   * Copyright (c) 2016 YOPEY YOPEY LLC
   * {@link https://github.com/davidfig/intersects}
   *)
*/
if (typeof module.exports == "object" && typeof exports == "object") {
    var __cp = (to, from, except, desc) => {
      if ((from && typeof from === "object") || typeof from === "function") {
        for (let key of Object.getOwnPropertyNames(from)) {
          if (!Object.prototype.hasOwnProperty.call(to, key) && key !== except)
          Object.defineProperty(to, key, {
            get: () => from[key],
            enumerable: !(desc = Object.getOwnPropertyDescriptor(from, key)) || desc.enumerable,
          });
        }
      }
      return to;
    };
    module.exports = __cp(module.exports, exports);
  }
  return module.exports;
  }))
