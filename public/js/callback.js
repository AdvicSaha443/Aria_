let CLIENT_ID = "c96df1be0c8b407a89bd8037ab9c9dc8";
let CLIENT_SECRET = "b6c50fa48e9f412aa5b35af27ef187ec";

let web_player_link = "http://localhost:3000/web-player?access_token=";

function getAccessToken(){
    let code = null;

    const URLString = window.location.search;

    if(URLString.length > 0){
        const URLParams = new URLSearchParams(URLString);
        code = URLParams.get('code');
    }else{
        //user is not logged in!
        alert("You are not logged in");
        window.location.replace('http://localhost:3000/login');
    }

    let xhr = new XMLHttpRequest();

    xhr.open("POST", "https://accounts.spotify.com/api/token", true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(CLIENT_ID + ":" + CLIENT_SECRET));

    let body = `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/callback`
    xhr.send(body);

    xhr.onload = handleAuthResponse;
};

function handleAuthResponse(){
    if(this.status == 200){
        var data = JSON.parse(this.responseText);

        if(data?.access_token != undefined && data?.refresh_token != undefined){
            showUserData(data.access_token, data.refresh_token);
        };

    }else{
        alert(this.responseText);
    };
};

async function showUserData(access_token, refresh_token){
    await fetch('https://api.spotify.com/v1/me', {
        method: "GET",
        headers: {
            Authorization: `Bearer ${access_token}`
        },
    })
    .then(res => res.json())
    .then(userData => {
        web_player_link+=access_token
        
        document.getElementById("welcomeText").innerHTML = `Welcome ${userData.display_name}`;
        const button = document.getElementById("webPlayerButton");

        //storing access token and refresh token in local Storage
        window.localStorage.setItem('access_token', access_token);
        window.localStorage.setItem('refresh_token', refresh_token);

        button.addEventListener('click', () => {
            window.location.replace(`http://localhost:3000/web-player`);
        });
    });
};