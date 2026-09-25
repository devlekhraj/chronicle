import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

const MAX_TAGS_PER_REQUEST = 128;

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const tags = Array.isArray((body as { tags?: unknown }).tags)
    ? (body as { tags: unknown[] }).tags
    : null;

  if (!tags) {
    return Response.json({ message: "Expected tags array" }, { status: 422 });
  }

  const normalizedTags = tags
    .map((tag) => String(tag).trim())
    .filter((tag) => tag.length > 0 && tag.length <= 256)
    .slice(0, MAX_TAGS_PER_REQUEST);

  const isImmediate = (body as { immediate?: unknown }).immediate !== false;
  const config = isImmediate ? { expire: 0 } : "max";

  for (const tag of normalizedTags) {
    revalidateTag(tag, config);
  }

  return Response.json({
    revalidated: true,
    tags: normalizedTags,
    mode: isImmediate ? "immediate" : "stale-while-revalidate",
  });
}
