import React from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
      <div>
          <pre className={styles.codeBlock}>
              console.log('Hello, World!');
          </pre>
      </div>
  );
}