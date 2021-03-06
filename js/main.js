/* eslint-env browser, jquery */
$(document).ready(function() {
  console.log('jQuery Ready!');
  // ///////////////////////////////////////////////////////////////////////////
  // Landing Screen
  // ///////////////////////////////////////////////////////////////////////////
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
  //////////////////////////////////////////////////////////////////////////////
  // Get Player Names
  // Player Name Storage
  let p1Name;
  let p2Name;
  // Target #player1-input and #player2-input
  // let p1Input = $('#player1-input');
  // let p2Input = $('#player2-input');
  $('#start-btn').hover(function() {
    // console.log('hover');
    $('body').css({
      'background-image': 'url("images/world-on-fire.gif")',
      'background-size': 'cover'
    });
  }, function() {
    $('body').css('background-image', '')
  });
  // p1 Form Event Listener
  $('#p1-nameSubmit').click(function() {
    // Get Name text
    p1Name = $('#player1-name').val();
    // Remove p1 form, replace with name text
    $('.player1-form').replaceWith(
      `<div class="player1-form">Player 1: <br/>${p1Name}</div>`);
  });
  // p2 Form Event Listener
  $('#p2-nameSubmit').click(function() {
    // Get Name text
    p2Name = $('#player2-name').val();

    // Remove p1 form, replace with name text
    $('.player2-form').replaceWith(
      `<div class="player2-form">Player 2: <br/>${p2Name}</div>`);
    event.preventDefault();
  });
  // P1 Name Reset
  $('#player1-reset').on('click', function(event) {
    $('.player1-form').replaceWith(
      `<!-- Begin P1 Form -->
              <div class="player1-form">
                <form id="player1-input">
                  Player 1 Name:
                  <input type="text" id="player1-name" placeholder="Name"><br><br>
                  <button id="p1-nameSubmit">Kick Ass!</button>
                </form>
              <!-- End P1 Form -->`
    );
    event.preventDefault();
  });
  // P2 Name Reset
  $('#player2-reset').on('click', function(event) {
    $('.player2-form').replaceWith(
      `<!-- Begin P2 Form -->
              <div class="player2-form">
                <form id="player2-input">
                  Player 2 Name:
                  <input type="text" id="player2-name" placeholder="Name"><br><br>
                  <button id="p2-nameSubmit">Kick Ass!</button>
                </form>
              <!-- End P2 Form -->`
    );
    event.preventDefault();
  });
  // Start Button
  $('#start-btn').on('click', function() {
    // console.log('start!');
    $('.fight-screen').css('visibility', 'visible');
    $('.landing-screen').css('visibility', 'hidden');
    fight();
  });
  //////////////////////////////////////////////////////////////////////////////
  // Fight Screen
  //////////////////////////////////////////////////////////////////////////////
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
  function fight() {
    // Declarations and avatar initializations
    let player1 = $('.player-1');
    let player2 = $('.player-2');
    player1.css({
      'left': '100px',
      // 'background-color': 'blue',
      'width': '150px'
    });
    player2.css({
      'right': '100px',
      // 'background-color': 'green',
      'width': '150px'
    });
    $('.player-1-hp').css('width', '350');
    $('.player-2-hp').css('width', '350');

    // /////////////////////////////////////////////////////////////////////////
    // HP System
    // Initialize HP values
    let p1HPVal = 101;
    let p2HPVal = 101;
    // Target HP Spans
    let p1HPSpan = $('#p1-hp-span');
    let p2HPSpan = $('#p2-hp-span');
    // For Testing - Update HP Span Values
    // p1HPSpan.text(p1HPVal);
    // p2HPSpan.text(p2HPVal);
    // /////////////////////////////////////////////////////////////////////////
    // Post MVP Health Bars
    function p1HPBar() {
      // 350px is the initial width of the HPBar div
      return 350 - (350 - ((p1HPVal * 350) / 101));
    }

    function p2HPBar() {
      return 350 - (350 - ((p2HPVal * 350) / 101));
    }
    // /////////////////////////////////////////////////////////////////////////
    // Player Name Display
    // Name Displays
    if (p1Name !== undefined) {
      $('.player-1-name').text(`${p1Name}`);
    } else {
      p1Name = 'Player 1';
      $('.player-1-name').text(`Player 1`);
    }
    if (p2Name !== undefined) {
      $('.player-2-name').text(`${p2Name}`);
    } else {
      p2Name = 'Player 2';
      $('.player-2-name').text(`Player 2`);
    }
    // /////////////////////////////////////////////////////////////////////////
    // Player Controls
    // https://stackoverflow.com/questions/7298507/move-element-with-keypress-multiple
    let keys = {};
    $(document).on('keydown', function(e) {
      keys[e.keyCode] = true;
    });
    $(document).on('keyup', function(e) {
      delete keys[e.keyCode];
    });

    function playerMoves() {
      let player1BCR = player1[0].getBoundingClientRect();
      let player2BCR = player2[0].getBoundingClientRect();
      let arenaLeftWall = $('.battle-arena')[0].getBoundingClientRect()
      let arenaRightWall = $('.battle-arena')[0].getBoundingClientRect()
      for (let keyPressed in keys) {
        if (!keys.hasOwnProperty(keyPressed)) continue;
        ////////////////////////////////////////////////////////////////////////
        // Player 1 Motion Controls
        // 'a' moves left
        else if (keyPressed == 65 && (p1HPVal > 0 || p2HPVal > 0) &&
          // Prevent P1 From Moving Past Left Arena Wall
          (player1BCR.left > arenaLeftWall.left)) {
          $(player1).animate({
            left: "-=5"
          }, 0);
          hitDetect();
        }
        // 'w' moves up
        // else if (keyPressed == 87) {
        //  $(player1).animate({top: "-=5"}, 0);
        // }
        // 'd' moves right
        else if (keyPressed == 68 && (p1HPVal > 0 || p2HPVal > 0) &&
          // Prevent Pushing P2 Div Past Right Arena Wall
          (player2BCR.right <= arenaRightWall.right) &&
          // Prevent Div Overlap
          (player1BCR.right <= (player2BCR.left - 10))) {
          $(player1).animate({
            left: "+=5"
          }, 0);
          hitDetect();
        }
        // 's' moves down
        // else if (keyPressed == 83) {
        //  $(player1).animate({top: "+=5"}, 0);
        // }
        ////////////////////////////////////////////////////////////////////////
        // Player 2 Motion Controls
        // 'l' moves left
        else if (keyPressed == 76 && (p1HPVal > 0 && p2HPVal > 0) &&
          // Prevent Pushing P1 Div Past Left Arena Wall
          (player1BCR.left >= arenaLeftWall.left) &&
          // Prevent Div Overlap
          (player2BCR.left >= (player1BCR.right + 10))) {
          $(player2).animate({
            right: "+=5"
          }, 0);
          hitDetect();
        }
        // 'p' moves up
        // else if (keyPressed == 80) {
        // $(player2).animate({top: "-=5"}, 0);
        // }
        // ''' moves right
        else if (keyPressed == 222 && (p1HPVal > 0 && p2HPVal > 0) &&
          // Prevent P2 From Moving Past Right Arena Wall
          (player2BCR.right < arenaRightWall.right)) {
          $(player2).animate({
            right: "-=5"
          }, 0);
          hitDetect();
        }
        // ';' moves down
        // else if (keyPressed == 186) {
        //     $(player2).animate({top: "+=5"}, 0);
        // }
        ////////////////////////////////////////////////////////////////////////
        // Blocking System
        // Player 1 Block - 'q'
        // else if (keyPressed == 81) {
        //   // Increase div width
        //   if (p1HPVal > 0 && p2HPVal > 0) {
        //     $(player1).css({
        //       'width': '155',
        //       'background-color': 'purple'
        //     });
        //     // if (player2BCR.right < arenaRightWall.right){
        //     //   $(player2).animate({right: "-=1"}, 0);
        //     //   // console.log('block');
        //     //   // console.log(`P1 HP: ${p1HPVal}`)
        //     // }
        //   }
        //   // Return to original Div width
        //   $(document).keyup(function() {
        //     $(player1).css({
        //       'width': '150',
        //       // 'background-color': 'blue'
        //     });
        //   });
        // }
        // // Player 2 Block - '['
        // else if (keyPressed == 219) {
        //   // Increase div width
        //   if (p1HPVal > 0 && p2HPVal > 0) {
        //     $(player2).css({
        //       'width': '155',
        //       'background-color': 'purple'
        //     });
        //     // if (player1BCR.left < arenaLeftWall.left){
        //     //   $(player1).animate({left: "-=1"}, 0);
        //     //   // console.log('block');
        //     //   // console.log(`P1 HP: ${p1HPVal}`)
        //     // }
        //   }
        //   // Return to original Div width
        //   $(document).keyup(function() {
        //     $(player2).css({
        //       'width': '150',
        //       // 'background-color': 'green'
        //     });
        //   });
        // }
        ////////////////////////////////////////////////////////////////////////
        // Closes for-continue
      }
      // Closes playerMoves()
    }
    // /////////////////////////////////////////////////////////////////////////
    // Player attacks
    function playerAttacks() {
      let attacks = true;
      let player1BCR = player1[0].getBoundingClientRect();
      let player2BCR = player2[0].getBoundingClientRect();
      $(document).on('keydown', function(e) {
        ////////////////////////////////////////////////////////////////////////
        // Player Attacks
        // Player Attacks - Punch
        function punch(player) {
          // Increase Player Div Width
          $(player).css('width', '200');
          // player2.toggleClass('k-punch');
          // For Testing - Change Player Color
          // $(player).css('background-color', 'yellow');
          if (player === player1) {
            // console.log('p1 hit')
            $(player1).css('background-position', '-150px 0px');
          } else if (player === player2) {
            // console.log(`p2 hit`)
            $(player2).css('background-position', '-150px 0px');
          }

          // Auto-Return Player Div Width
          setTimeout(function() {
            $(player).css('width', '150');
            $(player).css('background-position', '0px 0px');
          }, 200);
          if (hitDetect() === true && (p1HPVal > 0 && p2HPVal > 0)) {
            if (player === player1) {
              // Damage Function Args: (playerDamaged,playerHPVal, damageVal, playerHPSpan)
              p2HPVal = damage(2, p2HPVal, 1, p2HPSpan);
              checkWin();
            } else if (player === player2) {
              p1HPVal = damage(1, p1HPVal, 1, p1HPSpan)
              checkWin();
            }
          }
        }

        function kick(player) {
          // Increase Player Div Width
          $(player).css('width', '225');
          // For Testing - Change Player Color
          // $(player).css('background-color', 'yellow');
          if (player === player1) {
            // console.log('p1 hit')
            $(player1).css('background-position', '-350px 0px');
          } else if (player === player2) {
            // console.log(`p2 hit`)
            $(player2).css('background-position', '-350px 0px');
          }
          // Auto-Return Player Div Width
          setTimeout(function() {
            $(player).css('width', '150');
            $(player).css('background-position', '0px 0px');
          }, 200);
          if (hitDetect() === true && (p1HPVal > 0 && p2HPVal > 0)) {
            if (player === player1) {
              // Damage Function Args: (playerDamaged,playerHPVal, damageVal, playerHPSpan)
              p2HPVal = damage(2, p2HPVal, 3, p2HPSpan);
              checkWin();
            } else if (player === player2) {
              p1HPVal = damage(1, p1HPVal, 3, p1HPSpan)
              checkWin();
            }
          }
        }
        ////////////////////////////////////////////////////////////////////////
        // Player Key Bindings-Attack Calls
        // Player 1
        // Punch - 'e'
        if (e.keyCode == 69) {
          punch(player1);
        }
        // Kick -'f'
        else if (e.keyCode == 70) {
          kick(player1);
        }
        ////////////////////////////////////////////////////////////////////////
        // Player 2
        // Punch 'o'
        else if (e.keyCode == 79) {
          punch(player2)
        }
        // Kick -'k'
        else if (e.keyCode == 75) {
          kick(player2);
        }
        // Closes Evt Listener
      });
      // Closes playerAttacks()
    }
    playerAttacks();
    setInterval(playerMoves, 10);
    // /////////////////////////////////////////////////////////////////////////
    // Hit collision from scratch
    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    function hitDetect() {
      let player1BCR = player1[0].getBoundingClientRect();
      let player2BCR = player2[0].getBoundingClientRect();
      // Hit Detection Formula from MDN
      if (player1BCR.x < player2BCR.x + player2BCR.width &&
        player1BCR.x + player1BCR.width > player2BCR.x &&
        player1BCR.y < player2BCR.y + player2BCR.height &&
        player1BCR.height + player1BCR.y > player2BCR.y) {
        ////////////////////////////////////////////////////////////////////////
        // Hit Detection Clauses
        // For Testing - Divs change color
        // $(player1).css('background-color', 'red');
        // $(player2).css('background-color', 'pink');
        return true;
      }
      // Non-Hit Clauses
      // For Testing - Div Color Reset
      // else {
      // $(player1).css('background-color', 'blue');
      // $(player2).css('background-color', 'green');
      // }
      // console.log(player1BCR);
      // console.log(blueBCR)
      // Closes hitDetect()
    }
    ////////////////////////////////////////////////////////////////////////////
    // Damage System
    function damage(player, playerHPVal, damageVal, playerHPSpan) {
      if (playerHPVal > 0) {
        playerHPVal -= damageVal;
        // For Testing
        // playerHPSpan.text(playerHPVal);
        if (player === 1) {
          $('.player-1-hp').css('width', p1HPBar);
        } else if (player === 2) {
          $('.player-2-hp').css('width', p2HPBar);
        }
        return playerHPVal
      }
    }
    ////////////////////////////////////////////////////////////////////////////
    // *** PostMVP Timer
    let timerBox = $('.timer-box');
    let timer = 30;
    let tickDown = setInterval(function() {
      timer -= 1;
      timerBox.text(timer);
      // On TimeOut
      if (timer === 0) {
        checkWin();
      }
    }, 1000)
    ////////////////////////////////////////////////////////////////////////////
    // Test Hit Buttons
    // P1 Hit P2 Button
    // $('#hit-player2').on('click', function() {
    //   if (p1HPVal > 0 && p2HPVal > 0) {
    //     // HP Reduction
    //     p2HPVal -= 10;
    //     p2HPSpan.text(p2HPVal);
    //     checkWin();
    //   }
    // });
    // // P2 Hit P1 Button
    // $('#hit-player1').on('click', function() {
    //   // console.log(p1HPVal)
    //   if (p1HPVal > 0 && p2HPVal > 0) {
    //     // HP Reduction
    //     p1HPVal -= 10;
    //     p1HPSpan.text(p1HPVal);
    //     checkWin();
    //   }
    // });
    // // *** Cheat Win (for testing and debugging)
    // $('#cheat-btn').on('click', function() {
    //   if (p1HPVal > 0 && p2HPVal > 0) {
    //     // HP Reduction
    //     p2HPVal -= 101;
    //     p2HPSpan.text(p2HPVal);
    //     checkWin();
    //   }
    // });

    ////////////////////////////////////////////////////////////////////////////
    // * Win-Case:
    // if Player 1 HP <= 0, Player 2 Wins
    // else if Player 2 HP <= 0, Player 1 Wins
    function checkWin() {
      // Player 1 Wins
      if (p2HPVal <= 0) {
        console.log('player 1 wins')
        // Stops Post Match hitting
        p1HPVal = 0;
        p2HPVal = 0;
        // Stop Timer
        clearInterval(tickDown);
        // Re-inits Timer
        timer = 30;
        timerBox.text(timer);
        // Winner Decs
        $('#winnerBox').text(`${p1Name} Wins!`);
        $('.end-screen').css('visibility', 'visible');
        $('.fight-screen').css('visibility', 'hidden');
        $('#r-win, #k-lose').css('visibility', 'visible');
        // $(player1).css('width', '150');
        // $(player2).css('width', '150');
      }
      // Player 2 Wins
      else if (p1HPVal <= 0) {
        console.log('player 2 wins')
        $('#winnerBox').text(`${p2Name} Wins!`);
        p1HPVal = 0;
        p2HPVal = 0;
        clearInterval(tickDown);
        timer = 30;
        timerBox.text(timer);
        $('.end-screen').css('visibility', 'visible');
        $('.fight-screen').css('visibility', 'hidden');
        $('#k-win, #r-lose').css('visibility', 'visible');
      }
      // Draw Clause
      else if (timer === 0 && (p1HPVal > 0 && p2HPVal > 0)) {
        $('#winnerBox').text(`It\'s A Draw. You Both Lose =(`);
        p1HPVal = 0;
        p2HPVal = 0;
        clearInterval(tickDown);
        timer = 30;
        timerBox.text(timer);
        $('.end-screen').css('visibility', 'visible');
        $('.fight-screen').css('visibility', 'hidden');
        $('#r-lose, #k-lose').css('visibility', 'visible');
      }

      // Closes checkWin()
    }
    // Closes Fight Function
  }
  // ///////////////////////////////////////////////////////////////////////////
  // End Screen
  // ///////////////////////////////////////////////////////////////////////////
  /* Pseudo Code
  * Display winner's name, announcing victory in announcement Div
    // if/else to get name for victor
    // `${firstPlayerName} wins!` or `${secondPlayerName} wins!`

  * Button displayed to restart fight
    // reCall .fight-screen
    // init fight();
  */
  // For clickable Model ONLY
  // Replay
  // Button click goes to Fight Screen
  $('#replay-btn').on('click', function() {
    $('.end-screen').css('visibility', 'hidden');
    $('.fight-screen').css('visibility', 'visible');
    $('#r-win, #r-lose, #k-win, #k-lose').css('visibility', 'hidden');
    fight();
  });
  // Button click goes to Landing Screen
  $('#landing-btn').on('click', function() {
    $('.end-screen').css('visibility', 'hidden');
    $('.landing-screen').css('visibility', 'visible');
    $('#r-win, #r-lose, #k-win, #k-lose').css('visibility', 'hidden');
  });
  //////////////////////////////////////////////////////////////////////////////
  // Closes jQuery func
});
