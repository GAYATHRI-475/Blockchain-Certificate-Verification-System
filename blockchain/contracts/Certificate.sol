// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Certificate {

    address public admin;

    struct Cert {
        string certId;
        string certificateHash;
        string ipfsHash;
        address issuerWallet;
        uint256 issuedTimestamp;
        bool exists;
    }

    // 🔐 Storage
    mapping(string => Cert) private certificates;

    // 👥 Authorized issuers
    mapping(address => bool) public authorizedIssuers;

    // 🔥 EVENT (CORE OF SYSTEM)
    event CertificateIssued(
        string certId,
        string certificateHash,
        string ipfsHash,
        address issuerWallet,
        uint256 issuedTimestamp
    );

    constructor() {
        admin = msg.sender;
        authorizedIssuers[admin] = true;
    }

    // -------------------------
    // ADMIN CONTROLS
    // -------------------------
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    modifier onlyAuthorized() {
        require(authorizedIssuers[msg.sender], "Not authorized");
        _;
    }

    function addIssuer(address _issuer) public onlyAdmin {
        authorizedIssuers[_issuer] = true;
    }

    function removeIssuer(address _issuer) public onlyAdmin {
        authorizedIssuers[_issuer] = false;
    }

    // -------------------------
    // ISSUE CERTIFICATE
    // -------------------------
    function issueCertificate(
        string memory certId,
        string memory certificateHash,
        string memory ipfsHash
    ) public onlyAuthorized {

        require(!certificates[certificateHash].exists, "Already issued");

        Cert memory newCert = Cert({
            certId: certId,
            certificateHash: certificateHash,
            ipfsHash: ipfsHash,
            issuerWallet: msg.sender,
            issuedTimestamp: block.timestamp,
            exists: true
        });

        certificates[certificateHash] = newCert;

        emit CertificateIssued(
            certId,
            certificateHash,
            ipfsHash,
            msg.sender,
            block.timestamp
        );
    }

    // -------------------------
    // VERIFY CERTIFICATE
    // -------------------------
    function verifyCertificate(string memory certificateHash)
        public
        view
        returns (
            string memory certId,
            string memory ipfsHash,
            address issuerWallet,
            uint256 issuedTimestamp,
            bool exists
        )
    {
        Cert memory cert = certificates[certificateHash];

        if (!cert.exists) {
            return ("", "", address(0), 0, false);
        }

        return (
            cert.certId,
            cert.ipfsHash,
            cert.issuerWallet,
            cert.issuedTimestamp,
            true
        );
    }
}