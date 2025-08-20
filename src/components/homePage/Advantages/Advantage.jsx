import React, { useState, useEffect } from "react";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import styles from "./Advantage.module.scss";
import { useNavigate } from "react-router-dom";
import useDeviceDetection from "../../../hooks/useDeviceDetection";

const AdvantageBlock = ({
  description,
  title,
  backgroundImage = "/images/securitySlidegBG.svg",
  id,
}) => {
  const device = useDeviceDetection();
  const [isRtl, setIsRtl] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const language = localStorage.getItem("language"); //
    setIsRtl(language === "heb"); //
  }, []);
  const handleClickProduct = () => {
    navigate(`/product/${id}`);
  };
  return (
    <div
      className={styles.block}
      style={{ "--bg-image": `url(${backgroundImage})` }} // Устанавливаем переменную фона
      onClick={device !== "Mobile" ? handleClickProduct : undefined} // Условие для onClick
    ><div className={styles.opacity}></div>
      <div className={styles.descriptionAdvantage}></div>
      <div className={styles.bottomBlock}>
        <div
          className={styles.titleAdvantage}
          style={{ textTransform: "uppercase" }}
        >
          {title}
        </div>
        <div
          className={styles.circle}
          onClick={device === "Mobile" ? handleClickProduct : undefined} // Условие для onClick
        >
          {isRtl ? (
            <GoArrowLeft style={{ color: "white" }} />
          ) : (
            <GoArrowRight style={{ color: "white" }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvantageBlock;
