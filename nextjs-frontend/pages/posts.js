import { useEffect, useState } from 'react'
import Link from 'next/link'
import { API } from 'aws-amplify'
import '../configureAmplify'

const listPosts = `
  query listPosts {
    listPosts {
      id title content
    }
  }
`

export default function Posts() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchPosts();
    async function fetchPosts() {
      const postData = await API.graphql({ query: listPosts })
      setPosts(postData.data.listPosts)
    }
  }, [])

  return (
    <div>
      <h1>Posts</h1>
      {
        posts.map(post => <Link href={`/post/${post.id}`}><a>{post.title}</a></Link>)
      }
    </div>
  )
}