import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import user from "../../../assets/user-icon.png";
import clipBoard from "../../../assets/clipboard.png";
import download from "../../../assets/download.png";
import SvgAvatar from "../../Avatar";
import share from "../../../assets/share.png";
import logoPP from "../../../assets/loginPP.jpg";
import logo from "../../../assets/profile.png";
import { toast } from "react-hot-toast";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";
import Share from "../../../pages/Share";
function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const [showShareDialog, setShowShareDialog] = useState(false);

  const handleShareClick = () => {
    setShowShareDialog(true);
  };

  const handleCloseShareDialog = () => {
    setShowShareDialog(false);
  };
  const handleCopyToClipboard = (content) => {
    // Create a temporary textarea element to hold the content
    const tempInput = document.createElement("textarea");
    tempInput.value = content.content;
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

  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
  return role == "user" ? (
    <div className="flex items-center mb-2 ">
      <img
        src={user}
        alt="User Icon"
        className="w-8 h-8 rounded-full mr-2 border-2 "
      />
      <div className=" p-2 rounded-lg bg-white text-custom-blue">
        {!messageBlocks && <p>{content}</p>}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkCold} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <p>{block}</p>
            )
          )}
      </div>
    </div>
  ) : (
    <div
      className={`flex mb-2 ${
        role === "assistant" ? "justify-end" : "justify-start"
      }`}
    >
      <div className="relative flex rounded-lg">
        <div className="flex bg-white mr-2 rounded-lg">
          <div className="w-full overflow-hidden rounded-lg m-2">
            <div className=" ">
              <SvgAvatar sentence={content} />
            </div>
          </div>

          <div className="w-72 p-4">
            <div className="bg-white text-custom-blue p-4 rounded-lg">
              {!messageBlocks && <p>{content}</p>}
              {messageBlocks &&
                messageBlocks.length &&
                messageBlocks.map((block) =>
                  isCodeBlock(block) ? (
                    <SyntaxHighlighter
                      style={coldarkCold}
                      language="javascript"
                    >
                      {block}
                    </SyntaxHighlighter>
                  ) : (
                    <p>{block}</p>
                  )
                )}
            </div>
          </div>
        </div>

        <img
          className="w-8 h-8 rounded-full border-2 mb-2"
          src={logo}
          alt="User Icon"
        />

        {role === "assistant" && (
          <div className="absolute bottom-2 right-2 flex flex-col items-center">
            <img
              className="h-7 w-7 mb-4 cursor-pointer"
              src={clipBoard}
              onClick={() => handleCopyToClipboard({ content })}
              alt="Clipboard"
            />
            <img
              className="h-7 w-7  mb-2 cursor-pointer"
              src={share}
              alt="Share"
              onClick={handleShareClick}
            />
            {showShareDialog && (
              <Share
                url={"http://localhost:5000/api/v1/chat/all-chats"}
                onClose={handleCloseShareDialog}
              />
            )}
            {/* <img
              className="h-6 w-6 cursor-pointer"
              src={download}
              alt="Download"
            /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatItem;
