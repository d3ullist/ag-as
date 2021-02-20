import 'reflect-metadata'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class Bet {
  @Field((type) => ID)
  id: number

  @Field((type) => ID)
  userId: number

  @Field((type) => Number, { nullable: true })
  betAmount?: Number | null

  @Field((type) => Number, { nullable: true })
  chance?: Number | null

  @Field((type) => Number, { nullable: true })
  payout?: Number | null

  @Field((type) => Boolean, { nullable: true })
  win?: boolean | null
}
