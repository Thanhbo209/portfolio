import NavItems from "@/components/layout/NavItems";
import { Offside } from "next/font/google";

export const offsideFont = Offside({
  subsets: ["latin"],
  weight: ["400"],
});
const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-inner gap-4">
        <div className="mr-20">
          <h1 className={`text-2xl py-4 ${offsideFont.className}`}>
            THANH PHAM
          </h1>
        </div>

        <NavItems />
      </div>
    </header>
  );
};

export default Navbar;
