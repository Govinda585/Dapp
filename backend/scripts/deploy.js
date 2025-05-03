const {ethers, network} = require("hardhat");
const fs = require("fs");


async function main(){
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const helloWorld = await HelloWorld.deploy();
    await helloWorld.waitForDeployment();
    const deployedAddress = helloWorld.target;
    console.log(`HelloWorld deployed to: ${deployedAddress}`);
   

    const addressData = {
        contractName: "HelloWorld",
        address: deployedAddress,
        network: network.name,
        }
        
        fs.writeFileSync("deployedAddress.json", JSON.stringify(addressData), null, 2);
        
        console.log("Deployed address saved to deployedAddress.json");
        
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


// Hello World deployed to:  0x5FbDB2315678afecb367f032d93F642f64180aa3