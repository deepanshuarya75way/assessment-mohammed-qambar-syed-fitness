# ◈ SVORA // Somatic Intelligence & Protocol Synthesis

<div align="center">

```
  ███████╗██╗   ██╗ ██████╗ ██████╗  █████╗ 
  ██╔════╝██║   ██║██╔═══██╗██╔══██╗██╔══██╗
  ███████╗██║   ██║██║   ██║██████╔╝███████║
  ╚════██║╚██╗ ██╔╝██║   ██║██╔══██╗██╔══██║
  ███████║ ╚████╔╝ ╚██████╔╝██║  ██║██║  ██║
  ╚══════╝  ╚═══╝   ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
```

**Next-Generation Somatic Intelligence & Boutique Wellness Platform**  
*Engineering Somatic Excellence Through Computer Vision, AI Synthesis & Kinetic Precision*

[![Next.js](https://img.shields.io/badge/Next.js-15.2-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-0B1120?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)](https://tailwindcss.com/)
[![Gemini](https://img.shields.io/badge/AI_Engine-Gemini_3.8_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![MediaPipe](https://img.shields.io/badge/Biometrics-MediaPipe_Pose_ML-0075FF?style=for-the-badge&logo=google&logoColor=white)](https://developers.google.com/mediapipe)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB_Atlas-13AA52?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## ◈ Table of Contents

- [Overview](#-overview)
- [System Architecture](#-system-architecture)
  - [1. High-Level Architecture](#1-high-level-architecture)
  - [2. Biometric Intake & Protocol Synthesis Pipeline](#2-biometric-intake--protocol-synthesis-pipeline)
  - [3. Real-Time Computer Vision Posture Engine](#3-real-time-computer-vision-posture-engine)
  - [4. Edge Security & Authentication Lifecycle](#4-edge-security--authentication-lifecycle)
- [Key Features](#-key-features)
- [Biomechanical Posture Engine Matrix](#-biomechanical-posture-engine-matrix)
- [Design Language: Cyber-Zen Luxe](#-design-language-cyber-zen-luxe)
- [Project Directory Structure](#-project-directory-structure)
- [API Reference](#-api-reference)
- [Quickstart & Deployment](#-quickstart--deployment)
  - [Prerequisites](#prerequisites)
  - [Environment Calibration](#environment-calibration)
  - [Installation & Execution](#installation--execution)
  - [Verification & Smoke Tests](#verification--smoke-tests)
- [Resilience & Simulation Mode](#-resilience--simulation-mode)
- [License](#-license)

---

## ◈ Overview

**SVORA** is an architectural-grade wellness platform designed to bridge the gap between minimalist luxury aesthetics and advanced biomechanical intelligence. Rather than delivering generic template programs, SVORA analyzes user physiometry through multimodal AI and real-time computer vision to curate bespoke 12-week kinetic protocols, metabolic prescriptions, and live-corrected training sessions.

### Core Directives

1. **Somatic Profiling:** High-precision anthropometric intake via manual parameterization or zero-shot multimodal physique photo classification.
2. **AI Protocol Synthesis:** 12-week periodized regimens dynamically calibrated to recovery capacity, available training environment, and nutritional strategy powered by **Gemini 3.8 Flash**.
3. **Real-Time Computer Vision Form Coaching:** Real-time markerless pose estimation using MediaPipe ML, executing trigonometric joint-angle checks, kinematic state transitions, and real-time audio guidance via the Web Speech API.
4. **Somatic Progress Tracking:** Side-by-side historical photographic comparison evaluating structural muscularity, posture alignment, and body fat delta through multimodal reasoning models.
5. **Self-Correcting AI Guardrails:** An AI evaluation and schema validation layer that detects hallucinations, verifies range-of-motion bounds, and executes automated prompt-corrective retry loops with multi-tier failovers.

---

## ◈ System Architecture

### 1. High-Level Architecture

The platform is designed around a decoupled, layered micro-architecture leveraging Next.js App Router for server-rendered interfaces and route handlers, coupled with client-side ML pipelines and edge middleware.

```mermaid
flowchart TD
    subgraph ClientLayer["Frontend & Client Layer (Next.js 15 App Router)"]
        Landing["Landing Experience (/)<br/>Bento-Luxe Grids • Framer Motion Parallax"]
        Uplink["Somatic Intake (/uplink)<br/>5-Step Biometric Wizard • Photo Intake"]
        Protocol["Protocol Dashboard (/protocol)<br/>Weekly Schedule • Video Modals"]
        PoseEngine["Live Vision Coach<br/>MediaPipe Pose ML • Web Speech API"]
        Journal["Somatic Journal (/journal)<br/>Macro Tracker • Photo Comparison"]
        AuthUI["Auth Shell (/login, /register)<br/>BaryonLoader • Kinetic Forms"]
    end

    subgraph SecurityLayer["Edge Security & Routing"]
        Middleware["Next.js Middleware (middleware.ts)<br/>JWT Verification • Sliding Session Refresh"]
    end

    subgraph ApiLayer["API Route Handlers (src/app/api)"]
        AuthApi["/api/auth/[login|register|me|logout]<br/>bcryptjs Hashing • Jose JWT Cookie"]
        GenApi["/api/generate<br/>Prompt Engineering • Stream Collector"]
        AnalyzeApi["/api/analyze-body<br/>Physique Progress Photo Delta"]
        RoutineApi["/api/get-routine & /api/save-routine<br/>User Routine Persistence"]
        JournalApi["/api/journal/log<br/>Daily Nutrition & Activity Entries"]
    end

    subgraph AiLayer["AI Evaluation & Reliability Engine (lib/ai-validator.ts & lib/gemini.ts)"]
        Cascade["callGeminiCascade<br/>Multi-Tier Failover Engine"]
        RetryOrch["withAIRetry Orchestrator<br/>Max Retries & Error Suffix Feedback"]
        SchemaVal["Schema & Hallucination Guard<br/>Strict JSON Extraction & Validation"]
        LocalFallback["Personalized Local Plan Generator<br/>Deterministic Zero-Crash Fallback"]
    end

    subgraph ModelLayer["AI Inference Engine (Google Gemini API)"]
        Gemini38["Gemini 3.8 Flash (Primary Engine)<br/>High-Fidelity Text Reasoning & Vision"]
        GeminiFallbacks["Gemini 3 Flash Preview / 2.5 Flash<br/>Sub-2s Rapid Response Fallback"]
    end

    subgraph DataLayer["Persistence Layer (lib/mongodb.ts)"]
        MongoAtlas[("MongoDB Atlas (Production)<br/>svora_db Collection Cluster")]
        MockStore[("In-Memory Simulation Store<br/>Zero-Config Mock Database Fallback")]
    end

    ClientLayer --> SecurityLayer
    SecurityLayer --> ApiLayer
    GenApi --> RetryOrch
    AnalyzeApi --> RetryOrch
    RetryOrch --> SchemaVal
    SchemaVal --> Cascade
    Cascade --> Gemini38
    Cascade -.->|On 503/Timeout| GeminiFallbacks
    Cascade -.->|On Offline/Total Outage| LocalFallback
    ApiLayer --> MongoAtlas
    ApiLayer -.->|Fallback if no URI| MockStore
```

---

### 2. Biometric Intake & Protocol Synthesis Pipeline

When an athlete initiates their somatic profile, biometric metrics and optional physique imagery stream to the generation endpoint. A self-correcting validation loop guarantees strict JSON compliance and athletic efficacy.

```mermaid
sequenceDiagram
    autonumber
    actor Athlete as Athlete / User
    participant Uplink as Uplink Wizard (/uplink)
    participant Middleware as Edge Middleware
    participant GenAPI as Route Handler (/api/generate)
    participant Evaluator as AI Validator (withAIRetry)
    participant GeminiEngine as Gemini 3.8 Flash Cascade
    participant DB as MongoDB / Mock DB

    Athlete->>Uplink: Input Biometrics (Age, Height, Weight, Body Type, Goal, Fasting)
    alt Visual Somatic Profiling
        Athlete->>Uplink: Upload Physique Photograph
    end
    Athlete->>Uplink: Click "Get My Plan"
    Uplink->>Middleware: POST /api/generate + Session Cookie
    Middleware->>GenAPI: Validate & Refresh JWT Session
    GenAPI->>Evaluator: Dispatch generation with base prompt
    loop Validation Loop (Up to 2 Retries)
        Evaluator->>GeminiEngine: callGeminiCascade (gemini-3.8-flash)
        alt Primary 3.8-Flash Success
            GeminiEngine-->>Evaluator: Raw JSON response
        else High Demand (503) or Timeout
            GeminiEngine->>GeminiEngine: Auto-cascade to gemini-3-flash-preview / 2.5-flash
            GeminiEngine-->>Evaluator: Fallback JSON response
        end
        Evaluator->>Evaluator: extractJson() & validateWorkoutPlan()
        alt Schema Invalid / Missing Fields
            Evaluator->>Evaluator: Append correction suffix with specific error list
        end
    end
    Evaluator-->>GenAPI: Validated WorkoutPlan Data
    GenAPI->>DB: db.collection("routines").insertOne(planData + userId)
    DB-->>GenAPI: Insert confirmation
    GenAPI-->>Uplink: HTTP 200 { planTitle, weeklyStructure, nutrition, ... }
    Uplink->>Athlete: Cache in localStorage & Redirect to /protocol
```

---

### 3. Real-Time Computer Vision Posture Engine

The live training interface runs real-time inference on the client device. Video frames are analyzed without server round-trips, ensuring zero-latency kinetic tracking and user privacy.

```mermaid
flowchart LR
    subgraph Capture["Video Capture"]
        Cam["WebCam Stream<br/>1280x720 @ 60 FPS"]
    end

    subgraph MediaPipe["MediaPipe Pose Pipeline"]
        Model["Pose ML Model (Complexity 1)<br/>Min Detection Conf: 0.5"]
        Landmarks["33 3D Pose Landmarks<br/>(x, y, z, visibility)"]
    end

    subgraph Biomechanics["Biomechanical Engine"]
        SideSelect["Dynamic Side Selector<br/>Left vs Right Visibility"]
        AngleTrig["Trigonometric Angle Calc<br/>calculateAngle(JointA, JointB, JointC)"]
        Smoother["Rolling Angle Smoother<br/>Moving Average (History N=5)"]
        PostureRules["Biomechanics Rule Engine<br/>Chest Angle • Arm Drift • Core Hinge"]
    end

    subgraph StateMachine["Kinetic State Machine"]
        FSM["Rep Stage Detector<br/>START -> GOING -> PEAK -> RETURNING"]
        RepCounter["Rep Counter & Timer<br/>Debounce 800ms between reps"]
        SetRest["Auto Rest Transition<br/>45-second Recovery Timer"]
    end

    subgraph UXFeedback["Multimodal Feedback"]
        CanvasHUD["60 FPS Canvas HUD<br/>Skeleton Mesh (Gold/Red) & Joint Angles"]
        VoiceSynthesis["Web Speech API<br/>Throttled Form Corrections & Rep Calls"]
    end

    Cam --> Model
    Model --> Landmarks
    Landmarks --> SideSelect
    SideSelect --> AngleTrig
    AngleTrig --> Smoother
    Smoother --> PostureRules
    Smoother --> FSM
    PostureRules --> CanvasHUD
    PostureRules --> VoiceSynthesis
    FSM --> RepCounter
    RepCounter --> SetRest
    RepCounter --> VoiceSynthesis
    SetRest --> CanvasHUD
```

---

### 4. Edge Security & Authentication Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor User as Client Browser
    participant Middleware as Next.js Middleware
    participant AuthAPI as /api/auth/login
    participant DB as MongoDB Atlas / Mock DB

    User->>AuthAPI: POST { email, password }
    AuthAPI->>DB: findOne({ email: normalizedEmail })
    DB-->>AuthAPI: User record with bcrypt hash
    AuthAPI->>AuthAPI: bcrypt.compare(password, hash)
    AuthAPI->>AuthAPI: Sign JWT with HS256 (expires in 2h)
    AuthAPI-->>User: Set HTTP-Only Cookie ("session")
    
    note over User,Middleware: Subsequent Requests to Protected Routes (/protocol, /uplink, /journal)
    User->>Middleware: Request /protocol (with session cookie)
    Middleware->>Middleware: decrypt(cookie) via jose
    alt Session Valid
        Middleware->>Middleware: updateSession() sliding window + 2h
        Middleware-->>User: Forward request with refreshed cookie
    else Session Invalid or Missing
        Middleware-->>User: HTTP 307 Redirect to /login
    end
```

---

## ◈ Key Features

### ✦ Somatic Profiling Wizard (`/uplink`)
- **Step 01: Biometric Calibration:** Age, height, and weight inputs with auto-focus and keyboard acceleration (`Enter` navigation).
- **Step 02: Somatic Phenotype:** Select between *Skinny*, *Athletic*, *Heavy*, *Average*, and *Lean*, or upload a physique photograph for zero-shot computer vision classification.
- **Step 03: Aesthetic Goal Target:** Select from *Hypertrophy* (Muscle Building), *Lean* (Fat Loss), *Power* (Raw Strength), or specify a custom athletic directive.
- **Step 04: Environment Adaptation:** Dynamic reconfiguration between Commercial Gym and Home Training equipment profiles.
- **Step 05: Metabolic Schedule:** Calibrate for Intermittent Fasting (16:8 feeding windows) or standard nutritional scheduling.

### ✦ Live Vision Coach & Movement Laboratory (`/protocol`)
- **Client-Side Pose Estimation:** Powered by Google MediaPipe Pose ML running at up to 60 FPS in an HTML5 canvas overlay.
- **Trigonometric Joint Tracking:** Automatically identifies the best-viewed lateral side (left vs right) and calculates real-time 3D angles between key joints.
- **Kinetic Rep Counting:** Finite-state machine managing transitions through `START` $\to$ `GOING` $\to$ `PEAK` $\to$ `RETURNING` with an 800ms anti-double-counting debounce.
- **Voice Biofeedback:** Native text-to-speech cues dynamically synthesized via `SpeechSynthesisUtterance` to warn athletes of form breakdown (e.g., *"Keep chest up, back straight"*, *"Keep elbow locked at your side"*).
- **Automated Rest Countdown:** 45-second recovery timer with audio countdowns and skip options between sets.
- **Integrated Video Demos:** Instant streaming form guides matching exercise movements directly via modal players.

### ✦ Somatic Progress Journal (`/journal`)
- **Daily Nutritional Sync:** Track calorie and protein intake with timestamped history logs.
- **Photographic Progress Scans:** Upload before-and-after photos for AI visual comparative delta analysis powered by Gemini multimodal vision.
- **Biometric Delta Report:** Estimates changes in lean muscle mass, body fat percentage, posture alignment notes, and corrective protocol adjustments.

### ✦ Self-Correcting AI Reliability Layer (`src/lib/ai-validator.ts` & `src/lib/gemini.ts`)
- **Schema Validation:** Strict verification of structural fields, day allocations, exercise quantities (min 5 per training day), set ceilings (1-20), and RPE scale (1-10).
- **Multi-Tier Model Cascade:** Prioritizes **Gemini 3.8 Flash**; seamlessly handles high demand (503s) by falling back to `gemini-3-flash-preview` or `gemini-2.5-flash` in under 2 seconds.
- **Zero-502 Local Fallback:** In the event of a complete upstream network interruption, a personalized, deterministic protocol is immediately synthesized to ensure an uninterrupted athlete experience.

---

## ◈ Biomechanical Posture Engine Matrix

SVORA's computer vision engine evaluates individual exercises against biomechanical standards:

| Exercise Family | Tracked Joint Triplet | Motion Type | Primary Check | Form Fault Trigger | Audio Correction Cue |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Squats / Lunges** | Hip $\to$ Knee $\to$ Ankle | Flexion ($165^\circ \to 95^\circ$) | Torso inclination angle | Torso angle $< 80^\circ$ | *"Keep chest up, back straight"* |
| **Bicep Curls** | Shoulder $\to$ Elbow $\to$ Wrist | Flexion ($155^\circ \to 55^\circ$) | Elbow lateral drift | Arm drift $> 35^\circ$ | *"Keep elbow locked at your side"* |
| **Push-ups / Press** | Shoulder $\to$ Elbow $\to$ Wrist | Flexion ($155^\circ \to 85^\circ$) | Core spinal alignment | Body line $< 155^\circ$ | *"Keep body in a straight line, core tight"* |
| **Overhead Press** | Shoulder $\to$ Elbow $\to$ Wrist | Extension ($80^\circ \to 155^\circ$) | Lumbar hyperextension | Hip angle $< 150^\circ$ | *"Don't arch your back, brace your core"* |
| **Deadlifts / Hinges** | Shoulder $\to$ Hip $\to$ Knee | Extension ($110^\circ \to 170^\circ$) | Hip hinge vs knee bend | Knee angle $< 120^\circ$ | *"Hinge at hips, don't squat the deadlift"* |
| **Lateral Raises** | Hip $\to$ Shoulder $\to$ Elbow | Extension ($25^\circ \to 85^\circ$) | Scapular elevation ceiling | Raise angle $> 110^\circ$ | *"Stop at shoulder height (90 deg)"* |
| **Tricep Pushdowns** | Shoulder $\to$ Elbow $\to$ Wrist | Extension ($80^\circ \to 155^\circ$) | Humeral displacement | Arm drift $> 35^\circ$ | *"Keep upper arms still"* |

---

## ◈ Design Language: Cyber-Zen Luxe

SVORA implements a signature **Cyber-Zen Luxe** visual system designed to evoke the ambiance of an ultra-premium, high-tech wellness sanctuary.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CYBER-ZEN LUXE PALETTE                          │
├──────────────┬──────────────┬──────────────┬──────────────┬────────────┤
│  Jet Void    │  Gold Leaf   │Mercury Silver│ Emerald Glow │ Deep Mauve │
│   #000000    │   #D4AF37    │   #E5E5E5    │   #10B981    │  #B0413E   │
│ (Background) │(Gold Accent) │ (Typography) │ (Live State) │(Warning/Off│
└──────────────┴──────────────┴──────────────┴──────────────┴────────────┘
```

- **Atmosphere:** Deep void blacks, blueprint architectural grids, dynamic spotlight light leaks, and high-frequency noise textures.
- **Typography Pairing:**
  - *Headings:* `Playfair Display` (High-contrast Serif & Italic elegance)
  - *Body / Interface:* `Inter` (Sans-serif readability and clarity)
  - *Metadata & Telemetry:* `JetBrains Mono` (Technical, tabular figures)
- **Kinetic Micro-Interactions:**
  - `CustomCursor`: Hardware-accelerated magnetic cursor with smooth trailing spring physics and context-sensitive hover states.
  - `DecryptedText`: Cybernetic character scrambling effect for primary section reveals.
  - `BaryonLoader`: Pulsing geometric dot matrix indicator for asynchronous actions.
  - `Preloader`: Monospaced system boot simulator on initial entry.

---

## ◈ Project Directory Structure

```ascii
fitness/
├── src/
│   ├── middleware.ts                 # Edge auth guard & session renewal
│   ├── app/
│   │   ├── layout.tsx                # Root layout with ThemeProvider & Cursor
│   │   ├── page.tsx                  # Landing experience & kinetic hero
│   │   ├── globals.css               # Tailwind CSS v4 variables & utilities
│   │   ├── uplink/
│   │   │   └── page.tsx              # 5-step biometric & somatic intake wizard
│   │   ├── protocol/
│   │   │   └── page.tsx              # Protocol dashboard & MediaPipe posture coach
│   │   ├── journal/
│   │   │   └── page.tsx              # Nutritional tracker & photographic delta scan
│   │   ├── login/page.tsx            # Athlete authentication terminal
│   │   ├── register/page.tsx         # Account creation & credential generation
│   │   └── api/
│   │       ├── auth/                 # Authentication microservices
│   │       │   ├── login/route.ts    # Credential verification & JWT cookie issue
│   │       │   ├── register/route.ts # User creation with bcrypt password hash
│   │       │   ├── me/route.ts       # Identity retrieval from active session
│   │       │   └── logout/route.ts   # Session destruction & cookie expulsion
│   │       ├── generate/route.ts     # Gemini 3.8 Flash workout synthesis
│   │       ├── analyze-body/route.ts # Gemini multimodal visual delta analysis
│   │       ├── get-routine/route.ts  # Fetch user's latest saved workout plan
│   │       ├── save-routine/route.ts # Persist generated routine to database
│   │       └── journal/log/route.ts  # Log and query daily calorie/macro entries
│   ├── components/
│   │   ├── BaryonLoader.tsx          # Geometric action loader animation
│   │   ├── CustomCursor.tsx          # Magnetic desktop cursor tracker
│   │   ├── DecryptedText.tsx         # Character scrambling text animation
│   │   ├── JournalSection.tsx        # Tabbed macro logging & progress photo interface
│   │   ├── Preloader.tsx             # Cinematic boot sequence simulator
│   │   ├── ThemeProvider.tsx         # Next-themes context provider
│   │   └── ThemeToggle.tsx           # Luxury theme switch component
│   └── lib/
│       ├── ai-validator.ts           # Schema validation, retry logic, error injection
│       ├── auth.ts                   # Jose JWT signing, verification, cookie helpers
│       ├── gemini.ts                 # Gemini 3.8 Flash engine with cascade & fallback
│       └── mongodb.ts                # Dual MongoDB Atlas client & Mock DB fallback
├── scripts/
│   ├── smoke-ai.js                   # Direct Gemini 3.8 Flash smoke test script
│   └── test-oss-120b.js              # Model testing utility
├── public/                           # Static assets, badges, noise textures
├── jest.config.js                    # Testing suite configuration
└── package.json                      # Dependency manifest & scripts
```

---

## ◈ API Reference

| Endpoint | Method | Auth Required | Request Payload Summary | Response Payload Summary |
| :--- | :---: | :---: | :--- | :--- |
| `/api/auth/register` | `POST` | No | `{ name, email, password }` | `{ success: true, user: { id, name, email } }` |
| `/api/auth/login` | `POST` | No | `{ email, password }` | `{ success: true, user: { id, name, email } }` |
| `/api/auth/me` | `GET` | Yes | *None (Cookie session)* | `{ id, name, email }` |
| `/api/auth/logout` | `POST` | Yes | *None* | `{ success: true }` |
| `/api/generate` | `POST` | Yes | `{ age, height, weight, bodyType, goal, trainingLocation, fasting, image? }` | Full `WorkoutPlan` (JSON structure) |
| `/api/analyze-body` | `POST` | Yes | `{ beforeImage: string, currentImage: string }` | Full `BodyAnalysis` (JSON structure) |
| `/api/get-routine` | `GET` | Optional | *None (Session or guest)* | `{ routine: WorkoutPlan \| null }` |
| `/api/save-routine` | `POST` | Yes | `WorkoutPlan` object | `{ success: true, id: string }` |
| `/api/journal/log` | `POST` | Yes | `{ type: "calorie", cal: number, pro: number }` | `{ success: true, id: string }` |
| `/api/journal/log` | `GET` | Yes | *None* | `JournalEntry[]` |

---

## ◈ Quickstart & Deployment

### Prerequisites

- **Node.js:** `v20.x` or higher
- **npm:** `v10.x` or higher
- **Google Gemini API Key:** For real-time Gemini 3.8 Flash inference
- **MongoDB Atlas Connection URI:** *(Optional; defaults to In-Memory Simulation Mode)*

---

### Environment Calibration

Create a `.env.local` file in the project root:

```env
# Google Gemini AI Engine
GEMINI_API_KEY="AIzaSyYourGeminiApiKeyHere"

# Security & Session Infrastructure
JWT_SECRET="generate_a_secure_random_32_character_string"

# Data Persistence (Optional: Leave empty or placeholder to activate Simulation Mode)
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/svora_db?retryWrites=true&w=majority"
```

---

### Installation & Execution

```bash
# 1. Clone repository
git clone https://github.com/your-username/svora-wellness.git
cd svora-wellness

# 2. Install dependencies
npm install

# 3. Launch development server
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to enter the interface.

---

### Verification & Smoke Tests

Verify that your AI credentials and model availability are live:

```bash
# Run direct Gemini 3.8 Flash AI inference smoke test
npm run smoke:ai

# Execute full test suite (12 test suites, 56 unit/integration tests)
npm test

# Run test coverage report
npm run test:coverage
```

---

## ◈ Resilience & Simulation Mode

SVORA is engineered with high-fault tolerance:

```
┌────────────────────────────────────────────────────────┐
│             SVORA FAULT TOLERANCE PIPELINE             │
├─────────────────────────┬──────────────────────────────┤
│ Failure Scenario        │ Built-In Recovery Mechanism  │
├─────────────────────────┼──────────────────────────────┤
│ MongoDB offline         │ Auto-failover to In-Memory   │
│ or unconfigured         │ MockCollection with CRUD     │
├─────────────────────────┼──────────────────────────────┤
│ Gemini 3.8 Flash        │ Instant automatic failover   │
│ high demand (503)       │ to Gemini 3 Flash / 2.5 Flash│
├─────────────────────────┼──────────────────────────────┤
│ Upstream model timeout  │ Deterministic personalized   │
│ or total network outage │ local synthesis (Zero 502s)  │
├─────────────────────────┼──────────────────────────────┤
│ Camera stream drops or  │ Graceful "Step into frame"   │
│ poor joint visibility   │ HUD prompt + side swap       │
└─────────────────────────┴──────────────────────────────┘
```

---

## ◈ License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

**SVORA // Engineering Somatic Excellence**  
*Minimal Luxury • Biometric Intelligence • Kinetic Precision*

</div>
