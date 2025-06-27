//**************************************************************/
// fb_io.mjs
// Generalised firebase routines
// Written by Ryan Parks, Term 2 2025
// fb_detectLoginChanged code partly from chatgpt
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
import { getDatabase, ref, get, update, query, orderByChild, remove }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/
export { fb_writeScoreCoin, fb_writeScoreLibrary, fb_initialise, fb_authenticate, fb_detectLoginChange, fb_logout, fb_WriteRec, fb_WriteRecPrivate, fb_ReadSortedLibrary, fb_ReadSortedCoin, fb_DeleteRec }

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
    // Initialize Firebase only if it hasn’t already been initialized
}

function fb_authenticate() {
    console.log('%c fb_authenticate(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    loginButton.innerHTML = "Logged In";
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
            console.log("ERROR!!!!!!!! not ");
            console.log(error);

        });
}



function fb_detectLoginChange() {
    console.log('%c fb_detectLoginChange(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const AUTH = getAuth();

    onAuthStateChanged(AUTH, (user) => {
        if (user) {
            currentUser = user;
            userId = user.uid;
            console.log("✅ Logged in as:", user.email, user.displayName, user.photoURL);
        } else {
            console.log("⚠️ Not logged in — redirecting to index.html");
            location.href = "index.html";
        }
    }, (error) => {
        console.error("❌ Auth detection error:", error);
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

function fb_WriteRec() {
    const AUTH = getAuth();
    var name = document.getElementById("name").value;
    if (!currentUser || name == "" || name == null) {
        alert("You must be logged in and enter a valid name.")
        return;
    }

    console.log('%c fb_WriteRec(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()

    const dbReference = ref(DB, "Public/" + userId);

    update(dbReference, { displayName: name }).then(() => {

        //✅ Code for a successful write goes here
        console.log("successful write")


    }).catch((error) => {

        //❌ Code for a write error goes here
        console.log("Writing error")
    });


}

function fb_WriteRecPrivate() {
    const AUTH = getAuth();
    var age = document.getElementById("age").value;
    var colour = document.getElementById("colour").value;
    if (!currentUser || age == "" || isNaN(age) || colour == "" || !isNaN(colour)) {
        alert("You must be logged in and enter a valid name and age.")
        return;
    }
    console.log('%c fb_WriteRecPrivate(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()

    const dbReference = ref(DB, "Private/" + userId);

    update(dbReference, { Age: age, Colour: colour }).then(() => {

        //✅ Code for a successful write goes here
        console.log("successful write")


    }).catch((error) => {

        //❌ Code for a write error goes here
        console.log("Writing error")
    });

    //Collects data of the user's google account

    onAuthStateChanged(AUTH, (user) => {
        if (user) {
            currentUser = user;
            userId = user.uid;
            console.log("✅ Logged in as:", user.email, "Name:", user.displayName, user.photoURL);
            update(dbReference, { Email: user.email, profilepicture: user.photoURL, Name: user.displayName }).then(() => {
                location.href = 'gameMenu.html'
                //✅ Code for a successful write goes here
                console.log("Google login completed")

            }).catch((error) => {

                //❌ Code for a write error goes here
                console.log("Google login error")
            });
        } else {
            console.log("⚠️ Not logged in — redirecting to index.html");
            location.href = "index.html";
        }
    },
        (error) => {
            console.error("❌ Auth detection error:", error);
        });
}

//Writing the score for the game: Coin Collector to the database

function fb_writeScoreCoin(userScoreCoin) {
    console.log("Look I'm Writing!")
    console.log(userScoreCoin);
    console.log('%c fb_writeScoreCoin(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase();
    const highScoreRef = ref(DB, "Public/" + userId + "/userHighScoreCoin");
    const userRef = ref(DB, "Public/" + userId);
    console.log("Score written")
    get(highScoreRef).then(snap => { //Code in fb_WriteScore was made with help from Chatgpt.
        const prevHigh = snap.exists() ? snap.val() : 0;
        const highScore = userScoreCoin > prevHigh ? userScoreCoin : prevHigh;


        update(userRef, {
            userScoreCoin: userScoreCoin,
            userHighScoreCoin: highScore
        }).then(() => {
            console.log("Highscore updated")
        });
    });

}
//Writing the score for the game: Library Labryinth to the database

function fb_writeScoreLibrary(userScoreLibrary) {
    console.log("Look I'm Writing!")
    console.log(userScoreLibrary);
    console.log('%c fb_writeScoreLibrary(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase();
    const highScoreRef = ref(DB, "Public/" + userId + "/userHighScoreLibrary");
    const userRef = ref(DB, "Public/" + userId);
    console.log("Score written")
    get(highScoreRef).then(snap => { //Code in fb_WriteScore was made with help from Chatgpt.
        const prevHigh = snap.exists() ? snap.val() : 0;
        const highScore = userScoreLibrary > prevHigh ? userScoreLibrary : prevHigh;


        update(userRef, {
            userScoreLibrary: userScoreLibrary,
            userHighScoreLibrary: highScore
        }).then(() => {
            console.log("Highscore updated")
        });
    });

}

//some parts of sorted read were improved by chatgpt, originally this could only display the 1st place on each leaderboard but chatgpt added it so it can account for all users
function fb_ReadSortedLibrary() {
  console.log('%c fb_ReadSortedLibrary(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const DB = getDatabase();
  const sortKey = "userHighScoreLibrary";
  const dbReference = query(ref(DB, "Public/"), orderByChild(sortKey)); 
  const table = document.getElementById("highScoreTableLibrary");
  table.innerHTML = ""; //added by chatgpt

  get(dbReference).then((snapshot) => {
    var rank = 1;
    const users = []; 
    snapshot.forEach((userSnap) => { 
      users.push(userSnap.val());
    });
    users.reverse(); 
    users.forEach((obj) => {
      table.innerHTML += "<tr><td>" + rank + "</td><td>" + obj.displayName + "</td><td>" + obj.userHighScoreLibrary + "</td></tr>";//updated by chatgpt
      rank++;//added by chatgpt
    });
  }).catch((error) => {
    console.log("Sorting failed", error);
  });
}



//some parts of sorted read were improved by chatgpt, originally this could only display the 1st place on each leaderboard but chatgpt added it so it can account for all users
function fb_ReadSortedCoin() {
  console.log('%c fb_ReadSortedCoin(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const DB = getDatabase();
  const sortKey = "userHighScoreCoin";
  const dbReference = query(ref(DB, "Public/"), orderByChild(sortKey));//chatgpt removed limit to first
  const table = document.getElementById("highScoreTableCoin");
  table.innerHTML = "";//added by chatgpt

    get(dbReference).then((snapshot) => {
    var rank = 1;
    const users = []; 
    snapshot.forEach((userSnap) => { //added by ChatGpt
      users.push(userSnap.val());//added by ChatGpt
    });
    users.reverse(); 
    users.forEach((obj) => {
      table.innerHTML += "<tr><td>" + rank + "</td><td>" + obj.displayName + "</td><td>" + obj.userHighScoreCoin + "</td></tr>";//chatgpt updated this
      rank++;//chatgpt added this
    });
  }).catch((error) => {
     //❌ Code for a sorted read error goes here
    console.log("Sorting failed", error);
  });
}

/*function fb_ReadSorted() {
    console.log('%c fb_ReadSorted(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()
    var sortKey = "userScoreLibrary";
    leaderboardSign.innerHTML = "You pressed the button!";

    const dbReference = query(ref(DB, "Public/"), orderByChild(sortKey), limitToLast(10));

    return new Promise((resolve, reject) => {
        get(dbReference).then((snapshot) => {
            resolve(snapshot.val());
        }).catch((error) => {
            reject(error);
        })
    })

    get(dbReference).then((snapshot) => {
        // Do Stuff
    });

    get(dbReference).then((allScoreDataSnapshot) => {
        allScoreDataSnapshot.forEach(function (userScoreSnapshot) {
            var obj = userScoreSnapshot.val();
            console.log(obj.userScoreLibrary);
            console.log(obj.displayName)
            Test.innerHTML = obj.displayName;
            Test2.innerHTML = obj.userScoreLibrary;
        });
    });

    get(dbReference).then((snapshot) => {

        var fb_data = snapshot.val();

        if (fb_data != null) {

            //✅ Code for a successful sorted read goes here
            console.log("Sorted Successfully");

        } else {

            //✅ Code for no record found goes here
            console.log("Sorted Successfully, but no record");


        }

    }).catch((error) => {

        //❌ Code for a sorted read error goes here
        console.log("Sorting failed");
    });

}

function fb_ReadSortedCoin() {
    console.log('%c fb_ReadSortedCoin(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()
    var sortKey = "userScoreCoin";
    leaderboardSign.innerHTML = "You pressed the button!";

    const dbReference = query(ref(DB, "Public/"), orderByChild(sortKey), limitToLast(10));

    return new Promise((resolve, reject) => {
        get(dbReference).then((snapshot) => {
            resolve(snapshot.val());
        }).catch((error) => {
            reject(error);
        })
    })

    get(dbReference).then((snapshot) => {
        // Do Stuff
    });

    get(dbReference).then((allScoreDataSnapshot) => {
        allScoreDataSnapshot.forEach(function (userScoreSnapshot) {
            var obj = userScoreSnapshot.val();
            console.log(obj.userScoreCoin);
            console.log(obj.displayName)
            Test.innerHTML = obj.displayName;
            Test2.innerHTML = obj.userScoreCoin;
        });
    });

    get(dbReference).then((snapshot) => {

        var fb_data = snapshot.val();

        if (fb_data != null) {

            //✅ Code for a successful sorted read goes here
            console.log("Sorted Successfully");

        } else {

            //✅ Code for no record found goes here
            console.log("Sorted Successfully, but no record");


        }

    }).catch((error) => {

        //❌ Code for a sorted read error goes here
        console.log("Sorting failed");
    });

}*/

function fb_DeleteRec() {
    console.log('%c fb_DeleteRec(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()

    const dbReference = ref(DB, "Private/" + userId);

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