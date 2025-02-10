import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import ModeToggle from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LogoutButton from "../LogoutButton";

const Navbar = () => {
  return (
    <div className={cn("sticky top-0 z-50 bg-opacity-70 backdrop-blur-md")}>
      <nav className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Link to="/">Puppy Finder</Link>
        </div>
        <div className="flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList className="space-x-2">
              <NavigationMenuItem>
                <ModeToggle />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <LogoutButton/>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
      <Separator />
    </div>
  );
};

export default Navbar;
