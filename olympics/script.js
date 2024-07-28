const ethers = require("ethers");

const PortalAbi = require("./abi.json");

require("dotenv").config();

const provider = new ethers.getDefaultProvider(
  "https://eth-sepolia.api.onfinality.io/public"
);

const portalAddress = "0xcbC68F766d95189e2208DAbADaA9571C4B5F28C8";

const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

const portalContract = new ethers.Contract(portalAddress, PortalAbi, signer);

portalContract
  .activatePortal(
    "0x9A6DE0f62Aa270A8bCB1e2610078650D539B1Ef9",
    "0x1C1C57FC80696BB19227a8CFe92132ff8CF4f377",
    signer.address,
    791250,
    800,
    {
      value: ethers.parseEther("0.001"),
    }
  )
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

