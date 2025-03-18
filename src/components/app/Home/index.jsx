import React, { useEffect, useState } from "react";
import useFetch from "../Hooks/useFetch";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "../../ui/aspectRations";
import { Image } from "lucide-react";
import {
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";

export default function Home() {
  const [breeds, setBreeds] = useState();
  const [carouselBreeds, setCarouselBreeds] = useState([]);
  const [{ data: breedData, loading, error }, submitDogListParams] = useFetch();
  const [{ data: imageData, imageLoading, imageError }, submitDogImageParams] =
    useFetch();

  function getRandomBreeds(breedList = new Set()) {
    const numberOfBreeds = breedData.length;
    const randomBreedIndex = Math.floor(Math.random() * numberOfBreeds);
    breedList.add(breedData[randomBreedIndex]);
    return breedList.size === 5 ? [...breedList] : getRandomBreeds(breedList);
  }

  async function getStarterBreedImages() {
    const starterBreeds = getRandomBreeds();
    const something = "air";
    // console.log(import.meta.env.VITE_DOG_API_KEY);
    let res = [];
    if (!localStorage.getItem("dogAPI")) {
      console.log("I CALLED THE API");
      // console.log(starterBreeds);
      // const images = (await Promise.all(
      //   starterBreeds.map((breed) =>
      //     fetch(
      //       `${
      //         import.meta.env.VITE_THE_DOG_API_URL
      //       }/v1/breeds/search?q=${breed}&attach_image=1`,

      //       {
      //         method: "GET",
      //         headers: {
      //           "Content-Type": "application/json",
      //           "x-api-key": import.meta.env.VITE_DOG_API_KEY,
      //         },
      //       }
      //     )
      //       .then((res) => res.json())
      //   )
      // )).flat();
      // console.log(images.map(image => image.image.url));
      const result = starterBreeds.forEach(async (breed) => {
        console.log(breed);
        // submitDogImageParams(
        //   `/v1/breeds/search?q=${breed}&attach_image=1`,
        //   {
        //     headers: { "x-api-key": import.meta.env.VITE_DOG_API_KEY },
        //   },
        //   import.meta.env.VITE_THE_DOG_API_URL
        // );
        const response = await fetch(
          `${
            import.meta.env.VITE_THE_DOG_API_URL
          }/v1/breeds/search?q=${breed}&attach_image=1`,

          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": import.meta.env.VITE_DOG_API_KEY,
            },
          }
        );
      });
      console.log(result);
    } else {
      console.log("I PULLED THE DATA FROM LOCAL STORAGE");
      const data = localStorage.getItem("dogAPI");
      const arrayOfImages = data ? JSON.parse(data) : [];
      console.log(arrayOfImages.map((breed) => breed.name));
      console.log(arrayOfImages);
      setCarouselBreeds(arrayOfImages);
    }
    console.log(res);
  }
  useEffect(() => {
    setTimeout(() => {
      submitDogListParams("/dogs/breeds");
    }, 2000);
  }, []);
  useEffect(() => {
    if (breedData) {
      console.log(breedData);
      setBreeds(breedData);
      getStarterBreedImages();
      // setCarouselBreeds(getRandomBreeds());
      // console.log(carouselBreeds)
    }
  }, [breedData]);

  useEffect(() => {
    if (imageData) {
      // console.log(imageData);
      // localStorage.setItem("dogAPI", imageData);
      // const localDogImages = localStorage.getItem("dogAPI")
      // if (localStorage.getItem("dogAPI")) {
      //   setCarouselBreeds(localDogImages)
      // } else {
      // }
      console.log(imageData);
      // TODO: change to session storage if want different options
      localStorage.setItem("dogAPI", JSON.stringify(imageData));
      setCarouselBreeds(imageData);
    }
  }, [imageData]);

  return (
    <div className="home-container">
      <div className="flex flex-row h-[900px] overflow-x-auto">
        <Carousel
          opts={{
            align: "center",
          }}
          className="flex justify-center align-middle w-[80%] ml-40 max-w-70 mt-10"
        >
          <CarouselContent className="flex justify-center">
            {carouselBreeds.length > 0 &&
              carouselBreeds.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 h-[400px]"
                >
                  <Card className="w-full h-[400px]">
                    <CardContent className="p-0 h-[400px]">
                      <AspectRatio ratio={16 / 9} className="h-[400px]">
                        <img
                          src="https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_1271.jpg"
                          alt="Image"
                          className="w-full h-[400px] object-cover rounded-md"
                        />
                      </AspectRatio>
                    </CardContent>
                  </Card>
                </CarouselItem>
                // <div
                //   className="flex items-center justify-center w-[400px] h-[400px]"
                //   // className="flex items-center justify-center w-[400px] h-[400px] overflow-hidden transition-all duration-300 hover:w-[600px]"
                //   key={Math.random()}
                // >
                //   {/* <img
                //     className="w-[700px] h-[400px] object-cover object-center transition-all duration-300 hover:w-[900px]"
                //     src={image.image.url}
                //   /> */}
                //   <AspectRatio ratio={4 / 3}>
                //   {console.log(image.image.url)}
                //     <img
                //       src={image.image.url}
                //       alt="Image"
                //       className="rounded-md object-contain w-[600px] h-[600px] "
                //     />
                //   </AspectRatio>
                // </div>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
