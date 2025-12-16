const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Create new appointment
exports.createAppointment = async (req, res) => {
  try {
    const {
      counselor,
      date,
      time,
      duration,
      type,
      concerns
    } = req.body;

    // Check if counselor exists and is a counselor
    const counselorUser = await User.findOne({
      _id: counselor,
      role: 'counselor'
    });

    if (!counselorUser) {
      return res.status(404).json({
        success: false,
        message: 'Counselor not found'
      });
    }

    // Check if the time slot is available
    const existingAppointment = await Appointment.findOne({
      counselor,
      date,
      time,
      status: { $ne: 'cancelled' }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked'
      });
    }

    const appointment = new Appointment({
      student: req.user.userId,
      counselor,
      date,
      time,
      duration,
      type,
      concerns
    });

    await appointment.save();

    // Add appointment to both student and counselor's appointments array
    await User.findByIdAndUpdate(
      req.user.userId,
      { $push: { appointments: appointment._id } }
    );

    await User.findByIdAndUpdate(
      counselor,
      { $push: { appointments: appointment._id } }
    );

    res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating appointment',
      error: error.message
    });
  }
};

// Get all appointments for a user
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      $or: [
        { student: req.user.userId },
        { counselor: req.user.userId }
      ]
    })
    .populate('student', 'username profile')
    .populate('counselor', 'username profile')
    .sort({ date: 1, time: 1 });

    res.json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
      error: error.message
    });
  }
};

// Get single appointment
exports.getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      $or: [
        { student: req.user.userId },
        { counselor: req.user.userId }
      ]
    })
    .populate('student', 'username profile')
    .populate('counselor', 'username profile');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching appointment',
      error: error.message
    });
  }
};

// Update appointment
exports.updateAppointment = async (req, res) => {
  try {
    const {
      date,
      time,
      duration,
      type,
      status,
      notes,
      concerns,
      followUp,
      followUpDate
    } = req.body;

    const appointment = await Appointment.findOneAndUpdate(
      {
        _id: req.params.id,
        $or: [
          { student: req.user.userId },
          { counselor: req.user.userId }
        ]
      },
      {
        date,
        time,
        duration,
        type,
        status,
        notes,
        concerns,
        followUp,
        followUpDate
      },
      {
        new: true,
        runValidators: true
      }
    )
    .populate('student', 'username profile')
    .populate('counselor', 'username profile');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating appointment',
      error: error.message
    });
  }
};

// Delete appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      student: req.user.userId
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Remove appointment from both student and counselor's appointments array
    await User.findByIdAndUpdate(
      appointment.student,
      { $pull: { appointments: appointment._id } }
    );

    await User.findByIdAndUpdate(
      appointment.counselor,
      { $pull: { appointments: appointment._id } }
    );

    await appointment.remove();

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting appointment',
      error: error.message
    });
  }
}; 