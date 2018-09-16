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
            window.addEventListener('resize', function () {
                clearTimeout(timeOut);
                timeOut = setTimeout(run, 100);
            });

            function run() {
                obj.windowSize();
                obj.imgData();
            }
        };
    };

    // Element in viewport
    var elInViewPort = function (el) {
        var obj = this,
            windowSizeObj = {};

        obj.id = el;
        obj.init = function () {
            obj.windowSize();
            obj.loopEl();
            obj.windowScroll();
            obj.windowResize();
        };
        obj.loopEl = function () {
            for (var i = 0; i < obj.id.length; i++) {
                obj.inView(obj.id[i]);
            }
        };
        obj.addClass = function (el) {
            el.classList.add('visible');
            if (el.classList.contains('hero')) {
                titleVisible();
            }
        };
        obj.windowSize = function () {
            var winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                winH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

            windowSizeObj.winW = winW;
            windowSizeObj.winH = winH;
        };
        obj.inView = function (el) {
            var elObj = el.getBoundingClientRect(),
                topPos = elObj.top,
                elHeight = elObj.height;

            if (topPos >= 0) {
                if (topPos <= windowSizeObj.winH) obj.addClass(el);
            } else {
                var elInView = topPos + elHeight;
                if (elInView >= 0) obj.addClass(el);
            }
        };
        obj.windowScroll = function () {
            window.addEventListener('scroll', function (e) {
                obj.loopEl();
            });
        };
        obj.windowResize = function () {
            var timeOut;
            window.addEventListener('resize', function () {
                clearTimeout(timeOut);
                timeOut = setTimeout(run, 100);
            });

            function run() {
                obj.windowSize();
                obj.loopEl();
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
        scrollToY(targetEl.offsetTop - 52, 500, 'easeInOutQuint');
    };

    // Nav links
    var navButton = document.getElementsByClassName('nav__list-link');

    // Title
    var titleSpans = document.getElementsByClassName('t');
    var titleArrIndex = [];
    var titleArrLength = 0;

    // Form
    var formId = document.getElementById('rsvp-form');
    var emailId = document.getElementById('rsvp-email');
    var nameId = document.getElementById('rsvp-name');
    var lastNameId = document.getElementById('rsvp-lastname');

    for (var navEl = 0; navEl < navButton.length; navEl++) {
        navButton[navEl].addEventListener('click', navClick, false);
    }

    formId.setAttribute('novalidate','novalidate');
    emailId.addEventListener('blur', function(e) {
        if(validateEmail(this.value)) {
            this.classList.remove('rsvp--input-invalid');
        } else {
            this.classList.add('rsvp--input-invalid');
        }
    },true);

    nameId.addEventListener('blur', function(e) {
        if(checkIfempty(this.value)) {
            this.classList.remove('rsvp--input-invalid');
        } else {
            this.classList.add('rsvp--input-invalid');
        }
    },true);

    lastNameId.addEventListener('blur', function(e) {
        if(checkIfempty(this.value)) {
            this.classList.remove('rsvp--input-invalid');
        } else {
            this.classList.add('rsvp--input-invalid');
        }
    },true);

    formId.addEventListener('submit', function(e) {
        var emailValid = validateEmail(emailId.value);
        var nameValid = checkIfempty(nameId.value);
        var lastNameValid = checkIfempty(lastNameId.value);
        if(emailValid && nameValid && lastNameValid) {
            e.preventDefault();
            console.log('send');

            emailId.classList.remove('rsvp--input-invalid');
            nameId.classList.remove('rsvp--input-invalid');
            lastNameId.classList.remove('rsvp--input-invalid');
        } else {
            e.preventDefault();

            if(!emailValid) {
                emailId.classList.add('rsvp--input-invalid');
            } else {
                emailId.classList.remove('rsvp--input-invalid');
            }

            if(!nameValid) {
                nameId.classList.add('rsvp--input-invalid');
            } else {
                nameId.classList.remove('rsvp--input-invalid');
            }

            if(!lastNameValid) {
                lastNameId.classList.add('rsvp--input-invalid');
            } else {
                lastNameId.classList.remove('rsvp--input-invalid');
            }
        }
    });

    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    // Scroll to element
    function scrollToY(scrollTargetY, speed, easing) {
        // scrollTargetY: the target scrollY property of the window
        // speed: time in pixels per second
        // easing: easing equation to use

        var scrollY = window.scrollY || document.documentElement.scrollTop,
            currentTime = 0;

        // min time .1, max time .8 seconds
        var time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8));

        // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
        var easingEquations = {
            easeOutSine: function (pos) {
                return Math.sin(pos * (Math.PI / 2));
            },
            easeInOutSine: function (pos) {
                return (-0.5 * (Math.cos(Math.PI * pos) - 1));
            },
            easeInOutQuint: function (pos) {
                if ((pos /= 0.5) < 1) {
                    return 0.5 * Math.pow(pos, 5);
                }
                return 0.5 * (Math.pow((pos - 2), 5) + 2);
            }
        };

        // add animation loop
        function tick() {
            currentTime += 1 / 60;

            var p = currentTime / time;
            var t = easingEquations[easing](p);

            if (p < 1) {
                requestAnimFrame(tick);

                window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
            } else {
                console.log('scroll done');
                window.scrollTo(0, scrollTargetY);
            }
        }

        // call it once to get started
        tick();
    }

    // Loop through title class
    function titleVisible() {
        for (var tEl = 0; tEl < titleSpans.length; tEl++) {
            titleArrIndex.push(tEl);
        }

        // Shuffle the array
        titleArrIndex = shuffleArr(titleArrIndex);
        // Set the length
        titleArrLength = titleArrIndex.length;

        addTitleClass();
    }

    // Shuffle array function
    function shuffleArr(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    // Add visible class to title
    function addTitleClass() {
        var counter = 0;
        var timer;
        var runScript = function () {
            // Add class name
            titleSpans[titleArrIndex[counter]].classList.add('visible');
            counter++;
            if (counter === titleArrLength) clearInterval(timer);
        };

        // Run script every 20 milliseconds
        timer = setInterval(runScript, 20);
    }

    // Regex for empty fields
    function checkIfempty(str) {
        return /([^\s])/.test(str);
    }

    // Email validation
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Responsive Image
    var responsiveImg = new resImg(document.getElementsByClassName('res-data'));
    responsiveImg.init();

    // Element is visible
    var containerVisible = new elInViewPort(document.getElementsByClassName('container'));
    containerVisible.init();

    // Countdown
    var countdownTimer = new countdown(document.getElementsByClassName('countdown__timer')[0]);
    countdownTimer.init('08/06/2019 16:00 GMT');
}());