import createPost from './createPost';
import listPosts from './listPosts';
import Post from './Post';

type AppSyncEvent = {
  info: {
    fieldName: string
  },
  arguments: {
    post: Post
  }
}

exports.handler = async (event:AppSyncEvent) => {
    console.log('event: ', event);
    switch (event.info.fieldName) {
        case "createPost":
            return await createPost(event.arguments.post);
        case "listPosts":
            const posts = await listPosts()
            console.log('posts::::::: ', posts)
            return posts
        default:
            return null;
    }
}