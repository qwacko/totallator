---
sidebar_position: 2
---

# Account Grouping

## Overview

An account grouping is a grouping of accounts together with the same permissions and other properties. Multiple account groupings can be included in a single installation and each account grouping can be thought of as a standlone set of accounts. Each journal entry must be restricted to an account / tag / category / bill / budget from the same account grouping. Each account grouping can have multiple of the following.

- Account
- Tag
- Bill
- Budget
- Category
- Journal Entries

The number of account groupings should be chosen to be the minimum number to achieve the desired information access requirements (due to limitations listed below).

## Use Case

Although in many cases all the data for a single person can be located in a single account groupingc, there following use cases may make the use of multiple account groupings valuable.

- Restrict edit access to a subset of accounts / information, but still share read / reporting access).
- Allow multiple users to access a set of accounts.
- Have a set of journal entries that is "Closed" while still being able to edit others.
- Multi-tenancy installation (single installation supporting multiple independent sets of accounts).

## Limitations

The key limitations of using account groupings are as follows:

- There isn't the ability to have a single journal entry that includes both account groupings (i.e. a transfer between accounts in different account groupings)
- If you wanted the same other property (i.e. Tag) across multiple account groupings, then it would need to be created in both account groupings, and any reports / filters would need to ensure they incorporate each instance of the same.

## Status

Each account grouping can have a status assigned to it. These states can be changed between by an account grouping administrator whenever desired. The change does not deleted or modify any of the data stored in the account grouping (i.e. it doesn't update or delete any journal entries).

### Active

This is the 'normal' state of an account grouping, this can be actively updated / edited.

### Disabled

When an account grouping is 'disabled' new information (i.e. accounts, tags, journal entries etc...) cannot be added to the account grouping, and any items in the disabled account grouping cannot be updated (i.e. change journal entry description).
A disabled account grouping can be considered as a frozen set of accounts.

### Deleted

A deleted account grouping is the same as a 'disabled' account grouping, however it also cannot be viewed in any report / list / etc.... A deleted account grouping will only appear in the account grouping list.

:::info

Deleting an account grouping will not delete any journal entries etc...

:::
