import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const contractJson = JSON.parse(fs.readFileSync("./out/NFTCollection.sol/NFTCollection.json", "utf8"));

async function main() {

    const provider = ethers.getDefaultProvider('sepolia', {
        alchemy: process.env.ALCHEMY_API_KEY
    });
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || "", provider);

    console.log("Deploying contracts with the account:", wallet.address);

    const NFTCollectionFactory = new ethers.ContractFactory(contractJson.abi, contractJson.bytecode, wallet);
    const nft = await NFTCollectionFactory.deploy("MyNFT", "MNFT", "https://ipfs.io/ipfs/QmQGxHEnAKrU41FtPnGnBBicqKgmntj63ZaD6uW9Ca6qKn/") as ethers.Contract & { deployTransaction: ethers.providers.TransactionResponse };

    console.log("Awaiting deployment...");
    await nft.deployTransaction.wait();

    console.log("NFTCollection deployed to:", nft.address);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
