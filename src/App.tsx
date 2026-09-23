import { useState } from "react";
import NetworkLab from "./pages/NetworkLab";
import CardanoLab from "./pages/CardanoLab";
import SolanaLab from "./pages/SolanaLab";

type Lab = "network" | "cardano" | "solana";

function App() {
  const [activeLab, setActiveLab] = useState<Lab>("network");

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          padding: "14px",
          background: "#09090b",
          borderBottom: "1px solid #27272a",
        }}
      >
        <button
          type="button"
          onClick={() => setActiveLab("network")}
        >
          Network
        </button>

        <button
          type="button"
          onClick={() => setActiveLab("cardano")}
        >
          Cardano
        </button>

        <button
          type="button"
          onClick={() => setActiveLab("solana")}
        >
          Solana
        </button>
      </nav>

      {activeLab === "network" && <NetworkLab />}

      {activeLab === "cardano" && <CardanoLab />}

      {activeLab === "solana" && <SolanaLab />}
    </>
  );
}

export default App;