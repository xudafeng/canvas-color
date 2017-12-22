'use strict';

var guid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};

var getBase64 = function(img, width, height) {
  var canvas = document.createElement('canvas');
  canvas.height = height;
  canvas.width = width;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL();
};

function CanvasColor(options) {
  this.image = options.image;
  this.size = options.size || 50;
  this.radius = options.radius || 1;
  this.filter = options.filter;
  this.onSuccess = options.onSuccess || function() {};
  this.init();
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

CanvasColor.prototype.RGBtoHSV = function(rgb) {
  var r = rgb[0];
  var g = rgb[1];
  var b = rgb[2];

  r = r / 255;
  g = g / 255;
  b = b / 255;

  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h;
  var s;
  var v = max;

  var d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
    case r:
      h = (g - b) / d + (g < b ? 6 : 0);
      break;
    case g:
      h = (b - r) / d + 2;
      break;
    case b:
      h = (r - g) / d + 4;
      break;
    }
    h /= 6;
  }

  return [h, s, v];
};

CanvasColor.prototype.HSVtoRGB = function(hsv) {
  // in JS 1.7 use: var [h, s, l] = hsl;
  var h = hsv[0];
  var s = hsv[1];
  var v = hsv[2];
  var r;
  var g;
  var b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
  case 0:
    r = v;
    g = t;
    b = p;
    break;
  case 1:
    r = q;
    g = v;
    b = p;
    break;
  case 2:
    r = p;
    g = v;
    b = t;
    break;
  case 3:
    r = p;
    g = q;
    b = v;
    break;
  case 4:
    r = t;
    g = p;
    b = v;
    break;
  case 5:
    r = v;
    g = p;
    b = q;
    break;
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

CanvasColor.prototype.getRGB = function(data, width, height) {
  var count = width * height;
  var red = 0;
  var green = 0;
  var blue = 0;

  var keys = Object.keys(data);
  var total = keys.length;

  for (var i = 0; i < total / 4; i++) {
    var r = data[i * 4];
    var g = data[i * 4 + 1];
    var b = data[i * 4 + 2];

    if (this.filter && this.filter(r, g, b)) {
      continue;
    }

    red += r;
    green += g;
    blue += b;
  }

  red = red / count;
  green = green / count;
  blue = blue / count;

  red = red > 255 ? 255 : red;
  green = green > 255 ? 255 : green;
  blue = blue > 255 ? 255 : blue;

  var hsv = this.RGBtoHSV([red, green, blue]);

  hsv[1] = 0.5;
  hsv[2] = 0.5;

  var rgb = this.HSVtoRGB(hsv);

  return {
    red: Math.round(rgb[0]),
    green: Math.round(rgb[1]),
    blue: Math.round(rgb[2])
  };
};

exports.CanvasColor = CanvasColor;
