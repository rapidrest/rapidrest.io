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
          <b>RapidREST</b> is a battle-tested, opinionated, TypeScript framework for rapidly building <i>RESTful</i> API services and apps.
          Offering a robust feature set with best-in-class performance in an easy to use decorator based
          framework, it's never been easier to build scalable API services and web apps with Node.js.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--lg" to="/docs/intro">
            Get Started
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
            <Heading as="h2">Battle Tested + Batteries Included</Heading>
            <p>
              Originally developed to serve as the foundation for the award-winning Game
              Backend as a Service platform <a href="https://acceleratxr.com">AcceleratXR</a>, RapidREST is a battle-tested framework that
              has been used in  real production at scale. The framework is meticulously designed to
              offer everything needed to deliver high-quality production-grade RESTful services and
              apps in minutes.
            </p>
          </div>
          <ul className={styles.whyList}>
            <li>HTTP Engine <span>→</span> built on uWebSockets.js for raw speed</li>
            <li>RBAC &amp; ACLs <span>→</span> URL, class-based and document-level protection</li>
            <li>Database Integration <span>→</span> built-in Mongo &amp; ORM (SQL) layer</li>
            <li>Data Caching <span>→</span> cache queries, documents, pages, and more</li>
            <li>OpenAPI <span>→</span> automatically generates OpenAPI docs from your code</li>
            <li>Server-rendered React <span>→</span> unify your front-end and back-end code</li>
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
        <Heading as="h2">From nothing to running in three steps</Heading>
        <div className={styles.cliSteps}>
          <CodeStep n={1} cmd="npx @rapidrest/cli generate server my-api" label="Scaffold a project" />
          <CodeStep n={2} cmd="rapidrest generate route Pet --model" label="Add a model + CRUD routes" />
          <CodeStep n={3} cmd="rapidrest dev" label="Run it!" />
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
      description="A high performance TypeScript framework for rapidly building RESTful APIs and web apps in minutes.">
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
