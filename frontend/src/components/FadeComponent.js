import React, { useState, useEffect } from 'react';
import './FadeComponent.css'; // Import CSS file with transition styles


function FadeComponent(props) {
  const [isVisible, setIsVisible] = useState(props.fadeOut);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    if (!props.fade) {return}
    // Set visibility to true after a delay
    const timeoutId = setTimeout(() => {
      setIsVisible(!props.fadeOut);
    }, props.delay); // Adjust delay time as needed

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, [props.fade]);

  const handleAnimationEnd = () => {
    // If animation ends and component is not visible, unmount the component
    if (!isVisible) {
      setIsMounted(false);
    }
  };

  return (
    <div className={`fade-in ${isVisible ? 'visible' : ''}`} onAnimationEnd={handleAnimationEnd}>
      {isMounted  && (
        <div>
          {props.children}
        </div>
      )}
    </div>
  );
}

export default FadeComponent;
