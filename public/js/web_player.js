function checkIfLogged(){
    if(window.localStorage.getItem('access_token') == undefined){
        alert("You aren't logged in!");
        window.location.replace("http://localhost:3000/login");
    };
};

function getAccessCode(){
    checkIfLogged();
    return window.localStorage.getItem('access_token');
};

function getNewAccessToken(){
    //code to get a new access token
};


async function fetchWebApi(endpoint, method, body){
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${getAccessCode()}`
        },
        method: method,
        body: JSON.stringify(body),
    });

    return await res.json();
}

async function getUserInformation(){
    return await fetchWebApi('v1/me', "GET");
}

async function updateInformation(){
    
}