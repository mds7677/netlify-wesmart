import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import styles from "../../../pages/About/About.module.scss";
import { useTranslation } from "react-i18next";
import useDeviceDetection from "../../../hooks/useDeviceDetection";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAboutThesesBlocks,
  selectAboutThesesBlocksMedia,
} from "../../../store/selectors/content/aboutPageSelectors";
import {
  fetchAboutThesesBlocks,
  fetchAboutThesesBlocksMedia,
} from "../../../store/api/content/aboutPageApi";
import { BASE_URL_BACKEND_FOR_MEDIA } from "../../../const/api";

const ValueSection = ({
  top,
  opacity1,
  opacity2,
  opacity3,
  opacity4,
  opacity5,
  ourLanguage,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null); // Хранит индекс карточки, на которую наведена мышь
  const device = useDeviceDetection();
  const { t } = useTranslation();
  const [isRtl, setIsRtl] = useState(false); // Состояние для проверки языка
  const dispatch = useDispatch();

  useEffect(() => {
    const language = localStorage.getItem("language"); // или ваш ключ
    setIsRtl(language === "heb"); // true, если иврит
  }, []);

  const thesesBlocksData = useSelector((state) =>
    selectAboutThesesBlocks(state, ourLanguage)
  );

  const thesesBlocksDataMedia = useSelector((state) =>
    selectAboutThesesBlocksMedia(state)
  );

  useEffect(() => {
    if (!thesesBlocksData) {
      dispatch(fetchAboutThesesBlocks(ourLanguage));
    }
  }, [dispatch, ourLanguage, thesesBlocksData]);

  useEffect(() => {
    if (!thesesBlocksDataMedia) {
      dispatch(fetchAboutThesesBlocksMedia());
    }
  }, [dispatch, thesesBlocksDataMedia]);

  const combinedData = useMemo(() => {
    if (!thesesBlocksData?.Cards || !thesesBlocksDataMedia?.Cards) return [];

    return thesesBlocksData.Cards.map((card, index) => ({
      ...card,
      id: index, // Используем индекс вместо id из бэкенда
      image: thesesBlocksDataMedia.Cards[index]?.image ? `${BASE_URL_BACKEND_FOR_MEDIA}${thesesBlocksDataMedia.Cards[index].image}` : "",
    }));
  }, [thesesBlocksData?.Cards, thesesBlocksDataMedia?.Cards]);

  return (
    <motion.div className={styles.theValues} style={{ top }}>
      <div
        className={styles.title}
        style={{
          fontSize: device === "Mobile" && isRtl ? "48px" : "72px",
          marginRight: isRtl ? "35px" : "",
        }}
      >
        {isRtl ? (
          <>
            {thesesBlocksData &&
              thesesBlocksData?.Title?.title
                ?.split(/\/color\/(.*?)\/color\//g)
                .map((part, index) => {
                  if (index % 2 === 1) {
                    return (
                      <span
                        key={`${index}-TitleSection-title`}
                        className={styles.orange}
                      >
                        {t(part)}
                      </span>
                    ); // Если это часть с маркером /color/
                  }
                  return t(part);
                })}
          </>
        ) : (
          <>
            {thesesBlocksData &&
              thesesBlocksData?.Title?.title
                ?.split(/\/color\/(.*?)\/color\//g)
                .map((part, index) => {
                  if (index % 2 === 1) {
                    return (
                      <span
                        key={`${index}-TitleSection-title`}
                        className={styles.orange}
                      >
                        {t(part)}
                      </span>
                    );
                  }
                  return t(part);
                })}
          </>
        )}
      </div>

      <div className={styles.worthesContainer}>
        {combinedData.map((worth, index) => (
          <motion.div
            key={index}
            className={styles.worth}
            style={{
              opacity: [opacity1, opacity2, opacity3, opacity4, opacity5][
                index
              ],
            }}
          >
            <div
              className={styles.imageWrapper}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.img
                className={styles.load}
                src="/images/aboutWorthes0.svg"
                alt="no-image"
                initial={{ opacity: 1 }}
                animate={{
                  rotate: hoveredIndex === index ? 360 : 0,
                  opacity: hoveredIndex === index ? 0 : 1,
                  transition: {
                    duration: hoveredIndex === index ? 1 : 0.5,
                    ease: "easeInOut",
                    delay: hoveredIndex === index ? 0 : 0.5,
                  },
                }}
              />
              <motion.img
                className={styles.triangle}
                src={worth.image}
                alt={worth.keyword}
                initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 0 }}
                animate={{
                  clipPath:
                    hoveredIndex === index
                      ? "circle(150% at 50% 50%)"
                      : "circle(0% at 50% 50%)",
                  opacity: hoveredIndex === index ? 1 : 0,
                  transition: {
                    duration: 1,
                    ease: "easeInOut",
                    delay: hoveredIndex === index ? 0 : 0,
                  },
                }}
              />
            </div>

            <div>
              {device === "Mobile" ? (
                <div className={styles.worthTitleMobile}>
                  <span className={styles.worthTitle}>{worth.keyword}</span>
                  <span className={styles.worthTitle}>/{index + 1}</span>
                </div>
              ) : (
                <span className={styles.worthTitle}>{worth.keyword}</span>
              )}

              <div className={styles.worthText}>
                {worth.theses.split("\n").map((line, idx) => (
                  <React.Fragment key={`${idx} ${line}`}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div
              className={styles.worthTitle}
              style={device === "Mobile" ? { display: "none" } : {}}
            >
              /{index + 1}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ValueSection;
