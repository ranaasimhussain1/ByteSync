import React from "react";
import { Link } from "react-router-dom";
import downloadPng from "../assets/download.png";
import fb from "../assets/Facebook.png";
import twitter from "../assets/Twitter.png";
import whatsapp from "../assets/whatsapp.png";
import clipBoard from "../assets/clipboard.png";
import close from "../assets/close.png";
import { toast } from "react-hot-toast";

const Share = ({ url, onClose }) => {
  const handleCopyToClipboard = (url) => {
    console.log(url);

    // Create a temporary textarea element to hold the content
    const tempInput = document.createElement("textarea");
    tempInput.value = url.url;
    document.body.appendChild(tempInput);

    // Select the content inside the temporary textarea
    tempInput.select();

    // Copy the selected content to the clipboard
    document.execCommand("copy");

    // Remove the temporary textarea from the DOM
    document.body.removeChild(tempInput);

    // Alert the user that the content has been copied
    toast.success("Copied to Clipboard", { id: "signup" });
  };
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    url
  )}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent("Check this out!")}`;

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-custom-blue flex rounded-2xl max-w-4xl p-5 items-center shadow-custom-glow relative">
        <div className="container mx-auto p-6 rounded-lg text-center">
          <h1 className="font-bold text-2xl mb-4 w-full text-white">
            Share this content
          </h1>
          <p className="font-bold text-l text-white mb-4 w-full mb-10">
            If you like this content share it with your friends
          </p>
          <div className="icons flex justify-around mb-4">
            <a
              href={facebookShareUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={fb} alt="Facebook" className="icon w-10 h-10 mr-5" />
            </a>
            <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={twitter}
                alt="Twitter"
                className="icon w-10 h-10 mr-5"
              />
            </a>
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={whatsapp}
                alt="WhatsApp"
                className="icon w-10 h-10 mr-5"
              />
            </a>
          </div>
          <div className="link-bar px-4 border p-2 mt-12 rounded-xl border placeholder-grey-200 text-custom-blue shadow-custom-glow-link flex justify-between">
            <a href="your-link-here" className="text-blue-500 hover:underline">
              {url}
            </a>
            <img
              className="h-6 w-6 mb-1 cursor-pointer"
              src={clipBoard}
              onClick={() => handleCopyToClipboard({ url })}
              alt="Clipboard"
            />
          </div>
        </div>
        <img
          src={close}
          alt="Close"
          className="absolute top-4 right-4 h-8 w-8 cursor-pointer"
          onClick={onClose}
        />
      </div>
    </section>
  );
};

export default Share;
