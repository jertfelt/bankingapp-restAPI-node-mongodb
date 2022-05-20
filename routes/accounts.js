import express from 'express';
import db from '../db/connect.js'
import { ObjectId } from '../db/connect.js';
import bcrypt from 'bcrypt';
import __dirname from "../utilities/path.js";
const accountsColl = await db.collection('accounts').find({user:ObjectId(req.session.user._id)}).toArray();

const router = express.Router();


const userAccess = (req, res, next) =>{
  if(req.session.user){
      next();
  }
  else{
      res.status(401).render("404", {title: "404"});
  }
}


//alla konton
router.get('/api/accounts', userAccess, async (req, res) => {
  let allAccounts = await accounts.find({}).toArray();
  res.json(allAccounts);
})

//ett konto
router.get('/api/accounts/:id', userAccess, async (req, res) => {
  try { 
    const account = await accounts.findOne({ _id: ObjectId(req.params.id) });
    res.send(account);
  }
  catch{
    res.status(404)
		res.send({ error: "Användaren finns inte!" })
  }
});

//skapa nytt konto
router.post('/api/accounts', userAccess, async (req, res) => {
  const account = {
    ...req.body
  };

  await accounts.insertOne(account);
  res.json({
    success: true, 
    account
  });
});

//ta bort ett konto
router.delete('/api/accounts/:id', userAccess, async (req, res) => {
  await accounts.deleteOne({ _id: ObjectId(req.params.id) });
  res.status(204).send();
});

//ändra kapital på konto
router.put('/api/account/:id', userAccess, async (req, res) => {
  await accounts.updateOne({ _id: ObjectId(req.params.id) }, { $set: { 
    balance: req.body.balance } } );
  res.json({
    success: true
  })
});

