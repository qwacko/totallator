import { z } from "zod";

import {
  createdUpdatedValidation,
  statusReturnValidation,
  userIsAdminValidation
} from "../returnValidationHelpers";

export const accountGroupingSingleValidation = z
  .object({
    id: z.string().cuid(),
    title: z.string()
  })
  .merge(statusReturnValidation)
  .merge(createdUpdatedValidation);

export type accountGroupingSingleValidationType = z.infer<
  typeof accountGroupingSingleValidation
>;

export const accountGroupingGetValidation = z.array(
  accountGroupingSingleValidation
    .merge(userIsAdminValidation)
    .merge(
      z.object({
        users: z.array(
          z.object({
            id: z.string().cuid(),
            name: z.string().nullable(),
            username: z.string(),
            isUser: z.boolean(),
            admin: z.boolean()
          })
        )
      })
    )
    .strict()
);

export type AccountGroupingGetValidationType = z.infer<
  typeof accountGroupingGetValidation
>;
