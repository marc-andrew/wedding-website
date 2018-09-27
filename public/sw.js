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
var PrecacheConfig = [["404.html","df02086bc0d7587056441f6426a8426d"],["add.html","75381139e713d374ab7544cf202f06b0"],["cookie-policy.html","afd0449f787b6ab39f4604a059176e42"],["css/404.9cb03202e218c916.css","9cb03202e218c916ea12fbf19a918067"],["css/hero.29d62ebd4d46d349.css","29d62ebd4d46d349dd593030e01024a9"],["css/nav.299060cc9b6d2b20.css","299060cc9b6d2b20d86823c39356fed4"],["css/rsvp.cbc103d4e9f81cdf.css","cbc103d4e9f81cdf37a3e3c2b9fa5f09"],["css/style.26a65c26b4f06d89.css","26a65c26b4f06d896eeda284d83fbf6e"],["img/abhilash.b3ae1b1ed7c794a6.jpg","b3ae1b1ed7c794a628bdee76d6e1f18c"],["img/alejandro.1a331fdb05f8fe80.jpg","1a331fdb05f8fe80d2ffe8d687ed44ca"],["img/andreas.38fe1443c34c2180.jpg","38fe1443c34c218074cb1173133cd487"],["img/anjani.546bc3a8bc5767a5.jpg","546bc3a8bc5767a5b33f7e552d100d7c"],["img/annie.497c57bae70fe5c0.jpg","497c57bae70fe5c005b8c5cecb6866a7"],["img/jeny.f08efd986894d466.jpg","f08efd986894d466796e4f320389847e"],["img/joana.9a3f055c6286515d.jpg","9a3f055c6286515d79795e61197e5018"],["img/jon.99705ee43cf829fb.jpg","99705ee43cf829fb2bcd00ae38916338"],["img/kamala.54b779a5bb9bae14.jpg","54b779a5bb9bae140b33a56e91105378"],["img/marc.b3951a3a906facbc.jpg","b3951a3a906facbc1550288e9f7e7b16"],["img/mike.dfefc5645c493429.jpg","dfefc5645c4934294860e76774fa31e8"],["img/nira-marc_hero-l.b8cf8fc0defa8494.jpg","b8cf8fc0defa8494ffb31ccce61b8476"],["img/nira-marc_hero-m.7cb49f248433fa5b.jpg","7cb49f248433fa5ba47c1d36acc40d6d"],["img/nira-marc_hero-s.7414461ba50e50d2.jpg","7414461ba50e50d2a41e678c1a298bf9"],["img/nira.40147bc4cfffd4fb.jpg","40147bc4cfffd4fbe7479db24efb1ddb"],["img/ph-hero-l.8b1fec288932a484.gif","8b1fec288932a48470f4a3e2158fcf62"],["img/ph-venue-l.64ee3b74a35ae2f2.gif","64ee3b74a35ae2f23123a73c93ca9e5c"],["img/sneha.2bb781a48fa4e7e0.jpg","2bb781a48fa4e7e0dee3aaf154556c61"],["img/venue-1-l.0a3331f8aba89d92.jpg","0a3331f8aba89d92b40c22de5cd46b99"],["img/venue-1-m.66ae9ec05f561b82.jpg","66ae9ec05f561b8233951196cf741122"],["img/venue-1-s.61c15f0672e6fe0c.jpg","61c15f0672e6fe0c7a039f01489c791d"],["img/venue-2-l.94de073f6b7cb6f4.jpg","94de073f6b7cb6f4d62bd0dc70a72f06"],["img/venue-2-m.31f3cbe3fdbaca2c.jpg","31f3cbe3fdbaca2cf2c39d69de5bd3f2"],["img/venue-2-s.f0b93ad8aa336a87.jpg","f0b93ad8aa336a87b94f14f36e15d3de"],["img/venue-3-l.aa9d83ba541bcca8.jpg","aa9d83ba541bcca86e8dc96b035175d3"],["img/venue-3-m.f1b7154d06ba2655.jpg","f1b7154d06ba265533afa66e8b7d94b7"],["img/venue-3-s.b052dc799eda3a39.jpg","b052dc799eda3a39775796c693e3e85f"],["img/venue-4-l.154f08799e6771c4.jpg","154f08799e6771c46d8c8ca7f74ac77e"],["img/venue-4-m.8b125f325a440910.jpg","8b125f325a440910c9d94fae0c39e623"],["img/venue-4-s.a8b82e9452590a90.jpg","a8b82e9452590a90520a096f3b79dbb0"],["img/vicky.1eb50a990ef37c5e.jpg","1eb50a990ef37c5e986c3b47415abf50"],["index.html","a5bd265d73f940a03a676bc4e817473c"],["js/rsvp.8b07c05ce144c95c.js","8b07c05ce144c95c311f598b6507cfbd"],["js/script.28fa285a8fca0587.js","28fa285a8fca0587c98cca0a467de06c"],["privacy-policy.html","bf4922d277db66c5827dc091f045027a"]];
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


/* @preserve Thu, 27 Sep 2018 22:29:04 GMT */