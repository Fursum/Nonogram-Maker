const wrapper = document.getElementById("scrollable-view-wrapper");
const view = document.getElementById("scrollable-view");
let scale = 1;
let origin = { x: 0, y: 0 };
let isDragging = false;
let start = { x: 0, y: 0 };

// Zoom on scroll while hovering
wrapper.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    scale = Math.min(Math.max(0.1, scale + delta), 3);
    updateTransform();
  },
  { passive: false }
);

// Mouse drag to pan, not on the table
wrapper.addEventListener("mousedown", (e) => {
  if (e.srcElement.id === "input-canvas") return; // Prevent dragging when clicking on the input canvas
  isDragging = true;
  start = { x: e.clientX, y: e.clientY };
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const dx = e.clientX - start.x;
  const dy = e.clientY - start.y;
  start = { x: e.clientX, y: e.clientY };
  origin.x += dx;
  origin.y += dy;
  updateTransform();
});

function updateTransform() {
  view.style.transform = `translate(${origin.x}px, ${origin.y}px) scale(${scale})`;
}
