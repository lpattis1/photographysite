// Menu Variables
const circleMenuBtn = document.querySelector(".circle");
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menu-item");
const fullLogoMenu = document.querySelector(".full-menu");
const logoName = document.querySelector(".logo-name");
const logoDescription = document.querySelector(".logo-description");
let logoTl = new TimelineMax({ repeat: -1, repeatDelay: 1 });
let logoTl2 = new TimelineMax({ repeat: -1, repeatDelay: 1 });

// Img Container Variable
const imgContainer = document.querySelector(".image-container ");

// Menu states
const menuIn = gsap.timeline({
  paused: true,
});
const menuOut = gsap.timeline({
  paused: true,
});

let menuIsOpen = false;

// Open and close menu items

function openCloseMenu() {
  // Open
  menuIn.to(
    menuItems,
    {
      duration: 1,
      opacity: 1,
      y: 20,
      stagger: 0.1,
      ease: "expo.inOut",
    },
    "-=0.5"
  );

  //   Close
  menuOut.to(
    menuItems,
    {
      duration: 0.5,
      opacity: 0,
      y: -20,
      ease: "expo.inOut",
    },
    "-=0.5"
  );

  // Menu Event
  circleMenuBtn.addEventListener("click", () => {
    menuIsOpen = !menuIsOpen;
    if (menuIsOpen) {
      imgContainer.classList.add("d-none");
      fullLogoMenu.classList.remove("d-none");
      circleMenuBtn.style.background = "none";
      circleMenuBtn.style.border = "0.1rem solid black";
      menuIn.restart();
    } else {
      imgContainer.classList.remove("d-none");
      fullLogoMenu.classList.add("d-none");
      circleMenuBtn.style.background = "black";
      circleMenuBtn.style.border = "none";
      menuOut.restart();
    }
  });
}

function cycleThroughMenuItems() {
  menuItems.forEach((item) => {
    item.addEventListener("mouseenter", function (e) {
      if (e.target === item) {
        item.classList.add("menu-item--hover");
      }
    });

    item.addEventListener("mouseleave", function (e) {
      if (e.target === item) {
        item.classList.remove("menu-item--hover");
      }
    });
  });
}

openCloseMenu();
cycleThroughMenuItems();

logoTl.fromTo(
  logoName,
  {
    duration: 15,
    rotation: `-${randomVal(2, 15)}`,
  },
  {
    duration: 15,
    rotation: `${randomVal(2, 15)}`,
  }
);

logoTl2.fromTo(
  logoDescription,
  {
    duration: 20,
    rotation: `${randomVal(2, 20)}`,
  },
  {
    duration: 20,
    rotation: `-${randomVal(2, 20)}`,
  }
);

// Random value for logo transform properties

function randomVal(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// ------------------------------------

// Image variables
const leftSide = document.querySelector(".left");
const rightSide = document.querySelector(".right");
const leftImg = document.querySelector(".left-img");
const rightImg = document.querySelector(".right-img");

leftSide.addEventListener("click", getImages);
rightSide.addEventListener("click", getImages);

function getImages() {
  fetch("imgs.json")
    .then((data) => {
      return data.json();
    })
    .then((imgs) => {
      let randomImg1 = imgs[Math.floor(Math.random() * imgs.length)].url;
      let randomImg2 = imgs[Math.floor(Math.random() * imgs.length)].url;
      leftImg.animate(
        [
          // keyframes
          { opacity: "0.5", filter: "invert(100%)" },
          { opacity: "1", filter: "invert(0%)" },
        ],
        {
          // timing options
          duration: 1000,
        }
      );

      rightImg.animate(
        [
          // keyframes
          { opacity: "0.5", filter: "invert(100%)" },
          { opacity: "1", filter: "invert(0%)" },
        ],
        {
          // timing options
          duration: 1000,
        }
      );
      leftImg.src = `${randomImg1}`;
      rightImg.src = `${randomImg2}`;
      console.log(imgs);
    });
}
