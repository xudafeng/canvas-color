# canvas-color

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]

[npm-image]: https://img.shields.io/npm/v/canvas-color.svg?style=flat-square
[npm-url]: https://npmjs.org/package/canvas-color
[travis-image]: https://img.shields.io/travis/xudafeng/canvas-color.svg?style=flat-square
[travis-url]: https://travis-ci.org/xudafeng/canvas-color

> canvas color picker

## Usage

``` javascript
new CanvasColorPicker({
  image: 'https://avatars2.githubusercontent.com/u/9263023?v=4&s=400',
  size: 40,
  radius: 1.2,
  onSuccess: function(e) {
    // red green blue
    console.log(e);
  }
});
```

## CDN

[npmcdn link](//npmcdn.com/canvas-color@latest/picker.js)

## License

The MIT License (MIT)
