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
  secret: '2323323141-4few',
  cookie: {
    maxAge: 5 * 60 * 1000 
  }
}));

app.get('/api/loggedin', (req, res) => {
  if(req.session.user){
    res.json({ user: req.session.user });
  }else {
    res.status(401).json({ error: 'Unauthorized' });
  } 
});

//KRYPTERING
const saltRounds = 10;


app.post('/api/login', async (req, res) => {
  const user = await users.findOne( { user: req.body.name } );

  const passMatches = await bcrypt.compare(req.body.password, user.pass);

  if (user && passMatches) {
    req.session.user = user;
    
    res.json({
      user: user.user
    });
  } else { 
    res.status(401).json({ error: 'Unauthorized' });
  }
});


app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({
      loggedin: false
    });
  });
 });


app.get('/api/accounts', async (req, res) => {
  let allAccounts = await accounts.find({}).toArray();
  res.json(allAccounts);
})


app.get('/api/accounts/:id', async (req, res) => {
  const account = await accounts.findOne({ _id: ObjectId(req.params.id) });
  res.json(account);
});


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


app.post('/api/users', async (req, res) => {
  const hash = await bcrypt.hash(req.body.pass, saltRounds);

  const user = {
    user: req.body.user,
    password: hash
  }

  await users.insertOne(user);
  res.json({
    success:true
  })
});


app.delete('/api/accounts/:id', async (req, res) => {
  await accounts.deleteOne({ _id: ObjectId(req.params.id) });
  res.status(204).send();
});


app.put('/api/account/:id', async (req, res) => {
  await accounts.updateOne({ _id: ObjectId(req.params.id) }, { $set: { balance: req.body.balance } } );
  res.json({
    success: true
  })
});

app.listen(port, () => console.log(`${port}`));