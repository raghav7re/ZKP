import { rcontract } from "./acc3.js";

// Initialize web3
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

// Initialize the contract object
//const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Handle form submission
const el =document.getElementById("requestButton");
if (el)
el.addEventListener("click", async () => {
  const userAddress = document.getElementById("address").value; // replace with the address of the user whose data you want to request verification for
  const dataType = document.getElementById("dataType").value;
  const data = document.getElementById("data").value;

  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  
  // Call the smart contract function to request verification
  const result = await rcontract.methods.requestVerification(web3.utils.toChecksumAddress(userAddress), dataType, data).send({ from: account });

  console.log(result);
});

const ConnectButton =document.getElementById("ConnectButton");
//ConnectButton.onclick=CheckMetamaskConnection() ;

ConnectButton.addEventListener("click", async () => {
//async function CheckMetamaskConnection() {
    if (typeof window.ethereum !== 'undefined') {
 console.log('MetaMask is installed!');
 window.ethereum.request({method:"eth_requestAccounts"})
 
document.getElementById("ConnectButton").innerHTML="Connected!"
console.log(rcontract);
console.log(web3.eth.getBlockNumber());
    }
  });

const qel =document.getElementById('setUserData');
if (qel)
qel.addEventListener('click', async () => {
 
  // Call the smart contract function to request verification
  //const result = await rcontract.methods.requestVerification(web3.utils.toCheckSumAddress(userAddress), dataType, data).send({ from: web3.eth.defaultAccount });
  console.log("start");
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const age = document.getElementById("age").value;
  const zipcode = document.getElementById("zipcode").value;

  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  
  rcontract.methods.setUserData(firstName, lastName, age, zipcode)
    .send({ from: account })
    .then((result) => {
      console.log(result);
      //alert("User data has been set!");
    })
    .catch((error) => {
      console.log(error);
      //alert("Error setting user data!");
    });
});








const ael =document.getElementById('approve');
if (ael)
ael.addEventListener('click', async () => {
 
  // Call the smart contract function to request verification
  //const result = await rcontract.methods.requestVerification(web3.utils.toCheckSumAddress(userAddress), dataType, data).send({ from: web3.eth.defaultAccount });
  
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  const requester = document.getElementById("requester").value;
            const qwe= await rcontract.methods.approveVerification(requester).send({from: account}, function(error, result) {
                if (!error) {
                    document.getElementById("result").innerHTML = "Request approved!";
                } else {
                    console.error(error);
                }
              });
              console.log(qwe);
});



const vel =document.getElementById('verifyage');
if (vel)
vel.addEventListener('click', async () => {
 console.log("start");
  // Call the smart contract function to request verification
  //const result = await rcontract.methods.requestVerification(web3.utils.toCheckSumAddress(userAddress), dataType, data).send({ from: web3.eth.defaultAccount });
  
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  const form = document.getElementById("verify-age-form");
  const resultDiv = document.getElementById("result");

  
      
      const userAddress = document.getElementById("user-address").value;
      const age = document.getElementById("age").value;
      try {
          const result = await rcontract.methods.verifyAge(web3.utils.toChecksumAddress(userAddress), age).call();
          console.log(result);
          if (result) {
              resultDiv.textContent = "User is old enough";
          } else {
              resultDiv.textContent = "User is not old enough";
          }
      } catch (error) {
          console.error(error);
          resultDiv.textContent = "An error occurred: " + error.message;
      }

});


const fel =document.getElementById('verifyfirstname');
if (fel)
fel.addEventListener('click', async () => { 


  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  var userAddress = document.getElementById("user-address").value;
  var firstName = document.getElementById("first-name").value;
  
  // Call contract function to verify first name
  const result = await rcontract.methods.verifyFirstName(userAddress, firstName).send({from: account})
  .on('transactionHash', function(hash){
    console.log("Transaction Hash: " + hash);
  })
  .on('receipt', function(receipt){
    console.log("Receipt: " + receipt);
    alert("First name verified!");
  })
  .on('error', function(error){
    console.error(error);
    alert("An error occurred while verifying first name.");
  });
  console.log(result);

});

const form = document.getElementById("verify-last-name");
            form.addEventListener("click", async (event) => {
                event.preventDefault();
                const lastName = document.getElementById("lastName").value;
                const userAddress = document.getElementById("userAddress").value;

                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
              

                // Call the verifyLastName function with the provided parameters
               const result= await rcontract.methods.verifyLastName(web3.utils.toChecksumAddress(userAddress), lastName).send({ from: account })
                    .on("receipt", (receipt) => {
                        console.log(receipt);
                        alert("Last name verified successfully!");
                    })
                    .on("error", (error) => {
                        console.error(error);
                        alert("Error verifying last name.");
                    });
                    console.log(result);
            });


  const button = document.getElementById('verify-buttonz');
  const zipcodeInput = document.getElementById('zipcode-input');
  const messageElement = document.getElementById('message');

  button.addEventListener('click', async () => {
      //const userAddress = 'USER_ADDRESS'; // Replace with the address of the user you want to verify

      // Call the smart contract function to verify the user's zipcode

  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

      try {
          const result = await rcontract.methods.verifyZipcode(web3.eth.tochecksumAddress(userAddress), zipcodeInput.value).send({ from: account });
          console.log(result);
          messageElement.innerText = 'Verification successful';
      } catch (error) {
          console.error(error);
          messageElement.innerText = 'Verification failed';
      }
  });


