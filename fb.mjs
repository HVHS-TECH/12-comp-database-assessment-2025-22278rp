//**************************************************************/
// fb_io.mjs
// Generalised firebase routines
// Written by Ryan Parks, Term 2 2025
//
// All variables & function begin with fb_  all const with FB_
// Diagnostic code lines have a comment appended to them //DIAG
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c fb_io.mjs',
    'color: blue; background-color: white;');
/**************************************************************/
//Variables
var currentUser = null;
var userId = null;
/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the methods you want to call from the firebase modules
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, get, update, query, orderByChild, limitToFirst, onValue, remove }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/
export { fb_initialise, fb_authenticate, fb_detectLoginChange, fb_logout, fb_WriteRec, fb_ReadRec, fb_ReadAll, fb_UpdateRec, fb_ReadSorted, fb_Listen, fb_DeleteRec }

function fb_initialise() {
    console.log('%c fb_initialise(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const firebaseConfig =
    {
        apiKey: "AIzaSyAQ3Qc6Ej_4YvNXCAjqsfLoA8p75j3R7-8",
        authDomain: "comp2025-ryan-parks.firebaseapp.com",
        databaseURL: "https://comp2025-ryan-parks-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "comp2025-ryan-parks",
        storageBucket: "comp2025-ryan-parks.firebasestorage.app",
        messagingSenderId: "73072219046",
        appId: "1:73072219046:web:7608445213a3fd3e973567",
        measurementId: "G-R89L1J8Z4D"
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const firebaseGameDB = getDatabase(app);
    console.info(firebaseGameDB);
}

function fb_authenticate() {
    console.log('%c fb_authenticate(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const AUTH = getAuth();
    const PROVIDER = new GoogleAuthProvider();
    // The following makes Google ask the user to select the account
    PROVIDER.setCustomParameters({
        prompt: 'select_account'
    });

    signInWithPopup(AUTH, PROVIDER).then((result) => {
        //✅ Code for a successful authentication goes here
        currentUser = result.user;
        userId = currentUser.uid;
        console.log("Authenticated");
    })

        .catch((error) => {
            //❌ Code for an authentication error goes here
            console.log("ERROR!!!!!!!!");

        });
}

function fb_detectLoginChange() {
    console.log('%c fb_detectLoginChange(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const AUTH = getAuth();

    onAuthStateChanged(AUTH, (user) => {

        if (user) {

            //✅ Code for user logged in goes here
            console.log("Logged in code");
        } else {

            //✅ Code for user logged out goes here
            console.log("Logged out");

        }

    }, (error) => {

        //❌ Code for an onAuthStateChanged error goes here

    });
}
function fb_logout() {
    console.log('%c fb_logout(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const AUTH = getAuth();

    signOut(AUTH).then(() => {

        //✅ Code for a successful logout goes here

    })

        .catch((error) => {

            //❌ Code for a logout error goes here

        });
}
var element;
function fb_WriteRec( element ) {
     if (!currentUser) {
        alert("You must be logged in to submit the form.");
        return;
    }
    console.log('%c fb_WriteRec(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()
    var name = document.getElementById("element").value;
    userScore = document.getElementById("element").value;

    // Add additional fields here as needed
    
    const dbReference= ref(DB, 'Test/UID/' + userId);
    set(dbReference, {
        Name: name,
        userScore: userScore,
    }).then(() => {
        console.log("Write successful!")
    }).catch((error) => {
        console.log("fail Writing")
    });
}

function fb_ReadRec() {
    console.log('%c fb_ReadRec(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()
    const dbReference= ref(DB, "Test/UID/Name");

    get(dbReference).then((snapshot) => {

        var fb_data = snapshot.val();

        if (fb_data != null) {

            //✅ Code for a successful read goes here
            console.log("successful read");
            console.log(fb_data);
        } else {

            //✅ Code for no record found goes here
            console.log("no record found");
            console.log(fb_data);
        }

    }).catch((error) => {

        //❌ Code for a read error goes here
        console.log("fail read");
        console.log(fb_data);

    });
}

function fb_ReadAll() {
     console.log('%c fb_ReadAll(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()
    const dbReference= ref(DB, "Test/UID/" + userId);

    get(dbReference).then((snapshot) => {

        var fb_data = snapshot.val();

        if (fb_data != null) {

            //✅ Code for a successful read all goes here
            console.log("Successfully read all");
            console.log(fb_data);
        } else {

            //✅ Code for no record found goes here
            console.log("no record");
            console.log(fb_data);

        }

    }).catch((error) => {

        //❌ Code for a read all error goes here
        console.log("error not read all");
        console.log(fb_data);
    });
}

function fb_UpdateRec() {
    console.log('%c fb_UpdateRec(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()
    const dbReference= ref(DB, "Test/Userdata");

    update(dbReference, {Location: "Alabasta", Name: "Karoo", Cuteness: 50}).then(() => {

        //✅ Code for a successful update goes here

    }).catch((error) => {

        //❌ Code for a update error goes here

    });

}

function fb_ReadSorted() {
    console.log('%c fb_ReadSorted(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()
    var sortKey = "movieQuantity";

    const dbReference= query(ref(DB, "Test/UID" ), orderByChild(sortKey), limitToFirst(2));

     get(dbReference).then((snapshot) => 
    {
        // Do Stuff
    });

    get(dbReference).then((allScoreDataSnapshot) => {
        allScoreDataSnapshot.forEach(function (userScoreSnapshot) {
            var obj = userScoreSnapshot.val();
            console.log(obj);
        });
    });

    get(dbReference).then((snapshot) => {

        var fb_data = snapshot.val();

      if (fb_data != null) {

           //✅ Code for a successful sorted read goes here
           console.log("Sorted Successfully");
           console.log(fb_data);

        } else {

           //✅ Code for no record found goes here
            console.log("Sorted Successfully, but no record");
        }

    }).catch((error) => {

        //❌ Code for a sorted read error goes here
        console.log("Sorting failed");
    });

}

function fb_Listen() {
    console.log('%c fb_Listen(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()

    const dbReference = ref(DB, "Test/Userdata/Cuteness");

    onValue(dbReference, (snapshot) => {

        var fb_data = snapshot.val();

        if (fb_data != null) {

            //✅ Code for a successful read goes here
            console.log("Data has been changed")

        } else {

            //✅ Code for no record found goes here
            console.log("No record to be monitored")

        }

    });

}

function fb_DeleteRec() {
    console.log('%c fb_DeleteRec(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()

    const dbReference= ref(DB, "Test/Userdata");

    remove(dbReference).then(() => {

        //✅ Code for a successful delete goes here
        console.log("Record Deleted");

    }).catch((error) => {

        //❌ Code for a delete error goes here
        console.log("ERROR: DeleteRec")

    });

}
/**************************************************************/
// END OF CODE
/**************************************************************/