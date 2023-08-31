import Image from "next/image";
import { Post } from "@/types/post";
import Link from "next/link";

interface NextPrevArticleCardProps {
  data: Post;
  next?: boolean;
}

const NextPrevArticleCard = ({ data, next }: NextPrevArticleCardProps) => {
  return (
    <Link href={`/posts/${data.id}`} className="block h-full">
      <div className="rounded-lg bg-white border flex overflow-hidden h-full">
        <div className="relative aspect-square w-[30%] ">
          <Image fill objectFit="cover" src={data.imageUrl} alt="" />
        </div>
        <div className="p-4 flex flex-col w-[70%]">
          <p className="text-xs font-semibold text-purple-700">
            {next ? "Next" : "Prev"} Post
          </p>
          <h3 className="text-base font-bold mb-2">{data.title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default NextPrevArticleCard;
