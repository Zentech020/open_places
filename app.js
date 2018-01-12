var express = require('express');
const app = express();
var rp = require('request-promise');
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

  
  app.set('view engine', 'ejs')
  

app.get('/', function(req,res){

    
    res.render('index')

              

})

app.post('/send' ,function(req,res){

    var openplace = [];

    var options = {
        method: 'POST',
        uri: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCEDDCSkrqeTzlT5a3TSC_S4rnDEPb8uG8',
        json: true // Automatically parses the JSON string in the response
    };
    rp(options)
        .then(function (body) {
            
            var options = {
                method: 'POST',
                uri: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${body.location.lat},${body.location.lng}&radius=1000&type=restaurant,night_club,bar&opennow=true&key=AIzaSyCEDDCSkrqeTzlT5a3TSC_S4rnDEPb8uG8`,
                json: true // Automatically parses the JSON string in the response
            };
            rp(options)
                .then(function (body1) {
                    var geo = [];
                    var place = body1.results;
                    
                    
                    
                    
                
                    for(var i = 0; i < place.length;i++){
                        geo.push({lat:place[i].geometry.location.lat ,lon: place[i].geometry.location.lng,title:place[i].name, html: '<h3>'+place[i].name+'</h3>'})
                        
                    }
                    
                    res.render('place', {place:place,geo:geo})
                })
                .catch(function (err) {
                    console.log(err)
                });
        })
        .catch(function (err) {
            console.log(err)
        });
})

app.listen(3000, function(){
console.log('asnee listen')
})

