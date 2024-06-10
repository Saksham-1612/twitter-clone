"use client";
import { graphqlClient } from "@/clients/api";
import { getAllTweetsQuery } from "@/graphql/query/tweets";
import { useEffect, useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import FeedCard from "../_components/FeedCard";
import LeftSideBar from "../_components/LeftSideBar";
import WriteTweet from "../_components/WriteTweet";

export interface Author {
  email: string;
  firstName: string;
  lastName?: string;
  profileImage: null | string;
}

export interface Tweet {
  _id?: string;
  content: string;
  imageURL: null | string;
  author: Author;
}

function Page() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [refreshTweet, setRefreshTweet] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await graphqlClient.request<{
          getAllTweets: (Tweet | null)[];
        }>(getAllTweetsQuery);
        if (res && res.getAllTweets) {
          const filteredTweets = res.getAllTweets.filter(
            (tweet): tweet is Tweet => tweet !== null
          );
          setTweets(filteredTweets);
        }
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };
    fetchData();
  }, [refreshTweet]);

  return (
    <main className="overflow-x-hidden">
      <div className="grid grid-cols-12 h-screen w-screen px-36">
        <div className="col-span-3 py-2 ">
          <BsTwitterX className="text-5xl mx-6 hover:bg-white/10 rounded-full p-2 cursor-pointer transition-all" />
          <LeftSideBar />
        </div>
        <div className="h-[100vh] overflow-auto w-[70vw]">
          <div className="col-span-6 border-r-[1px] border-r-gray-400 border-l-[1px] w-[40vw] border-l-gray-400">
            <WriteTweet setRefreshTweet={setRefreshTweet} />
            {tweets.map((tweet) => (
              <FeedCard key={tweet._id} tweet={tweet} />
            ))}
          </div>
          <div className="col-span-3"></div>
        </div>
      </div>
    </main>
  );
}

export default Page;
