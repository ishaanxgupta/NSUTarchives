import React, { useState, useEffect } from "react";
import Post from "./Post";
import postsData from "../data/posts.json";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Header from "./Header";

function Intern_home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(postsData); 
  }, []);

  return (
    <div>
      <div className=""><Header /></div>
    <div className="p-6 bg-teal-900 min-h-screen">
<h1 className="text-3xl font-bold mb-6 text-center text-white ">Welcome to my Nsut Archives!</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <Accordion key={post.id} className="shadow-md rounded-lg overflow-hidden">
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
                 Updated At: <span>{post.date}</span> | <span>{post.time}</span>
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
              <Link to={`/details/${post.id}`} className="text-blue-500 hover:underline mt-2 block">Read More</Link>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      <div><Footer></Footer></div>
    </div>
    </div>
  );
}

export default Intern_home;
