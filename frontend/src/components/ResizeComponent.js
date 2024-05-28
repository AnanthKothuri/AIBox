import React, { useState, useEffect } from 'react';
import './FadeComponent.css'; // Import CSS file with transition styles

// takes in startH, endH, startResize, delay
function ResizeComponent(props) {
  const [isResized, setIsResized] = useState(false);

  const resizeStyle = {
    height: isResized ? props.endH : props.startH,
    transition: 'height 0.5s ease-in-out',
  }

  useEffect(() => {
    if (!props.startResize) {return}

    const timeoutId = setTimeout(() => {
        setIsResized(true);
    }, props.delay); // Adjust delay time as needed

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, [props.startResize]);

  return (
    <div style={resizeStyle}>
        {props.children}
    </div>
  );
}

export default ResizeComponent;
