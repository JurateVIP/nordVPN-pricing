## E2E Testing Project (Playwright + TypeScript + POM)

This project is end‑to‑end (E2E) testing setup using **Playwright**, **TypeScript**, and the **Page Object Model (POM)** pattern.

### Prerequisites

- **Node.js**
- **npm**

```bash
cp .env.example .env
```

### Install dependencies

```bash
npm install
npx playwright install
```

### Run tests

- **Headless run** (default):

```bash
npm test
```

- **Headed (visible browser)**:

```bash
npm run test:headed
```

- **Playwright Test UI**:

```bash
npm run test:ui
```

### Covered test cases

|                                       |
| ------------------------------------- |
| GTM events test                       |
| Measure page load performance         |
| Plan duration dropdown test           |
| Add plan to the cart test             |
| Price check test                      |
| Language selection test               |
| HTTPS protocol test                   |
| Security headers test                 |
| Pricing page visual test              |

## Creating your own tests

1. Project fixtures is under `/POM/fixtures`
2. Create a POM file under `/POM` directory 
3. POM objects are contructer in `/POM/fixtures/pom-fixtures.ts`
4. Register newly created fixtures in `/POM/fixtures/fixtures.ts`
5. Create tests in `/tests` directory
