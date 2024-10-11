
import * as leaveRepo from './leaveRepo.js'; 
import * as notificationService from '../notification/notificationService.js';
export const approveLeaveRequest = async (req, res) => {
  const { leaveId } = req.params;

  try {
    // Update leave status to Approved

    const leaveRequest = await leaveRepo.updateLeaveRequest(leaveId, { status: 'APPROVED' });


    // Send notification to the user
    await notificationService.createNotification({
      userId: leaveRequest.userId,

      message: 'Your leave request has been approved.',
      type: 'LEAVE_APPROVAL',
    });

    res.status(200).json({ message: 'Leave request approved and notification sent.' });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const rejectLeaveRequest = async (req, res) => {
  const { leaveId } = req.params;

  try {

    const leaveRequest = await leaveRepo.updateLeaveRequest(leaveId, { status: 'REJECTED' });

    await notificationService.createNotification({
      userId: leaveRequest.userId,
      message: 'Your leave request has been rejected.',
      type: 'LEAVE_APPROVAL',
    });

    res.status(200).json({ message: 'Leave request rejected and notification sent.' });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
