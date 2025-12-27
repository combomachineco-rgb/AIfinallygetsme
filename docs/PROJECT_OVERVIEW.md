# FinallyGetsMe - Project Overview

## Product Model (December 2024)

### What We Deliver
Each customer receives exactly 3 outputs:

1. **Custom Instructions** (1 file, max 1500 characters)
   - Sets base preferences for ALL AI conversations
   - Covers: tone, response length, communication style, context, frustrations to avoid
   - User pastes once in ChatGPT Settings or Claude Personal Preferences
   - Active in every conversation forever

2. **Expert Persona 1** (1 long-form prompt)
   - Specialized prompt for user's first selected use case
   - Examples: Decision Coach, Email Writer, Research Assistant, etc.
   - Assumes custom instructions are already active
   - User pastes when they need this specific expertise

3. **Expert Persona 2** (1 long-form prompt)
   - Specialized prompt for user's second selected use case
   - Same format as Persona 1
   - User picks 2 most important use cases from 15 options

Total: 3 prompts per customer (not 5-10)

## User Journey

### Step 1: Answer Questions (~8 minutes)
User answers approximately 30 questions about:
- Preferred response length (3 sentences, paragraph, detailed)
- Communication tone (direct, friendly, professional, casual)
- Primary use cases for AI
- Context about their work/role
- Specific frustrations with generic AI

### Step 2: Select 2 Expert Personas
After questions, user sees list of available persona options.

**Persona options (TO BE DEFINED - creative work pending):**
- Approximately 15 persona types will be offered
- Examples might include: Decision Coach, Email Writer, Research Assistant, etc.
- Final list determined after writing and testing actual personas
- User selects exactly 2 based on their needs

**Current status:** Persona types not yet finalized. This is creative work that happens before launch.

### Step 3: Receive Custom Prompts
System generates:
- 1x Custom Instructions (max 1500 chars, covers general preferences)
- 2x Expert Personas (long-form, specialized for selected use cases)

All saved in user's dashboard with copy buttons.

## Database Schema

### custom_prompts table structure:
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key to users table)
- `prompt_type` (text, either 'custom_instructions' or 'persona')
- `prompt_name` (text, e.g., "Custom Instructions", "Decision Coach", "Email Writer")
- `full_prompt` (text, the complete prompt content)
- `created_at` (timestamp)

### Per-user data:
- 3 rows total in custom_prompts table
- 1 row: prompt_type = 'custom_instructions'
- 2 rows: prompt_type = 'persona'

## Generation Logic

### Custom Instructions Generator:
- Input: User's 30 question answers
- Output: 1500 character max prompt
- Covers: tone, length, style, context, frustrations
- General enough for ALL conversations
- Does NOT include use-case-specific behavior

### Persona Generator:
- Input: User's 30 answers + selected persona type
- Output: Long-form specialized prompt
- Assumes custom instructions are active
- Starts with acknowledgment: "I have custom instructions active that define my preferences. Your role as my [PERSONA]..."
- Specialized for the selected use case

## Quality Evaluation

### Custom Instructions Evaluation:
- Must be under 1500 characters
- Must cover key preference categories
- Must be general (not use-case specific)
- Score 1-10, must score 8+ to pass

### Persona Evaluation:
- Must build on custom instructions (not repeat them)
- Must be specialized for use case
- Must reference custom instructions being active
- Score 1-10, must score 8+ to pass
- If fails: regenerate with feedback (max 3 attempts)

## Why 1+2 Model

### Research-backed reasoning:
- 10 personas = overwhelming, unused
- Custom instructions fix 80% of AI frustration
- 2 specialized personas handle specific needs
- Works on free ChatGPT/Claude (no paid subscription required)
- Manageable, actually gets used

### User experience:
- Set custom instructions once (5 min)
- Use 2 personas when needed (5 sec to paste)
- Better than managing 10 different prompts
- Higher usage, better outcomes

