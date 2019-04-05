var audio = document.getElementById("audio");

audio.addEventListener('play', function() {
    document.body.style.backgroundColor = "black";
});

audio.addEventListener('pause', function() {
    document.body.style.backgroundColor = "red";
});	
        
function showlyrics(callback) {
    var xmlhttp = new XMLHttpRequest(); 
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          callback(xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET", "lyrics.txt", true);
    xmlhttp.send();
}

function callback(data) {
    lyrics =  data.split('\n');
    console.log(lyrics);
}
    
function sToTime(t) {
    return padZero(parseInt((t / (60)) % 60)) + ":" + 
        padZero(parseInt((t) % 60));
}
function padZero(v) {
    return (v < 10) ? "0" + v : v;
}

showlyrics(callback);
 

var precedent='';
var aud = document.getElementById('audio');

aud.ontimeupdate = function() {
    myFunction()
};

function myFunction() {
    for(var i = 0;i < lyrics.length; i++) {
        if(sToTime((aud.currentTime)) == lyrics[i].substr(1,5)) {
            document.getElementById('lyrics').innerHTML=lyrics[i].substr(10);
            precedent=lyrics[i].substr(10);
            setTimeout(function(){
                document.getElementById('lyrics').innerHTML='';
            },6000);    
        }
    }
} 