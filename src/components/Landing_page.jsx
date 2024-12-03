import React, { useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
// import { AnimatedBackground } from 'animated-backgrounds'; 
import { Fade } from 'react-awesome-reveal';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import './flip.css'; 
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close'; 
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { teal,orange,yellow } from '@mui/material/colors';
import Typewriter from './TypeWriter';
import Header from './Header';
import useScrollAnimation from '../Hooks/useScrollAnimation';
import Footer from './Footer';
import Suggestion_form from './Suggestion_form';
import Like_Button from './Like_Button';

export default function Landing_page() {
  const features = [
    {
      id: 1,
      title: 'Archives',
      icon: 'bi bi-book', 
      description: 'Explore intern details and other company-related information.',
      background: 'url(https://www.ags-recordsmanagement.com/wp-content/uploads/sites/5/2023/04/history-of-public-archives.jpg)',
    },
    {
      id: 2,
      title: 'CodeCast',
      icon: 'bi bi-laptop', 
      description: 'Collaborate with others to code and chat in real-time.',
      background: 'url(https://img.freepik.com/premium-photo/closeup-computer-screen-displaying-flowing-green-code-evoking-digital-atmosphere_1262542-153859.jpg)',
    },
    {
      id: 3,
      title: 'Upsolve',
      icon: 'bi bi-lightbulb', 
      description: 'Solve previous online assessment questions using a compiler.',
      background: 'url(https://captureisg.com/wp-content/uploads/2017/05/shutterstock_373670722.jpg)',
    },
  ];

  const featureTitleRef = useRef(null);
  const pricingTitleRef = useRef(null);
  useScrollAnimation([featureTitleRef.current, pricingTitleRef.current]);


  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-black">
  <div className="bubble-container"></div>
        {/* <div className="bg-color:black"> 
          <AnimatedBackground animationName="cosmicDust" style={{ opacity: 0.85 }} />
        </div> */}

        <div className="relative z-10 px-4 md:px-8">
        <Fade cascade damping={0.2} direction="down" triggerOnce>
    <h1
      className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
      style={{
        background: "linear-gradient(to right, #007BFF, #20c997)",
        WebkitBackgroundClip: "text",
        color: "transparent",
        fontFamily: "'Poppins', sans-serif", 
      }}
    >
      Welcome to Our Website
    </h1>
  </Fade>

  <p className="text-md sm:text-lg lg:text-xl text-gray-200 mb-8" style={{ fontFamily: "'Roboto', sans-serif" }}>
    <Typewriter text="Your one-stop solution for exploring exciting features!" delay={30} />
  </p>
          
          <Link to="features-section" smooth={true} duration={1200}>
          <button class="group group-hover:before:duration-500 group-hover:after:duration-1000 after:duration-500 hover:border-sky-300  duration-500 before:duration-500 hover:duration-500  underline-offset-2    hover:after:-right-2 hover:before:top-8 hover:before:right-16 hover:after:scale-150 hover:after:blur-none hover:before:-bottom-8 hover:before:blur-none hover:bg-sky-300 hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-sky-900 relative bg-sky-800 h-16 w-64 text-left p-5 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-sky-400 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-cyan-600 after:right-8 after:top-3 after:rounded-full after:blur">
  Get Started <ArrowForwardIcon></ArrowForwardIcon>
</button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      
  <section id="features-section" className="py-16 bg-black text-white text-center">
        <h2 
        // ref={featureTitleRef}
        className="section-title text-3xl md:text-4xl font-bold mb-8">
          Our Features
        </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16">
    {features.map((feature) => (
      <div key={feature.id} className="group perspective">
        <div className="relative w-full h-64 bg-teal-200 rounded-lg shadow-lg transform-style-3d transition-transform duration-500 card-flip">
          {/* Front Side */}
          <div
            className="absolute inset-0 backface-hidden flex flex-col justify-center items-center"
            style={{ backfaceVisibility: 'hidden' }} // Ensures front is hidden after flip
          >
            <i className={`${feature.icon} text-6xl text-teal-600 mb-4`}></i>
            <h3 className="text-2xl font-semibold text-gray-800">{feature.title}</h3>
          </div>

          {/* Back Side with background image */}
          <div
            className="absolute inset-0 text-white p-6 rounded-lg backface-hidden flex justify-center items-center card-back"
            style={{
              backgroundImage: feature.background,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backfaceVisibility: 'hidden', // Ensures back content is cleanly displayed
            }}
          >
            {/* Adding a semi-transparent layer for the background image */}
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent dark layer
              }}
            ></div>

            {/* Text with clear visibility */}
            <p className="relative text-center text-bold p-4 rounded-lg z-10">
              {feature.description}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

     {/* Pricing Section */}
<section id="pricing-section" className="py-16 bg-gray-100 text-black text-center">
  <h2 className="section-title text-3xl md:text-4xl font-bold mb-8">Pricing Plans</h2>

  <div className="flex flex-wrap justify-center items-stretch px-6 gap-6">
    {/* Free Model */}
    <div className="rounded-2xl shadow-lg p-3 bg-orange-400 text-black max-w-xs">
      <div className="relative flex flex-col items-center p-5 pt-10 bg-orange-100 rounded-xl">
        <span className="mt-[-12px] absolute top-0 right-0 flex items-center bg-orange-500 rounded-l-full py-2 px-3 text-xl font-semibold text-amber-100">
          Free
        </span>
        <p className="text-xl font-semibold text-orange-800 bg-orange-200 px-2 py-1 rounded-lg">Free Model</p>
        <p className="text-center mt-3">Access to Archives and CodeCast for free.</p>
        <ul className="flex flex-col space-y-3 mt-4">
          <li className="flex items-center space-x-2">
            <span className="flex items-center justify-center w-5 h-5 bg-teal-500 text-white rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" fill="currentColor"></path>
              </svg>
            </span>
            <span>Access to Archives</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="flex items-center justify-center w-5 h-5 bg-teal-500 text-white rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" fill="currentColor"></path>
              </svg>
            </span>
            <span>Access to CodeCast</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="flex items-center justify-center w-5 h-5 bg-red-500 text-white rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" fill="currentColor"></path>
              </svg>
            </span>
            <span>No access to Upsolve</span>
          </li>
        </ul>
        <div className="w-full flex justify-end mt-6">
          <a className="w-full py-3 text-center text-white bg-orange-500 rounded-lg font-medium text-lg hover:bg-orange-600" href="#">
            Choose plan
          </a>
        </div>
      </div>
    </div>

    {/* Upsolve Pro */}
    <div className="rounded-2xl shadow-lg p-3 bg-indigo-500 text-gray-600 max-w-xs">
      <div className="relative flex flex-col items-center p-5 pt-10 bg-blue-100 rounded-xl">
        <span className="mt-[-12px] absolute top-0 right-0 flex items-center bg-indigo-500 rounded-l-full py-2 px-3 text-xl font-semibold text-amber-100">
          ₹50 <small className="text-xs ml-1 text-white">/ 2 weeks</small>
        </span>
        <p className="text-xl font-semibold text-blue-800 bg-indigo-200 px-2 py-1 rounded-lg">Upsolve Pro</p>
        <p className="text-center mt-3">Access all features, including Upsolve for coding practice.</p>
        <ul className="flex flex-col space-y-3 mt-4">
          <li className="flex items-center space-x-2">
            <span className="flex items-center justify-center w-5 h-5 bg-teal-500 text-white rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" fill="currentColor"></path>
              </svg>
            </span>
            <span>Access to Archives</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="flex items-center justify-center w-5 h-5 bg-teal-500 text-white rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" fill="currentColor"></path>
              </svg>
            </span>
            <span>Access to CodeCast</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="flex items-center justify-center w-5 h-5 bg-teal-500 text-white rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" fill="currentColor"></path>
              </svg>
            </span>
            <span>Access to Upsolve</span>
          </li>
        </ul>
        <div className="w-full flex justify-end mt-6">
          <a className="w-full py-3 text-center text-white bg-indigo-600 rounded-lg font-medium text-lg hover:bg-indigo-700" href="#">
            Choose plan
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
<div className='bg-slate-100'>
<div className='bg-black rounded-bl-full rounded-tr-full'>
  <div className="flex space-x-56">
    {/* Left aligned form */}
    <Suggestion_form />
    
    {/* Right aligned text */}
    <div className="flex flex-col mt-4">
      <div className='ml-12'>
        <img src="/feedback1.png" alt="Feedback" className='w-80 h-80' />
        </div>
      <div className="text-white text-3xl font-semibold text-center"
       style={{
        background: "linear-gradient(to right, #007BFF, #20c997)",
        WebkitBackgroundClip: "text",
        color: "transparent",    
      }}>
        We Would Love to hear from you!
      </div>
    </div>
  </div>
  </div>
  </div>
{/* <div><Like_Button/></div> */}
    </div>
  );
}
