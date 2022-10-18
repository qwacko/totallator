import type { IntrospectionQuery } from 'graphql';
export default {
  "__schema": {
    "queryType": {
      "name": "Query"
    },
    "mutationType": {
      "name": "Mutation"
    },
    "subscriptionType": null,
    "types": [
      {
        "kind": "OBJECT",
        "name": "Account",
        "fields": [
          {
            "name": "accountGroup",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "accountGroup2",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "accountGroup3",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "accountGroupCombined",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "accountGrouping",
            "type": {
              "kind": "OBJECT",
              "name": "AccountGrouping",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "accountTitleCombined",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "active",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "allowUpdate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "deleted",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "disabled",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "endDate",
            "type": {
              "kind": "SCALAR",
              "name": "Date",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UUID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "isCash",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "isNetWorth",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "startDate",
            "type": {
              "kind": "SCALAR",
              "name": "Date",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "StatusEnum",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "AccountType",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "userIsAdmin",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountFilter",
        "inputFields": [
          {
            "name": "accountGroup",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "accountGroup2",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "accountGroup3",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "accountGrouping",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountGroupingFilter",
              "ofType": null
            }
          },
          {
            "name": "accountGroupingId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountGroupingIdFilter",
              "ofType": null
            }
          },
          {
            "name": "accountTitleCombined",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "active",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "allowUpdate",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "deleted",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "disabled",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "endDate",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateFilter",
              "ofType": null
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "isCash",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "isNetWorth",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "startDate",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateFilter",
              "ofType": null
            }
          },
          {
            "name": "status",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StatusFilter",
              "ofType": null
            }
          },
          {
            "name": "title",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "type",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountTypeFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "AccountGrouping",
        "fields": [
          {
            "name": "active",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "adminUsers",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserPublic",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "allUsers",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserPublic",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "allowUpdate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "deleted",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "disabled",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UUID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "StatusEnum",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "userIsAdmin",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "viewUsers",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "UserPublic",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountGroupingFilter",
        "inputFields": [
          {
            "name": "active",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "deleted",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "disabled",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "title",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountGroupingIdFilter",
        "inputFields": [
          {
            "name": "equals",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "UUID",
                "ofType": null
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          },
          {
            "name": "notIn",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "UUID",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountGroupingSort",
        "inputFields": [
          {
            "name": "active",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "deleted",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "disabled",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "status",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "title",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "AccountNumber"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountSort",
        "inputFields": [
          {
            "name": "accountGroup",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "accountGroup2",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "accountGroup3",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "accountGroupCombined",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "accountTitleCombined",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "active",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "allowUpdate",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "deleted",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "disabled",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "endDate",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "isCash",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "isNetWorth",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "startDate",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "status",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "title",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "AccountType",
        "enumValues": [
          {
            "name": "Asset"
          },
          {
            "name": "Expense"
          },
          {
            "name": "Income"
          },
          {
            "name": "Liability"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AccountTypeFilter",
        "inputFields": [
          {
            "name": "equals",
            "type": {
              "kind": "ENUM",
              "name": "AccountType",
              "ofType": null
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "ENUM",
                "name": "AccountType",
                "ofType": null
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "ENUM",
              "name": "AccountType",
              "ofType": null
            }
          },
          {
            "name": "notIn",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "ENUM",
                "name": "AccountType",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "AccountsReturn",
        "fields": [
          {
            "name": "accounts",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Account",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AddJournalInput",
        "inputFields": [
          {
            "name": "accountId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UUID",
                "ofType": null
              }
            }
          },
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            }
          },
          {
            "name": "billId",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          },
          {
            "name": "budgetId",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          },
          {
            "name": "categoryId",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          },
          {
            "name": "dataChecked",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "date",
            "type": {
              "kind": "SCALAR",
              "name": "Date",
              "ofType": null
            }
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "primaryJournalId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UUID",
                "ofType": null
              }
            }
          },
          {
            "name": "reconciled",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "tagId",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "BigInt"
      },
      {
        "kind": "OBJECT",
        "name": "Bill",
        "fields": [
          {
            "name": "accountGrouping",
            "type": {
              "kind": "OBJECT",
              "name": "AccountGrouping",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "active",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "allowUpdate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "deleted",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "disabled",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UUID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "StatusEnum",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "userIsAdmin",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "BillFilter",
        "inputFields": [
          {
            "name": "accountGrouping",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountGroupingFilter",
              "ofType": null
            }
          },
          {
            "name": "accountGroupingId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountGroupingIdFilter",
              "ofType": null
            }
          },
          {
            "name": "active",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "allowUpdate",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "deleted",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "disabled",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "status",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StatusFilter",
              "ofType": null
            }
          },
          {
            "name": "title",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "BillSort",
        "inputFields": [
          {
            "name": "accountGrouping",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountGroupingSort",
              "ofType": null
            }
          },
          {
            "name": "active",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "allowUpdate",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "deleted",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "disabled",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "status",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "title",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "BillsReturn",
        "fields": [
          {
            "name": "bills",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Bill",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Boolean"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "BooleanFilter",
        "inputFields": [
          {
            "name": "equals",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Budget",
        "fields": [
          {
            "name": "accountGrouping",
            "type": {
              "kind": "OBJECT",
              "name": "AccountGrouping",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "active",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "allowUpdate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "deleted",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "disabled",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UUID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "StatusEnum",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "userIsAdmin",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "BudgetFilter",
        "inputFields": [
          {
            "name": "accountGrouping",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountGroupingFilter",
              "ofType": null
            }
          },
          {
            "name": "accountGroupingId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountGroupingIdFilter",
              "ofType": null
            }
          },
          {
            "name": "active",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "allowUpdate",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "deleted",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "disabled",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "status",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StatusFilter",
              "ofType": null
            }
          },
          {
            "name": "title",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "BudgetSort",
        "inputFields": [
          {
            "name": "accountGrouping",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountGroupingSort",
              "ofType": null
            }
          },
          {
            "name": "active",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "allowUpdate",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "deleted",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "disabled",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "status",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "title",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "BudgetsReturn",
        "fields": [
          {
            "name": "budgets",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Budget",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Byte"
      },
      {
        "kind": "OBJECT",
        "name": "CategoriesReturn",
        "fields": [
          {
            "name": "categories",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Category",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Category",
        "fields": [
          {
            "name": "accountGrouping",
            "type": {
              "kind": "OBJECT",
              "name": "AccountGrouping",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "active",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "allowUpdate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "deleted",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "disabled",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "group",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UUID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "single",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "StatusEnum",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "userIsAdmin",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CategoryFilter",
        "inputFields": [
          {
            "name": "accountGrouping",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountGroupingFilter",
              "ofType": null
            }
          },
          {
            "name": "accountGroupingId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountGroupingIdFilter",
              "ofType": null
            }
          },
          {
            "name": "active",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "allowUpdate",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "deleted",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "disabled",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "group",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "single",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "status",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StatusFilter",
              "ofType": null
            }
          },
          {
            "name": "title",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CategorySort",
        "inputFields": [
          {
            "name": "accountGrouping",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountGroupingSort",
              "ofType": null
            }
          },
          {
            "name": "active",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "allowUpdate",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "deleted",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "disabled",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "group",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "single",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "status",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "title",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ConnectOrCreateAccount",
        "inputFields": [
          {
            "name": "connectOrCreate",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "CreateAccountInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ConnectOrCreateBill",
        "inputFields": [
          {
            "name": "connectOrCreate",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "CreateBillInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ConnectOrCreateBudget",
        "inputFields": [
          {
            "name": "connectOrCreate",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "CreateBudgetInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ConnectOrCreateCategory",
        "inputFields": [
          {
            "name": "connectOrCreate",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "CreateCategoryInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ConnectOrCreateTag",
        "inputFields": [
          {
            "name": "connectOrCreate",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "CreateTagInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "CountryCode"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CreateAccountGroupingInput",
        "inputFields": [
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CreateAccountInput",
        "inputFields": [
          {
            "name": "accountGroup",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "accountGroup2",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "accountGroup3",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "accountGroupingId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UUID",
                "ofType": null
              }
            }
          },
          {
            "name": "endDate",
            "type": {
              "kind": "SCALAR",
              "name": "Date",
              "ofType": null
            }
          },
          {
            "name": "isCash",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "isNetWorth",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "startDate",
            "type": {
              "kind": "SCALAR",
              "name": "Date",
              "ofType": null
            }
          },
          {
            "name": "status",
            "type": {
              "kind": "ENUM",
              "name": "StatusEnum",
              "ofType": null
            }
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "type",
            "type": {
              "kind": "ENUM",
              "name": "AccountType",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CreateBillInput",
        "inputFields": [
          {
            "name": "accountGroupingId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UUID",
                "ofType": null
              }
            }
          },
          {
            "name": "status",
            "type": {
              "kind": "ENUM",
              "name": "StatusEnum",
              "ofType": null
            }
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CreateBudgetInput",
        "inputFields": [
          {
            "name": "accountGroupingId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UUID",
                "ofType": null
              }
            }
          },
          {
            "name": "status",
            "type": {
              "kind": "ENUM",
              "name": "StatusEnum",
              "ofType": null
            }
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CreateCategoryInput",
        "inputFields": [
          {
            "name": "accountGroupingId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UUID",
                "ofType": null
              }
            }
          },
          {
            "name": "group",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "single",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "status",
            "type": {
              "kind": "ENUM",
              "name": "StatusEnum",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CreateJournalInput",
        "inputFields": [
          {
            "name": "account",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ConnectOrCreateAccount",
              "ofType": null
            }
          },
          {
            "name": "accountGroupingId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UUID",
                "ofType": null
              }
            }
          },
          {
            "name": "accountId",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          },
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            }
          },
          {
            "name": "bill",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ConnectOrCreateBill",
              "ofType": null
            }
          },
          {
            "name": "billId",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          },
          {
            "name": "budget",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ConnectOrCreateBudget",
              "ofType": null
            }
          },
          {
            "name": "budgetId",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          },
          {
            "name": "category",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ConnectOrCreateCategory",
              "ofType": null
            }
          },
          {
            "name": "categoryId",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          },
          {
            "name": "complete",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "dataChecked",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "date",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Date",
                "ofType": null
              }
            }
          },
          {
            "name": "description",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "linked",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "reconciled",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "tag",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ConnectOrCreateTag",
              "ofType": null
            }
          },
          {
            "name": "tagId",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CreateTagInput",
        "inputFields": [
          {
            "name": "accountGroupingId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UUID",
                "ofType": null
              }
            }
          },
          {
            "name": "group",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "single",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "status",
            "type": {
              "kind": "ENUM",
              "name": "StatusEnum",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CreateUserInput",
        "inputFields": [
          {
            "name": "admin",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "email",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EmailAddress",
                "ofType": null
              }
            }
          },
          {
            "name": "firstName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "lastName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "password",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "Currency"
      },
      {
        "kind": "ENUM",
        "name": "CurrencyFormatEnum",
        "enumValues": [
          {
            "name": "EUR"
          },
          {
            "name": "GBP"
          },
          {
            "name": "JPY"
          },
          {
            "name": "USD"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "DID"
      },
      {
        "kind": "SCALAR",
        "name": "Date"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "DateFilter",
        "inputFields": [
          {
            "name": "equals",
            "type": {
              "kind": "SCALAR",
              "name": "Date",
              "ofType": null
            }
          },
          {
            "name": "gt",
            "type": {
              "kind": "SCALAR",
              "name": "Date",
              "ofType": null
            }
          },
          {
            "name": "gte",
            "type": {
              "kind": "SCALAR",
              "name": "Date",
              "ofType": null
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Date",
                "ofType": null
              }
            }
          },
          {
            "name": "lt",
            "type": {
              "kind": "SCALAR",
              "name": "Date",
              "ofType": null
            }
          },
          {
            "name": "lte",
            "type": {
              "kind": "SCALAR",
              "name": "Date",
              "ofType": null
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "SCALAR",
              "name": "Date",
              "ofType": null
            }
          },
          {
            "name": "notIn",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Date",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "DateTime"
      },
      {
        "kind": "SCALAR",
        "name": "Duration"
      },
      {
        "kind": "SCALAR",
        "name": "EmailAddress"
      },
      {
        "kind": "ENUM",
        "name": "EmptyFirst",
        "enumValues": [
          {
            "name": "EMPTY_FIRST"
          },
          {
            "name": "EMPTY_LAST"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "Float"
      },
      {
        "kind": "SCALAR",
        "name": "GUID"
      },
      {
        "kind": "SCALAR",
        "name": "HSL"
      },
      {
        "kind": "SCALAR",
        "name": "HSLA"
      },
      {
        "kind": "SCALAR",
        "name": "HexColorCode"
      },
      {
        "kind": "SCALAR",
        "name": "Hexadecimal"
      },
      {
        "kind": "SCALAR",
        "name": "IBAN"
      },
      {
        "kind": "SCALAR",
        "name": "ID"
      },
      {
        "kind": "SCALAR",
        "name": "IPv4"
      },
      {
        "kind": "SCALAR",
        "name": "IPv6"
      },
      {
        "kind": "SCALAR",
        "name": "ISBN"
      },
      {
        "kind": "SCALAR",
        "name": "ISO8601Duration"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ImportDataInput",
        "inputFields": [
          {
            "name": "accountId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "accountTitle",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            }
          },
          {
            "name": "billId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "billTitle",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "budgetId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "budgetTitle",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "categoryId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "categoryTitle",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "complete",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            }
          },
          {
            "name": "dataChecked",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "date",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "description",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "linked",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "primaryJournalId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "reconciled",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "tagId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "tagTitle",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ImportDataProcessed",
        "fields": [
          {
            "name": "accountId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "accountTitle",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "billId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "billTitle",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "budgetId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "budgetTitle",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "categoryId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "categoryTitle",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "complete",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "dataChecked",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "date",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "foundJournalID",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "journalId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "linked",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "primaryJournalId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "reconciled",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "ImportDataReturnStatus",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "tagId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tagTitle",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ImportDataReturn",
        "fields": [
          {
            "name": "data",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "ImportDataProcessed",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "errors",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "ImportReturnError",
                  "ofType": null
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "ImportDataReturnStatus",
        "enumValues": [
          {
            "name": "journalIdMatch"
          },
          {
            "name": "referenceOnly"
          },
          {
            "name": "similarJournalFound"
          },
          {
            "name": "transactionIdMatch"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ImportReturnError",
        "fields": [
          {
            "name": "location",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "message",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Int"
      },
      {
        "kind": "SCALAR",
        "name": "JSON"
      },
      {
        "kind": "SCALAR",
        "name": "JSONObject"
      },
      {
        "kind": "SCALAR",
        "name": "JWT"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "JournalEntriesFilter",
        "inputFields": [
          {
            "name": "every",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "JournalEntryFilter",
              "ofType": null
            }
          },
          {
            "name": "none",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "JournalEntryFilter",
              "ofType": null
            }
          },
          {
            "name": "some",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "JournalEntryFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "JournalEntriesReturn",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "journalEntries",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "JournalEntry",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "sum",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "JournalEntry",
        "fields": [
          {
            "name": "account",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Account",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "accountGrouping",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AccountGrouping",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "accountGroupingId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "accountId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "amountEditable",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "bill",
            "type": {
              "kind": "OBJECT",
              "name": "Bill",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "budget",
            "type": {
              "kind": "OBJECT",
              "name": "Budget",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "category",
            "type": {
              "kind": "OBJECT",
              "name": "Category",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "complete",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "dataChecked",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "date",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Date",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "editable",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UUID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "journalEntries",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "JournalEntry",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "linked",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "primary",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "primaryJournal",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "JournalEntry",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "primaryJournalId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "reconciled",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "tag",
            "type": {
              "kind": "OBJECT",
              "name": "Tag",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "total",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "userIsAdmin",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "JournalEntryFilter",
        "inputFields": [
          {
            "name": "AND",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "JournalEntryFilterSingle",
                "ofType": null
              }
            }
          },
          {
            "name": "OR",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "JournalEntryFilterSingle",
                "ofType": null
              }
            }
          },
          {
            "name": "account",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountFilter",
              "ofType": null
            }
          },
          {
            "name": "accountGrouping",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountGroupingFilter",
              "ofType": null
            }
          },
          {
            "name": "accountGroupingId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UUIDFilter",
              "ofType": null
            }
          },
          {
            "name": "accountId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UUIDFilter",
              "ofType": null
            }
          },
          {
            "name": "amount",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NumberFilter",
              "ofType": null
            }
          },
          {
            "name": "bill",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BillFilter",
              "ofType": null
            }
          },
          {
            "name": "budget",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BudgetFilter",
              "ofType": null
            }
          },
          {
            "name": "category",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "CategoryFilter",
              "ofType": null
            }
          },
          {
            "name": "complete",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateFilter",
              "ofType": null
            }
          },
          {
            "name": "dataChecked",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "date",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateFilter",
              "ofType": null
            }
          },
          {
            "name": "description",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UUIDFilter",
              "ofType": null
            }
          },
          {
            "name": "linked",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "primaryJournal",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "JournalEntryFilterWithoutPrimary",
              "ofType": null
            }
          },
          {
            "name": "primaryJournalId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UUIDFilter",
              "ofType": null
            }
          },
          {
            "name": "reconciled",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "tag",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TagFilter",
              "ofType": null
            }
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "JournalEntryFilterSingle",
        "inputFields": [
          {
            "name": "account",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountFilter",
              "ofType": null
            }
          },
          {
            "name": "accountGrouping",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountGroupingFilter",
              "ofType": null
            }
          },
          {
            "name": "accountGroupingId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UUIDFilter",
              "ofType": null
            }
          },
          {
            "name": "accountId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UUIDFilter",
              "ofType": null
            }
          },
          {
            "name": "amount",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NumberFilter",
              "ofType": null
            }
          },
          {
            "name": "bill",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BillFilter",
              "ofType": null
            }
          },
          {
            "name": "budget",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BudgetFilter",
              "ofType": null
            }
          },
          {
            "name": "category",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "CategoryFilter",
              "ofType": null
            }
          },
          {
            "name": "complete",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateFilter",
              "ofType": null
            }
          },
          {
            "name": "dataChecked",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "date",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateFilter",
              "ofType": null
            }
          },
          {
            "name": "description",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UUIDFilter",
              "ofType": null
            }
          },
          {
            "name": "linked",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "primaryJournal",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "JournalEntryFilterWithoutPrimary",
              "ofType": null
            }
          },
          {
            "name": "primaryJournalId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UUIDFilter",
              "ofType": null
            }
          },
          {
            "name": "reconciled",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "tag",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TagFilter",
              "ofType": null
            }
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "JournalEntryFilterWithoutPrimary",
        "inputFields": [
          {
            "name": "account",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountFilter",
              "ofType": null
            }
          },
          {
            "name": "accountGrouping",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountGroupingFilter",
              "ofType": null
            }
          },
          {
            "name": "accountGroupingId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UUIDFilter",
              "ofType": null
            }
          },
          {
            "name": "accountId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UUIDFilter",
              "ofType": null
            }
          },
          {
            "name": "amount",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NumberFilter",
              "ofType": null
            }
          },
          {
            "name": "bill",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BillFilter",
              "ofType": null
            }
          },
          {
            "name": "budget",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BudgetFilter",
              "ofType": null
            }
          },
          {
            "name": "category",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "CategoryFilter",
              "ofType": null
            }
          },
          {
            "name": "complete",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateFilter",
              "ofType": null
            }
          },
          {
            "name": "dataChecked",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "date",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateFilter",
              "ofType": null
            }
          },
          {
            "name": "description",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UUIDFilter",
              "ofType": null
            }
          },
          {
            "name": "journalEntries",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "JournalEntriesFilter",
              "ofType": null
            }
          },
          {
            "name": "linked",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "primaryJournalId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UUIDFilter",
              "ofType": null
            }
          },
          {
            "name": "reconciled",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "tag",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TagFilter",
              "ofType": null
            }
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "DateFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "JournalEntrySort",
        "inputFields": [
          {
            "name": "account",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountSort",
              "ofType": null
            }
          },
          {
            "name": "accountGrouping",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountGroupingSort",
              "ofType": null
            }
          },
          {
            "name": "amount",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "bill",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BillSort",
              "ofType": null
            }
          },
          {
            "name": "budget",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BudgetSort",
              "ofType": null
            }
          },
          {
            "name": "category",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "CategorySort",
              "ofType": null
            }
          },
          {
            "name": "complete",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "dataChecked",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "date",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "description",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "linked",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "reconciled",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "tag",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TagSort",
              "ofType": null
            }
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "Latitude"
      },
      {
        "kind": "SCALAR",
        "name": "LocalDate"
      },
      {
        "kind": "SCALAR",
        "name": "LocalEndTime"
      },
      {
        "kind": "SCALAR",
        "name": "LocalTime"
      },
      {
        "kind": "SCALAR",
        "name": "Locale"
      },
      {
        "kind": "SCALAR",
        "name": "Long"
      },
      {
        "kind": "SCALAR",
        "name": "Longitude"
      },
      {
        "kind": "SCALAR",
        "name": "MAC"
      },
      {
        "kind": "OBJECT",
        "name": "Mutation",
        "fields": [
          {
            "name": "addExpenseAndConnectToJournals",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "JournalEntry",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "expenseName",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  }
                }
              },
              {
                "name": "journalIds",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "UUID",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "addJournalEntries",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "JournalEntry",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AddJournalInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "addUserToAccountGrouping",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AccountGrouping",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "email",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  }
                }
              },
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "UUID",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "changePrimaryJournal",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "JournalEntry",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "newPrimaryId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "UUID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "oldPrimaryId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "UUID",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "cloneTransactions",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "JournalEntry",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "ids",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "UUID",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "input",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "UpdateJournalInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "createAccount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Account",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreateAccountInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createAccountGrouping",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AccountGrouping",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreateAccountGroupingInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createBill",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Bill",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreateBillInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createBudget",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Budget",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreateBudgetInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createCategory",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Category",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreateCategoryInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createTag",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Tag",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreateTagInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createTransaction",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "JournalEntry",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "CreateJournalInput",
                        "ofType": null
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "createTransactions",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "JournalEntry",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "LIST",
                        "ofType": {
                          "kind": "NON_NULL",
                          "ofType": {
                            "kind": "INPUT_OBJECT",
                            "name": "CreateJournalInput",
                            "ofType": null
                          }
                        }
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "createUser",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CreateUserInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "deleteJournalEntries",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "JournalEntry",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "journalIds",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "UUID",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "linkTransactions",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "JournalEntry",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "primaryJournalIds",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "UUID",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "removeUserFromAccountGrouping",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AccountGrouping",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "agID",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "UUID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "userID",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "setUserToAGAdmin",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AccountGrouping",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "agID",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "UUID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "userID",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "setUserToAGView",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AccountGrouping",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "agID",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "UUID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "userID",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "transactionsToComplete",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "JournalEntry",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "primaryJournalIds",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "UUID",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "transactionsToIncomplete",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "JournalEntry",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "primaryJournalIds",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "UUID",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "unlinkTransactions",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "JournalEntry",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "primaryJournalIds",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "UUID",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "updateAccountGrouping",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AccountGrouping",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "UUID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UpdateAccountGroupingInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "updateAccounts",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Account",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "filter",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AccountFilter",
                    "ofType": null
                  }
                }
              },
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UpdateAccountInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "updateBills",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Bill",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "filter",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "BillFilter",
                    "ofType": null
                  }
                }
              },
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UpdateBillInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "updateBudgets",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Budget",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "filter",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "BudgetFilter",
                    "ofType": null
                  }
                }
              },
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UpdateBudgetInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "updateCategories",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Category",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "filter",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "CategoryFilter",
                    "ofType": null
                  }
                }
              },
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UpdateCategoryInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "updateJournalEntries",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "JournalEntry",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "filter",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "JournalEntryFilter",
                    "ofType": null
                  }
                }
              },
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UpdateJournalInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "updateTags",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Tag",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "filter",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "TagFilter",
                    "ofType": null
                  }
                }
              },
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UpdateTagInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "updateUser",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "UpdateUserInput",
                    "ofType": null
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "NegativeFloat"
      },
      {
        "kind": "SCALAR",
        "name": "NegativeInt"
      },
      {
        "kind": "SCALAR",
        "name": "NonEmptyString"
      },
      {
        "kind": "SCALAR",
        "name": "NonNegativeFloat"
      },
      {
        "kind": "SCALAR",
        "name": "NonNegativeInt"
      },
      {
        "kind": "SCALAR",
        "name": "NonPositiveFloat"
      },
      {
        "kind": "SCALAR",
        "name": "NonPositiveInt"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NumberFilter",
        "inputFields": [
          {
            "name": "equals",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          },
          {
            "name": "gt",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          },
          {
            "name": "gte",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            }
          },
          {
            "name": "lt",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          },
          {
            "name": "lte",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          },
          {
            "name": "notIn",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "ObjectID"
      },
      {
        "kind": "SCALAR",
        "name": "PhoneNumber"
      },
      {
        "kind": "SCALAR",
        "name": "Port"
      },
      {
        "kind": "SCALAR",
        "name": "PositiveFloat"
      },
      {
        "kind": "SCALAR",
        "name": "PositiveInt"
      },
      {
        "kind": "SCALAR",
        "name": "PostalCode"
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "account",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Account",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "UUID",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "accountGrouping",
            "type": {
              "kind": "OBJECT",
              "name": "AccountGrouping",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "UUID",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "accountGroupings",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "AccountGrouping",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "accounts",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AccountsReturn",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AccountFilter",
                  "ofType": null
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "sort",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "AccountSort",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "bill",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Bill",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "UUID",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "bills",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "BillsReturn",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "BillFilter",
                  "ofType": null
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "sort",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "BillSort",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "budget",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Budget",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "UUID",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "budgets",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "BudgetsReturn",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "BudgetFilter",
                  "ofType": null
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "sort",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "BudgetSort",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "categories",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "CategoriesReturn",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "CategoryFilter",
                  "ofType": null
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "sort",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "CategorySort",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "category",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Category",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "UUID",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "importDataCheck",
            "type": {
              "kind": "OBJECT",
              "name": "ImportDataReturn",
              "ofType": null
            },
            "args": [
              {
                "name": "accountGroupingId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  }
                }
              },
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "ImportDataInput",
                        "ofType": null
                      }
                    }
                  }
                }
              },
              {
                "name": "excludeCheckJournalDetails",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              },
              {
                "name": "excludeCheckJournalId",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              },
              {
                "name": "excludeCheckTransactionId",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              },
              {
                "name": "excludeTransactions",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "journalEntries",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "JournalEntriesReturn",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "JournalEntryFilter",
                  "ofType": null
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "sort",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "JournalEntrySort",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "journalEntry",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "JournalEntry",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "UUID",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "tag",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Tag",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "UUID",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "tags",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "TagsReturn",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TagFilter",
                  "ofType": null
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "sort",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "TagSort",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "testResult",
            "type": {
              "kind": "OBJECT",
              "name": "TestResult",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "RGB"
      },
      {
        "kind": "SCALAR",
        "name": "RGBA"
      },
      {
        "kind": "SCALAR",
        "name": "RoutingNumber"
      },
      {
        "kind": "SCALAR",
        "name": "SafeInt"
      },
      {
        "kind": "ENUM",
        "name": "SortDirection",
        "enumValues": [
          {
            "name": "asc"
          },
          {
            "name": "desc"
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "StatusEnum",
        "enumValues": [
          {
            "name": "Active"
          },
          {
            "name": "Deleted"
          },
          {
            "name": "Disabled"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "StatusFilter",
        "inputFields": [
          {
            "name": "equals",
            "type": {
              "kind": "ENUM",
              "name": "StatusEnum",
              "ofType": null
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "ENUM",
                "name": "StatusEnum",
                "ofType": null
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "ENUM",
              "name": "StatusEnum",
              "ofType": null
            }
          },
          {
            "name": "notIn",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "ENUM",
                "name": "StatusEnum",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "String"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "StringFilter",
        "inputFields": [
          {
            "name": "contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "endsWith",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "equals",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "notIn",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "startsWith",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Tag",
        "fields": [
          {
            "name": "accountGrouping",
            "type": {
              "kind": "OBJECT",
              "name": "AccountGrouping",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "active",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "allowUpdate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "deleted",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "disabled",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "group",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UUID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "single",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "StatusEnum",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "DateTime",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "userIsAdmin",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TagFilter",
        "inputFields": [
          {
            "name": "accountGrouping",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountGroupingFilter",
              "ofType": null
            }
          },
          {
            "name": "accountGroupingId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountGroupingIdFilter",
              "ofType": null
            }
          },
          {
            "name": "active",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "allowUpdate",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "deleted",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "disabled",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanFilter",
              "ofType": null
            }
          },
          {
            "name": "group",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "single",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "status",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StatusFilter",
              "ofType": null
            }
          },
          {
            "name": "title",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TagSort",
        "inputFields": [
          {
            "name": "accountGrouping",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AccountGroupingSort",
              "ofType": null
            }
          },
          {
            "name": "active",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "allowUpdate",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "deleted",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "disabled",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "group",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "single",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "status",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          },
          {
            "name": "title",
            "type": {
              "kind": "ENUM",
              "name": "SortDirection",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TagsReturn",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tags",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Tag",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "TestResult",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "requestTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Time"
      },
      {
        "kind": "SCALAR",
        "name": "TimeZone"
      },
      {
        "kind": "SCALAR",
        "name": "Timestamp"
      },
      {
        "kind": "SCALAR",
        "name": "URL"
      },
      {
        "kind": "SCALAR",
        "name": "USCurrency"
      },
      {
        "kind": "SCALAR",
        "name": "UUID"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UUIDFilter",
        "inputFields": [
          {
            "name": "equals",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "UUID",
                "ofType": null
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          },
          {
            "name": "notIn",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "UUID",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "UnsignedFloat"
      },
      {
        "kind": "SCALAR",
        "name": "UnsignedInt"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UpdateAccountGroupingInput",
        "inputFields": [
          {
            "name": "status",
            "type": {
              "kind": "ENUM",
              "name": "StatusEnum",
              "ofType": null
            }
          },
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UpdateAccountInput",
        "inputFields": [
          {
            "name": "accountGroup",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "accountGroup2",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "accountGroup3",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "endDate",
            "type": {
              "kind": "SCALAR",
              "name": "Date",
              "ofType": null
            }
          },
          {
            "name": "isCash",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "isNetWorth",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "startDate",
            "type": {
              "kind": "SCALAR",
              "name": "Date",
              "ofType": null
            }
          },
          {
            "name": "status",
            "type": {
              "kind": "ENUM",
              "name": "StatusEnum",
              "ofType": null
            }
          },
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "type",
            "type": {
              "kind": "ENUM",
              "name": "AccountType",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UpdateBillInput",
        "inputFields": [
          {
            "name": "status",
            "type": {
              "kind": "ENUM",
              "name": "StatusEnum",
              "ofType": null
            }
          },
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UpdateBudgetInput",
        "inputFields": [
          {
            "name": "status",
            "type": {
              "kind": "ENUM",
              "name": "StatusEnum",
              "ofType": null
            }
          },
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UpdateCategoryInput",
        "inputFields": [
          {
            "name": "group",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "single",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "status",
            "type": {
              "kind": "ENUM",
              "name": "StatusEnum",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UpdateJournalInput",
        "inputFields": [
          {
            "name": "accountId",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          },
          {
            "name": "amount",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          },
          {
            "name": "billId",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          },
          {
            "name": "budgetId",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          },
          {
            "name": "categoryId",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          },
          {
            "name": "complete",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "dataChecked",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "date",
            "type": {
              "kind": "SCALAR",
              "name": "Date",
              "ofType": null
            }
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "otherAccountId",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          },
          {
            "name": "reconciled",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "tagId",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UpdateTagInput",
        "inputFields": [
          {
            "name": "group",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "single",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "status",
            "type": {
              "kind": "ENUM",
              "name": "StatusEnum",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UpdateUserInput",
        "inputFields": [
          {
            "name": "currencyFormat",
            "type": {
              "kind": "ENUM",
              "name": "CurrencyFormatEnum",
              "ofType": null
            }
          },
          {
            "name": "darkMode",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "dateFormat",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "firstMonthFY",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "firstName",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "lastName",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "User",
        "fields": [
          {
            "name": "admin",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "currencyFormat",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "CurrencyFormatEnum",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "darkMode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "dateFormat",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "email",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "firstMonthFY",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "firstName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "lastName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UserPublic",
        "fields": [
          {
            "name": "email",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "firstName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "lastName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "UtcOffset"
      },
      {
        "kind": "SCALAR",
        "name": "Void"
      },
      {
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;