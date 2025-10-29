'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TokenInputProps {
  selectedPlatform: 'github' | 'gitlab' | 'bitbucket' | 'codeberg';
  setSelectedPlatform: (value: 'github' | 'gitlab' | 'bitbucket' | 'codeberg') => void;
  accessToken: string;
  setAccessToken: (value: string) => void;
  showTokenSection?: boolean;
  onToggleTokenSection?: () => void;
  allowPlatformChange?: boolean;
}

export default function TokenInput({
  selectedPlatform,
  setSelectedPlatform,
  accessToken,
  setAccessToken,
  showTokenSection = true,
  onToggleTokenSection,
  allowPlatformChange = true
}: TokenInputProps) {
  const { messages: t } = useLanguage();

  const platformName = selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1);
  const isCodeberg = selectedPlatform === 'codeberg';

  return (
    <div className="mb-4">
      {onToggleTokenSection && (
        <button
          type="button"
          onClick={onToggleTokenSection}
          className="text-sm text-[var(--accent-primary)] hover:text-[var(--highlight)] flex items-center transition-colors border-b border-[var(--border-color)] hover:border-[var(--accent-primary)] pb-0.5 mb-2"
        >
          {showTokenSection ? t.form?.hideTokens || 'Hide Access Tokens' : t.form?.addTokens || 'Add Access Tokens for Private Repositories'}
        </button>
      )}

      {showTokenSection && (
        <div className="mt-2 p-4 bg-[var(--background)]/50 rounded-md border border-[var(--border-color)]">
          {allowPlatformChange && (
            <div className="mb-3">
              <label className="block text-xs font-medium text-[var(--foreground)] mb-2">
                {t.form?.selectPlatform || 'Select Platform'}
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPlatform('github')}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border transition-all ${selectedPlatform === 'github'
                    ? 'bg-[var(--accent-primary)]/10 border-[var(--accent-primary)] text-[var(--accent-primary)] shadow-sm'
                    : 'border-[var(--border-color)] text-[var(--foreground)] hover:bg-[var(--background)]'
                    }`}
                >
                  <span className="text-sm">GitHub</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPlatform('gitlab')}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border transition-all ${selectedPlatform === 'gitlab'
                    ? 'bg-[var(--accent-primary)]/10 border-[var(--accent-primary)] text-[var(--accent-primary)] shadow-sm'
                    : 'border-[var(--border-color)] text-[var(--foreground)] hover:bg-[var(--background)]'
                    }`}
                >
                  <span className="text-sm">GitLab</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPlatform('bitbucket')}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border transition-all ${selectedPlatform === 'bitbucket'
                    ? 'bg-[var(--accent-primary)]/10 border-[var(--accent-primary)] text-[var(--accent-primary)] shadow-sm'
                    : 'border-[var(--border-color)] text-[var(--foreground)] hover:bg-[var(--background)]'
                    }`}
                >
                  <span className="text-sm">Bitbucket</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPlatform('codeberg')}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border transition-all ${selectedPlatform === 'codeberg'
                    ? 'bg-[var(--accent-primary)]/10 border-[var(--accent-primary)] text-[var(--accent-primary)] shadow-sm'
                    : 'border-[var(--border-color)] text-[var(--foreground)] hover:bg-[var(--background)]'
                    }`}
                >
                  <span className="text-sm">Codeberg</span>
                </button>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="access-token" className="block text-xs font-medium text-[var(--foreground)] mb-2">
              {(t.form?.personalAccessToken || 'Personal Access Token').replace('{platform}', platformName)}
            </label>
            <input
              id="access-token"
              type="password"
              value={isCodeberg ? '' : accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              placeholder={(t.form?.tokenPlaceholder || 'Enter your access token').replace('{platform}', platformName)}
              className={`input-japanese block w-full px-3 py-2 rounded-md bg-transparent text-[var(--foreground)] focus:outline-none focus:border-[var(--accent-primary)] text-sm ${isCodeberg ? 'opacity-50 cursor-not-allowed border-dashed' : ''}`}
              disabled={isCodeberg}
            />
            {isCodeberg ? (
              <div className="flex items-start mt-2 text-xs text-[var(--muted)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M5.07 19h13.86A2.07 2.07 0 0021 16.93V7.07A2.07 2.07 0 0018.93 5H5.07A2.07 2.07 0 003 7.07v9.86A2.07 2.07 0 005.07 19z" />
                </svg>
                <span>{t.form?.codebergPublicNotice || 'Codeberg support currently works with public repositories only. Access tokens are disabled.'}</span>
              </div>
            ) : (
              <div className="flex items-center mt-2 text-xs text-[var(--muted)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-[var(--muted)]"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t.form?.tokenSecurityNote || 'Your token is stored locally and never sent to our servers.'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}