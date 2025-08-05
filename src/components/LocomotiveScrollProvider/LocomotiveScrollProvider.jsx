import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { useLocation } from 'react-router-dom';

const LocomotiveScrollProvider = ({ children }) => {
  const scrollRef = useRef(null);
  const location = useLocation();
  const scrollInstance = useRef(null);

  useEffect(() => {
   
    scrollInstance.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      smoothMobile: true,
      inertia: 0.8,
    });

    return () => {
      if (scrollInstance.current) scrollInstance.current.destroy();
    };
  }, []);

  useEffect(() => {
    
    setTimeout(() => {
      if (scrollInstance.current) {
        scrollInstance.current.update();
      }
    }, 1000);
  }, [location.pathname]); 

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  );
};

export default LocomotiveScrollProvider;
