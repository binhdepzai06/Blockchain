# CryptoLab --- Project Specification

> Interactive Blockchain Learning & Simulation Platform\
> Version: 1.0\
> Repository: `Blockchain`\
> Project type: Group Web Project --- Blockchain

------------------------------------------------------------------------

## 1. Project Overview

**CryptoLab** is an interactive web platform designed to help students
understand Blockchain concepts through visualization, simulation,
experimentation, quizzes, and personalized learning.

The project is inspired by the educational idea of existing blockchain
visualization websites, but it must have its **own UI, code structure,
content, interaction model, and visual identity**.

The main principle is:

> **Learn → Simulate → Experiment → Observe → Practice → Track
> Progress**

CryptoLab should not be a collection of static theory pages. Each
important concept should contain an interactive simulation or
visualization whenever practical.

------------------------------------------------------------------------

## 2. Project Objectives

### 2.1 Main objectives

-   Explain fundamental Blockchain concepts visually.
-   Allow users to interact with Blockchain mechanisms.
-   Simulate PoW and PoS consensus.
-   Visualize Blockchain networks and transaction propagation.
-   Provide educational simulations for Cardano and Solana.
-   Demonstrate cryptographic mechanisms such as SHA-256 and digital
    signatures.
-   Demonstrate Merkle Tree construction and verification.
-   Demonstrate Smart Contract execution conceptually.
-   Provide quizzes and learning progress tracking.
-   Personalize the learning experience.
-   Provide an Experiment Mode where users can change parameters and
    observe outcomes.

### 2.2 Educational objectives

After using CryptoLab, a learner should be able to explain:

-   What a hash function is.
-   How SHA-256 works conceptually.
-   Why changing one input changes the hash.
-   How blocks are linked using previous hashes.
-   How transactions are included in blocks.
-   How a Merkle Tree produces a Merkle Root.
-   What a digital signature does.
-   How RSA-style asymmetric cryptography works conceptually.
-   How Proof of Work operates.
-   How Proof of Stake selects validators.
-   How transactions propagate through a network.
-   How Cardano's Ouroboros-based model uses epochs, slots and stake
    pools.
-   How Solana uses staking and stake-weighted voting in its consensus
    model.
-   What a Smart Contract is.
-   How a contract function can change contract state.
-   How different consensus mechanisms differ.

------------------------------------------------------------------------

# 3. Core Features

CryptoLab contains the following core modules.

## 3.1 Dashboard + Personalization

The Dashboard is the user's learning center.

### Features

-   User profile
-   Learning progress
-   Completed modules
-   Quiz scores
-   XP / learning points
-   Achievement badges
-   Recent activities
-   Recommended next lessons
-   Learning streak
-   Module completion percentage

### Personalization

The platform should remember learning activity locally using Zustand +
localStorage.

Example:

``` text
User starts with:
Beginner

Completed:
Hash
Transaction

Weak area:
Consensus

Recommendation:
Try PoW Experiment
→ Then learn PoS
→ Then compare PoW vs PoS
```

------------------------------------------------------------------------

## 3.2 Hash Lab

### Functions

-   Input text
-   Generate SHA-256 hash
-   Display hash
-   Show avalanche effect
-   Compare two similar inputs
-   Copy hash
-   Reset experiment

### Example

``` text
Input A:
Hello

Input B:
hello
```

The interface should clearly show that a small input change produces a
substantially different hash.

### Experiment Mode

Users can repeatedly modify input and observe hash changes.

------------------------------------------------------------------------

## 3.3 Blockchain Lab

### Functions

-   Create blocks
-   Add transactions
-   Calculate block hash
-   Display previous hash
-   Change block data
-   Detect tampering
-   Validate entire chain
-   Reset blockchain

### Visual model

``` text
Block #0
    ↓
Block #1
    ↓
Block #2
    ↓
Block #3
```

Each block should display:

-   Index
-   Timestamp
-   Transactions
-   Previous Hash
-   Hash
-   Nonce

Tampering with a block should visually demonstrate why subsequent blocks
become invalid.

------------------------------------------------------------------------

## 3.4 Transaction Lab

### Functions

-   Create transaction
-   Sender
-   Receiver
-   Amount
-   Timestamp
-   Transaction ID
-   Optional digital signature
-   Transaction status

### Example flow

``` text
Alice
  ↓
Create Transaction
  ↓
Sign Transaction
  ↓
Broadcast
  ↓
Network
  ↓
Validator
  ↓
Block
```

Transactions must use the shared `Transaction` interface.

------------------------------------------------------------------------

## 3.5 Merkle Tree Lab

### Functions

-   Enter multiple transactions
-   Hash transactions
-   Build Merkle Tree
-   Visualize tree levels
-   Display Merkle Root
-   Verify a transaction
-   Demonstrate transaction modification

### Example

``` text
             Merkle Root
             /         \
          H12           H34
         /   \         /   \
       H1    H2      H3    H4
       |      |       |     |
      TX1    TX2     TX3   TX4
```

The visualization should make the relationship between transactions and
the Merkle Root clear.

------------------------------------------------------------------------

## 3.6 Digital Signature Lab

### Concepts

-   Public key
-   Private key
-   Message
-   Signature
-   Verification

### Educational flow

``` text
Message
   ↓
Hash
   ↓
Private Key
   ↓
Signature
   ↓
Public Key
   ↓
Verify
```

### Functions

-   Generate key pair
-   Sign message
-   Verify signature
-   Modify message
-   Demonstrate failed verification

The module should clearly distinguish:

-   Hashing
-   Encryption
-   Digital signatures

------------------------------------------------------------------------

# 4. Consensus Modules

## 4.1 Proof of Work Lab

### Features

-   Block data
-   Difficulty slider
-   Nonce
-   Mining button
-   Mining progress
-   Number of attempts
-   Mining time
-   Valid hash
-   Difficulty comparison

### Experiment

Users should be able to change:

``` text
Difficulty: 1 → 2 → 3 → 4 → ...
```

and observe:

-   Number of attempts
-   Mining duration
-   Valid hash requirement

------------------------------------------------------------------------

## 4.2 Proof of Stake Lab

### Features

-   Create validators
-   Validator name
-   Stake amount
-   Online/offline status
-   Validator list
-   Run validator selection
-   Display selected validator
-   Show stake influence

Example:

``` text
Validator A   100 ADA
Validator B   500 ADA
Validator C   250 ADA
```

The simulation should communicate that stake affects validator selection
without claiming that the educational randomization is an exact
implementation of a production blockchain protocol.

------------------------------------------------------------------------

## 4.3 Consensus Comparison

Compare:

-   PoW
-   PoS
-   Optional future mechanisms

Comparison dimensions:

-   Selection mechanism
-   Resource requirement
-   Energy model
-   Validator role
-   Security concept
-   Scalability considerations
-   Educational simulation

The comparison must remain descriptive rather than presenting an
unsupported universal "best" consensus mechanism.

------------------------------------------------------------------------

# 5. Network Lab

The Network module visualizes a simplified Blockchain network.

### Features

-   Nodes
-   Validators
-   Network topology
-   Connections
-   Transaction broadcast
-   Block broadcast
-   Propagation animation
-   Latency
-   Number of nodes
-   Online/offline nodes
-   Confirmation status

### Experiment parameters

``` text
Nodes: 5–50
Latency: 10–500 ms
Validators: configurable
```

### Metrics

-   Propagation time
-   Number of reached nodes
-   Confirmed transactions
-   Validator activity

------------------------------------------------------------------------

# 6. Cardano Simulation

Cardano is represented as an educational simulation rather than a
production Cardano node.

### Concepts

-   Epoch
-   Slot
-   Stake
-   Stake Pool
-   Validator / Slot Leader
-   Block production

### Suggested flow

``` text
Epoch
  ↓
Slots
  ↓
Stake Pools
  ↓
Stake
  ↓
Slot Leader Selection
  ↓
Block
```

### Interactive parameters

-   Number of stake pools
-   Pool stake
-   Active slots
-   Epoch progress
-   Selected slot leader

The UI must clearly label this as a simplified educational simulation.

------------------------------------------------------------------------

# 7. Solana Simulation

Solana is represented as an educational simulation.

### Concepts

-   Delegator
-   Stake
-   Validator
-   Stake-weighted voting
-   Block / consensus visualization

### Suggested flow

``` text
Delegator
   ↓
Stake
   ↓
Validator
   ↓
Stake-weighted voting
   ↓
Consensus
   ↓
Block
```

### Interactive parameters

-   Number of validators
-   Validator stake
-   Delegation
-   Online/offline validators
-   Voting activity

The simulation must clearly distinguish educational abstraction from the
exact production Solana implementation.

------------------------------------------------------------------------

# 8. Smart Contract Lab

Smart Contract Lab demonstrates how a smart contract changes state after
receiving a transaction.

This is primarily an educational simulation unless a real blockchain
backend is explicitly added later.

### Example contract

``` solidity
contract Counter {
    uint public count = 0;

    function increment() public {
        count += 1;
    }
}
```

### Simulation flow

``` text
User
 ↓
Call Contract Function
 ↓
Transaction
 ↓
Contract Execution
 ↓
State Updated
 ↓
Event Log
 ↓
Gas Report
```

### UI

-   Contract code panel
-   Contract state
-   Function list
-   Function parameters
-   Execute button
-   Transaction log
-   State before / after
-   Gas-used educational estimate
-   Event log

------------------------------------------------------------------------

# 9. Quiz System

The Quiz module tests knowledge from all major topics.

### Categories

-   Hash
-   Blockchain
-   Transaction
-   Merkle Tree
-   Digital Signature
-   PoW
-   PoS
-   Network
-   Cardano
-   Solana
-   Smart Contract
-   Consensus

### Features

-   Multiple choice
-   Instant feedback
-   Explanation
-   Score
-   Difficulty
-   Retry
-   Progress tracking

Quiz results should be saved into the learning store.

------------------------------------------------------------------------

# 10. Experiment Mode

Experiment Mode is a cross-cutting system.

It should appear inside relevant modules rather than being implemented
as a disconnected page.

### Purpose

Allow users to change parameters and observe results.

### Examples

#### Hash

``` text
Input → Hash
Change input → Hash changes
```

#### PoW

``` text
Difficulty ↑
→ Attempts ↑
→ Mining time tends to ↑
```

#### PoS

``` text
Stake changes
→ Validator selection probabilities/behavior in the educational simulation changes
```

#### Network

``` text
Latency ↑
→ Propagation becomes slower in the simulation
```

#### Smart Contract

``` text
Function call
→ State changes
→ Gas estimate
→ Event emitted
```

Every experiment should have:

-   Parameters
-   Run button
-   Result
-   Visualization
-   Reset
-   Explanation

------------------------------------------------------------------------

# 11. Learning Analytics & Recommendation

The platform should collect learning activity locally.

### Data examples

``` ts
interface LearningActivity {
  moduleId: string;
  action: string;
  score?: number;
  completed?: boolean;
  timestamp: number;
}
```

### Analytics

Calculate:

-   Module completion
-   Quiz average
-   Weak modules
-   Strong modules
-   Time/activity
-   Experiment count
-   Learning streak

### Recommendation logic

A simple rule-based system is sufficient.

Example:

``` text
If Hash completed
AND Blockchain not completed
→ Recommend Blockchain

If Quiz score < 60% for Consensus
→ Recommend Consensus Review

If PoW and PoS completed
→ Recommend Consensus Comparison

If Cardano completed
AND Solana not completed
→ Recommend Solana
```

No machine-learning model is required for version 1.

------------------------------------------------------------------------

# 12. End-to-End Blockchain Demonstration

The most important integrated demonstration should connect multiple
modules.

## Flow

``` text
Create Transaction
        ↓
Digital Signature
        ↓
Network Broadcast
        ↓
Validator Selection
        ↓
Block Creation
        ↓
Merkle Root
        ↓
Blockchain
        ↓
Block Confirmation
```

This flow should demonstrate that the modules are parts of one
Blockchain system rather than independent pages.

------------------------------------------------------------------------

# 13. Shared Data Models

All team members must use shared TypeScript interfaces.

## Block

``` ts
interface Block {
  index: number;
  timestamp: number;
  transactions: Transaction[];
  previousHash: string;
  hash: string;
  nonce: number;
}
```

## Transaction

``` ts
interface Transaction {
  id: string;
  sender: string;
  receiver: string;
  amount: number;
  timestamp: number;
  signature?: string;
}
```

## Validator

``` ts
interface Validator {
  id: string;
  name: string;
  stake: number;
  online: boolean;
}
```

Do not independently redefine these interfaces in different modules.

------------------------------------------------------------------------

# 14. Technology Stack

## Frontend

-   React
-   TypeScript
-   Vite

## Styling

-   Tailwind CSS

## Animation

-   Framer Motion

## Icons

-   Lucide React

## State management

-   Zustand

## Routing

-   React Router

## Persistence

Version 1:

-   localStorage
-   Zustand persist

Optional future:

-   Supabase authentication/database

## Cryptography

Use browser-supported cryptographic APIs or appropriate educational
libraries where suitable.

Never implement production cryptography manually for security-sensitive
use.

------------------------------------------------------------------------

# 15. Project Architecture

``` text
cryptolab/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── blockchain/
│   │   ├── consensus/
│   │   ├── network/
│   │   ├── smart-contract/
│   │   └── visualization/
│   │
│   ├── pages/
│   │   ├── dashboard/
│   │   ├── hash/
│   │   ├── blockchain/
│   │   ├── transaction/
│   │   ├── merkle/
│   │   ├── signature/
│   │   ├── consensus/
│   │   ├── network/
│   │   ├── cardano/
│   │   ├── solana/
│   │   ├── smart-contract/
│   │   └── quiz/
│   │
│   ├── lib/
│   │   ├── crypto/
│   │   ├── blockchain/
│   │   ├── consensus/
│   │   ├── network/
│   │   └── smart-contract/
│   │
│   ├── store/
│   │   ├── userStore.ts
│   │   ├── learningStore.ts
│   │   └── simulationStore.ts
│   │
│   ├── data/
│   │   ├── lessons/
│   │   ├── quizzes/
│   │   └── networks/
│   │
│   └── types/
│       ├── blockchain.ts
│       ├── transaction.ts
│       ├── consensus.ts
│       ├── network.ts
│       ├── smartContract.ts
│       └── user.ts
│
├── project_spec.md
├── CONTRIBUTING.md
├── README.md
└── package.json
```

------------------------------------------------------------------------

# 16. Team Division

## TV1 --- Tech Lead + Integration

Responsibilities:

-   GitHub repository
-   Architecture
-   Routing integration
-   Shared types
-   Zustand stores
-   Integration
-   Testing
-   Deployment
-   README
-   project_spec
-   CONTRIBUTING
-   Code review

TV1 should not unnecessarily own a large standalone feature module.

------------------------------------------------------------------------

## TV2 --- UI/UX + Visualization

Responsibilities:

-   Design system
-   Navigation
-   Dashboard layout
-   Reusable components
-   Animations
-   Charts
-   Responsive design
-   Blockchain visualization
-   Merkle Tree visualization
-   Network visualization
-   Validator visualization
-   Smart Contract visualization support

TV2 consumes logic from other modules instead of duplicating blockchain
logic.

------------------------------------------------------------------------

## TV3 --- Blockchain Core + Cryptography

Responsibilities:

-   SHA-256 / Hash
-   Blockchain
-   Block
-   Transaction
-   Merkle Tree
-   Digital Signature
-   RSA educational concepts

Main directories:

``` text
src/lib/crypto/
src/lib/blockchain/
```

------------------------------------------------------------------------

## TV4 --- Consensus

Responsibilities:

-   PoW
-   PoS
-   Consensus Comparison
-   Consensus Experiment Mode
-   Optional future DPoS/PBFT

------------------------------------------------------------------------

## TV5 --- Network + Real Network Simulations

Responsibilities:

-   Network graph
-   Nodes
-   Validators
-   Transaction broadcast
-   Block propagation
-   Latency
-   Cardano
-   Solana

------------------------------------------------------------------------

## TV6 --- Personalization + Quiz + Web3

Responsibilities:

-   Profile
-   XP
-   Achievements
-   Learning progress
-   Quiz
-   Learning Analytics
-   Recommendation
-   Learning Path
-   Smart Contract Lab
-   Optional Digital Asset/NFT module

------------------------------------------------------------------------

# 17. Git Workflow

## Main branch

``` text
main
```

`main` must always contain a reasonably stable version.

No direct push to `main` during normal development.

## Feature branches

Recommended branch names:

``` text
feature/tv1-integration
feature/tv2-ui
feature/tv3-blockchain
feature/tv4-consensus
feature/tv5-network
feature/tv6-web3
```

## Commit convention

Use:

``` text
feat:
fix:
refactor:
style:
docs:
test:
chore:
```

Examples:

``` text
feat: add SHA-256 hash simulator
feat: add PoS validator simulation
fix: correct merkle root calculation
style: improve dashboard responsive layout
docs: update project specification
test: add blockchain validation tests
```

## Pull Request

Workflow:

``` text
Feature Branch
      ↓
Commit
      ↓
Push
      ↓
Pull Request
      ↓
Review
      ↓
Fix if necessary
      ↓
Merge into main
```

TV1 performs the final integration review.

------------------------------------------------------------------------

# 18. Rules for Vibe Coding / AI Coding

AI coding tools may be used, but every team member remains responsible
for understanding and testing generated code.

Before modifying code, the AI assistant must:

1.  Read `project_spec.md`.
2.  Inspect the existing project structure.
3.  Understand existing interfaces.
4.  Modify only the assigned module.
5.  Avoid rewriting unrelated modules.
6.  Avoid unnecessary changes to shared files.
7.  Preserve existing functionality.
8.  Explain important implementation decisions.
9.  Test the implementation.
10. Report changed files.

### Important rule

Do not ask AI to "rewrite the whole project" when implementing one
feature.

Prefer:

``` text
Implement the PoS simulation in the existing consensus module.
Do not modify unrelated modules.
Reuse the existing Validator interface.
Do not rewrite App.tsx unless routing integration is required.
```

------------------------------------------------------------------------

# 19. UI/UX Direction

CryptoLab should have its own visual identity.

### Visual direction

-   Futuristic
-   Educational
-   Professional
-   Dark interface
-   Glass / layered cards
-   Subtle gradients
-   Smooth animations
-   Clear information hierarchy

### Avoid

-   Copying HubBlock layout exactly
-   Copying HubBlock text
-   Copying HubBlock assets
-   Copying HubBlock source code
-   Excessive animation that harms usability
-   Too many decorative elements without educational purpose

### Responsive

The website must work on:

-   Desktop
-   Laptop
-   Tablet
-   Mobile

------------------------------------------------------------------------

# 20. Testing Requirements

Important logic should have tests.

Priority:

1.  Hash generation
2.  Merkle Root
3.  Blockchain validation
4.  Digital Signature verification
5.  PoW validation
6.  PoS validator selection
7.  Transaction creation
8.  Smart Contract state transition

Example:

``` text
Input
→ Function
→ Expected Output
```

------------------------------------------------------------------------

# 21. Definition of Done

A module is considered complete only when:

-   UI is implemented.
-   Main interaction works.
-   Core logic works.
-   Empty/error states are handled.
-   Reset works where applicable.
-   Responsive layout is acceptable.
-   Existing modules are not broken.
-   Shared interfaces are respected.
-   Code is committed to the correct branch.
-   At least basic testing has been performed.
-   Documentation is updated where necessary.

------------------------------------------------------------------------

# 22. Final Demonstration Scenario

The final demo should show a coherent learning journey.

### Part 1 --- Dashboard

Show:

-   User profile
-   Progress
-   Recommendation

### Part 2 --- Hash

Enter data and demonstrate SHA-256.

### Part 3 --- Transaction

Create a transaction.

### Part 4 --- Digital Signature

Sign and verify the transaction.

### Part 5 --- Network

Broadcast the transaction.

### Part 6 --- PoS

Run validator selection.

### Part 7 --- Merkle Tree

Show transactions becoming a Merkle Root.

### Part 8 --- Blockchain

Create the block and link it to the chain.

### Part 9 --- Experiment

Change a parameter and compare results.

### Part 10 --- Learning Analytics

Return to Dashboard and show updated learning progress/recommendation.

This creates a clear end-to-end story:

``` text
LEARN
  ↓
CREATE
  ↓
SIGN
  ↓
BROADCAST
  ↓
VALIDATE
  ↓
BUILD BLOCK
  ↓
MERKLE ROOT
  ↓
BLOCKCHAIN
  ↓
EXPERIMENT
  ↓
ANALYZE
```

------------------------------------------------------------------------

# 23. Future / Optional Features

These are NOT required for the first version.

Possible bonus modules:

-   DPoS
-   PBFT
-   Digital Asset
-   ERC-20 simulation
-   ERC-721 / NFT simulation

Only implement these after all core modules are stable.

------------------------------------------------------------------------

# 24. Project Success Criteria

The project should demonstrate:

### Technical

-   React + TypeScript architecture
-   Modular components
-   Shared interfaces
-   State management
-   Working simulations
-   Responsive UI
-   Testing
-   Git collaboration

### Educational

-   Correct Blockchain terminology
-   Visual explanations
-   Interactive simulations
-   Experiment-based learning
-   Quiz feedback
-   Progress tracking

### Integration

The final product should demonstrate that:

``` text
Cryptography
     ↓
Transactions
     ↓
Network
     ↓
Consensus
     ↓
Blocks
     ↓
Blockchain
     ↓
Learning Analytics
```

are connected into one coherent educational platform.

------------------------------------------------------------------------

# 25. Current Development Priority

Implement in this order:

1.  Project foundation
2.  Shared types
3.  Global UI
4.  Dashboard
5.  Hash
6.  Blockchain
7.  Transaction
8.  Merkle Tree
9.  Digital Signature
10. PoW
11. PoS
12. Network
13. Cardano
14. Solana
15. Smart Contract
16. Quiz
17. Personalization
18. Experiment Mode integration
19. Learning Analytics / Recommendation
20. Testing
21. Responsive optimization
22. Documentation
23. Deployment
24. Final demo

Do NOT start bonus modules before the core workflow is stable.

------------------------------------------------------------------------

# 26. Golden Rule

> **CryptoLab is not a collection of pages. It is an interactive
> Blockchain learning system.**

Every major feature should answer at least one of these questions:

-   What happens?
-   Why does it happen?
-   What changes if I modify a parameter?
-   How is this related to another Blockchain component?

The final product should prioritize:

**Correctness → Interaction → Integration → Visualization →
Personalization → Polish**
