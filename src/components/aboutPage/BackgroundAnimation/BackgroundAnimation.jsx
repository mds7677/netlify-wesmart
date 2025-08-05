import React from "react";
import { motion } from "framer-motion";
import styles from '../../../pages/About/About.module.scss'

const BackgroundAnimation = ({backgroundOpacity}) =>{

    return (
        <motion.div className={styles.BackgroundAnim} style={{ opacity: backgroundOpacity }}>
            <div className={styles.littleCircle} />
            <div className={styles.midCircle} />
            <div className={styles.bigCircle} />
            <motion.div
              className={styles.littleStar}
              animate={{ scale: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            >
              <img src="/images/aboutStar.svg" alt="no-image" />
            </motion.div>

            <motion.div
              className={styles.bigStar}
              animate={{ scale: [1, 0.12, 1] }}
              transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
            >
              <img src="/images/aboutStar.svg" alt="no-image" />
            </motion.div>
          </motion.div>
    )
}

export default BackgroundAnimation