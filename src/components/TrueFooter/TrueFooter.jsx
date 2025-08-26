import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styles from "./TrueFooter.module.scss";
import useDeviceDetection from "../../hooks/useDeviceDetection";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectCommonContacts } from "../../store/selectors/content/contactsSelectors";
import { fetchCommonContacts } from "../../store/api/content/contactsApi";
import { selectProductsSlider } from "../../store/selectors/content/productsSelectors";
import { fetchProductsSlider } from "../../store/api/content/productsApi";
import { selectFooter } from "../../store/selectors/content/footerSelectors";
import { fetchFooterThunk } from "../../store/api/content/footerApi";

const TrueFooter = ({ top, style }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const device = useDeviceDetection();
  const dispatch = useDispatch();
  const commonContacts = useSelector(selectCommonContacts);

  const isHebrew = localStorage.getItem("language") === "heb";
  const language = isHebrew ? "he" : "en";
  const apiLang = isHebrew ? "heb" : "en";

  useEffect(() => {
    if (!commonContacts) {
      dispatch(fetchCommonContacts(language));
    }
  }, [dispatch, language, commonContacts]);

  const productsDataSlider = useSelector((state) =>
    selectProductsSlider(state, apiLang)
  );

  const footerData = useSelector((state) => selectFooter(state, apiLang));

  useEffect(() => {
    if (!productsDataSlider) {
      dispatch(fetchProductsSlider(apiLang));
    }
  }, [dispatch, apiLang, productsDataSlider]);

  const slides = Array.isArray(productsDataSlider) ? productsDataSlider : [];

  useEffect(() => {
    if (!footerData) {
      dispatch(fetchFooterThunk(apiLang));
    }
  }, [dispatch, apiLang, footerData]);

  return (
    <motion.div className={styles.trueFooter} style={{ top, ...style }}>
      {device === "Mobile" ? (
        <>
          <div className={styles.iconDiv}>
            {commonContacts && commonContacts?.facebook_url && (
              <a
                href={commonContacts.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/images/socials/Facebook.svg" alt="Facebook" />
              </a>
            )}
            {commonContacts && commonContacts?.instagram_url && (
              <a
                href={commonContacts.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/images/socials/Instagram.svg" alt="Instagram" />
              </a>
            )}
            {commonContacts && commonContacts?.linkedin_url && (
              <a
                href={commonContacts.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/images/socials/LinkedIn.svg" alt="LinkedIn" />
              </a>
            )}
            {commonContacts && commonContacts?.twitter_url && (
              <a
                href={commonContacts.twitter_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/images/socials/Twitter.svg" alt="Twitter" />
              </a>
            )}
          </div>
          <div className={styles.row2}>
            <div className={`${styles.infoDiv} ${language === "he" ? styles.hebFont : styles.enFont}`}>{t("WESMART_COMMUNICATIONS")}</div>
            <div className={`${styles.infoDiv} ${language === "he" ? styles.hebFont : styles.enFont}`}>
              {t("PRIVACY_POLICY")} &ensp;&ensp;&ensp;&ensp; •
              &ensp;&ensp;&ensp;&ensp;
              {t("TERMS_CONDITIONS")}
            </div>
            <div className={`${styles.infoDiv} ${language === "he" ? styles.hebFont : styles.enFont}`}>
              <img src="/images/socials/cocki.svg" alt="Cookie Preferences" />
              {t("COOKIE_PREFERENCES")}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.row1}>
            <div className={styles.column}>
              <span className={`${styles.categoryTitle} ${language === "he" ? styles.hebFont : styles.enFont}`}>{t("COMPANY")}</span>
              {footerData &&
                footerData?.buttons?.button?.map((item) => (
                  <span
                    key={`footer nav ${item?.slug}`}
                    className={`${styles.categoryText} ${language === "he" ? styles.hebFont : styles.enFont}`}
                    onClick={() => navigate(`/${item?.slug}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {item?.title}
                  </span>
                ))}
            </div>
            <div className={styles.column}>
              <span className={`${styles.categoryTitle} ${language === "he" ? styles.hebFont : styles.enFont}`}>{t("PRODUCTS")}</span>
              {slides.map(({ title, slug }) => (
                  <span
                    key={`footer product ${slug}`}
                    className={`${styles.categoryText} ${language === "he" ? styles.hebFont : styles.enFont}`}
                    onClick={() => navigate(`/product/${slug}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {title.charAt(0).toUpperCase() +
                      title.slice(1).toLowerCase()}
                  </span>
                ))}
            </div>
            <div className={styles.column}>
              <span className={`${styles.categoryTitle} ${language === "he" ? styles.hebFont : styles.enFont}`}>{t("CONTACTS")}</span>
              <span className={`${styles.categoryText} ${language === "he" ? styles.hebFont : styles.enFont}`}>
                {commonContacts && commonContacts?.email}
              </span>
              <span
                className={`${styles.categoryText} ${language === "he" ? styles.hebFont : styles.enFont}`}
                dir="ltr"
                // style={{ marginLeft: isHebrew ? "3.7vw" : "0" }}
                style={{ textAlign: isHebrew ? "end" : "start" }}
              >
                {commonContacts && commonContacts?.phone}
              </span>
              <span className={`${styles.categoryText} ${language === "he" ? styles.hebFont : styles.enFont}`}>
                {commonContacts && commonContacts?.address}
              </span>
            </div>
            <div>
              <div className={`${styles.categoryTitle} ${language === "he" ? styles.hebFont : styles.enFont}`}>{t("FOLLOW_US")}</div>
              <div className={styles.iconDiv}>
                {commonContacts && commonContacts?.facebook_url && (
                  <a
                    href={commonContacts.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/images/socials/Facebook.svg" alt="Facebook" />
                  </a>
                )}
                {commonContacts && commonContacts?.instagram_url && (
                  <a
                    href={commonContacts.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/images/socials/Instagram.svg" alt="Instagram" />
                  </a>
                )}
                {commonContacts && commonContacts?.linkedin_url && (
                  <a
                    href={commonContacts.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/images/socials/LinkedIn.svg" alt="LinkedIn" />
                  </a>
                )}
                {commonContacts && commonContacts?.twitter_url && (
                  <a
                    href={commonContacts.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/images/socials/Twitter.svg" alt="Twitter" />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className={styles.row2}>
            <div className={`${styles.infoDiv} ${language === "he" ? styles.hebFont : styles.enFont}`}>
              {t("WESMART_COMMUNICATIONS")} 2024 WESMART COMMUNICATIONS AB
            </div>
            <div className={`${styles.infoDiv} ${language === "he" ? styles.hebFont : styles.enFont}`}>
              {t("PRIVACY_POLICY")} &ensp;&ensp;&ensp;&ensp; •
              &ensp;&ensp;&ensp;&ensp;
              {t("TERMS_CONDITIONS")}
            </div>
            <div className={`${styles.infoDiv} ${language === "he" ? styles.hebFont : styles.enFont}`}>
              <img src="/images/socials/cocki.svg" alt="Cookie Preferences" />
              {t("COOKIE_PREFERENCES")}
            </div>
          </div>{" "}
        </>
      )}
    </motion.div>
  );
};

export default TrueFooter;
