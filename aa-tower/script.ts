import { ethers } from "ethers";
import { Provider, Wallet, utils } from "zksync-ethers";
import { config } from 'dotenv';

config();
// ZKSync testnet RPC URL
const RPC_URL = "https://sepolia.era.zksync.dev";

// Your private key (keep this secret and safe!)
const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";

// Recipient address
const RECIPIENT = "0xFac041BCF2c4b43319c2C0a39ABA53F4CbE44Fe5";

// Paymaster address
const PAYMASTER_ADDRESS = "0x5605861a1B057394026640f048c22B3763837E03";

async function main() {
    // Initialize the ZKSync provider
    const provider = new Provider(RPC_URL);

    // Create a wallet instance
    const wallet = new Wallet(PRIVATE_KEY, provider);

    // Prepare the transaction
    const amount = ethers.parseEther("0.005");

    const paymasterParams = utils.getPaymasterParams(PAYMASTER_ADDRESS, {
        type: "General",
        innerInput: new Uint8Array(),
    });

    // Estimate gas limit with paymaster
    const gasLimit = await provider.estimateGas({
        from: wallet.address,
        to: RECIPIENT,
        value: amount,
        customData: {
            gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
            paymasterParams: paymasterParams,
        },
    });

    // Get current gas price
    const gasPrice = await provider.getGasPrice();

    // Prepare the transaction request
    const txRequest = {
        from: wallet.address,
        to: RECIPIENT,
        value: amount,
        gasLimit: gasLimit,
        gasPrice: gasPrice,
        customData: {
            gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
            paymasterParams: paymasterParams,
        },
    };

    try {
        // Send the transaction
        const sentTx = await wallet.sendTransaction(txRequest);
        console.log("Transaction sent: ", sentTx.hash);

        // Wait for transaction to be mined
        const receipt = await sentTx.wait();
        console.log("Transaction mined in block: ", receipt.blockNumber);
    } catch (error) {
        console.error("Error sending transaction:", error);
    }
}

main().catch(console.error);