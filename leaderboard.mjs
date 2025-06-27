//**************************************************************/
// fb_io.mjs
// Generalised firebase routines
// Written by Ryan Parks, Term 2 2025
// fb_detectLoginChanged and some of the leaderboard code partly from chatgpt
//Idrees Munshi helped me with some of the leaderboard code
// All variables & function begin with fb_  all const with FB_
// Diagnostic code lines have a comment appended to them //DIAG
/**************************************************************/
/*import {  fb_ReadSorted  }
    from './fb.mjs';

    window.displayLeaderboard = ()=>{
        fb_ReadSorted().then((snapshot)=> {
            const Leaderboard = document.getElementById("highScoreTableLibrary");
            Leaderboard.innerHTML = "";
            snapshot = Object.entries(snapshot)
            console.log(snapshot);
        });

    }*/