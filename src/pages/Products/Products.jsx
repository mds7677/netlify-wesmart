import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GoArrowDown } from "react-icons/go";

import styles from "./Products.module.scss";
import Form from "../../components/Form/Form";
import TrueFooter from "../../components/TrueFooter/TrueFooter";
import { useMotionValueEvent } from "framer-motion";
import useDeviceDetection from "../../hooks/useDeviceDetection";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductGeneral,
  selectProductGeneralMedia,
  selectProductSlides,
} from "../../store/selectors/content/productsPageSelector";
import {
  fetchFullSlides,
  fetchGeneralInfo,
  fetchGeneralMedia,
} from "../../store/api/content/productPaggeApi";

const startPosition = 0;
const firstSlideTopStart = startPosition + 0.02;
const firstSlideTopEnd = firstSlideTopStart + 0.1;
const secondSlideTopStart = firstSlideTopEnd;
const secondSlideTopEnd = secondSlideTopStart + 0.1;
const thirdSlideTopStart = secondSlideTopEnd;
const thirdSlideTopEnd = thirdSlideTopStart + 0.1;
const fourthSlideTopStart = thirdSlideTopEnd;
const fourthSlideTopEnd = fourthSlideTopStart + 0.1;
const fifthSlideTopStart = fourthSlideTopEnd;
const fifthSlideTopEnd = fifthSlideTopStart + 0.1;
const sixSlideTopStart = fifthSlideTopEnd;
const sixSlideTopEnd = sixSlideTopStart + 0.1;
const formSlideTopStart = sixSlideTopEnd;
const formSlideTopEnd = formSlideTopStart + 0.1;
const footerSlideTopStart = formSlideTopEnd;
const footerSlideTopEnd = footerSlideTopStart + 0.1;

const Products = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const device = useDeviceDetection();
  const handleClickProduct = (id) => {
    const slide = productSlidesData?.slides?.[id - 1];
    if (slide?.product_card_slug) {
      navigate(`/product/${slide.product_card_slug}`);
    }
  };
  const dispatch = useDispatch();

  const language = localStorage.getItem("language") === "heb" ? "he" : "en";

  const productGeneralData = useSelector((state) =>
    selectProductGeneral(state, language)
  );

  const productGeneralMedia = useSelector((state) =>
    selectProductGeneralMedia(state)
  );

  const productSlidesData = useSelector((state) =>
    selectProductSlides(state, language)
  );

  useEffect(() => {
    if (!productGeneralData) {
      dispatch(fetchGeneralInfo(language));
    }
  }, [dispatch, language, productGeneralData]);

  useEffect(() => {
    if (!productGeneralMedia) {
      dispatch(fetchGeneralMedia());
    }
  }, [dispatch, productGeneralMedia]);

  useEffect(() => {
    if (!productSlidesData) {
      dispatch(fetchFullSlides(language));
    }
  }, [dispatch, language, productSlidesData]);

  useEffect(() => {
    console.log(productSlidesData);
  }, [productSlidesData, language]);

  const formRef = useRef(null);

  const handleScrollToForm = () => {
    if (formRef.current) {
      if (device === "Mobile") {
        window.scrollBy({
          top: 900, // Прокрутить на 100px вниз
          behavior: "smooth",
        });
      } else {
        window.scrollBy({
          top: 1800, // Прокрутить на 100px вниз
          behavior: "smooth",
        });
      }
    }
  };

  const scrollRef = useRef(null);
  const [scrollInstance, setScrollInstance] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibleScreens, setVisibleScreens] = useState({
    first: false,
    second: false,
    third: false,
    fourth: false,
    fifth: false,
    sixth: false,
  });
  const [isRtl, setIsRtl] = useState(false);
  useEffect(() => {
    const languageEff = localStorage.getItem("language");
    setIsRtl(languageEff === "heb");
  }, [language]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      smoothMobile: true,
      inertia: 0.8,
    });
    setScrollInstance(scroll);

    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);
  useEffect(() => {
    if (scrollInstance) {
      if (isMenuOpen) {
        scrollInstance.stop();
      } else {
        scrollInstance.start();
      }
    }
  }, [isMenuOpen, scrollInstance]);

  const { scrollYProgress } = useScroll();
  const transforms = {
    zero: useTransform(
      scrollYProgress,
      [firstSlideTopStart, firstSlideTopEnd],
      [1, 0]
    ),
    zeroDisplay: useTransform(
      scrollYProgress,
      [firstSlideTopStart, firstSlideTopEnd - 0.05],
      ["block", "none"]
    ),
    first: useTransform(
      scrollYProgress,
      [firstSlideTopStart, firstSlideTopEnd],
      ["30vh", "15vh"]
    ),
    firstOpacity: useTransform(
      scrollYProgress,
      [
        firstSlideTopStart,
        firstSlideTopEnd,
        secondSlideTopStart,
        secondSlideTopEnd,
      ],
      [0, 1, 1, 0]
    ),
    secondOpacity: useTransform(
      scrollYProgress,
      [
        secondSlideTopStart,
        secondSlideTopEnd,
        thirdSlideTopStart,
        thirdSlideTopEnd,
      ],
      [0, 1, 1, 0]
    ),
    second: useTransform(
      scrollYProgress,
      [secondSlideTopStart, secondSlideTopEnd],
      ["30vh", "15vh"]
    ),
    thirdOpacity: useTransform(
      scrollYProgress,
      [
        thirdSlideTopStart,
        thirdSlideTopEnd,
        fourthSlideTopStart,
        fourthSlideTopEnd,
      ],
      [0, 1, 1, 0]
    ),
    third: useTransform(
      scrollYProgress,
      [thirdSlideTopStart, thirdSlideTopEnd],
      ["30vh", "15vh"]
    ),
    fourthOpacity: useTransform(
      scrollYProgress,
      [
        fourthSlideTopStart,
        fourthSlideTopEnd,
        fifthSlideTopStart,
        fifthSlideTopEnd,
      ],
      [0, 1, 1, 0]
    ),
    fourth: useTransform(
      scrollYProgress,
      [fourthSlideTopStart, fourthSlideTopEnd],
      ["30vh", "13vh"]
    ),
    fifthOpacity: useTransform(
      scrollYProgress,
      [fifthSlideTopStart, fifthSlideTopEnd, sixSlideTopStart, sixSlideTopEnd],
      [0, 1, 1, 0]
    ),
    fifth: useTransform(
      scrollYProgress,
      [fifthSlideTopStart, fifthSlideTopEnd],
      ["30vh", "15vh"]
    ),
    sixthOpacity: useTransform(
      scrollYProgress,
      [sixSlideTopStart, sixSlideTopEnd],
      [0, 1]
    ),
    sixth: useTransform(
      scrollYProgress,
      [sixSlideTopStart, sixSlideTopEnd],
      ["30vh", "15vh"]
    ),
    form: useTransform(
      scrollYProgress,
      [
        formSlideTopStart,
        formSlideTopEnd,
        footerSlideTopStart,
        footerSlideTopEnd,
      ],
      device === "Mobile"
        ? ["100vh", "5vh", "5vh", "-32vh"]
        : ["100vh", "13vh", "13vh", "-44vh"]
    ),
    trueFooter: useTransform(
      scrollYProgress,
      [footerSlideTopStart, footerSlideTopEnd],
      device === "Mobile" ? ["100vh", "63vh"] : ["100vh", "46vh"]
    ),
  };

  // Hook to handle visibility of each screen based on opacity value
  useMotionValueEvent(transforms.firstOpacity, "change", (value) => {
    setVisibleScreens((prev) => ({ ...prev, first: value > 0 }));
  });

  useMotionValueEvent(transforms.secondOpacity, "change", (value) => {
    setVisibleScreens((prev) => ({ ...prev, second: value > 0 }));
  });

  useMotionValueEvent(transforms.thirdOpacity, "change", (value) => {
    setVisibleScreens((prev) => ({ ...prev, third: value > 0 }));
  });

  useMotionValueEvent(transforms.fourthOpacity, "change", (value) => {
    setVisibleScreens((prev) => ({ ...prev, fourth: value > 0 }));
  });

  useMotionValueEvent(transforms.fifthOpacity, "change", (value) => {
    setVisibleScreens((prev) => ({ ...prev, fifth: value > 0 }));
  });

  useMotionValueEvent(transforms.sixthOpacity, "change", (value) => {
    setVisibleScreens((prev) => ({ ...prev, sixth: value > 0 }));
  });

  const screensData = [
    {
      id: 1,
      subtitle: productSlidesData?.slides?.[0]?.title || "",
      text: productSlidesData?.slides?.[0]?.description || "",
      img: productSlidesData?.slides?.[0]?.image || "",
      styleTop: transforms.first,
      styleOpacity: transforms.firstOpacity,
      appear: visibleScreens.first,
      buttonText: productSlidesData?.slides?.[0]?.title_button || "",
      productSlug: productSlidesData?.slides?.[0]?.product_card_slug || "",
    },
    ...(productSlidesData?.slides?.length > 1
      ? [
          {
            id: 2,
            subtitle: productSlidesData?.slides?.[1]?.title || "",
            text: productSlidesData?.slides?.[1]?.description || "",
            img: productSlidesData?.slides?.[1]?.image || "",
            styleTop: transforms.second,
            styleOpacity: transforms.secondOpacity,
            appear: visibleScreens.second,
            buttonText: productSlidesData?.slides?.[1]?.title_button || "",
            productSlug:
              productSlidesData?.slides?.[1]?.product_card_slug || "",
          },
        ]
      : []),
    ...(productSlidesData?.slides?.length > 2
      ? [
          {
            id: 3,
            subtitle: productSlidesData?.slides?.[2]?.title || "",
            text: productSlidesData?.slides?.[2]?.description || "",
            img: productSlidesData?.slides?.[2]?.image || "",
            styleTop: transforms.third,
            styleOpacity: transforms.thirdOpacity,
            appear: visibleScreens.third,
            buttonText: productSlidesData?.slides?.[2]?.title_button || "",
            productSlug:
              productSlidesData?.slides?.[2]?.product_card_slug || "",
          },
        ]
      : []),
    ...(productSlidesData?.slides?.length > 3
      ? [
          {
            id: 4,
            subtitle: productSlidesData?.slides?.[3]?.title || "",
            text: productSlidesData?.slides?.[3]?.description || "",
            img: productSlidesData?.slides?.[3]?.image || "",
            styleTop: transforms.fourth,
            styleOpacity: transforms.fourthOpacity,
            appear: visibleScreens.fourth,
            buttonText: productSlidesData?.slides?.[3]?.title_button || "",
            productSlug:
              productSlidesData?.slides?.[3]?.product_card_slug || "",
          },
        ]
      : []),
    ...(productSlidesData?.slides?.length > 4
      ? [
          {
            id: 5,
            subtitle: productSlidesData?.slides?.[4]?.title || "",
            text: productSlidesData?.slides?.[4]?.description || "",
            img: productSlidesData?.slides?.[4]?.image || "",
            styleTop: transforms.fifth,
            styleOpacity: transforms.fifthOpacity,
            appear: visibleScreens.fifth,
            buttonText: productSlidesData?.slides?.[4]?.title_button || "",
            productSlug:
              productSlidesData?.slides?.[4]?.product_card_slug || "",
          },
        ]
      : []),
    ...(productSlidesData?.slides?.length > 5
      ? [
          {
            id: 6,
            subtitle: productSlidesData?.slides?.[5]?.title || "",
            text: productSlidesData?.slides?.[5]?.description || "",
            img: productSlidesData?.slides?.[5]?.image || "",
            styleTop: transforms.sixth,
            styleOpacity: transforms.sixthOpacity,
            appear: visibleScreens.sixth,
            buttonText: productSlidesData?.slides?.[5]?.title_button || "",
            productSlug:
              productSlidesData?.slides?.[5]?.product_card_slug || "",
          },
        ]
      : []),
  ].filter(Boolean);

  return (
    <div className={styles.bigContainer} data-scroll-container ref={scrollRef}>
      <div className={styles.stickyBlock} data-scroll-section>
        <motion.div
          className={styles.productsScreenFirst}
          style={{ opacity: transforms.zero }}
        >
          <div
            className={styles.titleText}
            style={{
              fontFamily: "Lato, sans-serif",
              fontSize: device === "Mobile" ? "7vw" : "5.4vw",
              fontWeight: "600",
              textTransform: "uppercase", // Все буквы станут заглавными
              letterSpacing: isRtl ? "-0.05em" : "normal",
              lineHeight:
                device === "Mobile" ? "48px" : isRtl ? "7.6vw" : "7.3vw",
              whiteSpace: "pre-line",
            }}
          >
            {productGeneralData &&
              productGeneralData?.title
                ?.split(/\/color\/(.*?)\/color\//g)
                .map((part, index) => {
                  if (index % 2 === 1) {
                    return (
                      <span
                        key={`${index} Product-title`}
                        className={styles.orange}
                      >
                        {part}
                      </span>
                    ); // Если это часть с маркером /color/
                  }
                  return part;
                })}
          </div>
          <div
            className={styles.defaultText}
            style={{ whiteSpace: "pre-line" }}
          >
            {productGeneralData && productGeneralData?.description}
          </div>
          {productGeneralMedia && (
            <div
              className={styles.imgBackgroundFirst}
              style={{
                right: isRtl ? "unset" : "0vw",
                left: isRtl ? "0vw" : "unset",
                backgroundImage: `url(${productGeneralMedia?.image})`,
              }}
            />
          )}
          {device === "Mobile" && (
            <div className={styles.productDownArrow}>
              <GoArrowDown size={30} color="#363B61" />
            </div>
          )}
          <div className={styles.slideArrow}>
            <span>{t("slide")}</span>
            <div className={styles.arrow} style={{ margin: "0" }}></div>
          </div>
        </motion.div>

        {visibleScreens.first && (
          <motion.div
            className={styles.productsScreen}
            style={{ top: "12vh", opacity: transforms.firstOpacity }}
          >
            <motion.div
              className={styles.wrapper}
              style={{ top: transforms.first }}
            >
              {device === "Mobile" ? (
                // Мобильная версия
                <>
                  <img
                    className={styles.imgBackground}
                    src={productSlidesData?.slides?.[0]?.image}
                    alt="no-image"
                    style={{
                      right: isRtl ? "unset" : "0vw",
                      left: isRtl ? "0vw" : "unset",
                    }}
                  />
                  <div className={styles.numDiv}>
                    <div className={styles.subtitle}>
                      {productSlidesData?.slides?.[0]?.title}
                    </div>
                    <div className={styles.pageNum}> /01</div>
                  </div>
                  <div className={styles.defaultText}>
                    {productSlidesData?.slides?.[0]?.description}
                  </div>
                  <div
                    className={styles.button}
                    onClick={() =>
                      navigate(
                        `/product/${productSlidesData?.slides?.[0]?.product_card_slug}`
                      )
                    }
                  >
                    {productSlidesData?.slides?.[0]?.title_button}
                  </div>
                </>
              ) : (
                // Десктопная версия
                <>
                  <div className={styles.cardContent}>
                    <div className={styles.pageNum}> /01</div>
                    <div className={styles.subtitle}>
                      {productSlidesData?.slides?.[0]?.title}
                    </div>
                    <div className={styles.defaultText}>
                      {productSlidesData?.slides?.[0]?.description}
                    </div>
                    <div
                      className={styles.button}
                      onClick={() =>
                        navigate(
                          `/product/${productSlidesData?.slides?.[0]?.product_card_slug}`
                        )
                      }
                    >
                      {productSlidesData?.slides?.[0]?.title_button}
                    </div>
                  </div>
                  <img
                    className={styles.imgBackground}
                    src={productSlidesData?.slides?.[0]?.image}
                    alt="no-image"
                    style={{
                      right: isRtl ? "unset" : "0vw",
                      left: isRtl ? "0vw" : "unset",
                    }}
                  />
                </>
              )}
            </motion.div>
          </motion.div>
        )}
        {screensData.slice(1, 6).map((screen, index) => {
          const isLastScreen = index === screensData.slice(1, 6).length - 1;

          return (
            screen.appear && (
              <motion.div
                key={screen.id}
                className={styles.productsScreen}
                style={{ top: "12vh", opacity: screen.styleOpacity }}
              >
                <motion.div
                  className={styles.wrapper}
                  style={{ top: screen.styleTop }}
                >
                  {device === "Mobile" ? (
                    <>
                      <img
                        className={styles.imgBackground}
                        src={`${screen.img}`}
                        alt="no-image"
                        style={{
                          right: isRtl ? "unset" : "0vw",
                          left: isRtl ? "0vw" : "unset",
                        }}
                      />
                      <div className={styles.numDiv}>
                        <div className={styles.subtitle}>{screen.subtitle}</div>
                        <div className={styles.pageNum}> /0{screen.id}</div>
                      </div>
                      <div
                        className={styles.defaultText}
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {screen.text}
                      </div>
                      <div
                        className={styles.button}
                        onClick={() => {
                          if (isLastScreen) {
                            handleScrollToForm();
                          } else {
                            handleClickProduct(index + 2);
                          }
                        }}
                      >
                        {screen.buttonText}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.cardContent}>
                        <div className={styles.pageNum}> /0{screen.id}</div>
                        <div className={styles.subtitle}>{screen.subtitle}</div>
                        <div
                          className={styles.defaultText}
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {screen.text}
                        </div>
                        <div
                          className={styles.button}
                          onClick={() => {
                            if (isLastScreen) {
                              handleScrollToForm();
                            } else {
                              handleClickProduct(index + 2);
                            }
                          }}
                        >
                          {screen.buttonText}
                        </div>
                      </div>
                      <img
                        className={styles.imgBackground}
                        src={`${screen.img}`}
                        alt="no-image"
                        style={{
                          right: isRtl ? "unset" : "0vw",
                          left: isRtl ? "0vw" : "unset",
                        }}
                      />
                    </>
                  )}
                </motion.div>
              </motion.div>
            )
          );
        })}

        <Form
          style={{ paddingBottom: "25px" }}
          ref={formRef}
          top={transforms.form}
        />

        <TrueFooter top={transforms.trueFooter} />
      </div>
      <Footer isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
};

export default Products;
