import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import {
  BoltIcon,
  DecoratorIcon,
  DatabaseIcon,
  ReactIcon,
  PlugIcon,
  ShieldIcon,
} from './icons';

type FeatureItem = {
  title: string;
  Icon: React.ComponentType<{className?: string}>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Built for throughput',
    Icon: BoltIcon,
    description: (
      <>
        Runs on <a href="https://github.com/uNetworking/uWebSockets.js">uWebSockets.js</a>
        {' '}instead of Express, so the framework stays out of the way under load.
      </>
    ),
  },
  {
    title: 'Decorator-driven, zero boilerplate',
    Icon: DecoratorIcon,
    description: (
      <>
        Export a class from anywhere in <code>src/</code> and it's discovered and
        wired up automatically — no central router or registration file to maintain.
      </>
    ),
  },
  {
    title: 'CRUD & OpenAPI, generated',
    Icon: DatabaseIcon,
    description: (
      <>
        Annotate a model and get Create/Find/Update/Delete endpoints and a live{' '}
        <code>/openapi.json</code> spec for free.
      </>
    ),
  },
  {
    title: 'First-class SSR React',
    Icon: ReactIcon,
    description: (
      <>
        A file-convention <code>app/</code> directory renders React on the server,
        with data fetching wired into the same dependency injection as your API.
      </>
    ),
  },
  {
    title: 'Zero-setup local dev',
    Icon: PlugIcon,
    description: (
      <>
        <code>rapidrest dev</code> spins up in-memory MongoDB, PostgreSQL, and Redis
        automatically — no local database installation required.
      </>
    ),
  },
  {
    title: 'Auth & RBAC, built in',
    Icon: ShieldIcon,
    description: (
      <>
        JWT auth and role/record-level access control ship with the framework —
        no separate library to bolt on.
      </>
    ),
  },
];

function Feature({title, Icon, description}: FeatureItem) {
  return (
    <div className={styles.featureCol}>
      <div className={styles.featureCard}>
        <div className={styles.featureIconWrap}>
          <Icon className={styles.featureIcon} />
        </div>
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
