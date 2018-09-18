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
            if (el.classList.contains('hero') && !el.classList.contains('visible')) {
                titleVisible();
            }
            if (el.classList.contains('venue') && !el.classList.contains('visible')) {
                // Image Rotator
                var imgRotator = new contentRotator(document.getElementsByClassName('venue__slider'));
                imgRotator.init(5000);
            }
            if (el.classList.contains('map') && !el.classList.contains('visible')) {
                loadMap();
            }
            el.classList.add('visible');
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

    // Content Rotator
    var contentRotator = function (el) {
        var obj = this;
        var timeOutSpeed;

        obj.id = el;
        obj.init = function (speed) {
            for (var i = 0; i < obj.id.length; i++) {
                obj.slider(obj.id[i], obj.id[i].childElementCount, speed);
            }
        };
        obj.slider = function (el, itemLength, speed) {
            var currentItem = 0;

            timeOutSpeed = speed || 3000;

            el.children[0].classList.add('img--container-visible');

            setInterval(function () {
                if (currentItem < itemLength - 1) {
                    currentItem++;
                } else {
                    currentItem = 0;
                }

                for (var i = 0; i < el.children.length; i++) {
                    if (el.children[i].classList.contains('img--container-visible')) {
                        el.children[i].classList.remove('img--container-visible');
                        break;
                    }
                }

                el.children[currentItem].classList.add('img--container-visible');
            }, speed);
        };
        obj.timeOut = function () {
            setTimeout(alertFunc, timeOutSpeed);
        };
    };

    // Nav item click
    var navClick = function (e) {
        e.preventDefault();
        var targetId = this.getAttribute('data-target-id');
        window.location.hash = targetId;
        moveToHash();
        mobileNav(true);
    };

    // Nav links, Burger button & nav wrapper
    var navButton = document.getElementsByClassName('nav__list-link');
    var burgerBtn = document.getElementsByClassName('btn--burger')[0];
    var navPrimary = document.getElementsByClassName('nav--primary')[0];

    // Title
    var titleSpans = document.getElementsByClassName('t');
    var titleArrIndex = [];
    var titleArrLength = 0;

    // Form
    var formId = document.getElementById('rsvp-form');
    var emailId = document.getElementById('rsvp-email');
    var nameId = document.getElementById('rsvp-name');
    var lastNameId = document.getElementById('rsvp-lastname');
    var successCopy = document.getElementsByClassName('rsvp--copy')[0];

    var mapWarpper = document.getElementsByClassName('map')[0];
    var viewMapBtn = document.getElementsByClassName('btn--view-map')[0];

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

            successCopy.classList.add('rsvp--success');
            formId.classList.add('rsvp--form-hidden');

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

    // Open Map
    viewMapBtn.addEventListener('click', function(e) {
        moveToHash(this.getAttribute('data-target-id'));
    });

    // Burger button click
    burgerBtn.addEventListener('click', function(e) {
        if(this.classList.contains('btn--burger-active')) {
            mobileNav(true);
        } else {
            mobileNav(false);
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

    // Hide show mobile nav
    function mobileNav(isVisible) {
        if(isVisible) {
            burgerBtn.classList.remove('btn--burger-active');
            navPrimary.classList.remove('nav--primary-open');
            document.removeEventListener('click',checkIfOutside);
        } else {
            burgerBtn.classList.add('btn--burger-active');
            navPrimary.classList.add('nav--primary-open');
            document.addEventListener('click', checkIfOutside);
        }
    }

    function checkIfOutside(e) {
        if(!e.target.classList.contains('btn__burger-icon') && !e.target.classList.contains('btn--burger') && !e.target.classList.contains('nav--primary')) mobileNav(true);
    }

    function moveToHash(targetHash) {
        targetHash = targetHash || window.location.hash.substring(1);
        var targetEl = document.querySelector('[data-section-id="' + targetHash + '"]');
        if(targetEl) {
            scrollToY(targetEl.offsetTop - 52, 500, 'easeInOutQuint');
        }
    }

    function loadMap() {
        mapWarpper.innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2659.039350114157!2d16.374486315703955!3d48.20585797922898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d079e21d92331%3A0x417b4c58d40531b5!2sPalais+Coburg+Residenz!5e0!3m2!1sen!2suk!4v1537184868153" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>';
    }

    // Responsive Image
    var responsiveImg = new resImg(document.getElementsByClassName('res-data'));
    responsiveImg.init();

    // Element is visible
    var containerVisible = new elInViewPort(document.getElementsByClassName('container'));
    containerVisible.init();

    // Countdown
    var countdownTimer = new countdown(document.getElementsByClassName('countdown__timer')[0]);
    countdownTimer.init('08/06/2019 14:00 GMT');

    moveToHash();
    window.onhashchange = function() {moveToHash();};
}());