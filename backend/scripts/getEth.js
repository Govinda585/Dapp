const { ethers } = require("hardhat");

async function main() {
    // Address to send ETH to
    const recipient = "0x371fC0829297D74A1231505DE7829d5B0B951a12";
  
    // Get the signer (the account sending ETH)
    const [sender] = await ethers.getSigners();
  
    console.log("Sender address:", sender.address);
    console.log("Recipient address:", recipient);
  
    // Send 1 ETH to the recipient
    const tx = await sender.sendTransaction({
      to: recipient,
      value: ethers.parseUnits("1.0", "ether"),  // 1 ETH, using parseUnits to handle ETH amount
    });
  
    // Wait for the transaction to be mined
    await tx.wait();
  
    console.log("Transaction successful! Sent 1 ETH.");
}
  
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
