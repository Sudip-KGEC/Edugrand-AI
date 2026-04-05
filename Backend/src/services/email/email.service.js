import { transporter } from "./email.config.js";

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
}) => {
  try {
    const info = await transporter.sendMail({
      from: `"EduGrant" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    return info;
  } catch (error) {
    console.error("❌ Email failed:", error);
    throw new Error("Email sending failed");
  }
};