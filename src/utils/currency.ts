export function parseRupees(value: string): number {
  const numericValue = value.replace(/[^\d]/g, '');

  if (!numericValue) {
    throw new Error(`Não foi possível converter o valor: "${value}"`);
  }

  return Number(numericValue);
}

export function formatRupees(value: number): string {
  return `Rs. ${value}`;
}
