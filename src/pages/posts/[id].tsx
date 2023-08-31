import { Category } from "@/types/category";
import { Post } from "@/types/post";
import axios from "axios";
import next, { GetServerSideProps } from "next/types";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import NextPrevArticleCard from "@/ui/blog/NextPrevArticleCard";

const inter = Inter({ subsets: ["latin"] });

interface PostPageProps {
  categories: Category[];
  post: Post;
  nextPostId: number;
  prevPostId: number;
}

const fetchPost = async (postId: number) => {
  const res = await axios.get(`/api/posts/${postId}`);
  return res.data.post
};

export default function PostPage(props: PostPageProps) {
  const { post, categories, nextPostId, prevPostId } = props;
  const [prevPost, setPrevPost] = useState<Post>();
  const [nextPost, setNextPost] = useState<Post>();

  useEffect(() => {
    if(prevPostId){
      fetchPost(prevPostId).then((post) => setPrevPost(post));
    } else {
      setPrevPost(undefined)
    }
    
    if(nextPostId){
      fetchPost(nextPostId).then(post => setNextPost(post))
    } else {
      setNextPost(undefined)
    }
    
  }, [nextPostId, prevPostId]);

  return (
    <main className={`${inter.className} px-4`}>
      <div className="container mx-auto mb-8">
        <div className="relative aspect-video mb-4">
          <Image
            fill
            objectFit="cover"
            className="mb-2"
            src={post.imageUrl}
            alt={post.title}
          />
        </div>
        <p className="text-sm font-semibold text-purple-700">
          {post.categories
            .map((c) => categories.find((c1) => c1.id === c))
            .map((c) => c?.name)
            .join(", ")}
        </p>
        <h3 className="text-lg font-bold mb-2">{post.title}</h3>
        <p className="text-sm mb-4">{post.excerpt}</p>
      </div>
      <div className="container mx-auto">
        <div className="grid gap-2 justify-between xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
          <div className="w-full h-full">
            {prevPost && <NextPrevArticleCard data={prevPost} />}
          </div>
          <div className="w-full xl:col-start-3">
            {nextPost && <NextPrevArticleCard data={nextPost} next />}
          </div>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{
  post: Post;
  categories: Category[];
}> = async (context) => {
  const postRes = await axios.get(
    `http://localhost:3000/api/posts/${context.query.id}`,
    {
      params: context.query,
    }
  );
  const categoriesRes = await axios.get(`http://localhost:3000/api/categories`);

  const { post, nextPostId, prevPostId } = await postRes.data;
  const { data: categories } = await categoriesRes.data;

  // Pass data to the page via props
  return {
    props: {
      post,
      categories,
      nextPostId: nextPostId,
      prevPostId: prevPostId,
    },
  };
};
