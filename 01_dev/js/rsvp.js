(function () {
    'use strict';
    const noJs = document.getElementsByClassName('no-js');
    // Delete no-js class name
    while (noJs.length > 0) {
        noJs[0].classList.remove('no-js');
    }

    const addBtn = document.getElementById('addBtn');
    const getBtn = document.getElementById('getBtn');

    getBtn.addEventListener('click', function (e) {
        let usersDb = db.collection('users');
        let rsvpDb = db.collection('rsvp');

        usersDb.where("e", "==", 'email@email.com').get().then(function (querySnapshot) {
            if (querySnapshot.empty) {
                console.log('can\'t find');
            } else {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    console.log(doc.data().e);
                });
            }
        }).catch(function (error) {
            console.log("Error getting documents: ", error);
        });

        // rsvpDb.get().then(function (querySnapshot) {
        //     querySnapshot.forEach(function (doc) {
        //         // doc.data() is never undefined for query doc snapshots
        //         console.log(doc.id, " => ", doc.data());
        //         // console.log(doc.data().e);
        //     });
        // }).catch(function (error) {
        //     console.log("Error getting documents: ", error);
        // });
    });

    addBtn.addEventListener('click', function (e) {
        // RSVP Collection
        let rsvp = db.collection('rsvp');
        let rsvpConfirmed = db.collection('rsvpConfirmed');
        let batch = db.batch();

        batch.set(rsvp.doc("puntigam"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 3,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("makela"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 1,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("phutusseril"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 1,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("waight"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 1,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("cartocci"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 1,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("pfabigan"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 1,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("hausberger"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 1,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("sheth"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 0,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("schneider"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 1,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("makinwa"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 0,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("sui Qi"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 0,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("tee"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 1,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("paille de riviere"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 1,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("mazuranic"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 0,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("borensztein"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 1,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("ringhofer"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 0,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("lueng"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 0,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("walters"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 0,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("roberts"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 1,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("eichert"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 0,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("kernbauer"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 1,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("brenner"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 0,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("fitch"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 1,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("kaiser"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 1,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("sosa"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 0,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("valokaran"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 1,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("ehimare"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 0,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("allison"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 0,
            aG: 0,
            gN: null
        });
        batch.set(rsvp.doc("jewkes"), {
            a: false,
            c: false,
            dC: null,
            n: null,
            mg: 1,
            aG: 0,
            gN: null
        });

        // Batch commit 
        batch.commit().catch(function (error) {
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