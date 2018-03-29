$(function() {
  console.log( "jQuery ready!" );
// ^ jQuery Test ^
/////////////////////////////////////////////////


// let makeDiv = $(document.body);
// makeDiv.append('<div></div>')
// console.log(makeDiv);
  // let blueBox = $('.blue-box');
  // let greenBox = $('.green-box');
// Motion Controls
// https://stackoverflow.com/questions/7298507/move-element-with-keypress-multiple
//   let keys = {}

// $(document).keydown(function(e) {
//     keys[e.keyCode] = true;
// });

// $(document).keyup(function(e) {
//     delete keys[e.keyCode];
// });
// function moveSq() {
//     for (let direction in keys) {
//         if (!keys.hasOwnProperty(direction)) continue;
//         // 'a' moves left
//         else if (direction == 65) {
//             $(blueBox).animate({left: "-=5"}, 0);
//         }
//         // 'w' moves up
//         else if (direction == 87) {
//             $(blueBox).animate({top: "-=5"}, 0);
//         }
//         // 'd' moves right
//         else if (direction == 68) {
//             $(blueBox).animate({left: "+=5"}, 0);
//         }
//         // 's' moves down
//         else if (direction == 83) {
//             $(blueBox).animate({top: "+=5"}, 0);
//         }
//         // 'l' moves left
//         else if (direction == 76) {
//             $(greenBox).animate({left: "-=5"}, 0);
//         }
//         // 'p' moves up
//         else if (direction == 80) {
//             $(greenBox).animate({top: "-=5"}, 0);
//         }
//         // ''' moves right
//         else if (direction == 222) {
//             $(greenBox).animate({left: "+=5"}, 0);
//         }
//         // ';' moves down
//         else if (direction == 186) {
//             $(greenBox).animate({top: "+=5"}, 0);
//         }
//     }
// }
// moveSq();
// setInterval(moveSq, 10);
/////////////////////////////
// MDN 2-D Hit Collision Example

// blueSq = {x: 5, y: 5, width: 50, height: 50}
// greenSq = {x: 20, y: 10, width: 10, height: 10}

// if (blueSq.x < greenSq.x + greenSq.width &&
//    blueSq.x + blueSq.width > greenSq.x &&
//    blueSq.y < greenSq.y + greenSq.height &&
//    blueSq.height + blueSq.y > greenSq.y) {
//     alert('collision detected!');
// }

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




// Collision Detection Example
// https://jsfiddle.net/jlr7245/217jrozd/3/
//////////// COLLISION ALGO FROM MDN
/*
if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.height + rect1.y > rect2.y) {

}
*/
// declare collider obj
const collider = {
  // mDiv set to null
  moveableDiv: null,
  // staticDivs set to empty array
  staticDivs: [],
  // check collision function
  checkCollision: function() {
    // declare post collision var and initiate to false
    let hasJustCollided = false;
    // for loop - increment against length of static divs array
    for (let i = 0; i < this.staticDivs.length; i++) {
      // declare current Div, store collided Div's static divs
      const currentDiv = this.staticDivs[i];
      // MDN algorithm if / else arg
      if (currentDiv.position.left < this.moveableDiv.position.left + this.moveableDiv.position.width &&
      currentDiv.position.left + currentDiv.position.width > this.moveableDiv.position.left &&
      currentDiv.position.top < this.moveableDiv.position.top + this.moveableDiv.position.height &&
      currentDiv.position.height + currentDiv.position.top > this.moveableDiv.position.top) {
        // result of MDN algorithm, just collided set to true
        hasJustCollided = true;
        // Collision true, if / else
        if (!this.moveableDiv.ref.classList.contains('collision-state')) {
          this.moveableDiv.ref.classList.add('collision-state');
        }
      } else if (this.moveableDiv.ref.classList.contains('collision-state') && !hasJustCollided) {
          this.moveableDiv.ref.classList.remove('collision-state');
        }
    }
  },

};
// BaseDiv class
class BaseDiv {
  constructor(position) {
    this.position = position;
  }
}
// MoveDiv class extends BaseDiv class
class MoveDiv extends BaseDiv {
  constructor(position, ref) {
    super(position);
    this.ref = ref;
  }
  // shift Position method
  shiftPosition(x, y) {
    this.position.left += x;
    this.position.top += y;
    this.reDraw();
  }
  // reDraw method
  reDraw() {
    this.ref.setAttribute('style', `left: ${this.position.left}px; top: ${this.position.top}px`);
    collider.checkCollision();
  }
}
// moveDiv function - key bindings
function moveDiv(e) {
  switch(e.which) {
    case 37:
      collider.moveableDiv.shiftPosition(-40, 0);
      break;
    case 38:
      collider.moveableDiv.shiftPosition(0, -40);
      break;
    case 39:
      collider.moveableDiv.shiftPosition(40, 0);
      break;
    case 40:
      collider.moveableDiv.shiftPosition(0, 40);
      break;
    default:
      console.log('not an arrow');
      break;
  }
}
// positionCreator functiomn
function positionCreator(currentDiv) {
  return {
    left: currentDiv.getBoundingClientRect().left,
    top: currentDiv.getBoundingClientRect().top,
    height: currentDiv.getBoundingClientRect().height,
    width: currentDiv.getBoundingClientRect().width
  };
}


(() => {
  const allTheDivs = document.querySelectorAll('.collideme');
  for (let i = 0; i < allTheDivs.length; i++) {
    const currentDiv = allTheDivs[i];
    if (currentDiv.dataset.dynamic === 'true') {
      currentDiv.setAttribute('style', 'left: 500px; top: 300px;');
      const moveableDiv = new MoveDiv(positionCreator(currentDiv), currentDiv);
      collider.moveableDiv = moveableDiv;
    } else {
      const staticDiv = new BaseDiv(positionCreator(currentDiv));
      collider.staticDivs.push(staticDiv);
    }
  }
  document.addEventListener('keydown', (e) => moveDiv(e));
})();







/////////////////////////////////////////////////
// ˇ Closes jQuery Func ˇ
});