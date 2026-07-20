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

  // Hosted on GitHub Pages at the custom domain rapidrest.dev (see static/CNAME
  // and .github/workflows/deploy.yml).
  url: 'https://rapidrest.dev',
  baseUrl: '/',

  // GitHub org/repo used for deployment + edit links
  organizationName: 'rapidrest',
  projectName: 'rapidrest.io',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // API reference docs are generated from the `core`, `service-core`, `auth`, and
  // `react` sibling repos' TypeScript source (checked out alongside this repo —
  // see .github/workflows/deploy.yml for how CI gets them). Run
  // `yarn generate-typedoc` (or `yarn start`/`yarn build`, which do it for you)
  // to (re)generate.
  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'api-core',
        entryPoints: ['../core/src/index.ts'],
        tsconfig: '../core/tsconfig.json',
        out: './docs/api/core',
        readme: './api-readme/core.md',
        sidebar: {autoConfiguration: true, pretty: true},
        // `@author Name <email>` JSDoc tags render as a bare `<email@domain>`,
        // which MDX's JSX-aware parser tries to read as a tag and fails on the
        // `@`. The tag isn't useful in the reference itself (same author on
        // every file), so drop it rather than fight MDX escaping.
        excludeTags: ['@author'],
        sanitizeComments: true,
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'api-service-core',
        entryPoints: ['../service-core/src/index.ts'],
        tsconfig: '../service-core/tsconfig.json',
        out: './docs/api/service-core',
        readme: './api-readme/service-core.md',
        sidebar: {autoConfiguration: true, pretty: true},
        // `@author Name <email>` JSDoc tags render as a bare `<email@domain>`,
        // which MDX's JSX-aware parser tries to read as a tag and fails on the
        // `@`. The tag isn't useful in the reference itself (same author on
        // every file), so drop it rather than fight MDX escaping.
        excludeTags: ['@author'],
        sanitizeComments: true,
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'api-auth',
        // Three entry points mirror the package's own `.`/`./mongo`/`./sql`
        // export map — one plugin instance produces a combined module tree
        // instead of three separate `out` dirs/sidebar categories.
        entryPoints: ['../auth/src/index.ts', '../auth/src/mongo.ts', '../auth/src/sql.ts'],
        tsconfig: '../auth/tsconfig.json',
        out: './docs/api/auth',
        readme: './api-readme/auth.md',
        sidebar: {autoConfiguration: true, pretty: true},
        // `@author Name <email>` JSDoc tags render as a bare `<email@domain>`,
        // which MDX's JSX-aware parser tries to read as a tag and fails on the
        // `@`. The tag isn't useful in the reference itself (same author on
        // every file), so drop it rather than fight MDX escaping.
        excludeTags: ['@author'],
        sanitizeComments: true,
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'api-react',
        // Only the root `.` export is generated here. Unlike `auth`, `react`'s
        // `./client` and `./vite` subpaths each have their own tsconfig that
        // *excludes* the other entry files (they're built as separate `tsc`
        // passes with different `lib`/`module` settings — see tsconfig.client.json
        // and tsconfig.vite.json in the react repo), so they can't share a single
        // TypeDoc program with index.ts. Both are documented narratively instead,
        // with exact signatures, in SSR React → Hydration & Production Builds.
        entryPoints: ['../react/src/index.ts'],
        tsconfig: '../react/tsconfig.json',
        out: './docs/api/react',
        readme: './api-readme/react.md',
        sidebar: {autoConfiguration: true, pretty: true},
        // `@author Name <email>` JSDoc tags render as a bare `<email@domain>`,
        // which MDX's JSX-aware parser tries to read as a tag and fails on the
        // `@`. The tag isn't useful in the reference itself (same author on
        // every file), so drop it rather than fight MDX escaping.
        excludeTags: ['@author'],
        sanitizeComments: true,
      },
    ],
  ],

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
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API Reference',
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
