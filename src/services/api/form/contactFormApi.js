import { BASE_URL_BACKEND } from "../../../const/api";


export const fetchContactForm = async (data) => {
  try {
    const response = await fetch(`${BASE_URL_BACKEND}/feedback-form/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit the form");
    }

    return { success: true, message: "Form submitted successfully" };
  } catch (error) {
    console.error("Error submitting form:", error);
    return { success: false, message: error.message };
  }
};
