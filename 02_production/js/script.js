(function() {
    'use strict';
    var noJs = document.getElementsByClassName('no-js');
    // Delete no-js class name
    while (noJs.length > 0) {
        noJs[0].classList.remove('no-js');
    }

    // Responsive Image Script
    var resImg = function(el) {
        var obj = this,
            windowSizeObj = {};
        
        obj.id = el;
        obj.init = function() {
            obj.windowSize();
            obj.imgData();
            obj.windowScroll();
            obj.windowResize();
        };
        obj.imgData = function() {
            for(var i = 0; i < obj.id.length; i++) {
                var thisEl = obj.id[i],
                dataLazy = thisEl.getAttribute('data-lazy');
    
                if(dataLazy !== 'true' || thisEl.parentNode.classList.contains('loaded')) {
                    obj.changeUrl(thisEl,obj.bpImg(thisEl));
                } else {
                    obj.inView(thisEl);
                }
            }
        };
        obj.bpImg = function(el) {
            var bp = el.getAttribute('data-srcset').match(/\s([0-9]+)w/g).join().replace(/\s/g,'').split(','),
                bpURL = el.getAttribute('data-srcset').match(/([a-zA-Z0-9/?$.:_-]+)\s/g).join().replace(/\s/g,'').split(',');
    
            return bpURL[obj.getBp(windowSizeObj.winW,bp)];
        };
        obj.windowSize = function() {
            var winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                winH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    
            windowSizeObj.winW = winW;
            windowSizeObj.winH = winH;
        };
        obj.inView = function(el) {
            var elObj = el.nextElementSibling.getBoundingClientRect(),
                topPos = elObj.top,
                elHeight = elObj.height,
                threshold = 50,
                lazyWin = windowSizeObj.winH + threshold;
            
            if (topPos >= 0) {
                if (topPos <= lazyWin) obj.changeUrl(el,obj.bpImg(el));
            } else {
                var elInView = topPos + elHeight + threshold;
                if (elInView >= 0) obj.changeUrl(el,obj.bpImg(el));
            }
        };
        obj.getBp = function(vp, arr) {
            var arrLength = arr.length;
            for (var i = arrLength; i > 0; i--) {
                if (vp >= parseInt(arr[i - 1])) {
                    return parseInt(i - 1);
                } else if (vp < arr[0]) {
                    return 0;
                }
            }
        };
        obj.changeUrl = function(el,url) {
            var nextImg = el.nextElementSibling;
            if(nextImg.getAttribute('src') !== url) {
                if(!el.parentNode.classList.contains('loading')) {
                    el.parentNode.classList.add('loading');
                    var img = new Image();
                    img.addEventListener('load', function() {
                        nextImg.setAttribute('src',url);
                        el.parentNode.classList.remove('loading');
                        if(!el.parentNode.classList.contains('loaded')) el.parentNode.classList.add('loaded');
                    }, false);
                    img.src = url;
                }
            }
        };
        obj.windowScroll = function() {
            window.addEventListener('scroll', function(e) {
                obj.imgData();
            });
        };
        obj.windowResize = function() {
            var timeOut;
            window.onresize = function () {
                clearTimeout(timeOut);
                timeOut = setTimeout(run, 100);
            };
    
            function run() {
                obj.windowSize();
                obj.imgData();
            }
        };
    };
    
    // var imgSrc = document.getElementsByClassName('res-data');
    // var responsiveImg = new resImg(imgSrc);
    // responsiveImg.init();
}());