import { useState, useEffect } from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/Forms/LoginForm";
import dogPic from "@/assets/dog-photos/daphne(2).jpg";
import HorizontalScroll from "../../../features/animations/image-scroll/HorizontalScroll";
import dogList from "@/assets/dog-photos/dog-list.js";

export default function Login() {
  const [urlList, setUrlList] = useState([]);
  const [showCarousel, setShowCarousel] = useState(false);

  function splitDogArray(arr) {
    const chunkSize = Math.ceil(arr.length / 3);
    return [
      arr.slice(0, chunkSize),
      arr.slice(chunkSize, chunkSize * 2),
      arr.slice(chunkSize * 2, chunkSize * 3),
    ];
  }

  function getUniqueDogs() {
    const dogSet = new Set();
    while (dogSet.size < 30) {
      dogSet.add(dogList[Math.floor(Math.random() * dogList.length)]);
    }
    const dogArray = Array.from(dogSet);
    setUrlList(splitDogArray(dogArray));
  }

  useEffect(() => {
    getUniqueDogs();
  }, []);

  useEffect(() => {
    if(urlList.length) {
      setShowCarousel(true);
    }
  }, [urlList])

  return (
    <div className="flex flex-col justify-center min-h-svh gap-y-28">
      <div className="absolute top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-[#171102]  p-12 rounded-lg shadow-[0 30px 40px rgba(0,0,0,.1)">
        <div className="flex">
          {/* <a
            href="TODO direct to about page? remove 'pointer-events-none' -> "
            className="flex items-center gap-2 font-medium pointer-events-none"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Puppy Finder
          </a> */}
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="">
            <LoginForm />
          </div>
        </div>
      </div>
      {/* <div className="relative hidden bg-muted lg:block">
        <img
          src={dogPic}
          alt="My dog Daphne!"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-300"
        />
      </div> */}
      {showCarousel &&
        urlList.map((list, index) => (
            <HorizontalScroll
              key={index}
              dataDirection={index % 2 !== 0 ? "left" : "right"}
              dataSpeed="slow"
              images={list}
            ></HorizontalScroll>
        ))}
      {/* <HorizontalScroll dataDirection="right" dataSpeed="slow"></HorizontalScroll>
      <HorizontalScroll dataDirection="left" dataSpeed="slow"></HorizontalScroll> */}
    </div>
  );
}
