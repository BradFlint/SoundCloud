
function JukeBox(){
  this.playList = null;
  _this = this;
  this.currentSong = null;

  SC.initialize({
    client_id: 'f665fc458615b821cdf1a26b6d1657f6'
  });
  
  SC.get("/tracks",{     
    q: "sun"
  }).then(function(response) {
    // things to do after the tracks load...     
    console.log( response ); 
    _this.playList = response; 
    _this.currentStream = SC.stream( '/tracks/' + _this.playList[0].id);
    _this.currentSong = _this.playList[0];
  });
  
// Play a track off of SoundCloud based on its track ID

  this.play = function(){
   _this.currentStream.then(function(player){
      console.log(player);
      player.play();
    });
  };

  // Pause the currently playing track

  this.pause= function(){
    _this.currentStream.then(function(player){
      player.pause();
    });
  };

  
// Display the current track information:

// Artist name with link to his/her profile page
// Title with link to track's page
// Description, genre and release date 
// Artwork

  this.info = function(){


    $("#artist").html('<a target="_blank" href="' +_this.currentSong.user.permalink_url + '">' + _this.currentSong.user.username + '</a>');
    $("#title").html('<a target="_blank" href="' + _this.currentSong.permalink_url + '">' + _this.currentSong.title + '</a>');
    $("#genre").html(_this.currentSong.genre);
    $("#year-released").html(_this.currentSong.created_at);
    $("#description").html(_this.currentSong.description);
    $("#poster").attr("src", _this.currentSong.artwork_url);
  }
}; // end of jukebox function

$(document).ready(function(){
    var juke = new JukeBox();
    $("#play").click(function(){
      juke.play();
      juke.info();
    });
    $("#pause").click(function(){
      juke.pause();
    });
  });





