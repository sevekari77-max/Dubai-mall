# Dubai Mall Experience

A high-fidelity, interactive web application designed to present Dubai Mall as a global retail and experiential destination.

---

## Overview

This project explores how large-scale physical environments can be translated into a structured digital experience.

Instead of a traditional website, the application is built as a guided journey that combines narrative flow, motion, and data to communicate scale, opportunity, and user intent.

---

## Live

https://your-live-site-url.com

---

## Architecture

The application is built using a component-driven architecture with clear separation between presentation, interaction, and data layers.

* **App Router (Next.js):** Handles routing and layout composition
* **Component Modules:** Isolated UI sections with scoped responsibility
* **Data Layer (`lib/`):** Centralized configuration for content and structure
* **Dynamic Imports:** Used to defer non-critical components and reduce initial bundle size

---

## Key Decisions

### 1. Client vs Server Boundaries

The primary experience layer is client-rendered to support interaction and animation.
Non-interactive structure is kept minimal to avoid unnecessary overhead.

### 2. Performance Strategy

* Reduced initial JavaScript payload
* Deferred heavy modules using dynamic imports
* Minimized render-blocking behavior
* Optimized image delivery based on viewport

### 3. Motion Design

Framer Motion is used selectively to support transitions and sequencing without blocking initial render.

---

## Performance Considerations

* Optimized Largest Contentful Paint (LCP)
* Controlled Total Blocking Time (TBT)
* Removed unnecessary polyfills and legacy transforms
* Avoided excessive layout shifts

---

## Stack

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Framer Motion

---

## Local Development

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
npm install
npm run dev
```

---

## Project Structure

```text
app/                Routing and layout
components/         Feature modules and UI components
lib/                Data models and utilities
public/             Static assets
```
## LightHouse Result

Performance: 88  
Accessibility: 100  
Best Practices: 96  
SEO: 100

---

## Deployment

The project is configured for deployment on Vercel.

Production builds are triggered via push to the main branch.

---

## Notes

This project is intended as a demonstration of interaction design, performance optimization, and scalable frontend architecture.
