// TeamCarousel.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./TeamCarousel.module.scss";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useDeviceDetection from "../../../hooks/useDeviceDetection";
import { BASE_URL_BACKEND_FOR_MEDIA } from "../../../const/api";

const TeamCarousel = ({ content, media }) => {
  const { t } = useTranslation();
  const device = useDeviceDetection();

  const teamMembers = content.map((member, index) => ({
    name: member.name,
    description: member.job_title,
    image: `${BASE_URL_BACKEND_FOR_MEDIA}${media[index].photo}`,
    load: "/images/aboutCarousel.svg",
  }));

  const [rtlSetting, setRtlSetting] = useState(false); // Default is false

  useEffect(() => {
    // Получаем текущий язык из localStorage
    const language = localStorage.getItem("language"); // Проверка текущего языка
    if (language === "heb") {
      setRtlSetting(true); // Если язык на иврите, включаем rtl
    } else {
      setRtlSetting(false); // В противном случае отключаем rtl
    }
  }, [rtlSetting]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 1500,
    draggable: true, // Свободное листание мышкой
    rtl: rtlSetting, // Используем состояние rtlSetting

    customPaging: (i) => (
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "rgba(204, 209, 217, 1)",
          position: "relative",
        }}
      />
    ),
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "-5.5vh",
          width: "100%",
          left: "23vw",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "50%", // Ширина всей полосы прогресса
            height: "1px",
            backgroundColor: "rgba(204, 209, 217, 1)", // Цвет основной полоски
          }}
        >
          <div
            style={{
              position: "absolute",
              left: `${
                dots.findIndex((dot) =>
                  dot.props.className.includes("slick-active")
                ) *
                (50 / dots.length)
              }%`,
              width: `${50 / dots.length}%`,
              height: "5px",
              backgroundColor: "orange", // Оранжевая полоска
              transition: "left 0.5s ease-in-out",
            }}
          />
        </div>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={`${styles.carouselContainer} ${rtlSetting ? styles.hebFont : styles.enFont}`}>
      <Slider key={rtlSetting ? "ltr" : "ltr"} {...settings}>
        {teamMembers.map((member, index) => (
          <div key={index} className={`${styles.memberCard} ${rtlSetting ? styles.hebFont : styles.enFont}`}>
            <div className={styles.imageDiv}>
              <img
                src={member.load}
                alt={member.name}
                className={styles.load}
              />
              <img
                src={member.image}
                alt={member.name}
                className={styles.image}
                style={{
                  height:
                    device === "Mobile"
                      ? index === 0
                        ? "64vw"
                        : "70vw"
                      : index === 0
                      ? "16.6vw"
                      : "19.6vw",
                }}
              />
            </div>
            <div
              className={styles.name}
              style={{
                direction: rtlSetting ? "rtl" : "ltr", // Устанавливаем направление текста
                textAlign: rtlSetting ? "center" : "left", // Выравнивание текста
                padding: rtlSetting && device === "Mobile" ? " 0 20vw 0 0" : "",
              }}
            >
              {member.name}
            </div>
            <div
              className={styles.description}
              style={{
                direction: rtlSetting ? "rtl" : "ltr", // Устанавливаем направление текста
                textAlign: rtlSetting ? "right" : "left", // Выравнивание текста
                writspace: "pre-line",
              }}
            >
              {member.description.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TeamCarousel;
