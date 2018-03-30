# canvas-color

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/canvas-color.svg?style=flat-square
[npm-url]: https://npmjs.org/package/canvas-color
[travis-image]: https://img.shields.io/travis/xudafeng/canvas-color.svg?style=flat-square
[travis-url]: https://travis-ci.org/xudafeng/canvas-color
[coveralls-image]: https://img.shields.io/coveralls/xudafeng/canvas-color.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/xudafeng/canvas-color?branch=master
[node-image]: https://img.shields.io/badge/node.js-%3E=_8-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/canvas-color.svg?style=flat-square
[download-url]: https://npmjs.org/package/canvas-color

> canvas color picker

## Usage

```javascript
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

<!-- GITCONTRIBUTOR_START -->

## Contributors

|[<img src="https://avatars1.githubusercontent.com/u/1011681?v=4" width="100px;"/><br/><sub><b>xudafeng</b></sub>](https://github.com/xudafeng)<br/>
| :---: |


This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor), auto upated at `Fri Mar 30 2018 13:52:55 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->

## License

The MIT License (MIT)
