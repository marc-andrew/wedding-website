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
        let rsvp = db.collection('rsvp');
        let rsvpConfirmed = db.collection('rsvpConfirmed');
        let batch = db.batch();

        batch.set(rsvp.doc("valookaran"),{
            a: false,
            c: false,
            dC: null,
            n: null,
            mG: 0,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("tee"),{
            a: false,
            c: false,
            dC: null,
            n: null,
            mG: 1,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("sosa"),{
            a: false,
            c: false,
            dC: null,
            n: null,
            mG: 0,
            aG: 0,
            gN: null
        });
        // batch.update(rsvp.doc("kaiser"),{
        //     a: true,
        //     c: true
        // });
        batch.set(rsvpConfirmed.doc('kaiser'), {
            a: true,
            aG: 1,
        });

        // Batch commit 
        batch.commit().catch(function(error) {
            console.error("Error adding document: ", error);
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