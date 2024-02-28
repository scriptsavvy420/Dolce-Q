//Document Obj
const items = document.querySelectorAll(".abs_bar__options--item");
const line_animate = document.querySelector(".abs_bar__line--animate");
const item_animate = document.querySelector(".abs_bar__options--item__animate");
const section_animate = document.querySelectorAll(".section_animate");

//Global Vairable
let section_num = 0;
let scroll_val = 0;
let circle = 0;
let PosArr = [0];
let itemPosArr = [];

/* Screen Move Part */
for (let i = 0; i < section_animate.length; i++) {
  PosArr[i + 1] = section_animate[i].getBoundingClientRect().bottom;
}

const debounce = (func, delay) => {
  let timeoutId;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
};

const handleMouseWheel = (event) => {
  let startPoint = 0;
  let endPoint = 0;
  let delta = Math.sign(event.deltaY); // Get the direction of mouse wheel movement

  if (delta === 1) {
    if (section_num == section_animate.length - 1) return;
    startPoint = PosArr[section_num];
    endPoint = PosArr[section_num + 1];
    window.scrollTo(startPoint, endPoint);
    moveLine(delta);
    moveCircle(delta);
    ctlStyleItems(delta);
    section_num++;
  } else if (delta === -1) {
    if (section_num == 0) return;
    startPoint = PosArr[section_num];
    endPoint = PosArr[section_num - 1];
    window.scrollTo(startPoint, endPoint);
    moveLine(delta);
    moveCircle(delta);
    ctlStyleItems(delta);
    section_num--;
  }

  setTimeout(() => {
    return;
  }, 500);
};
const debouncedHandleMouseWheel = debounce(handleMouseWheel, 500);
window.addEventListener("wheel", debouncedHandleMouseWheel);

/* Circle Move Part */
const moveCircle = (direction) => {
  const moveAmount = 197;
  const moveValue = direction == 1 ? moveAmount : -moveAmount;
  console.log("direction, moveValue", direction, moveValue);
  gsap.to(item_animate, {
    duration: 1,
    y: "+=" + moveValue,
  });
};

/* Move Line Part*/
const moveLine = (direction) => {
  const moveAmount = 193;
  const newHeight = direction === 1 ? "+=" + moveAmount : "-=" + moveAmount;

  gsap.to(line_animate, {
    duration: 1,
    height: newHeight,
    ease: "power2.out",
  });
};

/* Control Style of Items */
const ctlStyleItems = (direction) => {
  const selectedItem =
    direction == 1 ? items[section_num + 1] : items[section_num - 1];
  const itemsArray = Array.from(items);
  const filteredItems = itemsArray.filter((item) => item !== selectedItem);

  console.log("selectedItem", selectedItem, filteredItems);
  gsap.to(selectedItem, {
    duration: 0.3,
    backgroundColor: "#8B8787",
    ease: "power3.out",
  });
  for (let i = 0; i < filteredItems.length; i++) {
    gsap.to(filteredItems[i], {
      duration: 0.3,
      backgroundColor: "#ffffff",
      ease: "power3.out",
    });
  }
};
