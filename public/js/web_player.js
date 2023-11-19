let CLIENT_ID = "c96df1be0c8b407a89bd8037ab9c9dc8";
let CLIENT_SECRET = "b6c50fa48e9f412aa5b35af27ef187ec";

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

async function refreshAccessToken(){
    await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: window.localStorage.getItem('refresh_token'),
            client_id: CLIENT_ID
        }),
    })
    .then(response => response.json())
    .then((res) => {
        console.log(res);

        //window.localStorage.setItem('access_token', res.accessToken);
        //window.localStorage.setItem('refresh_token', res.refreshToken);
    });
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
};

async function storeUserInformation(){
    await fetchWebApi('v1/me', "GET")
    .then(async (response) => {
        if(response?.error?.status == 401) await refreshAccessToken();//.then(storeUserInformation);
        else{
            window.sessionStorage.setItem('user', JSON.stringify(response));
            updateInformation();
        };
    });
};

async function updateInformation(){
    let userData = window.sessionStorage.getItem('user');

    if(userData){
        userData = JSON.parse(window.sessionStorage.getItem('user'));

        //updating the upper right user DIV data
        let rightNavbarDiv = document.getElementById("rightNavbar");

        let imageDiv = document.createElement('div');
        imageDiv.id = "userImage";
        imageDiv.className = "userImage";

        let button1 = document.createElement('button');
        button1.className = "UserPageButton";
        button1.addEventListener('click', () => {
            // adding code to change the page even through the logo.
            console.log("The logo has been clicked!");
        });
        
        let button2 = document.createElement('button');
        button2.id = "UserPageButton";
        button2.classList.add("UserPageButton", "btn");

        let img = document.createElement('img');
        img.src = userData?.images[0]?.url || "https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png";
        img.alt = "User Image";

        let h3 = document.createElement('h3');
        h3.innerHTML = userData.display_name;

        imageDiv.appendChild(img);
        button1.appendChild(imageDiv);
        button2.appendChild(h3);
        rightNavbarDiv.appendChild(button1);
        rightNavbarDiv.appendChild(button2);
    }else{
        await storeUserInformation()//.then(updateInformation);
    };
};