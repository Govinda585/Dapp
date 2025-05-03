const {expect} = require("chai");
const {ethers}  = require("hardhat");

describe("HelloWorld", function () {
    let helloWorld;
    let owner;

    beforeEach( async function () {
        [owner, other] = await ethers.getSigners();
        const HelloWorld = await ethers.getContractFactory("HelloWorld");
        helloWorld = await HelloWorld.deploy();
        await helloWorld.waitForDeployment();
    });

    it("should store the message for sender", async function (){
        await helloWorld.setMessage("hello");
        const stored = await helloWorld.getMessage(owner.address);
        expect(stored).to.equal("hello");
    });

    it("should get the correct message for another user", async function () {
        await helloWorld.connect(other).setMessage("gm from other");
        const stored = await helloWorld.getMessage(other.address);
        expect(stored).to.equal("gm from other");
      });
});