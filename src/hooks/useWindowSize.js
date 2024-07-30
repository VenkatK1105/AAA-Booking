import { useState, useEffect } from 'react';
import { debounce } from 'lodash'; // Optional for debouncing

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Debounced resize handler
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 200);

    // Add event listener
    window.addEventListener('resize', handleResize);
    handleResize(); // Call handler immediately to set initial size

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;