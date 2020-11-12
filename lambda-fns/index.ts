import createPost from './createPost';
import listPosts from './listPosts';
import updatePost from './updatePost';
import deletePost from './deletePost';
import getPostById from './getPostById';
import Post from './Post';

type AppSyncEvent = {
  info: {
    fieldName: string
  },
  arguments: {
    post: Post,
    postId: string
  }
}

exports.handler = async (event:AppSyncEvent) => {
  switch (event.info.fieldName) {
    case 'createPost':
      return await createPost(event.arguments.post);
    case 'listPosts':
      return await listPosts();
    case 'updatePost':
      return await updatePost(event.arguments.post);
    case 'deletePost':
      return await deletePost(event.arguments.postId);
    case 'getPostById':
      return await getPostById(event.arguments.postId);
    default:
      return null;
  }
}