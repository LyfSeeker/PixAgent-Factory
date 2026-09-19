# Architecture

## MVP shape

The first release is intentionally a presentation-ready front end with a simulated agent-execution layer. This gives a predictable live demo now and keeps the UI independent from the eventual agent runner.

```
PixAgent UI
  ├── Studio office visualization
  ├── Agent / task / activity views
  └── Simulated studio state
          ↓ (production adapter)
Supabase realtime data ←→ Orchestrator service ←→ Coding-agent runners
```

## Main UI module

`components/pixagent-app.tsx` owns the demo data, agent interactions, routing shell, hire flow, activity timeline, and view-specific panels. `app/globals.css` contains the responsive interface and original CSS pixel-office art.

## Production data model

Suggested Supabase entities:

- `projects`: request, project plan, state, target date and completion
- `agents`: display name, role, skills, capacity, presence and runner configuration
- `tasks`: project, owner, state, dependencies, progress, priority and approval requirement
- `agent_sessions`: runner session, task link, output summary and timestamps
- `activity_events`: typed realtime audit events for the live feed
- `approvals`: pending decision, rationale, risk, decision and reviewer

## Integrating a real orchestrator

1. Send the high-level request to the orchestration service.
2. Let the service create tasks, dependencies, proposed owners and approval gates.
3. Persist the plan and publish a realtime event for every state transition.
4. Subscribe in the UI to update an agent’s workstation, card and activity feed together.
5. Keep execution adapters separate from the UI so different coding runners can be connected later.

## Safety boundary

Agent actions that install packages, change infrastructure, edit shared schemas, deploy, or create external accounts should produce an `approval` record. The UI should show the rationale, expected impact, related diff or run output, and an explicit approve/reject action before a runner continues.
