import express from "express";
import connectDatabase from './config/db';
import {check, validationResults} from 'express-validator';
//initialize express applications
const app = express();

//Connect database
connectDatabase();

//Configure Middleware
app.use(express.json({extended: false}));

//API endpoints
/**
 * @route GET /
 * @desc Test endpoint
 */


app.get('/', (req, res) =>
  res.send('http get request sent to root api endpoint')
);

/**
 * @route POST api/users
 * @desc Register user
 */
app.post(
  '/api/users', 
  [
    check('name', 'Please enter your name').not().isEmpty(),
    check('email', 'Please enter a valid email address').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
  ],
  (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

//connect listener
app.listen(3000, () => console.log('Express server running on port 3000'));