import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  Activity,
  ArrowRightLeft,
  BookOpen,
  Box,
  Boxes,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  FileText,
  Fuel,
  Hash,
  PlayCircle,
  RotateCcw,
  ShieldCheck,
  Terminal,
  Wallet,
  XCircle,
} from "lucide-react";

type ContractFunction = "deposit" | "transfer" | "withdraw";

type AccountName = "Alice" | "Bob" | "Carol";

type TransactionStatus = "success" | "reverted";

type StepStatus = "done" | "error";

interface ContractState {
  wallets: Record<AccountName, number>;
  vault: Record<AccountName, number>;
}

interface ExecutionStep {
  id: string;
  label: string;
  detail: string;
  status: StepStatus;
}

interface StateDiff {
  account: AccountName;
  walletBefore: number;
  walletAfter: number;
  vaultBefore: number;
  vaultAfter: number;
}

interface TransactionReceipt {
  hash: string;
  func: ContractFunction;
  from: AccountName;
  to?: AccountName;
  amount: number;
  gasUsed: number;
  gasPriceGwei: number;
  feeEth: number;
  blockNumber: number;
  status: TransactionStatus;
  event?: string;
  timestamp: string;
}

interface FunctionMeta {
  title: string;
  signature: string;
  selector: string;
  gasEstimate: number;
  description: string;
}

interface ConceptItem {
  title: string;
  description: string;
  icon: ReactNode;
}

const accounts: AccountName[] = ["Alice", "Bob", "Carol"];

const initialState: ContractState = {
  wallets: {
    Alice: 500,
    Bob: 200,
    Carol: 350,
  },
  vault: {
    Alice: 120,
    Bob: 60,
    Carol: 40,
  },
};

const functionMeta: Record<ContractFunction, FunctionMeta> = {
  deposit: {
    title: "Deposit",
    signature: "deposit(uint256 amount)",
    selector: "0xd0e30db0",
    gasEstimate: 45_000,
    description:
      "Chuyển token từ Wallet của người dùng vào vùng số dư do Smart Contract quản lý.",
  },

  transfer: {
    title: "Transfer",
    signature: "transfer(address to, uint256 amount)",
    selector: "0xa9059cbb",
    gasEstimate: 52_000,
    description:
      "Chuyển số dư bên trong Contract Vault từ một người dùng sang người dùng khác.",
  },

  withdraw: {
    title: "Withdraw",
    signature: "withdraw(uint256 amount)",
    selector: "0x2e1a7d4d",
    gasEstimate: 48_000,
    description:
      "Rút token từ Contract Vault trở lại Wallet của người dùng.",
  },
};

const concepts: ConceptItem[] = [
  {
    title: "Function",
    description:
      "Hàm được định nghĩa trong Smart Contract. Người dùng có thể gọi các hàm như deposit(), transfer() hoặc withdraw().",
    icon: <Code2 size={18} />,
  },
  {
    title: "Calldata",
    description:
      "Dữ liệu đi kèm transaction, cho Smart Contract biết function nào được gọi và các tham số truyền vào.",
    icon: <FileText size={18} />,
  },
  {
    title: "Gas",
    description:
      "Đơn vị đo lượng tài nguyên tính toán cần thiết để thực thi transaction trên môi trường EVM.",
    icon: <Fuel size={18} />,
  },
  {
    title: "State",
    description:
      "Dữ liệu được Smart Contract lưu trữ, ví dụ số dư của từng tài khoản trong Contract Vault.",
    icon: <Database size={18} />,
  },
  {
    title: "Event",
    description:
      "Log được Smart Contract phát ra sau khi có hành động quan trọng, giúp ứng dụng theo dõi kết quả giao dịch.",
    icon: <Boxes size={18} />,
  },
  {
    title: "Revert",
    description:
      "Khi điều kiện không hợp lệ, transaction thất bại và thay đổi state sẽ không được áp dụng.",
    icon: <ShieldCheck size={18} />,
  },
];

const lifecycleSteps = [
  "Create Transaction",
  "ABI Encode",
  "Validation",
  "Gas",
  "EVM Execution",
  "State Update",
  "Event",
  "Block",
  "Receipt",
];

const contractSource = `contract MiniVault {
    mapping(address => uint256) public balances;

    event Deposited(
        address indexed user,
        uint256 amount
    );

    event Transferred(
        address indexed from,
        address indexed to,
        uint256 amount
    );

    event Withdrawn(
        address indexed user,
        uint256 amount
    );

    function deposit(uint256 amount) public {
        require(amount > 0, "Invalid amount");

        balances[msg.sender] += amount;

        emit Deposited(
            msg.sender,
            amount
        );
    }

    function transfer(
        address to,
        uint256 amount
    ) public {
        require(
            to != msg.sender,
            "Same address"
        );

        require(
            balances[msg.sender] >= amount,
            "Insufficient balance"
        );

        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit Transferred(
            msg.sender,
            to,
            amount
        );
    }

    function withdraw(uint256 amount) public {
        require(
            balances[msg.sender] >= amount,
            "Insufficient balance"
        );

        balances[msg.sender] -= amount;

        emit Withdrawn(
            msg.sender,
            amount
        );
    }
}`;

function cloneContractState(value: ContractState): ContractState {
  return {
    wallets: { ...value.wallets },
    vault: { ...value.vault },
  };
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function makeTransactionHash() {
  const partA = Date.now().toString(16);
  const partB = Math.random().toString(16).replace(".", "");
  const partC = Math.random().toString(16).replace(".", "");

  return `0x${`${partA}${partB}${partC}`
    .replace(/[^a-fA-F0-9]/g, "")
    .padEnd(64, "0")
    .slice(0, 64)}`;
}

function shortHash(hash: string) {
  return `${hash.slice(0, 10)}...${hash.slice(-6)}`;
}

function calculateVaultTotal(state: ContractState) {
  return accounts.reduce(
    (total, account) => total + state.vault[account],
    0,
  );
}

function createDiff(
  before: ContractState,
  after: ContractState,
): StateDiff[] {
  return accounts
    .map((account) => ({
      account,
      walletBefore: before.wallets[account],
      walletAfter: after.wallets[account],
      vaultBefore: before.vault[account],
      vaultAfter: after.vault[account],
    }))
    .filter(
      (item) =>
        item.walletBefore !== item.walletAfter ||
        item.vaultBefore !== item.vaultAfter,
    );
}

export default function SmartContractPage() {
  const [func, setFunc] =
    useState<ContractFunction>("transfer");

  const [from, setFrom] =
    useState<AccountName>("Alice");

  const [to, setTo] =
    useState<AccountName>("Bob");

  const [amount, setAmount] = useState(10);

  const [state, setState] =
    useState<ContractState>(() =>
      cloneContractState(initialState),
    );

  const [steps, setSteps] =
    useState<ExecutionStep[]>([]);

  const [history, setHistory] =
    useState<TransactionReceipt[]>([]);

  const [lastReceipt, setLastReceipt] =
    useState<TransactionReceipt | null>(null);

  const [lastDiff, setLastDiff] =
    useState<StateDiff[]>([]);

  const [isRunning, setIsRunning] =
    useState(false);

  const [currentPhase, setCurrentPhase] =
    useState("Ready");

  const [nextBlock, setNextBlock] =
    useState(1842);

  const mountedRef = useRef(true);
  const stepIdRef = useRef(0);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const meta = functionMeta[func];

  const gasPriceGwei = 20;

  const estimatedFee = useMemo(
    () =>
      (meta.gasEstimate * gasPriceGwei) /
      1_000_000_000,
    [meta.gasEstimate],
  );

  const vaultTotal = useMemo(
    () => calculateVaultTotal(state),
    [state],
  );

  const calldata = useMemo(() => {
    if (func === "transfer") {
      return `${meta.selector}  ${to}  ${amount}`;
    }

    return `${meta.selector}  ${amount}`;
  }, [amount, func, meta.selector, to]);

  const addStep = async (
    label: string,
    detail: string,
    status: StepStatus = "done",
  ) => {
    await wait(350);

    if (!mountedRef.current) {
      return;
    }

    stepIdRef.current += 1;

    setSteps((previous) => [
      ...previous,
      {
        id: `step-${stepIdRef.current}`,
        label,
        detail,
        status,
      },
    ]);
  };

  const validateTransaction = (
    snapshot: ContractState,
  ): string | null => {
    if (!Number.isFinite(amount) || amount <= 0) {
      return "Amount phải lớn hơn 0.";
    }

    if (func === "transfer" && from === to) {
      return "Không thể transfer cho chính tài khoản gửi.";
    }

    if (
      func === "deposit" &&
      snapshot.wallets[from] < amount
    ) {
      return `${from} không đủ số dư Wallet để deposit.`;
    }

    if (
      func === "withdraw" &&
      snapshot.vault[from] < amount
    ) {
      return `${from} không đủ số dư Contract Vault để withdraw.`;
    }

    if (
      func === "transfer" &&
      snapshot.vault[from] < amount
    ) {
      return `${from} không đủ số dư Contract Vault để transfer.`;
    }

    return null;
  };

  const applyTransaction = (
    snapshot: ContractState,
  ) => {
    const next = cloneContractState(snapshot);

    let event = "";

    if (func === "deposit") {
      next.wallets[from] -= amount;
      next.vault[from] += amount;

      event = `Deposited(${from}, ${amount})`;
    }

    if (func === "withdraw") {
      next.vault[from] -= amount;
      next.wallets[from] += amount;

      event = `Withdrawn(${from}, ${amount})`;
    }

    if (func === "transfer") {
      next.vault[from] -= amount;
      next.vault[to] += amount;

      event = `Transferred(${from}, ${to}, ${amount})`;
    }

    return {
      nextState: next,
      event,
    };
  };

  const execute = async () => {
    if (isRunning) {
      return;
    }

    const snapshot =
      cloneContractState(state);

    const transactionHash =
      makeTransactionHash();

    setSteps([]);
    setLastDiff([]);
    setLastReceipt(null);
    setIsRunning(true);

    setCurrentPhase("Creating Transaction");

    await addStep(
      "1. Transaction Created",
      `${from} gọi ${meta.signature}`,
    );

    setCurrentPhase("ABI Encoding");

    await addStep(
      "2. ABI Encoded",
      `Function selector: ${meta.selector}`,
    );

    setCurrentPhase("Validation");

    await addStep(
      "3. Validation",
      "Kiểm tra input, sender và trạng thái hiện tại của Smart Contract.",
    );

    const validationError =
      validateTransaction(snapshot);

    if (validationError) {
      setCurrentPhase("Reverted");

      await addStep(
        "4. EVM Reverted",
        validationError,
        "error",
      );

      const gasUsed = Math.round(
        meta.gasEstimate * 0.68,
      );

      const feeEth =
        (gasUsed * gasPriceGwei) /
        1_000_000_000;

      const receipt: TransactionReceipt = {
        hash: transactionHash,
        func,
        from,
        to:
          func === "transfer"
            ? to
            : undefined,
        amount,
        gasUsed,
        gasPriceGwei,
        feeEth,
        blockNumber: nextBlock,
        status: "reverted",
        timestamp:
          new Date().toLocaleTimeString(),
      };

      setLastReceipt(receipt);

      setHistory((previous) => [
        receipt,
        ...previous,
      ]);

      setNextBlock(
        (previous) => previous + 1,
      );

      setIsRunning(false);

      return;
    }

    setCurrentPhase("Gas Estimation");

    await addStep(
      "4. Gas Estimated",
      `${meta.gasEstimate.toLocaleString()} gas @ ${gasPriceGwei} Gwei`,
    );

    setCurrentPhase("EVM Execution");

    await addStep(
      "5. EVM Execution",
      `${func}() đang thực thi logic và thay đổi contract storage.`,
    );

    const { nextState, event } =
      applyTransaction(snapshot);

    const diff = createDiff(
      snapshot,
      nextState,
    );

    setState(nextState);
    setLastDiff(diff);

    setCurrentPhase("Event");

    await addStep(
      "6. Event Emitted",
      event,
    );

    setCurrentPhase("State Update");

    await addStep(
      "7. State Updated",
      "Contract storage đã được cập nhật thành công.",
    );

    setCurrentPhase("Block Confirmation");

    await addStep(
      "8. Block Confirmed",
      `Transaction được ghi vào block #${nextBlock}.`,
    );

    const gasUsed =
      meta.gasEstimate +
      Math.floor(Math.random() * 1800);

    const feeEth =
      (gasUsed * gasPriceGwei) /
      1_000_000_000;

    const receipt: TransactionReceipt = {
      hash: transactionHash,
      func,
      from,
      to:
        func === "transfer"
          ? to
          : undefined,
      amount,
      gasUsed,
      gasPriceGwei,
      feeEth,
      blockNumber: nextBlock,
      status: "success",
      event,
      timestamp:
        new Date().toLocaleTimeString(),
    };

    setLastReceipt(receipt);

    setHistory((previous) => [
      receipt,
      ...previous,
    ]);

    setNextBlock(
      (previous) => previous + 1,
    );

    setCurrentPhase("Confirmed");
    setIsRunning(false);
  };

  const resetLab = () => {
    setFunc("transfer");
    setFrom("Alice");
    setTo("Bob");
    setAmount(10);

    setState(
      cloneContractState(initialState),
    );

    setSteps([]);
    setHistory([]);
    setLastReceipt(null);
    setLastDiff([]);
    setCurrentPhase("Ready");
    setNextBlock(1842);
    setIsRunning(false);
  };

  const handleFunctionSelect = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    const selected =
      event.currentTarget.dataset
        .functionName as ContractFunction;

    setFunc(selected);
    setSteps([]);
    setLastReceipt(null);
    setLastDiff([]);
    setCurrentPhase("Ready");
  };

  const handleFromChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    setFrom(
      event.target.value as AccountName,
    );
  };

  const handleToChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    setTo(
      event.target.value as AccountName,
    );
  };

  const handleAmountChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setAmount(
      Number(event.target.value),
    );
  };

  return (
    <div className="min-h-[calc(100vh-72px)] px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-[1280px]">
        {/* HEADER */}
        <header className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
            <Code2 size={16} />
            Smart Contract Laboratory
          </div>

          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                Smart Contract Simulator
              </h1>

              <p className="mt-4 max-w-3xl leading-7 text-slate-400">
                Học nguyên lý Smart Contract trước,
                sau đó tự tạo transaction và quan sát
                toàn bộ quá trình thực thi từng bước.
              </p>
            </div>

            <button
              type="button"
              onClick={resetLab}
              disabled={isRunning}
              className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 transition hover:border-white/20 hover:text-white disabled:opacity-40"
            >
              <RotateCcw size={15} />
              Reset Lab
            </button>
          </div>
        </header>

        {/* EDUCATIONAL NOTICE */}
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/5 px-5 py-4 text-sm text-amber-200">
          <ShieldCheck
            size={18}
            className="mt-0.5 shrink-0"
          />

          <div>
            Đây là môi trường mô phỏng phục vụ học
            tập. Transaction, gas, hash và block
            bên dưới không được gửi tới blockchain
            thật.
          </div>
        </div>

        {/* THEORY */}
        <section className="mb-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 lg:p-8">
          <div className="mb-8 flex items-start gap-4">
            <div className="rounded-2xl border border-blue-400/20 bg-blue-400/10 p-3 text-blue-300">
              <BookOpen size={23} />
            </div>

            <div>
              <div className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
                Kiến thức trước khi thực hành
              </div>

              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Smart Contract hoạt động như thế nào?
              </h2>

              <p className="mt-3 max-w-4xl leading-7 text-slate-400">
                Smart Contract là một chương trình
                được triển khai trên blockchain.
                Người dùng gửi transaction để gọi
                một function của contract. Contract
                kiểm tra dữ liệu đầu vào, thực thi
                logic và nếu hợp lệ sẽ cập nhật
                state được lưu trên blockchain.
              </p>
            </div>
          </div>

          {/* SIMPLE FLOW */}
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <TheoryStage
              number="01"
              title="Người dùng tạo Transaction"
              description="Chọn function cần gọi, tài khoản gửi và các tham số."
            />

            <TheoryStage
              number="02"
              title="Smart Contract thực thi"
              description="Dữ liệu được encode, kiểm tra điều kiện và thực thi trên EVM."
            />

            <TheoryStage
              number="03"
              title="Blockchain lưu kết quả"
              description="State được cập nhật, event được phát ra và receipt được tạo."
            />
          </div>

          {/* CONCEPTS */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen
                size={18}
                className="text-emerald-300"
              />

              <h3 className="font-semibold text-white">
                6 khái niệm cần biết
              </h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {concepts.map((concept) => (
                <article
                  key={concept.title}
                  className="rounded-2xl border border-white/5 bg-[#050816] p-5"
                >
                  <div className="mb-3 flex items-center gap-2 text-emerald-300">
                    {concept.icon}

                    <h4 className="font-semibold">
                      {concept.title}
                    </h4>
                  </div>

                  <p className="text-sm leading-6 text-slate-400">
                    {concept.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* LIFECYCLE */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <Cpu
                size={18}
                className="text-purple-300"
              />

              <h3 className="font-semibold text-white">
                Vòng đời của một transaction
              </h3>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#050816] p-5">
              <div className="flex flex-wrap items-center gap-2">
                {lifecycleSteps.map(
                  (step, index) => (
                    <div
                      key={step}
                      className="flex items-center gap-2"
                    >
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-300">
                        <span className="mr-2 font-mono text-blue-300">
                          {index + 1}
                        </span>

                        {step}
                      </div>

                      {index <
                        lifecycleSteps.length -
                          1 && (
                        <span className="text-slate-700">
                          →
                        </span>
                      )}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* FUNCTIONS */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <Code2
                size={18}
                className="text-blue-300"
              />

              <h3 className="font-semibold text-white">
                MiniVault có 3 function
              </h3>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <FunctionTheoryCard
                name="deposit(amount)"
                color="emerald"
                description="Đưa token từ Wallet của người dùng vào Contract Vault."
                example="Alice deposit(50)"
                result="Wallet −50 / Vault +50"
              />

              <FunctionTheoryCard
                name="transfer(to, amount)"
                color="blue"
                description="Chuyển token giữa hai tài khoản bên trong Contract Vault."
                example="Alice → Bob 30"
                result="Alice −30 / Bob +30"
              />

              <FunctionTheoryCard
                name="withdraw(amount)"
                color="purple"
                description="Rút token từ Contract Vault trở lại Wallet của người dùng."
                example="Bob withdraw(20)"
                result="Vault −20 / Wallet +20"
              />
            </div>
          </div>

          {/* EXAMPLES */}
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04] p-5">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2
                  size={17}
                  className="text-emerald-300"
                />

                <h3 className="font-semibold text-emerald-300">
                  Ví dụ transaction thành công
                </h3>
              </div>

              <div className="space-y-3 text-sm text-slate-400">
                <p>
                  Ban đầu Alice có:
                </p>

                <div className="rounded-xl border border-white/5 bg-[#050816] p-3 font-mono text-xs">
                  Wallet ={" "}
                  <span className="text-white">
                    500
                  </span>
                  <br />
                  Vault ={" "}
                  <span className="text-white">
                    120
                  </span>
                </div>

                <p>
                  Alice gọi{" "}
                  <span className="font-mono text-emerald-300">
                    deposit(50)
                  </span>
                </p>

                <div className="rounded-xl border border-white/5 bg-[#050816] p-3 font-mono text-xs">
                  Wallet: 500 →{" "}
                  <span className="text-emerald-300">
                    450
                  </span>
                  <br />
                  Vault: 120 →{" "}
                  <span className="text-emerald-300">
                    170
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-rose-400/10 bg-rose-400/[0.04] p-5">
              <div className="mb-3 flex items-center gap-2">
                <XCircle
                  size={17}
                  className="text-rose-300"
                />

                <h3 className="font-semibold text-rose-300">
                  Ví dụ transaction bị Revert
                </h3>
              </div>

              <p className="text-sm leading-7 text-slate-400">
                Nếu Alice chỉ có{" "}
                <strong className="text-white">
                  120 TOKEN
                </strong>{" "}
                trong Vault nhưng gọi{" "}
                <span className="font-mono text-rose-300">
                  withdraw(500)
                </span>
                , Smart Contract phát hiện số dư
                không đủ.
              </p>

              <div className="mt-4 rounded-xl border border-rose-400/10 bg-[#050816] p-3 text-sm">
                <div className="font-semibold text-rose-300">
                  Transaction → REVERTED
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  Contract state không thay đổi.
                </div>
              </div>
            </div>
          </div>

          {/* LEARNING GOAL */}
          <div className="mt-6 rounded-2xl border border-blue-400/10 bg-blue-400/[0.04] px-5 py-4">
            <div className="flex items-start gap-3">
              <Activity
                size={18}
                className="mt-0.5 shrink-0 text-blue-300"
              />

              <div className="text-sm leading-6 text-slate-400">
                <strong className="text-blue-300">
                  Bài thực hành:
                </strong>{" "}
                Hãy thay đổi function, tài khoản và
                amount trong simulator bên dưới.
                Quan sát{" "}
                <strong className="text-white">
                  Execution Pipeline
                </strong>
                ,{" "}
                <strong className="text-white">
                  State Diff
                </strong>{" "}
                và{" "}
                <strong className="text-white">
                  Transaction Receipt
                </strong>{" "}
                để hiểu transaction được xử lý như
                thế nào.
              </div>
            </div>
          </div>
        </section>

        {/* SIMULATOR TITLE */}
        <div className="mb-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />

          <span className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Bắt đầu thực hành
          </span>

          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* SUMMARY */}
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <SummaryCard
            icon={<Box size={17} />}
            label="Contract"
            value="MiniVault"
          />

          <SummaryCard
            icon={<Database size={17} />}
            label="Contract Balance"
            value={`${vaultTotal} TOKEN`}
          />

          <SummaryCard
            icon={<Activity size={17} />}
            label="Current Phase"
            value={currentPhase}
          />

          <SummaryCard
            icon={<Hash size={17} />}
            label="Next Block"
            value={`#${nextBlock}`}
          />
        </div>

        {/* CALL + EXECUTION */}
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          {/* CALL CONTRACT */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-5 flex items-center gap-3">
              <PlayCircle
                size={19}
                className="text-emerald-300"
              />

              <div>
                <h2 className="font-semibold text-white">
                  Call Contract
                </h2>

                <p className="text-xs text-slate-500">
                  Chọn function và tạo simulated
                  transaction.
                </p>
              </div>
            </div>

            {/* FUNCTION */}
            <div className="mb-5">
              <label className="mb-2 block text-xs text-slate-500">
                Function
              </label>

              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    "deposit",
                    "transfer",
                    "withdraw",
                  ] as ContractFunction[]
                ).map((item) => (
                  <button
                    key={item}
                    type="button"
                    data-function-name={item}
                    onClick={
                      handleFunctionSelect
                    }
                    disabled={isRunning}
                    className={`rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      func === item
                        ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white"
                        : "border border-white/10 bg-[#050816] text-slate-400 hover:text-white"
                    }`}
                  >
                    {item}()
                  </button>
                ))}
              </div>
            </div>

            {/* FUNCTION INFORMATION */}
            <div className="mb-5 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04] p-4">
              <div className="font-mono text-sm text-emerald-300">
                {meta.signature}
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                {meta.description}
              </p>
            </div>

            {/* FROM / TO */}
            <div className="mb-4 grid gap-3 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs text-slate-500">
                  From
                </label>

                <select
                  value={from}
                  onChange={
                    handleFromChange
                  }
                  disabled={isRunning}
                  className="w-full rounded-xl border border-white/10 bg-[#050816] px-3 py-3 text-sm text-white outline-none"
                >
                  {accounts.map((name) => (
                    <option
                      key={name}
                      value={name}
                    >
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              {func === "transfer" && (
                <div>
                  <label className="mb-2 block text-xs text-slate-500">
                    To
                  </label>

                  <select
                    value={to}
                    onChange={
                      handleToChange
                    }
                    disabled={isRunning}
                    className="w-full rounded-xl border border-white/10 bg-[#050816] px-3 py-3 text-sm text-white outline-none"
                  >
                    {accounts.map(
                      (name) => (
                        <option
                          key={name}
                          value={name}
                        >
                          {name}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              )}
            </div>

            {/* AMOUNT */}
            <div className="mb-5">
              <label className="mb-2 block text-xs text-slate-500">
                Amount
              </label>

              <input
                type="number"
                min="0"
                value={amount}
                onChange={
                  handleAmountChange
                }
                disabled={isRunning}
                className="w-full rounded-xl border border-white/10 bg-[#050816] px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/40"
              />
            </div>

            {/* CALLDATA */}
            <div className="mb-5 rounded-2xl border border-white/5 bg-[#050816] p-4">
              <div className="mb-2 text-xs text-slate-500">
                Simulated Calldata
              </div>

              <div className="break-all font-mono text-xs text-blue-300">
                {calldata}
              </div>
            </div>

            {/* GAS */}
            <div className="mb-5 grid grid-cols-2 gap-3">
              <InfoBox
                label="Estimated Gas"
                value={meta.gasEstimate.toLocaleString()}
              />

              <InfoBox
                label="Estimated Fee"
                value={`${estimatedFee.toFixed(
                  6,
                )} ETH`}
              />
            </div>

            <button
              type="button"
              onClick={execute}
              disabled={isRunning}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 py-3.5 font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <PlayCircle size={18} />

              {isRunning
                ? "Executing..."
                : "Execute Contract"}
            </button>
          </section>

          {/* EXECUTION PIPELINE */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Terminal
                  size={19}
                  className="text-blue-300"
                />

                <div>
                  <h2 className="font-semibold text-white">
                    Execution Pipeline
                  </h2>

                  <p className="text-xs text-slate-500">
                    Theo dõi transaction theo từng
                    bước.
                  </p>
                </div>
              </div>

              {isRunning && (
                <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs text-blue-300">
                  Running
                </span>
              )}
            </div>

            <div
              aria-live="polite"
              className="min-h-[430px] space-y-3"
            >
              {steps.length === 0 && (
                <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
                  <Terminal
                    size={42}
                    className="mb-4 text-slate-700"
                  />

                  <div className="font-medium text-slate-400">
                    Chưa có transaction
                  </div>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
                    Bấm Execute Contract để quan
                    sát quá trình ABI encoding,
                    validation, EVM execution và
                    state update.
                  </p>
                </div>
              )}

              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`rounded-2xl border p-4 ${
                    step.status ===
                    "error"
                      ? "border-rose-400/20 bg-rose-400/5"
                      : "border-white/5 bg-[#050816]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {step.status ===
                    "error" ? (
                      <XCircle
                        size={17}
                        className="mt-0.5 shrink-0 text-rose-400"
                      />
                    ) : (
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-emerald-400"
                      />
                    )}

                    <div>
                      <div
                        className={`text-sm font-medium ${
                          step.status ===
                          "error"
                            ? "text-rose-300"
                            : "text-white"
                        }`}
                      >
                        {step.label}
                      </div>

                      <div className="mt-1 text-xs leading-5 text-slate-500">
                        {step.detail}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* STATE INSPECTOR */}
        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-5 flex items-center gap-3">
            <Database
              size={19}
              className="text-purple-300"
            />

            <div>
              <h2 className="font-semibold text-white">
                Contract State Inspector
              </h2>

              <p className="text-xs text-slate-500">
                So sánh Wallet balance và số dư
                đang được lưu trong Contract
                Vault.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {accounts.map((account) => (
              <article
                key={account}
                className="rounded-2xl border border-white/5 bg-[#050816] p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet
                      size={17}
                      className="text-blue-300"
                    />

                    <span className="font-semibold text-white">
                      {account}
                    </span>
                  </div>

                  <span className="rounded-full bg-white/5 px-2 py-1 font-mono text-[10px] text-slate-500">
                    0x
                    {account
                      .charCodeAt(0)
                      .toString(16)}
                    ...{account.length}A
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <BalanceBox
                    label="Wallet"
                    value={
                      state.wallets[
                        account
                      ]
                    }
                  />

                  <BalanceBox
                    label="Vault"
                    value={
                      state.vault[account]
                    }
                  />
                </div>
              </article>
            ))}
          </div>

          {lastDiff.length > 0 && (
            <div className="mt-5 rounded-2xl border border-purple-400/10 bg-purple-400/[0.03] p-5">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-purple-200">
                <ArrowRightLeft
                  size={15}
                />
                State Diff
              </div>

              <div className="space-y-2">
                {lastDiff.map(
                  (change) => (
                    <div
                      key={
                        change.account
                      }
                      className="grid gap-2 rounded-xl border border-white/5 bg-[#050816] p-3 text-xs md:grid-cols-3"
                    >
                      <span className="font-semibold text-white">
                        {
                          change.account
                        }
                      </span>

                      <span className="text-slate-400">
                        Wallet:{" "}
                        {
                          change.walletBefore
                        }{" "}
                        →{" "}
                        <strong className="text-white">
                          {
                            change.walletAfter
                          }
                        </strong>
                      </span>

                      <span className="text-slate-400">
                        Vault:{" "}
                        {
                          change.vaultBefore
                        }{" "}
                        →{" "}
                        <strong className="text-white">
                          {
                            change.vaultAfter
                          }
                        </strong>
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
        </section>

        {/* RECEIPT + CODE */}
        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          {/* RECEIPT */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-5 flex items-center gap-3">
              <FileText
                size={18}
                className="text-emerald-300"
              />

              <h2 className="font-semibold text-white">
                Transaction Receipt
              </h2>
            </div>

            {!lastReceipt ? (
              <div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center">
                <FileText
                  size={34}
                  className="mx-auto mb-3 text-slate-700"
                />

                <p className="text-sm text-slate-500">
                  Receipt sẽ xuất hiện sau khi
                  transaction được thực thi.
                </p>
              </div>
            ) : (
              <div className="space-y-3 text-sm">
                <ReceiptRow
                  label="Status"
                  value={
                    lastReceipt.status ===
                    "success"
                      ? "SUCCESS"
                      : "REVERTED"
                  }
                  success={
                    lastReceipt.status ===
                    "success"
                  }
                />

                <ReceiptRow
                  label="Transaction Hash"
                  value={shortHash(
                    lastReceipt.hash,
                  )}
                />

                <ReceiptRow
                  label="Block"
                  value={`#${lastReceipt.blockNumber}`}
                />

                <ReceiptRow
                  label="Gas Used"
                  value={lastReceipt.gasUsed.toLocaleString()}
                />

                <ReceiptRow
                  label="Gas Price"
                  value={`${lastReceipt.gasPriceGwei} Gwei`}
                />

                <ReceiptRow
                  label="Fee"
                  value={`${lastReceipt.feeEth.toFixed(
                    6,
                  )} ETH`}
                />

                {lastReceipt.event && (
                  <ReceiptRow
                    label="Event"
                    value={
                      lastReceipt.event
                    }
                  />
                )}
              </div>
            )}
          </section>

          {/* SOURCE CODE */}
          <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <div className="flex items-center gap-2">
                <Code2
                  size={17}
                  className="text-blue-300"
                />

                <h2 className="font-semibold text-white">
                  MiniVault.sol
                </h2>
              </div>

              <span className="text-xs text-slate-600">
                Solidity-like example
              </span>
            </div>

            <pre className="max-h-[410px] overflow-auto p-6 text-xs leading-6 text-slate-400">
              <code>
                {contractSource}
              </code>
            </pre>
          </section>
        </div>

        {/* TRANSACTION HISTORY */}
        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-5 flex items-center gap-3">
            <Activity
              size={18}
              className="text-blue-300"
            />

            <div>
              <h2 className="font-semibold text-white">
                Transaction History
              </h2>

              <p className="text-xs text-slate-500">
                Lịch sử transaction trong phiên
                mô phỏng hiện tại.
              </p>
            </div>
          </div>

          {history.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center text-sm text-slate-600">
              Chưa có transaction nào.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead className="text-xs text-slate-500">
                  <tr>
                    <th className="px-3 py-3">
                      Tx Hash
                    </th>

                    <th className="px-3 py-3">
                      Function
                    </th>

                    <th className="px-3 py-3">
                      From
                    </th>

                    <th className="px-3 py-3">
                      Amount
                    </th>

                    <th className="px-3 py-3">
                      Gas
                    </th>

                    <th className="px-3 py-3">
                      Block
                    </th>

                    <th className="px-3 py-3">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {history.map(
                    (transaction) => (
                      <tr
                        key={
                          transaction.hash
                        }
                        className="border-t border-white/5"
                      >
                        <td className="px-3 py-3 font-mono text-xs text-blue-300">
                          {shortHash(
                            transaction.hash,
                          )}
                        </td>

                        <td className="px-3 py-3 text-white">
                          {
                            transaction.func
                          }
                          ()
                        </td>

                        <td className="px-3 py-3 text-slate-400">
                          {
                            transaction.from
                          }
                        </td>

                        <td className="px-3 py-3 text-slate-400">
                          {
                            transaction.amount
                          }
                        </td>

                        <td className="px-3 py-3 text-slate-400">
                          {transaction.gasUsed.toLocaleString()}
                        </td>

                        <td className="px-3 py-3 text-slate-400">
                          #
                          {
                            transaction.blockNumber
                          }
                        </td>

                        <td className="px-3 py-3">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                              transaction.status ===
                              "success"
                                ? "bg-emerald-400/10 text-emerald-300"
                                : "bg-rose-400/10 text-rose-300"
                            }`}
                          >
                            {transaction.status ===
                            "success"
                              ? "Success"
                              : "Reverted"}
                          </span>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
   ========================================================= */

function TheoryStage({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#050816] p-5">
      <div className="absolute right-4 top-2 font-mono text-5xl font-black text-white/[0.025]">
        {number}
      </div>

      <div className="mb-3 font-mono text-xs font-semibold text-blue-300">
        STEP {number}
      </div>

      <h3 className="mb-2 font-semibold text-white">
        {title}
      </h3>

      <p className="text-sm leading-6 text-slate-400">
        {description}
      </p>
    </article>
  );
}

function FunctionTheoryCard({
  name,
  color,
  description,
  example,
  result,
}: {
  name: string;
  color: "emerald" | "blue" | "purple";
  description: string;
  example: string;
  result: string;
}) {
  const colorClasses = {
    emerald:
      "border-emerald-400/10 text-emerald-300",
    blue:
      "border-blue-400/10 text-blue-300",
    purple:
      "border-purple-400/10 text-purple-300",
  };

  return (
    <article className="rounded-2xl border border-white/5 bg-[#050816] p-5">
      <div
        className={`mb-3 inline-flex rounded-lg border bg-white/[0.02] px-3 py-1.5 font-mono text-xs ${colorClasses[color]}`}
      >
        {name}
      </div>

      <p className="mb-4 text-sm leading-6 text-slate-400">
        {description}
      </p>

      <div className="rounded-xl border border-white/5 bg-white/[0.025] p-3">
        <div className="text-[11px] uppercase tracking-wider text-slate-600">
          Ví dụ
        </div>

        <div className="mt-1 font-mono text-xs text-white">
          {example}
        </div>

        <div className="mt-2 text-xs text-slate-500">
          {result}
        </div>
      </div>
    </article>
  );
}

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center gap-2 text-slate-500">
        {icon}

        <span className="text-xs">
          {label}
        </span>
      </div>

      <div className="truncate font-semibold text-white">
        {value}
      </div>
    </div>
  );
}

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-[#050816] p-3">
      <div className="text-[11px] text-slate-500">
        {label}
      </div>

      <div className="mt-1 font-mono text-sm text-white">
        {value}
      </div>
    </div>
  );
}

function BalanceBox({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.025] p-3 text-center">
      <div className="text-[11px] text-slate-500">
        {label}
      </div>

      <div className="mt-1 font-mono text-xl font-semibold text-white">
        {value}
      </div>
    </div>
  );
}

function ReceiptRow({
  label,
  value,
  success,
}: {
  label: string;
  value: string;
  success?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/5 bg-[#050816] px-4 py-3">
      <span className="text-slate-500">
        {label}
      </span>

      <span
        className={`break-all text-right font-mono text-xs ${
          success === true
            ? "text-emerald-300"
            : success === false
              ? "text-rose-300"
              : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}