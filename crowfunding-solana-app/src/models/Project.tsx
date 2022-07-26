interface ProjectMin {
  category?: string,
  name: string,
  description: string,
  imgUrl?: string,
  imgAlt?: string,
  solRaised: number,
  solGoal: number,
  dateLimit: Date,
  qPatrons: number,
  rewards?: {name:string, complete:boolean}[]
}

export type { ProjectMin };