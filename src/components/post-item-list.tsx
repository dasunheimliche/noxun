import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import Separator from "@/components/separator";
import { Post } from "@/types";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function PostItemList({ post }: { post: Post }) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <div key={post.id}>
      <div
        className="py-4 group cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="pr-2 flex justify-between">
          <div
            className={cn(
              "first-letter:capitalize",
              isCollapsed ? "underline underline-offset-2" : ""
            )}
          >
            {post.title}
          </div>
          <ChevronDown
            strokeWidth={1}
            className={cn(
              "transition-all opacity-35 group-hover:opacity-65",
              isCollapsed ? "rotate-180" : ""
            )}
          />
        </div>
        <div
          className={cn(
            "relative h-0 overflow-hidden transition-all text-wrap flex justify-between",
            isCollapsed ? "h-[5.5rem] mt-5" : ""
          )}
        >
          <div className="w-[65%]">{post.body}</div>
          <Link
            to={`posts/${post.id}`}
            className="absolute flex gap-2 items-center bottom-0 font-bold right-0 mb-4 bg-[#101727e0] hover:bg-[#101727] py-2 px-4 text-sm text-yellow-50"
          >
            <div>Visitar</div>
            <ArrowUpRight />
          </Link>
        </div>
      </div>
      <Separator />
    </div>
  );
}
