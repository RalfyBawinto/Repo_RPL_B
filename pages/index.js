// pages/index.js

import React from 'react';
import styles from '../styles/Home.module.css';

export default function Home({ data }) {
  return (
    <div>
      <h1>Welcome to My Dynamic Website!</h1>
      <p>Here is some data fetched from the server:</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

/*export async function getServerSideProps() {
  // Mengambil data dari API (misalnya data dinamis dari backend)
  const res = await fetch('https://api.example.com/data'); // Ganti dengan API yang sesuai
  const data = await res.json();

  // Mengembalikan data sebagai props
  return {
    props: { data }, // data akan dikirim ke komponen Home
  };
}*/

export default function Home({ data }) {
    return (
      <div className={styles.container}>
        <h1>Welcome to My Dynamic Website!</h1>
        <p>Here is some data fetched from the server:</p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
}