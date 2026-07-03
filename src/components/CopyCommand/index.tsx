import {useState, type ReactNode} from 'react';
import styles from './styles.module.css';

export default function CopyCommand({command}: {command: string}): ReactNode {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(command).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    }
  };

  return (
    <button type="button" className={styles.copyCommand} onClick={handleCopy}>
      <span className={styles.prompt}>$</span>
      <code className={styles.command}>{command}</code>
      <span className={styles.copyHint}>{copied ? 'Copied!' : 'Copy'}</span>
    </button>
  );
}
