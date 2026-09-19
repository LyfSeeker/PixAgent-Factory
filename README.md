# PIXAGENT FACTORY 🏭

**Your AI Software Studio** — a hackathon MVP for observing, managing, and collaborating with a team of AI coding agents.

PixAgent Factory turns a multi-agent software workflow into a developer-oriented visual control center. A warm, original pixel-office scene makes agent status instantly legible, while the surrounding interface provides the serious project, task, and activity controls a software team needs.

## What’s included

- Interactive pixel office: click a workstation to inspect its coworker
- Editable agent names directly in the coworker profile
- Hire-agent flow with name and role selection
- Agent capacity, skills, progress, work queues, and current assignment
- Studio activity feed and a human-approval signal
- Project pulse metrics and task-board / agents / activity / analytics navigation
- A server-side factory ledger for agents, assignments, blockers, evidence, decisions, and run history
- Scoped OpenAI task runner that keeps API credentials on the server
- Responsive layouts for desktop and mobile

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Pixel-themed product landing page |
| `/workspace` | Pixel office command center |
| `/agents` | Agent management view |
| `/projects` | Project overview |
| `/tasks` | Task board |
| `/activity` | Event stream |
| `/analytics` | Project metrics |
| `/settings` | Workspace settings shell |

## API routes

| Route | Purpose |
| --- | --- |
| `GET /api/factory` | Read agents and their task ownership |
| `POST /api/factory` | Create a scoped task assignment |
| `PATCH /api/factory/tasks/:id` | Update status, blocker, evidence, or decision |
| `POST /api/agents/run` | Run a scoped task and save its report for review |

## Extending the MVP

For a production deployment, replace the development in-memory factory store with:

- Supabase tables and realtime streams for projects, tasks, agents and events
- OpenAI Responses APIs for project decomposition and assignment logic
- A coding-agent runner that reports sessions, artifacts and dependency state
- Auth and role-based decision controls for team use

## Design note

The pixel office is original CSS artwork created for this project. It is inspired only by the requested *general* “pixel studio plus modern developer tooling” direction and does not reuse third-party product branding, characters, or graphical assets.
