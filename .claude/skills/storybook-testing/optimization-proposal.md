# Storybook Testing Optimization Proposal

## Executive Summary

CSF Next offers two powerful mechanisms for test optimization:

1. **Step Functions** - grouping multiple tests within a single story
2. **Story Composition** - reusing play functions across stories

## Current vs Optimized Approach

### ❌ Current Approach (Multiple Stories)

```typescript
export const EmptyForm = meta.story({
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("form")).toBeInTheDocument();
    await expect(canvas.getByLabelText("Email")).toHaveValue("");
  }
});

export const FilledForm = meta.story({
  args: {
    defaultValues: { email: "test@example.com", password: "12345" }
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText("Email")).toHaveValue("test@example.com");
  }
});

export const ValidationErrors = meta.story({
  play: async ({ canvas, userEvent }) => {
    const submitBtn = canvas.getByRole("button", { name: "Submit" });
    await userEvent.click(submitBtn);
    await expect(canvas.getByText("Email is required")).toBeInTheDocument();
  }
});

export const SuccessfulSubmission = meta.story({
  args: { onSubmit: fn() },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.type(canvas.getByLabelText("Email"), "test@example.com");
    await userEvent.type(canvas.getByLabelText("Password"), "secret123");
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
    await expect(args.onSubmit).toHaveBeenCalled();
  }
});
```

**Issues:**

- 4 separate stories for a single form
- Code duplication (repeated `getByLabelText('Email')`)
- Each story renders the component from scratch

### ✅ Optimized Approach A: Step-Based Testing

**Best for:** Complex user flows, form wizards, multi-step processes

```typescript
export const CompleteUserJourney = meta.story({
  args: { onSubmit: fn() },
  play: async ({ canvas, userEvent, args, step }) => {
    // Step 1: Initial render validation
    await step("Renders with empty form", async () => {
      await expect(canvas.getByRole("form")).toBeInTheDocument();
      await expect(canvas.getByLabelText("Email")).toHaveValue("");
      await expect(canvas.getByLabelText("Password")).toHaveValue("");
    });

    // Step 2: Validation testing
    await step("Shows validation errors on empty submit", async () => {
      const submitBtn = canvas.getByRole("button", { name: "Submit" });
      await userEvent.click(submitBtn);

      await expect(canvas.getByText("Email is required")).toBeInTheDocument();
      await expect(canvas.getByText("Password is required")).toBeInTheDocument();
    });

    // Step 3: Form filling
    await step("Accepts valid input", async () => {
      const emailInput = canvas.getByLabelText("Email");
      const passwordInput = canvas.getByLabelText("Password");

      await userEvent.type(emailInput, "test@example.com");
      await userEvent.type(passwordInput, "secret123");

      // Validation errors should disappear
      await expect(canvas.queryByText("Email is required")).not.toBeInTheDocument();
    });

    // Step 4: Successful submission
    await step("Submits form successfully", async () => {
      const submitBtn = canvas.getByRole("button", { name: "Submit" });
      await userEvent.click(submitBtn);

      await expect(args.onSubmit).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "secret123"
      });
    });
  }
});
```

**Benefits:**

- 1 story instead of 4
- Tests in logical order (user flow)
- Fewer render cycles
- Better debugging in Storybook UI (visible steps)
- Code is more readable - tells a story

**Drawbacks:**

- If one step fails, subsequent steps won't execute
- Story is longer

### ✅ Optimized Approach B: Story Composition

**Best for:** Building complex scenarios from simple building blocks

```typescript
// Base stories - reusable building blocks
export const EmptyForm = meta.story({
  tags: ["test-only"], // Don't show in docs
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("form")).toBeInTheDocument();
    await expect(canvas.getByLabelText("Email")).toHaveValue("");
  }
});

export const FilledFormBase = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText("Email"), "test@example.com");
    await userEvent.type(canvas.getByLabelText("Password"), "secret123");
  }
});

// Composed stories - combine building blocks
export const ValidationFlow = meta.story({
  play: async (context) => {
    const { canvas, userEvent, step } = context;

    await step("Start with empty form", async () => {
      await EmptyForm.play?.(context);
    });

    await step("Trigger validation", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
      await expect(canvas.getByText("Email is required")).toBeInTheDocument();
    });
  }
});

export const SuccessfulSubmission = meta.story({
  args: { onSubmit: fn() },
  play: async (context) => {
    const { canvas, userEvent, args, step } = context;

    await step("Fill form", async () => {
      await FilledFormBase.play?.(context);
    });

    await step("Submit", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
      await expect(args.onSubmit).toHaveBeenCalled();
    });
  }
});
```

**Benefits:**

- Reusability - base stories can be used in multiple places
- Modularity - easy to add new scenarios
- Each composed story tests a specific flow
- `test-only` tag hides helper stories from docs

**Drawbacks:**

- More stories overall (but base stories are small)
- Need to remember to pass `context`

### ✅ Optimized Approach C: Hybrid (RECOMMENDED)

**Best for:** Most real-world scenarios - combines benefits of both

```typescript
// Base interaction helpers (tagged test-only)
const fillValidForm = async (canvas: Canvas, userEvent: UserEvent) => {
  await userEvent.type(canvas.getByLabelText("Email"), "test@example.com");
  await userEvent.type(canvas.getByLabelText("Password"), "secret123");
};

// Documentation stories - show different states
export const Empty = meta.story({
  name: "Empty Form",
  tags: ["autodocs"]
  // No play function - just visual documentation
});

export const Prefilled = meta.story({
  name: "Pre-filled Form",
  tags: ["autodocs"],
  args: {
    defaultValues: { email: "user@example.com" }
  }
});

// Comprehensive test story - uses steps
export const UserInteractionFlow = meta.story({
  name: "Complete User Flow",
  tags: ["test-only"], // Not in docs, only for testing
  args: { onSubmit: fn() },
  play: async ({ canvas, userEvent, args, step }) => {
    await step("Initial render", async () => {
      await expect(canvas.getByRole("form")).toBeInTheDocument();
    });

    await step("Validation on empty submit", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
      await expect(canvas.getByText("Email is required")).toBeInTheDocument();
    });

    await step("Fill and submit", async () => {
      await fillValidForm(canvas, userEvent);
      await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
      await expect(args.onSubmit).toHaveBeenCalled();
    });
  }
});

// Edge case tests - focused scenarios
export const RapidClicks = meta.story({
  name: "Handles Rapid Clicks",
  tags: ["test-only"],
  args: { onSubmit: fn() },
  play: async ({ canvas, userEvent, args }) => {
    const btn = canvas.getByRole("button", { name: "Submit" });

    // Click multiple times quickly
    await userEvent.click(btn);
    await userEvent.click(btn);
    await userEvent.click(btn);

    // Should only submit once (debounced)
    await expect(args.onSubmit).toHaveBeenCalledTimes(1);
  }
});
```

**Benefits:**

- Visual stories for documentation (Empty, Prefilled)
- Comprehensive test story for main flow
- Focused edge case tests
- Helper functions eliminate duplication
- Clear separation: docs vs tests

## Decision Matrix

| Approach            | Stories Count         | Code Reuse | Debug UX  | Best For            |
| ------------------- | --------------------- | ---------- | --------- | ------------------- |
| **Current**         | Many (1 per scenario) | Low        | Good      | Simple components   |
| **Step-Based (A)**  | Few (1-2)             | Medium     | Excellent | User flows, wizards |
| **Composition (B)** | Medium                | High       | Good      | Modular testing     |
| **Hybrid (C)**      | Balanced              | High       | Excellent | **Most cases**      |

## Recommendations

### For Simple Components (< 5 props, minimal interaction)

- Use **Current Approach** - overkill to optimize
- Example: Avatar, Badge, Icon

### For Forms and Interactive Components

- Use **Hybrid Approach (C)** - best balance
- Example: LoginForm, ContactForm, SearchBar

### For Multi-Step Flows

- Use **Step-Based (A)** - maps to user journey
- Example: Checkout wizard, Onboarding flow

### For Highly Reusable Patterns

- Use **Composition (B)** - build component library tests
- Example: Design system components, shared UI patterns

## Implementation Strategy

### Phase 1: Update Skill Documentation

1. Add patterns for each approach
2. Update templates with hybrid pattern
3. Add helper function patterns
4. Document when to use each approach

### Phase 2: Update Agent Workflow

1. Add component complexity assessment
2. Recommend approach based on component type
3. Ask user preference for borderline cases
4. Generate optimized test structure

### Phase 3: Update Best Practices

1. Add "story optimization" section
2. Document `test-only` tag usage
3. Show helper function patterns
4. Add real examples from codebase

## Migration Guide

For existing stories:

```typescript
// Before: 3 separate stories
export const Empty = meta.story({ ... });
export const Filled = meta.story({ ... });
export const Submitted = meta.story({ ... });

// After: Hybrid approach
export const Empty = meta.story({
  tags: ['autodocs'] // Visual doc only
});

export const InteractionFlow = meta.story({
  tags: ['test-only'], // Comprehensive test
  play: async ({ step, ... }) => {
    await step('Empty state', ...);
    await step('Fill form', ...);
    await step('Submit', ...);
  }
});
```

## Next Steps

1. Review and approve approach
2. Update skill files with new patterns
3. Update agent workflow
4. Refactor existing stories (optional)
5. Document in examples.md
