import React from "react";
import Footer from "../../components/footer/Footer";
import Form from "../../components/Form/Form";
import TrueFooter from "../../components/TrueFooter/TrueFooter";
import styles from "./Home.module.scss";
import { useRef, useEffect } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import LocomotiveScroll from "locomotive-scroll";
import AdvantageBlock from "../../components/homePage/Advantages/Advantage";
import Title from "../../components/homePage/Title/Title";
import Customers from "../../components/homePage/Customers/Customers";

export default function Home() {
  const startPosition = 0;
  const firstSlideTopStart = startPosition;
  const firstSlideTopEnd = firstSlideTopStart + 0.2;

  const secondSlideTopStart = firstSlideTopStart + 0.1;
  const secondSlideTopEnd = secondSlideTopStart + 0.2;
  const thirdSlideTopStart = secondSlideTopEnd;
  const thirdSlideTopEnd = thirdSlideTopStart + 0.1;
  const fourthSlideTopStart = thirdSlideTopEnd;
  const fourthSlideTopEnd = fourthSlideTopStart + 0.1;
  const fifthSlideTopStart = thirdSlideTopEnd;
  const fifthSlideTopEnd = fourthSlideTopStart + 0.1;

  const formSlideTopStart = thirdSlideTopEnd;
  const formSlideTopEnd = formSlideTopStart + 0.1;
  const footerSlideTopStart = formSlideTopEnd;
  const footerSlideTopEnd = footerSlideTopStart + 0.1;

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      smoothMobile: true,
      inertia: 0.8,
    });
    scrollYProgress.onChange((latest) => {
      const scrollPercentage = latest * 100;
      console.log(`Page scrolled: ${scrollPercentage}%`);
    });
    return () => {
      if (scroll) scroll.destroy();
    };
  }, [scrollYProgress]);

  const transforms = {
    first: useTransform(
      scrollYProgress,
      [firstSlideTopStart, firstSlideTopEnd],
      ["0vh", "-100vh"]
    ),
    second: useTransform(
      scrollYProgress,
      [
        secondSlideTopStart,
        secondSlideTopEnd,
        thirdSlideTopStart,
        thirdSlideTopEnd,
      ],
      ["100vh", "-150vh", "-150vh", "-250vh"]
    ),
    third: useTransform(
      scrollYProgress,
      [
        thirdSlideTopStart,
        thirdSlideTopEnd,
        fourthSlideTopStart,
        fourthSlideTopEnd,
      ],
      ["100vh", "0vh", "0vh", "-100vh"]
    ),

    four: useTransform(
      scrollYProgress,
      [
        fourthSlideTopStart,
        fourthSlideTopEnd,
        fifthSlideTopStart,
        fifthSlideTopEnd,
      ],
      ["100vh", "-50vh", "-50vh", "-150vh"]
    ),

    trueFooter: useTransform(
      scrollYProgress,
      [footerSlideTopStart, footerSlideTopEnd],
      ["100vh", "46vh"]
    ),
    form: useTransform(
      scrollYProgress,
      [
        formSlideTopStart,
        formSlideTopEnd,
        footerSlideTopStart,
        footerSlideTopEnd,
      ],
      ["100vh", "13vh", "13vh", "-44vh"]
    ),
  };

  return (
    <div>
      <Footer />
      <div className={styles.mainHome}>
        <Title />
        <div className={styles.advantages}>
          <AdvantageBlock
            description="We understand that in times of uncertainty, a sense of security is a vital necessity"
            title="SECURITY"
          />
          <AdvantageBlock
            description="The solutions include alarm systems, security cameras, access control and more"
            title="SAFETY"
          />
          <AdvantageBlock
            description="We provide smart security solutions based on data analysis and artificial intelligence, suitable for cities and towns of all sizes"
            title="SMART CITIES"
          />
          <AdvantageBlock
            description="Ai-solutions provide our customers  with strategic insights and real-time monitoring of critical logistics data"
            title="LOGISTICS AND INDUSTRIES"
          />
        </div>
        <Customers />
        <div
          className={styles.writtenAboutUs}
          style={{ top: transforms.third }}
        >
          <div className={styles.blockName}>WRITTEN ABOUT US</div>
          <div>
            <div className={styles.blockTitle}>
              WORKING WITH THE WESMART TEAM LED
              <br />
              BY OR WAS A SMOOTH, ENJOYABLE, AND PRODUCTIVE
              <br />
              PROCESS. OR IS A PROFESSIONAL WITH EXTENSIVE
              <br />
              EXPERIENCE IN THE FIELD OF SECURITY, WHO HAS
              <br />
              IMPROVED THE SECURITY OF THE SETTLEMENT.
              <br />
            </div>
            <div className={styles.blockName}>
              The availability was around the clock,
              <br />
              and their system solved many problems
              <br />
              for us without false alarms.
            </div>
          </div>
        </div>
      </div>
      <Form isShadow={false} />
      <TrueFooter />
    </div>
  );
}
