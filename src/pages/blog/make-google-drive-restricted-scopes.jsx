import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/BlogPost.module.css';

export default function MakeGoogleDriveRestrictedScopesPost() {
  const router = useRouter();
  return (
    <section className={styles.blogPost}>
      <h1>Automating Blog Publishing with Backup in n8n</h1>
      <p><em>2025-06-17</em></p>
      <div><p>In this tutorial, we set up an n8n workflow that takes a Google Doc, makes a backup copy of it in Drive, converts its content into a Next.js/React JSX blog post, and then updates an existing file in our GitHub repo.</p>

<p>## Key Steps</p>

<p>1. **List Google Docs in Drive**      We used the Google Drive node in “List” mode with a query string filtering our blog folder for Google Docs.</p>

<p>2. **Fetch the Doc Content**      The Google Docs node (“Get”) pulled in our document’s raw text into the workflow.</p>

<p>3. **Backup the Original Doc**      Before any changes, we duplicated the doc by using a Google Docs “Create” node, titling it `Blog Backup – YYYY‑MM‑DD`, and saving it alongside the original.</p>

<p>4. **Convert to JSX**      A Function node:    - Extracts the “Title:” header    - Splits the body on double‑newlines into paragraphs    - Wraps each paragraph in `<p>…</p>` for proper HTML semantics    - Builds a complete React component with a dynamic date and back‑button</p>

<p>5. **Update GitHub File**      Finally, the GitHub node (operation: “Edit File”) overwrote our existing `make-google-drive-restricted-scopes.jsx` with the newly generated JSX content.</p>

<p>## Benefits</p>

<p>- **Automated backups** guard against accidental overwrites.   - **Semantic paragraph tags** ensure readable blog output.   - **One-click manual trigger** lets you review before you publish—or you can swap in a Cron/Drive‑watch trigger later.</p>

<p>---</p>

<p>Paste the above into a fresh Google Doc and run your “Execute Workflow” in n8n to see each step in action!</p></div>
      <button className={styles.backButton} onClick={() => router.push('/')} type="button">← Back to Home</button>
    </section>
  );
}