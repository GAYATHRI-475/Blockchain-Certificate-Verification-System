// // File: backend/controllers/issuerController.js

// import Request from "../models/Request.js";


// /* =====================================================
//    GET: Requests received by the issuer
//    Route: GET /api/issuer/requests
// ===================================================== */

// export const getIssuerRequests = async (req, res) => {

//   try {

//     const issuerEmail = req.user.email;

//     const requests = await Request.find({ issuerEmail })
//       .sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       requests
//     });

//   } catch (error) {

//     console.error("Error fetching issuer requests:", error);

//     res.status(500).json({
//       success: false,
//       message: "Server error"
//     });

//   }

// };



// /* =====================================================
//    UPDATE: Approve or Reject request
//    Route: PUT /api/issuer/requests/:id
// ===================================================== */

// export const updateRequestStatus = async (req, res) => {

//   try {

//     const { id } = req.params;
//     const { status } = req.body;

//     if (!["Approved", "Rejected", "Pending"].includes(status)) {

//       return res.status(400).json({
//         success: false,
//         message: "Invalid status"
//       });

//     }

//     const request = await Request.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     );

//     if (!request) {

//       return res.status(404).json({
//         success: false,
//         message: "Request not found"
//       });

//     }

//     res.json({
//       success: true,
//       message: "Request status updated",
//       request
//     });

//   } catch (error) {

//     console.error("Error updating request:", error);

//     res.status(500).json({
//       success: false,
//       message: "Server error"
//     });

//   }

// };

// File: backend/controllers/issuerRequestController.js

import Request from "../models/Request.js";

/*
--------------------------------
GET REQUESTS FOR ISSUER
--------------------------------
*/

export const getIssuerRequests = async (req, res) => {

  try {

    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Issuer email is required"
      });
    }

    const requests = await Request.find({ issuerEmail: email })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      requests
    });

  } catch (error) {

    console.error("Error fetching issuer requests:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};


/*
--------------------------------
UPDATE REQUEST STATUS
--------------------------------
*/

export const updateRequestStatus = async (req, res) => {

  try {

    const { id } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status"
      });
    }

    const request = await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found"
      });
    }

    res.json({
      success: true,
      request
    });

  } catch (error) {

    console.error("Error updating request:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};