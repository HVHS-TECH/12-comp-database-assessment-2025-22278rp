/**************************************************************/
// main.mjs
// Main entry for indexLibrary.html
// Written by Ryan Parks, Term 2 2025
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c main.mjs',
    'color: blue; background-color: white;');

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the constants & functions required from fb_io module
import { fb_writeScoreLibrary, fb_initialise, fb_authenticate, fb_detectLoginChange }
    from '../fb.mjs';
    window.fb_writeScoreLibrary = fb_writeScoreLibrary;
    window.fb_initialise = fb_initialise;
    window.fb_authenticate = fb_authenticate;
    window.fb_detectLoginChange = fb_detectLoginChange;


/**************************************************************/
//   END OF CODE
/**************************************************************/
