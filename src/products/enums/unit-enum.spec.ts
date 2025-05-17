import { parseStringToUnitEnum, Unit } from './unit-enum';

describe('Unit Enum Parser', () => {
  it.each(['Kg', 'KG', 'kG'])('should parse string to Enum', (unit: string) => {
    // Actions
    const actual = parseStringToUnitEnum(unit);

    // Assertions
    expect(actual).toEqual(Unit.KG);
  });

  it('should not parse string to Enum', () => {
    // Actions
    const actual = parseStringToUnitEnum('something');

    // Assertions
    expect(actual).toBeUndefined();
  });
});
