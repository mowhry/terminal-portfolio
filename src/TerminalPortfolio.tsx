import React, { useEffect, useMemo, useRef, useState, type JSX } from 'react'

const CV_PATH = '/CV_LaTeX_US.pdf'


type Line = { id: string; node: React.ReactNode }
type CommandHandler = (args: string[]) => void

const Prompt: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div>
    <span className="text-blue-500">jessim@dev</span>:~$ {children}
  </div>
)

const initialBanner: Line[] = [
  { id: 'b1', node: <div className="text-sm text-slate-300">Welcome — type <span className="font-semibold">help</span> to see commands.</div> }
]

const PROJECTS = [
  { id: 1, name: 'ft_transcendence', desc: 'Real-time Pong/Snake · WebSockets · Docker · SQLite · TS/Node', url: 'https://github.com/mowhry/ft_transcendence' },
  { id: 2, name: 'ft_irc',         desc: 'RFC1459-compliant IRC server · C++ · network protocols · non-blocking I/O',                url: 'https://github.com/mowhry/ft_irc' },
  { id: 3, name: 'Cub3D',          desc: 'Raycasting engine · C · textures · sprites · collisions',         url: 'https://github.com/mowhry/cub3d' },
  { id: 4, name: 'Philosophers',   desc: 'POSIX threads · deadlock prevention · monitors',                  url: 'https://github.com/mowhry/philosophers' },
  { id: 5, name: 'Inception',      desc: 'Docker Compose · Nginx · WordPress · MariaDB · TLS',              url: 'https://github.com/mowhry/inception' },
];

export default function TerminalPortfolio(): JSX.Element {
  const [lines, setLines] = useState<Line[]>(initialBanner)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIndex, setHistIndex] = useState<number | null>(null)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => { inputRef.current?.focus() }, [])
  useEffect(() => { containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' }) }, [lines])

  const commandList = useMemo(
    () => ['help','about','projects','project','skills','contact','cv','clear'],
    []
  )

  function addLine(node: React.ReactNode) {
    setLines(prev => {
      const next = [...prev, { id: cryptoRandom(), node }]
      return next.length > 400 ? next.slice(next.length - 400) : next
    })
  }

  function cryptoRandom() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36)
  }

  function handleCommand(raw: string) {
    const cmd = raw.trim()
    if (!cmd) return

    // echo the command
    addLine(<Prompt>{cmd}</Prompt>)

    setHistory(h => [cmd, ...h].slice(0, 100))
    setHistIndex(null)

    const parts = cmd.split(' ').filter(Boolean)
    const base = parts[0]?.toLowerCase() ?? ''
    const args = parts.slice(1)

    const handlers: Record<string, CommandHandler> = {
      help: () => {
        addLine(<div className="space-y-0.5">
          <div className="font-semibold">Available commands</div>
          <div>help — show this help</div>
          <div>about — who am I</div>
          <div>projects — list projects</div>
          <div>project &lt;id&gt; — show project details</div>
          <div>skills — technical skills</div>
          <div>contact — contact info</div>
		  <div>cv [-o|-d] — open in new tab or download the PDF</div>
          <div>clear — clear terminal</div>
        </div>)
      },
      about: () => {
        addLine(<div className="space-y-0.5">
          <div className="font-semibold">About</div>
          <div>I'm Jessim Skiba, a software engineering student @42 Paris.</div>
          <div>Systems programming, networks, looking for a 6-month internship. I build scalable, reliable tools and products.</div>
        </div>)
      },
      projects: () => {
        addLine(<div className="font-semibold">Projects</div>)
        PROJECTS.forEach(p => addLine(<div>{p.id}. <span className="underline underline-offset-2">{p.name}</span> — {p.desc}</div>))
        addLine(<div className="text-slate-400">Use <span className="font-semibold">project &lt;id&gt;</span> to see details.</div>)
      },
      project: (args) => {
        const id = Number(args[0])
        const p = PROJECTS.find(pp => pp.id === id)
        if (!id || !p) return addLine(<div className="text-amber-300">Project not found. Try: projects</div>)
        addLine(<div className="space-y-0.5">
          <div className="font-semibold">{p.name}</div>
          <div>{p.desc}</div>
          <div>URL: <a className="underline" href={p.url} target="_blank" rel="noreferrer">{p.url}</a></div>
        </div>)
      },
      skills: () => {
        addLine(
          <div className="space-y-0.5">
            <div className="font-semibold">Skills</div>
            <div>
              <span className="font-semibold underline underline-offset-2 decoration-2">
                Languages:
              </span>{' '}
              C/C++, Python, JavaScript/TypeScript, SQL, Bash
            </div>
            <div>
              <span className="font-semibold underline underline-offset-2 decoration-2">
                Tools & Practices:
              </span>{' '}
              Git, CI/CD, Unit Testing, Nginx, REST APIs, Agile Development
            </div>
            <div>
              <span className="font-semibold underline underline-offset-2 decoration-2">
                Systems:
              </span>{' '}
              Linux (Ubuntu, Arch), Docker, POSIX threads, TCP/IP, Memory Management, Shell Programming
            </div>
            <div>
              <span className="font-semibold underline underline-offset-2 decoration-2">
                Core CS:
              </span>{' '}
              Data Structures, Algorithms, Time/Space Complexity Analysis, Concurrent Programming, Network Protocol
            </div>
            <div>
              <span className="font-semibold underline underline-offset-2 decoration-2">
                Web Technologies:
              </span>{' '}
              Node.js, Fastify, SQLite, HTML5/CSS3, Tailwind, Real-time WebSockets
            </div>
          </div>
        )
      },
      contact: () => {
        addLine(<div className="space-y-0.5">
          <div className="font-semibold">Contact</div>
          <div>
            Email: <button type="button" className="underline" onClick={() => {
              navigator.clipboard.writeText('jskiba@student.42.fr')
              addLine(<div>Copied email to clipboard ✅</div>)
            }}>jskiba@student.42.fr</button>
          </div>
          <div>GitHub: <a className="underline" href="https://github.com/mowhry" target="_blank" rel="noreferrer">github.com/mowhry</a></div>
		  <div>Linkedin: <a className="underline" href="https://linkedin.com/in/jessim-skiba" target="_blank" rel="noreferrer">linkedin.com/jessim-skiba</a></div>
        </div>)
      },
	  cv: () => {
		const mode = (args[0] || 'open').toLowerCase()
		const fileName = CV_PATH.split('/').pop() || 'CV.pdf'
		if (mode === 'download' || mode === '-d') {
			addLine(<div>Downloading CV…</div>)
			const a = document.createElement('a')
			a.href = CV_PATH
			a.download = fileName
			document.body.appendChild(a)
			a.click()
			a.remove()
		} else {
			addLine(<div>Opening CV in a new tab…</div>)
			window.open(CV_PATH, '_blank', 'noopener,noreferrer')
  }
	  },
      clear: () => setLines([]),
    }

    if (base in handlers) handlers[base](args)
    else addLine(<div className="text-amber-300">Command not found: {base}. Type <span className="font-semibold">help</span>.</div>)
  }

  function onSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    const value = input
    setInput('')
    handleCommand(value)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') return onSubmit()

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const next = histIndex === null ? 0 : Math.min(histIndex + 1, history.length - 1)
      setHistIndex(next)
      setInput(history[next] ?? '')
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (history.length === 0 || histIndex === null) return
      const next = histIndex - 1
      if (next < 0) { setHistIndex(null); setInput('') } else { setHistIndex(next); setInput(history[next] ?? '') }
    }

    if (e.key === 'Tab') {
      e.preventDefault()
      const v = input.trim()
      if (!v) return
      const match = commandList.find(c => c.startsWith(v))
      if (match) setInput(match + (match === 'project' ? ' ' : ''))
    }
  }

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-slate-800/60 bg-gradient-to-b from-black/60 to-slate-900/40">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-black/60 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 text-xs opacity-60 select-none">~/portfolio</div>
          {/* (no theme button) */}
        </div>

        {/* Scrollable output */}
        <div ref={containerRef} className="p-5 h-[65vh] overflow-y-auto font-mono text-sm">
          {lines.map(l => (<div key={l.id} className="mb-1 break-words">{l.node}</div>))}

          {/* Prompt */}
          <form onSubmit={onSubmit} className="mt-2">
            <label className="flex items-center gap-3">
              <span className="text-blue-500">jessim@dev</span>:~$
              <input
                ref={inputRef}
                className="bg-transparent outline-none flex-1 caret-blue-300 placeholder-slate-500"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                spellCheck={false}
                placeholder="type 'help'"
              />
            </label>
          </form>
        </div>
      </div>
    </div>
  )
}
