export type DepositPolicy = {
  enabledGlobal: boolean;
  requiredDays: string[];
  requiredEvents: string[];
  minPartySizeForMandatoryDeposit: number;
  defaultDepositPerPerson: number;
  dayDepositAmounts: Record<string, number>;
};

export const defaultDepositPolicy: DepositPolicy = {
  enabledGlobal: true,
  requiredDays: ['Friday', 'Saturday'],
  requiredEvents: ['midnight-garden', 'vip-saturday-night', 'afro-house-night'],
  minPartySizeForMandatoryDeposit: 6,
  defaultDepositPerPerson: 25,
  dayDepositAmounts: {
    Friday: 50,
    Saturday: 50,
    Sunday: 25,
    Thursday: 25,
  },
};

export type DepositRequirementResult = {
  isRequired: boolean;
  amount: number;
  reason: string;
};

export function checkDepositRequirement(
  dateStr: string,
  guestCount: number = 2,
  eventId?: string,
  policy: DepositPolicy = defaultDepositPolicy
): DepositRequirementResult {
  if (!policy.enabledGlobal) {
    return {
      isRequired: false,
      amount: 0,
      reason: 'Deposits disabled globally.',
    };
  }

  // Check if an explicit event requires a deposit
  if (eventId && policy.requiredEvents.includes(eventId)) {
    return {
      isRequired: true,
      amount: 50,
      reason: 'Deposit required for special event booking.',
    };
  }

  // Check party size requirement
  if (guestCount >= policy.minPartySizeForMandatoryDeposit) {
    const amount = Math.min(guestCount * policy.defaultDepositPerPerson, 150);
    return {
      isRequired: true,
      amount,
      reason: `Deposit required for large party (${guestCount}+ guests).`,
    };
  }

  // Check day of the week
  if (dateStr) {
    const dateObj = new Date(dateStr + 'T00:00:00');
    if (!isNaN(dateObj.getTime())) {
      const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });

      if (policy.requiredDays.includes(dayName)) {
        const perPerson = policy.dayDepositAmounts[dayName] || policy.defaultDepositPerPerson;
        const amount = Math.min(perPerson * Math.max(1, Math.min(guestCount, 2)), 100);
        return {
          isRequired: true,
          amount,
          reason: `Deposit required for ${dayName} peak reservations.`,
        };
      } else {
        return {
          isRequired: false,
          amount: 0,
          reason: `No deposit required for ${dayName} reservations.`,
        };
      }
    }
  }

  return {
    isRequired: false,
    amount: 0,
    reason: 'Standard reservation — No deposit required.',
  };
}
