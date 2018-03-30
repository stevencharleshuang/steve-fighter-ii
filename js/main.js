$( document ).ready(function() {
  console.log('jQuery Ready!');

// /////////////////////////////////////////////////////////////////////////////
// Landing Screen
// /////////////////////////////////////////////////////////////////////////////

/* Pseudo Code
* Event listener for Player Name Sumission | on(), textContent() |:
  hereinafter:
  Player 1 = p1
  Player 2 = p2
* On Submit:
  // preventDefault() submit button
  // Replace input with input name | css.() |: p1, p2
* On successful text replacement with Player names, set #start-btn visibility to
  visible | css.() |
* Start-btn on click, hide landing-screen, unhide fight-screen
*/
  // Player Name Storage
  let p1;
  let p2;
  // Player get Names
  // Target #player1-input and #player2-input
  let p1Input = $('#player1-input');
  let p2Input = $('#player2-input');
  // p1 Form Event Listener
  $('#p1-nameSubmit').click(function(event) {
    // Testing
    console.log("Handler for .submit() called.");
    // Prevent p1 Form Submission Action
    // event.preventDefault();
    // Get Name text
    p1 = document.getElementById('p1Name').value;
    // Remove p1 form, replace with name text
    $('#player1-input').replaceWith(`Player 1: <br/>${p1}`);
  });
  // p2 Form Event Listener
  $('#p2-nameSubmit').click(function(event) {
    console.log("Handler for .submit() called.");
    // Get Name text
    p2 = document.getElementById('p2Name').value;
    // // Prevent p2 Form Submission Action
    // event.preventDefault();
      // Remove p2 form, replace with name text
    $('#player2-input').replaceWith(`Player 2: <br/>${p2}`);
  });

  // Start Button
  $('#start-btn').on('click', function(){
    console.log('start!');
    $('.fight-screen').css('visibility', 'visible');
    $('.landing-screen').css('visibility', 'hidden');
    fight();
  });
// /////////////////////////////////////////////////////////////////////////////
// Fight Screen
// /////////////////////////////////////////////////////////////////////////////
/* Pseudo Code
* Fight Function
  // Declare Player 1 and Player 2 avatars (divs)
  // Declare P1 and P2 HP, init at 100
  // Write HP tracker function for P1, P2
  // **** Player Control Keybinding
  // Write function to bind keys to avatar motion
    // Declare Empty Obj for keys vari
      // Event Listener for Player Controls
        // Continue loop for player control keybinding
          // ref: https://stackoverflow.com/questions/7298507/move-element-with-keypress-multiple
          // if/else (!keys.hasOwnProperty(direction)) continue;
          // if (keycode) {$(P1).animate({dictate motion})}
            // P1 Keys (Left=(a)(65)
            // P1 Keys (Right=(d)(68)
            // P2 Keys (Left=(l)(76)
            // P2 Keys (Right=(')(222)
  // **** Fight Mechanics
  // ** Bypass Hit Detection Solution - Potential Issues: Promotes button mashing
    and ensuing bugs
    // Declare Empty Obj for keys vari
      // Event Listener for P1 Attacks
        // Continue loop for keybinding
          // ref: https://stackoverflow.com/questions/7298507/move-element-with-keypress-multiple
          // if/else (!keys.hasOwnProperty(attack)) continue;
          // P1 punch keycode = (e)(69)
          // if (keycode) {$(P2).HP.value decreases by 10}
          // if (keycode) toggle .p1punch div (anim)
          // pMVP? - if (keycode) toggle .p2hurt div (anim)
      // Event Listener for P2 Attacks
        // Continue loop for keybinding
          // ref: https://stackoverflow.com/questions/7298507/move-element-with-keypress-multiple
          // if/else (!keys.hasOwnProperty(attack)) continue;
          // P2 punch keycode = (o)(79)
            // if (keycode) {$(P1).HP.value decreases by 10}
            // if (keycode) toggle .p2punch div (anim)
            // pMVP? - if (keycode) toggle .p1hurt div (anim)
            */
  // Hit Detection Solution
  const fight = function () {
    // Declarations and avatar initializations
    let player1 = $('.player-1');
    let player2 = $('.player-2');
    player1.css({'left': '100px', 'background-color': 'blue'});
    player2.css({'right': '100px', 'background-color': 'green'});
    // /////////////////////////////////////////////////////////////////
    // Player Name Display
    // Name Displays
    if (p1!==undefined) {
      $('.player-1-name').text(`${p1}`);
    }
    else {
      $('.player-1-name').text(`Player 1`)
    }
    if (p2!==undefined) {
      $('.player-2-name').text(`${p2}`);
    }
    else {
      $('.player-2-name').text(`Player 2`)
    }

    // /////////////////////////////////////////////////////////////////
    // Motion Controls
    // https://stackoverflow.com/questions/7298507/move-element-with-keypress-multiple
    let keys = {};
    $(document).keydown(function(e) {
      keys[e.keyCode] = true;
    });
    $(document).keyup(function(e) {
        delete keys[e.keyCode];
    });
    function playerMoves() {
      let player1BCR = player1[0].getBoundingClientRect();
      let player2BCR = player2[0].getBoundingClientRect();
      for (let keyPressed in keys) {
        if (!keys.hasOwnProperty(keyPressed)) continue;
        // 'a' moves left
        else if (keyPressed == 65 && (player1BCR.x > 220)) {
            $(player1).animate({left: "-=5"}, 0);
            hitDetect();
        }
        // 'w' moves up
        // else if (keyPressed == 87) {
        //  $(player1).animate({top: "-=5"}, 0);
        // }
        // 'd' moves right
        else if (keyPressed == 68) {
            $(player1).animate({left: "+=5"}, 0);
            hitDetect();
        }
        // 's' moves down
        // else if (keyPressed == 83) {
        //  $(player1).animate({top: "+=5"}, 0);
        // }
        // 'l' moves left
        else if (keyPressed == 76) {
            $(player2).animate({right: "+=5"}, 0);
            hitDetect();
        }
        // 'p' moves up
        // else if (keyPressed == 80) {
            // $(player2).animate({top: "-=5"}, 0);
        // }
        // ''' moves right
        else if (keyPressed == 222 && (player2BCR.x < 880)) {
            $(player2).animate({right: "-=5"}, 0);
            hitDetect();
        }
        // ';' moves down
        // else if (keyPressed == 186) {
        //     $(player2).animate({top: "+=5"}, 0);
        // }

        // /////////////////////////////////////////////////////////////////////
        // Player attacks
        // Punch 'e'
        else if (keyPressed == 69) {
            // Increase div width
            $(player1).css('width', '225');
              if (hitDetect()===true) {
                $(player1).css('background-color', 'yellow')
                console.log('punch')
                p2Damage();
                checkWin();
              }
            // Return to original Div width
            $(document).keyup(function(){
              $(player1).css('width', '150')
            });
        }
        // Punch 'o'
        else if (keyPressed == 79) {
            // Increase div width
            $(player2).css('width', '225');
            if (hitDetect()===true) {
                $(player2).css('background-color', 'yellow')
                console.log('punch')
                p1Damage();
                checkWin();
              }
            // Return to original Div width
            $(document).keyup(function(){
              $(player2).css('width', '150')
            });
        }
      }
    }
    playerMoves();
    setInterval(playerMoves, 10);
    // /////////////////////////////////////////////////////////////////////////
    // Hit collision from scratch
    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    let hitDetect = function () {
      let player1BCR = player1[0].getBoundingClientRect();
      let player2BCR = player2[0].getBoundingClientRect();
      // console.log(player2BCR);
      if (player1BCR.x < player2BCR.x + player2BCR.width &&
      player1BCR.x + player1BCR.width > player2BCR.x &&
      player1BCR.y < player2BCR.y + player2BCR.height &&
      player1BCR.height + player1BCR.y > player2BCR.y) {
      //////////////////////////////////////////////////////////////////////////
      // Hit Detection Clauses
        // console.log('hit detected!');
        // Divs change color
        $(player1).css('background-color', 'red');
        $(player2).css('background-color', 'pink');
        ////////////////////////////////////////////////////////////////////////
        // Prevent Div Overlap
        // Divs pop back after hit
        $(player1).animate({left: '-=3'}, 0);
        $(player2).animate({right: '-=3'}, 0);
        return true;
      }
      // Non-Hit Clauses
      else {
        $(player1).css('background-color', 'blue');
        $(player2).css('background-color', 'green');
      }
      // console.log(player1BCR);
      // console.log(blueBCR)
    }
    // /////////////////////////////////////////////////////////////////////////
    // HP System
    // Target
    let p1HPSpan = $('#p1-hp-span');
    let p1HPVal = 50;
    p1HPSpan.html(p1HPVal);
    let p2HPSpan = $('#p2-hp-span');
    let p2HPVal = 50;
    p2HPSpan.html(p2HPVal);
  // *** Cheat Win (for testing and debugging)
    // Button - On click load .end-screen
    ////////////////////////////////////////////////////////////////////
    // Test Hit Button
    $('#hit-player1').on('click', function() {
      // $('.end-screen').css('visibility', 'visible');
      // $('.fight-screen').css('visibility', 'hidden');
      // HP Reduction
      p1HPVal -= 10;
      p1HPSpan.html(p1HPVal);
      checkWin();
    });
    $('#hit-player2').on('click', function() {
      // $('.end-screen').css('visibility', 'visible');
      // $('.fight-screen').css('visibility', 'hidden');
      // HP Reduction
      p2HPVal -= 10;
      p2HPSpan.html(p2HPVal);
      checkWin();
    });
    $('#cheat-btn').on('click', function() {
      $('.end-screen').css('visibility', 'visible');
      $('.fight-screen').css('visibility', 'hidden');
      // HP Reduction
      p2HPVal -= 10;
      p2HPSpan.html(p2HPVal);
      checkWin();
    });
    ////////////////////////////////////////////////////////////////////////////
    // Damage System
    let p1Damage = function () {
      p1HPVal -= 1;
      p1HPSpan.html(p1HPVal);
    }
    let p2Damage = function () {
      p2HPVal -= 1;
      p2HPSpan.html(p2HPVal);
    }
  // * Win-Case:
    // if Player 1 HP <= 0, Player 2 Wins
    // else if Player 2 HP <= 0, Player 1 Wins
    let winner
    let checkWin = function () {
      if (p2HPVal <= 0) {
        // alert('Player 1 wins!');
        $('.end-screen').css('visibility', 'visible');
        $('.fight-screen').css('visibility', 'hidden');
        return winner = p1;
        winnerDisplay();
      }
      else if (p1HPVal <= 0) {
        alert(`Player 2 wins!`);
        $('.end-screen').css('visibility', 'visible');
        $('.fight-screen').css('visibility', 'hidden');
        return winner = p2;
        winnerDisplay();
      }
    }
  }
// /////////////////////////////////////////////////////////////////////////////
// End Screen
// /////////////////////////////////////////////////////////////////////////////

/*
* Display winner's name, announcing victory in announcement Div
  // if/else to get name for victor
  // `${firstPlayerName} wins!` or `${secondPlayerName} wins!`

* Button displayed to restart fight
  // reCall .fight-screen
  // init fight();
*/
  function winnerDisplay () {
  $('#winner').text(`${winner} wins!`)
  // For clickable Model ONLY
  // *** Replay(for testing and debugging)
  // Button - On click load .end-screen
  }
  $('#replay-btn').on('click', function(){
    console.log('Fight start!');
    $('.end-screen').css('visibility', 'hidden');
    $('.fight-screen').css('visibility', 'visible');
    fight();
   });
  $('#landing-btn').on('click', function(){
    console.log('Fight start!');
    $('.end-screen').css('visibility', 'hidden');
    $('.landing-screen').css('visibility', 'visible');
   });

// /////////////////////////////////////////////////////////////////////////////
// Closes jQuery func
});
