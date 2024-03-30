import { z, defineCollection } from 'astro:content';

const restaurantCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = {
  restaurants: restaurantCollection,
};
