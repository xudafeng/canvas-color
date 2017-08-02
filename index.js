'use strict'

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
items.forEach(item => {
  new CanvasColor.CanvasColor({
    image: `//avatars1.githubusercontent.com/u/${item}?v=4&s=400`,
    size: 40,
    radius: 1.2,
    onSuccess: function(e) {
      html += `
        <li style="background: ${`rgba(${e.red}, ${e.green}, ${e.blue}, 1)`}">
          <img src="${e.img}">
          <span>
            ${`rgba(${e.red}, ${e.green}, ${e.blue}, 1)`}
          </span>
        </li>
      `;
      document.querySelector('#list').innerHTML = html;
    }
  });
});
