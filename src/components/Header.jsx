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
      {/* Custom div container for the header */}
      <div className="flex justify-between items-center px-3 py-2 " style={{ backgroundColor: "black" }}>
        {/* Navigation Links */}
        <div className="space-x-4">
          <Link to="/" className="text-white border border-blue-600 rounded-md px-2 py-1 transition-colors duration-300 hover:bg-blue-600 hover:text-white">
            Home
          </Link>
          <Link to="/intern" className="text-white border border-blue-600 rounded-md px-2 py-1 transition-colors duration-300 hover:bg-blue-600 hover:text-white">
            Intern
          </Link>
          <Link to="/fte" className="text-white border border-blue-600 rounded-md px-2 py-1 transition-colors duration-300 hover:bg-blue-600 hover:text-white">
            FTE
          </Link>
          <Link
            to="/upsolve"
            className="text-white border border-blue-600 rounded-md px-2 py-1 transition-colors duration-300 hover:bg-blue-600 hover:text-white">
            Upsolve
          </Link>
          <Link
            to="/codecast"
            className="text-white border border-blue-600 rounded-md px-2 py-1 transition-colors duration-300 hover:bg-blue-600 hover:text-white">
            Codecast
          </Link>
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
            }}
          >
            {initials}
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
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

