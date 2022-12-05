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
    accountGroupCombined: [accountGroup, accountGroup2, accountGroup3]
      .filter((item) => item)
      .join("/"),
    accountTitleCombined: [accountGroup, accountGroup2, accountGroup3, title]
      .filter((item) => item)
      .join("/"),
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
  accountGroupCombined,
  title,
  existing,
}: {
  title: string | undefined;
  accountGroup: string | undefined | null;
  accountGroup2: string | undefined | null;
  accountGroup3: string | undefined | null;
  accountGroupCombined: string | undefined;
  existing: T;
}) => {
  let useGroup = existing.accountGroup;
  let useGroup2 = existing.accountGroup2;
  let useGroup3 = existing.accountGroup3;

  if (accountGroupCombined === null || accountGroupCombined === "") {
    useGroup = null;
    useGroup2 = null;
    useGroup3 = null;
  } else if (accountGroupCombined) {
    const [g1, g2, g3] = accountGroupCombined.split("/");

    useGroup = g1 ? g1 : null;
    useGroup2 = g2 ? g2 : null;
    useGroup3 = g3 ? g3 : null;
    console.log("g1", g1);
  } else {
    useGroup = accountGroup === null ? null : accountGroup || useGroup;
    useGroup2 = accountGroup2 === null ? null : accountGroup2 || useGroup2;
    useGroup3 = accountGroup3 === null ? null : accountGroup3 || useGroup3;
  }

  const useTitle = title || existing.title;

  const useAccountGroupCombined = [useGroup, useGroup2, useGroup3]
    .filter((item) => item)
    .join("/");
  const accountTitleCombined = [useGroup, useGroup2, useGroup3, useTitle]
    .filter((item) => item)
    .join("/");

  return {
    title: useTitle,
    accountGroup: useGroup,
    accountGroup2: useGroup2,
    accountGroup3: useGroup3,
    accountGroupCombined: useAccountGroupCombined,
    accountTitleCombined,
  };
};
