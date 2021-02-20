import 'reflect-metadata'
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  FieldResolver,
  Root,
  Int,
  InputType,
  Field,
} from 'type-graphql'
import { Context } from './context'
import { Bet } from './Bet'
import { addCatchUndefinedToSchema } from 'graphql-tools'

@InputType()
class CreateBetInput {
  @Field()
  userId: number

  @Field()
  betAmount: number

  @Field()
  chance: number
}


@Resolver(Bet)
export class BetResolver {
  @Mutation((returns) => Bet)
  async createBet(
    @Arg('data') data: CreateBetInput,
    @Ctx() ctx: Context,
  ): Promise<Bet> {
    // TODO: validate user balance prior to executing the bet


    // Going by the assumption win chance is a percentage between 0-100
    // Created a ad-hoc way to convert the chance into a hasWon boolean state
    const hasWon = Math.floor(Math.random() * Math.floor(100)) >= data.chance - 100;
    // TODO: decrease user balance

    return ctx.prisma.bet.create({
      data: {
        userId: data.userId,
        betAmount: data.betAmount,
        chance: data.chance,
        payout: hasWon ? data.betAmount : 0,
        win: hasWon
      },
    })

      // TODO: add to user balance if won
  }

  
}
