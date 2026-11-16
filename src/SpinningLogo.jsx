import React, { useState, useEffect } from 'react';

// Keep the same entrance and replay animation wherever the shared header appears.
export function SpinningLogoImage() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <img
      src="/LogoK.png"
      alt=""
      width="40"
      height="40"
      onAnimationEnd={() => setHasEntered(true)}
      className={`w-10 aspect-square object-contain motion-reduce:animate-none ${
        hasEntered
          ? 'group-hover:animate-spin-three-times group-focus-visible:animate-spin-three-times'
          : 'animate-spin-three-times'
      }`}
    />
  );
}

const SpinningLogo = ({ onLogoClick }) => {
  const [isInitialSpin, setIsInitialSpin] = useState(true);

  useEffect(() => {
    setIsInitialSpin(true);
    const timer = setTimeout(() => {
      setIsInitialSpin(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      window.location.href = 'https://kasturi.live';
    }
  };

  return (
    <div className="py-4">
      <img
        src="/LogoK.png"
        alt="Logo K"
        onClick={handleClick}
        className={`w-10 aspect-square object-contain cursor-pointer ${
          isInitialSpin ? 'animate-spin-three-times' : 'hover:animate-spin-three-times'
        }`}
      />
    </div>
  );
};

export default SpinningLogo;
