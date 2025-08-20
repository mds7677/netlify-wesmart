import React, { useRef, useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Footer from "../../components/footer/Footer";
import Form from "../../components/Form/Form";
import TrueFooter from "../../components/TrueFooter/TrueFooter";
import { IoCopy } from "react-icons/io5";
import { useTranslation } from "react-i18next";

import styles from "./Contacts.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCommonContacts,
  selectContacts,
} from "../../store/selectors/content/contactsSelectors";
import { fetchContacts } from "../../store/api/content/contactsApi";
import FacebookSvg from "../../assets/images/icons/FacebookSvg";
import InstagramSvg from "../../assets/images/icons/InstagramSvg";
import TwitterSvg from "../../assets/images/icons/TwitterSvg";
import LinkedInSvg from "../../assets/images/icons/LinkedInSvg";

export default function Contacts() {
  const { t } = useTranslation();
  const emailRef = useRef(null);
  const dispatch = useDispatch();
  const isRtl = localStorage.getItem("language") === "heb";
  const contactData = useSelector((state) =>
    selectContacts(state, isRtl ? "heb" : "en")
  );
  const scrollRef = useRef(null);
  const [scrollInstance, setScrollInstance] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const commonContacts = useSelector(selectCommonContacts);

  const copyToClipboard = () => {
    if (emailRef.current) {
      const emailText = emailRef.current.textContent;
      navigator.clipboard.writeText(emailText).catch((err) => {
        console.error("Error copying text:", err);
      });
    }
  };

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      smoothMobile: true,
      inertia: 0.6,
    });
    setScrollInstance(scroll);
    window.scrollTo(0, 0);
    // scrollYProgress.onChange((latest) => {
    //   const scrollPercentage = latest * 100;
    //   console.log(`Page scrolled: ${scrollPercentage}%`);
    // });
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

  useEffect(() => {
    if (!contactData) {
      dispatch(fetchContacts(isRtl ? "heb" : "en"));
    }
  }, [dispatch, isRtl, contactData]);

  return (
    <div className={styles.bigContainer} data-scroll-container ref={scrollRef}>
      <div className={styles.stickyBlock} data-scroll-section>
        <div className={styles.mainContainer}>
          <Footer isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <div className={styles.contactContainer}>
            <div className={styles.title}>
              {contactData && (
                <>
                  {contactData?.title}
                  {contactData?.description && (
                    <p
                      className={styles.subtitle}
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {contactData.description}
                    </p>
                  )}
                </>
              )}
            </div>
            <div className={styles.baseContainer}>
              <div className={styles.topicTitle}>{t("EMAIL")}</div>
              <div className={styles.buttonContainer}>
                <span className={styles.emailText} ref={emailRef} id="email">
                  {commonContacts && commonContacts?.email}
                </span>
                <button className={styles.copyButton} onClick={copyToClipboard}>
                  <IoCopy />
                </button>
              </div>
            </div>
            <div className={styles.baseContainer}>
              <div className={styles.topicTitle}>{t("PHONE")}</div>
              <div
                className={styles.phoneText}
                dir="ltr"
                style={{ marginLeft: isRtl ? "1.5vw" : "0" }}
              >
                {commonContacts && commonContacts?.phone}
              </div>
            </div>
            <div className={styles.baseContainer}>
              <div className={styles.topicTitle}>{t("FOLLOW_US")}</div>
              <div
                className={styles.networkContainer}
                style={{ display: "flex", gap: "10px 25px" }}
              >
                {commonContacts && commonContacts?.facebook_url && (
                  <a
                    href={commonContacts.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookSvg width="25px" height="25px" color="black" />
                  </a>
                )}
                {commonContacts && commonContacts?.instagram_url && (
                  <a
                    href={commonContacts.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramSvg width="25px" height="25px" color="black" />
                  </a>
                )}
                {commonContacts && commonContacts?.twitter_url && (
                  <a
                    href={commonContacts.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterSvg width="25px" height="25px" color="black" />
                  </a>
                )}
                {commonContacts && commonContacts?.linkedin_url && (
                  <a
                    href={commonContacts.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInSvg
                      width="25px"
                      height="25px"
                      color="black"
                      additColor="white"
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.addressContainer}>
            <div className={styles.streetContainer}>
              <div className={styles.topicTitle}>{t("ADDRESS")}</div>
              <div className={styles.addressText}>
                {commonContacts && commonContacts?.address}
              </div>
            </div>
            {commonContacts && commonContacts?.src_for_google_maps && (
              <div className={styles.mapImage}>
                <iframe
                    style={{height: `calc(100vw * 0.5625)`, border: 0}}
                    title="Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1274.455112582617!2d35.34575958164634!3d32.92642933536022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151c3054b6e8c5f9%3A0x15deb89a75712d74!2zR2F6aXQgMTAsIEthcm1pZWwsINCY0LfRgNCw0LjQu9GM!5e0!3m2!1sru!2sby!4v1755683477201!5m2!1sru!2sby"
                  // src={commonContacts?.src_for_google_maps}
                  width={`100%`}
                  height={`calc(100vw * 0.5625)`}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  />
              </div>
            )}
          </div>
          <Form isShadow={false}/>
          <TrueFooter/>
        </div>
      </div>
    </div>
  );
}
