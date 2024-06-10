import { graphqlClient } from "@/clients/api";
import { createTweetMutuation } from "@/graphql/query/tweets";
import { graphql } from "@/src/gql";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { BiImageAlt } from "react-icons/bi";

interface WriteTweetProps {
  setRefreshTweet: React.Dispatch<React.SetStateAction<number>>;
}

function WriteTweet({ setRefreshTweet }: WriteTweetProps) {
  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);
  const [content, setContent] = useState("");
  const handleCreateTweet = async () => {
    // toast.loading("Creating Tweet...");
    const tweet = await graphqlClient.request(createTweetMutuation, {
      content,
    });
    toast.success("tweet created successfully");
    setRefreshTweet((prev: number) => prev + 1);
    setContent("");
    console.log(tweet);
  };
  return (
    <div>
      <div className="border border-r-0 border-l-0  border-b-0 border-gray-600 p-5 cursor-pointer transition-all hover:bg-slate-300/5">
        <div className="grid grid-cols-12 gap-2">
          <Image
            src="https://avatars.githubusercontent.com/u/91990962?v=4"
            alt="user-image"
            height={50}
            width={50}
            className="rounded-full"
          />
          <div className="col-span-11">
            <textarea
              value={content}
              placeholder="Whats's Happening? "
              className="border-b border-slate-700 focus:outline-none selection:border-none   p-2 w-full bg-transparent"
              rows={3}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex w-full justify-between">
              <BiImageAlt
                onClick={handleSelectImage}
                className="text-xl mt-2"
              />
              <button
                onClick={handleCreateTweet}
                className="bg-blue-500 px-2 py-2 my-2 text-sm flex justify-end rounded-full "
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteTweet;
