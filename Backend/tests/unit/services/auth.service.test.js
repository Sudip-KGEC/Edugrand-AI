import * as authService from "../../../src/modules/auth/auth.service.js";
import * as authRepo from "../../../src/modules/auth/auth.repository.js";
import { sendEmail } from "../../../src/services/email/email.service.js";
import { generateToken } from "../../../src/utils/generateToken.js";

jest.mock("../../../src/modules/auth/auth.repository.js");
jest.mock("../../../src/services/email/email.service.js");
jest.mock("../../../src/utils/generateToken.js");

describe("Auth Service Unit", () => {

  afterEach(() => jest.clearAllMocks());

  it("sendOtp → should save OTP + send email", async () => {
    await authService.sendOtp("test@gmail.com");

    expect(authRepo.saveOtp).toHaveBeenCalled();
    expect(sendEmail).toHaveBeenCalled();
  });

  it("verifyOtp → success", async () => {
    authRepo.findOtp.mockResolvedValue({
      otp: "1234",
      otpExpiry: Date.now() + 10000,
      _id: "1",
    });

    const res = await authService.verifyOtp("test@gmail.com", "1234");

    expect(res.success).toBe(true);
    expect(authRepo.deleteOtp).toHaveBeenCalled();
  });

  it("verifyOtp → invalid", async () => {
    authRepo.findOtp.mockResolvedValue({
      otp: "9999",
      otpExpiry: Date.now() + 10000,
    });

    await expect(
      authService.verifyOtp("test@gmail.com", "1234")
    ).rejects.toThrow("Invalid OTP");
  });

  it("register → success", async () => {
    authRepo.findUserByEmail.mockResolvedValue(null);
    authRepo.createUser.mockResolvedValue({ _id: "1" });
    generateToken.mockReturnValue("token");

    const res = await authService.register({ email: "test@gmail.com" });

    expect(res.token).toBe("token");
  });

  it("register → user exists", async () => {
    authRepo.findUserByEmail.mockResolvedValue({ email: "test@gmail.com" });

    await expect(
      authService.register({ email: "test@gmail.com" })
    ).rejects.toThrow("User already exists");
  });

  it("login → success", async () => {
    authRepo.findUserByEmail.mockResolvedValue({ email: "test@gmail.com" });
    authRepo.findOtp.mockResolvedValue(null);

    const res = await authService.login({ email: "test@gmail.com" });

    expect(res.success).toBe(true);
    expect(authRepo.saveOtp).toHaveBeenCalled();
  });

  it("login → user not found", async () => {
    authRepo.findUserByEmail.mockResolvedValue(null);

    await expect(
      authService.login({ email: "x@gmail.com" })
    ).rejects.toThrow("User not found");
  });

  it("verifyLoginOtp → success", async () => {
    authRepo.findOtp.mockResolvedValue({
      otp: "123456",
      otpExpiry: Date.now() + 10000,
      _id: "1",
    });

    authRepo.findUserByEmail.mockResolvedValue({
      _id: "1",
      email: "test@gmail.com",
    });

    generateToken.mockReturnValue("token");

    const res = await authService.verifyLoginOtp({
      email: "test@gmail.com",
      otp: "123456",
    });

    expect(res.token).toBe("token");
  });

});