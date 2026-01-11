# Publishing to NPM

This guide explains how to publish the AI Animation Framework to npm, making it available for other developers and AI coding agents to use.

## Prerequisites

### 1. Create an NPM Account
If you don't have one already:
1. Go to [npmjs.com](https://www.npmjs.com/)
2. Click "Sign Up"
3. Verify your email address

### 2. Login to NPM
```bash
npm login
```

Enter your credentials when prompted.

### 3. Verify Login
```bash
npm whoami
```

Should display your npm username.

## Pre-Publish Checklist

Before publishing, ensure:

- [x] Package name is unique (check on npmjs.com)
- [x] Version number is correct in `package.json`
- [x] README.md is comprehensive
- [x] LICENSE file exists
- [x] All examples work correctly
- [x] No sensitive data in files
- [x] .gitignore excludes node_modules, .next, etc.

## Package Name

Current package name: `ai-animation-framework`

**Check availability:**
```bash
npm search ai-animation-framework
```

**If taken, update `package.json`:**
```json
{
  "name": "@your-username/ai-animation-framework"
}
```

Scoped packages (with `@username/`) are always available under your namespace.

## Files Included in Package

Defined in `package.json` under `files`:
```json
"files": [
  "AiCreating.tsx",
  "Dashboard.tsx",
  "AiCreatingExample.tsx",
  "index.ts",
  "README.md",
  "LICENSE"
]
```

**Preview what will be published:**
```bash
npm pack --dry-run
```

## Version Management

### Semantic Versioning
- **1.0.0** - Initial release
- **1.0.1** - Patch (bug fixes)
- **1.1.0** - Minor (new features, backward compatible)
- **2.0.0** - Major (breaking changes)

### Bump Version
```bash
# Patch (1.0.0 → 1.0.1)
npm version patch

# Minor (1.0.0 → 1.1.0)
npm version minor

# Major (1.0.0 → 2.0.0)
npm version major
```

## Publishing Steps

### Step 1: Clean Build
```bash
# Remove old builds
rm -rf .next node_modules

# Fresh install
npm install

# Run linting
npm run lint

# Test the dashboard
npm run dev
```

### Step 2: Test Package Locally
```bash
# Create tarball
npm pack

# This creates: ai-animation-framework-1.0.0.tgz
# Test in another project:
# npm install /path/to/ai-animation-framework-1.0.0.tgz
```

### Step 3: Publish to NPM

**Dry run first (recommended):**
```bash
npm publish --dry-run
```

**Actual publish:**
```bash
npm publish
```

**For scoped packages:**
```bash
npm publish --access public
```

### Step 4: Verify Publication
```bash
# Check on NPM
npm view ai-animation-framework

# Try installing
npm install ai-animation-framework
```

## Post-Publish

### 1. Create Git Tag
```bash
git tag v1.0.0
git push origin v1.0.0
```

### 2. Update GitHub Repository
- Add repository URL to `package.json`
- Push code to GitHub
- Create a release on GitHub

### 3. Update README Badges
Add badges to README.md:
```markdown
![npm version](https://img.shields.io/npm/v/ai-animation-framework)
![npm downloads](https://img.shields.io/npm/dm/ai-animation-framework)
![license](https://img.shields.io/npm/l/ai-animation-framework)
```

## Updating the Package

When you make changes:

```bash
# 1. Make changes to code

# 2. Test locally
npm run dev

# 3. Bump version
npm version patch  # or minor/major

# 4. Publish update
npm publish

# 5. Tag and push
git tag v1.0.1
git push origin v1.0.1
```

## Package Info After Publishing

Users will install with:
```bash
npm install ai-animation-framework
```

And import:
```typescript
import { AiCreating } from 'ai-animation-framework';
```

Package page: `https://www.npmjs.com/package/ai-animation-framework`

## Troubleshooting

### Error: "Package name already exists"
**Solution:** Use a scoped package or choose a different name:
```json
{
  "name": "@yourusername/ai-animation-framework"
}
```

### Error: "You must verify your email"
**Solution:** Check your email and click the verification link from NPM.

### Error: "403 Forbidden"
**Solution:** Run `npm login` again and verify credentials.

### Error: "402 Payment Required"
**Solution:** For scoped packages, use `--access public`:
```bash
npm publish --access public
```

## Best Practices

1. **Never publish without testing** - Always test locally first
2. **Use semantic versioning** - Follow semver guidelines strictly
3. **Document breaking changes** - Update README with migration guides
4. **Keep dependencies minimal** - Only include necessary dependencies
5. **Write clear commit messages** - Document what changed in each version
6. **Respond to issues** - Monitor GitHub issues and npm feedback

## Unpublishing (Emergency Only)

**Warning:** Only unpublish within 72 hours of publishing. After that, you can only deprecate.

```bash
# Unpublish a specific version
npm unpublish ai-animation-framework@1.0.0

# Deprecate instead (preferred)
npm deprecate ai-animation-framework@1.0.0 "Use version 1.0.1 instead"
```

## Making the Package Private

If you want to test before public release:

1. First publish:
```bash
npm publish --access restricted
```

2. Later make public:
```bash
npm access public ai-animation-framework
```

## Continuous Integration

For automated publishing, add to `.github/workflows/publish.yml`:

```yaml
name: Publish to NPM

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm install
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Resources

- [NPM Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [Package.json Documentation](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)

## Support

After publishing, monitor:
- NPM downloads statistics
- GitHub issues
- User feedback
- Security vulnerabilities

Good luck with your npm package! 🚀
