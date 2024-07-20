import User from "../models/User.js";
import OpenAI from "openai";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res
                .status(401)
                .json({ message: "User not registered OR Token malfunctioned" });
        }
        // grab chats of user and ensure correct typing
        const chats = user.chats.map(({ role, content }) => ({
            role: role,
            content,
        }));
        // Add the new user message
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        // Configure OpenAI API
        const openai = new OpenAI({
            apiKey: process.env["OPEN_AI_SECRET"], // This is the default and can be omitted
        });
        // Get latest response from OpenAI
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        // Push the assistant's response to user chats
        if (chatResponse.choices && chatResponse.choices.length > 0) {
            user.chats.push(chatResponse.choices[0].message);
        }
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        // User token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
// export const deleteChatById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     // Find the user by ID
//     const user = await User.findById(res.locals.jwtData.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     // Find the index of the chat with the given ID in the user's chats array
//     const chatIndex = user.chats.findIndex(
//       (chat) => chat._id.toString() === id
//     );
//     if (chatIndex === -1) {
//       return res.status(404).json({ message: "Chat not found" });
//     }
//     // Remove the chat from the user's chats array
//     user.chats.splice(chatIndex, 1);
//     // Save the updated user document
//     await user.save();
//     return res.status(200).json({ message: "Chat deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting chat:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
export const deleteChatById = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the user by ID
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Find the index of the chat with the given ID in the user's chats array
        const chatIndex = user.chats.findIndex((chat) => chat._id.toString() === id);
        console.log(chatIndex);
        if (chatIndex === -1) {
            return res.status(404).json({ message: "Chat not found" });
        }
        if (chatIndex === 0) {
            user.chats.splice(0, 1);
        }
        // Remove the chat from the user's chats array
        user.chats.splice(chatIndex, chatIndex + 1);
        // If the user has no more chats, delete the user as well
        // if (user.chats.length === 0) {
        //   await User.findByIdAndDelete(user._id);
        //   return res
        //     .status(200)
        //     .json({ message: "Chat and user deleted successfully" });
        // }
        // Save the updated user document
        await user.save();
        return res.status(200).json({ message: "Chat deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting chat:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        // User token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map