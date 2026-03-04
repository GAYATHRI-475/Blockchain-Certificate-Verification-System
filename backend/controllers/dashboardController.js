import Certificate from "../models/Certificate.js";

export const getDashboardStats = async (req, res) => {
  try {
    // 🔹 Total certificates issued
    const totalIssued = await Certificate.countDocuments();

    // 🔹 Revoked certificates
    const revoked = await Certificate.countDocuments({
      status: "revoked",
    });

    // 🔹 Active recipients (unique emails)
    const activeRecipients = await Certificate.distinct(
      "recipientEmail",
      { status: "active" }
    );

    res.status(200).json({
      totalIssued,
      revoked,
      activeRecipients: activeRecipients.length,
    });

  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({
      message: "Error fetching dashboard stats",
    });
  }
};