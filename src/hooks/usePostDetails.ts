// import { useState, useEffect } from "react";
// import { Post, Comment } from "@/types";

// const usePostDetails = (postId: string | undefined) => {
//   const [post, setPost] = useState<Post | null>(null);
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPostDetails = async () => {
//       try {
//         const [postResponse, commentsResponse] = await Promise.all([
//           fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`),
//           fetch(
//             `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
//           ),
//         ]);

//         const postData = await postResponse.json();
//         const commentsData = await commentsResponse.json();

//         setPost(postData);
//         setComments(commentsData);
//         setIsLoading(false);
//       } catch (error: any) {
//         console.error("Error fetching post details:", error);
//         setError(error.message || "Error desconocido");
//         setIsLoading(false);
//       }
//     };

//     if (postId) {
//       fetchPostDetails();
//     }
//   }, [postId]);

//   return { post, comments, isLoading, error };
// };

// export default usePostDetails;

import { useState, useEffect } from "react";
import { getPostDetails, getPostComments } from "@/lib/services";
import { Post } from "@/types";

export default function usePostDetails(postId: number | undefined) {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostDetails = async (postId: number | undefined) => {
      if (!postId) return;

      try {
        const [postData, commentsData] = await Promise.all([
          getPostDetails(postId),
          getPostComments(postId),
        ]);

        setPost(postData);
        setComments(commentsData);
      } catch (error: any) {
        setError(error.message || "Error desconocido");
        console.error("Error fetching post details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostDetails(postId);
  }, []);

  return { post, comments, isLoading, error };
}
