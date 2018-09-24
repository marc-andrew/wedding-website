(function () {
    'use strict';
    const noJs = document.getElementsByClassName('no-js');
    // Delete no-js class name
    while (noJs.length > 0) {
        noJs[0].classList.remove('no-js');
    }

    const addBtn = document.getElementById('addBtn');

    addBtn.addEventListener('click', function (e) {
        // RSVP Collection
        let rsvp = firestore.collection('rsvp');

        rsvp.doc("waight").set({
            a: false,
            c: false,
            dC: null,
            n: null,
            mG: 1,
            aG: 0,
            gN: null
        });
        rsvp.doc("valookaran").set({
            a: false,
            c: false,
            dC: null,
            n: null,
            mG: 0,
            aG: 0,
            gN: null
        });
        rsvp.doc("tee").set({
            a: false,
            c: false,
            dC: null,
            n: null,
            mG: 1,
            aG: 0,
            gN: null
        });
        rsvp.doc("sosa").set({
            a: false,
            c: false,
            dC: null,
            n: null,
            mG: 0,
            aG: 0,
            gN: null
        });
        rsvp.doc("kaiser").set({
            a: false,
            c: false,
            dC: null,
            n: null,
            mG: 0,
            aG: 0,
            gN: null
        });


        // rsvp.doc("kaiser").update({
        //     dC: timestamp
        // }).then(function() {
        //     console.log('Status saved!');
        // }).catch(function(error) {
        //     console.log('Got an error: ', error);
        // });
    });

}());