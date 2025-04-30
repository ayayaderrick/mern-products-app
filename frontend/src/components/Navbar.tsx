import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-col sm:flex-row max-w-6xl items-center justify-between mx-auto py-4 px-5">
      <Link to={"/"} className="uppercase text-xl sm:text-3xl font-semibold">
        product store
      </Link>
      <div className="flex items-center space-x-2">
        <Link to={"/create"}>
          <Button className="cursor-pointer">
            <Plus />
          </Button>
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
