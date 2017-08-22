'use strict';

const CanvasColor = require('./canvas-color');

const items = [
  '9607546',
  '9950313',
  '9441414',
  '1011681',
  '9766938',
  '9263023',
  '11460601'
];

var html = '';

var render = function(e) {
  html += `
    <li style="background: ${`rgba(${e.red}, ${e.green}, ${e.blue}, 1)`}">
      <img src="${e.imgData}">
      <span>
        ${`rgba(${e.red}, ${e.green}, ${e.blue}, 1)`}
      </span>
    </li>
  `;
  document.querySelector('#list').innerHTML = html;
};

items.forEach(item => {
  new CanvasColor.CanvasColor({
    image: `//avatars1.githubusercontent.com/u/${item}?v=4&s=400`,
    size: 40,
    radius: 1.2,
    onSuccess: function(e) {
      render(e);
    }
  });
});

var img = new Image();
img.crossOrigin = '*';
img.src = `//avatars1.githubusercontent.com/u/9607546?v=4&s=400`;
img.onload = function() {
  new CanvasColor.CanvasColor({
    image: this,
    size: 40,
    radius: 1.2,
    onSuccess: function(e) {
      render(e);
    }
  });
};
