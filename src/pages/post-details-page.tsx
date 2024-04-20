import Separator from "@/components/separator";
import { Post } from "@/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import Loading from "@/components/loading";
import usePostDetails from "@/hooks/usePostDetails";

export default function PostDetailsPage() {
  const { id } = useParams();

  const { post, comments, isLoading } = usePostDetails(Number(id));

  if (isLoading) return <Loading />;

  return (
    <div className="mt-20">
      <div className="flex justify-end mb-10">
        <Link to={"/"}>
          <CircleArrowLeft
            className="cursor-pointer -mr-[0.25rem]"
            color="#101727"
            size={"3.2rem"}
            strokeWidth={0.5}
          />
        </Link>
      </div>

      <h2 className="text-[2rem] text-[#101727] font-medium first-letter:capitalize mb-5">
        {post?.title}
      </h2>
      <p className="first-letter:capitalize mb-6 text-[#1d2a42c4] font-semibold">
        {post?.body}
      </p>
      <div className="mb-24">
        <div className="mb-2">Comentarios ({comments?.length})</div>
        <Separator />
        {comments?.map((comment: any, i: number) => {
          return (
            <div key={i}>
              <div className="py-4">
                <div className="lowercase mb-2 underline underline-offset-2">
                  {comment.email}
                </div>
                <div className="first-letter:capitalize">{comment.body}</div>
              </div>
              <Separator />
            </div>
          );
        })}
      </div>
    </div>
  );
}
