
import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/BlogPost.module.css';

export default function MakeGoogleDriveRestrictedScopesPost() {
  const router = useRouter();

  return (
    <section className={styles.blogPost}>
      <h1>Untitled Post</h1>
      <p><em>2025-06-17</em></p>
      <div>
        
      </div>
      <button
        className={styles.backButton}
        onClick={() => router.push('/')}
        type="button"
      >
        ← Back to Home
      </button>
    </section>
  );
}
