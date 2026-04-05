# backend-frameworks-leaderboard

Live leaderboard of the most popular backend frameworks, ranked by GitHub stars.

**[View live →](https://lraveri.github.io/backend-frameworks-leaderboard/)**

## Frameworks tracked

| Framework | Language |
|---|---|
| Express | JavaScript |
| FastAPI | Python |
| Django | Python |
| Spring Boot | Java |
| Laravel | PHP |
| Rails | Ruby |
| Flask | Python |
| NestJS | TypeScript |
| Gin | Go |
| Fiber | Go |
| Fastify | JavaScript |
| Koa | JavaScript |
| Phoenix | Elixir |
| ASP.NET Core | C# |
| Echo | Go |
| Axum | Rust |
| Actix Web | Rust |
| Hono | TypeScript |
| Hapi | JavaScript |

## Run locally

```bash
npm install
npm run dev
```

## Contributing

Don't see your favorite framework? Feel free to submit a PR.

Add your framework to the `FRAMEWORKS` array in `src/App.jsx`:

```js
{ name: 'YourFramework', repo: 'owner/repo', language: 'Language' }
```

## Tech

- React + Vite
- GitHub Public API
- GitHub Pages (auto-deploy on push to `main`)
