# Usage Examples

This folder contains practical examples of how to use the AiCreating component in different scenarios.

## Examples Included

### 1. Basic Usage (`basic-usage.tsx`)
The simplest implementation with a button to start/stop the animation.

**Learn:**
- Basic component setup
- State management with `useState`
- Simple timer simulation

**Use this when:** You need a quick proof of concept or simple demo.

---

### 2. API Call Example (`api-call-example.tsx`)
Real-world example with API integration, error handling, and result display.

**Learn:**
- Async/await with animation
- Error handling patterns
- Displaying results after completion
- TypeScript interfaces for API responses

**Use this when:** You're integrating with backend APIs or external services.

---

### 3. Form Submission (`form-submission.tsx`)
Complete form with validation, submission, and success feedback.

**Learn:**
- Form handling with React
- Conditional rendering (form → animation → success)
- Multi-field state management
- User feedback patterns

**Use this when:** You have forms that trigger backend processing.

---

## Running Examples

### In Next.js App Router

1. Copy the example file to your `app` directory:
```bash
cp examples/basic-usage.tsx app/example/page.tsx
```

2. Navigate to `/example` in your browser

### As Standalone Components

Import and use in any page or component:

```typescript
import BasicUsageExample from './examples/basic-usage';

export default function Page() {
  return <BasicUsageExample />;
}
```

## Modifying Examples

Feel free to modify these examples:
- Change animation duration
- Add your own API endpoints
- Customize styling
- Add more fields to forms

## Creating Your Own Example

Template structure:
```typescript
'use client';

import { useState } from 'react';
import { AiCreating } from '../index';

export default function MyExample() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    setIsLoading(true);

    // Your logic here
    await yourAsyncOperation();

    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <AiCreating isLoading={isLoading} />}
      <button onClick={handleAction}>Start</button>
    </div>
  );
}
```

## Best Practices from Examples

1. **Always use try/finally** - Ensures `isLoading` is set to false even if errors occur
2. **Show feedback** - Display success/error messages after animation completes
3. **Disable buttons during loading** - Prevent duplicate submissions
4. **Clear state** - Reset forms and error messages before new operations
5. **Handle errors gracefully** - Show user-friendly error messages

## Common Patterns

### Pattern: Conditional Rendering
```typescript
{isLoading ? (
  <AiCreating isLoading={isLoading} />
) : (
  <YourContent />
)}
```

### Pattern: Error Handling
```typescript
try {
  await operation();
} catch (err) {
  setError(err.message);
} finally {
  setIsLoading(false);
}
```

### Pattern: Success Callback
```typescript
<AiCreating
  isLoading={isLoading}
  onComplete={() => {
    console.log('Done!');
    showSuccessMessage();
  }}
/>
```

## Need More Examples?

Check the main Dashboard component (`Dashboard.tsx`) for a complete showcase with all features and best practices.

## Contributing Examples

Have a great use case? Create a PR with your example following the structure above!
