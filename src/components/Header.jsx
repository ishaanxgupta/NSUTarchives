import React, { useState } from "react";
import { AppBar, Button, Menu, MenuItem, Typography } from "@mui/material";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Header() {
  const { isSignedIn, user } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Get first two letters of the user's name
  const name = user?.fullName || "User";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className="bg-white shadow-md">
  <div className="flex justify-between items-center px-3 py-2" style={{ backgroundColor: "black" }}>
    {/* Navigation Links */}
    <div className="space-x-4">
  {["Home", "Intern", "FTE", "Upsolve", "Codecast"].map((label) => (
    <Link
      key={label}
      to={`/${label.toLowerCase()}`}
      className="relative inline-block p-px font-semibold text-white shadow-2xl rounded-xl cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 group"
    >
      <span
        className="absolute inset-0 bg-gradient-to-r from-teal-500 via-blue-500 to-green-500 p-[1px] rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      ></span>
      <span className="relative z-10 block px-6 py-2 rounded-xl bg-black">
        <div className="relative z-10 flex items-center space-x-2">
          <span className="transition-all duration-500">
            {label}
          </span>
        </div>
      </span>
    </Link>
  ))}
</div>


        {/* User's initials with dropdown */}
        <div>
          <Button
            onClick={handleMenuClick}
            style={{
              backgroundColor: "#0092ca",
              color: "white",
              width: "40px",
              height: "40px",
              minWidth: "40px", // Ensure button is not stretched horizontally
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              padding: 0,
              borderRadius: "50%", // Perfect circle
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight:"10px"
            }}
          >
            {initials}
          </Button>
          <Menu className="mt-1" anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>{name}</MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <SignOutButton>Log Out</SignOutButton>
            </MenuItem>
          </Menu>
        </div>
        </div>
    </AppBar>
  );
}

export default Header;

