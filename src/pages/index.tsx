import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import CodeShowcase from '@site/src/components/CodeShowcase';
import PerformanceComparison from '@site/src/components/PerformanceComparison';
import CopyCommand from '@site/src/components/CopyCommand';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className={styles.heroLede}>
          Build REST APIs with decorators and auto-generated CRUD, then render
          React on the server from the same project — no second framework, no
          separate build pipeline, powered by uWebSockets.js.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--lg" to="/docs/intro">
            Get Started
          </Link>
          <Link
            className={clsx('button button--lg button--outline button--secondary', styles.secondaryButton)}
            href="https://github.com/rapidrest">
            View on GitHub
          </Link>
        </div>
        <CopyCommand command="npx @rapidrest/cli generate server my-api" />
      </div>
    </header>
  );
}

function WhyRapidREST() {
  return (
    <section className={styles.whySection}>
      <div className="container">
        <div className={styles.whyGrid}>
          <div>
            <Heading as="h2">What you'd otherwise stitch together</Heading>
            <p>
              A typical Node.js API ends up assembling a web framework, a
              validation layer, an ORM, an auth strategy, an OpenAPI generator —
              and, if you also need server-rendered pages, a second framework
              and build pipeline on top of it all. RapidREST bundles the parts
              almost every API needs, and stays out of your way for the rest.
            </p>
          </div>
          <ul className={styles.whyList}>
            <li>Web framework <span>→</span> included, on uWebSockets.js</li>
            <li>Validation &amp; auth <span>→</span> included, decorator-based</li>
            <li>ORM / datastore access <span>→</span> included (Mongo, SQL, Redis)</li>
            <li>OpenAPI docs <span>→</span> generated from the same decorators</li>
            <li>Server-rendered React <span>→</span> included, same project</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function CliBand() {
  return (
    <section className={styles.cliBand}>
      <div className="container">
        <Heading as="h2">From nothing to running in four commands</Heading>
        <div className={styles.cliSteps}>
          <CodeStep n={1} cmd="npm install -g @rapidrest/cli" label="Install the CLI" />
          <CodeStep n={2} cmd="rapidrest generate server my-api" label="Scaffold a project" />
          <CodeStep n={3} cmd="rapidrest generate route Pet --model" label="Add a model + CRUD routes" />
          <CodeStep n={4} cmd="rapidrest dev" label="Run it, in-memory databases included" />
        </div>
      </div>
    </section>
  );
}

function CodeStep({n, cmd, label}: {n: number; cmd: string; label: string}) {
  return (
    <div className={styles.cliStep}>
      <span className={styles.cliStepNumber}>{n}</span>
      <div>
        <code className={styles.cliStepCmd}>{cmd}</code>
        <p className={styles.cliStepLabel}>{label}</p>
      </div>
    </div>
  );
}

function FooterCta() {
  return (
    <section className={styles.footerCta}>
      <div className="container">
        <Heading as="h2">Ready to ship your API?</Heading>
        <p>Get a running RapidREST project in under a minute.</p>
        <Link className="button button--lg button--secondary" to="/docs/intro">
          Get Started
        </Link>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="RapidREST is a TypeScript framework for rapidly building REST APIs, with first-class server-side-rendered React support built in.">
      <HomepageHeader />
      <main>
        <CodeShowcase />
        <HomepageFeatures />
        <PerformanceComparison />
        <WhyRapidREST />
        <CliBand />
        <FooterCta />
      </main>
    </Layout>
  );
}
