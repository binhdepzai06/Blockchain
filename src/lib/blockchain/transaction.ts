import type { Transaction } from "../../types/transaction";

export function createTransaction(
  from: string,
  to: string,
  amount: number
): Transaction {
  return {
    id: crypto.randomUUID(),
    from,
    to,
    amount,
    timestamp: Date.now(),
  };
}

export class TransactionPool {
  private pending: Transaction[] = [];

  add(transaction: Transaction) {
    this.pending.push(transaction);
  }

  getPending(): Transaction[] {
    return [...this.pending];
  }

  clear() {
    this.pending = [];
  }
}

export const transactionPool = new TransactionPool();