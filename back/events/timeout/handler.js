'use strict';

module.exports.handler = (event, context, cb) => {
  event.delay = event.delay || 100;
  event.result = 'success';

  setTimeout((() => cb(null, event)), event.delay);
};
