import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import logo from "../../assets/profileHeader.png";
import logoUser from "../../assets/user-icon.png";

import { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import "./Header.css";
import { useAuth } from "../../context/AuthContext";
interface SidebarContextProps {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextProps>({ expanded: false });

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);
  const auth = useAuth();
  return (
    <>
      <aside className="h-screen Header">
        <nav className="h-full flex flex-col  border-r shadow-sm">
          <div className="p-4 pb-2 flex  justify-between items-center">
            <Link to="/">
              <img
                src={logo}
                className={`overflow-hidden transition-all ${
                  expanded ? "w-10" : "w-0"
                }`}
              />
            </Link>
            <Link to="/">
              {expanded ? (
                <h1 className="relative  items-center py-2 px-3 my-1 text-xl font-medium rounded-md cursor-pointer transition-colors">
                  ByteSync{" "}
                </h1>
              ) : (
                <p></p>
              )}
            </Link>

            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-blue-900 via-blue-900 -50 hover:bg-gradient-to-b from-blue-900 via-blue-900 to-indigo-800 text-white-600"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t flex p-3">
            <img src={logoUser} className="w-10 h-10 rounded-full border-2" />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              } `}
            >
              <Link to="/">
                <div className="leading-4">
                  {auth?.isLoggedIn ? (
                    <>
                      {" "}
                      <h4 className="font-semibold">{auth?.user?.name}</h4>
                      <span className="text-xs ">{auth?.user?.email}</span>
                    </>
                  ) : (
                    <>
                      {" "}
                      <h4 className="font-semibold">byteSync</h4>
                      <span className="text-xs ">user@byteSync.com</span>
                    </>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export interface SidebarItemProps {
  icon: JSX.Element;
  text: string;
  active?: boolean;
  alert?: boolean;
}

export function SidebarItem({ icon, text, active, alert }: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-b from-blue-900 via-blue-900 to-indigo-800"
          : "hover:bg-gradient-to-b from-blue-900 via-blue-900 to-indigo-800 text-white-600"
      }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        ></div>
      )}

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
