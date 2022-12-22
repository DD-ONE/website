import type { APIContext, AstroGlobal } from "astro";
import { getSupabase } from "../db";
import type { Post } from "./types";

const isDev = import.meta.env.DEV;

export async function getAllPosts() {
  return await _getAllPosts();
}

export async function getAllPostsSSR(context: APIContext | AstroGlobal) {
  return await _getAllPosts(context);
}

async function _getAllPosts(
  context?: APIContext | AstroGlobal
): Promise<Post[]> {
  const supabase = getSupabase(context);

  const { data, error } = await supabase.from("posts").select("*");

  if (!error) return data;
  if (isDev) console.error("error", error);
  return [];
}
