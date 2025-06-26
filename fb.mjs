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
import { getDatabase, ref, get, update, query, orderByChild, limitToFirst, remove }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/
export { fb_writeScoreCoin, fb_writeScoreLibrary, fb_initialise, fb_authenticate, fb_detectLoginChange, fb_logout, fb_WriteRec, fb_WriteRecPrivate, fb_ReadRec, fb_ReadAll, fb_ReadSorted, fb_ReadSortedCoin, fb_DeleteRec }

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
  if (!currentUser || name == "" || name == null ) {alert("You must be logged in and enter a valid name.")
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
  if (!currentUser || age == "" || isNaN(age) || colour == "" || !isNaN(colour)) {alert("You must be logged in and enter a valid name and age.")
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
            update(dbReference, { Email: user.email, profilepicture: user.photoURL, Name: user.displayName}).then(() => {
              location.href='gameMenu.html'
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

function fb_writeScoreCoin(userScoreCoin){
    console.log("Look I'm Writing!")
    console.log(userScoreCoin);
    console.log('%c fb_writeScoreCoin(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()

    // Add additional fields here as needed
    
    const dbReference= ref(DB, 'Public/' + userId);
    update(dbReference, {
        userScoreCoin: userScoreCoin,
    }).then(() => {
        console.log("Write successful!")
    }).catch((error) => {
        console.log("fail Writing")
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


    update(userRef, {userScoreLibrary: userScoreLibrary,
      userHighScoreLibrary: highScore}).then(() => {
      console.log("written")
    });
  });

}


function fb_ReadRec() {
    console.log('%c fb_ReadRec(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()
    const dbReference= ref(DB, "UIDs/Name");

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
    const dbReference= ref(DB, "UIDs/" + userId);

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

function fb_ReadSorted() {
    console.log('%c fb_ReadSorted(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()
    var sortKey = "userScoreLibrary";
    leaderboardSign.innerHTML = "You pressed the button!";

    const dbReference= query(ref(DB, "Public/" ), orderByChild(sortKey), limitToFirst(10));

     get(dbReference).then((snapshot) => 
    {
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
    console.log('%c fb_ReadSorted(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()
    var sortKey = "userScoreCoin";
    leaderboardSign.innerHTML = "Leaderboard: Coin Collector";

    const dbReference= query(ref(DB, "Public/" ), orderByChild(sortKey), limitToFirst(10));

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

/*function fb_ReadSorted() {
    console.log('%c fb_ReadSorted(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    const DB = getDatabase();
    const sortKey = "userScoreLibrary";

    const dbReference = query(ref(DB, "Public/"), orderByChild(sortKey), limitToFirst(10));

    get(dbReference).then((snapshot) => {
        const leaderboardBody = document.getElementById("leaderboardBody");
        leaderboardBody.innerHTML = ""; // Clear old rows

        // Collect and sort data (Firebase returns in ascending order)
        const rows = [];

        snapshot.forEach((userScoreSnapshot) => {
            const data = userScoreSnapshot.val();
            rows.push({
                displayName: data.displayName || "Unnamed",
                score: data.userScoreLibrary || 0
            });
        });

        // Sort descending (highest score first)
        rows.sort((a, b) => b.score - a.score);

        rows.forEach((entry, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${entry.displayName}</td>
                <td>${entry.score}</td>
            `;
            leaderboardBody.appendChild(tr);
        });

        console.log("✅ Leaderboard updated.");
    }).catch((error) => {
        console.error("❌ Sorting failed:", error);
    });
}*/


function fb_DeleteRec() {
    console.log('%c fb_DeleteRec(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()

    const dbReference= ref(DB, "UIDs/"  + userId);

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