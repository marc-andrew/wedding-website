(function () {
    'use strict';
    var noJs = document.getElementsByClassName('no-js');
    // Delete no-js class name
    while (noJs.length > 0) {
        noJs[0].classList.remove('no-js');
    }

    // Responsive Image Script
    var resImg = function (el) {
        var obj = this,
            windowSizeObj = {};

        obj.id = el;
        obj.init = function () {
            obj.windowSize();
            obj.imgData();
            obj.windowScroll();
            obj.windowResize();
        };
        obj.imgData = function () {
            for (var i = 0; i < obj.id.length; i++) {
                var thisEl = obj.id[i],
                    dataLazy = thisEl.getAttribute('data-lazy');

                if (dataLazy !== 'true' || thisEl.parentNode.classList.contains('img--loaded')) {
                    obj.changeUrl(thisEl, obj.bpImg(thisEl));
                } else {
                    obj.inView(thisEl);
                }
            }
        };
        obj.bpImg = function (el) {
            var bp = el.getAttribute('data-srcset').match(/\s([0-9]+)w/g).join().replace(/\s/g, '').split(','),
                bpURL = el.getAttribute('data-srcset').match(/([a-zA-Z0-9/?$.:_-]+)\s/g).join().replace(/\s/g, '').split(',');

            return bpURL[obj.getBp(windowSizeObj.winW, bp)];
        };
        obj.windowSize = function () {
            var winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                winH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

            windowSizeObj.winW = winW;
            windowSizeObj.winH = winH;
        };
        obj.inView = function (el) {
            var elObj = el.nextElementSibling.getBoundingClientRect(),
                topPos = elObj.top,
                elHeight = elObj.height,
                threshold = 50,
                lazyWin = windowSizeObj.winH + threshold;

            if (topPos >= 0) {
                if (topPos <= lazyWin) obj.changeUrl(el, obj.bpImg(el));
            } else {
                var elInView = topPos + elHeight + threshold;
                if (elInView >= 0) obj.changeUrl(el, obj.bpImg(el));
            }
        };
        obj.getBp = function (vp, arr) {
            var arrLength = arr.length;
            for (var i = arrLength; i > 0; i--) {
                if (vp >= parseInt(arr[i - 1])) {
                    return parseInt(i - 1);
                } else if (vp < arr[0]) {
                    return 0;
                }
            }
        };
        obj.changeUrl = function (el, url) {
            var nextImg = el.nextElementSibling;
            if (nextImg.getAttribute('src') !== url) {
                if (!el.parentNode.classList.contains('loading')) {
                    el.parentNode.classList.add('loading');
                    var img = new Image();
                    img.addEventListener('load', function () {
                        nextImg.setAttribute('src', url);
                        el.parentNode.classList.remove('loading');
                        if (!el.parentNode.classList.contains('img--loaded')) el.parentNode.classList.add('img--loaded');
                    }, false);
                    img.src = url;
                }
            }
        };
        obj.windowScroll = function () {
            window.addEventListener('scroll', function (e) {
                obj.imgData();
            });
        };
        obj.windowResize = function () {
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

    // Count Down Script
    var countdown = function (el) {
        var obj = this;
        obj.id = el;
        obj.init = function (dt) {
            var end = new Date(dt),
                _second = 1000,
                _minute = _second * 60,
                _hour = _minute * 60,
                _day = _hour * 24,
                timer;

            function showRemaining() {
                var now = new Date(),
                    distance = end - now,
                    days = Math.floor(distance / _day),
                    hours = Math.floor((distance % _day) / _hour),
                    minutes = Math.floor((distance % _hour) / _minute),
                    seconds = Math.floor((distance % _minute) / _second);

                if (distance < 0) {
                    clearInterval(timer);
                    for (var i = 0; i < obj.id.children.length; i++) {
                        obj.id.children[i].innerHTML = '00';
                        obj.id.children[i].innerHTML = '00';
                        obj.id.children[i].innerHTML = '00';
                        obj.id.children[i].innerHTML = '00';
                    }
                    return;
                }

                for (var el = 0; el < obj.id.children.length; el++) {
                    if (obj.id.children[el].classList.contains('days')) obj.id.children[el].innerHTML = padNumber(days);
                    if (obj.id.children[el].classList.contains('hrs')) obj.id.children[el].innerHTML = padNumber(hours);
                    if (obj.id.children[el].classList.contains('mins')) obj.id.children[el].innerHTML = padNumber(minutes);
                    if (obj.id.children[el].classList.contains('secs')) obj.id.children[el].innerHTML = padNumber(seconds);
                }
            }

            function padNumber(number) {
                return (number < 10 ? '0' : '') + number;
            }

            timer = setInterval(showRemaining, 1000);
            showRemaining();
        };
    };

    // Nav item click
    var navClick = function (e) {
        e.preventDefault();
        var targetId = this.getAttribute('data-target-id');
        var targetEl = document.querySelector('[data-section-id="' + targetId + '"]');
        scrollTo(targetEl);
        setActiveNavItem(targetEl);
    };

    var navButton = document.getElementsByClassName('nav__list-link');
    var scrollDownButton = document.getElementsByClassName('btn--scroll-down')[0];

    for (var navEl = 0; navEl < navButton.length; navEl++) {
        navButton[navEl].addEventListener('click', navClick, false);
    }

    // Scroll down button with click listener
    scrollDownButton.addEventListener('click', navClick, false);

    // Set active nav item
    function setActiveNavItem(el) {
        for (var activeEl = 0; activeEl < navButton.length; activeEl++) {
            // On keydown, focus and blur
            if (navButton[activeEl].classList.contains('nav--list-link-active')) {
                navButton[activeEl].classList.remove('nav--list-link-active');
                break;
            }
        }

        el.classList.add('nav--list-link-active');
    }

    // Scroll to element
    function scrollTo(el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Loop through class to make it visible
    function titleVisible() {
        var targetClasses = document.getElementsByClassName('ta');
        var targetIndex = [];
    }

    // Shuffle array
    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    // shuffle(myArray);

    var imgSrc = document.getElementsByClassName('res-data');
    var responsiveImg = new resImg(imgSrc);
    responsiveImg.init();

    var cdWrapper = document.getElementsByClassName('countdown__timer')[0];
    var countdownTimer = new countdown(cdWrapper);
    countdownTimer.init('08/06/2019 16:00 GMT');
}());