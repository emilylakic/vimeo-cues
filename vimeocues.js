/*Javascript program, Jan. 2019, Emily Lakic*/

//VARIABLES//

//cue
var text;
var cueTime;
var id;
var number = 0;

//player
var videoPlayer;
var duration;
var vidCode;
var vidOptions;
var vid;

//comparing cue and player time
var currentcueTime;
var time;

//TRANSITION FROM HOMESCREEN TO VIDEO 

//Implement videoPlayer with onclick videoPlayback()
function videoPlayback() { 
    document.createElement("vid");
    vid.id = "introVid";
    document.getElementById("videoWrapper").appendChild(vid);
    vidCode = document.getElementById("code").value;
    vidOptions = {id: videoCode};
    videoPlayer = new Vimeo.Player('introVid', vidOptions);
};
