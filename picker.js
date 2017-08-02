;(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    return define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    return factory(exports);
  } else {
    factory(root['CanvasColor'] || (root['CanvasColor'] = {}));
  }
})(this, function(exports, undefined) {
  'use strict';

  var guid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  };

  function CanvasColor(options) {
    this.image = options.image;
    this.size = options.size || 50;
    this.radius = options.radius || 1;
    this.onSuccess = options.onSuccess || function() {};
    this.init();
  }

  function getBase64(img, width, height) {
    var canvas = document.createElement('canvas');
    canvas.height = height;
    canvas.width = width;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL();
  }

  CanvasColor.prototype.init = function() {
    var that = this;
    var canvas = document.createElement('canvas');
    canvas.id = guid();
    canvas.width = this.size;
    canvas.height = this.size;
    var context = canvas.getContext('2d');

    if (typeof this.image === 'string') {
      var img = new Image();
      img.crossOrigin = '*';
      img.src = this.image;
      img.onload = function() {
        context.drawImage(this, 0, 0, that.size, that.size);
        var data = context.getImageData(0, 0, that.size, that.size).data;
        var res = that.getRGB(data, that.size, that.size);
        res.imgData = getBase64(img, this.width, this.height);
        that.onSuccess(res);
      };
    } else {
      context.drawImage(this.image, 0, 0, that.size, that.size);
      var data = context.getImageData(0, 0, that.size, that.size).data;
      var res = that.getRGB(data, that.size, that.size);
      res.imgData = getBase64(this.image, this.image.width, this.image.height);
      that.onSuccess(res);
    }
  };

  CanvasColor.prototype.getRGB = function(data, width, height) {
    var count = width * height;
    var red = 0;
    var green = 0;
    var blue = 0;

    data.forEach(function(pixel, index) {
      var colorIndex = index % 4;
      switch(colorIndex) {
        case 0:
          red += pixel;
          break;
        case 1:
          green += pixel;
          break;
        case 2:
          blue += pixel;
          break;
      }
    });

    red = red / count;
    green = green / count;
    blue = blue / count;

    var lightValue = 180;
    var lightCount = 0;
    var light = 0;

    if (red > lightValue) {
      lightCount++;
      light += red - lightValue;
    }
    if (green > lightValue) {
      lightCount++;
      light += green - lightValue;
    }
    if (blue > lightValue) {
      lightCount++;
      light += blue - lightValue;
    }

    var mColor = Math.max(red, green, blue);

    if (mColor - red > 10 || mColor - green > 10 || mColor - blue > 10) {
      if (mColor === red) {
        red *= this.radius;
      } else if (mColor === green) {
        green *= this.radius;
      } else {
        blue *= this.radius;
      }
    }

    if (lightCount >= 2) {
      var factor = 0.5 * light / (3 * (255 - lightValue));

      if (factor <= 0.5) {
        factor = 0.5;
      }

      red *= factor;
      green *= factor;
      blue *= factor;
    }

    return {
      red: Math.min(red >> 0, 255),
      green: Math.min(green >> 0, 255),
      blue: Math.min(blue >> 0, 255)
    };
  };

  exports.CanvasColor = CanvasColor;
});
