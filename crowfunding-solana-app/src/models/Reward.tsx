interface Reward {
  id: number,
  minPrice: number,
  description: string,
  perksIncluded?: string[],
  estimatedDeliverDate: Date,
  patronsQuantity: number,
}

export type { Reward };