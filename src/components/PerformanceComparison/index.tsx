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
          <Heading as="h2">Fast where it counts</Heading>
          <p>
            RapidREST leads on every endpoint bound by framework overhead, and is
            neck-and-neck with Express and Fastify on the endpoints bound by
            password hashing instead — see the full breakdown for why that's the
            honest way to read it.
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
          Requests/sec on <code>get_pet</code>, k6 load test, 3-run average.{' '}
          <Link to="/docs/performance">Full methodology &amp; more endpoints →</Link>
        </p>
      </div>
    </section>
  );
}
