import type { APIContext, AstroGlobal } from "astro";
import { getSupabase } from "../db";
import type { Post } from "./types";

const isDev = import.meta.env.DEV;

type params = {
  id: number;
  authorId: number;
  params: {
    title?: string;
    body?: string;
  };
  context?: APIContext | AstroGlobal;
};
export async function updatePost({ id, authorId, params }: params) {
  return await _updatePost({ id, authorId, params });
}

export async function updatePostSSR({ id, authorId, params, context }: params) {
  return await _updatePost({ id, authorId, params, context });
}

async function _updatePost({
  id,
  // TODO: handle author
  authorId,
  params,
  context,
}: params): Promise<Post | undefined> {
  const supabase = getSupabase(context);

  const { data, error } = await supabase
    .from("posts")
    .update({ ...params })
    .eq("id", id)
    .select();

  if (!error) return data[0];
  if (isDev) console.error("error", error);
  return;
}
