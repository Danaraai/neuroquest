# NeuroQuest — Product Requirements Document
**Version**: 1.0
**Date**: 2026-04-07
**Status**: Living Document — Source of Truth
**Rule**: All code, design, and content decisions must trace back to this document. Change here first, then implement.

---

## 1. Vision & Mission

**Product Name**: NeuroQuest
**Tagline**: *Learn neuroscience. One synapse at a time.*
**Mascot**: Ilya — a white Christmas-style deer (named after Ilya Sutskever). Ilya guides the user through quests, reacts to progress, celebrates wins, and gently nudges on missed days.

**Mission**: Help one person (the user) become fully prepared for Neuromatch Academy's Computational Neuroscience program — in 4 weeks, 30 minutes per day — using a Duolingo-style micro-learning experience that works equally well on a phone and a laptop.

**North Star**: On Day 1 of NMA, the user should feel *over-prepared*, not stressed.

---

## 2. User Persona

| Attribute | Detail |
|-----------|--------|
| Name | Primary User (solo, for now) |
| Goal | Complete NMA Computational Neuroscience program confidently |
| Timeline | 4 weeks of prep before NMA starts |
| Daily time | 30 min total — often in 5-min micro-sessions on phone |
| Python level | Beginner (knows variables, maybe loops — needs structured learning) |
| Math level | School-level (algebra/calculus learned ~10 years ago, needs refresher) |
| Neuro background | None |
| Primary device | Phone (micro-sessions) + laptop (coding missions) |
| Motivation style | Gamification, visible progress, streaks, rewards, quest narrative |
| Key fear | Starting NMA and being lost on Day 1 |

**Future audience** (v2): Other NMA applicants and computational neuroscience learners worldwide.

---

## 3. Product Goals

### Primary Goals
1. Cover 100% of NMA Computational Neuroscience prerequisites by end of Week 4
2. Deliver content in 5-minute micro-sessions, phone-first
3. Track weak areas via spaced repetition and resurface them automatically
4. Make 30 min/day feel fast, fun, and rewarding

### Success Criteria
- User completes all 4 weeks without dropping off
- User can answer NMA Day 1 prerequisite questions correctly
- User feels confident opening their first NMA Jupyter notebook
- Average session length: 5–8 min on phone, 15–20 min on laptop

---

## 4. Core Product Principles

1. **Phone-first, laptop-complete**: All concept learning on phone. All coding on laptop. Seamless sync between both.
2. **Micro-sessions**: Every lesson chunk must be completable in 5 minutes.
3. **Spaced repetition over forgetting**: Wrong answers come back. Right answers space out.
4. **Progress is always visible**: XP bar, streak, lesson map — always in view.
5. **Ilya always reacts**: The mascot responds to every meaningful action (correct, wrong, streak, level up).
6. **NMA as the goal, always**: Every lesson is framed as prep for NMA. "You'll see this in Week 2 of NMA."
7. **Design for learning, not engagement tricks**: No dark patterns. No fake urgency. Cognitive load is always considered.

---

## 5. Platform Architecture

### 5.1 Device Split

| Feature | Phone | Laptop |
|---------|-------|--------|
| Concept lessons | ✅ Primary | ✅ Available |
| Flashcards | ✅ Primary | ✅ Available |
| MCQ quizzes | ✅ Primary | ✅ Available |
| Drag-and-drop exercises | ✅ | ✅ |
| Spaced repetition review | ✅ | ✅ |
| Coding missions | ❌ (view only) | ✅ Full execution |
| Jupyter-style notebook | ❌ | ✅ |
| Matplotlib plots | ❌ | ✅ |
| XP / Streaks / Map | ✅ | ✅ |
| Offline mode | ✅ Partial (flashcards, review) | ✅ Partial |

### 5.2 Technical Stack

**Frontend**
- Framework: **Next.js 14** (React, App Router)
- Styling: **Tailwind CSS** + custom design tokens
- Animation: **Framer Motion** (lesson transitions, Ilya reactions, XP bursts)
- PWA: next-pwa (service worker, installable on iOS/Android home screen)
- State: **Zustand** (local UI state) + **React Query** (server sync)

**Backend**
- Platform: **Supabase**
  - PostgreSQL database (progress, XP, spaced repetition state)
  - Auth (email/password + magic link — no friction)
  - Realtime (sync phone → laptop instantly)
  - Edge Functions (spaced repetition scoring logic)
- Hosting: **Vercel** (frontend) + Supabase (backend)

**Python Execution (Laptop)**
- Primary: **Pyodide** (Python in WebAssembly — no server needed, runs in browser)
  - Supports: numpy, scipy, matplotlib, pandas — everything NMA requires
  - Matplotlib renders via HTML Canvas
- Enhanced: **JupyterLite** embedded iframe for full notebook feel on select missions
- No server-side Python kernel needed (Pyodide handles it)

**Spaced Repetition**
- Algorithm: **SM-2** (same as Anki)
- Tracked per question/card, per user
- Stored in Supabase, synced across devices
- Review queue generated daily based on due dates

**Content**
- Stored in: Supabase database (structured JSON per lesson/card)
- Primary source: NMA Computational Neuroscience textbook + NMA W0 prereq materials
- Secondary source: User's existing Python notes (to be integrated)

---

## 6. Design System

### 6.1 Visual Identity

**Palette**
| Token | Color | Use |
|-------|-------|-----|
| `--primary` | `#1A1B2E` | Background (deep navy) |
| `--surface` | `#252640` | Card backgrounds |
| `--accent` | `#58CC02` | Primary action (Duolingo green) |
| `--accent-blue` | `#1CB0F6` | Secondary action, links |
| `--gold` | `#FFD700` | XP, streaks, achievements |
| `--danger` | `#FF4B4B` | Wrong answer, error |
| `--text-primary` | `#FFFFFF` | Primary text |
| `--text-muted` | `#AFAFAF` | Secondary text |
| `--ilya-white` | `#F5F0E8` | Mascot / highlight color |

**Typography**
- Headings: **Nunito** (rounded, friendly — same family as Duolingo)
- Body: **Inter** (clean, readable on small screens)
- Code: **JetBrains Mono**

**Border radius**: Generous (16px cards, 12px buttons) — soft and approachable
**Shadows**: Subtle bottom-border shadows on cards (not box-shadow — better on OLED)
**Icons**: Phosphor Icons (consistent, friendly weight)

### 6.2 Mascot — Ilya the White Deer

- Style: Flat vector illustration, white with subtle warm cream tones, antlers with small golden stars
- States:
  - **Idle**: Gentle breathing animation
  - **Correct**: Jumps, sparkles burst
  - **Wrong**: Shakes head, sad eyes (not shaming — just empathetic)
  - **Streak milestone**: Ilya runs across screen trailing stars
  - **Level up**: Ilya stands tall, antlers glow
  - **Nudge (missed day)**: Ilya peeks in from edge of screen
  - **Quest complete**: Ilya does a celebratory spin

### 6.3 Key UI Components

**Lesson Card** (phone)
- Full-screen, swipeable
- Large tap targets (min 48px)
- Progress bar at top (thin, always visible)
- Single question/concept per card
- Ilya reaction area (bottom-right corner, 64×64)

**Answer Buttons**
- Large, rounded, full-width
- 4 options max for MCQ
- Green flash on correct, red shake on wrong
- Haptic feedback on mobile (navigator.vibrate)

**XP Bar**
- Persistent at top of all screens (except full-screen lessons)
- Animated fill on XP gain

**Streak Flame**
- Shows current streak day count
- Pulses when streak is active for the day
- Dims with "protect your streak" nudge if no activity by 8pm

---

## 7. Gamification System

### 7.1 XP System

| Action | XP Earned |
|--------|-----------|
| Complete a lesson | +10 XP |
| Perfect lesson (no wrong answers) | +15 XP |
| Coding mission complete | +25 XP |
| Daily review complete | +10 XP |
| 5-day streak bonus | +50 XP |
| Boss battle win | +100 XP |
| First attempt on a lesson | +5 XP bonus |

### 7.2 Levels

| Level | XP Required | Title |
|-------|-------------|-------|
| 1 | 0 | Neural Newbie |
| 2 | 100 | Synapse Spark |
| 3 | 300 | Dendrite Drifter |
| 4 | 600 | Action Potential |
| 5 | 1000 | Cortex Explorer |
| 6 | 1500 | Hippocampal Hacker |
| 7 | 2200 | Neural Networker |
| 8 | 3000 | NMA Ready |

### 7.3 Streaks

- Daily streak: increments if at least 1 lesson is completed per day
- Streak freeze: 1 free freeze available per week (bank it by completing extra lessons)
- Streak milestone celebrations: 3, 7, 14, 21, 28 days
- Notification at 8pm if streak not yet done (gentle, from Ilya)

### 7.4 Badges

| Badge | Condition |
|-------|-----------|
| First Steps | Complete first lesson |
| Pythonista | Complete all Python lessons |
| Matrix Master | Complete Linear Algebra world |
| Calculus Conqueror | Complete Calculus world |
| Stats Savant | Complete Statistics world |
| Neuro Newbie | Complete Neuro Intro world |
| Coder | Complete first coding mission |
| Boss Slayer | Defeat first boss battle |
| Perfect Week | 7-day streak |
| NMA Ready | Complete entire curriculum |
| Ilya's Favorite | 28-day streak |

### 7.5 Spaced Repetition — "The Review Queue"

- Every question answered is tracked with SM-2 state (easiness factor, interval, repetition count)
- Daily review queue shows items due today
- Queue prioritizes: (1) items due today, (2) most recently failed items
- Phone UX: "Daily Review" is always first option on home screen
- Target: ≤15 review cards per day after Week 1
- Ilya shows a "backlog" badge if queue > 10 cards

---

## 8. World & Quest Structure (Treasure Hunt)

The learning map is a **world map** — a stylized top-down illustrated map of "The Neural Realm." Each world is a location on the map. Completing worlds unlocks new map regions.

### The Map

```
[START] → Python Village → Math Mountains → Stats Swamps →
          Neuro Jungle → Computation Caves → [NMA GATE] 🏆
```

Each world has:
- 5–8 **Quests** (lessons)
- 1 **Boss Battle** (comprehensive quiz at the end)
- Hidden **Ilya Lore** collectible (fun neuroscience fact)
- A world-specific **color theme**

### World Overview

| # | World | Theme Color | Boss Battle |
|---|-------|-------------|-------------|
| 1 | Python Village | Warm amber | Debug the broken neuron |
| 2 | Math Mountains | Cool slate | Solve the matrix maze |
| 3 | Stats Swamps | Teal/fog | Decode the distribution |
| 4 | Neuro Jungle | Jungle green | Map the brain signals |
| 5 | Computation Caves | Deep purple | Simulate a spiking neuron |

---

## 9. Full Curriculum

**Guiding source**: NMA Computational Neuroscience prerequisites (W0D0–W0D5)
**Secondary source**: NMA Compneuro Jupyter Book
**Coverage goal**: 100% of NMA W0 prerequisites + enough W1 context to feel prepared

### World 1: Python Village (Week 1, Days 1–7)

**Goal**: Write Python confidently. Run a script. Understand numpy arrays.

| Quest | Topic | Type | Device |
|-------|-------|------|--------|
| 1.1 | What is Python? Variables & types | Concept + MCQ | Phone |
| 1.2 | Numbers, strings, booleans | Flashcards + MCQ | Phone |
| 1.3 | Lists and indexing | Drag-and-drop + MCQ | Phone |
| 1.4 | Dictionaries | MCQ + fill-in | Phone |
| 1.5 | If/else and logic | Concept + MCQ | Phone |
| 1.6 | For loops | Concept + MCQ | Phone |
| 1.7 | Functions | MCQ + coding | Phone + Laptop |
| 1.8 | Coding Mission: Your First Neuron | Full coding | Laptop only |
| 1.9 | BOSS: Debug the Broken Neuron | Mixed quiz | Phone + Laptop |

**Coding Mission 1.8**: Write a function `membrane_potential(input_current)` that returns a value. Runs in Pyodide. Introduces the biological metaphor early.

### World 2: Math Mountains (Week 2, Days 8–14)

**Goal**: Refresh linear algebra and calculus at an intuition level. Understand what a matrix does to a vector.

**Sub-world 2A: Linear Algebra**

| Quest | Topic | Type | Device |
|-------|-------|------|--------|
| 2.1 | What is a vector? | Concept + visual MCQ | Phone |
| 2.2 | Vector operations (add, scale) | Drag-and-drop | Phone |
| 2.3 | Dot product (intuition) | Concept + MCQ | Phone |
| 2.4 | What is a matrix? | Concept + MCQ | Phone |
| 2.5 | Matrix × vector | Step-by-step fill-in | Phone |
| 2.6 | Matrix × matrix | MCQ + fill-in | Phone |
| 2.7 | Coding Mission: Numpy Vectors | numpy arrays, dot products | Laptop |
| 2.8 | Coding Mission: Transform a Dataset | Matrix operations on neural data | Laptop |
| 2.9 | BOSS: The Matrix Maze | Comprehensive mixed | Phone + Laptop |

**Sub-world 2B: Calculus**

| Quest | Topic | Type | Device |
|-------|-------|------|--------|
| 2.10 | What is a derivative? (slope intuition) | Concept + visual | Phone |
| 2.11 | Basic differentiation rules | MCQ + fill-in | Phone |
| 2.12 | What is an integral? (area intuition) | Concept + visual | Phone |
| 2.13 | Differential equations — what are they? | Concept + MCQ | Phone |
| 2.14 | Numerical methods intuition (Euler method) | Concept + MCQ | Phone |
| 2.15 | Coding Mission: Plot a derivative | matplotlib + numpy | Laptop |
| 2.16 | BOSS: Calculus Canyon | Mixed quiz | Phone + Laptop |

### World 3: Stats Swamps (Week 2–3, Days 12–18)

**Goal**: Understand probability distributions, mean/variance, and basic inference. Read a plot without confusion.

| Quest | Topic | Type | Device |
|-------|-------|------|--------|
| 3.1 | What is probability? | Concept + MCQ | Phone |
| 3.2 | Distributions: uniform, normal, Poisson | Visual MCQ + flashcards | Phone |
| 3.3 | Mean, variance, standard deviation | MCQ + fill-in | Phone |
| 3.4 | The normal distribution deep dive | Concept + MCQ | Phone |
| 3.5 | Sampling and randomness | Concept + MCQ | Phone |
| 3.6 | Statistical inference intro | Concept + MCQ | Phone |
| 3.7 | Coding Mission: Plot a Distribution | numpy + matplotlib histogram | Laptop |
| 3.8 | Coding Mission: Compare Two Samples | t-test intuition, scipy.stats | Laptop |
| 3.9 | BOSS: Decode the Distribution | Mixed quiz | Phone + Laptop |

### World 4: Neuro Jungle (Week 3, Days 16–21)

**Goal**: Understand neurons, brain signals, and why computational neuroscience exists. Covers NMA W0D0.

| Quest | Topic | Type | Device |
|-------|-------|------|--------|
| 4.1 | The neuron: anatomy & function | Concept + visual MCQ | Phone |
| 4.2 | Action potentials: how neurons fire | Concept + MCQ | Phone |
| 4.3 | Spiking activity & spike trains | Flashcards + MCQ | Phone |
| 4.4 | Brain signals: EEG, LFP, fMRI, calcium imaging | Visual MCQ | Phone |
| 4.5 | Neurotransmitters & synapses | Flashcards + MCQ | Phone |
| 4.6 | Stimulus representation | Concept + MCQ | Phone |
| 4.7 | From neurons to behavior | Concept + MCQ | Phone |
| 4.8 | Why computational models? | Concept + MCQ | Phone |
| 4.9 | BOSS: Map the Brain Signals | Comprehensive quiz | Phone |

**Ilya Lore collectible**: "Did you know? Ilya the deer has 10^11 neurons — about as many as you!"

### World 5: Computation Caves (Week 4, Days 22–28)

**Goal**: Write and run a leaky integrate-and-fire neuron. Understand model types. Be ready for NMA Week 1.

| Quest | Topic | Type | Device |
|-------|-------|------|--------|
| 5.1 | What is a computational model? | Concept + MCQ | Phone |
| 5.2 | Descriptive vs mechanistic models | MCQ + concept | Phone |
| 5.3 | The leaky integrate-and-fire (LIF) neuron | Concept + MCQ | Phone |
| 5.4 | Differential equations in neuroscience | Concept + MCQ | Phone |
| 5.5 | Coding Mission: Implement a LIF neuron | Full Pyodide mission | Laptop |
| 5.6 | Coding Mission: Tune and plot your neuron | matplotlib, parameter sweep | Laptop |
| 5.7 | Intro to pandas: loading neural data | Concept + coding | Laptop |
| 5.8 | Reading NMA-style Jupyter notebooks | Guided walkthrough | Laptop |
| 5.9 | BOSS: Simulate a Spiking Neuron | Full coding boss | Laptop |
| 5.10 | 🏆 NMA GATE: Final Readiness Check | 30-question mixed review | Phone + Laptop |

---

## 10. Screen Specifications

### 10.1 Home Screen (Phone)

```
┌─────────────────────────────┐
│ 🦌 Ilya  [🔥 7]  [⭐ 1,240 XP] │  ← top bar
│                             │
│  Good morning! Ready to     │
│  unlock Math Mountains?     │  ← Ilya greeting (rotates daily)
│                             │
│ ┌─────────────────────────┐ │
│ │ 📋 DAILY REVIEW          │ │  ← always top priority
│ │ 8 cards due today       │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ 🗺 CONTINUE QUEST        │ │
│ │ World 2 › Quest 2.3     │ │
│ │ ████████░░░ 73%         │ │
│ └─────────────────────────┘ │
│                             │
│ [🗺 Map]  [📖 Learn]  [👤 Me] │  ← bottom nav
└─────────────────────────────┘
```

### 10.2 World Map Screen

```
┌─────────────────────────────┐
│ ← Map                       │
│                             │
│  🏘️ Python Village  ✅       │
│     │                       │
│  ⛰️ Math Mountains  🔓       │  ← current world
│     │                       │
│  🌿 Stats Swamps   🔒       │
│     │                       │
│  🌴 Neuro Jungle   🔒       │
│     │                       │
│  🪨 Computation Caves 🔒   │
│     │                       │
│  🏆 NMA Gate       🔒       │
│                             │
└─────────────────────────────┘
```

### 10.3 Lesson Screen — MCQ (Phone)

```
┌─────────────────────────────┐
│ ███████████░░░░ Quest 2.3   │  ← progress
│                             │
│  What does the dot product  │
│  of two vectors represent?  │
│                             │
│  ┌───────────────────────┐  │
│  │ Their sum             │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ The angle between     │  │  ← correct
│  │ them (cosine)         │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ Their cross product   │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ The larger magnitude  │  │
│  └───────────────────────┘  │
│                          🦌 │
└─────────────────────────────┘
```

### 10.4 Correct Answer Screen

```
┌─────────────────────────────┐
│                             │
│         ✨ CORRECT! ✨       │
│                             │
│   The dot product measures  │
│   similarity / angle.       │
│   In neuro: used to compute │
│   neural tuning curves.     │  ← always connect to neuro
│                             │
│         🦌 (jumping Ilya)   │
│                             │
│   +10 XP ████░░░░ Level 3  │
│                             │
│      [ CONTINUE → ]         │
└─────────────────────────────┘
```

### 10.5 Coding Mission Screen (Laptop)

```
┌──────────────────────────────────────────────────┐
│ Coding Mission 1.8: Your First Neuron   🦌 +25XP │
├──────────────────┬───────────────────────────────┤
│ Instructions     │  Python Editor (Pyodide)       │
│                  │                                │
│ Write a function │  def membrane_potential(I):    │
│ that computes    │      """                       │
│ membrane voltage │      Your code here            │
│ for a neuron.    │      """                       │
│                  │      pass                      │
│ V = -70 + I * R  │                                │
│ (where R = 10)   │  ▶ Run Code                    │
│                  ├───────────────────────────────┤
│ Hint: V_rest     │  Output:                       │
│ is -70 mV        │  > Run your code to see output │
│                  │                                │
│ [ Check Answer ] │                                │
└──────────────────┴───────────────────────────────┘
```

---

## 11. Technical Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    CLIENT (Browser/PWA)                   │
│                                                          │
│  ┌──────────────┐    ┌─────────────────────────────┐    │
│  │  Phone PWA   │    │       Laptop PWA             │    │
│  │  (Next.js)   │    │       (Next.js)              │    │
│  │              │    │  ┌─────────────────────────┐ │    │
│  │  - Lessons   │    │  │  Pyodide (Python WASM)  │ │    │
│  │  - Flashcard │    │  │  numpy, scipy, matplotlib│ │    │
│  │  - MCQ       │    │  │  pandas, sympy          │ │    │
│  │  - Review Q  │    │  └─────────────────────────┘ │    │
│  │  - XP/Streak │    │  ┌─────────────────────────┐ │    │
│  └──────┬───────┘    │  │  JupyterLite (optional) │ │    │
│         │            │  │  for full notebook UX   │ │    │
│         │            │  └─────────────────────────┘ │    │
│         │            └──────────────┬──────────────┘    │
│         └───────────────┬───────────┘                    │
│                         │ HTTPS + WebSocket              │
└─────────────────────────┼────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────┐
│                    SUPABASE (Backend)                     │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  PostgreSQL  │  │     Auth     │  │   Realtime   │   │
│  │              │  │  (magic link)│  │  (sync phone │   │
│  │  - users     │  │              │  │   ↔ laptop)  │   │
│  │  - progress  │  └──────────────┘  └──────────────┘   │
│  │  - xp/streak │                                        │
│  │  - sr_state  │  ┌──────────────────────────────────┐  │
│  │  - lessons   │  │       Edge Functions              │  │
│  │  - badges    │  │  - SM-2 algorithm                 │  │
│  └──────────────┘  │  - daily review queue generation  │  │
│                    │  - streak validation               │  │
│                    └──────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────┐
│                    VERCEL (Hosting)                       │
│  - Next.js app deployed to edge                          │
│  - PWA manifest served                                   │
│  - Service worker for offline lesson cache               │
└──────────────────────────────────────────────────────────┘
```

### Database Schema (Key Tables)

```sql
-- User progress per lesson
user_progress (
  id, user_id, lesson_id,
  completed_at, score, xp_earned, attempts
)

-- Spaced repetition state per card
sr_cards (
  id, user_id, card_id,
  easiness_factor, interval_days, repetitions,
  next_review_date, last_answer_quality
)

-- XP and streak
user_stats (
  user_id, total_xp, current_level,
  current_streak, longest_streak,
  last_activity_date, streak_freeze_count
)

-- Badges earned
user_badges (
  user_id, badge_id, earned_at
)

-- Content (lessons, cards, questions)
lessons (id, world_id, quest_num, title, type, content_json, xp_reward, device_required)
cards (id, lesson_id, front, back, card_type, difficulty)
questions (id, lesson_id, text, options_json, correct_index, explanation, neuro_connection)
```

---

## 12. Content Sourcing Strategy

1. **Primary**: NMA Computational Neuroscience Jupyter Book (https://compneuro.neuromatch.io)
   - All W0 prerequisite content (W0D0–W0D5)
   - Concepts, exercises, code examples
   - Use liberally — this is what we're preparing the user for

2. **Secondary**: User's Python notes (Google Doc — to be imported manually)
   - Identify gaps vs. our curriculum
   - Incorporate any personalized examples

3. **Explanations**: Written in-app at a level for a smart person with no background
   - No jargon without definition
   - Always connect abstract concepts to neuroscience applications
   - Example framing: "You'll use this in NMA Week 2 when analyzing spike trains"

4. **Coding missions**: Adapted from NMA W0 notebook exercises
   - Simplified for beginners
   - Progressive complexity (scaffold → fill-in → write from scratch)

---

## 13. Notification Strategy

| Trigger | Message (from Ilya) | Timing |
|---------|---------------------|--------|
| Morning | "Good morning! 5 minutes today keeps the streak alive 🦌" | 8am |
| Streak at risk | "Hey! Your streak ends in 2 hours. I believe in you!" | 8pm if no activity |
| Streak milestone | "7 days!! You're unstoppable. A new world just unlocked." | On achievement |
| Review due | "8 review cards are waiting. Your brain needs this!" | 9am |
| Level up | "You're now a Cortex Explorer! Look how far you've come." | On event |
| Inactivity (2 days) | "I missed you. Come back? No judgment." | 48hr no activity |

---

## 14. 4-Week Learning Schedule

| Week | Worlds Covered | Daily Target | Key Milestone |
|------|---------------|--------------|---------------|
| Week 1 (Days 1–7) | Python Village (W1) | 2 quests/day | Complete W1 + Coding Mission 1 |
| Week 2 (Days 8–14) | Math Mountains (W2) | 2 quests/day | Linear algebra + calculus refreshed |
| Week 3 (Days 15–21) | Stats Swamps (W3) + Neuro Jungle (W4) | 2 quests/day | Stats + neuro foundations done |
| Week 4 (Days 22–28) | Computation Caves (W5) + Review | 1 quest + review/day | All 5 boss battles won, NMA Gate cleared |

**Buffer built in**: ~5 review-only days distributed across weeks for spaced repetition catch-up.

---

## 15. Roadmap

### Phase 1 — Core (Now, for personal use)
- [ ] PWA setup (Next.js + Supabase + Vercel)
- [ ] Auth (magic link login)
- [ ] Lesson engine (MCQ, flashcard, concept)
- [ ] World 1: Python Village (all quests)
- [ ] World 2: Math Mountains
- [ ] XP + streak system
- [ ] Spaced repetition (SM-2)
- [ ] Pyodide coding environment
- [ ] Coding Mission 1.8 + 2.7
- [ ] Ilya mascot (static + 3 states)
- [ ] World map (static illustration)
- [ ] Daily review queue

### Phase 2 — Complete Curriculum
- [ ] World 3: Stats Swamps
- [ ] World 4: Neuro Jungle
- [ ] World 5: Computation Caves
- [ ] NMA Gate final check
- [ ] All boss battles
- [ ] All badges
- [ ] Full Ilya animation set
- [ ] Push notifications (PWA)
- [ ] Offline mode for phone

### Phase 3 — Polish & Public
- [ ] Multi-user support (accounts for other learners)
- [ ] Leaderboard (optional, opt-in)
- [ ] Community challenges
- [ ] More NMA tracks (Deep Learning, NeuroAI)
- [ ] Content admin panel
- [ ] Analytics dashboard

---

## 16. Open Items (Decisions Needed)

| Item | Status | Decision |
|------|--------|----------|
| User's Google Doc notes | ⏳ Pending | User to paste or export content |
| Ilya mascot art | ⏳ Pending | Commission or generate vector art |
| World map illustration | ⏳ Pending | Commission or generate |
| App domain/URL | ⏳ Pending | User to choose |
| Push notification provider | ⏳ Pending | Supabase built-in or OneSignal |
| NMA start date | ⏳ Pending | Needed to set countdown timer |

---

## 17. What We Are NOT Building (for now)
- Social features (friends, sharing)
- Video lessons (text + interactive only)
- Native iOS/Android apps (PWA is sufficient)
- Server-side Python kernel (Pyodide handles it in-browser)
- Paid subscription or monetization
- Content management system for non-technical editing

---

*End of PRD v1.0*
*To change anything: edit this file first, then update code.*
