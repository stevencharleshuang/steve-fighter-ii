


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
      collider.moveableDiv.shiftPosition(-5, 0);
      break;
    case 38:
      collider.moveableDiv.shiftPosition(0, -5);
      break;
    case 39:
      collider.moveableDiv.shiftPosition(5, 0);
      break;
    case 40:
      collider.moveableDiv.shiftPosition(0, 5);
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
      currentDiv.setAttribute('style', `left: ${Math.floor(Math.random() * 400)}px; top: ${Math.floor(Math.random() * 600)}px;`);
      const staticDiv = new BaseDiv(positionCreator(currentDiv));
      collider.staticDivs.push(staticDiv);
    }
  }
  document.addEventListener('keydown', (e) => moveDiv(e));
})();