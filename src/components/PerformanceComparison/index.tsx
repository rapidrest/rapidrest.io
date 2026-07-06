import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type Row = {
  label: string;
  value: number;
  highlight?: boolean;
};

const rows: Row[] = [
  {label: 'RapidREST', value: 9396, highlight: true},
  {label: 'Fastify', value: 8263},
  {label: 'Express', value: 7565},
  {label: 'Next.js', value: 2056},
];

const max = Math.max(...rows.map((r) => r.value));

export default function PerformanceComparison(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <Heading as="h2">RapidREST is incredibly fast</Heading>
          <p>
            RapidREST delivers best-in-class performance out of the box for common workloads compared to other popular frameworks.
          </p>
        </div>
        <div className={styles.chart} role="img" aria-label="Requests per second on the get_pet endpoint: RapidREST 9,396, Fastify 8,263, Express 7,565, Next.js 2,056">
          {rows.map((row) => (
            <div className={styles.row} key={row.label}>
              <span className={styles.rowLabel}>{row.label}</span>
              <div className={styles.track}>
                <div
                  className={row.highlight ? styles.barHighlight : styles.bar}
                  style={{width: `${(row.value / max) * 100}%`}}
                />
              </div>
              <span className={styles.rowValue}>{row.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <p className={styles.caption}>
          Requests per second on single record database read test <code>get_pet</code>.<br/>
          <Link to="/docs/performance">Full methodology &amp; more endpoints →</Link>
        </p>
      </div>
    </section>
  );
}
