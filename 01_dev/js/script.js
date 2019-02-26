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
            if (obj.id.length) {
                obj.windowSize();
                obj.imgData();
                obj.windowScroll();
                obj.windowResize();
            }
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

    const viewMapClick = function (e) {
        moveToHash(this.getAttribute('data-target-id'));
    };

    const burgerClick = function (e) {
        if (this.classList.contains('btn--burger-active')) {
            mobileNav(true);
        } else {
            mobileNav(false);
        }
    };

    let inputGuestHover = function (e) {
        if (checkIfempty(this.value)) {
            this.classList.remove('rsvp--input-invalid');
        } else {
            this.classList.add('rsvp--input-invalid');
        }
    };

    const restDataId = document.getElementsByClassName('res-data');

    // Nav links, Burger button & nav wrapper
    const navButton = document.getElementsByClassName('nav__list-link');
    const burgerBtn = document.getElementsByClassName('btn--burger');
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
    const relationId = document.getElementById('relation');
    const additionalId = document.getElementById('additional');
    const msgUnknown = '<span class="copy copy--error copy--error-unknown">We are sorry, we can\'t find you on our Guestlist! <br>Please check if your name is correct and try again.</span>';
    const msgConfirmed = '<span class="copy copy--error copy--error-confirmed">You are already confirmed!</span>';
    const msgBlocked = '<span class="copy copy--error copy--error-confirmed">Sorry, you\'ve tried too many times. <br>Please try again later.</span>';
    const msgError = '<span class="copy copy--error copy--error-confirmed">Sorry, something went wrong! <br>Please try again later.</span>';
    let searchAttempt = 0;
    let currentName;
    let relationListArr;

    const countDownId = document.getElementsByClassName('countdown__timer');

    // Map
    const mapWarpper = document.getElementsByClassName('map')[0];
    const viewMapBtn = document.getElementsByClassName('btn--view-map');

    // Food Menu
    const menuFormContainer = document.getElementById('menu-form-container');
    const menuFormId = document.getElementById('menu-form');

    // Navigation click listener
    if (document.body.classList.contains('home')) {
        for (let i = 0; i < navButton.length; i++) {
            navButton[i].addEventListener('click', navClick, false);
        }
    }

    // Viewmap click listener
    for (let i = 0; i < viewMapBtn.length; i++) {
        viewMapBtn[i].addEventListener('click', viewMapClick, false);
    }

    // Burger button click listener
    for (let i = 0; i < burgerBtn.length; i++) {
        burgerBtn[i].addEventListener('click', burgerClick, false);
    }

    // Check if form exists 
    if (!!formId) rsvpForm();

    // Check if menu page
    if(!!menuFormContainer) initMenuPage();

    // This is required for scrollToY function
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    // Form
    function rsvpForm() {
        // On blur name input
        nameId.addEventListener('blur', function (e) {
            if (checkIfempty(this.value)) {
                this.classList.add('rsvp--input-valid');
                this.classList.remove('rsvp--input-invalid');
            } else {
                this.classList.add('rsvp--input-invalid');
                this.classList.remove('rsvp--input-valid');
            }
        }, true);
        // On blur last name input
        lastNameId.addEventListener('blur', function (e) {
            if (checkIfempty(this.value)) {
                this.classList.add('rsvp--input-valid');
                this.classList.remove('rsvp--input-invalid');
            } else {
                this.classList.add('rsvp--input-invalid');
                this.classList.remove('rsvp--input-valid');
            }
        }, true);
        // On blur email input
        emailId.addEventListener('blur', function (e) {
            if (validateEmail(this.value)) {
                this.classList.add('rsvp--input-valid');
                this.classList.remove('rsvp--input-invalid');
            } else {
                this.classList.add('rsvp--input-invalid');
                this.classList.remove('rsvp--input-valid');
            }
        }, true);
        // Listener for a change
        guestlistId.addEventListener('change', function (e) {
            let optionsLength = this.children.length;
            // Loop through each option and find the one it is selected
            for (let i = 0; i < optionsLength; i++) {
                if (this.children[i].selected === true) {
                    buildAdditionalGuest(this.children[i].value);
                }
            }
        });
        // Click on Continue button
        checkNameBtn.addEventListener('click', function (e) {
            let thisBtn = this;
            let nameVal = trimStr(nameId.value.toLowerCase());
            let lastnameVal = trimStr(lastNameId.value.toLowerCase());
            let nameValid = checkIfempty(nameVal);
            let lastnameValid = checkIfempty(lastnameVal);
            let errorMsgs = document.getElementsByClassName('copy--error');

            thisBtn.classList.add('btn--loading');
            thisBtn.disabled = true;

            // Delete error message
            if(errorMsgs.length) {
                for(let i = 0; i < errorMsgs.length; i++) {
                    errorMsgs[i].parentNode.removeChild(errorMsgs[i]);
                }
            }

            // Validated Name and Last Name
            if (nameValid && lastnameValid) {
                currentName = toTitleCase(nameVal) + ' ' + toTitleCase(lastnameVal);

                let docRef = db.collection("rsvp").doc(currentName);

                docRef.get().then(function(doc) {
                    thisBtn.classList.remove('btn--loading');
                    thisBtn.disabled = false;
                    let notConfirmedRelationArr = [];
                    relationListArr = [];

                    relationListArr.push(currentName);

                    if (doc.exists) {
                        let docData = doc.data();
                        let relation = docData.r;
                        let maxGuests = docData.mG;
                        let maxGuestsArr = [];

                        if (docData.c === false) {

                            if (relation !== null) {
                                let key;
        
                                for (key in relation) {
                                    if (relation.hasOwnProperty(key)) {
                                        if (relation[key].confirmed === false) notConfirmedRelationArr.push(key);
                                        relationListArr.push(key);
                                    }
                                }
                                // Check if not confirmed relation array is not empty
                                if(notConfirmedRelationArr.length) formId.classList.add('rsvp--form-with-relation');
                                buildRelationGuest(notConfirmedRelationArr);
                            }

                            if (maxGuests > 0) {
                                for (let i = 0; i <= maxGuests; i++) {
                                    maxGuestsArr.push('<option value="' + i + '">' + i + '</option>');
                                }
                                guestlistId.innerHTML = maxGuestsArr.join('');
                                formId.classList.add('rsvp--form-with-guests');
                            }
        
                            formId.classList.add('rsvp--form-valid-user');
                            nameId.readOnly = true;
                            lastNameId.readOnly = true;
                        } else {
                            // Already confirmed
                            checkNameBtn.insertAdjacentHTML('afterend', msgConfirmed);
                        }
                    } else {
                        // Unknown Name or Block user
                        if(searchAttempt === 10) {
                            thisBtn.disabled = true;
                            checkNameBtn.insertAdjacentHTML('afterend', msgBlocked);
                            setCookie('blocked', 'true', 1);
                        } else {
                            checkNameBtn.insertAdjacentHTML('afterend', msgUnknown);
                        }
                        searchAttempt++;
                    }
                }).catch(function (error) {
                    thisBtn.classList.remove('btn--loading');
                    thisBtn.disabled = false;
                    checkNameBtn.insertAdjacentHTML('afterend', msgError);
                    console.log(error);
                });     
            } else {
                if(nameValid) {
                    nameId.classList.add('rsvp--input-valid');
                    nameId.classList.remove('rsvp--input-invalid');
                } else {
                    nameId.classList.add('rsvp--input-invalid');
                    nameId.classList.remove('rsvp--input-valid');
                }
                
                if (lastnameValid) {
                    lastNameId.classList.add('rsvp--input-valid');
                    lastNameId.classList.remove('rsvp--input-invalid');
                } else {
                    lastNameId.classList.add('rsvp--input-invalid');
                    lastNameId.classList.remove('rsvp--input-valid');
                }

                thisBtn.classList.remove('btn--loading');
                thisBtn.disabled = false;
            }
        });
        // Rsvp cancel/back button
        rsvpBackBtn.addEventListener('click', function (e) {
            formReset();
        });
        // On form submit
        formId.addEventListener('submit', function (e) {
            if (this.classList.contains('rsvp--form-valid-user')) {
                let emailVal = emailId.value;
                let emailValid = validateEmail(emailVal);
                let nameValid = checkIfempty(nameId.value);
                let lastNameValid = checkIfempty(lastNameId.value);
                let guestInputId = document.getElementsByClassName('rsvp--input-guest');
                let checkboxId = document.getElementsByClassName('rsvp__checkbox');
                let guestInputValid = true;

                if (guestInputId.length > 0) {
                    for (let i = 0; i < guestInputId.length; i++) {
                        if (checkIfempty(guestInputId[i].value) === false) {
                            guestInputValid = false;
                            guestInputId[i].classList.add('rsvp--input-invalid');
                        } else {
                            guestInputId[i].classList.remove('rsvp--input-invalid');
                        }
                    }
                }

                if (emailValid && nameValid && lastNameValid && guestInputValid) {
                    e.preventDefault();
                    // RSVP Collection
                    let rsvpDb = db.collection('rsvp');
                    let attendingDb = db.collection('attending');
                    let notAttendingDb = db.collection('notAttending');
                    let batch = db.batch();

                    let confirmedNameArr = [];
                    let nonConfirmedNameArr = [];
                    let plusInt = 0;
                    let isAttending = (attendingId.options[attendingId.selectedIndex].value === 'true');
                    let guestNames = [];

                    confirmedNameArr.push(currentName);
    
                    if (checkboxId.length > 0) {
                        for (let i = 0; i < checkboxId.length; i++) {
                            if(checkboxId[i].checked) {
                                confirmedNameArr.push(checkboxId[i].value);
                            } else {
                                nonConfirmedNameArr.push(checkboxId[i].value);
                            }
                        }
                    }

                    if (formId.classList.contains('rsvp--form-with-guests')) {
                        plusInt = guestlistId.options[guestlistId.selectedIndex].value;

                        for (let i = 0; i < guestInputId.length; i++) {
                            guestNames.push(guestInputId[i].value);
                        }
                    }

                    // Check if attending
                    if (isAttending) {
                        if (formId.classList.contains('rsvp--form-with-relation')) {

                            for(let i = 0; i < nonConfirmedNameArr.length; i++) {
                                let namesObj = {};
                                for (let a = 0; a < confirmedNameArr.length; a++) {
                                    if(nonConfirmedNameArr[i] !== confirmedNameArr[a]) {
                                        namesObj["r." + confirmedNameArr[a]] = { confirmed: true };
                                    }
                                }
                                //Update relation list
                                batch.update(rsvpDb.doc(nonConfirmedNameArr[i]),namesObj);
                            }

                            for(let i = 0; i < confirmedNameArr.length; i++) {
                                let namesObj = {};
                                for (let a = 0; a < confirmedNameArr.length; a++) {
                                    if(confirmedNameArr[i] !== confirmedNameArr[a]) {
                                        namesObj["r." + confirmedNameArr[a]] = { confirmed: true };
                                    }
                                }
                                // Update
                                batch.update(rsvpDb.doc(confirmedNameArr[i]), {
                                    a: true,
                                    c: true,
                                    e: emailVal,
                                    dC: timestamp
                                });
                                //Update relation list
                                batch.update(rsvpDb.doc(confirmedNameArr[i]),namesObj);
                                // Set
                                batch.set(attendingDb.doc(confirmedNameArr[i]), {
                                    dC: timestamp,
                                    aG: parseInt(plusInt),
                                    e: emailVal,
                                    gN: guestNames
                                });
                            }
                        } else if (formId.classList.contains('rsvp--form-with-guests')) {
                            batch.update(rsvpDb.doc(currentName), {
                                a: true,
                                c: true,
                                e: emailVal,
                                dC: timestamp,
                                aG: parseInt(plusInt),
                                gN: guestNames
                            });
                            // Set
                            batch.set(attendingDb.doc(currentName), {
                                dC: timestamp,
                                aG: parseInt(plusInt),
                                e: emailVal,
                                gN: guestNames
                            });
                        } else {
                            batch.update(rsvpDb.doc(currentName), {
                                a: true,
                                c: true,
                                e: emailVal,
                                dC: timestamp
                            });
                            // Set
                            batch.set(attendingDb.doc(currentName), {
                                dC: timestamp,
                                e: emailVal
                            });
                        }
                    } else {
                        if (formId.classList.contains('rsvp--form-with-relation')) {
                            for(let i = 0; i < nonConfirmedNameArr.length; i++) {
                                let namesObj = {};
                                for (let a = 0; a < confirmedNameArr.length; a++) {
                                    if(nonConfirmedNameArr[i] !== confirmedNameArr[a]) {
                                        namesObj["r." + confirmedNameArr[a]] = { confirmed: true };
                                    }
                                }
                                //Update relation list
                                batch.update(rsvpDb.doc(nonConfirmedNameArr[i]),namesObj);
                            }

                            for(let i = 0; i < confirmedNameArr.length; i++) {
                                let namesObj = {};
                                for (let a = 0; a < confirmedNameArr.length; a++) {
                                    if(confirmedNameArr[i] !== confirmedNameArr[a]) {
                                        namesObj["r." + confirmedNameArr[a]] = { confirmed: true };
                                    }
                                }
                                // Update
                                batch.update(rsvpDb.doc(confirmedNameArr[i]), {
                                    a: false,
                                    c: true,
                                    dC: timestamp
                                });
                                //Update relation list
                                batch.update(rsvpDb.doc(confirmedNameArr[i]),namesObj);
                                // Set
                                batch.set(notAttendingDb.doc(confirmedNameArr[i]), {
                                    dC: timestamp
                                });
                            }
                        } else {
                            batch.update(rsvpDb.doc(currentName), {
                                a: false,
                                c: true,
                                dC: timestamp
                            });

                            batch.set(notAttendingDb.doc(currentName), {
                                dC: timestamp
                            });
                        }
                    }

                    // Batch commit 
                    batch.commit().then(function () {
                        rsvpWrapper.classList.add('rsvp--success');

                        formReset();
                    }).catch(function (error) {
                        console.error(error);
                    });
                } else {
                    e.preventDefault();
                    // Email
                    if (!emailValid) {
                        emailId.classList.add('rsvp--input-invalid');
                    } else {
                        emailId.classList.remove('rsvp--input-invalid');
                    }
                    // Name
                    if (!nameValid) {
                        nameId.classList.add('rsvp--input-invalid');
                    } else {
                        nameId.classList.remove('rsvp--input-invalid');
                    }
                    // Last name
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
    }
    // Reset the form
    function formReset() {
        formId.classList.remove('rsvp--form-valid-user', 'rsvp--form-with-guests', 'rsvp--form-with-relation');
        // Change read only to false
        nameId.readOnly = false;
        lastNameId.readOnly = false;
        // Reset values
        nameId.value = '';
        lastNameId.value = '';
        emailId.value = '';
        // Delete class name
        nameId.classList.remove('rsvp--input-invalid', 'rsvp--input-valid');
        lastNameId.classList.remove('rsvp--input-invalid', 'rsvp--input-valid');
        emailId.classList.remove('rsvp--input-invalid', 'rsvp--input-valid');
        // Delete all options from the select list
        guestlistId.options.length = 0;
        // Delete everything inside
        while (additionalId.firstChild) {
            additionalId.removeChild(additionalId.firstChild);
        }

        while (relationId.firstChild) {
            relationId.removeChild(relationId.firstChild);
        }
    }
    // Relation list
    function buildRelationGuest(rArr) {
        let relationArr = rArr;
        let elArr = [];

        for (let i = 0; i < relationArr.length; i++) {
            elArr.push('<div class="rsvp__col"><input type="checkbox" class="rsvp__checkbox" id="rsvp-relation-'+i+'" value="'+relationArr[i]+'"><label class="rsvp__label-checkbox trans--all" for="rsvp-relation-'+i+'">'+relationArr[i]+'</label></div>');
        }
        relationId.innerHTML = elArr.join('');
    }
    // Additional Guest Inputs
    function buildAdditionalGuest(nr) {
        let elArr = [];

        if (nr > 0) {
            for (let i = 0; i < nr; i++) {
                elArr.push('<div class="rsvp__col"><input type="text" class="rsvp__input rsvp--input-guest trans--all" id="rsvp--guest-' + i + '"><label class="rsvp__label" for="rsvp-guest-' + (i + 1) + '">Guest ' + (i + 1) + ' First &amp; Last Name:</label></div>');
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
    // Init Food Menu Page
    function initMenuPage() {
        let userId = getParameter('e');

        if(userId) {
            // Get data
            let docRef = db.collection("menulist").doc(userId.toLowerCase());

            docRef.get().then(function(doc){
                if (doc.exists) {
                    let docData = doc.data();
                    let guestsData = docData.g;
                    // Continue if its not confirmed yet
                    if (docData.c === false) {
                        menuFormContainer.classList.add('need-confirmation');
                        
                        buildMenuForm(guestsData);
                        submitMenuForm(userId.toLowerCase());
                    } else {
                        menuFormId.classList.add('confirmed');
                        document.getElementById('menu-form').insertAdjacentHTML('afterend', msgConfirmed);
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
    // Build Menu Form Items
    function buildMenuForm(data) {
        console.log(data);

        let menuSelection = document.getElementById('menu-selection');
        let menuItemArr = [];
        let isKidItemArr = [];

        for (var key in data) {
            if (!data.hasOwnProperty(key)) continue;
            let name = key;
            let isKid = data[key];

            // Add form items to Dom
            if(isKid) {
                isKidItemArr.push(menuFormItem(null,name,isKid));
            } else {
                menuItemArr.push(menuFormItem(menuItemArr.length,name,isKid));
            }
        }

        menuSelection.innerHTML = menuItemArr.concat(isKidItemArr).join('');
    }
    // Menu Form Items
    function menuFormItem(id, name, isKid) {
        let menuItem = `
            <div class="menu__container menu--form-item">
                <span class="title title--primary-medium">${name}, please select your ...</span>
                <span class="title title--secondary-medium title--bold title--space">Starter</span>
                <input type="hidden" id="name-${id}" name="item-name" value="${name}">
                <div class="menu__row flex flex--justify-center">
                    <div class="menu__row-inner">
                        <input type="radio" class="menu__radio item-radio-${id}" id="starter-${id}-option-1" name="starter-${id}-options" value="Starter 1" checked>
                        <label for="starter-${id}-option-1" class="copy">Buffalo Mozzarella / Tomato / Basil <br>
                            <span class="copy copy--small copy--italic copy--grey">Büffelmozzarella / Tomate / Basilikum</span>
                        </label>
                    </div>
                </div>
                <div class="menu__row flex flex--justify-center">
                    <div class="menu__row-inner">
                        <input type="radio" class="menu__radio item-radio-${id}" id="starter-${id}-option-2" name="starter-${id}-options" value="Starter 2">
                        <label for="starter-${id}-option-2" class="copy">Salmon / Avocado / Potatoes <br>
                            <span class="copy copy--small copy--italic copy--grey">Lachs / Avocado / Erdapfel</span>
                        </label>
                    </div>
                </div>
                <span class="title title--secondary-medium title--bold title--space">Soup</span>
                <div class="menu__row flex flex--justify-center">
                    <div class="menu__row-inner">
                        <input type="radio" class="menu__radio item-radio-${id}" id="soup-${id}-option-1" name="soup-${id}-options" value="Soup 1" checked>
                        <label for="soup-${id}-option-1" class="copy">Bell Pepper / Tomato / Celery (vegetarian, cold) <br>
                            <span class="copy copy--small copy--italic copy--grey">Paprika / Tomate / Sellerie (vegetarisch, kalt)</span>
                        </label>
                    </div>
                </div>
                <div class="menu__row flex flex--justify-center">
                    <div class="menu__row-inner">
                        <input type="radio" class="menu__radio item-radio-${id}" id="soup-${id}-option-2" name="soup-${id}-options" value="Soup 2">
                        <label for="soup-${id}-option-2" class="copy">Beef / Root Vegetabels / Chives <br>
                            <span class="copy copy--small copy--italic copy--grey">Rind / Wurzelgemüse / Schnittlauch</span>
                        </label>
                    </div>
                </div>
                <span class="title title--secondary-medium title--bold title--space">Main</span>
                <div class="menu__row flex flex--justify-center">
                    <div class="menu__row-inner">
                        <input type="radio" class="menu__radio item-radio-${id}" id="main-${id}-option-1" name="main-${id}-options" value="Main 1" checked>
                        <label for="main-${id}-option-1" class="copy">Swiss Chard / Ricotta / Pine Nuts <br>
                            <span class="copy copy--small copy--italic copy--grey">Mangold / Ricotta / Pinienkerne</span>
                        </label>
                    </div>
                </div>
                <div class="menu__row flex flex--justify-center">
                    <div class="menu__row-inner">
                        <input type="radio" class="menu__radio item-radio-${id}" id="main-${id}-option-2" name="main-${id}-options" value="Main 2">
                        <label for="main-${id}-option-2" class="copy">Veal / Parsley / Lingonberries <br>
                            <span class="copy copy--small copy--italic copy--grey">Kalb / Petersilie / Preiselbeere</span>
                        </label>
                    </div>
                </div>
                <div class="menu__row flex flex--justify-center">
                    <div class="menu__row-inner">
                        <input type="radio" class="menu__radio item-radio-${id}" id="main-${id}-option-3" name="main-${id}-options" value="Main 3">
                        <label for="main-${id}-option-3" class="copy">Duck / Port Wine / Celery <br>
                            <span class="copy copy--small copy--italic copy--grey">Ente / Portwein / Sellerie</span>
                        </label>
                    </div>
                </div>
            </div>`;
        
        let kidsItem = `
        <div class="menu__container">
            <span class="title title--primary-medium">${name}, your selection is the kids menu</span>
            <span class="title title--secondary-medium title--bold title--space">Soup</span>
            <div class="menu__row">
                <p class="copy copy--no-margin copy--center">Beef / Root Vegetabels / Chives</p>
                <p class="copy copy--small copy--italic copy--grey copy--center">Rind / Wurzelgemüse / Schnittlauch</p>
            </div>
            <span class="title title--secondary-medium title--bold title--space">Main</span>
            <div class="menu__row">
                <p class="copy copy--no-margin copy--center">Schnitzel / Fries</p>
                <p class="copy copy--small copy--italic copy--grey copy--center">Schnitzel / Pommes</p>
            </div>
            <span class="title title--secondary-medium title--bold title--space">Dessert</span>
            <div class="menu__row">
                <p class="copy copy--no-margin copy--center">Ice Cream</p>
                <p class="copy copy--small copy--italic copy--grey copy--center">Gemischtes Eis</p>
            </div>
        </div>`;

        if(isKid) return kidsItem;
        return menuItem;
    }
    // Submit Menu Form
    function submitMenuForm(userId) {
        let menulistDb = db.collection('menulist');
        let menuConfirmedDb = db.collection('menuconfirmed');
        let batch = db.batch();

        let menuForm = document.getElementById('menu-form');
        let menuFormItem = document.getElementsByClassName('menu--form-item');
        let menuSubmitBtn = document.getElementById('menu-submit');

        menuForm.addEventListener('submit', function(e) {
            e.preventDefault();
        
            // Loop through each form person item
            for(let i = 0; i < menuFormItem.length; i++) {
                let itemArr = [];
                let pName = document.getElementById('name-'+i).value;
                let itemRadio = document.getElementsByClassName('item-radio-'+i);

                for(let j = 0; j < itemRadio.length; j++) {
                    if(itemRadio[j].checked) {
                        itemArr.push(itemRadio[j].value);
                    }
                }

                // Update
                batch.update(menulistDb.doc(userId), {
                    c: true,
                    dC: timestamp
                });
                // Add new
                batch.set(menuConfirmedDb.doc(pName), {
                    m: itemArr,
                    dC: timestamp,
                });
            }

            // Batch commit 
            batch.commit().then(function () {
                menuFormContainer.classList.add('sumitted');
                menuForm.insertAdjacentHTML('afterend', '<span class="title title--primary-medium title--thankyou">Thank you!</span>');
            }).catch(function (error) {
                menuSubmitBtn.insertAdjacentHTML('afterend', msgError);
                console.error(error);
            });

        });

    }
    // Get URL parameter
    function getParameter(sParam) {
        let sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName;
    
        for (let i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? undefined : sParameterName[1];
            }
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
            burgerBtn[0].classList.remove('btn--burger-active');
            navPrimary.classList.remove('nav--primary-open');
            document.removeEventListener('click', checkIfOutside);
        } else {
            burgerBtn[0].classList.add('btn--burger-active');
            navPrimary.classList.add('nav--primary-open');
            document.addEventListener('click', checkIfOutside);
        }
    }
    // Check if click is outside
    function checkIfOutside(e) {
        if (!e.target.classList.contains('btn__burger-icon') && !e.target.classList.contains('btn--burger') && !e.target.classList.contains('nav--primary')) mobileNav(true);
    }
    // Scroll to target hash
    function moveToHash(targetHash) {
        targetHash = targetHash || window.location.hash.substring(1);
        let targetEl = document.querySelector('[data-section-id="' + targetHash + '"]');
        if (targetEl) {
            scrollToY(targetEl.offsetTop - 52, 500, 'easeInOutQuint');
        }
    }
    // Load map once it's in viewport
    function loadMap() {
        mapWarpper.innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2659.039350114157!2d16.374486315703955!3d48.20585797922898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d079e21d92331%3A0x417b4c58d40531b5!2sPalais+Coburg+Residenz!5e0!3m2!1sen!2suk!4v1537184868153" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>';
    }
    // Capitalize each word
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
    // Trim string
    function trimStr(str) {
        if(str == null) return str;
        return str.replace(/^\s+|\s+$/g, '');
    }
    // Read cookie
    function readCookie(cName) {
        var name = cName + '=',
			ca = document.cookie.split(';');

		for(let i=0; i<ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
		}
		return '';
    }
    // Set cookie
    function setCookie(cName, cValue, cDays) {
        let newDate = new Date();
		newDate.setTime(newDate.getTime() + (cDays*24*60*60*1000));
		let expires = 'expires=' + newDate.toGMTString();
		document.cookie = cName + '=' + cValue + '; ' + expires + '; path=/';
    }
    // Responsive Image trigger
    if (restDataId.length) {
        let responsiveImg = new resImg(restDataId);
        responsiveImg.init();
    }
    // Element is visible trigger
    let containerVisible = new elInViewPort(document.getElementsByClassName('container'));
    containerVisible.init();
    // Countdown
    if (countDownId.length) {
        let countdownTimer = new countdown(countDownId[0]);
        countdownTimer.init('06/08/2019 15:30 GMT');
    }
    // Check if blocked
    if (readCookie('blocked') === 'true') checkNameBtn.disabled = true;
    // Trigger move to hash function
    moveToHash();
    window.onhashchange = function () { moveToHash(); };
}());