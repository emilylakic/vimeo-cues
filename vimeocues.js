/*Javascript program, Jan. 2019, Emily Lakic*/

//VARIABLES//

//cue
var text;
var cueTime;
var cueid;
var number = 0;

//player
var videoPlayer;
var vidDuration;

//comparing cue and player time
var currentcueTime; //current cue time
var cTime; //current time

//TRANSITION FROM HOMESCREEN TO VIDEO 

//FUNCTION: VIDEOPLAYBACK()
//Implement videoPlayer with onclick videoPlayback()
function videoPlayback() { 
    var div = document.createElement("div");
    div.id = "introVid";
    document.getElementById("videoWrapper").appendChild(div);
    var vidCode = document.getElementById("textStyle").value;
    var vidOptions = {id: videoCode};
    videoPlayer = new Vimeo.Player('introVid', vidOptions);
    document.getElementById("changeVideo").style.display = "none"; //to go from main to actual video
    document.getElementById("vidInterface").style.display = "block";
    videoPlayer.getDuration().then(function(duration) {vidDuration = duration;}).catch(function(error) {}); //getDuration provided w Vimeo Javascript sheet
    videoPlayer.on('play', function(data) {
        videoPlayer.getCurrentTime().then(function(seconds) { //getDuration and getCurrentTime fxn's of Javascript
            cTime = seconds;
        });
    videoPlayer.getCuePoints().then(function(cuePoints) {
            if (cuePoints[0] && cuePoints[0].time == 0 && cTime == 0) {
                document.getElementById("par").innerHTML = cuePoints[0].data.customKey;
                document.getElementById("par").style.display = "inline";
                document.getElementById("cueLink").style.display = "none";
            } else {
                document.getElementById("displayCue").style.display = "none";
            }
        });
    });
    videoPlayer.on('cuepoint', function(data) {
        if (isURL(data.data.customKey)) {
            document.getElementById("par").style.display = "none";
            document.getElementById("cueLink").innerHTML = data.data.customKey;
            document.getElementById("cueLink").href = data.data.customKey;
            document.getElementById("cueLink").style.display = "inline";
        } else {
            document.getElementById("cueLink").style.display = "none";
            document.getElementById("par").innerHTML = data.data.customKey;
            document.getElementById("par").style.display = "inline";
        }
        currentcueTime = data.time;
        document.getElementById("displayCue").style.display = "block";
    });
    videoPlayer.on('timeupdate', function(data) {
        videoPlayer.getCurrentTime().then(function(seconds) {
            cTime = seconds;
        });
        if (cTime > currentcueTime + 5) {
            document.getElementById("displayCue").style.display = "none";
        }
    });
}

function restartApp() {
    document.getElementById("changeVideo").style.display = "block";
    document.getElementById("vidInterface").style.display = "none";
    var toDelete = document.querySelectorAll(".cue-wrapper");
    for (var i = 0; i < toDelete.length; i++) {
        toDelete[i].parentNode.removeChild(toDelete[i]);
    }
    document.getElementById("introVid").remove();
    document.getElementById("displayCue").style.display = "none";
}

function addCue() {
    text = document.getElementById("inputText").value;
    cueTime = document.getElementById("inputTime").value;
    var cueTimeSplit = cueTime.split(':');
    var cueTimeInt = (+cueTimeSplit[0]) * 60 + (+cueTimeSplit[1]);
    if (validCue(cueTimeInt)) {
        createCue(text, cueTime);
        videoPlayer.addCuePoint(cueTimeInt, {
            customKey: text
        }).then(function(id) {
            console.log('cue point added');
            cueid = id;
            addRemoveButton();
        });
        document.getElementById("inputText").value = "";
        document.getElementById("inputTime").value = "";
    }
}

function validCue(cueTimeInt) {
    if (text == "") {
        var str = "Error: Missing Cue Text";
        var res = str.fontcolor("red");
        document.getElementById("errorMessage").innerHTML = res;
        return false;
    } else if (!(/^\d{2}:\d{2}$/.test(cueTime))){
        document.getElementById("errorMessage").innerHTML = "Time must be in mm:ss";
        return false;
    } else if (cueTimeInt < 0 || cueTimeInt > vidDuration) {
        document.getElementById("errorMessage").innerHTML = "Time must be greater than 0 or less than the duration of the video";
        return false;
    }
    document.getElementById("errorMessage").innerHTML = "";
    return true;
}

function createCue() {
    var div = document.createElement("div");
    div.className = "cueWrapper";
    div.id = number.toString();
    if (isURL(text)) {
        var cLink = document.createElement("a");
        cLink.className = "textBlock";
        cLink.innerHTML = text;
        cLink.href = text;
        cLink.target = "_blank";
        div.appendChild(cLink);
    } else {
        var cue = document.createElement("p");
        cue.className = "textBlock";
        cue.innerHTML = text;
        div.appendChild(cue);
    }
    var time = document.createElement("p");
    time.className = "timeBlock";
    time.innerHTML = cueTime;
    div.appendChild(time);
    document.getElementById("wrapper").appendChild(div);
}

function addRemoveButton() {
    var removeId = cueid;
    var divId = number.toString();
    var remove = document.createElement("div");
    remove.className = "deleteButton";
    remove.innerHTML = "x";
    remove.onclick = function() {
        removeCue(removeId);
        document.getElementById(divId).remove();
    };
    document.getElementById(divId).prepend(remove); //getElementbyId Vimeo Javascript
    number++;
}

function removeCue(removed) {
    videoPlayer.removeCuePoint(removed).then(function(id) { //removeCuePoint within Vimeo Javascript
        console.log('cue removed');
    });
}

//How to detect whether a string is in URL format using Javascript
function isUrl(s) {
   var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
   return regexp.test(s);
}
