import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ["AI designer", "service designer", "accessibility advocate"];

const Preloader = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 500);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onLoadingComplete, 250);
    }, 650);

    return () => {
      clearInterval(wordInterval);
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black flex items-center justify-center z-50"
        >
          <motion.h1
            key={currentWordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="text-white text-4xl font-light text-center"
          >
            {words[currentWordIndex]}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
