# 🛡️ Blockchain Certificate Verification System

A secure and decentralized platform for issuing, managing, and verifying certificates using blockchain technology. This system empowers educational institutions, organizations, and individuals to issue tamper-proof certificates and verify their authenticity in real-time.

---

## 📖 Introduction

The **Blockchain Certificate Verification System** leverages blockchain technology to address the challenges of certificate forgery and manual verification. By storing certificate data on a blockchain, issuers can guarantee authenticity, while recipients and verifiers can instantly validate the legitimacy of any certificate.

---

## ✨ Features

- **Decentralized Certificate Storage:** All certificates are recorded on the blockchain, ensuring immutability and transparency.
- **User Authentication:** Secure user and issuer authentication via JWT, including Google OAuth support.
- **Dashboard Analytics:** Real-time statistics for issuers and users about issued and revoked certificates.
- **File Uploads:** Securely upload and manage supporting documents using Multer.
- **Automated Blockchain Listeners:** Listen to blockchain events and update the database accordingly.
- **Role-based Access:** Separate functionalities and dashboards for issuers and users.
- **RESTful API:** Well-structured backend with modular controllers.
- **MongoDB Integration:** Robust and scalable NoSQL database support.

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/Blockchain-Certificate-Verification-System.git
cd Blockchain-Certificate-Verification-System
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Create Environment Variables

Create a `.env` file in the `backend` directory and add your configuration (MongoDB connection string, JWT secret, etc.):

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
```

### 4. Run the Backend

```bash
npm start
```

---

## 🚀 Usage

### 1. Issue Certificates

- Issuers can log in, upload certificate details, and issue certificates to users.
- Certificates are automatically stored on the blockchain and mirrored in the database.

### 2. Verify Certificates

- Anyone can verify the authenticity of a certificate by referencing its blockchain record.
- The system provides APIs to fetch and validate certificates.

### 3. User Dashboard

- Users can log in, view all certificates issued to them, and request new certificates.

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository.
2. Create your feature branch: `git checkout -b my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin my-feature`
5. Open a pull request.

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the [MIT License](LICENSE).


> **Made with ❤️ by the Blockchain Certificate Verification System contributors.**

## License
This project is licensed under the **MIT** License.

---
🔗 GitHub Repo: https://github.com/GAYATHRI-475/Blockchain-Certificate-Verification-System
