import { config } from 'dotenv';
import { Provider, Wallet, utils } from 'zksync-web3';
import { ethers } from 'ethers';

// Load environment variables
config();

const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

if (!PRIVATE_KEY) {
    throw new Error('WALLET_PRIVATE_KEY is not set in .env file');
}

// ZKSync Mainnet provider
const provider = new Provider('https://mainnet.era.zksync.io');

// Create a wallet instance
const wallet = new Wallet(PRIVATE_KEY, provider);

async function main() {
    try {
        const recipient = '0xFac041BCF2c4b43319c2C0a39ABA53F4CbE44Fe5';
        const amount = ethers.utils.parseEther('0.005');

        const paymaster = '0x5605861a1B057394026640f048c22B3763837E03';

        // Prepare the transaction
        const transaction = await wallet.populateTransaction({
            to: recipient,
            value: amount,
        });

        // Estimate gas
        const gasLimit = await provider.estimateGas(transaction);
        const gasPrice = await provider.getGasPrice();

        // Prepare paymaster params
        const paymasterParams = utils.getPaymasterParams(paymaster, {
            type: 'General',
            innerInput: new Uint8Array(),
        });

        // Modify the transaction to include the paymaster
        const customData = {
            gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
            paymasterParams,
        };

        // Send the transaction
        const sentTx = await wallet.sendTransaction({
            ...transaction,
            maxFeePerGas: gasPrice,
            maxPriorityFeePerGas: gasPrice,
            gasLimit,
            customData,
        });

        console.log('Transaction sent: ', sentTx.hash);

        // Wait for the transaction to be mined
        const receipt = await sentTx.wait();
        console.log('Transaction mined in block: ', receipt.blockNumber);

    } catch (error) {
        console.error('Error:', error);
    }
}

main();