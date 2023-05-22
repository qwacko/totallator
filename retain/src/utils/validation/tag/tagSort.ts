import { z } from "zod";

export const tagSort = z
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

export type TagSortValidation = z.infer<typeof tagSort>;
