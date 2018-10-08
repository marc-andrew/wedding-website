(function () {
    'use strict';
    const noJs = document.getElementsByClassName('no-js');
    // Delete no-js class name
    while (noJs.length > 0) {
        noJs[0].classList.remove('no-js');
    }

    const addBtn = document.getElementById('addBtn');
    const getBtn = document.getElementById('getBtn');
    const updateBtn = document.getElementById('updateBtn');

    let currentName = 'Test User 1';
    let relationArr = []; // All unconfirmed names
    let confirmRelationArr = []; // New confirmed names

    addBtn.addEventListener('click', function (e) {
        let usersDb = db.collection('users');
        let rsvpConfirmed = db.collection('rsvpConfirmed');
        let rsvpDb = db.collection('rsvp');

        let batch = db.batch();

        batch.set(rsvpDb.doc("Test User 1"), {
            a: false,
            c: false,
            dC: null,
            r: {
                "Test User 2": {
                    confirmed: false
                },
                "Test User 3": {
                    confirmed: false
                },
                "Test User 4": {
                    confirmed: false
                },
            },
            mG: 0,
            aG: 0,
            gN: null
        });
        batch.set(rsvpDb.doc("Test User 2"), {
            a: false,
            c: false,
            dC: null,
            r: {
                "Test User 1": {
                    confirmed: false
                },
                "Test User 3": {
                    confirmed: false
                },
                "Test User 4": {
                    confirmed: false
                },
            },
            mG: 0,
            aG: 0,
            gN: null
        });
        batch.set(rsvpDb.doc("Test User 3"), {
            a: false,
            c: false,
            dC: null,
            r: {
                "Test User 1": {
                    confirmed: false
                },
                "Test User 2": {
                    confirmed: false
                },
                "Test User 4": {
                    confirmed: false
                },
            },
            mG: 0,
            aG: 0,
            gN: null
        });
        batch.set(rsvpDb.doc("Test User 4"), {
            a: false,
            c: false,
            dC: null,
            r: {
                "Test User 1": {
                    confirmed: false
                },
                "Test User 2": {
                    confirmed: false
                },
                "Test User 3": {
                    confirmed: false
                },
            },
            mG: 0,
            aG: 0,
            gN: null
        });

        // Batch commit 
        batch.commit().catch(function (error) {
            console.error("Error adding document: ", error);
        });
    });

    getBtn.addEventListener('click', function (e) {
        let usersDb = db.collection('users');
        let rsvpConfirmed = db.collection('rsvpConfirmed');
        let rsvpDb = db.collection('rsvp');

        // Find by email
        // usersDb.where("e", "==", 'email@email.com').get().then(function (querySnapshot) {
        //     if(querySnapshot.empty) {
        //         console.log('can\'t find');
        //     } else {
        //         querySnapshot.forEach(function (doc) {
        //             // doc.data() is never undefined for query doc snapshots
        //             console.log(doc.id, " => ", doc.data());
        //             console.log(doc.data().e);
        //         });
        //     }
        // }).catch(function (error) {
        //     console.log("Error getting documents: ", error);
        // });

        // Get all documents from a collection
        // rsvpDb.get().then(function (querySnapshot) {
        //     querySnapshot.forEach(function (doc) {
        //         // doc.data() is never undefined for query doc snapshots
        //         console.log(doc.id, " => ", doc.data());
        //         // console.log(doc.data().e);
        //     });
        // }).catch(function (error) {
        //     console.log("Error getting documents: ", error);
        // });

        //
        rsvpDb.doc(currentName).get().then(function (doc) {
            if (doc.exists) {
                let docData = doc.data();
                let relation = docData.r;
                let maxGuests = docData.mG;
                let relationElArr = [];
                let optionsArr = [];

                console.log(docData);
                console.log(relation);
                if (docData.c === false) {
                    if (relation !== null) {
                        let key;

                        for (key in relation) {
                            if (relation.hasOwnProperty(key)) {
                                if (relation[key].confirmed === false) relationArr.push(key);
                            }
                        }
                        console.log(relationArr);
                    }

                    if (maxGuests > 0) {
                        for (let i = 0; i <= maxGuests; i++) {
                            optionsArr.push('<option value="' + i + '">' + i + '</option>');
                        }
                        // guestlistId.innerHTML = optionsArr.join('');
                        // formId.classList.add('rsvp--form-with-guests');
                    }
                } else {
                    // formId.classList.add('rsvp--form-confirmed-user');
                    console.log('Already confirmed');
                }
            } else {
                console.log('Name not found');
            }
        }).catch(function (error) {
            console.log("Error getting documents: ", error);
        });
    });

    updateBtn.addEventListener('click', function (e) {
        let attendingDb = db.collection('attending');
        let notAttendingDb = db.collection('notAttending');
        let rsvpDb = db.collection('rsvp');
        let batch = db.batch();
        

        confirmRelationArr.push(currentName);
        confirmRelationArr.push("Test User 2");
        confirmRelationArr.push("Test User 4");
        

        for (let i = 0; i < confirmRelationArr.length; i++) {
            let myObj = new Object;
            for (let a = 0; a < confirmRelationArr.length; a++) {
                if(confirmRelationArr[i] !== confirmRelationArr[a]) {
                    myObj["r." + confirmRelationArr[a]] = { confirmed: true };
                }
            }
            batch.update(rsvpDb.doc(confirmRelationArr[i]),myObj);
            batch.update(rsvpDb.doc(confirmRelationArr[i]),{
                a: true,
                c: true,
                dC: timestamp,
            });
            batch.set(attendingDb.doc(confirmRelationArr[i]),{
                dC: timestamp
            });
        }


        // Batch commit 
        batch.commit().catch(function (error) {
            console.error("Error adding document: ", error);
        });
    });

    // Convert seconds to a date
    function toDateTime(secs) {
        let t = new Date(1970, 0, 1);
        t.setSeconds(secs);
        return t;
    }

}());