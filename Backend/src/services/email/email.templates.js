export const otpTemplate = (otp) => `
  <div style="font-family: sans-serif;">
    <h2>Your OTP Code</h2>
    <p>Your verification code is:</p>
    <h1 style="color:#4F46E5;">${otp}</h1>
    <p>This code expires in 5 minutes.</p>
  </div>
`;

export const deadlineTemplate = (name) => `
  <h3>Deadline Alert</h3>
  <p>The scholarship <b>${name}</b> expires soon.</p>
`;

export const matchTemplate = (name) => `
  <h3>New Match Found</h3>
  <p>A scholarship "<b>${name}</b>" matches your profile.</p>
`;