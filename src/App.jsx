import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SpinningLogo from './SpinningLogo';
import GridItem from './GridItem';
import WordLink from './WordLink';
import StandardNavbar from './StandardNavbar'; // Import the standard navbar component
import VercelProject from './VercelProject';
import VercelProjectPlay from './VercelProjectPlay';
import DesignSystem from './DesignSystem';
import AIA from './AIA';
import SezzleUp from './SezzleUp';
import ImpactSection from './ImpactSection';
import PDFSpaces from './PDFSpaces';
import AppRoutes from './AppRoutes';
import Feedback from './Feedback';
import { FaPause, FaPlay } from 'react-icons/fa';
import About from './About'; // Add this import at the top with other imports
import { motion } from 'framer-motion'; // Add this import at the top

const DEFAULT_HERO_TEXT = "collaboration.";

const IMAGE_MAP = {
  "PDF Spaces": "Spaces.jpg",
  "AI Assistant Discovery": "Splash.jpg",
  "Credit reporting": "sezzle-up.jpg"
};

const HERO_TEXT_MAP = {
  "PDF Spaces": "collaboration.",
  "AI Assistant Discovery": "conversion.",
  "Credit reporting": "trust."
};

const App = () => {
  // Check if coming from case study page
  const urlParams = new URLSearchParams(window.location.search);
  const fromCaseStudy = urlParams.get('fromCaseStudy') === 'true';
  
  const [activePage, setActivePage] = useState('home');
  const [currentImage, setCurrentImage] = useState("Spaces.jpg");
  const [selectedImage, setSelectedImage] = useState("PDF Spaces");
  const sectionsRef = useRef({});
  const [isScrolled, setIsScrolled] = useState(false);
  const [displayText, setDisplayText] = useState(DEFAULT_HERO_TEXT);
  const [isTyping, setIsTyping] = useState(false);
  const [isHeroTransitioning, setIsHeroTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(true);
  const [showNav, setShowNav] = useState(true);
  const [sfTime, setSfTime] = useState('');
  const hasPausedAfterFirstCycleRef = useRef(false);

  // Update San Francisco time
  useEffect(() => {
    const updateSfTime = () => {
      const time = new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      setSfTime(time);
    };
    updateSfTime();
    const interval = setInterval(updateSfTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Scroll reveal animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Scroll handling logic remains the same
  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100) {
        setActivePage('about');
        return;
      }

      const sections = ['home', 'work', 'craft', 'words', 'about'];
      
      sections.forEach((section) => {
        const el = sectionsRef.current[section];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= 0) {
            setActivePage(section);
          }
        }
      });

      const homeSection = sectionsRef.current['home'];
      if (homeSection) {
        const rect = homeSection.getBoundingClientRect();
        if (rect.top > -50) {
          setActivePage('home');
        }
      }

      setIsScrolled(window.scrollY > 0);
    };

    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler);
    handleScroll();
    
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  // Keep return visits from case studies on the default hero without replaying intro animation.
  useEffect(() => {
    if (fromCaseStudy) {
      setCurrentImage("Spaces.jpg");
      setSelectedImage("PDF Spaces");
      setDisplayText(DEFAULT_HERO_TEXT);
      setIsTyping(false);
      setIsHeroTransitioning(false);
      setIsContentLoaded(true);
      setShowNav(true);
      window.history.replaceState({}, '', '/');
    }
  }, [fromCaseStudy]);

  // Update the typeWriter function to return a Promise
  const typeWriter = async (text, delay = 50) => {
    setIsTyping(true);
    setDisplayText('');
    
    return new Promise(resolve => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(text.substring(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setIsTyping(false);
          resolve();
        }
      }, delay);
    });
  };

  // Add new eraseText function
  const eraseText = async (text, delay = 50) => {
    return new Promise(resolve => {
      let i = text.length;
      const interval = setInterval(() => {
        setDisplayText(text.substring(0, i));
        i--;
        if (i < 0) {
          clearInterval(interval);
          resolve();
        }
      }, delay);
    });
  };

  // Modify the existing image rotation useEffect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(async () => {
      const imageKeys = Object.keys(IMAGE_MAP);
      const currentIndex = imageKeys.indexOf(selectedImage);
      const nextIndex = (currentIndex + 1) % imageKeys.length;
      const nextImage = imageKeys[nextIndex];
      const shouldPauseAfterTransition =
        nextImage === "PDF Spaces" && !hasPausedAfterFirstCycleRef.current;
      
      // First erase the current text
      setIsHeroTransitioning(true);
      await eraseText(HERO_TEXT_MAP[selectedImage]);
      
      // Update image after erasing text
      setSelectedImage(nextImage);
      setCurrentImage(IMAGE_MAP[nextImage]);

      // Short pause before typing new text
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Type the new text
      await typeWriter(HERO_TEXT_MAP[nextImage]);
      setIsHeroTransitioning(false);

      if (shouldPauseAfterTransition) {
        hasPausedAfterFirstCycleRef.current = true;
        setIsPaused(true);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [selectedImage, isPaused]);

  // Update the click handler in the right section to include erase effect
  const handleImageClick = async (text) => {
    // Erase current text first
    setIsHeroTransitioning(true);
    await eraseText(HERO_TEXT_MAP[selectedImage]);
    
    // Update image
    setSelectedImage(text);
    setCurrentImage(IMAGE_MAP[text]);
    
    // Short pause before typing new text
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Type new text
    await typeWriter(HERO_TEXT_MAP[text]);
    setIsHeroTransitioning(false);
  };

  const handleNavClick = (page) => {
    setActivePage(page);
    const section = sectionsRef.current[page];
    
    if (page === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else if (section) {
      const sectionTop = section.offsetTop;
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
  };

  const workItems = [
    { 
      title: "AI Assistant", 
      className: "col-span-2 row-span-2", 
      image: "AIA.jpg" 
    },
    { 
      title: "Sezzle Up", 
      className: "col-span-2 row-span-1 bg-purple-500", 
      image: "SezzleUp.jpg" 
    },
    { 
      title: "Design System", 
      className: "col-span-2 row-span-1 bg-yellow-400 text-white", 
      image: "Designsystem.jpg" 
    },
    { 
      title: "Prompt Categories", 
      className: "col-span-2 bg-green-400 text-white", 
      image: "Prompts.jpg" 
    },
    { 
      title: "Feedback UX", 
      className: "col-span-2 row-span-1 bg-gradient-to-r from-green-400 via-yellow-500 to-purple-600", 
      image: "Feedback.jpg" 
    }
  ];

  const impactItems = [
    {
      title: "Women Who Design - Founder",
      description: "WWD is a community supporting and empowering women in design",
      icon: "👩‍💻",
      link: "https://www.instagram.com/womenwhodesign.isu/"
    },
    {
      title: "Advisory Council",
      description: "Advising on curriculum and innovation at my alma mater to shape the future of design education",
      icon: "🎓",
      link: "https://www.instagram.com/p/DCR1rQeuELr/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
    },
    {
      title: "Mentorship",
      description: "Guiding the next generation of designers through 1:1 mentoring",
      icon: "🤝",
      link: "https://adplist.org/mentors/kasturi-khanke"
    }
  ];

  const wordLinks = [
    { 
      text: "The future of conversational interfaces", 
      link: "https://beyondthefold.substack.com/p/the-future-of-conversational-interfaces",
      date: "2024-10-09"
    },
    { 
      text: "The rearview mirror syndrome", 
      link: "https://beyondthefold.substack.com/p/the-rearview-mirror-syndrome",
      date: "2023-09-18"
    },
    { 
      text: "Unveiling user insights", 
      link: "https://beyondthefold.substack.com/p/unveiling-user-insights",
      date: "2023-06-21"
    }
  ];

  const isHeroSettled = !isHeroTransitioning && displayText === HERO_TEXT_MAP[selectedImage];

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen overflow-y-auto bg-white text-gray-900 font-sans">
            <header className={`sticky top-0 z-50 transition-all duration-300 ${
              isScrolled ? 'bg-white/70 backdrop-blur-md border-b border-white/20' : 'bg-white'
            }`}>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-4 flex justify-between items-center">
                <SpinningLogo />
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: showNav ? 0 : 20, opacity: showNav ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <StandardNavbar
                    activePage={activePage}
                    onNavClick={handleNavClick}
                  />
                </motion.div>
              </div>
            </header>
                 
            <main className="min-h-screen container mx-auto px-1 sm:px-2 lg:px-4 max-w-5xl">
              {/* Hero Section */}
              <section 
                id="home" 
                ref={el => sectionsRef.current['home'] = el} 
                className="min-h-screen md:h-full relative"
              >
                <div className="w-full max-w-[90vw] mx-auto px-4 sm:px-6 md:px-8 pt-8 pb-16 md:pb-0 flex flex-col md:flex-row justify-start md:justify-between items-center relative md:absolute md:top-[40%] md:-translate-y-1/2 left-auto md:left-1/2 translate-x-0 md:-translate-x-1/2 gap-3 md:gap-0">
                  {/* Left column - increased width from 25% to 30% */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-right leading-relaxed w-full md:w-[30%] mb-0 z-10"
                    style={{ minWidth: 'auto', maxWidth: '100%' }}
                  >
                    <div className="relative">
                      <h1 className="mobile-hero-title text-2xl sm:text-3xl md:text-4xl font-medium mb-3 md:mb-4 text-gray-900 text-center md:text-left">
                        <motion.span 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.8 }}
                          className="text-sm sm:text-base md:text-lg font-sans font-medium block mb-1 md:mb-2 text-gray-900"
                        >
                          Kasturi is
                        </motion.span>
                        <motion.span 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                          className="font-sans font-bold text-gray-900 leading-tight md:leading-none"
                        >
                          designing for
                          <br />
                          <span className="inline-block">
                            {displayText}
                            {isTyping && (
                              <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{
                                  duration: 0.5,
                                  repeat: Infinity,
                                  repeatType: "reverse"
                                }}
                                style={{ 
                                  display: 'inline-block',
                                  marginLeft: '2px',
                                  fontWeight: 'normal'
                                }}
                              >
                                |
                              </motion.span>
                            )}
                          </span>
                        </motion.span>
                      </h1>
                    </div>

                    {/* Dynamic content container - add overflow handling */}
                    <div className="min-h-[156px] sm:min-h-[176px] md:h-[240px] mt-3 md:mt-4 flex flex-col justify-start md:justify-between overflow-visible items-center md:items-start">
                      <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-gray-900 min-h-0 md:min-h-[100px] md:h-[120px] text-center md:text-left max-w-[22rem] md:max-w-none">
                        {isHeroSettled && selectedImage === "PDF Spaces" && (
                          <div>
                            <span className="font-sans font-light opacity-0 animate-fade-in-stat whitespace-nowrap text-sm sm:text-base md:text-lg">Shared document understanding</span>
                            <p className="text-sm sm:text-base font-normal mt-2 opacity-0 animate-fade-in-description">
                              Turned scattered PDFs into a collaborative workspace for sharing, orientation, and AI-guided action.
                            </p>
                          </div>
                        )}
                        {isHeroSettled && selectedImage === "AI Assistant Discovery" && (
                          <div>
                            <span className="font-sans font-light opacity-0 animate-fade-in-stat whitespace-nowrap text-sm sm:text-base md:text-lg">↑ in conversion rate</span>
                            <p className="text-sm sm:text-base font-normal mt-2 opacity-0 animate-fade-in-description">
                              Drove discovery and engagement for a newly launched AI assistant through strategic in-product promotion.
                            </p>
                          </div>
                        )}
                        {isHeroSettled && selectedImage === "Credit reporting" && (
                          <div>
                            <span className="font-sans font-light opacity-0 animate-fade-in-stat whitespace-nowrap text-sm sm:text-base md:text-lg">70% ↑ in conversion rate</span>
                            <p className="text-sm sm:text-base font-normal mt-2 opacity-0 animate-fade-in-description">
                              Led end-to-end design for the first BNPL credit reporting flow—key to landing a partnership with Target.
                            </p>
                          </div>
                        )}
                      </div>
                      
                      {/* CTA button - added mt-8 for more spacing */}
                      <div className="mt-3 md:mt-8 text-center md:text-left">
                        {(selectedImage === "PDF Spaces" ||
                          selectedImage === "AI Assistant Discovery" ||
                          selectedImage === "Credit reporting") && (
                          <a
                            href={selectedImage === "PDF Spaces"
                              ? "/pdf-spaces"
                              : selectedImage === "AI Assistant Discovery"
                              ? "/aia"
                              : "/sezzle-up"
                            }
                            className="inline-block"
                          >
                            <button className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-black text-black flex items-center gap-2 text-sm sm:text-base hover:bg-black hover:text-white transition-colors duration-300 ${
                              isHeroSettled ? 'opacity-0 animate-fade-in-3' : 'opacity-0'
                            }`}>             
                              read case study →
                            </button>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Center image section - adjusted width to maintain proportions */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ 
                      opacity: isContentLoaded ? 1 : 0,
                      scale: isContentLoaded ? 1 : 0.95
                    }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="w-full md:w-[50%] flex items-center justify-center -mt-3 md:mt-2 mb-0 md:mb-4 md:my-0 md:h-[76vh]"
                    style={{
                      minHeight: '280px',
                      height: 'auto',
                      WebkitTransform: 'translate3d(0, 0, 0)',
                      transform: 'translate3d(0, 0, 0)'
                    }}
                  >
                    <div className="hero-image-container relative w-full flex items-center justify-center" style={{ minHeight: 'inherit' }}>
                      <img 
                        src={currentImage}
                        alt="Profile"
                        className="block w-full max-w-[280px] sm:max-w-[360px] md:max-w-full md:max-h-[70vh] object-contain mx-auto md:animate-float"
                        style={{
                          transition: 'all 0.4s ease-in-out',
                          display: 'block',
                          WebkitTransform: 'translate3d(0, 0, 0)',
                          transform: 'translate3d(0, 0, 0)',
                          WebkitBackfaceVisibility: 'hidden',
                          backfaceVisibility: 'hidden'
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Right section - removed negative margin */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: isContentLoaded ? 1 : 0,
                      x: isContentLoaded ? 0 : 20
                    }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="hidden md:flex flex-col justify-center space-y-4 w-[20%] z-10"
                  >
                    {Object.keys(IMAGE_MAP).map((text) => (
                      <div
                        key={text}
                        className={`text-sm whitespace-nowrap font-medium cursor-pointer transition-all duration-500 ease-in-out ${
                          selectedImage === text 
                            ? 'text-indigo-600 opacity-100 translate-x-2' 
                            : 'text-gray-900 hover:text-gray-600 opacity-50'
                        }`}
                        onClick={() => handleImageClick(text)}
                      >
                        {text}
                      </div>
                    ))}
                    <div className="flex justify-start mt-2">
                      <button
                        onClick={() => setIsPaused(!isPaused)}
                        className="p-2 text-gray-900 opacity-50 hover:text-gray-600 hover:opacity-50 active:text-indigo-600 active:opacity-100 transition-colors"
                        aria-label={isPaused ? "Resume rotation" : "Pause rotation"}
                      >
                        {isPaused ? <FaPlay size={16} /> : <FaPause size={16} />}
                      </button>
                    </div>
                  </motion.div>

                  {/* Mobile navigation for image selection */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: isContentLoaded ? 1 : 0,
                      y: isContentLoaded ? 0 : 20
                    }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="md:hidden w-full mt-2 pb-6 z-10"
                  >
                    <div className="flex flex-wrap gap-2 justify-center max-w-[22rem] mx-auto">
                      {Object.keys(IMAGE_MAP).map((text) => (
                        <button
                          key={text}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                            selectedImage === text 
                              ? 'text-indigo-600 bg-indigo-50 border border-indigo-200' 
                              : 'text-gray-600 bg-gray-50 border border-gray-200'
                          }`}
                          onClick={() => handleImageClick(text)}
                        >
                          {text}
                        </button>
                      ))}
                      <button
                        onClick={() => setIsPaused(!isPaused)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 transition-colors"
                        aria-label={isPaused ? "Resume rotation" : "Pause rotation"}
                      >
                        {isPaused ? <FaPlay size={12} /> : <FaPause size={12} />}
                      </button>
                    </div>
                  </motion.div>
                </div>
              </section>
          
              {/* Work Section 
              <section 
                id="work" 
                ref={el => sectionsRef.current['work'] = el} 
                className="mt-16 lg:mt-24 mb-32 scroll-mt-24"
              >
                <div className="mx-8">
                  <h2 className="text-2xl md:text-4xl font-sans font-medium mb-12 text-gray-900">Explore my work</h2>
                  <div className="grid grid-cols-4 gap-6 aspect-square w-full">
                    {workItems.map((item, index) => (
                      <GridItem 
                        key={index} 
                        className={item.className} 
                        image={item.image} 
                        index={index} 
                      />
                    ))}
                  </div>
                </div>
              </section>*/}

              {/* Craft Section
              <section 
                id="craft" 
                ref={el => sectionsRef.current['craft'] = el} 
                className="mb-32 scroll-mt-24"
              >
                <div className="mx-8">
                  <h2 className="text-2xl md:text-4xl font-medium mb-12 text-gray-900">Craft</h2>
                  <div className="grid grid-cols-12 grid-rows-8 gap-6">
                    <div className="col-span-6 row-span-4 bg-gray-950 shadow-xl rounded-3xl overflow-hidden">
                      <VercelProject />
                    </div>
                    <div className="col-span-6 row-span-4 bg-gray-950 shadow-xl rounded-3xl overflow-hidden">
                      <VercelProjectPlay />
                    </div>
                    <div className="col-span-6 row-span-4 bg-gray-50 shadow-lg rounded-3xl overflow-hidden p-8">
                      <video 
                        className="w-full h-full object-cover rounded-2xl"
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                      >
                        <source src="wordgenerator.mov" type="video/mp4" />
                      </video>
                    </div>
                    <div className="col-span-6 row-span-4 bg-gray-50 shadow-lg rounded-3xl overflow-hidden">
                      <iframe
                        src="https://cards-wine-chi.vercel.app/"
                        className="w-full h-full border-0"
                        title="Cards Demo"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </section> */}

              {/* Words Section
              <section 
                id="words" 
                ref={el => sectionsRef.current['words'] = el} 
                className="mb-16 scroll-mt-24"
              >
                <div className="mx-8">
                  <h2 className="text-2xl md:text-4xl font-medium mb-12 text-gray-900">Some thoughts</h2>
                  <div className="space-y-8">
                    {wordLinks.map((link, index) => (
                      <div key={index}>
                        {index > 0 && (
                          <hr className="border-gray-200 my-8" />
                        )}
                        <div className="space-y-2">
                          <time className="text-sm text-gray-500">
                            {new Date(link.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </time>
                          <WordLink 
                            text={link.text} 
                            link={link.link} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section> */}
              
              {/* Impact Section 
              <section 
                id="about"
                ref={el => sectionsRef.current['about'] = el} 
              >
                <ImpactSection impactItems={impactItems} />
              </section>*/}
            </main>

            {/* Contact Section / Footer */}
            <section className="bg-gray-950 text-white pt-16 sm:pt-24 md:pt-32 pb-0 overflow-hidden">
              {/* Top Content Area */}
              <div className="container mx-auto px-6 sm:px-8 md:px-12 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
                  
                  {/* About Column */}
                  <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">about</p>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                      Kasturi is a product designer<br />
                      crafting AI-powered experiences<br />
                      that drive measurable impact<br />
                      and delight users.
                    </p>
                  </div>

                  {/* Contact Column */}
                  <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-100">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">contact</p>
                    <a 
                      href="mailto:kasturi.khanke@gmail.com"
                      className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300 block"
                    >
                      kasturi.khanke@gmail.com
                    </a>
                  </div>

                  {/* Social Column */}
                  <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out delay-200">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">social</p>
                    <a 
                      href="https://www.linkedin.com/in/kasturikhanke/"
                      className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300 block"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Copyright Bar - Above Name */}
              <div className="container mx-auto px-6 sm:px-8 md:px-12 max-w-6xl mt-16 sm:mt-24 md:mt-32">
                <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out py-6 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-16 items-center">
                  <p className="text-sm text-gray-400 text-center md:text-left">
                    © 2026 Kasturi Khanke
                  </p>
                  <p className="text-sm text-gray-400 text-center md:text-left">
                    San Francisco, CA · {sfTime}
                  </p>
                  <p className="text-sm text-gray-400 text-center md:text-left">
                    Made with ♥ using Claude + Cursor
                  </p>
                </div>
              </div>

              {/* Large Name - Full Width, Clipped at Bottom */}
              <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out overflow-hidden">
                <h3 
                  className="text-[12vw] sm:text-[14vw] md:text-[12vw] font-bold tracking-tighter leading-none whitespace-nowrap text-center select-none translate-y-[25%]"
                  style={{
                    color: 'white',
                  }}
                >
                  KASTURI KHANKE
                </h3>
              </div>
            </section>

            {/*<section className="bg-gray-950 text-white py-32">
              <div className="container mx-auto md:px-8">
                <h2 className="text-3xl md:text-6xl pl-12 mb-4 max-w-2xl font-normal">
                  Let's build the future of AI design together
                </h2>
                <p className="text-5xl text-gray-500 pl-12 font-normal">
                  <a 
                    href="https://calendly.com/kasturi-khanke/30min?month=2024-11"
                    className="text-2xl md:text-3xl transition-colors duration-300 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get in touch
                  </a>
                </p>
                <p className="text-sm text-gray-500 pl-12 mt-8">
                  Made with ♥ using Claude AI
                </p>
              </div>
            </section>*/}
          </div>
        } />
        <Route path="/design-system" element={<DesignSystem />} />
        <Route path="/aia" element={<AIA />} />
        <Route path="/sezzle-up" element={<SezzleUp />} />
        <Route path="/pdf-spaces" element={<PDFSpaces />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
