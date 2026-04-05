import { useState, useEffect, useCallback } from 'react'
import './App.css'

const FRAMEWORKS = [
  { name: 'Express',      repo: 'expressjs/express',           language: 'JavaScript' },
  { name: 'FastAPI',      repo: 'tiangolo/fastapi',            language: 'Python'     },
  { name: 'Django',       repo: 'django/django',               language: 'Python'     },
  { name: 'Spring Boot',  repo: 'spring-projects/spring-boot', language: 'Java'       },
  { name: 'Laravel',      repo: 'laravel/laravel',             language: 'PHP'        },
  { name: 'Rails',        repo: 'rails/rails',                 language: 'Ruby'       },
  { name: 'Flask',        repo: 'pallets/flask',               language: 'Python'     },
  { name: 'NestJS',       repo: 'nestjs/nest',                 language: 'TypeScript' },
  { name: 'Gin',          repo: 'gin-gonic/gin',               language: 'Go'         },
  { name: 'Fiber',        repo: 'gofiber/fiber',               language: 'Go'         },
  { name: 'Fastify',      repo: 'fastify/fastify',             language: 'JavaScript' },
  { name: 'Koa',          repo: 'koajs/koa',                   language: 'JavaScript' },
  { name: 'Phoenix',      repo: 'phoenixframework/phoenix',    language: 'Elixir'     },
  { name: 'ASP.NET Core', repo: 'dotnet/aspnetcore',           language: 'C#'         },
  { name: 'Echo',         repo: 'labstack/echo',               language: 'Go'         },
  { name: 'Axum',         repo: 'tokio-rs/axum',               language: 'Rust'       },
  { name: 'Actix Web',    repo: 'actix/actix-web',             language: 'Rust'       },
  { name: 'Hono',         repo: 'honojs/hono',                 language: 'TypeScript' },
  { name: 'Hapi',         repo: 'hapijs/hapi',                 language: 'JavaScript' },
]

const LANG_COLORS = {
  JavaScript: { bg: '#f7df1e22', border: '#f7df1e', text: '#f7df1e' },
  TypeScript: { bg: '#3178c622', border: '#3178c6', text: '#60a5fa' },
  Python:     { bg: '#3572A522', border: '#3572A5', text: '#60b8ff' },
  Java:       { bg: '#b0721922', border: '#b07219', text: '#f59e0b' },
  PHP:        { bg: '#4F5D9522', border: '#4F5D95', text: '#a78bfa' },
  Ruby:       { bg: '#cc342d22', border: '#cc342d', text: '#f87171' },
  Go:         { bg: '#00ADD822', border: '#00ADD8', text: '#22d3ee' },
  Rust:       { bg: '#dea58422', border: '#dea584', text: '#fb923c' },
  Elixir:     { bg: '#6e4a7e22', border: '#6e4a7e', text: '#c084fc' },
  'C#':       { bg: '#17860022', border: '#178600', text: '#4ade80' },
}

const RANK_STYLE = {
  1: { color: '#fbbf24', glow: '0 0 20px #fbbf2440' },
  2: { color: '#94a3b8', glow: '0 0 20px #94a3b820' },
  3: { color: '#cd7f32', glow: '0 0 20px #cd7f3230' },
}

function formatStars(n) {
  if (!n && n !== 0) return '—'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return n.toString()
}

function formatIssues(n) {
  if (!n && n !== 0) return '—'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return n.toString()
}

function SkeletonRow({ index }) {
  return (
    <div className="row skeleton" style={{ animationDelay: `${index * 60}ms` }}>
      <div className="rank-col skeleton-block" style={{ width: 48, height: 48 }} />
      <div className="info-col">
        <div className="skeleton-block" style={{ width: 140, height: 20, marginBottom: 8 }} />
        <div className="skeleton-block" style={{ width: 80, height: 16 }} />
      </div>
      <div className="bar-col">
        <div className="skeleton-block" style={{ width: '100%', height: 6, borderRadius: 3 }} />
      </div>
      <div className="stats-col">
        <div className="skeleton-block" style={{ width: 64, height: 28 }} />
      </div>
    </div>
  )
}

function FrameworkRow({ data, rank, maxStars, index }) {
  const pct = maxStars > 0 ? (data.stars / maxStars) * 100 : 0
  const rankStyle = RANK_STYLE[rank] || { color: '#64748b', glow: 'none' }
  const langColor = LANG_COLORS[data.language] || { bg: '#33333322', border: '#444', text: '#999' }

  return (
    <a
      className="row"
      href={`https://github.com/${data.repo}`}
      target="_blank"
      rel="noreferrer"
      style={{ animationDelay: `${index * 55}ms`, textDecoration: 'none' }}
    >
      <div className="rank-col">
        <span
          className="rank-num"
          style={{ color: rankStyle.color, textShadow: rankStyle.glow }}
        >
          {rank}
        </span>
      </div>

      <div className="info-col">
        <span className="framework-name">{data.name}</span>
        <span
          className="lang-badge"
          style={{
            background: langColor.bg,
            border: `1px solid ${langColor.border}`,
            color: langColor.text,
          }}
        >
          {data.language}
        </span>
      </div>

      <div className="bar-col">
        <div className="bar-track">
          <div
            className="bar-fill"
            style={{
              width: `${pct}%`,
              background: rank === 1
                ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                : rank === 2
                ? 'linear-gradient(90deg, #64748b, #94a3b8)'
                : rank === 3
                ? 'linear-gradient(90deg, #92400e, #cd7f32)'
                : 'linear-gradient(90deg, #1e40af, #3b82f6)',
            }}
          />
        </div>
        <span className="bar-pct">{pct.toFixed(1)}%</span>
      </div>

      <div className="stats-col">
        <div className="stars-count">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="star-icon">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          {formatStars(data.stars)}
        </div>
        <div className="issues-count">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="issue-icon">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {formatIssues(data.issues)} issues
        </div>
      </div>
    </a>
  )
}

export default function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [progress, setProgress] = useState(0)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    setProgress(0)
    setData([])

    const results = []
    const total = FRAMEWORKS.length

    for (let i = 0; i < total; i++) {
      const fw = FRAMEWORKS[i]
      try {
        const res = await fetch(`https://api.github.com/repos/${fw.repo}`, {
          headers: { Accept: 'application/vnd.github+json' },
        })
        if (res.status === 403) {
          throw new Error('GitHub API rate limit reached. Wait a minute and try again.')
        }
        if (!res.ok) throw new Error(`Failed to fetch ${fw.name}`)
        const json = await res.json()
        results.push({
          name: fw.name,
          language: fw.language,
          repo: fw.repo,
          stars: json.stargazers_count,
          forks: json.forks_count,
          issues: json.open_issues_count,
          watchers: json.watchers_count,
        })
      } catch (err) {
        if (err.message.includes('rate limit')) {
          setError(err.message)
          setLoading(false)
          return
        }
        results.push({
          name: fw.name,
          language: fw.language,
          repo: fw.repo,
          stars: null,
          forks: null,
          issues: null,
        })
      }
      setProgress(Math.round(((i + 1) / total) * 100))
    }

    results.sort((a, b) => (b.stars ?? -1) - (a.stars ?? -1))
    setData(results)
    setLastUpdated(new Date())
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const maxStars = data.length > 0 ? data[0].stars ?? 0 : 0

  return (
    <div className="app">
      <div className="noise" />

      <header className="header">
        <div className="header-left">
          <div className="header-eyebrow">GITHUB STARS</div>
          <h1 className="header-title">
            BACKEND FRAMEWORK
            <span className="header-title-accent"> RANKINGS</span>
          </h1>
          {lastUpdated && (
            <div className="header-updated">
              UPDATED {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>
        <button
          className={`refresh-btn ${loading ? 'loading' : ''}`}
          onClick={fetchAll}
          disabled={loading}
        >
          <svg
            className={`refresh-icon ${loading ? 'spin' : ''}`}
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5"
          >
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          {loading ? `${progress}%` : 'REFRESH'}
        </button>
      </header>

      <main className="main">
        {error && (
          <div className="error-banner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        <div className="table-header">
          <div className="th rank-col">#</div>
          <div className="th info-col">FRAMEWORK</div>
          <div className="th bar-col">RELATIVE SCORE</div>
          <div className="th stats-col">STARS</div>
        </div>

        <div className="rows">
          {loading && data.length === 0
            ? FRAMEWORKS.map((_, i) => <SkeletonRow key={i} index={i} />)
            : data.map((fw, i) => (
                <FrameworkRow
                  key={fw.repo}
                  data={fw}
                  rank={i + 1}
                  maxStars={maxStars}
                  index={i}
                />
              ))
          }
        </div>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <span>DATA FROM GITHUB PUBLIC API</span>
          <span className="footer-dot">·</span>
          <span>{FRAMEWORKS.length} FRAMEWORKS TRACKED</span>
        </div>
        <div className="footer-cta">
          <span className="footer-cta-text">Don't see your favorite framework?</span>
          <span className="footer-cta-sub">Feel free to submit a PR</span>
          <div className="footer-links">
            <a
              className="footer-social-link"
              href="https://github.com/lraveri/backend-frameworks-leaderboard"
              target="_blank"
              rel="noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              Submit a PR
            </a>
            <a
              className="footer-social-link"
              href="https://linkedin.com/in/lucaraveri"
              target="_blank"
              rel="noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              lucaraveri
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
