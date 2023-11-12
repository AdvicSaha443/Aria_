const express = require('express');
const path = require('path');
const querystring = require('querystring');

const app = express();
const port = 3000;

const client_id = "c96df1be0c8b407a89bd8037ab9c9dc8";
const client_secret = "b6c50fa48e9f412aa5b35af27ef187ec";

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/home.html");
});

app.get('/login', (req, res) => {
    var state = generateRandomString(16);
    var scope = 'user-read-private user-read-email';

    res.redirect('https://accounts.spotify.com/authorize?' + 
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: 'http://localhost:3000/callback',
            state: state,
        })
    );
});

app.get('/callback', (req, res) => {

    res.sendFile(__dirname + '/public/html/callback.html');
    

    /*var code = req.query.code || null;
    var state = req.query.state || null;

    if(state === null) res.redirect("/");
    else{
        let xhr = new XMLHttpRequest();

        xhr.open("POST", "https://accounts.spotify.com/api/token", true);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', 'Baisc ' + (new Buffer.from(client_id + ":" + client_secret)));
        xhr.send(querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'http://localhost:3000/web-player'
        }));
        xhr.onload = (res) => {
            console.log(JSON.parse(res.responseText));
        };
    };*/
});

app.get('/web-player', (req, res) => {
    res.sendFile(__dirname + '/public/html/web-player.html');
});

app.listen(port, () => {
    console.log(`The app is running at http://localhost:${port}`);
});

function generateRandomString(length){
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var randomString = "";

    for(var i = 0; i < length; i++){
        var rnum = Math.floor(Math.random()*characters.length);
        randomString+=characters.substring(rnum, rnum+1);
    }

    return randomString;
}