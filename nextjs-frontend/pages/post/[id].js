import { API } from 'aws-amplify'
import { useRouter } from 'next/router'
import '../../configureAmplify'

const getPost = `
  query getPostById($postId: String!) {
    getPostById(postId: $postId) {
      id title content
    }
  }
`;

const listPosts = `
  query listPosts {
    listPosts {
      id title content
    }
  }
`;

export default function Post({ post }) {
  const router = useRouter();
  if (router.isFallback) {
    return <h2>Loading ...</h2>
  }
  return (
    <div>
      <h1>Post</h1>
      <h2>{post.title}</h2>
      <h2>{post.content}</h2>
    </div>
  )
}

export async function getStaticPaths() {
  const postData = await API.graphql({
    query: listPosts
  });
  const paths = postData.data.listPosts.map(post => ({ params: { id: post.id }}));
  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps ({ params }) {
  const { id } = params;
  const postData = await API.graphql({
    query: getPost, variables: { postId: id }
  });
  return {
    props: {
      post: postData.data.getPostById
    }
  }
}