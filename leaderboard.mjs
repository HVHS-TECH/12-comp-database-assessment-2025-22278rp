import {  fb_ReadSorted  }
    from './fb.mjs';

    window.displayLeaderboard = ()=>{
        fb_ReadSorted().then((snapshot)=> {
            const Leaderboard = document.getElementById("highScoreTableLibrary");
            Leaderboard.innerHTML = "";
            snapshot = Object.entries(snapshot)
            console.log(snapshot);
        });

    }