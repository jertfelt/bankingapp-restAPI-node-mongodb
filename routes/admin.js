import express from 'express';
import db from '../db/connect.js'
import { ObjectId } from '../db/connect.js';
import bcrypt from 'bcrypt';

const router = express.Router();
router.use(express.json())

router.get('/', (req, res) =>{
  res.sendFile('public/index.html', { root: __dirname})
})




//*----------USER ROUTES
router.post('/api/users', async (req, res) => {
  const hash = await bcrypt.hash(req.body.pass, saltRounds);

  const user = {
    user: req.body.user,
    pass: hash
  }

  await users.insertOne(user);
  res.json({
    success:true
  })})


//-------logga in
router.post('/api/login', async (req, res) => {
  const user = await users.findOne( { user: req.body.loginName } );
  // console.log(req.body)
 
  // console.log(user.pass)
  const match = await bcrypt.compare(req.body.loginPass, user.pass);

  if(!match){
    es.status(401).json({error:'wrong password'})
  }
  else {
    req.session.user = user;
    res.json({
      user: user.user
    });
  }
});


//logga ut
  router.post('/api/logout', (req, res) => {
    req.session.destroy(() => {
      res.json({
        loggedin: false
      });
    });
  });
