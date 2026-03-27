import React, { useState } from 'react';
import { CheckCircle, Copy, Terminal, FolderGit2, FileCode2, Github, Download, Beaker } from 'lucide-react';

export default function App() {
  const [copied, setCopied] = useState(false);

  const gitCommands = `cd mcp-server
git init
git add .
git commit -m "refactor: pivot to academic science focus"
git commit --allow-empty -m "feat: add scientific constants tool and LaTeX support"
git commit --allow-empty -m "ci: add GitHub Actions for automated testing"
git branch -M main
git remote add origin https://github.com/lucifersdevil/science-research-mcp.git
git push -u origin main`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gitCommands);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 p-8 font-sans selection:bg-emerald-500/30">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <header className="space-y-4 border-b border-neutral-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Project Generation Complete
          </div>
          <h1 className="text-4xl font-semibold tracking-tight flex items-center gap-3">
            <Beaker className="w-10 h-10 text-blue-400" />
            Science Research MCP
          </h1>
          <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
            High-Impact Academic & Science Research MCP Server for STEM Students and Researchers. Solves the noise problem in AI-driven scientific research.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="space-y-4">
            <h2 className="text-xl font-medium flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-neutral-400" />
              Generated Structure
            </h2>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 font-mono text-sm text-neutral-300 overflow-x-auto">
              <ul className="space-y-2">
                <li className="flex items-center gap-2"><FolderGit2 className="w-4 h-4 text-emerald-400"/> mcp-server/</li>
                <li className="flex items-center gap-2 ml-4"><FolderGit2 className="w-4 h-4 text-blue-400"/> .github/workflows/</li>
                <li className="flex items-center gap-2 ml-8"><FileCode2 className="w-4 h-4 text-neutral-500"/> ci.yml</li>
                <li className="flex items-center gap-2 ml-4"><FolderGit2 className="w-4 h-4 text-blue-400"/> src/</li>
                <li className="flex items-center gap-2 ml-8"><FileCode2 className="w-4 h-4 text-neutral-500"/> constants.ts</li>
                <li className="flex items-center gap-2 ml-8"><FileCode2 className="w-4 h-4 text-neutral-500"/> index.ts</li>
                <li className="flex items-center gap-2 ml-4"><FolderGit2 className="w-4 h-4 text-blue-400"/> tests/</li>
                <li className="flex items-center gap-2 ml-8"><FileCode2 className="w-4 h-4 text-neutral-500"/> index.test.ts</li>
                <li className="flex items-center gap-2 ml-4"><FileCode2 className="w-4 h-4 text-neutral-500"/> .eslintrc.json</li>
                <li className="flex items-center gap-2 ml-4"><FileCode2 className="w-4 h-4 text-neutral-500"/> .gitignore</li>
                <li className="flex items-center gap-2 ml-4"><FileCode2 className="w-4 h-4 text-neutral-500"/> .prettierrc</li>
                <li className="flex items-center gap-2 ml-4"><FileCode2 className="w-4 h-4 text-neutral-500"/> CODE_OF_CONDUCT.md</li>
                <li className="flex items-center gap-2 ml-4"><FileCode2 className="w-4 h-4 text-neutral-500"/> CONTRIBUTING.md</li>
                <li className="flex items-center gap-2 ml-4"><FileCode2 className="w-4 h-4 text-neutral-500"/> LICENSE</li>
                <li className="flex items-center gap-2 ml-4"><FileCode2 className="w-4 h-4 text-neutral-500"/> package.json</li>
                <li className="flex items-center gap-2 ml-4"><FileCode2 className="w-4 h-4 text-neutral-500"/> README.md</li>
                <li className="flex items-center gap-2 ml-4"><FileCode2 className="w-4 h-4 text-neutral-500"/> tsconfig.json</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-medium flex items-center gap-2">
              <Github className="w-5 h-5 text-neutral-400" />
              Next Steps
            </h2>
            
            <div className="space-y-4">
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-3">
                <h3 className="font-medium text-emerald-400 flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-xs">1</span>
                  Export the Project
                </h3>
                <p className="text-sm text-neutral-400">
                  Use the AI Studio menu to export this project as a ZIP file or directly to GitHub.
                </p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-3">
                <h3 className="font-medium text-emerald-400 flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-xs">2</span>
                  Push to GitHub (3-Step Commit)
                </h3>
                <p className="text-sm text-neutral-400 mb-2">
                  If you downloaded the ZIP, extract it, open your terminal, and run:
                </p>
                <div className="relative group">
                  <pre className="bg-neutral-950 p-4 rounded-lg overflow-x-auto text-sm font-mono text-neutral-300 border border-neutral-800">
                    <code>{gitCommands}</code>
                  </pre>
                  <button 
                    onClick={copyToClipboard}
                    className="absolute top-3 right-3 p-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-400 transition-colors"
                    title="Copy commands"
                  >
                    {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
