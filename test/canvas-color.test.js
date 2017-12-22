'use strict';

import {
  driver,
  BASE_URL
} from './helper';

describe('test/canvas-color.test.js', () => {

  describe('page func testing', () => {

    before(() => {
      return driver
        .initWindow({
          width: 1280,
          height: 800,
          deviceScaleFactor: 2
        });
    });

    afterEach(function () {
      return driver
        .coverage()
        .saveScreenshots(this);
    });

    after(() => {
      return driver
        .openReporter(true)
        .quit();
    });

    it('page render should be ok', () => {
      return driver
        .get(BASE_URL)
        .sleep(1000);
    });
  });
});
