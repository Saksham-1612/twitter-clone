"use client";
import React from "react";
import Image from "next/image";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { Tweet } from "../home/page";

const FeedCard: React.FC<{ tweet: Tweet }> = ({ tweet }) => {
  const { author, content, imageURL } = tweet;

  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 cursor-pointer transition-all hover:bg-slate-300/5">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-1">
          {author.profileImage ? (
            <Image
              src={author.profileImage}
              alt="user-image"
              height={50}
              width={50}
              className="rounded-full"
            />
          ) : (
            <Image
              src="https://avatars.githubusercontent.com/u/91990962?v=4"
              alt="user-image"
              height={50}
              width={50}
              className="rounded-full"
            />
          )}
        </div>
        <div className="col-span-11">
          <h5>
            {author.firstName} {author.lastName}
          </h5>
          <p>{content}</p>
          {imageURL && (
            <Image src={imageURL} alt="Image content" height={50} width={50} />
          )}
          <div className="flex justify-between mt-5 text-lg items-center ">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
