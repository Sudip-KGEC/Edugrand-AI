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
    <title>Edugrand AI - OTP Verification</title>
  </head>

  <body style="margin:0; padding:0; background-color:#f3f6fb; font-family: 'Segoe UI', Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
      <tr>
        <td align="center">

          <!-- Main Container -->
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(90deg,#4f46e5,#6366f1); padding:24px; text-align:center; color:#ffffff;">
                <h1 style="margin:0; font-size:24px; letter-spacing:0.5px;">
                  🎓 Edugrand AI
                </h1>
                <p style="margin:6px 0 0; font-size:13px; opacity:0.9;">
                  Smart Learning • Career Growth • AI Powered
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px 30px;">

                <h2 style="margin:0 0 12px; color:#111827;">
                  Verify Your Identity
                </h2>

                <p style="margin:0 0 20px; color:#6b7280; font-size:14px; line-height:1.6;">
                  You're trying to securely sign in to your Edugrand account.  
                  Please use the verification code below to continue.
                </p>

                <!-- OTP BOX -->
                <div style="text-align:center; margin:30px 0;">
                  <div style="
                    display:inline-block;
                    background:linear-gradient(135deg,#eef2ff,#e0e7ff);
                    padding:18px 30px;
                    font-size:32px;
                    letter-spacing:8px;
                    font-weight:700;
                    border-radius:10px;
                    color:#1e1b4b;
                    border:1px dashed #c7d2fe;
                  ">
                    ${otp}
                  </div>
                </div>

                <!-- Info -->
                <p style="text-align:center; font-size:13px; color:#6b7280;">
                  ⏱ This code will expire in <strong>10 minutes</strong>
                </p>

                <hr style="border:none; border-top:1px solid #e5e7eb; margin:25px 0;" />

                <!-- Security Note -->
                <p style="font-size:12px; color:#9ca3af; line-height:1.5;">
                  If you didn’t request this code, you can safely ignore this email.  
                  Never share your OTP with anyone — Edugrand will never ask for it.
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#9ca3af;">
                
                <p style="margin:0;">
                  © ${new Date().getFullYear()} Edugrand AI. All rights reserved.
                </p>

                <p style="margin:6px 0 0;">
                  Need help? Contact 
                  <a href="mailto:support@edugrand.ai" style="color:#4f46e5; text-decoration:none;">
                    support@edugrand.ai
                  </a>
                </p>

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
    from: `"Edugrand AI Security" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your Edugrand Verification Code",
    text: `Your Edugrand OTP is ${otp}. It expires in 10 minutes.`,
    html: generateOtpTemplate(otp),
  });
}