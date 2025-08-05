import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import styles from "./Form.module.scss";
import { fetchContactForm } from "../../services/api/form/contactFormApi";

export const Form = ({ top, isShadow = true, style }) => {
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
      } else {
        setMessage({ type: "error", text: t("form.error") });
      }
    } catch (error) {
      setMessage({ type: "error", text: t("form.error") });
      console.error("Ошибка отправки формы:", error);
    }
  };

  return (
    <motion.div
      className={
        isShadow ? styles.formContainerWithShadow : styles.formContainer
      }
      style={{ top, ...style }}
    >
      <div className={styles.pageNum}>{t("LET'S_ALK")}</div>
      <div>
        <div className={styles.subtitle}>
          {t("FILL_IN_THE_FORM")}
          <span className={styles.blue}> {t("AND_WE_WILL")}</span>
          <br />
          <span className={styles.blue}> {t("GET_BACK_TO_YOU")}</span>
        </div>
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
            <p className={styles.checkBoxText}>{t("I_HAVE_READ_AND_AGREE")}</p>
          </div>
          {errors.acceptTerms && (
            <p className={styles.error}>{errors.acceptTerms.message}</p>
          )}

          <button
            type="submit"
            style={{ opacity: isValid ? 1 : 0.5 }}
            className={styles.button}
            disabled={!isValid}
          >
            <p className={styles.buttonText}>{t("submit")}</p>
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Form;
