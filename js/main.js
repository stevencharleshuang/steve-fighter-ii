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
  // https://codepen.io/stevencharles/pen/Zxrwmp
  /* Uses Canvas, not a solution */
  // Crafty.init(800, 600);

  // let dim1 = {x: 200, y: 300, w: 100, h: 200}
  // let dim2 = {x: 500, y: 300, w: 100, h: 200}

  // let blueBox = Crafty.e("2D, Canvas, Color, Keyboard, Fourway").fourway(200).attr(dim1).color("blue");

  // let redBox = Crafty.e("2D, Canvas, Color, Keyboard, Multiway").attr(dim2).color("red").multiway({I: -90, J: 90, L: 0, J: 180});

  // blueBox.bind("EnterFrame", function () {
  //     if (redBox.x < blueBox.x + blueBox.w &&
  //         redBox.x + redBox.w > blueBox.x &&
  //         redBox.y < blueBox.y + blueBox.h &&
  //         redBox.h + redBox.y > blueBox.y) {
  //         console.log('collision detected!')
  //         this.color("green");
  //     } else {
  //         // no collision
  //         this.color("blue");
  //     }
  // });
  // redBox.bind("EnterFrame", function () {
  //     if (blueBox.x < redBox.x + redBox.w &&
  //         blueBox.x + blueBox.w > redBox.x &&
  //         blueBox.y < redBox.y + redBox.h &&
  //         blueBox.h + blueBox.y > redBox.y) {
  //         console.log('collision detected!')
  //         this.color("yellow");
  //     } else {
  //         // no collision
  //         this.color("red");
  //     }
  // });

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
