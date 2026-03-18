import Certificate from "../models/Certificate.js";
import Request from "../models/Request.js";

// Fetch certificates
export const getUserCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ studentEmail: req.user.email });
    res.json({ success: true, certificates });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Fetch requests
export const getUserRequests = async (req, res) => {
  try {
    const requests = await Request.find({ studentEmail: req.user.email });
    res.json({ success: true, requests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create new request
export const createUserRequest = async (req, res) => {
  try {
    const newRequest = new Request({
      studentName: req.user.name,
      studentEmail: req.user.email,
      department: req.body.department,
      issuerEmail: req.body.issuerEmail,
      credentialType: req.body.credentialType,
      certificateTitle: req.body.certificateTitle,
      issueDate: req.body.issueDate,
      action: req.body.action,
      description: req.body.description,
      status: "Pending"
    });
    await newRequest.save();
    res.json({ success: true, request: newRequest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create request" });
  }
};