// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Certificate {

    address public admin;

    struct Cert {
        string studentName;
        string course;
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

    function issueCertificate(
        string memory certId,
        string memory studentName,
        string memory course,
        string memory ipfsHash
    ) public onlyAdmin {

        certificates[certId] = Cert(
            studentName,
            course,
            ipfsHash,
            true
        );
    }

    function verifyCertificate(string memory certId)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            bool
        )
    {

        Cert memory cert = certificates[certId];

        if (!cert.exists) {
            return ("", "", "", false);
        }

        return (
            cert.studentName,
            cert.course,
            cert.ipfsHash,
            true
        );
    }
}
