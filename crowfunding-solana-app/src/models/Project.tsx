import { Reward } from "./Reward";

interface ProjectMin {
  category?: string,
  id: number,
  name: string,
  description: string,
  images?: {url:string, alt:string}[],
  solRaised: number,
  solGoal: number,
  dateLimit: Date,
  qPatrons: number,
  userRewards?: {name:string, complete:boolean}[]
}

interface ProjectFull extends ProjectMin {
  socialMedia?: {
    media: 'TWITTER'|'DISCORD'|'FACEBOOK'|'MEDIUM',
    url: string
  }[],
  reasonsToInvest: string[],
  descriptionFull: string,
  team: {name:string, imgUrl?:string, description: string},
  risks?: string,
  termsAndConditions: string,
  rewards?: Reward[]
}

export type { ProjectMin, ProjectFull };