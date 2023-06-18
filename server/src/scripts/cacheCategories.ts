import memoryCache from "memory-cache";
import prisma from "../lib/prisma";

export const cacheCategories = async () => {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
  });

  memoryCache.put("categories", categories);
};
