import { getAllPosts } from "@/lib/services";
import { POSTS_PER_PAGE } from "@/lib/constants";
import { Post } from "@/types";
import { useState, useEffect } from "react";

const useAllPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
        setTotalPages(Math.ceil(fetchedPosts.length / POSTS_PER_PAGE));
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Error desconocido");
        }
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [POSTS_PER_PAGE]);

  const getPostsByPage = (page: number): Post[] => {
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return posts.slice(startIndex, endIndex);
  };

  const arrayPages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return { posts, isLoading, error, arrayPages, getPostsByPage };
};

export default useAllPosts;
