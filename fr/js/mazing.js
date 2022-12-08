
// Original JavaScript code by Chirp Internet: chirpinternet.eu
// Please acknowledge use of this code by including this header.


    var track = document.getElementById('track');

    var controlBtn = document.getElementById('play-pause');

    function playPause() {
      if (track.paused) {
        track.play();
        //controlBtn.textContent = "Pause";
        controlBtn.className = "pause";
        document.getElementById("play-pause").style.opacity = "1";
        document.getElementById("player-onoff").innerHTML = "marche";
        //document.getElementById("musicnote").style.animation = "updown 0.8s alternate infinite";
      } else {
        track.pause();
        //controlBtn.textContent = "Play";
        controlBtn.className = "play";
        document.getElementById("play-pause").style.opacity = "0.3";
        document.getElementById("player-onoff").innerHTML = "arrêt";
        document.getElementById("musicnote").style.animation = "none";
      }
    }

    controlBtn.addEventListener("click", playPause);
    track.addEventListener("ended", function () {
      controlBtn.className = "play";
    });



    function startGame() {
      document.getElementById("gamestart").style.display = "none";
      document.getElementById("play-pause").style.opacity = "1";
      //document.getElementById("musicnote").style.animation = "updown 0.8s alternate infinite";
      document.getElementById("player-onoff").innerHTML = "marche";
    }



    function playMusic() {
      var audio = document.getElementById("track");
      audio.play();
    }


    function stopMusic (){
      var audio = document.getElementById("track");
      audio.pause();
    }
 

function Position(x, y) {
    this.x = x;
    this.y = y;
  }
  
  Position.prototype.toString = function() {
    return this.x + ":" + this.y;
  };
  
  function Mazing(id) {
  
    // bind to HTML element
    this.mazeContainer = document.getElementById(id);
  
    this.mazeScore = document.createElement("div");
    this.mazeScore.id = "maze_score";

    this.mazeCounter = document.createElement("div");
    this.mazeCounter.id = "scorecounter";

   // this.mazePointUp = document.createElement("div");
    //this.mazePointUp.id = "pointup";
  
    this.mazeMessage = document.createElement("div");
    this.mazeMessage.id = "maze_message";
  
    this.heroScore = this.mazeContainer.getAttribute("data-steps") - 2;
  
    this.maze = [];
    this.heroPos = {};
    this.heroHasKey = true;
    this.childMode = false;
  
    this.utter = null;
  
    for(i=0; i < this.mazeContainer.children.length; i++) {
      for(j=0; j < this.mazeContainer.children[i].children.length; j++) {
        var el =  this.mazeContainer.children[i].children[j];
        this.maze[new Position(i, j)] = el;
        if(el.classList.contains("entrance")) {
          // place hero at entrance
          this.heroPos = new Position(i, j);
          this.maze[this.heroPos].classList.add("hero");
        }
      }
    }
  
    var mazeOutputDiv = document.createElement("div");
    mazeOutputDiv.id = "maze_output";
  
    //mazeOutputDiv.appendChild(this.mazeScore);
    mazeOutputDiv.appendChild(this.mazeMessage);
 
    this.setMessage("");
  
    this.mazeContainer.insertAdjacentElement("afterend", mazeOutputDiv);

    var mazeScoreDiv = document.createElement("div");
    mazeScoreDiv.id ="maze_scoreboard";

 
    mazeScoreDiv.appendChild(this.mazeScore);
    mazeScoreDiv.appendChild(this.mazeCounter);
   // mazeScoreDiv.appendChild(this.mazePointUp);

this.mazeCounter.appendChild(this.mazeScore);

    this.setMessage("");
  
    this.mazeContainer.insertAdjacentElement("afterend", mazeScoreDiv);
  
    // activate control keys
    this.keyPressHandler = this.mazeKeyPressHandler.bind(this);
    document.addEventListener("keydown", this.keyPressHandler, false);
  };

  
  Mazing.prototype.enableSpeech = function() {
    this.utter = new SpeechSynthesisUtterance()
    this.setMessage(this.mazeMessage.innerText);
  };
  
  Mazing.prototype.setMessage = function(text) {
    this.mazeMessage.innerHTML = text;
      this.mazeScore.innerHTML = this.heroScore;
   if(this.utter) {
      this.utter.text = text;
     window.speechSynthesis.cancel();
    window.speechSynthesis.speak(this.utter);
   }
  };


  Mazing.prototype.heroTakeCharger = function() {
    this.maze[this.heroPos].classList.remove("evcharger");
    this.heroScore += 10;
    this.setMessage("Vous avez récolté la borne de recharge !");
    var audio = new Audio('gain.mp3');
    audio.loop = false;
    audio.play(); 
  };

  Mazing.prototype.heroTakeThermo = function() {
    this.maze[this.heroPos].classList.remove("thermo");
    this.heroScore += 10;
    this.setMessage("Vous avez récolté le thermostat intelligent !");
    var audio = new Audio('gain.mp3');
    audio.loop = false;
    audio.play(); 
  }
;

Mazing.prototype.heroTakeSolar = function() {
  this.maze[this.heroPos].classList.remove("solar");
  this.heroScore += 10;
  this.setMessage("Vous avez récolté le panneau solaire !");
  var audio = new Audio('gain.mp3');
    audio.loop = false;
    audio.play(); 
}
;

Mazing.prototype.heroTakeBio = function() {
  this.maze[this.heroPos].classList.remove("bioenergy");
  this.heroScore += 10;
  this.setMessage("Vous avez récolté la bioénergie !");
  var audio = new Audio('gain.mp3');
    audio.loop = false;
    audio.play(); 
}
;

Mazing.prototype.heroTakeHeat = function() {
  this.maze[this.heroPos].classList.remove("heatpump");
  this.heroScore += 10;
  this.setMessage("Vous avez récolté la thermopompe !");
  var audio = new Audio('gain.mp3');
    audio.loop = false;
    audio.play(); 
}
;

  Mazing.prototype.heroTakeKey = function() {
    this.maze[this.heroPos].classList.remove("sweater");
    this.heroHasKey = true;
    this.heroScore += 10;
    this.mazeScore.classList.add("has-key");
    this.setMessage("Vous avez récolté le chandail des Fêtes Dunsky !");
    var audio = new Audio('gain.mp3');
    audio.loop = false;
    audio.play(); 
  };
  
  Mazing.prototype.gameOver = function(text) {
    // de-activate control keys
    document.removeEventListener("keydown", this.keyPressHandler, false);
    this.setMessage(text);
    this.mazeContainer.classList.add("finished");
    document.body.innerHTML = document.body.innerHTML.replace('finalscore', this.heroScore);
    document.getElementById("gameover").style.display = "flex";
    stopMusic();
    document.getElementById("player-onoff").innerHTML = "off";
    document.getElementById("musicnote").style.animation = "none";
    var audio = new Audio('win.mp3');
    audio.loop = false;
    audio.play();

  };
  
  Mazing.prototype.heroWins = function() {
    this.mazeScore.classList.remove("has-key");
    this.maze[this.heroPos].classList.remove("door");
    this.heroScore += 0;
    this.gameOver("");
  };
  
  Mazing.prototype.tryMoveHero = function(pos) {
  
    if("object" !== typeof this.maze[pos]) {
      return;
    }
  
    var nextStep = this.maze[pos].className;
  
    // before moving
    if(nextStep.match(/sentinel/)) {
      this.heroScore = Math.max(this.heroScore - 5, 0);
      if(!this.childMode && this.heroScore <= 0) {
        this.gameOver("sorry, you didn't make it");
      } else {
        this.setMessage("ow, that hurt!");
      }
      return;
    }
    if(nextStep.match(/wall/)) {
      return;
    }
    if(nextStep.match(/exit/)) {
      if(this.heroHasKey) {
        this.heroWins();
      } else {
        this.setMessage("");
        return;
      }
    }
  
    // move hero one step
    this.maze[this.heroPos].classList.remove("hero");
    this.maze[pos].classList.add("hero");
    this.heroPos = pos;
    //this.mazePointUp.style.visibility = "hidden";
    //this.mazePointUp.style.transition = "2s ease";
  
    // after moving
    if(nextStep.match(/nubbin/)) {
      this.heroTakeTreasure();
      return;
    }
    if(nextStep.match(/evcharger/)) {
      this.heroTakeCharger();
      //this.mazePointUp.style.visibility = "visible";
      //this.mazePointUp.style.transition = "2s ease";
      return;
    }
    if(nextStep.match(/thermo/)) {
      this.heroTakeThermo();
      return;
    }
    if(nextStep.match(/solar/)) {
      this.heroTakeSolar();
      return;
    }
    if(nextStep.match(/heatpump/)) {
      this.heroTakeHeat();
      return;
    }
    if(nextStep.match(/bioenergy/)) {
      this.heroTakeBio();
      return;
    }
    if(nextStep.match(/sweater/)) {
      this.heroTakeKey();
      return;
    }
    if(nextStep.match(/exit/)) {
      return;
    }
    if(this.heroScore >= 1) {
      if(!this.childMode) {
        this.heroScore;
      }
      if(!this.childMode && (this.heroScore <= 0)) {
        this.gameOver("sorry, you didn't make it");
      } else {
        this.setMessage("");
      }
    }
  };
  
  Mazing.prototype.mazeKeyPressHandler = function(e) {
    var tryPos = new Position(this.heroPos.x, this.heroPos.y);
    switch(e.keyCode)
    {
      case 37: // left
        this.mazeContainer.classList.remove("face-right");
        tryPos.y--;
        break;
  
      case 38: // up
        tryPos.x--;
        break;
  
      case 39: // right
        this.mazeContainer.classList.add("face-right");
        tryPos.y++;
        break;
  
      case 40: // down
        tryPos.x++;
        break;
  
      default:
        return;
  
    }
    this.tryMoveHero(tryPos);
    e.preventDefault();
  };
  
  Mazing.prototype.setChildMode = function() {
    this.childMode = true;
    this.heroScore = 0;
    this.setMessage("collect all the treasure");
  };