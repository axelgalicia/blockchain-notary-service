import Web3 from "web3";
import starNotaryArtifact from "../../build/contracts/StarNotary.json";
// Import the page's CSS. Webpack will know what to do with it.
import '../styles/app.css';


const App = {
  web3: null,
  account: null,
  starContract: null,

  start: async function () {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = starNotaryArtifact.networks[networkId];
      this.starContract = new web3.eth.Contract(
        starNotaryArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  setStatus: function (message) {
    const status = document.getElementById('status')
    status.innerHTML = message
  },


  createStar: async function () {
    App.setStatus("Creating star...");
    const { createStar } = this.starContract.methods;
    const name = document.getElementById("starName").value;
    const id = document.getElementById("starId").value;
    const newStar = await createStar(name, id).send({ from: this.account });
    App.setStatus("New Star Owner is " + this.account + ".");
  },

  lookupStar: async function () {
    App.setStatus("Searching star...");
    const { lookUptokenIdToStarInfo } = this.starContract.methods;
    const id = document.getElementById("tokenId").value;
    const starInfo = await lookUptokenIdToStarInfo(id).call({ from: this.account });
    if (!!starInfo) {
      App.setStatus("The star name is: " + starInfo);
    } else {
      App.setStatus("The star with that ID does not exist");
    }

  }


};

window.App = App;

window.addEventListener("load", function () {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:9545"),
    );
  }

  App.start();
});
