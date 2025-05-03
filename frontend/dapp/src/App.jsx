import { useEffect, useState } from 'react';
import './App.css';
import { BrowserProvider, Contract } from "ethers";
import HelloWorldABI from "./abi.json";

function App() {
  const [inputField, setInputField] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [msg, setMsg] = useState('');
  const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";  // Replace if needed

  // Connect wallet on load (optional)
  useEffect(() => {
    connectWallet();
  }, []);

  // Connect wallet function
  async function connectWallet() {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        console.log("Connected wallet:", address);
      } catch (error) {
        console.error("Wallet connection error:", error);
      }
    } else {
      alert("MetaMask not found. Please install it.");
    }
  }

  // Handle message submission
  async function handleSubmit(e) {
    e.preventDefault();
    if (!walletAddress) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, HelloWorldABI, signer);

      // Send message
      const tx = await contract.setMessage(inputField);
      await tx.wait();
      console.log("Message sent!");

      // Fetch stored message
      const signerAddress = await signer.getAddress();
      const message = await contract.getMessage(signerAddress);
      console.log("Fetched message:", message);
      setMsg(message);
      setInputField('');
    } catch (error) {
      console.error("Failed to send or fetch message:", error);
    }
   
  }

  return (
    <div className="App">
      <h2 style={{color:"blue"}}>Smart Contract Messenger</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your message"
          value={inputField}
          onChange={(e) => setInputField(e.target.value)}
        />
        <button type="submit" >Send Message</button>
      </form>

      <button onClick={connectWallet}>
        {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
      </button>

      {msg && (
        <div>
          <h3 style={{color:'green'}}>Stored Message:</h3>
          <h4>{msg}</h4>
        </div>
      )}
    </div>
  );
}

export default App;
