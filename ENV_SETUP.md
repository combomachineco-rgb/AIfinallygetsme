# Environment Variables Setup

## Create .env.local File

Create a `.env.local` file in the root directory with these values:

```env
NEXT_PUBLIC_SUPABASE_URL=poahudciasavxbhqabwl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_MCu9lIf3nac7IE7xo5ASRQ_MlJCTm3b
SUPABASE_SERVICE_ROLE_KEY=sb_secret_k5YuFOyUdCxlxvoRCHrx6g_vu8MSFay
ANTHROPIC_API_KEY=your_anthropic_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51SizuL7hRpvOhUeAaTEo46n4fZ4lSvOJo1rAYEzg3oXnaSO2iKxliybZDVOAPETLPxsVTUYLOTQFor09Rusc5ebG000jYxg5Dp
```

## Security Notes

- ✅ `.env.local` is already in `.gitignore` - your secrets won't be committed
- ✅ Never commit `.env.local` to version control
- ✅ Use `.env.local.example` as a template for other developers
- ✅ Rotate keys if they're ever exposed

## Environment Variables Explained

- **NEXT_PUBLIC_SUPABASE_URL**: Your Supabase project URL
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Public Supabase key (safe for client-side)
- **SUPABASE_SERVICE_ROLE_KEY**: Service role key (server-side only, bypasses RLS)
- **ANTHROPIC_API_KEY**: Anthropic API key for Claude API calls
- **STRIPE_SECRET_KEY**: Stripe secret key (server-side only)
- **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY**: Stripe publishable key (client-side)

## Next Steps

1. Copy the values above into your `.env.local` file
2. Restart your Next.js dev server: `npm run dev`
3. Verify environment variables are loaded (check console for any missing var errors)

