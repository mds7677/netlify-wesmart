import { useState, useEffect } from "react";

const useDeviceDetection = () => {
  const [device, setDevice] = useState("");

  useEffect(() => {
    const handleDeviceDetection = () => {
      const width = window.innerWidth;
      
      if (width <= 768) {
        setDevice("Mobile");
      } else if (width <= 1024) {
        setDevice("Tablet");
      } else {
        setDevice("Desktop");
      }

      // Старая версия на основе userAgent
      // const userAgent = navigator.userAgent.toLowerCase();
      // const isMobile =
      //   /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
      // const isTablet =
      //   /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);

      // if (isMobile) {
      //   setDevice("Mobile");
      // } else if (isTablet) {
      //   setDevice("Tablet");
      // } else {
      //   setDevice("Desktop");
      // }
    };

    handleDeviceDetection();
    window.addEventListener("resize", handleDeviceDetection);

    return () => {
      window.removeEventListener("resize", handleDeviceDetection);
    };
  }, []);

  return device;
};

export default useDeviceDetection;
