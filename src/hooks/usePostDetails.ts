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
