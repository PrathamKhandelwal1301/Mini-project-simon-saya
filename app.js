var buttonColor = ["green" , "red" , "yellow" , "blue"];
var started = 0;
var gameSeq = [];
var userSeq = [];
var round = 0;

$(document).keypress(function() {
    if(!started){
    $("h1").html("Press A Key To Start");
    started = 1;
    gameSeq = [];
    nextSequence();
    }
})

function nextSequence(){
    userSeq = [];
    round++;
    $("h1").html("round "+ round);
    var random = Math.floor(Math.random()*4);
    var chosenColor = buttonColor[random];
    gameSeq.push(chosenColor);
    playAudio(chosenColor);
    blink(chosenColor);
}

function playAudio(chosenColor){
    var audio = new Audio("/sounds/" + chosenColor + ".mp3");
    audio.play();
}

function blink(chosenColor){
    $("#" + chosenColor).fadeIn(50).fadeOut(100).fadeIn(50);
}

$(".btn").click(function() {
    var clickedColor = $(this).attr("id");
    userSeq.push(clickedColor);
    playAudio(clickedColor);
    pressed(clickedColor);
    checkSeq(userSeq.length-1);
})

function checkSeq(index){
    if(gameSeq[index] === userSeq[index]){
        console.log("right");
        if(userSeq.length === gameSeq.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }

    else{
        fail();
    }
}

function fail(){
    gamestarted = 0;
    round = 0;
    $("h1").html("Game Over. Press Refresh To Restart");
    
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 300);
    playAudio("wrong");
}

function pressed(clickedColor){
    $("#" + clickedColor).addClass("pressed");
    setTimeout(() => {
        $("#" + clickedColor).removeClass("pressed");
    }, 300);
}