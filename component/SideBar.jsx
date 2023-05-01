import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImCross } from "react-icons/im";
import Style from "./SideBar.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { CgMenuRight } from "react-icons/cg";

// INTENAL IMPORT

const SideBar = ({
  openSideBar,
  uniqueTitle,
  currentChat,
  createNewChat,
  handleClick,
}) => {
  return (
    <div className={Style.sidebar}>
      <div className={Style.sidebar_button_close}>
        <ImCross
          onClick={openSideBar}
          className={Style.sidebar_button_close_button}
        />
      </div>

      <section className={Style.homePage_Box_SideBar}>
        <button
          className={Style.homePage_Box_SideBar_button}
          onClick={() => {
            createNewChat(), openSideBar();
          }}
        >
          {" "}
          {<AiOutlinePlus />} New Chat
        </button>

        <ul className={Style.homePage_Box_SideBar_history}>
          {uniqueTitle?.map((uniqueTitle, index) => (
            <div
              className={Style.uniqueTitle}
              key={index}
              onClick={() => {
                handleClick(uniqueTitle);
              }}
            >
              <p
                onClick={() => {
                  openSideBar();
                }}
                className={Style.uniqueTitle_data}
              >
                {uniqueTitle}
              </p>
            </div>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SideBar;
