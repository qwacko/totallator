export const createAccountGroupTitle = ({
  title,
  accountGroup,
  accountGroup2,
  accountGroup3,
}: {
  title: string;
  accountGroup: string | undefined;
  accountGroup2: string | undefined;
  accountGroup3: string | undefined;
}) => {
  return {
    title,
    accountGroup,
    accountGroup2,
    accountGroup3,
    accountGroupCombined: `${accountGroup}/${accountGroup2}/${accountGroup3}`,
    accountTitleCombined: `${accountGroup}/${accountGroup2}/${accountGroup3}/${title}`,
  };
};
export const updateAccountGroupTitle = <
  T extends {
    title: string;
    accountGroup: string | undefined | null;
    accountGroup2: string | undefined | null;
    accountGroup3: string | undefined | null;
  }
>({
  accountGroup,
  accountGroup2,
  accountGroup3,
  title,
  existing,
}: {
  title: string | undefined;
  accountGroup: string | undefined | null;
  accountGroup2: string | undefined | null;
  accountGroup3: string | undefined | null;
  existing: T;
}) => {
  const useGroup =
    accountGroup === null ? null : accountGroup || existing.accountGroup;
  const useGroup2 =
    accountGroup2 === null ? null : accountGroup2 || existing.accountGroup2;
  const useGroup3 =
    accountGroup3 === null ? null : accountGroup3 || existing.accountGroup3;
  const useTitle = title || existing.title;

  const accountGroupCombined = [useGroup, useGroup2, useGroup3, useTitle]
    .filter((item) => item)
    .join("/");
  const accountTitleCombined = [useGroup, useGroup2, useGroup3]
    .filter((item) => item)
    .join("/");

  return {
    title: useTitle,
    accountGroup: useGroup,
    accountGroup2: useGroup2,
    accountGroup3: useGroup3,
    accountGroupCombined,
    accountTitleCombined,
  };
};
