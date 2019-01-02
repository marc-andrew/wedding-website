/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren */
'use strict';



/* eslint-disable quotes, comma-spacing */
var PrecacheConfig = [["404.html","f9c4ca25c78cf74b939d214d84e204e6"],["cookie-policy.html","893459fe281fc2b9c83e358272263c67"],["css/404.b2149be6e9f5c013.css","b2149be6e9f5c013910bc5baff6b75a7"],["css/hero.849d1a49f34a5c40.css","849d1a49f34a5c40af1a2e5a9c9e89df"],["css/nav.1d11d78cda9c5a6d.css","1d11d78cda9c5a6d01bea373e1992d9e"],["css/style.9699d389a531d95e.css","9699d389a531d95e55d0b2f495693ec4"],["img/abhilash.534d8872984f4c47.jpg","534d8872984f4c47bad8ffe370180288"],["img/alejandro.2300aa73ba90c50a.jpg","2300aa73ba90c50aa4c09074d2ba4204"],["img/andreas.3bc65123c1b14037.jpg","3bc65123c1b140373f17ec4575693a88"],["img/anjani.dfb0e7fe479d4415.jpg","dfb0e7fe479d44151584852a5ebaf808"],["img/annie.386647c211900c82.jpg","386647c211900c825c9615b907766d32"],["img/info-1-l.dbb17bf45e0d4ac0.jpg","dbb17bf45e0d4ac04d048f02ec39b2e2"],["img/info-1-s.60e8f65a995897ec.jpg","60e8f65a995897ecad0fb432984edff1"],["img/info-2-l.d833d93e2fd40eab.jpg","d833d93e2fd40eab0b066bb236747533"],["img/info-2-s.686d5d5c86451c1d.jpg","686d5d5c86451c1d4065b11ae12773f9"],["img/info-3-l.ec7c1cc65fae8215.jpg","ec7c1cc65fae8215cad1ac1ba69077dd"],["img/info-3-s.90b2c89087a68e22.jpg","90b2c89087a68e22fbb2906a66a9b1d9"],["img/jeny.4faef875606bf20e.jpg","4faef875606bf20ee72c61a1872d8582"],["img/joana.fe4709c44910af6e.jpg","fe4709c44910af6ea017f769e4e388bb"],["img/jon.6c78f1e7509c0abc.jpg","6c78f1e7509c0abc365fc1797e09e593"],["img/jonathan.16c8c57016286b9e.jpg","16c8c57016286b9e9ea22dba06d87680"],["img/kamala.44d5b79f749e99e6.jpg","44d5b79f749e99e6ddd702cdd20d6013"],["img/marc.be93662ab78f761e.jpg","be93662ab78f761e4ed867eff04b67c2"],["img/matilda.84e5bcb261dd658a.jpg","84e5bcb261dd658a844b88eaa996a133"],["img/mike.2e021aa129a2df52.jpg","2e021aa129a2df525a77011c5101a7cf"],["img/nira-marc_hero-l.d3182c0acaf8c284.jpg","d3182c0acaf8c284faf98d3131a00c45"],["img/nira-marc_hero-m.1a82ff3e73bca255.jpg","1a82ff3e73bca25514c6d3643b069cdd"],["img/nira-marc_hero-s.28f256f8a7ba5a2b.jpg","28f256f8a7ba5a2b1a1779c8140d5ce3"],["img/nira.5f7812f3f14f20a5.jpg","5f7812f3f14f20a5509ce21e27fb9705"],["img/ph-hero-l.8b1fec288932a484.gif","8b1fec288932a48470f4a3e2158fcf62"],["img/ph-venue-l.64ee3b74a35ae2f2.gif","64ee3b74a35ae2f23123a73c93ca9e5c"],["img/sneha.ca10e8fe3206fe8e.jpg","ca10e8fe3206fe8ec2291cf517829273"],["img/venue-1-l.9d7d54ce142897de.jpg","9d7d54ce142897def50095a584f0a639"],["img/venue-1-s.1827febac11b3e3c.jpg","1827febac11b3e3c3d0c802af55563b5"],["img/venue-2-l.4104b6d04d6b6ba0.jpg","4104b6d04d6b6ba04a53757f9c2d0cf0"],["img/venue-2-s.2bcf46cf566c84db.jpg","2bcf46cf566c84db90fe5985db3bb6c4"],["img/venue-3-l.6c9f58fc28010e71.jpg","6c9f58fc28010e71d2ee40fd7a02cd18"],["img/venue-3-s.e8b9bfacfa75843b.jpg","e8b9bfacfa75843b96c3bf4e1b64c7d9"],["img/venue-4-l.9562f7c4b796e198.jpg","9562f7c4b796e1984cf535ee5c1e2ecf"],["img/venue-4-s.8397c6183ace1809.jpg","8397c6183ace1809c1d5c975cbd78d5d"],["img/vicky.e1adbd078868ac49.jpg","e1adbd078868ac498d3bb0dcfa056572"],["index.html","f828af89cc8a7c91c8159d5ba9c51dd2"],["js/script.c765516d0d489bd3.js","c765516d0d489bd3d7de1039d56b806c"],["privacy-policy.html","0281419974ade88e12af189c471c3e58"]];
/* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1-nmSW-' + (self.registration ? self.registration.scope : '') + '-';


var IgnoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var getCacheBustedUrl = function (url, now) {
    now = now || Date.now();

    var urlWithCacheBusting = new URL(url);
    urlWithCacheBusting.search += (urlWithCacheBusting.search ? '&' : '') + 'sw-precache=' + now;

    return urlWithCacheBusting.toString();
  };

var populateCurrentCacheNames = function (precacheConfig,
    cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  var now = Date.now();

  event.waitUntil(
    caches.keys().then(function(allCacheNames) {
      return Promise.all(
        Object.keys(CurrentCacheNamesToAbsoluteUrl).filter(function(cacheName) {
          return allCacheNames.indexOf(cacheName) === -1;
        }).map(function(cacheName) {
          var urlWithCacheBusting = getCacheBustedUrl(CurrentCacheNamesToAbsoluteUrl[cacheName],
            now);

          return caches.open(cacheName).then(function(cache) {
            var request = new Request(urlWithCacheBusting, {credentials: 'same-origin'});
            return fetch(request).then(function(response) {
              if (response.ok) {
                return cache.put(CurrentCacheNamesToAbsoluteUrl[cacheName], response);
              }

              console.error('Request for %s returned a response with status %d, so not attempting to cache it.',
                urlWithCacheBusting, response.status);
              // Get rid of the empty cache if we can't add a successful response to it.
              return caches.delete(cacheName);
            });
          });
        })
      ).then(function() {
        return Promise.all(
          allCacheNames.filter(function(cacheName) {
            return cacheName.indexOf(CacheNamePrefix) === 0 &&
                   !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      });
    }).then(function() {
      if (typeof self.skipWaiting === 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim === 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command === 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
      IgnoreUrlParametersMatching);

    var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    var directoryIndex = 'index.html';
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    var navigateFallback = '';
    // Ideally, this would check for event.request.mode === 'navigate', but that is not widely
    // supported yet:
    // https://code.google.com/p/chromium/issues/detail?id=540967
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1209081
    if (!cacheName && navigateFallback && event.request.headers.has('accept') &&
        event.request.headers.get('accept').includes('text/html')) {
      var navigateFallbackUrl = new URL(navigateFallback, self.location);
      cacheName = AbsoluteUrlToCacheName[navigateFallbackUrl.toString()];
    }

    if (cacheName) {
      event.respondWith(
        // Rely on the fact that each cache we manage should only have one entry, and return that.
        caches.open(cacheName).then(function(cache) {
          return cache.keys().then(function(keys) {
            return cache.match(keys[0]).then(function(response) {
              if (response) {
                return response;
              }
              // If for some reason the response was deleted from the cache,
              // raise and exception and fall back to the fetch() triggered in the catch().
              throw Error('The cache ' + cacheName + ' is empty.');
            });
          });
        }).catch(function(e) {
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


/* @preserve Wed, 02 Jan 2019 22:33:40 GMT */