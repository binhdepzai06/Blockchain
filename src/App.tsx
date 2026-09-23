import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Layout from "./components/layout/Layout";

import DashboardPage from "./pages/dashboard/DashboardPage";
import HashPage from "./pages/hash/HashPage";
import BlockchainPage from "./pages/blockchain/BlockchainPage";
import TransactionPage from "./pages/transaction/TransactionPage";
import MerklePage from "./pages/merkle/MerklePage";
import SignaturePage from "./pages/signature/SignaturePage";
import ConsensusPage from "./pages/consensus/ConsensusPage";
import NetworkPage from "./pages/network/NetworkPage";
import CardanoPage from "./pages/cardano/CardanoPage";
import SolanaPage from "./pages/solana/SolanaPage";
import SmartContractPage from "./pages/smart-contract/SmartContractPage";
import QuizPage from "./pages/quiz/QuizPage";
import TeamPage from "./pages/team/TeamPage";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route element={<Layout />}>

            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />

            <Route
              path="/dashboard"
              element={<DashboardPage />}
            />

            <Route
              path="/hash"
              element={<HashPage />}
            />

            <Route
              path="/blockchain"
              element={<BlockchainPage />}
            />

            <Route
              path="/transaction"
              element={<TransactionPage />}
            />

            <Route
              path="/merkle"
              element={<MerklePage />}
            />

            <Route
              path="/signature"
              element={<SignaturePage />}
            />

            <Route
              path="/consensus"
              element={<ConsensusPage />}
            />

            <Route
              path="/network"
              element={<NetworkPage />}
            />

            <Route
              path="/cardano"
              element={<CardanoPage />}
            />

            <Route
              path="/solana"
              element={<SolanaPage />}
            />

            <Route
              path="/smart-contract"
              element={<SmartContractPage />}
            />

            <Route
              path="/quiz"
              element={<QuizPage />}
            />

            <Route
              path="/team"
              element={<TeamPage />}
            />

          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;