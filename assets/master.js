$(function () {
  var currentTurn = "X";
  var divs = [
    "#one",
    "#two",
    "#three",
    "#four",
    "#five",
    "#six",
    "#seven",
    "#eight",
    "#nine",
  ];
  var gameComplete = false;
  var clickAudio = new Audio(
    "https://docs.google.com/uc?export=download&id=1PVt3NXAbMkAgpl0oRx4IXTogbxqHTp1-"
  );
  var victoryAudio = new Audio(
    "https://docs.google.com/uc?export=download&id=14UWI-Z7SIpHWZhfebKQubJ537FbcTpwM"
  );

  var robotMode = localStorage.getItem("robotMode");

  if (robotMode === "yes") {
    $("#robot").prop("checked", true);
  } else if (robotMode === "no") {
    $("#robot").prop("checked", false);
  }

  $("#robot").change(function () {
    if ($("#robot").is(":checked")) {
      localStorage.setItem("robotMode", "yes");
      robotMode = "yes";
    } else {
      localStorage.setItem("robotMode", "no");
      robotMode = "no";
    }
    console.log(robotMode);
  });

  $("#xoContainer > div").click(function () {
    var divVal = $(this).val();
    if (divVal !== "X" && divVal !== "O") {
      if (!gameComplete) {
        var div = $(this).attr("value");
        play(div);
        if (robotMode === "yes") {
          robot();
        }
      }
    }
  });

  function robot() {
    if (!gameComplete) {
      var randomDiv = divs[Math.floor(Math.random() * divs.length)];
      play(randomDiv);
    }
  }

  function play(value) {
    var div = $(value);
    if (div.val() === "X" || div.val() === "O") {
      console.log("div is already used.");
    } else {
      div.append(currentTurn);
      div.val(currentTurn);

      var newDivs = divs.filter((value) => value !== div.attr("value"));
      divs = newDivs;

      if (currentTurn === "X") {
        currentTurn = "O";
        $(".playingStatus").toggleClass("myHide");
      } else {
        currentTurn = "X";
        $(".playingStatus").toggleClass("myHide");
      }
      clickAudio.play();
      checkGameStatus();
    }
  }

  function checkGameStatus() {
    var divOne = $("#one").val();
    var divTwo = $("#two").val();
    var divThree = $("#three").val();
    var divFour = $("#four").val();
    var divFive = $("#five").val();
    var divSix = $("#six").val();
    var divSeven = $("#seven").val();
    var divEight = $("#eight").val();
    var divNine = $("#nine").val();
    if (
      (divOne === "X" && divTwo === "X" && divThree === "X") ||
      (divOne === "X" && divFive === "X" && divNine === "X") ||
      (divOne === "X" && divFour === "X" && divSeven === "X") ||
      (divTwo === "X" && divFive === "X" && divEight === "X") ||
      (divThree === "X" && divSix === "X" && divNine === "X") ||
      (divThree === "X" && divFive === "X" && divSeven === "X") ||
      (divOne === "X" && divFive === "X" && divNine === "X") ||
      (divFour === "X" && divFive === "X" && divSix === "X") ||
      (divSeven === "X" && divEight === "X" && divNine === "X") ||
      (divOne === "O" && divTwo === "O" && divThree === "O") ||
      (divOne === "O" && divFive === "O" && divNine === "O") ||
      (divOne === "O" && divFour === "O" && divSeven === "O") ||
      (divTwo === "O" && divFive === "O" && divEight === "O") ||
      (divThree === "O" && divSix === "O" && divNine === "O") ||
      (divThree === "O" && divFive === "O" && divSeven === "O") ||
      (divOne === "O" && divFive === "O" && divNine === "O") ||
      (divFour === "O" && divFive === "O" && divSix === "O") ||
      (divSeven === "O" && divEight === "O" && divNine === "O")
    ) {
      if (currentTurn === "X") {
        if (robotMode === "yes") {
          $("#victoryNoticeContainer h2").append("You are the robot -_-");
        } else {
          $("#victoryNoticeContainer h2").append("Victory, O has won!");
        }
        victoryAudio.play();
      } else {
        if (robotMode === "yes") {
          $("#victoryNoticeContainer h2").append("Victory, you have won!");
        } else {
          $("#victoryNoticeContainer h2").append("Victory, X has won!");
        }
        victoryAudio.play();
      }
      $("#victoryNoticeContainer").toggleClass("myHide");
      $("#playingStatusContainer").toggleClass("myHide");
      gameComplete = true;
    } else if (divs.length <= 0) {
      $("#victoryNoticeContainer h2").append("Draw!");
      $("#victoryNoticeContainer").toggleClass("myHide");
      $("#playingStatusContainer").toggleClass("myHide");
      gameComplete = true;
    } else {
      gameComplete = false;
    }
  }
});
