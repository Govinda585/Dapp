# 📬 HelloWorld DApp

A simple decentralized application (dApp) built using **Hardhat**, **Solidity**, **Ether** and **React** that allows users to send and fetch messages tied to their wallet addresses via MetaMask.

---

## 🚀 Features

- Connect wallet via MetaMask
- Set a custom message (stored on-chain)
- Retrieve your message anytime
- Built with:
  - Hardhat (Smart Contract framework)
  - Ethers.js (Integration)
  - React.js frontend

---

# Getting Started 
Clone Repository

# Install Dependencies
 cd backend 
 npm install

# Compile Contract 
npx hardhat compile

# Deploy Contract
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost

# Get Eth for teseting in localhost
npx hardhat run scripts/getEth.js --network localhost

# Run Frontend 
cd frontend/dapp
npm install
npm run dev

# Note: Make sure you have installed Metamask.

