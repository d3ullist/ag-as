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
import { User } from './User'
import { Context } from './context'

@InputType()
class SignupUserInput {
  @Field()
  name: string

  @Field()
  email: string
}

@Resolver(User)
export class UserResolver {
  
  @Mutation((returns) => User)
  async signupUser(
    @Arg('data') data: SignupUserInput,
    @Ctx() ctx: Context,
  ): Promise<User> {
    return ctx.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
      },
    })
  }

  @Query((returns) => User, { nullable: true })
  async getUser(@Arg('id', (type) => Int) id: number, @Ctx() ctx: Context) {
    return ctx.prisma.user.findUnique({
      where: { id: id },
    })
  }

  @Query((returns) => [User], { nullable: true })
  async getUserList(@Ctx() ctx: Context) : Promise<User[]>{
    return ctx.prisma.user.findMany({
      where:{}
    });
  }
}
