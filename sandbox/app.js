$(function() {
  console.log( "jQuery ready!" );
// ^ jQuery Test ^
/////////////////////////////////////////////////


// let makeDiv = $(document.body);
// makeDiv.append('<div></div>')
// console.log(makeDiv);
  let blueBox = $('.blue-box');
  let greenBox = $('.green-box');
  let keys = {}

$(document).keydown(function(e) {
    keys[e.keyCode] = true;
});

$(document).keyup(function(e) {
    delete keys[e.keyCode];
});
// Motion Controls
//https://stackoverflow.com/questions/7298507/move-element-with-keypress-multiple
function moveSq() {
    for (let direction in keys) {
        if (!keys.hasOwnProperty(direction)) continue;
        // 'a' moves left
        else if (direction == 65) {
            $(blueBox).animate({left: "-=5"}, 0);
        }
        // 'w' moves up
        else if (direction == 87) {
            $(blueBox).animate({top: "-=5"}, 0);
        }
        // 'd' moves right
        else if (direction == 68) {
            $(blueBox).animate({left: "+=5"}, 0);
        }
        // 's' moves down
        else if (direction == 83) {
            $(blueBox).animate({top: "+=5"}, 0);
        }
        // 'l' moves left
        else if (direction == 76) {
            $(greenBox).animate({left: "-=5"}, 0);
        }
        // 'p' moves up
        else if (direction == 80) {
            $(greenBox).animate({top: "-=5"}, 0);
        }
        // ''' moves right
        else if (direction == 222) {
            $(greenBox).animate({left: "+=5"}, 0);
        }
        // ';' moves down
        else if (direction == 186) {
            $(greenBox).animate({top: "+=5"}, 0);
        }
    }
}
moveSq();
setInterval(moveSq, 10);
/////////////////////////////
// MDN 2-D Hit Collision Example

blueSq = {x: 5, y: 5, width: 50, height: 50}
greenSq = {x: 20, y: 10, width: 10, height: 10}

if (blueSq.x < greenSq.x + greenSq.width &&
   blueSq.x + blueSq.width > greenSq.x &&
   blueSq.y < greenSq.y + greenSq.height &&
   blueSq.height + blueSq.y > greenSq.y) {
    alert('collision detected!');
}

// filling in the values =>

// if (5 < 30 &&
//     55 > 20 &&
//     5 < 20 &&
//     55 > 10) {

// }
/////////////
// Get Element's css properties and store
// Motion Controls
    // blueBox.on('keyup', function(){
    //   if (keyPressed === 68) {
    //     console.log('click!');
    //     blueBox.css('animation', 'moveRight 1s forwards');
    //     moved = true;
    //   }
    //   else if (keyPressed === 65) {
    //     console.log('click back!');
    //     blueBox.css('animation', 'moveLeft 1s backwardsx');
    //     moved = false;
    //   }
    // });
    // greenBox.on('click', function(){
    //   console.log('click!');
    //   greenBox.css('animation', 'moveRight 1s forwards');
    // });
    //     blueBox.on('keypress', function(){
    //     blueBox.css('animation', 'moveRight 1s forwards');
    // });
    //     blueBox.on('keyup', function(){
    //     blueBox.css('animation', 'moveLeft 1s forwards');
    // });
// let blueShift = false;
//   $(blueBox).click(function(){
//     if (!blueShift) {
//         console.log('Blue click')
//         $(this).animate({'left' : '0px'}, {duration : 5});
//         blueShift = true;
//       }
//     else{
//        $(this).animate({'left' : '200px'}, {duration: 5});
//         blueShift = false;
//       }
//   });
// vector div
// Mover () {
//   location = new PVector
// }
  // Multi-page Loader - Landing to Fight
// $('.start-button').on('click', function(){
//   console.log('start!');
//   $('.fight-screen').css('visibility', 'visible');
//   $('.landing-screen').css('visibility', 'hidden');
// });







/////////////////////////////////////////////////
// ˇ Closes jQuery Func ˇ
});
