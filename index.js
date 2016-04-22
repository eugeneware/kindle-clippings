var split = require('split2'),
    stream = require('stream'),
    combine = require('stream-combiner');

module.exports = parseKindle;
function parseKindle() {
  return combine(
    split(/==========\r\n/),
    parseClipping()
  );
}

function parseClipping() {
  var ts = stream.Transform({ objectMode: true });
  ts._transform = function (data, enc, cb) {
    var lines = data.split('\r\n')
      .map(trim)
      .filter(Boolean);

    var clipping = {
      title: lines[0],
      details: parseDetails(lines[1]),
      snippet: lines[2] || ''
    };
    ts.push(clipping);
    cb();
  }
  return ts;
}

var highlightRe = /^- Your (Highlight|Bookmark|Note) on (page|location)s? (\d+)(-(\d+))?$/i;
var locationRe = /^locations? (\d+)(-(\d+))?$/i;
var timeRe = /^Added on (.*)$/i;
function parseDetails(detailsStr) {
  var details = {}
  var parts = detailsStr.split('|').map(trim).filter(Boolean);
  var m;
  var part = parts.shift();
  if (m = highlightRe.exec(part)) {
    details.type = m[1].toLowerCase();
    var locationPage = m[2].toLowerCase();
    details[locationPage] = {};
    details[locationPage].from = parseInt(m[3], 10);
    if (m[5]) {
      details[locationPage].to = parseInt(m[5], 10);
    } else {
      details[locationPage].to = details[locationPage].from;
    }
  }
  if (parts.length === 2) {
    part = parts.shift();
    if (m = locationRe.exec(part)) {
      details.location = details.location || {};
      details.location.from = parseInt(m[1], 10);
      if (m[3]) {
        details.location.to = parseInt(m[3], 10);
      } else {
        details.location.to = details.location.from;
      }
    }
  }
  if (parts.length) {
    part = parts.shift();
    if (m = timeRe.exec(part)) {
      details.time = new Date(m[1]);
    }
  }

  return details;
}

function trim(s) {
  return s.trim();
}


