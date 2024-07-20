import {
  LayoutDashboard,
  Home,
  StickyNote,
  Layers,
  Flag,
  Calendar,
  LifeBuoy,
  Settings,
  MessageSquarePlus,
  Share,
  GalleryHorizontalEnd,
  MessageSquare,
  MessageSquareReply,
} from "lucide-react";

import React from "react";
import Sidebar, { SidebarItem } from "./Sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const Header = () => {
  const auth = useAuth();
  return (
    <>
      <div className="flex ">
        <Sidebar>
          <Link to="/">
            <SidebarItem icon={<Home size={20} />} text="Home" />
          </Link>
          {auth?.isLoggedIn && auth.user && (
            <Link to="/chat">
              <SidebarItem icon={<MessageSquare size={20} />} text="Chat" />
            </Link>
          )}
          {auth?.isLoggedIn && auth.user && (
            <Link to="/histroy">
              <SidebarItem
                icon={<GalleryHorizontalEnd size={20} />}
                text="History"
              />
            </Link>
          )}

          <Link to="/feedback">
            <SidebarItem
              icon={<MessageSquareReply size={20} />}
              text="Feedback"
            />
          </Link>
          {/* {auth?.isLoggedIn && auth.user && (
            <Link to="/share">
              <SidebarItem icon={<Share size={20} />} text="Share" />
            </Link>
          )} */}
        </Sidebar>
      </div>
    </>
  );
};

export default Header;
