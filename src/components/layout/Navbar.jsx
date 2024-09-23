import React, { useState } from "react";
import logo from "../../assets/Logo.svg";
import { Button } from "antd";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div>
        <nav className="flex items-center justify-between me-4 border-none">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" aria-label="Homepage">
              <img src={logo} alt="Logo" className="h-24" />
            </a>
          </div>

          {/* Hamburger */}
          <div
            className="md:hidden flex flex-col cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-8 h-1 bg-gray-600 mb-1"></div>
            <div className="w-8 h-1 bg-gray-600 mb-1"></div>
            <div className="w-8 h-1 bg-gray-600"></div>
          </div>

          {/* Links */}
          <div
            className={`md:flex ${
              isMenuOpen ? "block" : "hidden"
            } absolute md:static bg-white w-full md:w-auto z-10`}
          >
            <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10 p-4 md:p-0">
              <li>
                <a
                  href="/Home"
                  className="text-gray-600 hover:text-indigo-500"
                  aria-label="Home"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/Property"
                  className="text-gray-600 hover:text-indigo-500"
                  aria-label="Property"
                >
                  Property
                </a>
              </li>
              <li>
                <a
                  href="/About"
                  className="text-gray-600 hover:text-indigo-500"
                  aria-label="About"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/Contact"
                  className="text-gray-600 hover:text-indigo-500"
                  aria-label="Contact"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex items-center ">
            <Button
              type="Default "
              className=" font-semibold shadow rounded-full w-28 h-9  hover:bg-indigo-500 hover:text-white"
            >
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </Button>
            <Button
              type="Dashed  "
              className=" ml-4 font-semibold shadow text-white rounded-full w-28 h-9 bg-indigo-500 hover:text-black "
            >
              Add Property
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
