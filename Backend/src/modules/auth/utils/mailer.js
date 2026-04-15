import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function generateOtpTemplate(otp) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>OTP Verification</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td style="background:#4f46e5; padding:20px; text-align:center; color:#ffffff;">
                <h1 style="margin:0; font-size:22px;">🔐 Secure Login</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px;">
                <h2 style="margin:0 0 10px; color:#111827;">Verify Your Email</h2>
                <p style="margin:0 0 20px; color:#6b7280; font-size:14px;">
                  Use the OTP below to complete your login. This code is valid for 10 minutes.
                </p>

                <!-- OTP BOX -->
                <div style="text-align:center; margin:30px 0;">
                  <span style="
                    display:inline-block;
                    background:#f3f4f6;
                    padding:15px 25px;
                    font-size:28px;
                    letter-spacing:6px;
                    font-weight:bold;
                    border-radius:8px;
                    color:#111827;
                  ">
                    ${otp}
                  </span>
                </div>

                <p style="font-size:13px; color:#9ca3af;">
                  If you didn’t request this, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#9ca3af;">
                © ${new Date().getFullYear()} Your Company. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

export async function sendOtpEmail(email, otp) {
  await transporter.sendMail({
    from: `"Auth Team" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your OTP Code - Secure Login",
    text: `Your OTP is ${otp}. It expires in 10 minutes.`,
    html: generateOtpTemplate(otp),
  });
}