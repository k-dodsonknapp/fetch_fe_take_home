import React from "react";
import getCookie from "../utils/get-cookie";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

function LogoutButton() {
  const navigate = useNavigate();
  async function handleLogout () {
    try {
      const cookie = getCookie("fetch-access");
      if (cookie) {
        try {
          document.cookie =
          "fetch-access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
          const res = await fetch(
            "https://frontend-take-home-service.fetch.com/auth/logout",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
          navigate("/login");
        } catch (error) {
          console.error(toString(error));
        }
      }
    } catch (error) {
      console.error(toString(error));
    }
  }
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
