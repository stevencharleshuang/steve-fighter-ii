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
  // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  let player1 = $('.player-1');
  let player2 = $('.player-2');
  // Motion Controls
  // https://stackoverflow.com/questions/7298507/move-element-with-keypress-multiple
  let keys  = {}

  $(document).keydown(function(e) {
    keys[e.keyCode] = true;
  });

  $(document).keyup(function(e) {
      delete keys[e.keyCode];
  });
    function movePlayer() {
      for (let direction in keys) {
          if (!keys.hasOwnProperty(direction)) continue;
          // 'a' moves left
          else if (direction == 65) {
              $(player1).animate({left: "-=5"}, 0);
              hitDetect();
          }
          // 'w' moves up
          // else if (direction == 87) {
          //  $(player1).animate({top: "-=5"}, 0);
          // }
          // 'd' moves right
          else if (direction == 68) {
              $(player1).animate({left: "+=5"}, 0);
              hitDetect();
          }
          // 's' moves down
          // else if (direction == 83) {
          //  $(player1).animate({top: "+=5"}, 0);
          // }
          // 'l' moves left
          else if (direction == 76) {
              $(player2).animate({left: "-=5"}, 0);
              hitDetect();
          }
          // 'p' moves up
          // else if (direction == 80) {
              // $(player2).animate({top: "-=5"}, 0);
          // }
          // ''' moves right
          else if (direction == 222) {
              $(player2).animate({left: "+=5"}, 0);
              hitDetect();
          }
          // ';' moves down
          // else if (direction == 186) {
          //     $(player2).animate({top: "+=5"}, 0);
          // }
      }
  }
  movePlayer();
  setInterval(movePlayer, 10);
  /////////////////////////////
  // Hit collision from scratch
  let hitDetect = function () {
    let player1BCR = player1[0].getBoundingClientRect();
    let player2BCR = player2[0].getBoundingClientRect();
    // console.log(player2BCR);
      if (player1BCR.x < player2BCR.x + player2BCR.width &&
      player1BCR.x + player1BCR.width > player2BCR.x &&
      player1BCR.y < player2BCR.y + player2BCR.height &&
      player1BCR.height + player1BCR.y > player2BCR.y) {
      // Hit Detection Clauses
        console.log('hit detected!');
        // Divs change color
        player1.css('background-color', 'red')
        player2.css('background-color', 'pink')
        // Divs pop back after hit
        $(player1).animate({left: "-=5"}, 0);
        $(player2).animate({left: "+=5"}, 0);
      }
      // Non-Hit Clauses
      else {
        player1.css('background-color', 'blue')
        player2.css('background-color', 'green')
      }
    // console.log(player1BCR);
    // console.log(blueBCR)
  }
// * Win-Case:
  // if Player 1 HP <= 0, Player 2 Wins
  // else if Player 2 HP <= 0, Player 1 Wins
// * Call fight();

  // *** Cheat Win (for testing and debugging)
    // Button - On click load .end-screen
    $('#cheat-btn').on('click', function(){
      console.log('Fight start!');
      $('.end-screen').css('visibility', 'visible');
      $('.fight-screen').css('visibility', 'hidden');
     });

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
    // For clickable Model ONLY
    // *** Replay(for testing and debugging)
    // Button - On click load .end-screen
    $('#replay-btn').on('click', function(){
      console.log('Fight start!');
      $('.end-screen').css('visibility', 'hidden');
      $('.fight-screen').css('visibility', 'visible');
     });
    $('#landing-btn').on('click', function(){
      console.log('Fight start!');
      $('.end-screen').css('visibility', 'hidden');
      $('.landing-screen').css('visibility', 'visible');
     });

// /////////////////////////////////////////////////////////////////////////////
// Closes jQuery func
});
