import express from 'express';
import session from 'express-session';
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

const port = 3000;
const app = express();
const uri = "mongodb+srv://tova:tova1234@bankingapp.frxvj.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
await client.connect();
const db = client.db('tova');
const accounts = db.collection('accounts');
const users = db.collection('users');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(session({
  resave: false, 
  saveUninitialized: false, 
  secret: 'VERY SECRET YES',
  cookie: {
    maxAge: 6000000
  }
}));

app.set("view engine", "ejs");

//session:
app.get('/api/loggedin', (req, res) => {
  if(req.session.user){
    res.json({ user: req.session.user });
  }else {
    res.status(401).json({ error: 'Unauthorized' });
  } 
});

const saltRounds = 10;

const restrict = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send({ error: 'Unauthorized' });
  }
}


//*----------USER ROUTES
app.post('/api/users', async (req, res) => {
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
app.post('/api/login', async (req, res) => {
  const user = await users.findOne( { user: req.body.loginName } );
  console.log(req.body)
 
  console.log(user.pass)

  const passMatches = await bcrypt.compare(req.body.loginPass, user.pass);

  if (user && passMatches) {
    req.session.user = user;
    res.json({
      user: user.user
    });
  } else { 
    res.status(401).json({ error: 'Unauthorized' });
  }
});


//logga ut
  app.post('/api/logout', (req, res) => {
    req.session.destroy(() => {
      res.json({
        loggedin: false
      });
    });
  });



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


app.listen(port, () => console.log(`${port}`));


//!---404 error
app.use((req, res) => {
  res.status(404).render("404", {title: "404"});
})



// app.get('/api/loggedin', restrict, (req, res) => {
//   res.json({
//     user: req.session.user
//   });
// });


// //ändra namn på konto
// app.put('/api/account/:id', async (req, res) => {
//   await accounts.updateOne({ _id: ObjectId(req.params.id) }, { $set: { 
//     accountname: req.body.accountname } } );
//   res.json({
//     success: true
//   })
// });
