import type {ReactNode} from 'react';
import styles from './styles.module.css';

export type BarChartRow = {
  label: string;
  value: number;
  highlight?: boolean;
};

type Props = {
  rows: BarChartRow[];
  unit?: string;
  ariaLabel: string;
  formatValue?: (value: number) => string;
};

const defaultFormat = (value: number): string =>
  value.toLocaleString(undefined, {maximumFractionDigits: value < 100 ? 1 : 0});

export default function BarChart({rows, unit = '', ariaLabel, formatValue = defaultFormat}: Props): ReactNode {
  const max = Math.max(...rows.map((r) => r.value));

  return (
    <div className={styles.chart} role="img" aria-label={ariaLabel}>
      {rows.map((row) => (
        <div className={styles.row} key={row.label}>
          <span className={styles.rowLabel}>{row.label}</span>
          <div className={styles.track}>
            <div
              className={row.highlight ? styles.barHighlight : styles.bar}
              style={{width: `${max > 0 ? (row.value / max) * 100 : 0}%`}}
            />
          </div>
          <span className={styles.rowValue}>
            {formatValue(row.value)}
            {unit ? ` ${unit}` : ''}
          </span>
        </div>
      ))}
    </div>
  );
}
