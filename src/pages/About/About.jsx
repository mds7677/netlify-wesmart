import Footer from "../../components/footer/Footer";
import Form from "../../components/Form/Form";
import TrueFooter from "../../components/TrueFooter/TrueFooter";
import styles from "./About.module.scss";
import { useRef, useEffect, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { useScroll, motion, useTransform } from "framer-motion";
import TitleSection from "../../components/aboutPage/TitleSection/TitleSection";
import ValueSection from "../../components/aboutPage/ValuesSection/ValuesSection";
import BackgroundAnimation from "../../components/aboutPage/BackgroundAnimation/BackgroundAnimation";
import TeamCarousel from "../../components/aboutPage/TeamCarousel/TeamCarousel";
import useDeviceDetection from "../../hooks/useDeviceDetection";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCustomizedSolutionsBlocks,
  selectInviteBlocks,
  selectLearnMoreBlocks,
  selectLearnMoreBlocksMedia,
  selectOurTeamBlocks,
  selectOurTeamBlocksMedia,
} from "../../store/selectors/content/aboutPageSelectors";
import {
  fetchCustomizedSolutionsBlocks,
  fetchInviteBlocks,
  fetchLearnMoreBlocks,
  fetchLearnMoreBlocksMedia,
  fetchOurTeamBlocks,
  fetchOurTeamBlocksMedia,
} from "../../store/api/content/aboutPageApi";

const startPosition = 0;
const firstSlideTopStart = startPosition;
const firstSlideTopEnd = firstSlideTopStart + 0.2;

const secondSlideTopStart = firstSlideTopStart + 0.1;
const secondSlideTopEnd = secondSlideTopStart + 0.2;
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

const firstWorthAppearStart = secondSlideTopStart + 0.05;
const firstWorthAppearEnd = firstWorthAppearStart + 0.04;
const secondWorthAppearStart = firstWorthAppearEnd;
const secondWorthAppearEnd = secondWorthAppearStart + 0.03;
const thirdWorthAppearStart = secondWorthAppearEnd;
const thirdWorthAppearEnd = thirdWorthAppearStart + 0.03;
const fourthWorthAppearStart = thirdWorthAppearEnd;
const fourthWorthAppearEnd = fourthWorthAppearStart + 0.03;
const fifthWorthAppearStart = fourthWorthAppearEnd;
const fifthWorthAppearEnd = fifthWorthAppearStart + 0.03;

const MobilefirstWorthAppearStart = secondSlideTopStart;
const MobilefirstWorthAppearEnd = MobilefirstWorthAppearStart + 0.03;
const MobilesecondWorthAppearStart = MobilefirstWorthAppearEnd;
const MobilesecondWorthAppearEnd = MobilesecondWorthAppearStart + 0.03;
const MobilethirdWorthAppearStart = MobilesecondWorthAppearEnd;
const MobilethirdWorthAppearEnd = MobilethirdWorthAppearStart + 0.04;
const MobilefourthWorthAppearStart = MobilethirdWorthAppearEnd;
const MobilefourthWorthAppearEnd = MobilefourthWorthAppearStart + 0.03;
const MobilefifthWorthAppearStart = MobilefourthWorthAppearEnd;
const MobilefifthWorthAppearEnd = MobilefifthWorthAppearStart + 0.03;

const About = () => {
  const { t } = useTranslation();
  const scrollRef = useRef(null);
  const device = useDeviceDetection();
  const { scrollYProgress } = useScroll();
  const [scrollInstance, setScrollInstance] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Контроль состояния меню
  const [isRtl, setIsRtl] = useState(false); // Состояние для проверки языка
  useEffect(() => {
    const language = localStorage.getItem("language"); // или ваш ключ
    setIsRtl(language === "heb"); // true, если иврит
  }, []);

  const ourLanguage = localStorage.getItem("language") === "heb" ? "he" : "en";
  const dispatch = useDispatch();

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      smoothMobile: true,
      inertia: 0.8,
    });
    setScrollInstance(scroll);
    window.scrollTo(0, 0);
    scrollYProgress.onChange((latest) => {
      const scrollPercentage = latest * 100; // Преобразуем в проценты
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
    first: useTransform(
      scrollYProgress,
      [firstSlideTopStart, firstSlideTopEnd],
      device === "Mobile" ? ["0vw", "-540vw"] : ["0vh", "-250vh"]
    ),
    second: useTransform(
      scrollYProgress,
      device === "Mobile"
        ? [
            secondSlideTopStart - 0.03,
            secondSlideTopEnd,
            thirdSlideTopStart,
            thirdSlideTopEnd,
          ]
        : [
            secondSlideTopStart,
            secondSlideTopEnd,
            thirdSlideTopStart,
            thirdSlideTopEnd,
          ],
      device === "Mobile"
        ? ["270vw", "-400vw", "-400vw", "-620vw"]
        : ["100vh", "-150vh", "-150vh", "-250vh"]
    ),
    third: useTransform(
      scrollYProgress,
      device === "Mobile"
        ? [
            thirdSlideTopStart - 0.04,
            thirdSlideTopEnd - 0.05,
            fourthSlideTopStart - 0.05,
            fifthSlideTopEnd - 0.05,
          ]
        : [
            thirdSlideTopStart,
            thirdSlideTopEnd,
            fourthSlideTopStart,
            fifthSlideTopEnd,
          ],
      device === "Mobile"
        ? ["270vw", "0vw", "0vw", "-230vw"]
        : ["100vh", "0vh", "0vh", "-100vh"]
    ),
    fourth: useTransform(
      scrollYProgress,
      device === "Mobile"
        ? [
            fourthSlideTopStart - 0.05,
            fourthSlideTopEnd,
            fifthSlideTopStart,
            fifthSlideTopEnd,
          ]
        : [
            fourthSlideTopStart,
            fourthSlideTopEnd,
            fifthSlideTopStart,
            fifthSlideTopEnd,
          ],
      ["100vh", "-50vh", "-50vh", "-150vh"]
    ),
    fifth: useTransform(
      scrollYProgress,
      device === "Mobile"
        ? [fourthSlideTopStart - 0.05, fifthSlideTopEnd - 0.02]
        : [fourthSlideTopStart, fifthSlideTopEnd],
      device === "Mobile" ? ["300vw", "0vw"] : ["100vh", "0vh"]
    ),
    six: useTransform(
      scrollYProgress,
      [
        sixSlideTopStart,
        sixSlideTopEnd,
        formSlideTopStart,
        formSlideTopEnd,
        footerSlideTopStart,
        footerSlideTopEnd,
      ],
      ["100vh", "0vh", "0vh", "-84vh", "-84vh", "-150vh"]
    ),
    backgroundOpacity: useTransform(
      scrollYProgress,
      device === "Mobile"
        ? [secondSlideTopStart - 0.1, secondSlideTopStart]
        : [secondSlideTopStart, secondSlideTopStart + 0.02],
      [1, 0]
    ),
    firstWorth: useTransform(
      scrollYProgress,
      device === "Mobile"
        ? [MobilefirstWorthAppearStart, MobilefirstWorthAppearEnd]
        : [firstWorthAppearStart, firstWorthAppearEnd],
      [0, 1]
    ),
    secondWorth: useTransform(
      scrollYProgress,
      device === "Mobile"
        ? [MobilesecondWorthAppearStart, MobilesecondWorthAppearEnd]
        : [secondWorthAppearStart, secondWorthAppearEnd],
      [0, 1]
    ),
    thirdWorth: useTransform(
      scrollYProgress,
      device === "Mobile"
        ? [MobilethirdWorthAppearStart, MobilethirdWorthAppearEnd]
        : [thirdWorthAppearStart, thirdWorthAppearEnd],
      [0, 1]
    ),
    fourthWorth: useTransform(
      scrollYProgress,
      device === "Mobile"
        ? [MobilefourthWorthAppearStart, MobilefourthWorthAppearEnd]
        : [fourthWorthAppearStart, fourthWorthAppearEnd],
      [0, 1]
    ),
    fifthWorth: useTransform(
      scrollYProgress,
      device === "Mobile"
        ? [MobilefifthWorthAppearStart, MobilefifthWorthAppearEnd]
        : [fifthWorthAppearStart, fifthWorthAppearEnd],
      [0, 1]
    ),
    form: useTransform(
      scrollYProgress,
      device === "Mobile"
        ? [
            formSlideTopStart - 0.02,
            formSlideTopEnd - 0.02,
            footerSlideTopStart - 0.02,
            footerSlideTopEnd - 0.03,
          ]
        : [
            formSlideTopStart,
            formSlideTopEnd,
            footerSlideTopStart,
            footerSlideTopEnd,
          ],
      device === "Mobile"
        ? ["100vh", "13vh", "13vh", "-35vh"]
        : ["100vh", "13vh", "13vh", "-44vh"]
    ),
    trueFooter: useTransform(
      scrollYProgress,
      device === "Mobile"
        ? [footerSlideTopStart, footerSlideTopEnd - 0.03]
        : [footerSlideTopStart, footerSlideTopEnd],
      device === "Mobile" ? ["100vh", "65vh"] : ["100vh", "46vh"]
    ),
  };

  const customizedSolutionsBlocks = useSelector((state) =>
    selectCustomizedSolutionsBlocks(state, ourLanguage)
  );

  const ourTeamBlocks = useSelector((state) =>
    selectOurTeamBlocks(state, ourLanguage)
  );

  const ourTeamBlocksMedia = useSelector((state) =>
    selectOurTeamBlocksMedia(state)
  );

  const learnMoreBlocks = useSelector((state) =>
    selectLearnMoreBlocks(state, ourLanguage)
  );

  const learnMoreBlocksMedia = useSelector((state) =>
    selectLearnMoreBlocksMedia(state)
  );

  const inviteBlocks = useSelector((state) =>
    selectInviteBlocks(state, ourLanguage)
  );

  useEffect(() => {
    if (!customizedSolutionsBlocks) {
      dispatch(fetchCustomizedSolutionsBlocks(ourLanguage));
    }
  }, [dispatch, ourLanguage, customizedSolutionsBlocks]);

  useEffect(() => {
    if (!ourTeamBlocks) {
      dispatch(fetchOurTeamBlocks(ourLanguage));
    }
  }, [dispatch, ourLanguage, ourTeamBlocks]);

  useEffect(() => {
    if (!ourTeamBlocksMedia) {
      dispatch(fetchOurTeamBlocksMedia());
    }
  }, [dispatch, ourTeamBlocksMedia]);

  useEffect(() => {
    if (!learnMoreBlocks) {
      dispatch(fetchLearnMoreBlocks(ourLanguage));
    }
  }, [dispatch, ourLanguage, learnMoreBlocks]);

  useEffect(() => {
    if (!learnMoreBlocksMedia) {
      dispatch(fetchLearnMoreBlocksMedia());
    }
  }, [dispatch, learnMoreBlocksMedia]);

  useEffect(() => {
    if (!inviteBlocks) {
      dispatch(fetchInviteBlocks(ourLanguage));
    }
  }, [dispatch, ourLanguage, inviteBlocks]);

  return (
    <div className={styles.bigContainer} data-scroll-container ref={scrollRef}>
      <div className={styles.stickyBlock} data-scroll-section>
        <motion.div className={styles.mainAbout}>
          <TitleSection ourLanguage={ourLanguage} top={transforms.first} />
          <ValueSection
            ourLanguage={ourLanguage}
            top={transforms.second}
            opacity1={transforms.firstWorth}
            opacity2={transforms.secondWorth}
            opacity3={transforms.thirdWorth}
            opacity4={transforms.fourthWorth}
            opacity5={transforms.fifthWorth}
          />
          <BackgroundAnimation
            backgroundOpacity={transforms.backgroundOpacity}
          />
          <motion.div
            className={styles.writtenAboutUs}
            style={{ top: transforms.third }}
          >
            {device === "Mobile" ? (
              <>
                <div className={styles.blockName}>
                  {t("Customized_solutions")}
                </div>
                <div>
                  <div
                    className={styles.blockTitle}
                    style={{
                      fontSize: isRtl ? "36px" : "42px",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {isRtl ? (
                      <>
                        {customizedSolutionsBlocks &&
                          customizedSolutionsBlocks?.title}
                      </>
                    ) : (
                      <>
                        {customizedSolutionsBlocks &&
                          customizedSolutionsBlocks?.title}
                      </>
                    )}
                  </div>
                  <div
                    style={{ whiteSpace: "pre-line" }}
                    className={styles.blockNameMobile}
                  >
                    {customizedSolutionsBlocks &&
                      customizedSolutionsBlocks?.description}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.blockName}>
                  {t("Customized_solutions")}
                </div>
                <div>
                  <div
                    style={{ whiteSpace: "pre-line" }}
                    className={styles.blockTitle}
                  >
                    {customizedSolutionsBlocks &&
                      customizedSolutionsBlocks?.title}
                  </div>
                  <div
                    style={{ whiteSpace: "pre-line" }}
                    className={styles.blockName}
                  >
                    {customizedSolutionsBlocks &&
                      customizedSolutionsBlocks?.description}
                  </div>
                </div>
              </>
            )}

            <div
              className={styles.bgImage}
              style={{ left: isRtl ? "3vw" : "-3vw" }}
            >
              <img src="/images/aboutWrittenAboutUs.svg" alt="no-image" />
            </div>
          </motion.div>
          <motion.div
            className={styles.ourTeam}
            style={{ top: transforms.fourth }}
          >
            <div
              className={styles.blockName}
              style={{ marginRight: isRtl ? "25px" : "0" }}
            >
              {t("OUR_TEAM")}
            </div>
            <div>
              <div
                style={{ whiteSpace: "pre-line" }}
                className={styles.blockTitle}
              >
                {ourTeamBlocks && ourTeamBlocks?.Title?.title}
              </div>
              {ourTeamBlocks &&
                ourTeamBlocks?.Cards &&
                ourTeamBlocksMedia &&
                ourTeamBlocksMedia?.Cards && (
                  <TeamCarousel
                    content={ourTeamBlocks?.Cards}
                    media={ourTeamBlocksMedia?.Cards}
                  />
                )}
            </div>
          </motion.div>
          <motion.div
            className={styles.learnMore}
            style={{
              top: transforms.fifth,
              backgroundColor: isRtl ? "#d3dfdb" : "#dbe3e6",
            }}
          >
            <div className={styles.textContainer}>
              <div
                style={{ whiteSpace: "pre-line" }}
                className={styles.textTitle}
              >
                {learnMoreBlocks &&
                  learnMoreBlocks?.title
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
              <div
                style={{ whiteSpace: "pre-line" }}
                className={styles.textContent}
              >
                {learnMoreBlocks && learnMoreBlocks?.description}
                <br />
              </div>
              <div className={styles.button}>
                <span className={styles.buttonText}>
                  {learnMoreBlocks && learnMoreBlocks?.buttonText}
                </span>
              </div>
            </div>
            <div
              className={styles.bgImage}
              style={{ left: device === "Mobile" && isRtl ? "0vw" : "" }}
            >
              <img
                style={{
                  left:
                    device === "Mobile"
                      ? isRtl
                        ? "-188px"
                        : "0" // для мобильных устройств
                      : isRtl
                      ? "0vw"
                      : "50%",
                }}
                src="/images/aboutLearnMoreBG.jpg"
                alt="no-image"
              />
            </div>
          </motion.div>
        </motion.div>
        <motion.div className={styles.weInvite} style={{ top: transforms.six }}>
          <div className={styles.textBlock}>
            <div
              style={{ whiteSpace: "pre-line" }}
              className={styles.textTitle}
            >
              {inviteBlocks && inviteBlocks?.title}
            </div>
            <div
              style={{ whiteSpace: "pre-line" }}
              className={styles.textContent}
            >
              {inviteBlocks && inviteBlocks?.description}
            </div>
          </div>
        </motion.div>
        <Form top={transforms.form} />
        <TrueFooter top={transforms.trueFooter} />
      </div>
      <Footer isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
};

export default About;
