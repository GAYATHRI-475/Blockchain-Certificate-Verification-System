// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Certificate {

    address public admin;

    struct Cert {
        string certificateHash;
        string ipfsHash;
        address issuerWallet;
        uint256 issuedTimestamp;
        bool exists;
    }

    // Mapping from certificate hash to Cert struct
    mapping(string => Cert) private certificates;

    // Mapping to keep track of authorized issuers
    mapping(address => bool) public authorizedIssuers;

    // Events
    event CertificateIssued(
        string certificateHash,
        string ipfsHash,
        address issuerWallet,
        uint256 issuedTimestamp
    );

    constructor() {
        admin = msg.sender;
        authorizedIssuers[admin] = true; // Admin is authorized by default
    }

    // Modifier to allow only admin to manage issuers
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    // Modifier to allow only authorized wallets to issue certificates
    modifier onlyAuthorized() {
        require(authorizedIssuers[msg.sender], "Not authorized to issue certificates");
        _;
    }

    /*
    -----------------------------------
    ADD/REMOVE ISSUERS
    -----------------------------------
    */
    function addIssuer(address _issuer) public onlyAdmin {
        authorizedIssuers[_issuer] = true;
    }

    function removeIssuer(address _issuer) public onlyAdmin {
        authorizedIssuers[_issuer] = false;
    }

    /*
    -----------------------------------
    ISSUE CERTIFICATE
    -----------------------------------
    */
    function issueCertificate(
        string memory certificateHash,
        string memory ipfsHash
    ) public onlyAuthorized {
        require(!certificates[certificateHash].exists, "Certificate already issued");

        Cert memory newCert = Cert({
            certificateHash: certificateHash,
            ipfsHash: ipfsHash,
            issuerWallet: msg.sender,
            issuedTimestamp: block.timestamp,
            exists: true
        });

        certificates[certificateHash] = newCert;

        emit CertificateIssued(certificateHash, ipfsHash, msg.sender, block.timestamp);
    }

    /*
    -----------------------------------
    VERIFY CERTIFICATE BY HASH
    -----------------------------------
    */
    function verifyCertificate(string memory certificateHash)
        public
        view
        returns (
            string memory ipfsHash,
            address issuerWallet,
            uint256 issuedTimestamp,
            bool exists
        )
    {
        Cert memory cert = certificates[certificateHash];

        if (!cert.exists) {
            return ("", address(0), 0, false);
        }

        return (
            cert.ipfsHash,
            cert.issuerWallet,
            cert.issuedTimestamp,
            true
        );
    }
}