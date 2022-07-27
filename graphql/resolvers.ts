// /graphql/resolvers.ts
export const resolvers = {
  Query: {
    meals: (_parent, _args, ctx) => {
      return ctx.prisma.meal.findMany()
    },
  },
}