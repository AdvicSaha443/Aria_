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
    Player.getPermissions(window.localStorage.getItem('Permissions'));

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
        labelElem.innerHTML = perms;

        const descriptionElem = document.createElement('h5');
        descriptionElem.innerHTML = Player.PERMISSIONS[perms].description;
        descriptionElem.style.display = "none";

        const showButtonnElem = document.createElement('button');
        showButtonnElem.innerHTML = "[show description]";
        showButtonnElem.type = "button"; //cause the button is inside the form, and without this, it would cause the submission of the form
        showButtonnElem.className = "UserPagePermissionSectionButtons";

        const hideButtonElem = document.createElement('button');
        hideButtonElem.innerHTML = "[hide]";
        hideButtonElem.style.display = "none";
        hideButtonElem.type = "button";
        hideButtonElem.className = "UserPagePermissionSectionButtons";
        
        showButtonnElem.addEventListener('click', () => {
            descriptionElem.style.display = "block";
            showButtonnElem.style.display = "none";
            hideButtonElem.style.display = "block";
        });

        hideButtonElem.addEventListener('click', () => {
            descriptionElem.style.display = "none";
            showButtonnElem.style.display = "block";
            hideButtonElem.style.display = "none";
        });

        labelElem.appendChild(showButtonnElem);
        labelElem.appendChild(hideButtonElem);
        labelElem.appendChild(document.createElement("br"));
        labelElem.appendChild(descriptionElem);
        form.appendChild(inputElem);
        form.appendChild(labelElem);
    });
};

addEventListenerToButtons();
addOptions();