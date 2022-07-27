// /graphql/types/Link.ts
import { objectType, extendType } from 'nexus'
import { User } from './User'

export const Meal = objectType({
  name: 'Meal',
  definition(t) {
    t.string('id')
    t.string('title')
    t.string('description')
    t.string('recipeUrl')
    t.string('imageUrl')
    t.int('opRating')
    t.list.field('users', {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.meal
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .users()
      },
    })
  },
})



// graphql/types/Link.ts
// code above unchanged

export const LinksQuery = extendType({
    type: 'Query',
    definition(t) {
      t.nonNull.list.field('meals', {
        type: 'Meal',
        resolve(_parent, _args, ctx) {
          return ctx.prisma.meal.findMany()
        },
      })
    },
  })