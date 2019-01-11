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

//comparing cue and player time
var currentcueTime;
var time;

//TRANSITION FROM HOMESCREEN TO VIDEO 

//Implement videoPlayer with onclick videoPlayback()
function videoPlayback() { 
    var vid = document.createElement("vid");
    vid.id = "introVid";
    document.getElementById("videoWrapper").appendChild(vid);
    var vidCode = document.getElementById("code").value;
    var vidOptions = {id: videoCode};
    videoPlayer = new Vimeo.Player('introVid', vidOptions);
}


