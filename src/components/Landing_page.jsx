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
import { teal,orange,yellow } from '@mui/material/colors';
import Typewriter from './TypeWriter';
import Header from './Header';
import useScrollAnimation from '../Hooks/useScrollAnimation';
import Footer from './Footer';

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
        fontFamily: "'Poppins', sans-serif", // or Playfair Display for a more royal feel
      }}
    >
      Welcome to Our Website
    </h1>
  </Fade>

  <p className="text-md sm:text-lg lg:text-xl text-gray-200 mb-8" style={{ fontFamily: "'Roboto', sans-serif" }}>
    <Typewriter text="Your one-stop solution for exploring exciting features!" delay={30} />
  </p>
          
          <Link to="features-section" smooth={true} duration={1200}>
            <button className="text-white border border-blue-600 rounded-md px-2 py-1 transition-colors duration-300 hover:bg-teal-500 hover:text-white"
            style = {{
                border: "2px solid",
            }}
            >
              Get Started
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
      <section id = "pricing-section"className="py-16 bg-gray-100 text-black text-center">
        <h2 
        ref={pricingTitleRef}
        className="section-title text-3xl md:text-4xl font-bold mb-8">
          Pricing Plans
        </h2>

        <Grid container spacing={4} justifyContent="center" alignItems="stretch" px={6}>
          {/* Free Model */}
          <Grid item xs={12} md={6}>
            <Card raised sx={{ height: '100%' }}>
              <CardHeader
                title="Free Model"
                sx={{
                  backgroundColor: orange[400],
                  color: 'white',
                  textAlign: 'center',
                  fontSize: '1.5rem'
                }}
              />
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: teal[500] }} />
                    </ListItemIcon>
                    <ListItemText primary="Access to Archives" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: teal[500] }} />
                    </ListItemIcon>
                    <ListItemText primary="Access to CodeCast" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CloseIcon sx={{ color: 'red' }} />
                    </ListItemIcon>
                    <ListItemText primary="Access to Upsolve" />
                  </ListItem>
                </List>
                <Typography variant="h6" sx={{ mt: 4 }}>
                  Price: Free
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Upsolve Pro */}
          <Grid item xs={12} md={6}>
            <Card raised sx={{ height: '100%' }}>
              <CardHeader
                title="Upsolve Pro"
                sx={{
                  backgroundColor: yellow[600],
                  color: 'black',
                  textAlign: 'center',
                  fontSize: '1.5rem'
                }}
              />
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: teal[500] }} />
                    </ListItemIcon>
                    <ListItemText primary="Access to Archives" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: teal[500] }} />
                    </ListItemIcon>
                    <ListItemText primary="Access to CodeCast" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: teal[500] }} />
                    </ListItemIcon>
                    <ListItemText primary="Access to Upsolve" />
                  </ListItem>
                </List>
                <Typography variant="h6" sx={{ mt: 4 }}>
                  Price: ₹50 for 2 weeks
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </section>


      <Footer />
    </div>
  );
}
