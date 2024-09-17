import * as leaveRequestService from "./leaveRequestService.js";

export const createLeaveRequest = async (req, res) => {
  try {
    const newLeaveRequest = await leaveRequestService.createLeaveRequest({
      ...req.body,
      userId: req.user.userID,
    });
    res.status(201).json(newLeaveRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getLeaveRequestById = async (req, res) => {
  try {
    const leaveRequest = await leaveRequestService.getLeaveRequestById(
      parseInt(req.params.id)
    );
    res.status(200).json(leaveRequest);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const updateLeaveRequest = async (req, res) => {
  try {
    const updatedLeaveRequest = await leaveRequestService.updateLeaveRequest(
      parseInt(req.params.id),
      req.body
    );
    res.status(200).json(updatedLeaveRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteLeaveRequest = async (req, res) => {
  try {
    await leaveRequestService.deleteLeaveRequest(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getLeaveRequests = async (req, res) => {
  try {
    const filters =
      req.user.role === "ADMIN" ? {} : { userId: req.user.userID };
    const leaveRequests = await leaveRequestService.getLeaveRequests(filters);
    res.status(200).json(leaveRequests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const approveLeaveRequest = async (req, res) => {
  try {
    const approvedRequest = await leaveRequestService.approveLeaveRequest(
      parseInt(req.params.id)
    );
    res.status(200).json(approvedRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const rejectLeaveRequest = async (req, res) => {
  try {
    const rejectedRequest = await leaveRequestService.rejectLeaveRequest(
      parseInt(req.params.id)
    );
    res.status(200).json(rejectedRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
