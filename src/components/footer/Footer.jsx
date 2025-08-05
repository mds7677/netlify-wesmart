import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Импорт хука для получения текущего пути
import { Link } from "react-router-dom";
import styles from "./footer.module.scss";
import Logotype from "../../assets/images/Logotype.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Modal from "../../components/homePage/ModalForm/ModalForm";
import useDeviceDetection from "../../hooks/useDeviceDetection";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  selectHeader,
  selectHeaderLoading,
  selectHeaderMedia,
} from "../../store/selectors/content/headerSelectors";
import {
  fetchHeader,
  fetchHeaderMedia,
} from "../../store/api/content/headerApi";

const Footer = ({ transparent, color, isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation();
  const [activePath, setActivePath] = React.useState(location.pathname);
  const isProductPage = /^\/product\/\d+$/.test(location.pathname);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || i18n.language
  );
  const dispatch = useDispatch();
  const headerData = useSelector((state) => selectHeader(state, language));
  const headerMedia = useSelector(selectHeaderMedia);
  const isLoading = useSelector(selectHeaderLoading);
  const device = useDeviceDetection();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (!headerData) {
      dispatch(fetchHeader(language));
    }
  }, [dispatch, language, headerData]);

  useEffect(() => {
    if (!headerMedia) {
      dispatch(fetchHeaderMedia());
    }
  }, [dispatch, headerMedia]);

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const direction = language === "heb" ? "rtl" : "ltr";
    document.documentElement.dir = direction;

    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n.language]);

  const switchLanguage = (lng) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  const navigate = useNavigate();
  const handleClickOnHome = () => {
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={transparent ? styles.footerTransparent : styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLogo}>
          <Link to="/">
            {headerMedia?.logo && <img src={headerMedia.logo} alt="logo" />}
          </Link>
        </div>
        {device === "Mobile" ? (
          <div className={styles.burgerMenu}>
            <button
              onClick={toggleMenu}
              className={styles.burgerButton}
              style={{ color: isMenuOpen ? "white" : "rgb(54,59,97)" }}
            >
              {isMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
            </button>
            <motion.nav
              className={styles.mobileNav}
              initial={{ x: "100%" }}
              animate={{ x: isMenuOpen ? "0%" : "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className={styles.mobileMenuLogo}>
                {headerMedia?.logo && <img src={headerMedia.logo} alt="logo" />}
              </div>
              <ul className={styles.mobileLinks}>
                {headerData && (
                  <>
                    {headerData?.button?.map((item) => (
                      <li key={item.slug}>
                        <Link
                          to={`/${item.slug === "home" ? "" : item.slug}`}
                          onClick={toggleMenu}
                          style={{
                            color:
                              activePath ===
                              (item.slug === "home" ? "/" : `/${item.slug}`)
                                ? "#F77F1E"
                                : color,
                          }}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </>
                )}
              </ul>
              <div className={styles.menuBottomBlock}>
                <div>
                  <select
                    className={styles.selectMobile}
                    value={language}
                    onChange={(e) => switchLanguage(e.target.value)}
                    style={{
                      border: "none",
                      background: "none",
                      fontSize: "16px",
                      outline: "none",
                      textAlignLast: "right",
                      color: "#363B61",
                      flex: "1",
                    }}
                  >
                    <option style={{ color: "rgb(54,59,97)" }} value="en">
                      EN
                    </option>
                    <option style={{ color: "rgb(54,59,97)" }} value="heb">
                      עב
                    </option>
                  </select>
                </div>
                <div
                  className={styles.button}
                  onClick={handleModalOpen}
                  onClose={handleModalClose}
                >
                  <span className={styles.buttonText}>
                    {headerData && <>{headerData?.button_text}</>}
                  </span>
                </div>
                <Modal isVisible={isModalVisible} onClose={handleModalClose} />
              </div>
            </motion.nav>
          </div>
        ) : (
          <nav className={styles.footerNav}>
            <ul className={styles.footerLinks}>
              {headerData && (
                <>
                  {headerData?.button?.map((item) => (
                    <li key={item.slug}>
                      <Link
                        to={`/${item.slug === "home" ? "" : item.slug}`}
                        className={styles.footerLinksA}
                        style={{
                          color:
                            activePath ===
                            (item.slug === "home" ? "/" : `/${item.slug}`)
                              ? "#F77F1E"
                              : color,
                        }}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </nav>
        )}
        {device !== "Mobile" && (
          <div
            className={styles.headerButton}
            style={{ flex: "1.5" }}
            onClick={handleModalOpen}
            onClose={handleModalClose}
          >
            <div className={styles.button}>
              <span className={styles.buttonText}>
                {headerData && <>{headerData?.button_text}</>}
              </span>
            </div>
          </div>
        )}
        {device !== "Mobile" && (
          <div>
            <select
              value={language}
              onChange={(e) => switchLanguage(e.target.value)}
              style={{
                border: "none",
                background: "none",
                fontSize: "16px",
                outline: "none",
                textAlignLast: "right",
                color: isProductPage ? "#FFFFFF" : "#363B61",
                flex: "1",
              }}
            >
              <option value="en">EN</option>
              <option value="heb">עב</option>
            </select>
          </div>
        )}
      </div>
      <Modal isVisible={isModalVisible} onClose={handleModalClose} />
    </div>
  );
};

export default Footer;
