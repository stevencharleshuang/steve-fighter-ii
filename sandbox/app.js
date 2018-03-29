$(function() {
  console.log( "jQuery ready!" );
// ^ jQuery Test ^
/////////////////////////////////////////////////
// let makeDiv = $(document.body);
// makeDiv.append('<div></div>')
// console.log(makeDiv);
  let blueSq = $('.blue-square');
  let greenSq = $('.green-square');
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
            $(blueSq).animate({left: "-=5"}, 0);
        }
        // 'w' moves up
        else if (direction == 87) {
            $(blueSq).animate({top: "-=5"}, 0);
        }
        // 'd' moves right
        else if (direction == 68) {
            $(blueSq).animate({left: "+=5"}, 0);
        }
        // 's' moves down
        else if (direction == 83) {
            $(blueSq).animate({top: "+=5"}, 0);
        }
        // 'l' moves left
        else if (direction == 76) {
            $(greenSq).animate({left: "-=5"}, 0);
        }
        // 'p' moves up
        else if (direction == 80) {
            $(greenSq).animate({top: "-=5"}, 0);
        }
        // ''' moves right
        else if (direction == 222) {
            $(greenSq).animate({left: "+=5"}, 0);
        }
        // ';' moves down
        else if (direction == 186) {
            $(greenSq).animate({top: "+=5"}, 0);
        }
    }
}
moveSq();
setInterval(moveSq, 20);
// Motion Controls
    // blueSq.on('keyup', function(){
    //   if (keyPressed === 68) {
    //     console.log('click!');
    //     blueSq.css('animation', 'moveRight 1s forwards');
    //     moved = true;
    //   }
    //   else if (keyPressed === 65) {
    //     console.log('click back!');
    //     blueSq.css('animation', 'moveLeft 1s backwardsx');
    //     moved = false;
    //   }
    // });
    // greenSq.on('click', function(){
    //   console.log('click!');
    //   greenSq.css('animation', 'moveRight 1s forwards');
    // });
    //     blueSq.on('keypress', function(){
    //     blueSq.css('animation', 'moveRight 1s forwards');
    // });
    //     blueSq.on('keyup', function(){
    //     blueSq.css('animation', 'moveLeft 1s forwards');
    // });
// let blueShift = false;
//   $(blueSq).click(function(){
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
$('.start-button').on('click', function(){
  console.log('start!');
  $('.fight-screen').css('visibility', 'visible');
  $('.landing-screen').css('visibility', 'hidden');
});








/////////////////////////////////////////////////
// ˇ Closes jQuery Func ˇ
});
