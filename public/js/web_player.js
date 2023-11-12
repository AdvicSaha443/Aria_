function checkIfLogged(){
    if(window.localStorage.getItem('access_token') != undefined){
        
    }else{
        alert("You aren't logged in!");
        window.location.replace("http://localhost:3000/login");
    }
}