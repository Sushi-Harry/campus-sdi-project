import { ethers, getAddress } from 'ethers';

const getProvider = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return null;
};

export const mintSustainabilityProof = async (score: number, reportHash: string) => {
  const provider = getProvider();
  if (!provider) {
    alert("MetaMask not found!");
    return null;
  }

  try {
    const signer = await provider.getSigner();
    
    // ✅ Fixes 'bad address checksum' error
   // OLD (Broken):
// const contractAddress = getAddress("0x89799589947814b76B551528f8697A7650C1DeC4"); 

// NEW (Fixed):
// We add .toLowerCase() so ethers fixes the casing for us automatically
const contractAddress = getAddress("0x89799589947814b76B551528f8697A7650C1DeC4".toLowerCase());
    
    const abi = ["function mintProof(uint256 _score, string memory _reportHash) public"];
    const contract = new ethers.Contract(contractAddress, abi, signer);

    console.log(`🔗 Anchoring to Ledger -> Score: ${score}, Hash: ${reportHash}`);

    // Triggers the confirmed MetaMask transaction
    const tx = await contract.mintProof(score, reportHash);
    const receipt = await tx.wait();
    
    return receipt.hash;
  } catch (error: any) {
    console.error("Blockchain error:", error.message);
    return null;
  }
};