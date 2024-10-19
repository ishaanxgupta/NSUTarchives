import React, { useState, useEffect } from "react";
import Post from "./Post";
import postsData from "../data/posts.json";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Snackbar, Alert, Avatar, InputAdornment, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useUser } from "@clerk/clerk-react";

function Intern_home() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [open, setOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      console.log(isSignedIn);
      setOpen(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      setPosts(postsData);
    }
  }, [isSignedIn, navigate]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) =>
    post.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="p-6 bg-teal-900 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          {user?.fullName}, Welcome to Archives!
        </h1>

        {/* Interactive Search Bar */}
        <div className="mb-6 flex justify-center">
          <TextField id="standard-basic"
            label="Search by company name"
            variant="filled"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-lg bg-white rounded"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearchQuery("")}>
                    ❌ 
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        {/* Displaying filtered posts */}
        <div className="space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.slice().reverse().map((post) => (
              <Accordion
                key={post.id}
                className="shadow-md rounded-lg overflow-hidden"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${post.id}-content`}
                  id={`panel${post.id}-header`}
                  className="bg-white hover:bg-gray-200 transition-colors duration-300"
                >
                  <img
                    src={post.logo}
                    alt={post.username}
                    className="w-15 h-12 rounded-md mr-4 object-cover"
                  />
                  <div className="mt-0.5">
                    <Typography>{post.username}</Typography>
                    <div className="text-sm text-gray-500">
                      Updated At: <span>{post.date}</span> |{" "}
                      <span>{post.time}</span>
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails className="bg-yellow-300">
                  <Post
                    category={post.category}
                    location={post.location}
                    CGPA_criteria={post.CGPA_criteria}
                    backlog={post.backlogs}
                    branches={post.branches}
                  />
                  <Link
                    to={`/intern/details/${post.id}`}
                    className="text-blue-500 hover:underline mt-2 block"
                  >
                    Read More
                  </Link>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Typography variant="h6" color="white" align="center">
              No companies found matching "{searchQuery}"
            </Typography>
          )}
        </div>
        <div>
        </div>
      </div>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          You are not logged in! Redirecting to sign-in page...
        </Alert>
      </Snackbar>
      <Footer />
    </div>
  );
}

export default Intern_home;
