import express from 'express';
import db from '../db/connect.js'
import { ObjectId } from '../db/connect.js';
import bcrypt from 'bcrypt';
//*-----------ACCOUNTS ROUTES

//alla konton
app.get('/api/accounts', async (req, res) => {
  let allAccounts = await accounts.find({}).toArray();
  res.json(allAccounts);
})

//ett konto
app.get('/api/accounts/:id', async (req, res) => {
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
app.post('/api/accounts', async (req, res) => {
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
app.delete('/api/accounts/:id', async (req, res) => {
  await accounts.deleteOne({ _id: ObjectId(req.params.id) });
  res.status(204).send();
});

//ändra kapital på konto
app.put('/api/account/:id', async (req, res) => {
  await accounts.updateOne({ _id: ObjectId(req.params.id) }, { $set: { 
    balance: req.body.balance } } );
  res.json({
    success: true
  })
});