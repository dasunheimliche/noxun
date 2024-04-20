import { useState, useEffect } from "react";

import { getAllPosts } from "@/lib/services";
import { POSTS_PER_PAGE } from "@/lib/constants";

import { Post } from "@/types";

const useSearchPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
        setFilteredPosts(fetchedPosts);
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
  }, []);

  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
    setTotalPages(Math.ceil(filtered.length / POSTS_PER_PAGE));
  }, [searchTerm, posts]);

  const getPostsByPage = (page: number): Post[] => {
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, endIndex);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const arrayPages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return {
    posts,
    isLoading,
    error,
    arrayPages,
    getPostsByPage,
    handleSearchChange,
    searchTerm,
  };
};

export default useSearchPosts;
