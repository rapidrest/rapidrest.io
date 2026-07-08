import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'RapidREST',
  tagline: 'A high performance TypeScript framework for rapidly building RESTful APIs and web apps in minutes.',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
    faster: {
      // The rspack bundler (auto-enabled by v4's "faster by default") currently panics
      // on `yarn start` with a "ModuleGraphModule ... cssExtractHmr.js not found" crash.
      // Fall back to webpack for bundling until that's fixed upstream; keep the other
      // faster-mode swaps (SWC, lightningcss, etc.) enabled. rspackPersistentCache
      // requires rspackBundler, so it must be disabled too.
      rspackBundler: false,
      rspackPersistentCache: false,
    },
  },

  // Set the production url of your site here
  // TODO: confirm final hosting target (custom domain vs GitHub Pages vs Vercel/Netlify)
  url: 'https://rapidrest.io',
  baseUrl: '/',

  // GitHub org/repo used for deployment + edit links
  organizationName: 'rapidrest',
  projectName: 'rapidrest.io',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/rapidrest/rapidrest.io/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/rapidrest/rapidrest.io/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'RapidREST',
      logo: {
        alt: 'RapidREST Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/rapidrest',
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
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'SSR React',
              to: '/docs/ssr-react',
            },
            {
              label: 'CLI Reference',
              to: '/docs/cli-reference',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/orgs/rapidrest/discussions',
            },
            {
              label: 'Issues',
              href: 'https://github.com/rapidrest/service-core/issues',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/rapidrest',
            },
            {
              label: 'npm',
              href: 'https://www.npmjs.com/org/rapidrest',
            },
          ],
        },
      ],
      // TODO: confirm the legal entity name for copyright
      copyright: `Copyright © ${new Date().getFullYear()} RapidREST. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
