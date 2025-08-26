import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Customers.module.scss";
import useDeviceDetection from "../../../hooks/useDeviceDetection";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL_BACKEND_FOR_MEDIA } from "../../../const/api";
import {
  selectLogotypes,
  selectLogotypesMedia,
  selectPartners,
  selectPartnersMedia,
} from "../../../store/selectors/content/logotypesAndPartnersSelectors";
import {
  fetchLogotypes,
  fetchLogotypesMedia,
  fetchPartners,
  fetchPartnersMedia,
} from "../../../store/api/content/logotypesAndPartnersApi";

const Customers = () => {
  const { t } = useTranslation();
  const [hoveredLogo, setHoveredLogo] = useState(null);
  const device = useDeviceDetection();
  const dispatch = useDispatch();

  const currentLanguage =
    localStorage.getItem("language") === "heb" ? "he" : "en";

  const handleMouseEnter = (id) => setHoveredLogo(id);
  const handleMouseLeave = () => setHoveredLogo(null);

  const logotypesData = useSelector((state) =>
    selectLogotypes(state, currentLanguage)
  );

  const logotypesMediaData = useSelector((state) =>
    selectLogotypesMedia(state)
  );

  const partnersData = useSelector((state) =>
    selectPartners(state, currentLanguage)
  );

  const partnersMediaData = useSelector((state) => selectPartnersMedia(state));

  useEffect(() => {
    if (!logotypesData) {
      dispatch(fetchLogotypes(currentLanguage));
    }
  }, [dispatch, currentLanguage, logotypesData]);

  useEffect(() => {
    if (!logotypesMediaData) {
      dispatch(fetchLogotypesMedia());
    }
  }, [dispatch, logotypesMediaData]);

  useEffect(() => {
    if (!partnersData) {
      dispatch(fetchPartners(currentLanguage));
    }
  }, [dispatch, currentLanguage, partnersData]);

  useEffect(() => {
    if (!partnersMediaData) {
      dispatch(fetchPartnersMedia());
    }
  }, [dispatch, partnersMediaData]);

  // Разделим логотипы на 2 части
  const firstRowLogos = logotypesMediaData?.Cards?.slice(0, 5) || [];
  const secondRowLogos = logotypesMediaData?.Cards?.slice(5, 10) || [];

  // Мобильная версия логотипов
  const mobileFirstRowLogos = logotypesMediaData?.Cards?.slice(0, 10) || [];
  const mobilePartnerLogos = partnersMediaData?.Cards?.slice(0, 5) || [];

  return (
    <div className={styles.container}>
      {/* Customers Section */}
      <div className={styles.textContainer}>
        <div className={`${styles.title} ${currentLanguage === "he" ? styles.hebFont : styles.enFont}`}>
          {logotypesData &&
            logotypesData?.Title?.title
              ?.split(/\/color\/(.*?)\/color\//g)
              .map((part, index) => {
                if (index % 2 === 1) {
                  return (
                    <span
                      key={`${index}-customers-title`}
                      className={styles.orange}
                    >
                      {part}
                    </span>
                  );
                }
                return part;
              })}
        </div>
        <div className={`${styles.subTitle} ${currentLanguage === "he" ? styles.hebFont : styles.enFont}`}>
          {logotypesData && logotypesData?.Title?.description}
        </div>
      </div>

      {device === "Mobile" ? (
        <>
          {/* Одна строка логотипов для мобильных устройств */}
          <div className={styles.logoRow}>
            {mobileFirstRowLogos.map((logo, index) => (
              <div
                key={`mobile-logo-${index}`}
                className={styles.logo}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={`${BASE_URL_BACKEND_FOR_MEDIA}${
                    hoveredLogo === index ? logo.hover : logo.default
                  }`}
                  alt={`logo-${index}`}
                />
              </div>
            ))}
          </div>

          {/* Логотипы партнеров для мобильных устройств */}
          <div className={`${styles.titlePartner} ${currentLanguage === 'he' ? styles.hebFont : styles.enFont}`}>{t("partners")}</div>
          <div className={styles.logoContainerPartner}>
            {mobilePartnerLogos.map((logo, index) => (
              <div
                key={`mobile-partner-${index}`}
                className={styles.logo}
                onMouseEnter={() => handleMouseEnter(`partner-${index}`)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={`${BASE_URL_BACKEND_FOR_MEDIA}${
                    hoveredLogo === `partner-${index}`
                      ? logo.hover
                      : logo.default
                  }`}
                  alt={`logo-${index}`}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Полная версия для десктопа */}
          <div className={styles.logoRow}>
            {firstRowLogos.map((logo, index) => (
              <div
                key={`desktop-first-${index}`}
                className={styles.logo}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={`${BASE_URL_BACKEND_FOR_MEDIA}${
                    hoveredLogo === index ? logo.hover : logo.default
                  }`}
                  alt={`logo-${index}`}
                />
              </div>
            ))}
          </div>

          <div className={styles.logoRow}>
            {secondRowLogos.map((logo, index) => (
              <div
                key={`desktop-second-${index + 5}`}
                className={styles.logo}
                onMouseEnter={() => handleMouseEnter(index + 5)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={`${BASE_URL_BACKEND_FOR_MEDIA}${
                    hoveredLogo === index + 5 ? logo.hover : logo.default
                  }`}
                  alt={`logo-${index + 5}`}
                />
              </div>
            ))}
          </div>

          <div className={`${styles.titlePartner} ${currentLanguage === 'he' ? styles.hebFont : styles.enFont}`}>
            {partnersData && partnersData?.Title?.title}
          </div>
          <div className={styles.logoContainerPartner}>
            {partnersMediaData?.Cards?.map((logo, index) => (
              <div
                key={`desktop-partner-${index}`}
                className={styles.logo}
                onMouseEnter={() => handleMouseEnter(`partner-${index}`)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={`${BASE_URL_BACKEND_FOR_MEDIA}${
                    hoveredLogo === `partner-${index}`
                      ? logo.hover
                      : logo.default
                  }`}
                  alt={`logo-${index}`}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Customers;
