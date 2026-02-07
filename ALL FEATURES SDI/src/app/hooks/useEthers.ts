declare global {
  interface Window {
    ethereum?: any;
  }
}

import { useState } from 'react';
import { ethers } from 'ethers';

export function useEthers() {
  const [isMinting, setIsMinting] = useState(false);

  const mintProof = async (score: number, hash: string) => {
    if (!window.ethereum) return alert("Install MetaMask");
    setIsMinting(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      // Replace with your address after deployment
      const contract = new ethers.Contract("0xADDRESS", ["function mintProof(uint256,string)"], signer);
      
      const tx = await contract.mintProof(Math.round(score), hash);
      await tx.wait(); // Standardized proof minted
      alert("Proof Minted on Ethereum!");
    } catch (e) {
      console.error(e);
    } finally { setIsMinting(false); }
  };

  return { mintProof, isMinting };
}