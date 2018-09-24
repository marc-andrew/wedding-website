(function () {
    'use strict';
    const noJs = document.getElementsByClassName('no-js');
    // Delete no-js class name
    while (noJs.length > 0) {
        noJs[0].classList.remove('no-js');
    }

    // Responsive Image Script
    const resImg = function (el) {
        let obj = this,
            windowSizeObj = {};

        obj.id = el;
        obj.init = function () {
            obj.windowSize();
            obj.imgData();
            obj.windowScroll();
            obj.windowResize();
        };
        obj.imgData = function () {
            for (let i = 0; i < obj.id.length; i++) {
                let thisEl = obj.id[i],
                    dataLazy = thisEl.getAttribute('data-lazy');

                if (dataLazy !== 'true' || thisEl.parentNode.classList.contains('img--loaded')) {
                    obj.changeUrl(thisEl, obj.bpImg(thisEl));
                } else {
                    obj.inView(thisEl);
                }
            }
        };
        obj.bpImg = function (el) {
            let bp = el.getAttribute('data-srcset').match(/\s([0-9]+)w/g).join().replace(/\s/g, '').split(','),
                bpURL = el.getAttribute('data-srcset').match(/([a-zA-Z0-9/?$.:_-]+)\s/g).join().replace(/\s/g, '').split(',');

            return bpURL[obj.getBp(windowSizeObj.winW, bp)];
        };
        obj.windowSize = function () {
            let winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                winH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            windowSizeObj.winW = winW;
            windowSizeObj.winH = winH;
        };
        obj.inView = function (el) {
            let elObj = el.nextElementSibling.getBoundingClientRect(),
                topPos = elObj.top,
                elHeight = elObj.height,
                threshold = 50,
                lazyWin = windowSizeObj.winH + threshold;

            if (topPos >= 0) {
                if (topPos <= lazyWin) obj.changeUrl(el, obj.bpImg(el));
            } else {
                let elInView = topPos + elHeight + threshold;
                if (elInView >= 0) obj.changeUrl(el, obj.bpImg(el));
            }
        };
        obj.getBp = function (vp, arr) {
            let arrLength = arr.length;
            for (let i = arrLength; i > 0; i--) {
                if (vp >= parseInt(arr[i - 1])) {
                    return parseInt(i - 1);
                } else if (vp < arr[0]) {
                    return 0;
                }
            }
        };
        obj.changeUrl = function (el, url) {
            let nextImg = el.nextElementSibling;
            if (nextImg.getAttribute('src') !== url) {
                if (!el.parentNode.classList.contains('loading')) {
                    el.parentNode.classList.add('loading');
                    let img = new Image();
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
            let timeOut;
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
    const elInViewPort = function (el) {
        let obj = this,
            windowSizeObj = {};

        obj.id = el;
        obj.init = function () {
            obj.windowSize();
            obj.loopEl();
            obj.windowScroll();
            obj.windowResize();
        };
        obj.loopEl = function () {
            for (let i = 0; i < obj.id.length; i++) {
                obj.inView(obj.id[i]);
            }
        };
        obj.addClass = function (el) {
            if (el.classList.contains('hero') && !el.classList.contains('visible')) {
                titleVisible();
            }
            if (el.classList.contains('venue') && !el.classList.contains('visible')) {
                // Image Rotator
                let imgRotator = new contentRotator(document.getElementsByClassName('venue__slider'));
                imgRotator.init(5000);
            }
            if (el.classList.contains('map') && !el.classList.contains('visible')) {
                loadMap();
            }
            el.classList.add('visible');
        };
        obj.windowSize = function () {
            let winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                winH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

            windowSizeObj.winW = winW;
            windowSizeObj.winH = winH;
        };
        obj.inView = function (el) {
            let elObj = el.getBoundingClientRect(),
                topPos = elObj.top,
                elHeight = elObj.height;

            if (topPos >= 0) {
                if (topPos <= windowSizeObj.winH) obj.addClass(el);
            } else {
                let elInView = topPos + elHeight;
                if (elInView >= 0) obj.addClass(el);
            }
        };
        obj.windowScroll = function () {
            window.addEventListener('scroll', function (e) {
                obj.loopEl();
            });
        };
        obj.windowResize = function () {
            let timeOut;
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
    const countdown = function (el) {
        let obj = this;
        obj.id = el;
        obj.init = function (dt) {
            let end = new Date(dt),
                _second = 1000,
                _minute = _second * 60,
                _hour = _minute * 60,
                _day = _hour * 24,
                timer;

            function showRemaining() {
                let now = new Date(),
                    distance = end - now,
                    days = Math.floor(distance / _day),
                    hours = Math.floor((distance % _day) / _hour),
                    minutes = Math.floor((distance % _hour) / _minute),
                    seconds = Math.floor((distance % _minute) / _second);

                if (distance < 0) {
                    clearInterval(timer);
                    for (let i = 0; i < obj.id.children.length; i++) {
                        obj.id.children[i].innerHTML = '00';
                        obj.id.children[i].innerHTML = '00';
                        obj.id.children[i].innerHTML = '00';
                        obj.id.children[i].innerHTML = '00';
                    }
                    return;
                }

                for (let i = 0; i < obj.id.children.length; i++) {
                    if (obj.id.children[i].classList.contains('days')) obj.id.children[i].innerHTML = padNumber(days);
                    if (obj.id.children[i].classList.contains('hrs')) obj.id.children[i].innerHTML = padNumber(hours);
                    if (obj.id.children[i].classList.contains('mins')) obj.id.children[i].innerHTML = padNumber(minutes);
                    if (obj.id.children[i].classList.contains('secs')) obj.id.children[i].innerHTML = padNumber(seconds);
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
    const contentRotator = function (el) {
        let obj = this;
        let timeOutSpeed;

        obj.id = el;
        obj.init = function (speed) {
            for (let i = 0; i < obj.id.length; i++) {
                obj.slider(obj.id[i], obj.id[i].childElementCount, speed);
            }
        };
        obj.slider = function (el, itemLength, speed) {
            let currentItem = 0;

            timeOutSpeed = speed || 3000;

            el.children[0].classList.add('img--container-visible');

            setInterval(function () {
                if (currentItem < itemLength - 1) {
                    currentItem++;
                } else {
                    currentItem = 0;
                }

                for (let i = 0; i < el.children.length; i++) {
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
    const navClick = function (e) {
        e.preventDefault();
        let targetId = this.getAttribute('data-target-id');
        window.location.hash = targetId;
        moveToHash();
        mobileNav(true);
    };

    let inputGuestHover = function(e) {
        if (checkIfempty(this.value)) {
            this.classList.remove('rsvp--input-invalid');
        } else {
            this.classList.add('rsvp--input-invalid');
        }
    };

    // Nav links, Burger button & nav wrapper
    const navButton = document.getElementsByClassName('nav__list-link');
    const burgerBtn = document.getElementsByClassName('btn--burger')[0];
    const navPrimary = document.getElementsByClassName('nav--primary')[0];

    // Title
    const titleSpans = document.getElementsByClassName('t');
    let titleArrIndex = [];
    let titleArrLength = 0;

    // RSVP
    const rsvpWrapper = document.getElementsByClassName('rsvp')[0];
    const formId = document.getElementById('rsvp-form');
    const emailId = document.getElementById('rsvp-email');
    const nameId = document.getElementById('rsvp-name');
    const lastNameId = document.getElementById('rsvp-lastname');
    const checkNameBtn = document.getElementById('checkNameBtn');
    const guestlistId = document.getElementById('rsvp-guests');
    const attendingId = document.getElementById('rsvp-attending');
    const rsvpBackBtn = document.getElementById('rsvpBackBtn');
    const colGuests = document.getElementsByClassName('rsvp--col-guests')[0];
    const additionalId = document.getElementById('additional');
    let searchAttempt = 0;

    // Map
    const mapWarpper = document.getElementsByClassName('map')[0];
    const viewMapBtn = document.getElementsByClassName('btn--view-map')[0];

    // Navigation click listener
    for (let i = 0; i < navButton.length; i++) {
        navButton[i].addEventListener('click', navClick, false);
    }

    // Remove HTML5 form validation
    formId.setAttribute('novalidate', 'novalidate');
    // On blur email input
    emailId.addEventListener('blur', function (e) {
        if (validateEmail(this.value)) {
            this.classList.remove('rsvp--input-invalid');
        } else {
            this.classList.add('rsvp--input-invalid');
        }
    }, true);
    // On blur name input
    nameId.addEventListener('blur', function (e) {
        if (checkIfempty(this.value)) {
            this.classList.remove('rsvp--input-invalid');
        } else {
            this.classList.add('rsvp--input-invalid');
        }
    }, true);
    // On blur last name input
    lastNameId.addEventListener('blur', function (e) {
        if (checkIfempty(this.value)) {
            this.classList.remove('rsvp--input-invalid');
        } else {
            this.classList.add('rsvp--input-invalid');
        }
    }, true);
    lastNameId.addEventListener('focus', function(e) {
        formId.classList.remove('rsvp--form-invalid-user');
    },false);
    // Check last name button
    checkNameBtn.addEventListener('click', function (e) {
        let lastnameVal = lastNameId.value;
        if (checkIfempty(lastnameVal) && !lastNameId.classList.contains('rsvp--input-invalid')) {
            let docRef = firestore.collection("rsvp").doc(lastnameVal.toLowerCase());
            docRef.get().then(function (doc) {
                if (doc.exists) {
                    let docData = doc.data();
                    if (docData.c === false) {
                        let maxGuests = docData.mG;
                        let optionsArr = [];

                        formId.classList.add('rsvp--form-valid-user');
                        formId.classList.remove('rsvp--form-invalid-user');
                        formId.classList.remove('rsvp--form-confirmed-user');
                        lastNameId.readOnly = true;

                        if (maxGuests > 0) {
                            for (let i = 0; i <= maxGuests; i++) {
                                optionsArr.push('<option value="' + i + '">' + i + '</option>');
                            }
                            guestlistId.innerHTML = optionsArr.join('');
                            formId.classList.add('rsvp--form-with-guests');
                        }
                    } else {
                        formId.classList.add('rsvp--form-confirmed-user');
                        console.log('Already confirmed');
                    }
                } else {
                    formId.classList.add('rsvp--form-invalid-user');
                    lastNameId.classList.add('rsvp--input-invalid');
                    if (searchAttempt < 9) {
                        searchAttempt++;
                    } else {
                        console.log('Block user');
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            lastNameId.classList.add('rsvp--input-invalid');
        }
    });
    // Listener for a change
    guestlistId.addEventListener('change', function(e) {
        let optionsLength = this.children.length;
        // Loop through each option and find the one it is selected
        for(let i = 0; i < optionsLength; i++) {
            if(this.children[i].selected === true) {
                buildAdditionalGuest(this.children[i].value);
            }
        }
    });
    // Rsvp cancel/back button
    rsvpBackBtn.addEventListener('click', function (e) {
        formId.classList.remove('rsvp--form-valid-user', 'rsvp--form-with-guests');
        // Change read only to false
        lastNameId.readOnly = false;
        // Remove class name
        colGuests.classList.remove('rsvp--col-to-show');
        // Delete all options from the select list
        guestlistId.options.length = 0;
        // Delete everything inside
        while (additionalId.firstChild) {
            additionalId.removeChild(additionalId.firstChild);
        }
    });
    // On form submit
    formId.addEventListener('submit', function (e) {
        if (this.classList.contains('rsvp--form-valid-user')) {
            let emailValid = validateEmail(emailId.value);
            let nameValid = checkIfempty(nameId.value);
            let lastNameValid = checkIfempty(lastNameId.value);
            let guestInputId = document.getElementsByClassName('rsvp--input-guest');
            let guestInputValid = true;
            
            if(guestInputId.length > 0) {
                for (let i = 0; i < guestInputId.length; i++) {
                    if(checkIfempty(guestInputId[i].value) === false) {
                        guestInputValid = false;
                        guestInputId[i].classList.add('rsvp--input-invalid');
                    } else {
                        guestInputId[i].classList.remove('rsvp--input-invalid');
                    }
                }
            }

            if (emailValid && nameValid && lastNameValid && guestInputValid) {
                let plusInt;
                let isAttending = (attendingId.options[attendingId.selectedIndex].value === 'true');
                let guestNames = [];
                // RSVP Collection
                let rsvp = firestore.collection('rsvp');
                let attending = firestore.collection('attending');
                let notAttending = firestore.collection('notAttending');

                e.preventDefault();
                if (formId.classList.contains('rsvp--form-with-guests')) {
                    plusInt = guestlistId.options[guestlistId.selectedIndex].value;
                    
                    for (let i = 0; i < guestInputId.length; i++) {
                        guestNames.push(guestInputId[i].value);
                    }
                } else {
                    plusInt = 0;
                }

                // Save data
                rsvp.doc(lastNameId.value.toLowerCase()).update({
                    a: isAttending,
                    c: true,
                    n: nameId.value,
                    aG: parseInt(plusInt),
                    dC: timestamp,
                    gN: guestNames
                }).then(function () {
                    rsvpWrapper.classList.add('rsvp--success');

                    emailId.classList.remove('rsvp--input-invalid');
                    nameId.classList.remove('rsvp--input-invalid');
                    lastNameId.classList.remove('rsvp--input-invalid');
                }).catch(function (error) {
                    console.log(error);
                });
                // If attending
                if(isAttending) {
                    attending.doc(lastNameId.value.toLowerCase()).set({
                        n: nameId.value,
                        aG: parseInt(plusInt),
                        dC: timestamp,
                        gN: guestNames
                    }).then(function () {
                    }).catch(function (error) {
                        console.log(error);
                    });
                } else {
                    notAttending.doc(lastNameId.value.toLowerCase()).set({
                        n: nameId.value,
                        aG: parseInt(plusInt),
                        dC: timestamp,
                        gN: guestNames
                    }).then(function () {
                    }).catch(function (error) {
                        console.log('Got an error: ', error);
                    });
                }
            } else {
                e.preventDefault();

                if (!emailValid) {
                    emailId.classList.add('rsvp--input-invalid');
                } else {
                    emailId.classList.remove('rsvp--input-invalid');
                }

                if (!nameValid) {
                    nameId.classList.add('rsvp--input-invalid');
                } else {
                    nameId.classList.remove('rsvp--input-invalid');
                }

                if (!lastNameValid) {
                    lastNameId.classList.add('rsvp--input-invalid');
                } else {
                    lastNameId.classList.remove('rsvp--input-invalid');
                }
            }
        } else {
            e.preventDefault();
        }
    });
    // Scroll down to map on button click
    viewMapBtn.addEventListener('click', function (e) {
        moveToHash(this.getAttribute('data-target-id'));
    });
    // Burger button click
    burgerBtn.addEventListener('click', function (e) {
        if (this.classList.contains('btn--burger-active')) {
            mobileNav(true);
        } else {
            mobileNav(false);
        }
    });

    // This is required for scrollToY function
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    // Additional Guest Inputs
    function buildAdditionalGuest(nr) {
        let elArr = [];

        if(nr > 0) {
            for (let i = 0; i < nr; i++) {
                elArr.push('<div class="rsvp__col rsvp--col-to-show"><label class="rsvp__label" for="rsvp-guest-'+(i+1)+'">Guest '+(i+1)+' First &amp; Last Name:</label><input type="text" class="rsvp__input rsvp--input-guest trans--all" id="rsvp--guest-'+i+'"></div>');
            }
            additionalId.innerHTML = elArr.join('');
            guestInputListener();
        } else {
            // Delete everything inside
            while (additionalId.firstChild) {
                additionalId.removeChild(additionalId.firstChild);
            }
        }
    }

    // Loop trough input guest elements and add event listener for blur
    function guestInputListener() {
        let guestInputId = document.getElementsByClassName('rsvp--input-guest');

        for (let i = 0; i < guestInputId.length; i++) {
            guestInputId[i].addEventListener('blur', inputGuestHover, true);
        }
    }

    // Scroll to element
    function scrollToY(scrollTargetY, speed, easing) {
        // scrollTargetY: the target scrollY property of the window
        // speed: time in pixels per second
        // easing: easing equation to use

        let scrollY = window.scrollY || document.documentElement.scrollTop,
            currentTime = 0;

        // min time .1, max time .8 seconds
        let time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8));

        // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
        let easingEquations = {
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

            let p = currentTime / time;
            let t = easingEquations[easing](p);

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
        for (let i = 0; i < titleSpans.length; i++) {
            titleArrIndex.push(i);
        }

        // Shuffle the array
        titleArrIndex = shuffleArr(titleArrIndex);
        // Set the length
        titleArrLength = titleArrIndex.length;

        addTitleClass();
    }

    // Shuffle array function
    function shuffleArr(a) {
        let j, x, i;
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
        let counter = 0;
        let timer;
        const runScript = function () {
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
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Hide show mobile nav
    function mobileNav(isVisible) {
        if (isVisible) {
            burgerBtn.classList.remove('btn--burger-active');
            navPrimary.classList.remove('nav--primary-open');
            document.removeEventListener('click', checkIfOutside);
        } else {
            burgerBtn.classList.add('btn--burger-active');
            navPrimary.classList.add('nav--primary-open');
            document.addEventListener('click', checkIfOutside);
        }
    }

    function checkIfOutside(e) {
        if (!e.target.classList.contains('btn__burger-icon') && !e.target.classList.contains('btn--burger') && !e.target.classList.contains('nav--primary')) mobileNav(true);
    }

    function moveToHash(targetHash) {
        targetHash = targetHash || window.location.hash.substring(1);
        let targetEl = document.querySelector('[data-section-id="' + targetHash + '"]');
        if (targetEl) {
            scrollToY(targetEl.offsetTop - 52, 500, 'easeInOutQuint');
        }
    }

    function loadMap() {
        mapWarpper.innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2659.039350114157!2d16.374486315703955!3d48.20585797922898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d079e21d92331%3A0x417b4c58d40531b5!2sPalais+Coburg+Residenz!5e0!3m2!1sen!2suk!4v1537184868153" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>';
    }

    // Convert seconds to a date
    function toDateTime(secs) {
        let t = new Date(1970, 0, 1);
        t.setSeconds(secs);
        return t;
    }

    // Responsive Image
    let responsiveImg = new resImg(document.getElementsByClassName('res-data'));
    responsiveImg.init();

    // Element is visible
    let containerVisible = new elInViewPort(document.getElementsByClassName('container'));
    containerVisible.init();

    // Countdown
    let countdownTimer = new countdown(document.getElementsByClassName('countdown__timer')[0]);
    countdownTimer.init('08/06/2019 14:00 GMT');

    moveToHash();
    window.onhashchange = function () { moveToHash(); };

}());