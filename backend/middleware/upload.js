// File: backend/middleware/upload.js
import multer from "multer";
import path from "path";

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure this folder exists in your project root
  },
  filename: (req, file, cb) => {
    // Save the file with a unique timestamp + original extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter (optional) to accept only PDFs or images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, JPEG, and PNG files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;