import Image from "next/image";
import { Post } from "@/types/post";
import Link from "next/link";
import { Category } from "@/types/category";

interface ArticleCardProps {
  data: Post;
  categories: Category[];
}

const ArticleCard = ({ data, categories }: ArticleCardProps) => {
  return (
    <Link href={`/posts/${data.id}`}>
      <div className="max-w-lg rounded-lg bg-white border overflow-hidden">
        <div className="w-full aspect-video relative">
          <Image
            objectFit="cover"
            className="mb-2"
            fill
            src={data.imageUrl}
            alt=""
          />
        </div>
        <div className="p-4">
          <p className="text-sm font-semibold text-purple-700">
            {data.categories
              .map((c) => categories.find((c1) => c1.id === c))
              .map((c) => c?.name)
              .join(", ")}
          </p>
          <h3 className="text-lg font-bold mb-2">{data.title}</h3>
          <p className="text-sm mb-0">{data.excerpt}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
