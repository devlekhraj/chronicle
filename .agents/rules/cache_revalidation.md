# Cache Revalidation Rule (Next.js 16 + Laravel)

## Rule Summary
- **Event-Driven Cache Purging:** Revalidate only when content is published, updated, or deleted in the backend CMS.
- **Immediate Expiration:** When calling `revalidateTag()`, use `{ expire: 0 }` inside route handlers so the next visitor receives fresh data immediately.
- **Tag Hygiene:** Always tag data at both broad (`homepage`, `articles`, `categories`, `navigation`) and granular (`article:${slug}`, `category:${slug}`, `author:${slug}`) levels.

## Contract Reference
- **Frontend Handler:** `src/app/api/revalidate/route.ts`
- **Frontend Tags:** Defined in `src/lib/ec-api.ts`
- **Backend Revalidator:** `packages/devlekh/Admin/src/Support/NextRevalidator.php`
- **Shared Secret:** `REVALIDATE_SECRET` in Next.js `.env.local` must match `NEXT_REVALIDATE_SECRET` in Laravel `.env`.
- **Full Architecture Spec:** See `docs/15-cache-revalidation.md` for complete trigger matrices and tag taxonomy.
