import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import FormData from "form-data";
import axios from "axios";

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET;

// console.log("PINATA_API_KEY:", PINATA_API_KEY);
// console.log("PINATA_API_SECRET:", PINATA_API_SECRET);

export const uploadToIPFS = async (filePath) => {

  try {

    console.log("Uploading file to IPFS:", filePath);

    const data = new FormData();

    data.append("file", fs.createReadStream(filePath));

    console.log("Using Pinata Key:", PINATA_API_KEY);
    console.log("Using Pinata Secret:", PINATA_API_SECRET);

    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data,
      {
        maxBodyLength: "Infinity",
        headers: {
          ...data.getHeaders(),
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_API_SECRET,
        },
      }
    );

    console.log("Pinata Response:", response.data);

    const ipfsHash = response.data.IpfsHash;

    console.log("IPFS Hash:", ipfsHash);

    return ipfsHash;

  } catch (error) {

    console.error("IPFS Upload Error:", error.response?.data || error.message);

    throw error;

  }
};