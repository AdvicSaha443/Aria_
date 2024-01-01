import Player from "./Player.js";
//for the functions related to pages in the web-player page


const pages = {
    player: 'PlayerPage',
    serach: 'SearchPage',
    playlist: 'PlaylistPage',
    statistics: 'StatisticsPage',
    settings: 'SettingsPage',
    user: 'UserPage'
};

function setPage(page, overrule){
    overrule = overrule || false;
    let currentPage = window.sessionStorage.getItem('currentPage');

    if(!overrule) page = currentPage || page;

    if(currentPage && overrule){
        //updating the current button
        document.getElementById(currentPage).style.display = "none";
        document.getElementById(currentPage + 'Button').querySelector("h3").style.color = "#ffffff";
    };

    //changing the display property of the div of the page
    const elemDiv = document.getElementById(page);
    const btn = document.getElementById(page + 'Button');

    btn.querySelector("h3").style.color = "#168aad";
    
    elemDiv.style.display = "block";
    window.sessionStorage.setItem('currentPage', page);
};

function addEventListenerToButtons(){
    Array.from(document.getElementsByClassName('btn')).forEach((elem) => {
        elem.addEventListener('click', () => {
            setPage(elem.id.substring(0, (elem.id.length-6)), true);
        });
    });

    setPage('PlayerPage', false);
};

function addOptions(){
    Player.getPermissions(window.localStorage.getItem('permissions'));

    let i = 1;
    Array.from(Object.keys(Player.PERMISSIONS)).forEach((perms) => {
        const form = document.getElementById("userPagePermissionForm");

        const inputElem = document.createElement('input');
        inputElem.id = `scope${i}`;
        inputElem.type = "checkbox";
        inputElem.value = perms;
        if(Player.PERMISSIONS[perms].allowed) inputElem.checked = true;

        const labelElem = document.createElement('label');
        labelElem.for = `scope${i++}`;

        const textElem = document.createElement("h5");
        textElem.innerHTML = Player.PERMISSIONS[perms].description;
        
        labelElem.appendChild(inputElem);
        labelElem.append(textElem);
        form.appendChild(labelElem);
        form.appendChild(document.createElement("br"));
    });
};

addEventListenerToButtons();
addOptions();