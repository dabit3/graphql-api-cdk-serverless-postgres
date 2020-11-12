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
    switch (event.info.fieldName) {
        case "createPost":
            return await createPost(event.arguments.post);
        case "listPosts":
            return await listPosts()
        default:
            return null;
    }
}