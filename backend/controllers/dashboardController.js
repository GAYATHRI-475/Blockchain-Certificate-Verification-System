import Certificate from "../models/Certificate.js";
import Request from "../models/Request.js";

export const getDashboardStats = async (req, res) => {
  try {
    // 🔹 Total certificates issued
    const totalIssued = await Certificate.countDocuments();

    // 🔹 Revoked certificates
    const revoked = await Certificate.countDocuments({
      status: "revoked",
    });

    // 🔹 Pending Requests
    const pendingRequests = await Request.countDocuments({
      status: "Pending",
    });

    res.status(200).json({
      totalIssued,
      revoked,
      pendingRequests,
    });

  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({
      message: "Error fetching dashboard stats",
    });
  }
};