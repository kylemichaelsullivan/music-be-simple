# Git Commit Guidelines

This document outlines the standardized commit message format used in the **music-be-simple** project to maintain consistency and improve code history readability. **Following this format makes automating versioning and change logs significantly easier**, enabling seamless integration with CI/CD pipelines and automated release processes.

## Commit Message Format

All commit messages should follow this format:

```
TYPE: Commit Message in Title Case
```

### Format Rules

1. **Type Prefix**: Start with one of the predefined types in uppercase
2. **Colon Separator**: Use a colon and space (`: `) to separate type from message
3. **Title Case**: Use Title Case for the commit message (capitalize first letter of each word)
4. **Descriptive**: Make the message clear and descriptive of what the commit accomplishes

## Commit Types

### ADD

Use for adding new files, features, or functionality.

**Examples:**

- `ADD: Chords Page Component`
- `ADD: Scales Page Component`
- `ADD: Write Page Component`
- `ADD: Navigation Component`
- `ADD: App Store with Zustand`
- `ADD: Chord Data Utilities`

### BRANCH

Use for creating new feature branches or environment-specific branches.

**Examples:**

- `BRANCH: Feature Branch for Samples Section`
- `BRANCH: Development Environment Setup`
- `BRANCH: Hotfix Branch for Critical Bug`

### DEPLOY

Use for commits specifically made for deployment purposes.

**Examples:**

- `DEPLOY: Production Build Configuration`
- `DEPLOY: Update Environment Variables for Staging`
- `DEPLOY: Optimize Bundle Size for Production`
- `DEPLOY: Configure Vite Build Settings`

### FIX

Use for specific, targeted bug fixes.

**Examples:**

- `FIX: Resolve Chord Display Issue on Mobile`
- `FIX: Correct TypeScript Type Definitions`
- `FIX: Fix State Persistence in Write Page`
- `FIX: Address TypeScript Compilation Errors`
- `FIX: Resolve Navigation Active State Not Updating`
- `FIX: Fix Scales State Not Persisting`

### MERGE

Use when merging one branch into another.

**Examples:**

- `MERGE: Feature Branch into Main`
- `MERGE: Hotfix Branch into Development`
- `MERGE: Pull Request #123 into Main`

### REFACTOR

Use for refactoring, renaming, reorganizing, or restructuring code without changing functionality.

**Examples:**

- `REFACTOR: Reorganize Component File Structure`
- `REFACTOR: Rename State Variables for Better Clarity`
- `REFACTOR: Extract Chord Logic into Reusable Component`
- `REFACTOR: Optimize Type Definitions`
- `REFACTOR: Simplify Store Structure`

### REMOVE

Use for removing files, features, or functionality.

**Examples:**

- `REMOVE: Delete Unused Dependencies`
- `REMOVE: Remove Deprecated Config Options`
- `REMOVE: Clean Up Temporary Test Files`
- `REMOVE: Remove Legacy Section Component`

### REVERT

Use when rolling back a previous commit.

**Examples:**

- `REVERT: Rollback Feature That Caused Performance Issues`
- `REVERT: Undo Config Schema Changes`
- `REVERT: Revert to Previous Component Structure`

### UPDATE

Use for updating existing files, features, or functionality.

**Examples:**

- `UPDATE: Upgrade React to Version 19`
- `UPDATE: Modify Chords Page Component Styling`
- `UPDATE: Update Scales Data Structure`
- `UPDATE: Enhance Write Page with New Features`
- `UPDATE: Update Tailwind CSS Configuration`
- `UPDATE: Improve Navigation Component Layout`

## File Handling Guidelines

### AI Chat Workflow

When working with files that have uncommitted changes in an AI chat context, follow these rules:

1. **No Plan Files**: Do not create any plan files or temporary planning documents. All planning should be done in commit messages or documentation, not in separate plan files.

2. **Include All Uncommitted Changes**: All files with uncommitted changes must be included when grouping files for commits. Do not leave files with uncommitted changes ungrouped.

3. **One Commit Per File**: Each file should only be assigned to one commit group. Files should not be split across multiple commit groups or included in multiple commits simultaneously.

4. **No Staging**: Do not add or stage files. Group files with uncommitted changes logically in the AI chat for commit organization.

## Best Practices

### Message Length

- Keep commit messages concise but descriptive
- Aim for 50 characters or less for the main message
- Use the body for detailed explanations if needed

### Specificity

- Be specific about what changed
- Avoid vague messages like "Fix bug" or "Update code"
- Include context about why the change was made
- Reference specific components or config sections when relevant

### Consistency

- Always use the same format across the project
- Follow the established type categories
- Maintain consistent capitalization and punctuation

### Examples of Good vs Bad Messages

**Good:**

- `FIX: Resolve Chord Display Issue on Mobile Devices`
- `ADD: Implement Scales Page with State Persistence`
- `REFACTOR: Extract Chord Logic into Reusable Component`
- `UPDATE: Enhance Write Page with Auto-Save Feature`

**Bad:**

- `fix bug` (missing type prefix, not title case)
- `ADD: stuff` (too vague)
- `Update: Fixed the thing` (inconsistent format)
- `FIX: chords` (not title case, too vague)

## Multi-line Commit Messages

For complex changes, you can add a detailed description after the main message:

```
FIX: Resolve Chord Display Issue on Mobile

- Fix chord rendering not working on iOS Safari
- Add fallback display for older browsers
- Update chord component layout logic
- Test on multiple mobile devices and browsers
```

## Branch Naming Convention

While not strictly part of commit messages, branch names should follow a similar pattern:

- `feature/chords-page`
- `feature/scales-page`
- `fix/state-persistence-issue`
- `refactor/store-structure`
- `update/dependencies`
- `hotfix/critical-mobile-bug`

## Project-Specific Context

### Common Components

When committing changes related to components, be specific:

- **Page Components**: Chords, Scales, Write
- **Layout Components**: Root Route, Navigation
- **State Management**: App Store (Zustand), State Persistence
- **Routing**: TanStack Router configuration, route definitions

### Data and State

When committing data-related changes:

- Reference specific state slices: scales, chords, write
- Mention if changes affect state structure, types, or persistence
- Note if changes require state migration or type updates
- Reference navigation types and tab configurations

### Styling Changes

When committing styling changes:

- Reference Tailwind CSS utility classes when applicable
- Mention specific components or pages affected
- Note if changes affect responsive behavior or global styles
- Reference globals.css for global style changes

## Automation Benefits

Following this standardized commit format provides significant advantages for automation:

### Automated Versioning

- **Semantic Versioning**: Commit types map directly to semantic versioning (ADD/FIX = patch, major features = minor, breaking changes = major)
- **Release Automation**: Tools can automatically determine version bumps based on commit types
- **Changelog Generation**: Commit messages can be parsed to generate comprehensive changelogs

### Automated Change Logs

- **Structured Data**: Each commit provides structured data for automated processing
- **Categorized Changes**: Changes are automatically categorized by type (features, fixes, refactors, etc.)
- **Release Notes**: Generate detailed release notes by filtering commits by type and date range

### CI/CD Integration

- **Automated Releases**: Trigger releases based on commit patterns
- **Quality Gates**: Enforce commit message standards in pull requests
- **Deployment Triggers**: Use commit types to determine deployment strategies

## Tools and Automation

Consider using commit message templates or hooks to enforce these guidelines:

### Git Hook Example

Create a `.git/hooks/commit-msg` file to validate commit message format:

```bash
#!/bin/sh
commit_regex='^(ADD|BRANCH|DEPLOY|FIX|MERGE|REFACTOR|REMOVE|REVERT|UPDATE): .*'

if ! grep -qE "$commit_regex" "$1"; then
    echo "ERROR: Commit message must match pattern: TYPE: Message in Title Case"
    echo "Valid types: ADD, BRANCH, DEPLOY, FIX, MERGE, REFACTOR, REMOVE, REVERT, UPDATE"
    exit 1
fi
```

### Automated Changelog Example

With this format, you can easily generate changelogs using tools like:

```bash
# Generate changelog from last release
git log --oneline --grep="^ADD:" --since="1 month ago" > features.md
git log --oneline --grep="^FIX:" --since="1 month ago" > fixes.md
git log --oneline --grep="^REFACTOR:" --since="1 month ago" > refactors.md
```

### Version Bumping Script Example

```bash
#!/bin/bash
# Determine version bump based on commit types since last tag
commits_since_tag=$(git log --oneline --grep="^(ADD|FIX|REFACTOR|REMOVE|UPDATE):" $(git describe --tags --abbrev=0)..HEAD)

if echo "$commits_since_tag" | grep -q "^ADD:"; then
    echo "Minor version bump needed (new features)"
elif echo "$commits_since_tag" | grep -q "^FIX:"; then
    echo "Patch version bump needed (bug fixes)"
else
    echo "No version bump needed"
fi
```

## Conclusion

Following these guidelines ensures:

- **Consistent and readable commit history**
- **Easy identification of change types**
- **Better collaboration among team members**
- **Simplified code review process**
- **Clear project evolution tracking**
- **Automated versioning and release management**
- **Effortless changelog generation**
- **Seamless CI/CD integration**

**Remember**: Good commit messages are an investment in the future maintainability of your codebase. The structured format enables powerful automation that saves time and reduces human error in release processes.
