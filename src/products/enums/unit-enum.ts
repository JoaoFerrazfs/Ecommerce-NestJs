export enum Unit {
  KG = 'kg',
  L = 'L',
  UN = 'un',
  M = 'm',
}

export function parseStringToUnitEnum(unit: string): Unit | undefined {
  return Unit[unit.toUpperCase() as keyof typeof Unit];
}
