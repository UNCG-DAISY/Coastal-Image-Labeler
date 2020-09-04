module.exports = {
  title: 'Coastal Image Labeler',
  tagline: '',

  url: 'https://uncg-daisy.github.io/Coastal-Image-Labeler/',
  baseUrl: '/Coastal-Image-Labeler/',
  projectName: 'Coastal-Image-Labeler', // Usually your repo name.
  organizationName: 'UNCG-DAISY', // Usually your GitHub org/user name.

  favicon: 'img/favicon.ico',


  themeConfig: {
    defaultDarkMode: true,
    navbar: {
      title: 'Coastal Image Labeler',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      links: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/UNCG-DAISY/Coastal-Image-Labeler',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentation',
              to: 'docs/',
            },
            {
              label: 'Code of Conduct',
              to: 'docs/code_of_conduct',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Contact Us',
              href: 'docs/contactUs',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/ebgoldstein',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/UNCG-DAISY/Coastal-Image-Labeler',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Coastal-Image-Labeler, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'indexDoc',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/UNCG-DAISY/Coastal-Image-Labeler/edit/master/docs/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/UNCG-DAISY/Coastal-Image-Labeler/edit/master/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};