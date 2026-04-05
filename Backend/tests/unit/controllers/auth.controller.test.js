import * as authController from "../../../src/modules/auth/auth.controller.js";
import * as authService from "../../../src/modules/auth/auth.service.js";

jest.mock("../../../src/modules/auth/auth.service.js");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn();
  res.clearCookie = jest.fn();
  return res;
};

describe("Auth Controller Unit", () => {

  afterEach(() => jest.clearAllMocks());

  it("sendOtp → should send OTP", async () => {
    const req = { body: { email: "test@gmail.com" } };
    const res = mockRes();

    await authController.sendOtp(req, res);

    expect(authService.sendOtp).toHaveBeenCalledWith("test@gmail.com");
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "OTP sent successfully",
    });
  });

  it("verifyOtp → should verify OTP", async () => {
    const req = { body: { email: "test@gmail.com", otp: "1234" } };
    const res = mockRes();

    authService.verifyOtp.mockResolvedValue({
      success: true,
      message: "OTP verified",
    });

    await authController.verifyOtp(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "OTP verified",
    });
  });

  it("register → should set cookie + return user", async () => {
    const req = { body: { email: "test@gmail.com" } };
    const res = mockRes();

    authService.register.mockResolvedValue({
      success: true,
      token: "fakeToken",
    });

    await authController.register(req, res);

    expect(res.cookie).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("login → should return success", async () => {
    const req = { body: { email: "test@gmail.com" } };
    const res = mockRes();

    authService.login.mockResolvedValue({ success: true });

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("verifyLoginOtp → should set cookie", async () => {
    const req = { body: { email: "test@gmail.com", otp: "123456" } };
    const res = mockRes();

    authService.verifyLoginOtp.mockResolvedValue({
      success: true,
      token: "token",
    });

    await authController.verifyLoginOtp(req, res);

    expect(res.cookie).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });

  it("getProfile → should return user", async () => {
    const req = { user: { id: "1", email: "test@gmail.com" } };
    const res = mockRes();

    await authController.getProfile(req, res);

    expect(res.json).toHaveBeenCalledWith(req.user);
  });

  it("updateProfile → should update user", async () => {
    const req = { user: { id: "1" }, body: { name: "New" } };
    const res = mockRes();

    authService.updateProfile.mockResolvedValue({ name: "New" });

    await authController.updateProfile(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      user: { name: "New" },
    });
  });

  it("logout → should clear cookie", async () => {
    const req = { cookies: { token: "abc" } };
    const res = mockRes();

    await authController.logout(req, res);

    expect(res.clearCookie).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Logged out successfully",
    });
  });

});