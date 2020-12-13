const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.get('/', function(req, res){
  res.sendFile(`${__dirname}/index.html`)
})
app.post('/', (req, res)=>{
  const ville = req.body.ville_name;
  //entrer votre cle ci desous vous pouvez utliliser https://openweathermap.org/api pour creer 
  //votre compte et votre clé et ajouter en dessous.
  const key = "";
  const pays = req.body.codePays;
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${key}&q=${ville},${pays}`;
  
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherDatas = JSON.parse(data);
      console.log(weatherDatas);
      const description = weatherDatas.weather[0].description;
      console.log('this is the description: '+ description);
      const temp = weatherDatas.main.temp;
      const icon = weatherDatas.weather[0].icon;
      const state = weatherDatas.name;
      const link = `http://openweathermap.org/img/wn/${icon}@2x.png`
      // res.write("description: "+ description);
      // res.write(`<h1>la temperature a paris est de ${temp}°C</h1>`);
      // res.write(`<img src="${link}">`);
      res.send(
        `<h1>la temperature a ${state} est de ${temp}°C <img src="${link}"></h1>
        description ${description} image  
        `
      );
    })
  })
})
app.listen(3000, function () {
  console.log("vous êtes connectez sur le port 3000")
  
})