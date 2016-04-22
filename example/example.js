var path = require('path'),
    fs = require('fs'),
    kindleClippings = require('..');
var clippingFile = path.join(__dirname, '..', 'test', 'fixtures', 'My Clippings.txt');

fs.createReadStream(clippingFile)
  .pipe(kindleClippings())
  .on('data', console.log);
