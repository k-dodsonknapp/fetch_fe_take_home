import React, { useEffect } from "react";

import dogPic from "@/assets/dog-photos/daphne(2).jpg";
import bulldog from "@/assets/dog-photos/bulldog.jpg";

import "./HorizontalScroll.css";

function HorizontalScroll({
  className,
  dataDirection = "right",
  dataSpeed = "slow",
  images = [],
}) {
  console.log(images);
  function addAnimation() {
    const scrollers = document.querySelectorAll(".scroller");
    scrollers.forEach((scroller) => {
      scroller.setAttribute("data-animated", true);
      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerContent = Array.from(scrollerInner.children);
      console.log("hello");
      if (scrollerContent.length < 31) {
        console.log("goodbye");
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      }
    });
  }

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }
  }, []);
  return (
    <div
      className={`scroller ${className}`}
      data-direction={dataDirection}
      data-speed={dataSpeed}
    >
      <div className="list scroller__inner">
        {images &&
          images.map((image) => (
            <img
              src={image}
              alt="Various dogs"
              className="rounded-md"
              // className="image absolute inset-0 h-full w-full object-cover transition-all duration-300" https://cdn2.thedogapi.com/images/Bymjyec4m.jpg
            />
          ))}
      </div>
    </div>
  );
}

export default HorizontalScroll;
