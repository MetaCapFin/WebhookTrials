import React from 'react';
import styles from '../../styles/BlogPost.module.css'; // update path if needed

export default function MakeGoogleDriveRestrictedScopesPost() {
  return (
    <section className={styles.blogPost}>
      <h1 className={styles.title}>
        Why Make.com Can’t Watch Your Google Drive (If You're Using Gmail)
      </h1>
      <p>
        If you’re trying to automate your content workflow with <a href="https://make.com" target="_blank" rel="noopener noreferrer">Make.com</a> and Google Docs, you may hit a frustrating error when using the <strong>“Watch Files in Folder”</strong> module with a personal Gmail account:
      </p>
      <blockquote>
        <em>"It is not possible to use restricted scopes with customer @gmail.com accounts."</em>
      </blockquote>
      <h2>🔐 What Are "Restricted Scopes"?</h2>
      <p>
        Google's APIs use OAuth scopes to control what external apps can access. Some scopes are “restricted,” meaning they’re only available to <strong>Google Workspace</strong> accounts.
      </p>
      <h2>💡 Why This Matters for Automation</h2>
      <p>
        If you’re using a personal Gmail address, Make.com <strong>cannot gain permission</strong> to use those restricted scopes. That means:
      </p>
      <ul>
        <li>No “Watch Files in Folder” trigger</li>
        <li>Permission errors even after connecting Google Drive</li>
      </ul>
      <h2>✅ Workaround #1: Use Google Workspace</h2>
      <p>
        Upgrade to a Google Workspace account (like you@yourdomain.com) to allow Make.com full permissions to your Drive. This is the recommended fix.
      </p>
      <h2>🔁 Workaround #2: Poll Instead of Watch</h2>
      <p>
        If Workspace isn’t an option, use Make.com to poll Drive every 5–15 minutes:
      </p>
      <ol>
        <li>Use <code>Search for Files/Folders</code></li>
        <li>Filter by a folder ID and time range</li>
        <li>Process each new file in your scenario</li>
      </ol>
      <h2>🛠️ Example: Weekly Blog Post Pipeline</h2>
      <p>
        Drop your blog draft into a specific folder, and Make.com can read it on a schedule and publish it using a webhook or CMS API.
      </p>
      <h2>🧠 Final Thoughts</h2>
      <p>
        Google restricts real-time file triggers for personal Gmail users. But with polling or a Workspace upgrade, you can still build a powerful no-code publishing workflow.
      </p>
      <p><strong>TL;DR:</strong> Use Google Workspace for real-time triggers, or use polling as a workaround for Gmail accounts.</p>
    </section>
  );
}
