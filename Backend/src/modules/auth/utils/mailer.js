import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function generateOtpTemplate(otp) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Edugrand AI - Security Verification</title>
  </head>

  <body style="margin:0; padding:0; background:#0f172a; font-family:Segoe UI,Arial,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">

          <table width="560" cellpadding="0" cellspacing="0" style="background:#111827; border-radius:16px; overflow:hidden; border:1px solid #1f2937;">

            <tr>
              <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6); padding:26px; text-align:center; color:#fff;">
                <h1 style="margin:0; font-size:22px; letter-spacing:0.5px;">Edugrand AI</h1>
                <p style="margin:6px 0 0; font-size:12px; opacity:0.9;">Secure Access Verification</p>
              </td>
            </tr>

            <tr>
              <td style="padding:32px 28px; color:#e5e7eb;">

                <h2 style="margin:0 0 10px; font-size:20px; color:#ffffff;">
                  Verify Your Login
                </h2>

                <p style="margin:0 0 20px; font-size:14px; color:#9ca3af; line-height:1.6;">
                  Enter the one-time code below to securely continue. Do not share this code with anyone.
                </p>

                <div style="text-align:center; margin:30px 0;">
                  <div style="
                    display:inline-block;
                    background:linear-gradient(135deg,#1e293b,#0f172a);
                    padding:20px 34px;
                    font-size:34px;
                    letter-spacing:10px;
                    font-weight:700;
                    border-radius:12px;
                    color:#f8fafc;
                    border:1px solid #374151;
                    box-shadow:0 0 20px rgba(99,102,241,0.25);
                  ">
                    ${otp}
                  </div>
                </div>

                <p style="text-align:center; font-size:13px; color:#9ca3af;">
                  Expires in <strong style="color:#ffffff;">10 minutes</strong>
                </p>

                <hr style="border:none; border-top:1px solid #1f2937; margin:26px 0;" />

                <p style="font-size:12px; color:#6b7280; line-height:1.6;">
                  If you did not request this code, you can safely ignore this email. For security reasons, never share your OTP.
                </p>

              </td>
            </tr>

            <tr>
              <td style="background:#020617; padding:18px; text-align:center; font-size:11px; color:#6b7280;">
                <p style="margin:0;">© ${new Date().getFullYear()} Edugrand AI</p>
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
  const info = await transporter.sendMail({
    from: `"Edugrand AI Security" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Secure OTP Code",
    html: generateOtpTemplate(otp),
    text: `Your OTP is ${otp}. It expires in 10 minutes.`,
  });

  if (!info?.messageId) {
    throw new Error("Email not sent");
  }

  return info;
}