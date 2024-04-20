import { getAllPosts } from "@/lib/services";
import { POSTS_PER_PAGE } from "@/lib/constants";
import { Post } from "@/types";
import { useState, useEffect, useMemo, useCallback } from "react";

const useAllPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        setPosts(response);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message || "Error desconocido");
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const totalPages = useMemo(
    () => Math.ceil(posts.length / POSTS_PER_PAGE),
    [posts]
  );

  const getPostsByPage = useCallback(
    (page: number) => {
      const startIndex = (page - 1) * POSTS_PER_PAGE;
      const endIndex = startIndex + POSTS_PER_PAGE;
      return posts.slice(startIndex, endIndex);
    },
    [posts]
  );

  const arrayPages = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages]
  );

  return { posts, isLoading, error, arrayPages, getPostsByPage };
};

export default useAllPosts;
