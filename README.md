# PIXAGENT FAACTORY 🏭

**Your AI Software Studio** — a hackathon MVP for observing, managing, and collaborating with a team of AI coding agents.

PixAgent Faactory turns a multi-agent software workflow into a developer-oriented visual control center. A warm, original pixel-office scene makes agent status instantly legible, while the surrounding interface provides the serious project, task, and activity controls a software team needs.

## What’s included

- Interactive pixel office: click a workstation to inspect its coworker
- Editable agent names directly in the coworker profile
- Hire-agent flow with name and role selection
- Agent capacity, skills, progress, work queues, and current assignment
- Studio activity feed and a human-approval signal
- Project pulse metrics and task-board / agents / activity / analytics navigation
- A demo button that simulates a blocker and automatic recovery
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
| `/` | Pixel office command center |
| `/agents` | Agent management view |
| `/projects` | Project overview |
| `/tasks` | Task board |
| `/activity` | Event stream |
| `/analytics` | Project metrics |
| `/settings` | Workspace settings shell |

## Demo story

Start with the “Run demo project” button. It reflects the intended presentation sequence: agents work concurrently, QA is blocked by an API dependency, the dependency lands, QA resumes, and the system surfaces a final human decision.

## Extending the MVP

The UI uses an in-memory simulated execution layer intentionally. A production connection can replace the seed data and state handlers with:

- Supabase tables and realtime streams for projects, tasks, agents and events
- OpenAI Responses / Agents APIs for project decomposition and assignment logic
- A coding-agent runner that reports sessions, artifacts and dependency state
- Auth and role-based decision controls for team use

## Design note

The pixel office is original CSS artwork created for this project. It is inspired only by the requested *general* “pixel studio plus modern developer tooling” direction and does not reuse third-party product branding, characters, or graphical assets.
