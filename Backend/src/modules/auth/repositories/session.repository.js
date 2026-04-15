import Session from "../models/Session.model.js";

export const createSession = (data) =>
  Session.create(data);

export const findValidSession = (refreshHash) =>
  Session.findOne({
    refreshHash,
    revoked: false,
    expiresAt: { $gt: new Date() },
  });

export const revokeSession = (sessionId) =>
  Session.findByIdAndUpdate(
    sessionId,
    { revoked: true },
    { returnDocument: "after" }
  );

export const revokeByHash = (refreshHash) =>
  Session.findOneAndUpdate(
    { refreshHash },
    { revoked: true },
    { returnDocument: "after" }
  );

export const revokeAllUserSessions = (userId) =>
  Session.updateMany(
    { userId, revoked: false },
    { revoked: true }
  );

export const deleteExpiredSessions = () =>
  Session.deleteMany({ expiresAt: { $lt: new Date() } });