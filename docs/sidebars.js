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
            "code_doc/auth0/auth0Values",
            "code_doc/auth0/rules"
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
            "code_doc/cli/overview",
            "code_doc/cli/setup"
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
        {
          type: 'category',
          label: 'Routes',
          items: [
            "code_doc/routes/overview",
            "code_doc/routes/catalog",
            "code_doc/routes/archive",
            "code_doc/routes/assignedImages",
            "code_doc/routes/image",
            "code_doc/routes/tags",
            "code_doc/routes/qset",
          ],
        },
        {
          type: 'category',
          label: 'Miscellaneous',
          items: [
            "code_doc/misc/path",
            "code_doc/misc/tags",
            "code_doc/misc/sandbox",
          ],
        },
        "code_doc/tools",
        "code_doc/future"
      ],
    },
    {
      type: 'category',
      label: 'Question Sets',
      items: [
        "question_sets/overview",
        "question_sets/qsets/beach",
        "question_sets/qsets/coastal"
      ],
    },
  ],
};
