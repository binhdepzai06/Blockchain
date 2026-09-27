export interface SmartContractFunction {
  name: string;
  description: string;
  inputs: string[];
}

export interface SmartContract {
  id: string;
  name: string;
  address: string;
  functions: SmartContractFunction[];
  balance: number;
}

export interface ContractExecution {
  functionName: string;
  caller: string;
  inputs: Record<string, string | number>;
  gasUsed: number;
  success: boolean;
}