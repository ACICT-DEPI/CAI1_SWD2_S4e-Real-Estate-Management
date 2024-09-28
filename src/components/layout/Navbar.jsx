import React, { useState } from "react";
import logo from "../../assets/Logo.svg";
import { Button } from "antd";
import {
  SignIn,
  SignInButton,
  SignUp,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { BriefcaseBusiness, DotIcon } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setShowSignUp(false);
    }
  };
  return (
    <>
      <div>
        <nav className="flex items-center justify-between me-4 border-none">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="Company Logo" className="h-24" />
            </Link>
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
              isMenuOpen ? "block mt-20 md:mt-0 " : "hidden mt-0"
            } absolute md:static  w-full md:w-auto z-10`}
          >
            <ul className="flex flex-col bg-white md:flex-row space-y-4 md:space-y-0 md:space-x-10 p-4 md:p-0">
              <li className="flex">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-indigo-500"
                  aria-label="Home"
                >
                  Home
                </Link>
                <p
                  className="ms-64 md:hidden sm:block "
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  &#9932;
                </p>
              </li>
              <li>
                <Link
                  to="/property"
                  className="text-gray-600 hover:text-indigo-500"
                  aria-label="Property"
                >
                  Property
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-indigo-500"
                  aria-label="About"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-indigo-500"
                  aria-label="Contact"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className=" flex gap-5 items-center ">
            <SignedOut>
              <Button
                variant="outline"
                className=" font-semibold shadow rounded-full w-28 h-9 "
                onClick={() => setShowSignUp(true)}
              >
                SignUp
              </Button>
              <Button
                type="Dashed  "
                className="  font-semibold shadow text-white rounded-full w-28 h-9 bg-indigo-500 hover:bg-indigo-600 "
                onClick={() => setShowSignIn(true)}
              >
                SignIn
              </Button>
            </SignedOut>
            <SignedIn>
              <Button
                type="Dashed  "
                className="  font-semibold shadow text-white rounded-full w-24 h-9 bg-indigo-500 hover:bg-indigo-600 "
                style={{ fontSize: "11px" }}
              >
                Add Property
              </Button>
              <Link to="/"></Link>

              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Orders"
                    labelIcon={<BriefcaseBusiness size={15} />}
                    href="/OrderComponent"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          </div>
        </nav>
      </div>
      {showSignUp && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleOverlay}
        >
          <SignUp />
        </div>
      )}
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleOverlay}
        >
          <SignIn />
        </div>
      )}
    </>
  );
};

export default Navbar;
