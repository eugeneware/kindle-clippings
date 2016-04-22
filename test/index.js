var it = require('tape'),
    path = require('path'),
    fs = require('fs'),
    sl = require('streamlined'),
    kindleClippings = require('..');

var clippingFile = path.join(__dirname, 'fixtures', 'My Clippings.txt');

it('should be able to parse highlights', function(t) {
  t.plan(71);
  var count = 0;
  fs.createReadStream(clippingFile)
    .pipe(kindleClippings())
    .pipe(sl.where(function (data) {
      return data.details.type === 'highlight';
    }))
    .on('data', function (data) {
      t.equal(data.details.type, 'highlight');
      t.assert(data.title.length > 0, 'has a title');
      t.assert(data.snippet.length > 0, 'has a snippet');
      t.assert(data.details.page || data.details.location, 'have page or location')
      t.assert(data.details.time instanceof Date, 'time must exist');
      t.assert(data.details.page &&
        (data.details.page.from > 0 &&
         data.details.page.to >= data.details.page.to) ||
        data.details.location, 'have page from and to');
      t.assert(data.details.location &&
        (data.details.location.from > 0 &&
         data.details.location.to >= data.details.location.to) ||
        data.details.page, 'have page from and to');
      count++;
    })
    .on('end', function () {
      t.equal(count, 10, 'correct number of docs');
    });
});

it('should be able to parse notes', function(t) {
  t.plan(15);
  var count = 0;
  fs.createReadStream(clippingFile)
    .pipe(kindleClippings())
    .pipe(sl.where(function (data) {
      return data.details.type === 'note';
    }))
    .on('data', function (data) {
      t.equal(data.details.type, 'note');
      t.assert(data.title.length > 0, 'has a title');
      t.assert(data.snippet.length > 0, 'has a snippet');
      t.assert(data.details.page || data.details.location, 'have page or location')
      t.assert(data.details.time instanceof Date, 'time must exist');
      t.assert(data.details.page &&
        (data.details.page.from > 0 &&
         data.details.page.to >= data.details.page.to) ||
        data.details.location, 'have page from and to');
      t.assert(data.details.location &&
        (data.details.location.from > 0 &&
         data.details.location.to >= data.details.location.to) ||
        data.details.page, 'have page from and to');
      count++;
    })
    .on('end', function () {
      t.equal(count, 2, 'correct number of docs');
    });
});

it('should be able to parse bookmarks', function(t) {
  t.plan(15);
  var count = 0;
  fs.createReadStream(clippingFile)
    .pipe(kindleClippings())
    .pipe(sl.where(function (data) {
      return data.details.type === 'bookmark';
    }))
    .on('data', function (data) {
      t.equal(data.details.type, 'bookmark');
      t.assert(data.title.length > 0, 'has a title');
      t.assert(data.snippet.length === 0, 'should not have a snippet');
      t.assert(data.details.page || data.details.location, 'have page or location')
      t.assert(data.details.time instanceof Date, 'time must exist');
      t.assert(data.details.page &&
        (data.details.page.from > 0 &&
         data.details.page.to >= data.details.page.to) ||
        data.details.location, 'have page from and to');
      t.assert(data.details.location &&
        (data.details.location.from > 0 &&
         data.details.location.to >= data.details.location.to) ||
        data.details.page, 'have page from and to');
      count++;
    })
    .on('end', function () {
      t.equal(count, 2, 'correct number of docs');
    });
});

it('should be able to parse PDF entries', function(t) {
  t.plan(15);
  var count = 0;
  fs.createReadStream(clippingFile)
    .pipe(kindleClippings())
    .pipe(sl.where(function (data) {
      return ~data.title.indexOf('.pdf')
    }))
    .on('data', function (data) {
      t.equal(data.details.type, 'highlight');
      t.assert(data.title.length > 0, 'has a title');
      t.assert(data.snippet.length > 0, 'should have a snippet');
      t.assert(data.details.page || data.details.location, 'have page or location')
      t.assert(data.details.time instanceof Date, 'time must exist');
      t.assert(data.details.page &&
        (data.details.page.from > 0 &&
         data.details.page.to >= data.details.page.to) ||
        data.details.location, 'have page from and to');
      t.assert(data.details.location &&
        (data.details.location.from > 0 &&
         data.details.location.to >= data.details.location.to) ||
        data.details.page, 'have page from and to');
      count++;
    })
    .on('end', function () {
      t.equal(count, 2, 'correct number of docs');
    });
});
