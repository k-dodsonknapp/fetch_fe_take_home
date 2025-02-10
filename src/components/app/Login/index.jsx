import { useState, useEffect } from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/Forms/LoginForm";
import dogPic from "@/assets/daphne(2).jpg"

export default function Login() {

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a
            href="TODO direct to about page? remove 'pointer-events-none' -> "
            className="flex items-center gap-2 font-medium pointer-events-none"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Puppy Finder
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={dogPic}
          alt="My dog Daphne!"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-300"
        />
      </div>
    </div>
  );
}
