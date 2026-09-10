#!/bin/bash

echo "🔍 Verifying Portfolio Build..."
echo ""

# Check node version
echo "📦 Node version:"
node --version
echo ""

# Check npm
echo "📦 npm version:"
npm --version
echo ""

# Check key files exist
echo "📋 Key files:"
[ -f "package.json" ] && echo "  ✅ package.json" || echo "  ❌ package.json"
[ -f "astro.config.mjs" ] && echo "  ✅ astro.config.mjs" || echo "  ❌ astro.config.mjs"
[ -f ".github/workflows/deploy.yml" ] && echo "  ✅ GitHub Actions workflow" || echo "  ❌ GitHub Actions workflow"
[ -f ".gitignore" ] && echo "  ✅ .gitignore" || echo "  ❌ .gitignore"
echo ""

# Check src structure
echo "📁 Source structure:"
[ -d "src/pages" ] && echo "  ✅ Pages" || echo "  ❌ Pages"
[ -d "src/components" ] && echo "  ✅ Components" || echo "  ❌ Components"
[ -d "src/layouts" ] && echo "  ✅ Layouts" || echo "  ❌ Layouts"
[ -d "src/styles" ] && echo "  ✅ Styles" || echo "  ❌ Styles"
echo ""

# Test build
echo "🏗️  Building..."
export ASTRO_TELEMETRY_DISABLED=1
if npm run build > /tmp/build.log 2>&1; then
  echo "  ✅ Build successful"
  
  # Check output
  if [ -d "dist" ]; then
    PAGE_COUNT=$(find dist -name "index.html" | wc -l)
    echo "  ✅ Generated $PAGE_COUNT pages"
    
    # List pages
    echo ""
    echo "📄 Generated pages:"
    find dist -name "index.html" | sort | sed 's|dist/||; s|/index.html||; s|^$|/ (homepage)|' | sed 's/^/     /'
  fi
else
  echo "  ❌ Build failed"
  echo ""
  echo "Build log:"
  tail -20 /tmp/build.log
fi

echo ""
echo "✅ Verification complete!"
echo ""
echo "Next steps:"
echo "  1. npm install (if not done)"
echo "  2. npm run build"
echo "  3. npm run preview (to test locally)"
echo "  4. git add . && git commit && git push"
