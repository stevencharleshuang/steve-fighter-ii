$( document ).ready(function() {
  console.log('jQuery Ready!');
// /////////////////////////////////////////////////////////////////////////////
// Landing Screen
// /////////////////////////////////////////////////////////////////////////////
/* Pseudo Code
* Event listener for Player Name Sumission - on(), textContent()
  hereinafter:
  Player 1 = p1
  Player 2 = p2
* On Submit:
  // preventDefault() submit button
  // Replace input with input name - css.() p1, p2
* On successful text replacement with Player names, set #start-btn visibility to
  visible | css.() |
* Start-btn on click, hide landing-screen, unhide fight-screen
*/
  // Get Player Names
  // Player Name Storage
  let p1;
  let p2;
  // Target #player1-input and #player2-input
  let p1Input = $('#player1-input');
  let p2Input = $('#player2-input');
  // p1 Form Event Listener
  $('#p1-nameSubmit').click(function(event) {
    // Get Name text
    p1 = document.getElementById('p1Name').value;
    // Remove p1 form, replace with name text
    $('#player1-input').replaceWith(`Player 1: <br/>${p1}`);
  });
  // p2 Form Event Listener
  $('#p2-nameSubmit').click(function(event) {
    // Get Name text
    p2 = document.getElementById('p2Name').value;
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
  // **** Fight Mechanics */
  // Hit Detection Solution
  const fight = function () {
    // Declarations and avatar initializations
    let player1 = $('.player-1');
    let player2 = $('.player-2');
    player1.css({'left': '100px', 'background-color': 'blue',
      'width': '150px'});
    player2.css({'right': '100px', 'background-color': 'green',
      'width': '150px'});
  // /////////////////////////////////////////////////////////////////////////
  // HP System
  // Initialize HP values
    let p1HPVal = 50;
    let p2HPVal = 50;
    // Target HP Spans
    let p1HPSpan = $('#p1-hp-span');
    let p2HPSpan = $('#p2-hp-span');
    // Update HP Span Values
    p1HPSpan.html(p1HPVal);
    p2HPSpan.html(p2HPVal);
  // /////////////////////////////////////////////////////////////////
  // Player Name Display
  // Name Displays
    if (p1!==undefined) {
      $('.player-1-name').text(`${p1}`);
    }
    else {
      p1 = 'Player 1';
      $('.player-1-name').text(`Player 1`);
    }
    if (p2!==undefined) {
      $('.player-2-name').text(`${p2}`);
    }
    else {
      p2 = 'Player 2';
      $('.player-2-name').text(`Player 2`);
    }
  // /////////////////////////////////////////////////////////////////
  // Player Controls
  // https://stackoverflow.com/questions/7298507/move-element-with-keypress-multiple
    let keys = {};
    $(document).on('keydown', function(e) {
      keys[e.keyCode] = true;
    });
    $(document).on('keyup', function(e) {
        delete keys[e.keyCode];
    });
    let playerMoves = function () {
      let player1BCR = player1[0].getBoundingClientRect();
      let arenaLeftWall = $('.battle-arena')[0].getBoundingClientRect()
      let player2BCR = player2[0].getBoundingClientRect();
      let arenaRightWall = $('.battle-arena')[0].getBoundingClientRect()
      for (let keyPressed in keys) {
        if (!keys.hasOwnProperty(keyPressed)) continue;
    ////////////////////////////////////////////////////////////////////////
    // Player 1 Controls
        // 'a' moves left
        else if (keyPressed == 65 && (p1HPVal > 0 || p2HPVal > 0) && (player1BCR.left > arenaLeftWall.left)) {
            $(player1).animate({left: "-=5"}, 0);
            hitDetect();
        }
        // 'w' moves up
        // else if (keyPressed == 87) {
        //  $(player1).animate({top: "-=5"}, 0);
        // }
        // 'd' moves right
        else if (keyPressed == 68 && (p1HPVal > 0 || p2HPVal > 0) && (player2BCR.right <= arenaRightWall.right)) {
            $(player1).animate({left: "+=5"}, 0);
            hitDetect();
        }
        // 's' moves down
        // else if (keyPressed == 83) {
        //  $(player1).animate({top: "+=5"}, 0);
        // }
    ////////////////////////////////////////////////////////////////////////
    // Player 2 Controls
        // 'l' moves left
        else if (keyPressed == 76 && (p1HPVal > 0 || p2HPVal > 0) && (player1BCR.left > arenaLeftWall.left)) {
            $(player2).animate({right: "+=5"}, 0);
            hitDetect();
        }
        // 'p' moves up
        // else if (keyPressed == 80) {
            // $(player2).animate({top: "-=5"}, 0);
        // }
        // ''' moves right
        else if (keyPressed == 222 && (p1HPVal > 0 || p2HPVal > 0) && (player2BCR.right < arenaRightWall.right)) {
            $(player2).animate({right: "-=5"}, 0);
            hitDetect();
        }
        // ';' moves down
        // else if (keyPressed == 186) {
        //     $(player2).animate({top: "+=5"}, 0);
        // }
      
        }
      }
    
    // /////////////////////////////////////////////////////////////////////
    // Player attacks
    let playerAttacks = function () {
        $(window).on('keydown', function (e) {
        // Punch 'e'
        if (e.keyCode == 69) {
          // Increase div width
          $(player1).css('width', '225');
            if (hitDetect()===true) {
              $(player1).css('background-color', 'yellow');
              // console.log('punch');
              p2Damage();
              checkWin();
            }
          // Return to original Div width
          $(document).keyup(function(){
            $(player1).css('width', '150');
          });
        }
        // Punch 'o'
        else if (e.keyCode == 79) {
          // Increase div width
          $(player2).css('width', '225');
          if (hitDetect()===true) {
              $(player2).css('background-color', 'yellow');
              // console.log('punch');
              p1Damage();
              checkWin();
            }
          // Return to original Div width
          $(document).keyup(function(){
            $(player2).css('width', '150');
          });
        }
      });
    } 
    playerMoves();
    playerAttacks();
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
  ////////////////////////////////////////////////////////////////////
  // Test Hit Buttons
    // P1 Hit P2 Button
    $('#hit-player2').on('click', function() {
      // $('.end-screen').css('visibility', 'visible');
      // $('.fight-screen').css('visibility', 'hidden');
      // HP Reduction
      p2HPVal -= 10;
      p2HPSpan.html(p2HPVal);
      checkWin();
    });
    // P2 Hit P1 Button
    $('#hit-player1').on('click', function() {
      // $('.end-screen').css('visibility', 'visible');
      // $('.fight-screen').css('visibility', 'hidden');
      // console.log(p1HPVal)
      // HP Reduction
      p1HPVal -= 10;
      p1HPSpan.html(p1HPVal);
      checkWin();
    });
    // *** Cheat Win (for testing and debugging)
    $('#cheat-btn').on('click', function() {
      $('.end-screen').css('visibility', 'visible');
      $('.fight-screen').css('visibility', 'hidden');
      // HP Reduction
      p2HPVal -= 50;
      p2HPSpan.html(p2HPVal);
      checkWin();
    });
    ////////////////////////////////////////////////////////////////////////////
    // Damage System
    let p1Damage = function () {
      // console.log(p1HPVal)
      p1HPVal -= 5;
      p1HPSpan.html(p1HPVal);
    }
    let p2Damage = function () {
      p2HPVal -= 5;
      p2HPSpan.html(p2HPVal);
    }
    p1Damage();
    p2Damage();
  //////////////////////////////////////////////////////////////////////////////
  // * Win-Case:
    // if Player 1 HP <= 0, Player 2 Wins
    // else if Player 2 HP <= 0, Player 1 Wins
    let checkWin = function () {
      // Player 1 Wins
      if (p2HPVal <= 0) {
        // console.log('player 1 wins')
        playerMoves();
        
        playerAttacks();
        p1Damage();
        p2Damage();
        p1HPVal = 50;
        p2HPVal = 50;
        $('#winnerBox').text(`${p1} Wins!`);
        $('.end-screen').css('visibility', 'visible');
        $('.fight-screen').css('visibility', 'hidden');
        $(player1).css('width', '150');
        $(player2).css('width', '150');
      }
      // Player 2 Wins
      else if (p1HPVal <= 0) {
        // console.log('player 2 wins')
        $('#winnerBox').text(`${p2} Wins!`);
        playerMoves();
        
        playerAttacks();
        p1Damage();
        p2Damage();
        p1HPVal = 50;
        p2HPVal = 50;
        $('.end-screen').css('visibility', 'visible');
        $('.fight-screen').css('visibility', 'hidden');
        $(player1).css('width', '150');
        $(player2).css('width', '150');
      }
      // Draw Clause
      // else if (p1HPVal > 0 && p2HPVal > 0) {
      // $('#winnerBox').text(`It's a draw`);
      // $('.end-screen').css('visibility', 'visible');
      // $('.fight-screen').css('visibility', 'hidden');
      // }
    }
    // checkWin();
  }
// /////////////////////////////////////////////////////////////////////////////
// End Screen
// /////////////////////////////////////////////////////////////////////////////
/* Pseudo Code
* Display winner's name, announcing victory in announcement Div
  // if/else to get name for victor
  // `${firstPlayerName} wins!` or `${secondPlayerName} wins!`

* Button displayed to restart fight
  // reCall .fight-screen
  // init fight();
*/
  // For clickable Model ONLY
  // *** Replay(for testing and debugging)
  // Button click goes to Fight Screen
  $('#replay-btn').on('click', function(){
    $('.end-screen').css('visibility', 'hidden');
    $('.fight-screen').css('visibility', 'visible');
    fight();
   });
  // Button click goes to Landing Screen
  $('#landing-btn').on('click', function(){
    $('.end-screen').css('visibility', 'hidden');
    $('.landing-screen').css('visibility', 'visible');
   });
////////////////////////////////////////////////////////////////////////////////
// Closes jQuery func
});
