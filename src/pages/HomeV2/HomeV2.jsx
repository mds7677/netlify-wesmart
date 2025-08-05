import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Footer from "../../components/footer/Footer";
import { useTranslation } from "react-i18next";
import styles from "./HomeV2.module.scss";
import Form from "../../components/Form/Form";
import TrueFooter from "../../components/TrueFooter/TrueFooter";
import { GoArrowDown } from "react-icons/go";

import Customers from "../../components/homePage/Customers/Customers";
import Modal from "../../components/homePage/ModalForm/ModalForm";
import Map from "../../components/Map/Map";
import AdvantagesSlider from "../../components/homePage/AdvantagesSlider/AdvantagesSlider";
import AboutUsSlider from "../../components/homePage/AboutUsSlider/AboutUsSlider";
import useDeviceDetection from "../../hooks/useDeviceDetection";
import { useDispatch, useSelector } from "react-redux";
import { selectHome } from "../../store/selectors/content/homeSelectors";
import { fetchHome } from "../../store/api/content/homeApi";
import { selectProductsDescription } from "../../store/selectors/content/productsSelectors";
import { fetchProductsDescription } from "../../store/api/content/productsApi";
import { BASE_URL_BACKEND } from "../../const/api";

const startPosition = 0;
const slideStart = startPosition + 0.32;
const slideEnd = slideStart + 0.08;
const rotateStart = startPosition;
const rotateEnd = rotateStart + 0.11;
const endPosition = 1;

const HomeV2 = () => {
  const { t } = useTranslation();
  const [isRtl, setIsRtl] = useState(false);
  const device = useDeviceDetection();
  const dispatch = useDispatch();
  const language = localStorage.getItem("language");

  const homeScreenData = useSelector((state) =>
    selectHome(state, language === "heb" ? "heb" : "en")
  );

  const productsDescription = useSelector((state) =>
    selectProductsDescription(state, language === "heb" ? "heb" : "en")
  );

  useEffect(() => {
    const currentLang = language === "heb" ? "heb" : "en";
    if (!productsDescription) {
      dispatch(fetchProductsDescription(currentLang));
    }
  }, [dispatch, language, productsDescription]);

  useEffect(() => {
    const currentLang = language === "heb" ? "heb" : "en";
    if (!homeScreenData) {
      dispatch(fetchHome(currentLang));
    }
  }, [dispatch, language, homeScreenData]);

  useEffect(() => {
    setIsRtl(language === "heb");
  }, [language]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const handleClickAllProducts = () => {
    navigate("/products");
  };

  const [scrollInstance, setScrollInstance] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      smoothMobile: true,
      inertia: 0.8,
    });
    setScrollInstance(scroll);
    window.scrollTo(0, 0);
    scrollYProgress.onChange((latest) => {
      const scrollPercentage = latest * 100;
      // console.log(`Page scrolled: ${scrollPercentage}%`);
    });
    return () => {
      if (scroll) scroll.destroy();
    };
  }, [scrollYProgress, device]);
  useEffect(() => {
    if (scrollInstance) {
      if (isMenuOpen) {
        scrollInstance.stop();
      } else {
        scrollInstance.start();
      }
    }
  }, [isMenuOpen, scrollInstance]);

  const anim = useTransform(
    scrollYProgress,
    [rotateEnd + 0.02, slideStart, slideEnd, endPosition],
    device === "Mobile"
      ? ["100vh", "0vh", "0vh", "-350vh"]
      : ["100vh", "-20vh", "-20vh", "-444vh"]
  );

  const rotate = useTransform(
    scrollYProgress,
    [rotateStart, rotateEnd],
    [0, 360]
  );
  const circleOpacity = useTransform(scrollYProgress, [0, 0.11], [1, 0]);

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.2],
    device === "Mobile"
      ? ["circle(0% at 62.5vw 47vh)", "circle(150% at 62.5vw 47vh)"]
      : ["circle(0% at 54.5vw 67vh)", "circle(150% at 54.5vw 67vh)"]
  );

  const slideLeft = useTransform(
    scrollYProgress,
    [0.32, 0.4],
    isRtl
      ? device === "Mobile"
        ? ["0vw", "370vw"]
        : ["0vw", "80vw"]
      : device === "Mobile"
      ? ["0vw", "-370vw"]
      : ["0vw", "-80vw"]
  );

  const videoRef = useRef(null);
  const [videoKey, setVideoKey] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((error) => {
        console.warn("Autoplay failed:", error);
      });
    }
  }, [videoKey]);

  const handleVideoError = () => {
    console.warn("Video failed to load, retrying...");
    setVideoKey((prev) => prev + 1);
  };

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((error) => {
        console.warn("Video replay failed:", error);
      });
    }
  };

  return (
    <div className={styles.bigContainer} data-scroll-container ref={scrollRef}>
      {console.log(device)}
      <div className={styles.stickyBlock} data-scroll-section>
        <div className={styles.headSection} style={{ zIndex: 1 }}>
          <div className={styles.bigCircle} />
          <div className={styles.midCircle}>
            <motion.img
              style={{ rotate, opacity: circleOpacity }}
              className={styles.midCircleImage}
              src="/images/loader.svg"
              alt="no-image"
            />
          </div>
          <div className={styles.smallCircle} />
          <div
            className={styles.textTitle}
            style={{
              color: "rgba(54, 59, 97, 1)",
              letterSpacing: isRtl ? "-0.05em" : "normal",
              fontFamily: "Open Sans, sans-serif",
              fontSize: device === "Mobile" ? "7vw" : "5.9vw",
              fontWeight: "600",
              textTransform: "uppercase", // Все буквы станут заглавными
              lineHeight:
                device === "Mobile" ? "48px" : isRtl ? "8.6vw" : "8vw",
              whiteSpace: "pre-line",
            }}
          >
            {homeScreenData && homeScreenData?.title}
          </div>
          <div
            className={styles.textContent}
            style={{ color: "rgba(54, 59, 97, 1)" }}
          >
            {homeScreenData && homeScreenData?.description}
          </div>
          <div
            className={styles.button}
            onClick={handleModalOpen}
            onClose={handleModalClose}
          >
            <span className={styles.buttonText}>
              {homeScreenData && homeScreenData?.button_title}
            </span>
          </div>
          <div className={styles.arrow}>
            <GoArrowDown
              className={styles.arrowDown}
              style={{
                marginTop: device === "Mobile" ? "20vw" : 0,
                marginRight: device === "Mobile" && isRtl ? "75vw" : 0,
              }}
              size={30}
            />
          </div>
        </div>

        <motion.div
          className={styles.headSection}
          style={{ zIndex: 2, clipPath }}
        >
          <div className={styles.whiteCircle}>
            <motion.img
              style={{ rotate, opacity: circleOpacity }}
              className={styles.midCircleImage}
              src="/images/loader.svg"
              alt="no-image"
            />
          </div>
          <div
            className={styles.textTitle}
            style={{
              letterSpacing: isRtl ? "-0.05em" : "normal",

              lineHeight:
                device === "Mobile" ? "48px" : isRtl ? "8.6vw" : "8.8vw",
            }}
          ></div>
          <div className={styles.textContent}> </div>

          <div
            className={` ${styles.button} ${styles.buttonPosition}`}
            style={{
              marginBottom: device === "Mobile" ? "-25vh" : 0,
            }}
            onClick={handleModalOpen}
            onClose={handleModalClose}
          >
            <span className={styles.buttonText}>{t("button_home")}</span>
          </div>

          <video
            ref={videoRef}
            key={videoKey}
            className={styles.homeBG}
            src={`${BASE_URL_BACKEND}/main-page/video/stream/`}
            autoPlay
            loop
            muted
            playsInline
            onEnded={handleVideoEnd}
            onError={handleVideoError}
          />
          <div className={styles.wrapper}></div>
        </motion.div>

        <motion.div className={styles.pageContainer} style={{ top: anim }}>
          <motion.div className={styles.contentBlock}>
            <div className={styles.ourMission}>
              <div>
                <div
                  className={styles.titleText}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {productsDescription && productsDescription?.title}
                </div>
                <div
                  className={styles.textContent}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {productsDescription && productsDescription?.description}
                </div>
              </div>
            </div>
            <div className={styles.slideArrow}>
              <span>{t("slide")}</span>
              <div className={styles.arrow} style={{ margin: "0" }}></div>
            </div>
          </motion.div>

          <AdvantagesSlider left={slideLeft} />
          <Map />
          <motion.div
            className={styles.safety}
            style={{
              backgroundColor: "rgba(255, 255, 255, 1)",
              top: device === "Mobile" ? "130vh" : "222vh",
            }}
          >
            <Customers />
          </motion.div>
          <AboutUsSlider />

          <Form top={device === "Mobile" ? "318vh" : "400vh"} />
          <TrueFooter top={device === "Mobile" ? "415vh" : "490vh"} />
        </motion.div>
      </div>
      <Modal isVisible={isModalVisible} onClose={handleModalClose} />
      <Footer
        transparent={false}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
    </div>
  );
};

export default HomeV2;
