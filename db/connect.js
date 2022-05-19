import { MongoClient, ObjectId } from "mongodb";
const uri = "mongodb+srv://tova:tova1234@bankingapp.frxvj.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

const db = client.db('tova');
const accounts = db.collection('accounts');
const users = db.collection('users');


export default db;
export {
  accounts,
  users
}
export {ObjectId}