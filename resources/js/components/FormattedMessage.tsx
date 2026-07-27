import React, { useState } from "react";

interface CopyButtonProps {
  text: string;
  label?: string;
}

export function CopyButton({ text, label = "Salin" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {}
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="px-2 py-0.5 text-[9px] font-black uppercase border border-current transition-all cursor-pointer hover:opacity-80 flex items-center gap-1 bg-black/10 active:scale-95"
      title="Salin Pesan / Kode"
    >
      {copied ? (
        <>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Tersalin!
        </>
      ) : (
        <>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}

interface FormattedMessageProps {
  text: string;
  isUser?: boolean;
}

export function FormattedMessage({ text, isUser }: FormattedMessageProps) {
  // Regex to split by ``` code blocks
  const parts = text.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2 text-xs leading-relaxed font-sans">
      {parts.map((part, idx) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          // Extract language and code
          const raw = part.slice(3, -3).trim();
          const firstLineEnd = raw.indexOf("\n");
          let lang = "CODE";
          let code = raw;
          if (firstLineEnd !== -1) {
            const possibleLang = raw.slice(0, firstLineEnd).trim();
            if (possibleLang && !possibleLang.includes(" ") && possibleLang.length < 15) {
              lang = possibleLang.toUpperCase();
              code = raw.slice(firstLineEnd + 1);
            }
          }

          return (
            <div
              key={idx}
              className="my-2 border-2 border-[var(--nb-primary)] bg-[#0f172a] text-[#f8fafc] rounded-sm overflow-hidden font-mono shadow-[3px_3px_0_var(--nb-primary)] text-left"
            >
              {/* Code Box Header */}
              <div className="bg-[#1e293b] px-3 py-1.5 border-b-2 border-[var(--nb-primary)] flex items-center justify-between text-[10px] font-black text-[#94a3b8]">
                <span className="tracking-widest flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                  {lang}
                </span>
                <CopyButton text={code} label="Copy Code" />
              </div>
              {/* Code Body */}
              <pre className="p-3 overflow-x-auto text-[11px] leading-snug whitespace-pre font-mono selection:bg-cyan-600">
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        // Inline formatting for non-code text (bold, inline code)
        const formatInline = (str: string) => {
          const boldParts = str.split(/(\*\*[\s\S]*?\*\*)/g);
          return boldParts.map((bPart, bIdx) => {
            if (bPart.startsWith("**") && bPart.endsWith("**")) {
              return <strong key={bIdx} className="font-black underline decoration-2">{bPart.slice(2, -2)}</strong>;
            }
            const codeParts = bPart.split(/(`[^`]+`)/g);
            return codeParts.map((cPart, cIdx) => {
              if (cPart.startsWith("`") && cPart.endsWith("`")) {
                return (
                  <code key={cIdx} className="bg-black/10 px-1.5 py-0.5 rounded font-mono text-[11px] font-bold border border-current">
                    {cPart.slice(1, -1)}
                  </code>
                );
              }
              return cPart;
            });
          });
        };

        const lines = part.split("\n");
        return (
          <div key={idx} className="space-y-1">
            {lines.map((line, lIdx) => (
              <p key={lIdx} className={line.trim() === "" ? "h-2" : ""}>
                {formatInline(line)}
              </p>
            ))}
          </div>
        );
      })}

      {/* Copy Message Button at bottom */}
      <div className="flex justify-end mt-2 pt-1 border-t border-current/20">
        <CopyButton text={text} label="Copy Text" />
      </div>
    </div>
  );
}
