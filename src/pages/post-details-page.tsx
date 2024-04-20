import { Post } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostDetailsPage() {
  const [post, setPost] = useState<Post | null>();
  const [comments, setComments] = useState<[]>();
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [id]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, [id]);

  return (
    <div>
      {post ? (
        <>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <div>
            {comments?.map((comment: any, i: number) => {
              return (
                <div key={i}>
                  <div>{comment.name}</div>
                  <div>{comment.email}</div>
                  <div>{comment.body}</div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}
