export type IDLMarketplaceProgram = {
  version: "0.1.0";
  name: "marketplace_program";
  instructions: [
    {
      name: "initializeEmployeeProfile";
      accounts: [
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "userProfile";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "email";
          type: "string";
        },
        {
          name: "profileImage";
          type: "string";
        },
        {
          name: "skills";
          type: {
            option: {
              vec: "string";
            };
          };
        }
      ];
    },
    {
      name: "initializeEmployerProfile";
      accounts: [
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "userProfile";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "email";
          type: "string";
        },
        {
          name: "profileImage";
          type: "string";
        }
      ];
    },
    {
      name: "initializeNewJob";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "job";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "id";
          type: "publicKey";
        },
        {
          name: "jobTitle";
          type: "string";
        },
        {
          name: "jobDescription";
          type: "string";
        },
        {
          name: "tags";
          type: "string";
        },
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "applyForJob";
      accounts: [
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "job";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "acceptJobApplication";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "job";
          isMut: true;
          isSigner: false;
        },
        {
          name: "escrow";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vault";
          isMut: true;
          isSigner: false;
          docs: ["CHECK : The token vault to deposit the funds into."];
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "index";
          type: "u8";
        },
        {
          name: "seed";
          type: "u64";
        }
      ];
    },
    {
      name: "closeJob";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: false;
        },
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "job";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "updateJobCompletion";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: false;
        },
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "job";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "updateJobPayment";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "user";
          isMut: true;
          isSigner: false;
        },
        {
          name: "job";
          isMut: true;
          isSigner: false;
        },
        {
          name: "escrow";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "initializeNewService";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "service";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "id";
          type: "publicKey";
        },
        {
          name: "serviceTitle";
          type: "string";
        },
        {
          name: "serviceDescription";
          type: "string";
        },
        {
          name: "tags";
          type: "string";
        },
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "applyForService";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: false;
        },
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "service";
          isMut: true;
          isSigner: false;
        },
        {
          name: "servicePda";
          isMut: true;
          isSigner: false;
        },
        {
          name: "escrow";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vault";
          isMut: true;
          isSigner: false;
          docs: ["CHECK : The token vault to deposit the funds into."];
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "seed";
          type: "u64";
        }
      ];
    },
    {
      name: "updateServiceCompletion";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "service";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "updateServicePayment";
      accounts: [
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "owner";
          isMut: true;
          isSigner: false;
        },
        {
          name: "service";
          isMut: true;
          isSigner: false;
        },
        {
          name: "escrow";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "Escrow";
      type: {
        kind: "struct";
        fields: [
          {
            name: "seed";
            type: "u64";
          },
          {
            name: "maker";
            type: "publicKey";
          },
          {
            name: "taker";
            type: "publicKey";
          },
          {
            name: "product";
            type: "publicKey";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "isInitialized";
            type: "bool";
          }
        ];
      };
    },
    {
      name: "Job";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "publicKey";
          },
          {
            name: "owner";
            type: "publicKey";
          },
          {
            name: "user";
            type: "publicKey";
          },
          {
            name: "jobTitle";
            type: "string";
          },
          {
            name: "jobDescription";
            type: "string";
          },
          {
            name: "tags";
            type: "string";
          },
          {
            name: "timestamp";
            type: "i64";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "jobStatus";
            type: {
              defined: "STATUS";
            };
          },
          {
            name: "paymentStatus";
            type: {
              defined: "STATUS";
            };
          },
          {
            name: "bidders";
            type: {
              vec: "publicKey";
            };
          }
        ];
      };
    },
    {
      name: "Service";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "publicKey";
          },
          {
            name: "owner";
            type: "publicKey";
          },
          {
            name: "user";
            type: "publicKey";
          },
          {
            name: "serviceTitle";
            type: "string";
          },
          {
            name: "serviceDescription";
            type: "string";
          },
          {
            name: "tags";
            type: "string";
          },
          {
            name: "timestamp";
            type: "i64";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "serviceStatus";
            type: {
              defined: "STATUS";
            };
          },
          {
            name: "paymentStatus";
            type: {
              defined: "STATUS";
            };
          }
        ];
      };
    },
    {
      name: "UserProfile";
      type: {
        kind: "struct";
        fields: [
          {
            name: "name";
            type: "string";
          },
          {
            name: "email";
            type: "string";
          },
          {
            name: "profileImage";
            type: "string";
          },
          {
            name: "userType";
            type: {
              defined: "UserType";
            };
          },
          {
            name: "skills";
            type: {
              option: {
                vec: "string";
              };
            };
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "STATUS";
      type: {
        kind: "enum";
        variants: [
          {
            name: "OPEN";
          },
          {
            name: "INPROGRESS";
          },
          {
            name: "COMPLETED";
          },
          {
            name: "PAID";
          },
          {
            name: "CLOSED";
          }
        ];
      };
    },
    {
      name: "UserType";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Employer";
          },
          {
            name: "Employee";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "UserNotAuthorized";
      msg: "Invalid User!";
    },
    {
      code: 6001;
      name: "InvalidJobStatus";
      msg: "Job Status Invalid!";
    },
    {
      code: 6002;
      name: "InvalidServiceStatus";
      msg: "ServiceStatus Invalid!";
    },
    {
      code: 6003;
      name: "JobStatusNotOpen";
      msg: "Job is not accepting applications anymore!";
    },
    {
      code: 6004;
      name: "ServiceStatusNotOpen";
      msg: "Service is not available currently!";
    },
    {
      code: 6005;
      name: "JobStatusCompleted";
      msg: "This job is not available anymore!";
    }
  ];
};

export const IDL: IDLMarketplaceProgram = {
  version: "0.1.0",
  name: "marketplace_program",
  instructions: [
    {
      name: "initializeEmployeeProfile",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userProfile",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "email",
          type: "string",
        },
        {
          name: "profileImage",
          type: "string",
        },
        {
          name: "skills",
          type: {
            option: {
              vec: "string",
            },
          },
        },
      ],
    },
    {
      name: "initializeEmployerProfile",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userProfile",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "email",
          type: "string",
        },
        {
          name: "profileImage",
          type: "string",
        },
      ],
    },
    {
      name: "initializeNewJob",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "job",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "id",
          type: "publicKey",
        },
        {
          name: "jobTitle",
          type: "string",
        },
        {
          name: "jobDescription",
          type: "string",
        },
        {
          name: "tags",
          type: "string",
        },
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "applyForJob",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "job",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "acceptJobApplication",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "job",
          isMut: true,
          isSigner: false,
        },
        {
          name: "escrow",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vault",
          isMut: true,
          isSigner: false,
          docs: ["CHECK : The token vault to deposit the funds into."],
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "index",
          type: "u8",
        },
        {
          name: "seed",
          type: "u64",
        },
      ],
    },
    {
      name: "closeJob",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "job",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "updateJobCompletion",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "job",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "updateJobPayment",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "job",
          isMut: true,
          isSigner: false,
        },
        {
          name: "escrow",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "initializeNewService",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "service",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "id",
          type: "publicKey",
        },
        {
          name: "serviceTitle",
          type: "string",
        },
        {
          name: "serviceDescription",
          type: "string",
        },
        {
          name: "tags",
          type: "string",
        },
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "applyForService",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "service",
          isMut: true,
          isSigner: false,
        },
        {
          name: "servicePda",
          isMut: true,
          isSigner: false,
        },
        {
          name: "escrow",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vault",
          isMut: true,
          isSigner: false,
          docs: ["CHECK : The token vault to deposit the funds into."],
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "seed",
          type: "u64",
        },
      ],
    },
    {
      name: "updateServiceCompletion",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "service",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "updateServicePayment",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "owner",
          isMut: true,
          isSigner: false,
        },
        {
          name: "service",
          isMut: true,
          isSigner: false,
        },
        {
          name: "escrow",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "Escrow",
      type: {
        kind: "struct",
        fields: [
          {
            name: "seed",
            type: "u64",
          },
          {
            name: "maker",
            type: "publicKey",
          },
          {
            name: "taker",
            type: "publicKey",
          },
          {
            name: "product",
            type: "publicKey",
          },
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "isInitialized",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "Job",
      type: {
        kind: "struct",
        fields: [
          {
            name: "id",
            type: "publicKey",
          },
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "user",
            type: "publicKey",
          },
          {
            name: "jobTitle",
            type: "string",
          },
          {
            name: "jobDescription",
            type: "string",
          },
          {
            name: "tags",
            type: "string",
          },
          {
            name: "timestamp",
            type: "i64",
          },
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "jobStatus",
            type: {
              defined: "STATUS",
            },
          },
          {
            name: "paymentStatus",
            type: {
              defined: "STATUS",
            },
          },
          {
            name: "bidders",
            type: {
              vec: "publicKey",
            },
          },
        ],
      },
    },
    {
      name: "Service",
      type: {
        kind: "struct",
        fields: [
          {
            name: "id",
            type: "publicKey",
          },
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "user",
            type: "publicKey",
          },
          {
            name: "serviceTitle",
            type: "string",
          },
          {
            name: "serviceDescription",
            type: "string",
          },
          {
            name: "tags",
            type: "string",
          },
          {
            name: "timestamp",
            type: "i64",
          },
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "serviceStatus",
            type: {
              defined: "STATUS",
            },
          },
          {
            name: "paymentStatus",
            type: {
              defined: "STATUS",
            },
          },
        ],
      },
    },
    {
      name: "UserProfile",
      type: {
        kind: "struct",
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "email",
            type: "string",
          },
          {
            name: "profileImage",
            type: "string",
          },
          {
            name: "userType",
            type: {
              defined: "UserType",
            },
          },
          {
            name: "skills",
            type: {
              option: {
                vec: "string",
              },
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "STATUS",
      type: {
        kind: "enum",
        variants: [
          {
            name: "OPEN",
          },
          {
            name: "INPROGRESS",
          },
          {
            name: "COMPLETED",
          },
          {
            name: "PAID",
          },
          {
            name: "CLOSED",
          },
        ],
      },
    },
    {
      name: "UserType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Employer",
          },
          {
            name: "Employee",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "UserNotAuthorized",
      msg: "Invalid User!",
    },
    {
      code: 6001,
      name: "InvalidJobStatus",
      msg: "Job Status Invalid!",
    },
    {
      code: 6002,
      name: "InvalidServiceStatus",
      msg: "ServiceStatus Invalid!",
    },
    {
      code: 6003,
      name: "JobStatusNotOpen",
      msg: "Job is not accepting applications anymore!",
    },
    {
      code: 6004,
      name: "ServiceStatusNotOpen",
      msg: "Service is not available currently!",
    },
    {
      code: 6005,
      name: "JobStatusCompleted",
      msg: "This job is not available anymore!",
    },
  ],
};
