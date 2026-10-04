import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Play,
  RotateCcw,
  ShieldAlert,
  Users,
  XCircle,
} from "lucide-react";
import "./AttackSimulator.css";

type AttackId = "51" | "double" | "sybil" | "eclipse";

interface AttackStep {
  title: string;
  description: string;
}

interface AttackInfo {
  id: AttackId;
  title: string;
  shortTitle: string;
  description: string;
  steps: AttackStep[];
}

const attacks: AttackInfo[] = [
  {
    id: "51",
    title: "51% Attack",
    shortTitle: "51%",
    description:
      "Attacker kiểm soát phần lớn sức mạnh đào và cố tạo ra một blockchain riêng.",
    steps: [
      {
        title: "Blockchain đang hoạt động bình thường",
        description:
          "Các miner trung thực cùng tạo block và duy trì blockchain.",
      },
      {
        title: "Attacker kiểm soát 60% hash power",
        description:
          "Attacker có lợi thế lớn trong việc tạo block mới.",
      },
      {
        title: "Attacker đào một chain riêng",
        description:
          "Attacker bí mật tạo các block mới mà mạng chính chưa nhìn thấy.",
      },
      {
        title: "Chain của attacker dài hơn",
        description:
          "Private chain phát triển nhanh hơn chain của mạng trung thực.",
      },
      {
        title: "Attacker công bố chain",
        description:
          "Mạng có thể phải xem xét lại chain và xảy ra blockchain reorganization.",
      },
    ],
  },
  {
    id: "double",
    title: "Double Spending",
    shortTitle: "Double Spend",
    description:
      "Attacker cố sử dụng cùng một số coin cho hai giao dịch khác nhau.",
    steps: [
      {
        title: "Alice có 10 COIN",
        description:
          "Alice chỉ có một khoản tiền trị giá 10 COIN.",
      },
      {
        title: "Alice gửi 10 COIN cho Bob",
        description:
          "Giao dịch đầu tiên được tạo: Alice → Bob.",
      },
      {
        title: "Alice tạo giao dịch thứ hai",
        description:
          "Alice cố dùng chính 10 COIN đó để gửi cho Charlie.",
      },
      {
        title: "Hai giao dịch xung đột",
        description:
          "Blockchain phải xác định giao dịch nào hợp lệ.",
      },
      {
        title: "Một giao dịch bị từ chối",
        description:
          "Cùng một coin không thể được chi tiêu hợp lệ hai lần.",
      },
    ],
  },
  {
    id: "sybil",
    title: "Sybil Attack",
    shortTitle: "Sybil",
    description:
      "Attacker tạo nhiều identity hoặc node giả để gây ảnh hưởng đến mạng.",
    steps: [
      {
        title: "Mạng có các node bình thường",
        description:
          "Các node kết nối và trao đổi thông tin với nhau.",
      },
      {
        title: "Attacker tạo node giả",
        description:
          "Attacker bắt đầu tạo thêm nhiều identity.",
      },
      {
        title: "Số node giả tăng lên",
        description:
          "Mạng nhìn thấy rất nhiều node nhưng chúng đều thuộc attacker.",
      },
      {
        title: "Attacker có nhiều kết nối",
        description:
          "Các node giả có thể được sử dụng để gây ảnh hưởng đến mạng.",
      },
      {
        title: "Sybil Attack",
        description:
          "Vấn đề chính là một thực thể có thể tạo ra rất nhiều identity giả.",
      },
    ],
  },
  {
    id: "eclipse",
    title: "Eclipse Attack",
    shortTitle: "Eclipse",
    description:
      "Attacker kiểm soát các kết nối của một node để cô lập node đó khỏi mạng thật.",
    steps: [
      {
        title: "Target kết nối với mạng",
        description:
          "Node mục tiêu đang nhận thông tin từ các peer bình thường.",
      },
      {
        title: "Attacker tiếp cận Target",
        description:
          "Attacker bắt đầu tạo các kết nối đến node mục tiêu.",
      },
      {
        title: "Kết nối thật bị thay thế",
        description:
          "Target dần phụ thuộc vào các peer do attacker kiểm soát.",
      },
      {
        title: "Target bị cô lập",
        description:
          "Target không còn nhìn thấy đầy đủ mạng blockchain thật.",
      },
      {
        title: "Eclipse Attack",
        description:
          "Attacker kiểm soát góc nhìn của Target đối với mạng.",
      },
    ],
  },
];

function getAttack(id: AttackId) {
  return attacks.find((attack) => attack.id === id) ?? attacks[0];
}

function AttackScene({
  attackId,
  step,
}: {
  attackId: AttackId;
  step: number;
}) {
  if (attackId === "51") {
    return (
      <div className="attack-scene">
        <div className="scene-label">BLOCKCHAIN NETWORK</div>

        <div className="network-row">
          <div className="node-group">
            <div className="node node-green">A</div>
            <div className="node node-green">B</div>
            <div className="node node-green">C</div>
          </div>

          <div className="network-arrow">→</div>

          <div
            className={`node attacker-node ${
              step >= 1 ? "node-active" : ""
            }`}
          >
            <ShieldAlert size={20} />
          </div>
        </div>

        <div className="chain-area">
          <div className="chain-card honest-chain">
            <div className="chain-title">Honest Chain</div>
            <div className="blocks">
              <span>1</span>
              <ArrowRight />
              <span>2</span>
              <ArrowRight />
              <span>3</span>
            </div>
          </div>

          <div className="chain-card attacker-chain">
            <div className="chain-title">Attacker Chain</div>

            <div className="blocks">
              <span>1</span>

              {step >= 2 && (
                <>
                  <ArrowRight />
                  <span>2</span>
                </>
              )}

              {step >= 3 && (
                <>
                  <ArrowRight />
                  <span>3</span>
                  <ArrowRight />
                  <span>4</span>
                </>
              )}

              {step >= 4 && (
                <>
                  <ArrowRight />
                  <span>5</span>
                </>
              )}
            </div>
          </div>
        </div>

        {step >= 4 && (
          <div className="scene-warning">
            <AlertTriangle size={18} />
            <span>Chain của attacker đã dài hơn.</span>
          </div>
        )}
      </div>
    );
  }

  if (attackId === "double") {
    return (
      <div className="attack-scene">
        <div className="scene-label">TRANSACTION FLOW</div>

        <div className="coin-owner">
          <div className="person-icon">A</div>
          <div>
            <strong>Alice</strong>
            <span>10 COIN</span>
          </div>
        </div>

        <div className="transaction-list">
          <div className="transaction-card valid">
            <div className="transaction-icon">
              <CheckCircle2 />
            </div>

            <div className="transaction-content">
              <strong>Alice → Bob</strong>
              <span>10 COIN</span>
            </div>

            {step >= 1 && (
              <span className="transaction-status">Transaction A</span>
            )}
          </div>

          <div className="transaction-card invalid">
            <div className="transaction-icon">
              <XCircle />
            </div>

            <div className="transaction-content">
              <strong>Alice → Charlie</strong>
              <span>10 COIN</span>
            </div>

            {step >= 2 && (
              <span className="transaction-status">Transaction B</span>
            )}
          </div>
        </div>

        {step >= 3 && (
          <div className="conflict-box">
            <CircleAlert size={18} />
            <div>
              <strong>Hai giao dịch xung đột</strong>
              <span>Cùng sử dụng 10 COIN của Alice.</span>
            </div>
          </div>
        )}

        {step >= 4 && (
          <div className="result-small">
            <XCircle size={18} />
            Transaction B bị từ chối.
          </div>
        )}
      </div>
    );
  }

  if (attackId === "sybil") {
    const fakeNodes = Math.min(6, Math.max(0, step * 2));

    return (
      <div className="attack-scene">
        <div className="scene-label">NETWORK IDENTITIES</div>

        <div className="sybil-network">
          <div className="honest-nodes">
            <div className="node node-green">A</div>
            <div className="node node-green">B</div>
            <div className="node node-green">C</div>
          </div>

          <div className="sybil-center">
            <Users size={24} />
          </div>

          <div className="fake-nodes">
            {Array.from({ length: fakeNodes }).map((_, index) => (
              <div className="node node-red" key={index}>
                S{index + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="sybil-count">
          <strong>{fakeNodes}</strong>
          <span>attacker identities</span>
        </div>

        {step >= 4 && (
          <div className="scene-warning">
            <AlertTriangle size={18} />
            <span>Nhiều identity nhưng cùng thuộc một attacker.</span>
          </div>
        )}
      </div>
    );
  }

  const attackerNodes = step >= 3 ? 4 : step >= 2 ? 2 : 0;

  return (
    <div className="attack-scene">
      <div className="scene-label">TARGET CONNECTIONS</div>

      <div className="eclipse-network">
        <div className="peer-column">
          <div className="node node-green">A</div>
          <div className="node node-green">B</div>
        </div>

        <div className="target-node">
          <div className="target-circle">T</div>
          <span>Target</span>
        </div>

        <div className="peer-column">
          <div className="node node-green">C</div>
          <div className="node node-green">D</div>
        </div>
      </div>

      {attackerNodes > 0 && (
        <div className="eclipse-attackers">
          {Array.from({ length: attackerNodes }).map((_, index) => (
            <div className="node node-red" key={index}>
              X{index + 1}
            </div>
          ))}
        </div>
      )}

      {step >= 4 && (
        <div className="scene-warning">
          <AlertTriangle size={18} />
          <span>Target đang bị cô lập khỏi mạng thật.</span>
        </div>
      )}
    </div>
  );
}

export default function AttackSimulator() {
  const [selectedAttack, setSelectedAttack] =
    useState<AttackId>("51");

  const [step, setStep] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const attack = useMemo(
    () => getAttack(selectedAttack),
    [selectedAttack],
  );

  const totalSteps = attack.steps.length;
  const isFinished = step === totalSteps - 1;

  useEffect(() => {
    setStep(0);
    setIsPlaying(false);
  }, [selectedAttack]);

  useEffect(() => {
    if (!isPlaying) return;

    if (step >= totalSteps - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setStep((current) => current + 1);
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [isPlaying, step, totalSteps]);

  const startSimulation = () => {
    if (isFinished) {
      setStep(0);
    }

    setIsPlaying(true);
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setStep(0);
  };

  const previousStep = () => {
    setIsPlaying(false);
    setStep((current) => Math.max(0, current - 1));
  };

  const nextStep = () => {
    setIsPlaying(false);
    setStep((current) =>
      Math.min(totalSteps - 1, current + 1),
    );
  };

  return (
    <div className="attack-page">
      <div className="attack-header">
        <div>
          <div className="attack-eyebrow">
            <ShieldAlert size={16} />
            CRYPTOLAB · SECURITY LAB
          </div>

          <h1>Attack Simulator</h1>

          <p>
            Khám phá cách các cuộc tấn công có thể ảnh hưởng đến
            blockchain.
          </p>
        </div>
      </div>

      <div className="attack-tabs">
        {attacks.map((item) => (
          <button
            key={item.id}
            className={
              selectedAttack === item.id
                ? "attack-tab active"
                : "attack-tab"
            }
            onClick={() => setSelectedAttack(item.id)}
          >
            <span>{item.shortTitle}</span>
            <small>{item.title}</small>
          </button>
        ))}
      </div>

      <main className="attack-main">
        <section className="attack-card">
          <div className="attack-card-header">
            <div>
              <span className="step-label">
                STEP {step + 1} / {totalSteps}
              </span>

              <h2>{attack.steps[step].title}</h2>

              <p>{attack.steps[step].description}</p>
            </div>

            <button
              className="reset-button"
              onClick={resetSimulation}
              title="Reset"
            >
              <RotateCcw size={17} />
            </button>
          </div>

          <AttackScene
            attackId={selectedAttack}
            step={step}
          />

          <div className="step-progress">
            {attack.steps.map((_, index) => (
              <span
                key={index}
                className={
                  index <= step
                    ? "progress-dot active"
                    : "progress-dot"
                }
              />
            ))}
          </div>

          <div className="attack-controls">
            <button
              className="secondary-button"
              onClick={previousStep}
              disabled={step === 0}
            >
              <ChevronLeft size={18} />
              Quay lại
            </button>

            {!isFinished ? (
              <button
                className="primary-button"
                onClick={
                  step === 0 && !isPlaying
                    ? startSimulation
                    : nextStep
                }
              >
                {isPlaying ? (
                  "Đang mô phỏng..."
                ) : (
                  <>
                    {step === 0 ? (
                      <Play size={17} />
                    ) : (
                      <ChevronRight size={17} />
                    )}
                    {step === 0
                      ? "Bắt đầu"
                      : "Tiếp tục"}
                  </>
                )}
              </button>
            ) : (
              <button
                className="primary-button"
                onClick={resetSimulation}
              >
                <RotateCcw size={17} />
                Xem lại
              </button>
            )}

            <button
              className="secondary-button"
              onClick={nextStep}
              disabled={isFinished}
            >
              Tiếp theo
              <ChevronRight size={18} />
            </button>
          </div>
        </section>

        <aside className="attack-info">
          <div className="info-card">
            <span className="info-label">WHAT IS IT?</span>

            <h3>{attack.title}</h3>

            <p>{attack.description}</p>
          </div>

          <div className="info-card happening-card">
            <span className="info-label">WHAT IS HAPPENING?</span>

            <div className="happening-icon">
              {isFinished ? (
                <AlertTriangle size={20} />
              ) : (
                <ArrowDown size={20} />
              )}
            </div>

            <p>{attack.steps[step].description}</p>
          </div>

          <div className="info-card key-card">
            <span className="info-label">KEY IDEA</span>

            {selectedAttack === "51" && (
              <p>
                Attacker có lợi thế lớn trong việc tạo
                block mới.
              </p>
            )}

            {selectedAttack === "double" && (
              <p>
                Một số coin không thể được sử dụng hợp
                lệ cho hai giao dịch cùng lúc.
              </p>
            )}

            {selectedAttack === "sybil" && (
              <p>
                Một attacker có thể tạo nhiều identity
                giả để gây ảnh hưởng đến mạng.
              </p>
            )}

            {selectedAttack === "eclipse" && (
              <p>
                Target có thể bị cô lập nếu attacker
                kiểm soát các peer mà nó kết nối tới.
              </p>
            )}
          </div>

          {isFinished && (
            <div className="result-card">
              <div className="result-icon">
                <AlertTriangle size={21} />
              </div>

              <div>
                <strong>Simulation complete</strong>
                <p>
                  Bạn đã xem toàn bộ quá trình của{" "}
                  {attack.title}.
                </p>
              </div>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}