# Supabase Authentication Setup for Next.js 14+

## Step 1: Install Required Package

```bash
npm install @supabase/auth-helpers-nextjs
```

**Note:** If you encounter issues, you may need to use the newer `@supabase/ssr` package instead, as `@supabase/auth-helpers-nextjs` is being deprecated. However, the code above uses the package you specified.

## Step 2: Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 3: Files Created

1. **lib/supabase.ts** - Supabase client and auth functions
2. **app/signup/page.tsx** - Sign up page with validation
3. **app/login/page.tsx** - Login page with validation
4. **app/api/create-user/route.ts** - API route to create user record

## Step 4: Update lib/supabase.ts (if using @supabase/ssr instead)

If you need to use the newer package, update `lib/supabase.ts`:

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export const supabase = createClient()
```

## Step 5: Update API Route (if using @supabase/ssr)

Update `app/api/create-user/route.ts`:

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      },
    }
  )
  // ... rest of the code
}
```

## Features Implemented

✅ Email validation (must contain @)
✅ Password validation (minimum 6 characters)
✅ Loading states on buttons
✅ Error message display
✅ Redirect after successful auth
✅ User record creation in users table
✅ Links between signup and login pages
✅ Tailwind styling matching landing page

