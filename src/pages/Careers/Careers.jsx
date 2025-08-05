import { useTranslation } from "react-i18next";
import { useScroll, motion, useTransform } from "framer-motion";
import styles from "./Careers.module.scss";
import React, { useEffect, useRef, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";
import Footer from "../../components/footer/Footer";
import TrueFooter from "../../components/TrueFooter/TrueFooter";
import useDeviceDetection from "../../hooks/useDeviceDetection";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCareerPageOurMission,
  selectCareerPageTopBlok,
  selectCareerPageTopBlokMedia,
  selectCareerPageWhyUs,
  selectEmployeeBenefits,
  selectJoinUs,
} from "../../store/selectors/content/careerPageSelectors";
import {
  fetchCareerPageOurMission,
  fetchCareerPageTopBlok,
  fetchCareerPageTopMedia,
  fetchEmployeeBenefits,
  fetchJoinUs,
  fetchWhyUs,
} from "../../store/api/content/careerPageApi";

const startPosition = 0;
const ourMissionStart = startPosition;
const ourMissionEnd = ourMissionStart + 0.5;
const openPositionsStart = ourMissionEnd;
const openPositionsEnd = openPositionsStart + 0.5;

const Careers = () => {
  const { t } = useTranslation();
  const language = localStorage.getItem("language") === "heb" ? "he" : "en";
  const device = useDeviceDetection();
  const [scrollInstance, setScrollInstance] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Контроль состояния меню
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
      // console.log(`Page scrolled: ${scrollPercentage}%`);
    });
    return () => {
      if (scroll) scroll.destroy();
    };
  }, [scrollYProgress]);
  useEffect(() => {
    if (scrollInstance) {
      if (isMenuOpen) {
        scrollInstance.stop(); // Останавливаем скролл при открытом меню
      } else {
        scrollInstance.start(); // Включаем скролл при закрытом меню
      }
    }
  }, [isMenuOpen, scrollInstance]);

  const transforms = {
    ourMission: useTransform(
      scrollYProgress,
      [ourMissionStart, ourMissionEnd],
      device === "Mobile" ? ["300vw", "-550vw"] : ["110vh", "-185vh"]
    ),
    openPositions: useTransform(
      scrollYProgress,
      device === "Mobile"
        ? [openPositionsStart - 0.2, openPositionsEnd - 0.08]
        : [openPositionsStart, openPositionsEnd],
      device === "Mobile" ? ["250vw", "21vw"] : ["120vh", "-6vh"]
    ),
    footer: useTransform(
      scrollYProgress,
      device === "Mobile"
        ? [openPositionsStart - 0.05, openPositionsEnd - 0.08]
        : [openPositionsStart, openPositionsEnd],
      device === "Mobile" ? ["250vw", "140vw"] : ["157vh", "48.1vh"]
    ),
  };

  const careerPageData = useSelector((state) =>
    selectCareerPageTopBlok(state, language)
  );

  const careersPageMediaData = useSelector((state) =>
    selectCareerPageTopBlokMedia(state)
  );

  const whyUsData = useSelector((state) =>
    selectCareerPageWhyUs(state, language)
  );

  const ourMissionData = useSelector((state) =>
    selectCareerPageOurMission(state, language)
  );

  const employeeBenefitsData = useSelector((state) =>
    selectEmployeeBenefits(state, language)
  );

  const joinUsData = useSelector((state) => selectJoinUs(state, language));

  useEffect(() => {
    if (!careerPageData) {
      dispatch(fetchCareerPageTopBlok(language));
    }
  }, [dispatch, language, careerPageData]);

  useEffect(() => {
    if (!careersPageMediaData) {
      dispatch(fetchCareerPageTopMedia());
    }
  }, [dispatch, careersPageMediaData]);

  useEffect(() => {
    if (!ourMissionData) {
      dispatch(fetchCareerPageOurMission(language));
    }
  }, [dispatch, language, ourMissionData]);

  useEffect(() => {
    if (!whyUsData) {
      dispatch(fetchWhyUs(language));
    }
  }, [dispatch, language, whyUsData]);

  useEffect(() => {
    if (!employeeBenefitsData) {
      dispatch(fetchEmployeeBenefits(language));
    }
  }, [dispatch, language, employeeBenefitsData]);

  useEffect(() => {
    if (!joinUsData) {
      dispatch(fetchJoinUs(language));
    }
  }, [dispatch, language, joinUsData]);

  useEffect(() => {
    console.log(`Employee joinUs Data:`, joinUsData);
  }, [joinUsData]);

  // регулируем высоту ячеек
  useEffect(() => {
    if (employeeBenefitsData?.Lines && device === "Desktop") {
      const syncHeights = () => {
        employeeBenefitsData.Lines.slice(0, 5).forEach((_, index) => {
          const leftBlock = document.getElementById(`left-block-${index}`);
          const rightBlock = document.getElementById(`right-block-${index}`);

          if (leftBlock && rightBlock) {
            leftBlock.style.height = "auto";
            rightBlock.style.height = "auto";

            const leftHeight = leftBlock.offsetHeight;
            const rightHeight = rightBlock.offsetHeight;

            const maxHeight = Math.max(leftHeight, rightHeight);
            leftBlock.style.height = `${maxHeight}px`;
            rightBlock.style.height = `${maxHeight}px`;
          }
        });
      };

      syncHeights();

      window.addEventListener("resize", syncHeights);

      return () => {
        window.removeEventListener("resize", syncHeights);
      };
    }
  }, [employeeBenefitsData?.Lines, device]);

  useEffect(() => {
    console.log(`Employee Benefits Data:`, employeeBenefitsData);
  }, [employeeBenefitsData]);

  return (
    <div className={styles.bigContainer} data-scroll-container ref={scrollRef}>
      <div className={styles.stickyBlock} data-scroll-section>
        <Footer
          transparent={true}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <div className={styles.headSection}>
          <div style={{ whiteSpace: "pre-line" }} className={styles.textTitle}>
            {careerPageData && careerPageData?.title}
          </div>
          <div
            style={{ whiteSpace: "pre-line" }}
            className={styles.textContent}
          >
            {careerPageData && careerPageData?.description}
          </div>
          <div className={styles.button}>
            {careerPageData && careerPageData?.button_text}
          </div>
          {careersPageMediaData && careersPageMediaData?.image && (
            <img src={`${careersPageMediaData?.image}`} alt="no-image" />
          )}
          <div className={styles.wrapper}></div>
        </div>
        <motion.div
          className={styles.contentBlock}
          style={{ top: transforms.ourMission }}
        >
          <div
            style={{ justifyContent: "space-between" }}
            className={styles.ourMission}
          >
            <div
              style={{ textTransform: "uppercase" }}
              className={styles.descText}
            >
              {t("careers.our_mission")}
            </div>
            <div>
              <div
                style={{ whiteSpace: "pre-line" }}
                className={styles.titleText}
              >
                {ourMissionData && ourMissionData?.title}
              </div>
              <div
                style={{ whiteSpace: "pre-line", marginLeft: "0" }}
                className={styles.textContent}
              >
                {ourMissionData && ourMissionData?.description}
              </div>
            </div>
          </div>
          <div className={styles.separator}></div>
          <div className={styles.benefitsFirst}>
            <div
              style={{ textTransform: "uppercase" }}
              className={styles.descText}
            >
              {t("careers.chose_wismart")}
            </div>
            {whyUsData &&
              Array.isArray(whyUsData?.Lines) &&
              whyUsData?.Lines.length > 0 && (
                <div className={styles.flexRowFirstPage}>
                  <div className={styles.flexCol}>
                    {whyUsData?.Lines?.slice(0, 4).map((item, index) => (
                      <div key={`left-${index}`} className={styles.textBlock}>
                        <div className={styles.circle}></div>
                        <div className={styles.textContent}>
                          {item.left_field}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.flexCol}>
                    {whyUsData?.Lines?.slice(0, 4).map((item, index) => (
                      <div key={`right-${index}`} className={styles.textBlock}>
                        <div className={styles.circle}></div>
                        <div className={styles.textContent}>
                          {item.right_field}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
          <div className={styles.separator}></div>
          <div className={styles.benefits}>
            <div style={{ whiteSpace: "pre-line" }} className={styles.title}>
              {employeeBenefitsData && employeeBenefitsData?.Block?.title}
            </div>
            <div
              style={{ whiteSpace: "pre-line", marginLeft: "0" }}
              className={styles.textContent}
            >
              {employeeBenefitsData && employeeBenefitsData?.Block?.description}
            </div>
            <div className={styles.flexRow}>
              <div className={styles.flexColSecondSlide}>
                {employeeBenefitsData?.Lines?.slice(0, 5).map((item, index) => (
                  <div
                    key={`left-${index}`}
                    className={styles.textBlock}
                    id={`left-block-${index}`}
                    style={{ height: device === "Desktop" ? "100%" : "auto" }}
                  >
                    <div className={styles.circleSecondPage}></div>
                    <div className={styles.textContent}>{item.left_field}</div>
                  </div>
                ))}
              </div>
              <div className={styles.flexColSecondSlide}>
                {employeeBenefitsData?.Lines?.slice(0, 5).map((item, index) => (
                  <div
                    key={`right-${index}`}
                    className={styles.textBlock}
                    id={`right-block-${index}`}
                    style={{ height: device === "Desktop" ? "100%" : "auto" }}
                  >
                    <div className={styles.circleSecondPage}></div>
                    <div className={styles.textContent}>{item.right_field}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className={styles.openPositions}
          style={{ top: transforms.openPositions }}
        >
          <img
            className={styles.bgImg}
            src="/images/careerCube.svg"
            alt="no-image"
          />
          <div className={styles.content}>
            <div style={{ whiteSpace: "pre-line" }} className={styles.title}>
              {joinUsData && joinUsData?.title}
            </div>
            <div style={{ whiteSpace: "pre-line" }} className={styles.text}>
              {joinUsData && joinUsData?.description}
            </div>
            <motion.button
              className={styles.animatedButton}
              whileHover="hover"
              initial="initial"
              onClick={() => window.open(joinUsData?.button_url, "_blank")}
            >
              <motion.div
                className={styles.buttonBackground}
                variants={{
                  initial: { x: "-100%", opacity: 0.2 },
                  hover: { x: 0, opacity: 1 },
                }}
                transition={{ duration: 0.4 }}
              />
              <span className={styles.buttonText}>
                {joinUsData && joinUsData?.button_text}
              </span>
              <img
                className={styles.icon}
                src="/images/careerIcon.svg"
                alt="no-image"
              />
            </motion.button>
          </div>
        </motion.div>
        <TrueFooter top={transforms.footer} />
      </div>
    </div>
  );
};

export default Careers;
