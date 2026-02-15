import { test as base, expect } from '@playwright/test';
import { preparePageFixtures, PreparePageFixtures } from './prepare-page-fixtures';
import { pomFixtures, POMFixtures } from './pom-fixtures';

export const test = base
.extend<PreparePageFixtures>(preparePageFixtures)
.extend<POMFixtures>(pomFixtures);

export { expect };
