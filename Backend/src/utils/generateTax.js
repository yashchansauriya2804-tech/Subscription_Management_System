export function calculateTax(amount, rate = 0) {
  if (!Number.isFinite(amount) || amount < 0 || !Number.isFinite(rate) || rate < 0 || rate > 1) {
    throw new RangeError('Amount must be non-negative and tax rate must be between 0 and 1.')
  }

  const tax = Math.round(amount * rate * 100) / 100
  return { subtotal: amount, tax, total: Math.round((amount + tax) * 100) / 100 }
}