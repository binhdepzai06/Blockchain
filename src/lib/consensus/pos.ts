export interface Validator {
  name: string;
  stake: number;
}

export function selectValidator(validators: Validator[]): Validator {
  const totalStake = validators.reduce((sum, v) => sum + v.stake, 0);
  let random = Math.random() * totalStake;

  for (const validator of validators) {
    if (random < validator.stake) {
      return validator;
    }
    random -= validator.stake;
  }

  return validators[validators.length - 1];
}

export function getSelectionChance(
  validator: Validator,
  validators: Validator[]
): number {
  const totalStake = validators.reduce((sum, v) => sum + v.stake, 0);
  return (validator.stake / totalStake) * 100;
}