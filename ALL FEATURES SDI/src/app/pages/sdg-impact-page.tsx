import React, { useEffect, useState } from "react";
import { mintSustainabilityProof } from "../../useEthers"; 

// Define a simple type for our ledger entries
type LedgerEntry = {
  hash: string;
  score: number;
  timestamp: string;
  status: "Pending" | "Confirmed";
};

export function SDGImpactPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState(false);
  
  // New: State to hold the history of proofs
  const [ledger, setLedger] = useState<LedgerEntry[]>([]);

  useEffect(() => {
    const fetchImpact = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/sustainability/impact");
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setData(result);
        setError(false);
      } catch (err) {
        console.error("Backend offline:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchImpact();
  }, []);

  const handleMintProof = async () => {
    if (!data || isMinting) return;
    
    setIsMinting(true);
    try {
      // 1. Send Transaction
      const txHash = await mintSustainabilityProof(data.score, data.reportHash);
      
      if (txHash) {
        // 2. Add to Ledger on Success
        const newEntry: LedgerEntry = {
          hash: txHash,
          score: data.score,
          timestamp: new Date().toLocaleTimeString(),
          status: "Confirmed"
        };
        
        // Add new entry to the TOP of the list
        setLedger(prev => [newEntry, ...prev]);
        
        alert(`Success! Proof anchored.\nTx: ${txHash}`);
      }
    } catch (error) {
      console.error("Minting failed:", error);
      alert("Minting failed! See console.");
    } finally {
      setIsMinting(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-mono text-emerald-500 animate-pulse">Auditing Sustainability...</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 lg:p-12">
      {/* ... (Keep your Header/Score Card UI here) ... */}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: Minting Action */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
            <h3 className="font-bold text-xl mb-6">Blockchain Proof Timeline</h3>
            
            {error && <p className="text-red-500 text-sm mb-4">⚠️ Backend Connection Failed.</p>}

            <div className="p-6 bg-slate-50 rounded-2xl mb-6">
                <p className="text-sm text-slate-500 mb-1">Current Audit Hash</p>
                <code className="text-xs text-emerald-600 break-all">{data?.reportHash || "Loading..."}</code>
            </div>

            <button 
              onClick={handleMintProof}
              disabled={isMinting || !data} 
              className={`w-full py-4 rounded-2xl font-bold transition-all relative ${
                isMinting || !data 
                  ? "bg-slate-400 cursor-not-allowed" 
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              {isMinting ? "⛓️ Minting Proof..." : "Mint Verification"}
            </button>
        </div>

        {/* RIGHT COLUMN: The Ledger */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm relative">
            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <span>📜 Immutable Ledger</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">{ledger.length} Proofs</span>
            </h3>
            
            {ledger.length === 0 ? (
                <div className="text-center text-slate-400 py-12">
                    <p>No proofs minted in this session.</p>
                </div>
            ) : (
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                    {ledger.map((entry) => (
                        <div key={entry.hash} className="p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-emerald-700">Score: {entry.score}/100</span>
                                <span className="text-xs text-slate-400">{entry.timestamp}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-100 p-2 rounded">
                                <span className="truncate w-40">{entry.hash}</span>
                                <button 
                                    onClick={() => navigator.clipboard.writeText(entry.hash)}
                                    className="hover:text-emerald-600"
                                    title="Copy Hash"
                                >
                                    📋
                                </button>
                            </div>
                            <div className="mt-2 text-xs flex justify-end">
                                <span className="text-emerald-600 font-bold flex items-center gap-1">
                                    ✓ {entry.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}