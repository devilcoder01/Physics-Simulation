const container = document.getElementById("simulation-container");
const ball = document.getElementById("ball");

let mass, gravity, elaticity, initialHeight;
let velocity = 0;
let position = 0;
let isFalling = true;
let KineticEnergy = 0;
let animationFrame;


function draggableBall(elem) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id )) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function startSimulation() {
  // Get user inputs
  mass = parseFloat(document.getElementById("mass").value);
  gravity = parseFloat(document.getElementById("gravity").value);
  elaticity = parseFloat(document.getElementById("elaticity").value);
  initialHeight = container.clientHeight - ball.offsetHeight;

  // Reset simulation
  position = 0;
  velocity = 0;
  isFalling = true;
  ball.style.top = `${position}px`;

  if (animationFrame) cancelAnimationFrame(animationFrame);
  animationFrame = requestAnimationFrame(animate);
}

function animate() {
  const timeStep = 0.02;

  if (isFalling) {
    velocity += gravity * timeStep;

    position += velocity;

    if (position >= initialHeight) {
      KineticEnergy = 0.5 * mass * Math.abs(velocity) ** 2;
      displayEnergy(KineticEnergy);
      position = initialHeight;
    //   velocity = -velocity;
        velocity = -Math.sqrt((2 * KineticEnergy) / mass)*elaticity;
      console.log(Math.abs(velocity));
      if (Math.abs(velocity) < 1) {
        velocity = 0;
        isFalling=false
        cancelAnimationFrame(animationFrame);
      }
    }
  }

  ball.style.top = `${position}px`;
  animationFrame = requestAnimationFrame(animate);
}
function displayEnergy(energy) {
  const energyDisplay = document.getElementById("energy");
  energyDisplay.textContent = `Energy on Hit: ${energy.toFixed(2)} J`;
}
