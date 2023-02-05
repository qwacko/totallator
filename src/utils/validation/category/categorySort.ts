import { z } from "zod";

export const categorySort = z
  .array(
    z.object({
      key: z.enum([
        "id",
        "title",
        "group",
        "single",
        "updatedAt",
        "createdAt",
        "status",
        "deleted",
        "allowUpdate",
        "active",
        "disabled"
      ]),
      direction: z.enum(["asc", "desc"])
    })
  )
  .optional();

export type CategorySortValidation = z.infer<typeof categorySort>;
