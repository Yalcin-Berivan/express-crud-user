const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const UserModel = require('./user.schema')

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/my-db');



//Tüm KULLANICILARI ÇEKME / GET
app.get('/users', async (req, res) => {
  const users = await UserModel.find();

  res.send(users);
});

// Id si verilen kullanıcıyı çekme
app.get('/users/:id', async (req, res) => {
  const id = req.params.id;

  const users = await UserModel.findById(id);

  res.send(users);
});

//KULLANICI OLUŞTURMA / POST
app.post('/users', async (req, res) => {
  const body = req.body;
 
  await UserModel.create(body);

  res.send(body);
});

//KULLANICIYI GÜNCELLEME / PUT
app.put('/users/:id',async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  
  await UserModel.findOneAndUpdate({_id: id}, body)

  res.send(body);
});
 
// KULLANICIYI SİLME
app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;

  await UserModel.deleteOne({ _id: id })

  res.send('kayıt silindi');
});


const port = 1000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatildi`);
});
}