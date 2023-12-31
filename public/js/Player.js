export default class Player{
    static PERMISSIONS = {
        "ugc-image-upload": {
            description: "Upload images to Spotify on your behalf.",
            allowed: false,
        },
        "user-read-playback-state": {
            description: "Read your currently playing content and Spotify Connect devices information.",
            allowed: false,
        },
        "user-modify-playback-state": {
            description: "Control playback on your Spotify clients and Spotify Connect devices.",
            allowed: false,
        },
        "user-read-currently-playing": {
            description: "Read your currently playing content.",
            allowed: false,
        },
        "app-remote-control": {
            description: "Communicate with the Spotify app on your device.",
            allowed: false,
        },
        "streaming": {
            description: "Play content and control playback on your other devices.",
            allowed: false,
        },
        "playlist-read-private": {
            description: "Access your private playlists.",
            allowed: false,
        },
        "playlist-read-collaborative": {
            description: "Access your collaborative playlists.",
            allowed: false,
        },
        "playlist-modify-private": {
            description: "Manage your private playlists.",
            allowed: false,
        },
        "playlist-modify-public": {
            description: "Manage your public playlists.",
            allowed: false,
        },
        "user-follow-modify": {
            description: "Manage who you are following.",
            allowed: false,
        },
        "user-follow-read": {
            description: "Access your followers and who you are following.",
            allowed: false,
        },
        "user-read-playback-position": {
            description: "Read your position in content you have played.",
            allowed: false,
        },
        "user-top-read": {
            description: "Read your top artists and content.",
            allowed: false,
        },
        "user-read-recently-played": {
            description: "Access your recently played items.",
            allowed: false,
        },
        "user-library-modify": {
            description: "Manage your saved content.",
            allowed: false,
        },
        "user-library-read": {
            description: "Access your saved content.",
            allowed: false,
        },
        "user-read-email": {
            description: "	Get your real email address.",
            allowed: false,
        },
        "user-read-private": {
            description: "	Access your subscription details.",
            allowed: false,
        }        
    };

    /**
     * 
     * @param {String} allowedPerms The allowed permissions agreed by the user
     */
    static getPermissions(allowedPerms){
        if(!allowedPerms) allowedPerms = "user-read-private user-read-email";
        
        Array.from(allowedPerms.split(" ")).forEach((elem) => {
            this.PERMISSIONS[elem].allowed = true;
        });
    }
}