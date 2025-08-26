import React from "react";
import { motion } from "framer-motion";
import styles from "../../../pages/About/About.module.scss";
import { useNavigate } from "react-router-dom";
import useDeviceDetection from "../../../hooks/useDeviceDetection";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAboutMainBlock } from "../../../store/selectors/content/aboutPageSelectors";
import { fetchAboutPageMainBlock } from "../../../store/api/content/aboutPageApi";

const TitleSection = ({ ourLanguage, top }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const device = useDeviceDetection();
  const handleClickAllProducts = () => {
    navigate("/products");
  };
  const [isRtl, setIsRtl] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const language = localStorage.getItem("language");

    setIsRtl(language === "heb");
  }, []);

  const aboutMainData = useSelector((state) =>
    selectAboutMainBlock(state, ourLanguage)
  );

  useEffect(() => {
    if (!aboutMainData) {
      dispatch(fetchAboutPageMainBlock(ourLanguage));
    }
  }, [dispatch, ourLanguage, aboutMainData]);

  return (
    <motion.div className={styles.titleBlock} style={{ top: top }}>
      <div
        className={styles.title}
        style={{
          fontFamily: isRtl ? "Arimo, sans-serif" : "Lato, sans-serif",
          fontSize: device === "Mobile" ? "7vw" : "5.4vw",
          fontWeight: "600",
          textTransform: "uppercase", // Все буквы станут заглавными
          letterSpacing: isRtl ? "-0.05em" : "normal",
          lineHeight: device === "Mobile" ? "48px" : isRtl ? "7.6vw" : "7.3vw",
          whiteSpace: "pre-line",
        }}
      >
        {aboutMainData &&
          aboutMainData?.title
            ?.split(/\/color\/(.*?)\/color\//g)
            .map((part, index) => {
              if (index % 2 === 1) {
                return (
                  <span
                    key={`${index} TitleSection-title`}
                    className={styles.orange}
                  >
                    {t(part)}
                  </span>
                ); // Если это часть с маркером /color/
              }
              return t(part);
            })}
      </div>
      <div className={`${styles.descriptionBlock} ${ isRtl ? styles.hebFont : styles.enFont}`}>
        <div className={styles.subtitle}>{t("ABOUT_US")}</div>
        <div style={{ whiteSpace: "pre-line" }} className={styles.text}>
          {aboutMainData && aboutMainData?.description}
        </div>
      </div>
      <div className={`${styles.videoContainer} ${ isRtl ? styles.hebFont : styles.enFont}`}>
        <div className={styles.imageMobileDiv}>
          <img src="/images/aboutVideo.svg" alt="no-image" />
        </div>
        <div className={styles.wrapper}></div>
        {device === "Mobile" ? (
          <div className={styles.videoTitleContainer}>
            <div className={styles.ourVision}>{t("OUR_VISION")}</div>
            <div
              style={{ whiteSpace: "pre-line" }}
              className={styles.videoTitle}
            >
              {isRtl ? (
                <>{aboutMainData && aboutMainData?.textOnImage}</>
              ) : (
                <>{aboutMainData && aboutMainData?.textOnImage}</>
              )}
            </div>
          </div>
        ) : (
          <div style={{ whiteSpace: "pre-line" }} className={styles.videoTitle}>
            {aboutMainData && aboutMainData?.textOnImage}
          </div>
        )}

        <div className={styles.videoButton} onClick={handleClickAllProducts}>
          <span className={styles.buttonText}>{aboutMainData?.buttonText}</span>
        </div>
        <div className={styles.maskedMan}>
          <div
            className={styles.naz}
            style={{ fontSize: device === "Mobile" && isRtl ? "13px" : "24px" }}
          >
            {t("MASKED_MAN")}
          </div>
        </div>
        <div className={styles.gun}>
          <div
            className={styles.naz}
            style={{ fontSize: device === "Mobile" && isRtl ? "13px" : "24px" }}
          >
            {t("GUN")}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TitleSection;
