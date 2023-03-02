const ROUNDING_FACTOR = 1000000000000000;

/**
 * Basically ignores every amount not in the cent
 * @param value amount of money to be rounded off
 * @param cent x in 1/10^x of a currency.
 */
export function roundCurrency(value: number, cent = 2) {
  const precision = Math.pow(10, cent);
  const safeFloor = (precision * Math.round(value * ROUNDING_FACTOR)) / ROUNDING_FACTOR;
  return Math.floor(safeFloor) / precision;
}
