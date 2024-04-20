import { useState, useEffect, useMemo, useCallback } from "react";
import { getAllPosts } from "@/lib/services";
import { POSTS_PER_PAGE } from "@/lib/constants";
import { Post } from "@/types";

const useSearchPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  const totalPages = useMemo(
    () => Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
    [filteredPosts]
  );

  const getPostsByPage = useCallback(
    (page: number) => {
      const startIndex = (page - 1) * POSTS_PER_PAGE;
      const endIndex = startIndex + POSTS_PER_PAGE;
      return filteredPosts.slice(startIndex, endIndex);
    },
    [filteredPosts]
  );

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  return {
    posts,
    isLoading,
    error,
    totalPages,
    getPostsByPage,
    handleSearchChange,
    searchTerm,
    filteredPosts,
  };
};

export default useSearchPosts;
