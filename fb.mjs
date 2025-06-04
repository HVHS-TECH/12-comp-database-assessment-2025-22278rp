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
import { getDatabase }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { onAuthStateChanged }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { signOut }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { ref, set }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { get }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { update }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { query, orderByChild, limitToFirst }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { onValue }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { remove }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/
export { fb_initialise, fb_authenticate, fb_detectLoginChange, fb_logout, fb_WriteRec, fb_ReadRec, fb_ReadAll, fb_UpdateRec, fb_ReadSorted, fb_WreckHavoc, fb_Listen, fb_DeleteRec }

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
    document.getElementById("p_fbInitialise").innerHTML = "Initialised";
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
    document.getElementById("p_fbAuthenticate").innerHTML = "Authentication success";
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
    document.getElementById("p_fbdetectLoginChange").innerHTML = "Login change detected";
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
    document.getElementById("p_fblogout").innerHTML = "Logged out";
}

/*function fb_WriteRec() {
     if (!currentUser) {
        alert("You must be logged in to submit the form.");
        return;
    }
    console.log('%c fb_WriteRec(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()
    var name = document.getElementById("name").value;
    var favoriteMovie = document.getElementById("favoriteMovie").value;
    var movieQuantity = document.getElementById("movieQuantity").value;

    // Add additional fields here as needed
    
    const dbReference= ref(DB, 'Test/UID/' + userId);
    set(dbReference, {
        Name: name,
        FavoriteMovie: favoriteMovie,
        MovieQuantity: movieQuantity
    }).then(() => {
        console.log("Write successful!")
    }).catch((error) => {
        console.log("fail Writing")
    });
    document.getElementById("p_fbWriteRec").innerHTML = "record written";
}*/

function fb_WriteRec() {
    console.log('%c fb_WriteRec(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()
    const dbReference= ref(DB, "Test/Userdata");

    set(dbReference, {Location: "pool", Name: "Jeff", Cuteness: 100}).then(() => {

        //✅ Code for a successful write goes here
        console.log("success write");

    }).catch((error) => {

        //❌ Code for a write error goes here
         console.log("fail write");
         console.log(error);

    });
    document.getElementById("p_fbWriteRec").innerHTML = "record written";
}

function fb_ReadRec() {
    console.log('%c fb_ReadRec(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()
    const dbReference= ref(DB, "Test/Userdata/Name");

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
    document.getElementById("p_fbReadRec").innerHTML = "record read";
}

function fb_ReadAll() {
    console.log('%c fb_ReadAll(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()
    const dbReference= ref(DB, "Test/Userdata");

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
    document.getElementById("p_fbReadAll").innerHTML = "read all";
}

/*function fb_ReadRec() {
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
    document.getElementById("p_fbReadRec").innerHTML = "record read";
}*/

/*function fb_ReadAll() {
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
    document.getElementById("p_fbReadAll").innerHTML = "read all";
}*/

function fb_UpdateRec() {
    console.log('%c fb_UpdateRec(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()
    const dbReference= ref(DB, "Test/Userdata");

    update(dbReference, {Location: "Alabasta", Name: "Karoo", Cuteness: 50}).then(() => {

        //✅ Code for a successful update goes here

    }).catch((error) => {

        //❌ Code for a update error goes here

    });


    document.getElementById("p_fbUpdateRec").innerHTML = "Record updated";
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
    document.getElementById("p_fbReadSorted").innerHTML = "Data Sorted";

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
    document.getElementById("p_fbListen").innerHTML = "Listened";

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
    document.getElementById("p_fbDeleteRec").innerHTML = "Record Deleted";

}

function fb_WreckHavoc() {
    console.log("Wrecking havoc");
    console.log('%c fb_WreckHavoc(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const firebaseConfig =
    {
        apiKey: "AIzaSyCwPibZHntricqhOchcdlX3H7ve_CFQhR0",
        authDomain: "comp-2025-caleb-lowe-31f01.firebaseapp.com",
        databaseURL: "https://comp-2025-caleb-lowe-31f01-default-rtdb.firebaseio.com",
        projectId: "comp-2025-caleb-lowe-31f01",
        storageBucket: "comp-2025-caleb-lowe-31f01.firebasestorage.app",
        messagingSenderId: "440676386005",
        appId: "1:440676386005:web:05b4cb8a914c0ceb0ace5c",
        measurementId: "G-WGYBNEYVY3"
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const firebaseGameDB = getDatabase(app);

    var dbReference= ref(firebaseGameDB, "Test/UID");

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
    dbReference= ref(firebaseGameDB, "/");

    set(dbReference, {Message:"You didn't protect your database! :)"}).then(() => {

        //✅ Code for a successful write goes here
        console.log("success write");

    }).catch((error) => {

        //❌ Code for a write error goes here
         console.log("fail write");
         console.log(error);

    });

}
/**************************************************************/
// END OF CODE
/**************************************************************/