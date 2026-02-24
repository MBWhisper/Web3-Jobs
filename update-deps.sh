#!/usr/bin/env bash
set -euo pipefail

# Configuration
BASE_BRANCH="main"
DATE=$(date +%Y%m%d)
BRANCH="chore/upgrade-deps-${DATE}"
NCU_OUTPUT="ncu-output.txt"
PR_BODY="pr-body.md"

# Preconditions checks
if ! command -v git >/dev/null 2>&1; then
  echo "git غير مثبت. أوقف السكربت."
  exit 1
fi
if ! command -v npx >/dev/null 2>&1; then
  echo "npx غير متاح. ثبّت Node.js/npm."
  exit 1
fi

# Ensure we're in repo root and package.json exists
if [ ! -f package.json ]; then
  echo "لم أجد package.json في المجلد الحالي. ضع السكربت في جذر المشروع."
  exit 1
fi

# Fetch & create branch
git fetch origin
git checkout "${BASE_BRANCH}"
git pull origin "${BASE_BRANCH}"
git checkout -b "${BRANCH}"

# Run npm-check-updates and record changes
echo "Running npx npm-check-updates -u ..."
npx npm-check-updates -u | tee "${NCU_OUTPUT}"

# Install updated deps (updates lockfile)
echo "Installing updated packages..."
npm install

# Run build and tests if present
echo "Running build (if defined)..."
if npm run | grep -q "build"; then
  if ! npm run build; then
    echo "تحذير: البناء فشل. راجع الأخطاء أعلاه."
  fi
fi

echo "Running tests (if defined)..."
if npm run | grep -q "test"; then
  if ! npm test; then
    echo "تحذير: بعض الاختبارات فشلت. راجع النتائج أعلاه."
  fi
fi

# Lint (optional)
if npm run | grep -q "lint"; then
  echo "Running lint..."
  npm run lint || echo "تحذير: lint أظهر أخطاء."
fi

# Prepare PR body that includes the ncu output
cat > "${PR_BODY}" <<EOF
chore(deps): upgrade dependencies to latest (${DATE})

This PR upgrades dependencies to their latest versions using npm-check-updates.

Summary of changes (from ncu):
\`\`\`
$(sed 's/^/  /' "${NCU_OUTPUT}" || true)
\`\`\`

Notes:
- Please review major version upgrades carefully (they may include breaking changes).
- Run full CI and manual smoke tests for critical flows.
- If tests or build fail, please check the changelogs of the updated packages.

Actions performed by this script:
1. npx npm-check-updates -u
2. npm install (updates lockfile)
3. npm run build (if defined)
4. npm test (if defined)
5. Commit changes and push branch
EOF

# Commit changes (only if there are modifications)
git add package.json package-lock.json yarn.lock pnpm-lock.yaml || true
if git diff --staged --quiet; then
  echo "لا توجد تغييرات بعد الترقية."
  exit 0
fi

git commit -m "chore(deps): upgrade dependencies to latest (${DATE})"
git push --set-upstream origin "${BRANCH}"

# Create PR via gh if available
if command -v gh >/dev/null 2>&1; then
  gh pr create --base "${BASE_BRANCH}" --title "chore(deps): upgrade dependencies (${DATE})" --body-file "${PR_BODY}"
  echo "PR created via gh."
else
  echo "gh CLI غير مثبت. الفرع دفع بنجاح: ${BRANCH}"
  echo "استخدم: gh pr create --base ${BASE_BRANCH} --title \"chore(deps): upgrade dependencies (${DATE})\" --body-file ${PR_BODY}"
fi

echo "انتهى. اطلع على نتائج ncu في ${NCU_OUTPUT} ومحتوى PR في ${PR_BODY}."
