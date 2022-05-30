// const express = require('express');
const app = require('express')();
const ImageKit = require('imagekit');
const consts = require('./consts')

const imagekit = new ImageKit({
  urlEndpoint: consts.URL_ENDPOINT,
  publicKey: consts.PUBLIC_KEY,
  privateKey: consts.PRIVATE_KEY,
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/auth', (req, res) => {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.get('/list',  (req, res) => {
  let imageList = [];

  imagekit.listFiles({}, (error, result) => { 
    if(error) console.log(error);
    else {
      result.map(item => imageList.push(item.thumbnail))
      imageList.reverse();
      if(imageList.length > 5) imageList = imageList.slice(0,5)
      res.json(imageList);
    }
  });
});

app.listen(3001, () => {
  console.log('Live at Port 3001');
});