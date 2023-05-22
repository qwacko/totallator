import type { PrismaStatusEnum } from "@prisma/client";

export const basicStatusToDBRequired = (status: PrismaStatusEnum) => {
  return {
    status,
    active: status === "Active",
    disabled: status === "Disabled",
    deleted: status === "Deleted",
    allowUpdate: status === "Active"
  };
};

export const basicStatusToDB = (
  status: PrismaStatusEnum | undefined | null
) => {
  if (!status) {
    return {};
  }
  return basicStatusToDBRequired(status);
};
