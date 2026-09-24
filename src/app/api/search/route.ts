import { NextResponse } from "next/server";
import { getSearchResults } from "@/lib/ec-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";

  if (!query) {
    return NextResponse.json({ articles: [], authors: [] });
  }

  const results = await getSearchResults(query);

  return NextResponse.json(results);
}
