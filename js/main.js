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
  // Prevent Default Submit Actions
  // p1 Form Event Listener
  $('.player1-input').submit(function(event) {
    alert("Handler for .submit() called.");
    // Get Name text
    p1 = $('.player1-input').text();
    // Prevent p1 Form Submission Action
    event.preventDefault();
    // Remove p1 form, replace with name text
    $('.player1-input').empty();
    $('.player1-input').text();
  console.log('.player1-input');
  });
  // p2 Form Event Listener
  $('.player2-input').submit(function(event) {
    alert("Handler for .submit() called.");
    // Get Name text
    p2 = $('#p2Name').text();
    // Prevent p2 Form Submission Action
    event.preventDefault();
      // Remove p2 form, replace with name text
  console.log(p2);
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
  // ** Hit Detection Solution
* Win-Case:
  // if Player 1 HP <= 0, Player 2 Wins
  // else if Player 2 HP <= 0, Player 1 Wins
* Call fight();
*/
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
