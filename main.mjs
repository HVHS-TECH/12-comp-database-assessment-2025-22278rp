/**************************************************************/
// main.mjs
// Main entry for index.html
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
import { fb_initialise }
    from './fb.mjs';
window.fb_initialise = fb_initialise;
import { fb_authenticate }
    from './fb.mjs';
window.fb_authenticate = fb_authenticate;
import { fb_detectLoginChange }
    from './fb.mjs';
window.fb_detectLoginChange = fb_detectLoginChange;
import { fb_logout }
    from './fb.mjs';
window.fb_logout = fb_logout;
import { fb_WriteRec }
    from './fb.mjs';
window.fb_WriteRec = fb_WriteRec;
import { fb_ReadRec }
    from './fb.mjs';
window.fb_ReadRec = fb_ReadRec;
import { fb_ReadAll }
    from './fb.mjs';
window.fb_ReadAll = fb_ReadAll;
import { fb_UpdateRec }
    from './fb.mjs';
window.fb_UpdateRec = fb_UpdateRec;
import { fb_ReadSorted }
    from './fb.mjs';
window.fb_ReadSorted = fb_ReadSorted;
import { fb_Listen }
    from './fb.mjs';
window.fb_Listen = fb_Listen;
import { fb_DeleteRec }
    from './fb.mjs';
window.fb_DeleteRec = fb_DeleteRec;


/**************************************************************/
//   END OF CODE
/**************************************************************/
