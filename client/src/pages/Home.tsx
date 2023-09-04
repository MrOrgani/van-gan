import React, { useEffect, useState } from "react";
import { Card, FormField, Loader } from "../components";
import type { CardType } from "../components/Card";

const RenderCards: React.FC<{ data: CardType[]; title: string }> = ({
  data,
  title,
}) => {
  if (data?.length > 0) {
    return (
      <>
        {data.map((post) => (
          <Card key={post._id} {...post} />
        ))}
      </>
    );
  }

  return (
    <h2 className="mt-5 font-bold text-blue-600 text-xl uppercase">{title}</h2>
  );
};
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState<CardType[]>([]);

  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState<CardType[]>([]);
  const [searchedTimeout, setSearchedTimeout] = useState<number>();

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const res = await fetch("https://van-gan.onrender.com/api/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const photos = (await res.json()) as { data: CardType[] };
      setAllPosts(photos.data.reverse());
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    clearTimeout(searchedTimeout);

    setSearchText(e.target.value);

    setSearchedTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter(
          (post) =>
            post.name.toLowerCase().includes(searchText.toLowerCase()) ||
            post.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResults);
      }, 500)
    );
  };

  useEffect(() => {
    void fetchPosts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-black text-3xl">Gallery</h1>
        <p className="mt-2 text-gray-500 text-lg max-w-[500px]">
          Have a look at all previous create from DALL-E
        </p>
      </div>
      <div className="mt-16">
        <FormField
          labelName="Looking for a post..."
          type="text"
          name="text"
          placeholder="Search posts"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-gray-500 text-xl mb-3">
                Showing results for
                <span className="text-gray-800">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title={"No search results found"}
                />
              ) : (
                <RenderCards data={allPosts} title={"No posts found"} />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
