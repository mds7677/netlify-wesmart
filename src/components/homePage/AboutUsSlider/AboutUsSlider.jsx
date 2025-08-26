import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import styles from "../../../pages/HomeV2/HomeV2.module.scss";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import useDeviceDetection from "../../../hooks/useDeviceDetection";
import { useDispatch, useSelector } from "react-redux";
import {
  selectWrittenAboutSlider,
  selectWrittenAboutSliderMedia,
} from "../../../store/selectors/content/homeSelectors";
import {
  fetchWrittenAboutSlider,
  fetchWrittenAboutSliderMedia,
} from "../../../store/api/content";
import { BASE_URL_BACKEND_FOR_MEDIA } from "../../../const/api";

const AboutUsSlider = () => {
  const { t } = useTranslation();
  const device = useDeviceDetection();
  const dispatch = useDispatch();
  const isHebrew = localStorage.getItem("language") === "heb";

  const language = localStorage.getItem("language") === "heb" ? "he" : "en";

  const writtenAboutSliderData = useSelector((state) =>
    selectWrittenAboutSlider(state, language)
  );

  const writtenAboutSliderMediaData = useSelector((state) =>
    selectWrittenAboutSliderMedia(state, language)
  );

  useEffect(() => {
    if (!writtenAboutSliderData) {
      dispatch(fetchWrittenAboutSlider(language));
    }
  }, [dispatch, language, writtenAboutSliderData]);

  useEffect(() => {
    if (!writtenAboutSliderMediaData) {
      dispatch(fetchWrittenAboutSliderMedia(language));
    }
  }, [dispatch, language, writtenAboutSliderMediaData]);

  useEffect(() => {
    console.log("Written About Slider Data:", writtenAboutSliderData);
  }, [writtenAboutSliderData]);

  useEffect(() => {
    console.log(
      "Written About Slider Media Data:",
      writtenAboutSliderMediaData
    );
  }, [writtenAboutSliderMediaData]);

  const contentData =
    writtenAboutSliderData?.Slides?.map((slide, index) => ({
      text: slide.title,
      logoAuthor: (
        <div className={styles.logoAuthor}>
          <img
            src={`${BASE_URL_BACKEND_FOR_MEDIA}/${writtenAboutSliderMediaData?.Slides?.[index]?.logo}`}
            alt="no-images"
          />
          <span>{slide.logo_name}</span>
        </div>
      ),
    })) || [];

  // Состояние для отслеживания текущего индекса
  const [currentIndex, setCurrentIndex] = useState(0);

  // Обработчики нажатий на стрелки
  const handleRightArrowClick = () => {
    if (currentIndex < contentData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleLeftArrowClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <motion.div
      className={`${styles.writtenAboutUs} ${language === "heb" ? styles.hebFont : styles.enFont}`}
      style={{ top: device === "Mobile" ? "227vh" : "314vh" }}
    >
      <div className={`${styles.blockName} ${language === "heb" ? styles.hebFont : styles.enFont}`}>{t("written_about_us")}</div>
      <div>
        <div
          className={styles.blockTitle}
          style={{
            letterSpacing: isHebrew ? "-1px" : "normal",
            lineHeight:
              device === "Mobile" ? "40px" : isHebrew ? "3vw" : "3.2vw",
          }}
        >
          {contentData[currentIndex]?.text}
        </div>

        <div style={{ whiteSpace: "pre-line" }} className={styles.blockName}>
          {writtenAboutSliderData && writtenAboutSliderData?.Block?.description}
          {contentData[currentIndex]?.logoAuthor}
        </div>
      </div>

      {/* Отображение стрелок в зависимости от языка */}
      {isHebrew ? (
        <>
          {currentIndex > 0 && (
            <div className={styles.rightArrow} onClick={handleLeftArrowClick}>
              <GoArrowRight style={{ color: "#363B61" }} size={35} />
            </div>
          )}
          {currentIndex < contentData.length - 1 && (
            <div className={styles.leftArrow} onClick={handleRightArrowClick}>
              <GoArrowLeft style={{ color: "#363B61" }} size={35} />
            </div>
          )}
        </>
      ) : (
        <>
          {currentIndex < contentData.length - 1 && (
            <div className={styles.rightArrow} onClick={handleRightArrowClick}>
              <GoArrowRight style={{ color: "#363B61" }} size={35} />
            </div>
          )}
          {currentIndex > 0 && (
            <div className={styles.leftArrow} onClick={handleLeftArrowClick}>
              <GoArrowLeft style={{ color: "#363B61" }} size={35} />
            </div>
          )}
        </>
      )}

      <div className={styles.bgImage}>
        <img src="/images/aboutWrittenAboutUs.svg" alt="no-image" />
      </div>

      {/* Навигационные точки */}
      <div className={styles.dotsContainer}>
        {contentData.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              currentIndex === index ? styles.active : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default AboutUsSlider;
