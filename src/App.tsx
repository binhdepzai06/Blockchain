import { useState } from "react";
import NetworkLab from "./pages/NetworkLab";
import CardanoLab from "./pages/CardanoLab";

type Lab = "network" | "cardano";

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
          style={{
            padding: "10px 18px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Network
        </button>

        <button
          type="button"
          onClick={() => setActiveLab("cardano")}
          style={{
            padding: "10px 18px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Cardano
        </button>
      </nav>

      {activeLab === "network" ? (
        <NetworkLab />
      ) : (
        <CardanoLab />
      )}
    </>
  );
}

export default App;