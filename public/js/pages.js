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
    currentPage = window.sessionStorage.getItem('currentPage');

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