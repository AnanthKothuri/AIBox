import React, { useState, useEffect } from 'react';
import './FadeComponent.css'; // Import CSS file with transition styles

// takes in fade, fadeOut, delay
function FadeComponent(props) {
  const [isVisible, setIsVisible] = useState(props.fadeOut);

  useEffect(() => {
    if (!props.fade) {return}
    // Set visibility to true after a delay
    const timeoutId = setTimeout(() => {
      setIsVisible(!props.fadeOut);
    }, props.delay); // Adjust delay time as needed

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, [props.fade]);

  return (
    <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
        {props.children}
    </div>
  );
}

export default FadeComponent;
