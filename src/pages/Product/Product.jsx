import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Footer from "../../components/footer/Footer";
import styles from "./Product.module.scss";
import Form from "../../components/Form/Form";
import TrueFooter from "../../components/TrueFooter/TrueFooter";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useTranslation } from "react-i18next";
import Modal from "../../components/homePage/ModalForm/ModalForm";
import useDeviceDetection from "../../hooks/useDeviceDetection";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductDetailsCards,
  selectProductDetailsGeneral,
  selectProductDetailsGeneralMedia,
} from "../../store/selectors/content/productsSelectors";
import {
  fetchProductDetailsCards,
  fetchProductDetailsGeneral,
  fetchProductDetailsGeneralMedia,
} from "../../store/api/content/productsApi";

const Product = () => {
  const { slug } = useParams();
  const device = useDeviceDetection();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isRtl, setIsRtl] = useState(false);
  const [scrollInstance, setScrollInstance] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const handleClickAllProducts = () => {
    navigate("/products");
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

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
    scrollYProgress.onChange((latest) => {
      const scrollPercentage = latest * 100;
    });

    return () => {
      if (scroll) scroll.destroy();
    };
  }, [scrollYProgress]);

  useEffect(() => {
    if (scrollInstance) {
      if (isMenuOpen) {
        scrollInstance.stop();
      } else {
        scrollInstance.start();
      }
    }
  }, [isMenuOpen, scrollInstance]);

  const currentLanguage = localStorage.getItem("language");

  const generalData = useSelector((state) =>
    selectProductDetailsGeneral(state, currentLanguage, slug)
  );

  const cardsData = useSelector((state) =>
    selectProductDetailsCards(state, currentLanguage, slug)
  );

  const mediaData = useSelector((state) =>
    selectProductDetailsGeneralMedia(state, slug)
  );

  useEffect(() => {
    setIsRtl(currentLanguage === "heb");
  }, [currentLanguage]);

  useEffect(() => {
    if (slug && !generalData) {
      dispatch(fetchProductDetailsGeneral({ slug, language: currentLanguage }));
    }
  }, [slug, currentLanguage, generalData]);

  useEffect(() => {
    if (slug && !cardsData) {
      dispatch(fetchProductDetailsCards({ slug, language: currentLanguage }));
    }
  }, [slug, currentLanguage, cardsData]);

  useEffect(() => {
    if (slug && !mediaData?.intro_image) {
      dispatch(fetchProductDetailsGeneralMedia({ slug }));
    }
  }, [slug, dispatch, mediaData]);

  const contentBlockRef = useRef(null);
  const safetyRefs = useRef([]);

  return (
    <div data-scroll-container ref={scrollRef}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${mediaData?.intro_image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <Footer
              transparent={true}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
            <div className={styles.headSection}>
              <div
                className={styles.textTitle}
                style={{
                  fontFamily: "Lato, sans-serif",
                  fontSize: device === "Mobile" ? "6.8vw" : "5.4vw",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  whiteSpace: "pre-line",
                  textAlign: "justify",
                }}
              >
                {generalData && generalData?.intro_title}
              </div>
              <div
                className={styles.textContent}
                style={{ textAlign: "justify" }}
              >
                {generalData && generalData?.intro_description}
              </div>
              <div
                className={styles.button}
                onClick={handleModalOpen}
                onClose={handleModalClose}
              >
                <span className={styles.buttonText}>
                  {generalData && generalData?.intro_title_button}
                </span>
              </div>
              <div className={styles.wrapper} style={{ height: "auto" }}></div>
            </div>
          </div>
        </div>
      </div>
      <div
        data-scroll-section
        style={{
          position: "relative",
          zIndex: 2,
          background: "transparent",
          width: "100%",
          marginTop: "100vh",
        }}
      >
        <>
          <motion.div
            className={styles.contentBlock}
            style={{ minHeight: "300px" }}
            ref={contentBlockRef}
          >
            <div className={styles.ourMission}>
              <div
                className={styles.backButton}
                onClick={handleClickAllProducts}
              >
                {isRtl ? (
                  <GoArrowRight
                    className={styles.arrow}
                    style={{ fontSize: device === "Mobile" ? "22px" : "64px" }}
                  />
                ) : (
                  <GoArrowLeft
                    className={styles.arrow}
                    style={{ fontSize: device === "Mobile" ? "22px" : "64px" }}
                  />
                )}
                <div className={styles.descText} style={{ cursor: "pointer" }}>
                  {t("VIEW_ALL_OTHER_PRODUCTS")}
                </div>
              </div>
              <div>
                <div
                  className={styles.titleText}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {generalData && generalData.common_title}
                </div>
                <div className={styles.textContent}>
                  {generalData && generalData.common_description}
                </div>
              </div>
            </div>
          </motion.div>
          {cardsData?.product_pages_card &&
            Array.isArray(cardsData.product_pages_card) &&
            cardsData.product_pages_card.map((card, index) => {
              if (!safetyRefs.current[index]) {
                safetyRefs.current[index] = React.createRef();
              }
              return (
                <motion.div
                  key={index}
                  ref={safetyRefs.current[index]}
                  className={styles.safety}
                  style={{
                    justifyContent:
                      device === "Mobile" ? "flex-start" : "space-between",
                    marginTop: device === "Mobile" ? "-6vw" : "-3vw",
                    paddingTop: device === "Mobile" ? "0" : "",
                    backgroundColor: index % 2 === 0 ? "" : "#F5F7FA",
                  }}
                >
                  <div
                    style={{
                      order: device === "Mobile" ? 1 : index % 2 === 0 ? 1 : 2,
                      padding:
                        device === "Mobile"
                          ? ""
                          : "150px 0 calc(150px + 3vw) 0",
                    }}
                  >
                    <img
                      src={card.image}
                      alt="no-image"
                      className={styles.smallImage}
                      style={{
                        border: "1px solid transparent",
                        borderRadius: "30px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      paddingLeft: device === "Mobile" ? "7vw" : "0",
                      paddingRight: device === "Mobile" ? "7vw" : "0",
                      order: device === "Mobile" ? 2 : index % 2 === 0 ? 2 : 1,
                      minWidth: "45%",
                      width: device === "Mobile" ? "100%" : "",
                    }}
                  >
                    <div className={styles.titleText}>{card.title}</div>
                    <div
                      className={styles.textContent}
                      style={{ color: "rgba(67, 74, 83, 1)" }}
                    >
                      {card.description}
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </>
        <Form
          style={{
            position: "relative",
            height: "auto",
            paddingTop: "11vw",
            paddingBottom: "15vw",
            marginTop: "-6vw",
          }}
        />
        <TrueFooter
          style={{
            marginTop: "-8vw",
            height: "auto",
          }}
        />
      </div>
      <Modal isVisible={isModalVisible} onClose={handleModalClose} />
    </div>
  );
};

export default Product;
