import ArticleCard from "@/ui/blog/ArticleCard";
import { Inter } from "next/font/google";
import { Post } from "@/types/post";
import { Category } from "@/types/category";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next/types";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  categories: Category[];
  posts: Post[];
}

export default function Home(props: HomeProps) {
  const { posts, categories } = props;
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [q, setQ] = useState("");

  const handleCategoryClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = (event.target as HTMLInputElement).id;

    if (id === selectedCategory) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(id);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      router.query.categoryId = selectedCategory;
    } else {
      delete router.query.categoryId;
    }
    router.push(router);
    // useEffect dependency below may show a warning, but this is a known issue with NextJS router. 
  }, [selectedCategory]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQ(event.target.value);
  };

  const handleSubmitClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (q) {
      router.query.q = q;
    } else {
      delete router.query.q;
    }
    router.push(router);
  };

  const handleClearClick = () => {
    delete router.query.categoryId;
    delete router.query.q;
    setSelectedCategory("");
    setQ("");
    router.push(router);
  };



  return (
    <main className={`${inter.className} px-4`}>
      <section className="py-8">
        <div className="mb-8 container mx-auto">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center mb-4">
              From the blog
            </h1>
            <p className="text-base text-center max-w-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
              officiis perspiciatis ratione nemo ipsum.
            </p>
          </div>
        </div>
        <div className="container mx-auto mb-8">
          <form onSubmit={handleSubmitClick} className="flex flex-col md:flex-row gap-2 justify-center mb-8">
            <input
              value={q}
              onChange={handleInputChange}
              type="text"
              className="border-2 px-2 py-2 font-bold w-full border-black text-lg"
            />
            <div className="flex justify-end gap-2">
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2"
              >
                Search
              </button>
              <button
                onClick={handleClearClick}
                className="border-2 box-border border-purple-600 text-purple-600 px-4 whitespace-nowrap py-2"
              >
                Clear Filters
              </button>
            </div>
          </form>
          <div className="flex gap-4 justify-center flex-wrap">
            {categories.map((category) => (
              <button
                onClick={handleCategoryClick}
                key={category.id}
                id={category.id.toString()}
                className={`text-base font-bold ${
                  category.id.toString() === selectedCategory
                    ? "text-purple-600"
                    : "text-gray-600"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <div className="container mx-auto">
          <div className="grid gap-4 justify-items-center xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
            {posts.map((post) => (
              <ArticleCard key={post.id} data={post} categories={categories} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{
  posts: Post[];
  categories: Category[];
}> = async (context) => {
  const postsRes = await axios.get(`http://localhost:3000/api/posts`, {
    params: context.query,
  });
  const categoriesRes = await axios.get(`http://localhost:3000/api/categories`);
  const { data: posts } = await postsRes.data;
  const { data: categories } = await categoriesRes.data;

  // Pass data to the page via props
  return { props: { posts, categories } };
};
