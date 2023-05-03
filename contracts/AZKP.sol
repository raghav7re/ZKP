pragma solidity ^0.8.0;

contract UserData {
    
    // Struct to store user data
    struct UserDataStruct {
        string firstName;
        string lastName;
        uint age;
        uint zipcode;
    }
    
    // Struct to store verification requests
    struct VerificationRequest {
        address requester;
        address userAddress;
        string dataType;
        string data;
        bool completed;
        bool verified;
        bool result;
    }
    
    // Events to emit when a request is approved and when data is verified
    event RequestApproved(address indexed requester, address indexed userAddress, string dataType, string data);
    event DataVerified(address indexed verifier, address indexed userAddress, string dataType, bool result);
    
    // Owner of the contract
    address public owner;
    
    // Mapping of user addresses to their data
    mapping (address => UserDataStruct) public userMapping;
    
    // Mapping of verification requests to their completion status
    mapping (address => VerificationRequest) public requestMapping;
    
    // Modifier to restrict access to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
    
    // Constructor to initialize the contract with an owner address
    constructor() {
        owner = msg.sender;
    }
    
    // Function to verify if the user's age is equal to or greater than the provided age
    function verifyAge(address userAddress, uint age) public onlyOwner {
        UserDataStruct memory userData = userMapping[userAddress];
        require(userData.age >= age, "User is not old enough");
        emit DataVerified(msg.sender, userAddress, "age", true);
    }
    
    // Function to verify if the user's first name matches the provided name
    function verifyFirstName(address userAddress, string memory name) public onlyOwner {
        UserDataStruct memory userData = userMapping[userAddress];
        require(keccak256(bytes(userData.firstName)) == keccak256(bytes(name)), "First name does not match");
        emit DataVerified(msg.sender, userAddress, "firstName", true);
    }
    
    // Function to verify if the user's last name matches the provided name
    function verifyLastName(address userAddress, string memory name) public onlyOwner {
        UserDataStruct memory userData = userMapping[userAddress];
        require(keccak256(bytes(userData.lastName)) == keccak256(bytes(name)), "Last name does not match");
        emit DataVerified(msg.sender, userAddress, "lastName", true);
    }
    
    // Function to set user data
    function setUserData(string memory firstName, string memory lastName, uint age, uint zipcode) public returns (UserDataStruct memory) {
        UserDataStruct memory userData = UserDataStruct(firstName, lastName, age, zipcode);
        userMapping[msg.sender] = userData;
        return userData;
    }
    
    // Function to request verification of user data
    function requestVerification(address userAddress, string memory dataType, string memory data) public returns (VerificationRequest memory) {
        VerificationRequest memory request = VerificationRequest(msg.sender, userAddress, dataType, data, false, false, false);
        requestMapping[msg.sender] = request;
        emit RequestApproved(msg.sender, userAddress, dataType, data);
        return request;
    }
    
   
    
    // Constructor to initialize the contract with an owner address
}
