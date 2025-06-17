
import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/BlogPost.module.css';

export default function MakeGoogleDriveRestrictedScopesPost() {
  const router = useRouter();

  return (
    <section className={styles.blogPost}>
      <h1>How to Automate Blog Publishing with n8n</h1>
      <p><em>2025-06-17</em></p>
      <div>
        n8n is a powerful workflow automation tool that lets you connect different services easily.<br />In this guide, we’ll show you how to publish a blog post from a Google Doc into your GitHub repo automatically.<br />## 🛠️ Step 1: Format Your Google Doc<br />Make sure your doc includes a clear title and uses standard paragraphs. Avoid special formatting for now.<br />## 🚀 Step 2: Trigger the Workflow<br />Once your doc is ready, trigger the n8n automation to convert the content and update the JSX file in GitHub.<br />## ✅ Final Notes<br />This method works best for structured content like blog posts, documentation, or changelogs.
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
