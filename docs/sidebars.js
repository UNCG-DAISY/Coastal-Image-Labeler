module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Coastal Image Labeler',
      items: [
        'indexDoc',
        'code_of_conduct',
        'contactUs',
      ],
    },
    {
      type: 'category',
      label: 'Code Documentation',
      items: [
        "code_doc/overview",
        "code_doc/packages",
        "code_doc/projectStructure",
        "code_doc/cicd",
        {
          type: 'category',
          label: 'Auth0',
          items: [
            "code_doc/auth0/auth0",
            "code_doc/auth0/auth0Values"
          ],
        },
        {
          type: 'category',
          label: 'Database',
          items: [
            "code_doc/database/connection",
            "code_doc/database/models",
          ],
        },
        {
          type: 'category',
          label: 'CLI',
          items: [
            "code_doc/cli/setup",
            "code_doc/cli/addImages"
          ],
        },
        {
          type: 'category',
          label: 'SSL',
          items: [
            //"code_doc/ssl/overview",
            "code_doc/ssl/nginx",
            "code_doc/ssl/certbot"
          ],
        },
        {
          type: 'category',
          label: 'Deployment',
          items: [
            "code_doc/deployment/overview",
          ],
        },
        "code_doc/tools",
      ],
    },
    {
      type: 'category',
      label: 'User Documentation',
      items: [
        "user_doc/overview",
      ],
    },
    {
      type: 'category',
      label: 'Question Sets',
      items: [
        "question_sets/overview"
      ],
    },
    // {
    //   type: 'category',
    //   label: 'Other',
    //   items: [
    //     "other/styleGuide",
    //     "other/mdx"
    //   ],
    // },
    // {
    //   type: 'category',
    //   label: 'Docing the Docs',
    //   items: [
    //     "docing_the_docs/indexId",
    //   ],
    // }
  ],
};
