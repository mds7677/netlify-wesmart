import React, { useEffect } from "react";
import styles from "./AdvantagesSlider.module.scss";
import AdvantageBlock from "../Advantages/Advantage";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { selectProductsSlider } from "../../../store/selectors/content/productsSelectors";
import { fetchProductsSlider } from "../../../store/api/content/productsApi";

const AdvantagesSlider = ({ left }) => {
  const dispatch = useDispatch();
  const isRtl = localStorage.getItem("language") === "heb";

  const productsDataSlider = useSelector((state) =>
    selectProductsSlider(state, isRtl ? "heb" : "en")
  );

  useEffect(() => {
    const currentLang = isRtl ? "heb" : "en";
    if (!productsDataSlider) {
      dispatch(fetchProductsSlider(currentLang));
    }
  }, [dispatch, isRtl, productsDataSlider]);

  const slides = Array.isArray(productsDataSlider)
    ? productsDataSlider.map(({ description, title, image, slug }) => ({
        description,
        title,
        image,
        slug,
      }))
    : [];

  return (
    <div className={styles.sliderContainer}>
      <motion.div className={styles.sliderWrapper} style={{ left }}>
        {slides.map((slide) => (
          <div className={styles.slide} key={slide.slug}>
            <AdvantageBlock
              title={slide.title}
              description={slide.description}
              backgroundImage={slide.image}
              id={slide.slug}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdvantagesSlider;
