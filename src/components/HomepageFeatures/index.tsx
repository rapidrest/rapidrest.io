import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import {
  BoltIcon,
  DecoratorIcon,
  DatabaseIcon,
  CacheIcon,
  BoxIcon,
  ShieldIcon,
} from './icons';

type FeatureItem = {
  title: string;
  Icon: React.ComponentType<{className?: string}>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Built for speed',
    Icon: BoltIcon,
    description: (
      <>
        Runs on the high-performance native HTTP library <a href="https://github.com/uNetworking/uWebSockets.js">uWebSockets.js</a>
        {' '} so the framework stays out of the way under load.
      </>
    ),
  },
  {
    title: 'Decorator-driven, zero boilerplate',
    Icon: DecoratorIcon,
    description: (
      <>
        Automatically inject dependencies and wire API endpoints with decorators in code — no central app/router or registration files to maintain.
      </>
    ),
  },
  {
    title: 'Database Support',
    Icon: DatabaseIcon,
    description: (
      <>
        Whether you prefer MongoDB or SQL, the built-in ORM layer and CRUD endpoints eliminates the boilerplate needed to build data-driven APIs and apps.
      </>
    ),
  },
  {
    title: 'Auth & RBAC',
    Icon: ShieldIcon,
    description: (
      <>
        JWT authentication and a powerful RBAC/ACL system for per-URL/class/document access control, built in, no separate
        library needed. Full login flows (password, MFA, OAuth) are one optional package away.
      </>
    ),
  },
  {
    title: 'Cache System',
    Icon: CacheIcon,
    description: (
      <>
        The Redis based built-in caching system provides automatic caching of queries, documents, and server rendered React
        pages. Simply add `@Cache` to your model and you're done!
      </>
    ),
  },
  {
    title: 'Deploy-ready',
    Icon: BoxIcon,
    description: (
      <>
        One command scaffolds a production Dockerfile and a Kubernetes Helm chart, Gateway API routing, auto-generated secrets, and
        all, alongside your project. Prefer Bun to Node.js? One flag runs it there instead.
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
