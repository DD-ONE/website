<script lang="ts">
  import type { Post } from "../../db/posts/types";
  import { updatePost } from "../../db/posts/updatePost";
  import { getUserData } from "../../db/users/getUserData";

  export let post: Post;
  let { id, title, body } = post;
  async function updateHandler() {
    const user = await getUserData();
    if (!user) return;
    const authorId = parseInt(user.id);
    const post = await updatePost({ id, authorId, params: { title, body } });
  }
</script>

<input type="text" bind:value={title} />
<textarea bind:value={body} />
<button on:click={updateHandler}>Save</button>
