import React, { useState } from "react";
import getCookie from "../utils/get-cookie";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import useFetch from "./app/Hooks/useFetch";

function LogoutButton() {
  const navigate = useNavigate();
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [_, submitLogoutPath] = useFetch({
    method: "POST",
  });

  const handleLogout = () => {
    try {
      setTriggerFetch(true);
      submitLogoutPath("/auth/logout", { method: "POST" });
      document.cookie =
        "fetch-access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      navigate("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setTriggerFetch(false);
    }
  };

  // const handleLogout = () => {
  //   const [{loading: loadingSomething, error: hasError}] = useFetch("/auth/logout", {method: "POST"})
  //   console.log(loadingSomething);
  //   console.log(hasError)
  // }
  // async function handleLogout () {
  //   try {
  //     const cookie = getCookie("fetch-access");
  //     if (cookie) {
  //       try {
  //         document.cookie =
  //         "fetch-access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  //         const res = await fetch(
  //           "https://frontend-take-home-service.fetch.com/auth/logout",
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             credentials: "include",
  //           }
  //         );
  //         navigate("/login");
  //       } catch (error) {
  //         console.error(toString(error));
  //       }
  //     }
  //   } catch (error) {
  //     console.error(toString(error));
  //   }
  // }
  return (
    <Button
      className="relative h-10 w-15 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-all ease-in-out duration-100"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}

export default LogoutButton;
