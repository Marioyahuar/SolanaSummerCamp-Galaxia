interface Reward {
  id: number,
  name: string,
  minPrice: number,
  description: string,
  perksIncluded: string[],
  estimatedDeliverDate: Date,
  stock?: number,
}

export type { Reward };