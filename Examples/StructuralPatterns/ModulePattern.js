/**
 * This pattern is used to organize your code in pure functions if you have code to debug is more easier
 * find where the error is
 *
 * The idea is that export modules to be able to use it everywhere. *
 */


const calc = () => {
    return 4 * 3;
};

export default calc;


//then create a separate file called index and copy the code below.


 import express from 'express';
 import calc from './calc';

 const app = express();
 const PORT = 3000;
 const aNumber = calc();

 app.get('/', (req, res) =>
 res.send(`Showing number ${aNumber} on port ${PORT}`)
 );

 app.listen(PORT, () =>
 console.log(`your server is running on port ${PORT}`)
 );
