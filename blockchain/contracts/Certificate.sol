// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Certificate {

    address public admin;

    struct Cert {
        string studentName;
        string certificateTitle;
        string ipfsHash;
        bool exists;
    }

    mapping(string => Cert) private certificates;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can issue certificates");
        _;
    }

    /*
    -----------------------------------
    ISSUE CERTIFICATE
    -----------------------------------
    */
    function issueCertificate(
        string memory certId,
        string memory studentName,
        string memory certificateTitle,
        string memory ipfsHash
    ) public onlyAdmin {

        require(!certificates[certId].exists, "Certificate already issued");

        certificates[certId] = Cert(
            studentName,
            certificateTitle,
            ipfsHash,
            true
        );
    }

    /*
    -----------------------------------
    VERIFY CERTIFICATE
    -----------------------------------
    */
    function verifyCertificate(string memory certId)
        public
        view
        returns (
            string memory studentName,
            string memory certificateTitle,
            string memory ipfsHash,
            bool exists
        )
    {
        Cert memory cert = certificates[certId];

        if (!cert.exists) {
            return ("", "", "", false);
        }

        return (
            cert.studentName,
            cert.certificateTitle,
            cert.ipfsHash,
            true
        );
    }
}