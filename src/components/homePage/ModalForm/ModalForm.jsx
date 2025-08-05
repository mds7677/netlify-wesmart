import React, { useEffect, useState } from "react";
import styles from "./MolalForm.module.scss";
import { GoArrowDown } from "react-icons/go";
import { useTranslation } from "react-i18next";
import useDeviceDetection from "../../../hooks/useDeviceDetection";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fetchContactForm } from "../../../services/api/form/contactFormApi";

const Modal = ({ isVisible, onClose }) => {
  const device = useDeviceDetection;
  const { t } = useTranslation();
  const [message, setMessage] = useState(null);

  const schema = yup.object().shape({
    name: yup.string().required(() => t("validation.name_required")),
    company: yup.string().required(() => t("validation.company_required")),
    job_title: yup.string().required(() => t("validation.job_title_required")),
    email: yup
      .string()
      .email(() => t("validation.invalid_email"))
      .required(() => t("validation.email_required")),
    acceptTerms: yup
      .boolean()
      .oneOf([true], () => t("validation.accept_terms")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const formattedData = {
      name: data.name,
      company: data.company,
      job_title: data.job_title,
      email: data.email,
    };

    try {
      setMessage(null);
      const result = await fetchContactForm(formattedData);
      if (result.success) {
        setMessage({ type: "success", text: t("form.success") });
        reset();
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setMessage({ type: "error", text: t("form.error") });
      }
    } catch (error) {
      setMessage({ type: "error", text: t("form.error") });
      console.error("Ошибка отправки формы:", error);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const isHebrew = localStorage.getItem("language") === "heb";

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.contentContainer}>
          <button
            className={styles.closeButton}
            style={{
              left:
                device === "Mobile" ? undefined : isHebrew ? "-45vw" : "40vw",
            }}
            onClick={onClose}
          >
            &times;
          </button>
          <div className={styles.mobileContainer}>
            <div className={styles.subtitle}>{t("Contacts_us")}</div>
            {message && (
              <p
                className={
                  message.type === "success"
                    ? styles.successMessage
                    : styles.errorMessage
                }
              >
                {message.text}
              </p>
            )}
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.flexColumn}>
                <input
                  className={styles.input}
                  type="text"
                  {...register("name")}
                  placeholder={t("Name")}
                />
                {errors.name && (
                  <p className={styles.error}>{errors.name.message}</p>
                )}

                <input
                  className={styles.input}
                  type="text"
                  {...register("company")}
                  placeholder={t("Company")}
                />
                {errors.company && (
                  <p className={styles.error}>{errors.company.message}</p>
                )}

                <input
                  className={styles.input}
                  type="text"
                  {...register("job_title")}
                  placeholder={t("Job_title")}
                />
                {errors.job_title && (
                  <p className={styles.error}>{errors.job_title.message}</p>
                )}

                <input
                  className={styles.input}
                  type="email"
                  {...register("email")}
                  placeholder={t("Email")}
                />
                {errors.email && (
                  <p className={styles.error}>{errors.email.message}</p>
                )}
              </div>
              <div className={styles.checkBoxContainer}>
                <input
                  type="checkbox"
                  className={styles.checkBox}
                  {...register("acceptTerms")}
                />
                <p className={styles.checkBoxText}>
                  {t("I_HAVE_READ_AND_AGREE")}
                </p>
              </div>
              {errors.acceptTerms && (
                <p className={styles.error}>{errors.acceptTerms.message}</p>
              )}

              <button
                type="submit"
                style={{ opacity: isValid ? 1 : 0.5, padding: "4%" }}
                className={styles.button}
                disabled={!isValid}
              >
                <p className={styles.buttonText}>{t("submit")}</p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
