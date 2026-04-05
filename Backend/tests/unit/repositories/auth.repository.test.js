import * as authRepo from "../../../src/modules/auth/auth.repository.js";
import User from "../../../src/database/models/User.model.js";
import Otp from "../../../src/database/models/Otp.model.js";

jest.mock("../../../src/database/models/User.model.js");
jest.mock("../../../src/database/models/Otp.model.js");

describe("Auth Repository Unit", () => {

  afterEach(() => jest.clearAllMocks());

  it("saveOtp → should store otp", async () => {
    Otp.findOneAndUpdate.mockResolvedValue({ otp: "1234" });

    const res = await authRepo.saveOtp("test@gmail.com", "1234");

    expect(res.otp).toBe("1234");
  });

  it("findOtp → should return otp", async () => {
    Otp.findOne.mockResolvedValue({ otp: "1234" });

    const res = await authRepo.findOtp("test@gmail.com");

    expect(res.otp).toBe("1234");
  });

  it("findUserByEmail → should return user", async () => {
    User.findOne.mockResolvedValue({ email: "test@gmail.com" });

    const user = await authRepo.findUserByEmail("test@gmail.com");

    expect(user.email).toBe("test@gmail.com");
  });

  it("createUser → should save user", async () => {
    const saveMock = jest.fn().mockResolvedValue({ email: "test@gmail.com" });

    User.mockImplementation(() => ({
      save: saveMock,
    }));

    const user = await authRepo.createUser({ email: "test@gmail.com" });

    expect(user.email).toBe("test@gmail.com");
  });

});