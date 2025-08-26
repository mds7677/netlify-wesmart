import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./Map.module.scss";
import Modal from "../../components/homePage/ModalForm/ModalForm";

import useDeviceDetection from "../../hooks/useDeviceDetection";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectMapPointsData } from "../../store/selectors/content/mapPointsSelectors";
import { fetchMapPoints } from "../../store/api/content";

const currentLanguage = localStorage.getItem("language");

const MapPoint = ({ top, left, name, delay }) => (
  <motion.div
    className={styles.pointContainer}
    style={{ top, left }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
  >
    <div className={styles.point} />
    <span className={`${styles.pointLabel} ${currentLanguage === "heb" ? styles.hebFont : styles.enFont }`}>{name}</span>
  </motion.div>
);

const CountryList = ({ top, left, countries, delay }) => (
  <motion.div
    className={styles.countryList}
    style={{ top, left }}
    initial={{ opacity: 0, translateY: 20 }}
    animate={{ opacity: 1, translateY: 0 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
  >
    {countries?.map((country, index) => (
      <p key={index} className={styles.country}>
        {country}
      </p>
    ))}
  </motion.div>
);

const NewOffice = ({ top, left, places, delay }) => (
  <motion.div
    className={styles.newOffice}
    style={{ top, left }}
    initial={{ opacity: 0, translateY: 20 }}
    animate={{ opacity: 1, translateY: 0 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
  >
    <p className={styles.soon}>SOON</p>
    {places?.map((country, index) => (
      <p key={index} className={styles.place}>
        {country}
      </p>
    ))}
  </motion.div>
);

const Map = () => {
  const { t } = useTranslation();
  // Используем Intersection Observer, чтобы отслеживать видимость карты
  const { ref, inView } = useInView({
    threshold: 0.2, // Процент видимости карты в viewport
    triggerOnce: false, // Анимация сработает только один раз
  });
  const device = useDeviceDetection();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };


  const mapPointsData = useSelector((state) =>
    selectMapPointsData(state, currentLanguage)
  );

  useEffect(() => {
    // Проверяем есть ли точки для текущего языка
    if (
      !mapPointsData ||
      !mapPointsData.points ||
      Object.keys(mapPointsData.points).length === 0
    ) {
      dispatch(fetchMapPoints({ language: currentLanguage }));
    }
  }, [currentLanguage, dispatch]);

  return (
    <motion.div className={styles.mapContainer} ref={ref}>
      <img src="/images/MapHome.png" alt="Map" className={styles.mapImage} />

      {/* Точки появляются с задержкой после карты */}
      {inView && (
        <>
          <MapPoint top="35%" left="17%" name={t("USA")} delay={0.5} />
          <MapPoint top="25%" left="55%" name={t("EUROPE")} delay={0.7} />
          <MapPoint top="35%" left="73%" name={t("ASIA")} delay={0.9} />
          <MapPoint top="47%" left="55%" name={t("ISRAEL")} delay={1.1} />
          <MapPoint top="58%" left="53%" name={t("AFRICA")} delay={1.3} />

          {/* Europe */}
          <CountryList
            top={device === "Mobile" ? "8%" : "10%"}
            left="55%"
            countries={(mapPointsData?.points?.points?.europe?.places || [])
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((p) => p.name)}
            delay={1.5}
          />

          {/* Asia */}
          <CountryList
            top={device === "Mobile" ? "14%" : "20%"}
            left="73%"
            countries={(mapPointsData?.points?.points?.asia?.places || [])
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((p) => p.name)}
            delay={1.7}
          />

          {/* USA */}
          <CountryList
            top={device === "Mobile" ? "5%" : "18%"}
            left={device === "Mobile" ? "8%" : "18%"}
            countries={(mapPointsData?.points?.points?.usa?.places || [])
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((p) => p.name)}
            delay={1.9}
          />

          {/* Africa */}
          <CountryList
            top={device === "Mobile" ? "68%" : "65%"}
            left={device === "Mobile" ? "48%" : "55%"}
            countries={(mapPointsData?.points?.points?.africa?.places || [])
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((p) => p.name)}
            delay={2.1}
          />

          {/* Soon */}
          <NewOffice
            top={device === "Mobile" ? "42%" : "40%"}
            left={device === "Mobile" ? "38%" : "50%"}
            places={(mapPointsData?.points?.points?.soon?.places || [])
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((p) => p.name)}
            delay={2.3}
          />
          <div
            className={`${styles.button} ${currentLanguage === "heb" ? styles.hebFont : styles.enFont}`}
            onClick={handleModalOpen}
            onClose={handleModalClose}
          >
            <span className={styles.buttonText}>{t("request_demo")}</span>
          </div>
        </>
      )}
      <Modal isVisible={isModalVisible} onClose={handleModalClose} />
    </motion.div>
  );
};

export default Map;
