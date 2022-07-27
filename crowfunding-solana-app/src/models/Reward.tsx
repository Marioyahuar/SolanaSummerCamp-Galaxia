interface Reward {
  id: number,
  name: string,
  minPrice: number,
  description: string,
  perksIncluded: string[],
  estimatedDeliverDate: Date,
  patronsQuantity: number,
}

export type { Reward };