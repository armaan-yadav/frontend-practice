//cursor
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");
const svg = document.querySelector(".cursor img");
var timer;

svg.style.visibility = "hidden";

//adding coordinates property to each circle
circles.forEach((circle) => {
  circle.x = 0;
  circle.y = 0;
});

window.addEventListener("mousemove", (e) => {
  coords.x = e.clientX - 12;
  coords.y = e.clientY - 12;

  clearTimeout(timer);

  svg.style.visibility = "hidden";

  circles.forEach((circle) => {
    circle.style.display = "block";
  });
  //adding timeout of 500ms to each circle to disappear and make the svg visible on cursor not moving
  timer = setTimeout(() => {
    circles.forEach((circle) => {
      circle.style.display = "none";
      svg.style.visibility = "visible";
      svg.style.display = "block";
    });
  }, 500);
});

const animateCircle = () => {
  let x = coords.x;
  let y = coords.y;

  circles.forEach((circle, index) => {
    circle.style.left = x + "px";
    circle.style.top = y + "px";

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.1;
    y += (nextCircle.y - y) * 0.1;

    const len = circles.length * 2;
    const scaleFactor = Math.max(window.innerWidth / 1400, 1);
    circle.style.scale = ((len - index) / len) * scaleFactor;
  });

  requestAnimationFrame(animateCircle);
};

animateCircle();
