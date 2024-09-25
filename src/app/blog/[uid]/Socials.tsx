"use client";

import React from "react";
import { BsFacebook, BsTwitter, BsLinkedin } from "react-icons/bs";

interface SocialsProps {
  url: string;
  title: string;
}

const Socials: React.FC<SocialsProps> = ({ url, title }) => {
  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
    }

    window.open(shareUrl, "_blank");
  };

  return (
    <div className="flex flex-row items-center gap-4 mt-4">
      {/* Facebook */}
      <button
        onClick={() => handleShare("facebook")}
        className="cursor-pointer"
        aria-label="Share on Facebook"
      >
        Facebook
      </button>

      {/* Twitter */}
      <button
        onClick={() => handleShare("twitter")}
        className="cursor-pointer"
        aria-label="Share on Twitter"
      >
        <BsTwitter
          className="text-dark-primary hover:text-primary z-50"
          size={24}
        />
      </button>

      {/* LinkedIn */}
      <button
        onClick={() => handleShare("linkedin")}
        className="cursor-pointer"
        aria-label="Share on LinkedIn"
      >
        <BsLinkedin
          className="text-dark-primary hover:text-primary"
          size={24}
        />
      </button>
    </div>
  );
};

export default Socials;
