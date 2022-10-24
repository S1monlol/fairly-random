let express = require('express');
let crypto = require('crypto');

let app = express();


seeds = []

app.get('/seed', function (req, res) {

    

    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 


    let seed = Math.floor(Math.random() * 10000000000) + 20;

    // is seed even or odd
    let isEven = seed % 2 === 0;




    let found = false

    for (let i = 0; i < seeds.length; i++) {
        
        if (seeds[i].ip == ip) {
            console.log("Found")
            seeds[i].seed = seed;
            seeds[i].isEven = isEven;
            found = true;
        }

    } 

    if (found == false) {
        console.log("Not found")
        seeds.push({
            seed: seed,
            ip: ip,
            isEven: isEven
        })
    }

    console.log(seeds)
    

    // make sha512 hash of seed
    let hash = crypto.createHash('sha512').update(seed.toString()).digest('hex');

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // console.log(seeds)

    res.send({
        seed: hash.toString()
    })




})

app.post('/heads', function (req, res) {

    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 

    isEven = seeds.find(x => x.ip == ip).isEven
    seed = seeds.find(x => x.ip == ip).seed
    



    console.log(isEven  + " " + seed)

    for (let i = 0; i < seeds.length; i++) {
        
        if (seeds[i].ip == ip) {
            console.log("Found")
            seeds[i].seed = Math.floor(Math.random() * 10000000000) + 20;
            seeds[i].isEven = isEven = seed % 2 === 0;;
            
        }

    } 
    
    if(isEven) {
        res.send(
            {
                "win": true,
                "seed": seed,
                "hash": crypto.createHash('sha512').update(seed.toString()).digest('hex'),
            }
            );

        
    } else {
        res.send(
            {
                "win": false,
                "seed": seed,
                "hash": crypto.createHash('sha512').update(seed.toString()).digest('hex'),
            }
            );

    }


   


})


app.post('/tails', function (req, res) {

    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 

    isEven = seeds.find(x => x.ip == ip).isEven
    seed = seeds.find(x => x.ip == ip).seed

    console.log(isEven  + " " + seed)

    for (let i = 0; i < seeds.length; i++) {
        
        if (seeds[i].ip == ip) {
            console.log("Found")
            seeds[i].seed = Math.floor(Math.random() * 10000000000) + 20;
            seeds[i].isEven = isEven = seed % 2 === 0;;
            
        }

    }

    if(!isEven) {
        res.send(
            {
                "win": true,
                "seed": seed,
                "hash": crypto.createHash('sha512').update(seed.toString()).digest('hex'),
            }
            );

        
    } else {
        res.send(
            {
                "win": false,
                "seed": seed,
                "hash": crypto.createHash('sha512').update(seed.toString()).digest('hex'),
            }
            );

    }

})

// start the server
app.listen(8081, function () {
    console.log('started');
    }
);

