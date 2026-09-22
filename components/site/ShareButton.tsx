'use client';

import { useState } from 'react';
import { Share2, Check, Link2 } from 'lucide-react';

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = typeof window !== 'undefined' ? window.location.href : '';

    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, url });
        return;
      } catch {
        // User cancelled or share failed — fall through to copy
      }
    }

    let success = false;
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        success = true;
      } catch {
        // Clipboard API may be blocked — use fallback
      }
    }

    if (!success) {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        success = document.execCommand('copy');
      } catch {
        success = false;
      }
      document.body.removeChild(textarea);
    }

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Share this article"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-success" />
          <span className="text-success">Link Copied!</span>
        </>
      ) : (
        <>
          <Link2 className="h-4 w-4" />
          Share
          <Share2 className="h-3.5 w-3.5 opacity-50" />
        </>
      )}
    </button>
  );
}
