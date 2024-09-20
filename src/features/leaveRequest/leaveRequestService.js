import * as leaveRequestRepo from "./leaveRequestRepo.js";

export const createLeaveRequest = async (leaveRequestData) => {
  return await leaveRequestRepo.createLeaveRequest(leaveRequestData);
};

export const getLeaveRequestById = async (id) => {
  const leaveRequest = await leaveRequestRepo.getLeaveRequestById(id);
  if (!leaveRequest) {
    throw new Error("Leave request not found");
  }
  return leaveRequest;
};

export const updateLeaveRequest = async (id, leaveRequestData) => {
  return await leaveRequestRepo.updateLeaveRequest(id, leaveRequestData);
};

export const deleteLeaveRequest = async (id) => {
  return await leaveRequestRepo.deleteLeaveRequest(id);
};

export const getLeaveRequests = async (filters) => {
  return await leaveRequestRepo.getLeaveRequests(filters);
};

export const approveLeaveRequest = async (id) => {
  return await leaveRequestRepo.updateLeaveRequest(id, { status: "APPROVED" });
};

export const rejectLeaveRequest = async (id) => {
  return await leaveRequestRepo.updateLeaveRequest(id, { status: "REJECTED" });
};
