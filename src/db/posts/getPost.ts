import type { APIContext, AstroGlobal } from "astro";
import { getSupabase } from "../db";
import type { Post } from "./types";

const isDev = import.meta.env.DEV;

export async function getPost({
  id,
  context,
}: {
  id: number;
  context?: APIContext | AstroGlobal;
}) {
  return await _getPost({ id, context });
}

export async function getPostSSR({
  id,
  context,
}: {
  id: number;
  context?: APIContext | AstroGlobal;
}) {
  return await _getPost({ id, context });
}

async function _getPost({
  id,
  context,
}: {
  id: number;
  context?: APIContext | AstroGlobal;
}): Promise<Post | undefined> {
  const supabase = getSupabase(context);

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .limit(1)
    .single();

  if (!error) return data;
  if (isDev) console.error("error", error);
  return;
}
