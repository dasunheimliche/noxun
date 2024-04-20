import { useEffect, useState } from "react";

import useSearchPosts from "@/hooks/useSearchPosts";
import useAllPosts from "@/hooks/useAllPosts";

import { Post } from "@/types";

import Separator from "@/components/separator";
import SearchInput from "@/components/search-input";
import PostItemList from "@/components/post-item-list";
import PaginationButtons from "@/components/pagination";
import Loading from "@/components/loading";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, error, arrayPages, getPostsByPage } = useAllPosts();
  const {
    isLoading: isLoadingSearchedPosts,
    error: errorSearchedPosts,
    arrayPages: arrayPagesSearched,
    getPostsByPage: getPostsByPageSearched,
    handleSearchChange,
    searchTerm,
  } = useSearchPosts();

  const posts = searchTerm
    ? getPostsByPageSearched(currentPage)
    : getPostsByPage(currentPage);
  const pages = searchTerm ? arrayPagesSearched : arrayPages;

  function handlePageSelection(page: number) {
    setCurrentPage(page);
  }

  useEffect(() => {
    if (searchTerm) {
      setCurrentPage(1);
    }
  }, [searchTerm]);

  if (isLoading || isLoadingSearchedPosts) {
    return <Loading />;
  }

  return (
    <>
      <header className="mt-36 mb-2 h-32 flex items-end justify-start py-4">
        <div>
          <h1 className="text-[4rem] text-[#101727] font-medium">Noxun</h1>
          <p className="text-[#1d2a42c4] mb-6 font-semibold">
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit...
          </p>
          <SearchInput onChange={handleSearchChange} value={searchTerm} />
        </div>
      </header>
      <Separator />
      <main className="mb-10">
        <div className="min-h-[25rem] relative mb-10">
          {posts.map((post: Post) => {
            return <PostItemList post={post} key={post.id} />;
          })}
        </div>
        <div className="flex gap-2 justify-center">
          <PaginationButtons
            totalPages={pages.length}
            currentPage={currentPage}
            onPageChange={handlePageSelection}
          />
        </div>
      </main>
    </>
  );
}
