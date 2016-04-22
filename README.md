# kindle-clippings

Parse Kindle My Clippings files as a Transform Stream

[![build status](https://secure.travis-ci.org/eugeneware/kindle-clippings.png)](http://travis-ci.org/eugeneware/kindle-clippings)

## Installation

This module is installed via npm:

``` bash
$ npm install kindle-clippings
```

## Example Usage

Copy the `My Clippings.txt` file from your Kindle and then use this module to parse it.

It will be parsed into `highlight`, `bookmark` and `note` entries:

``` js
var path = require('path'),
    fs = require('fs'),
    kindleClippings = require('kindle-clippings');

fs.createReadStream('./My Clippings.txt')
  .pipe(kindleClippings())
  .on('data', console.log);

/*
{ title: 'Better Than Before: Mastering the Habits of Our Everyday Lives (Rubin, Gretchen)',
  details:
   { type: 'highlight',
     location: { from: 1041, to: 1044 },
     time: Sat Jul 11 2015 16:27:48 GMT+1000 (AEST) },
  snippet: 'Outer disorder may act as a broken window. The “broken windows” theory of crime prevention was introduced in the 1980s by social scientists who observed that when a community tolerates disorder and petty crime, such as breaking of windows, graffiti, turnstile jumping, or drinking in public, people are more likely to commit more serious crimes. As a law enforcement theory, it’s controversial; but whether or not it’s true on a community-wide level, it’s true on a personal level.' }

  ...

{ title: 'Better Than Before: Mastering the Habits of Our Everyday Lives (Rubin, Gretchen)',
  details:
   { type: 'bookmark',
     page: { from: 91, to: 91 },
     location: { from: 1409, to: 1409 },
     time: Sat Jul 11 2015 19:51:11 GMT+1000 (AEST) },
  snippet: '' }

 ...

{ title: 'The Shallows: What the Internet Is Doing to Our Brains (Carr, Nicholas)',
  details:
   { type: 'note',
     location: { from: 1908, to: 1908 },
     time: Tue Jul 14 2015 16:26:26 GMT+1000 (AEST) },
  snippet: 'It\'s interesting that in most of history, there has always been a great disparity between th number of content creators and content consumers. Thus, those who posess the skils and will to create content have influnce over those who choose only to consume. Perhaps this is changing somewhat with social media, but the fragment of thought are not persuasive as an article or video which has the structure of a beginning, middle and end.' }
*/
```
