import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Style from "../styles/homePage.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { FaLocationArrow } from "react-icons/fa";
import { createContext, useEffect, useState } from "react";
import log from "../img/chatgpt-icon.png";
import user from "../img/user.jpeg";
import { CgMenuRight } from "react-icons/cg";
import SideBar from "../component/SideBar";

export default function Home() {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(
        "https://gptserver-nine.vercel.app/completions",
        options
      );

      const resData = await response.json();
      setMessage(await resData.data.choices[0].message);
    } catch (error) {
      console.log(error);
    }
  };

  const createNewChat = async () => {
    setMessage(null);
    setCurrentTitle(null);
    setValue("");
  };

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue("");
  };

  const EnterKey = (event) => {
    if (event.key === "Enter") {
      getMessages();
    }
  };

  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
    console.log(openSideMenu);
  };

  useEffect(() => {
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }

    if (currentTitle && value && message) {
      setPreviousChats((preChats) => {
        return [
          ...preChats,
          {
            title: currentTitle,
            role: "User",
            content: value,
          },
          {
            title: currentTitle,
            role: message.role,
            content: message.content,
          },
        ];
      });
    }
  }, [message, currentTitle]);

  const currentChat = previousChats.filter((previousChats) => {
    return previousChats.title === currentTitle;
  });

  const uniqueTitle = Array.from(
    new Set(previousChats.map((previousChats) => previousChats.title))
  );

  return (
    <div className={Style.homePage}>
      <div className={Style.homePage_Box_SideBar_navigation}>
        <CgMenuRight
          className={Style.menuIcon}
          onClick={() => {
            openSideBar();
          }}
        />
      </div>

      <div className={Style.homePage_Box}>
        <section className={Style.homePage_Box_SideBar}>
          <button
            className={Style.homePage_Box_SideBar_button}
            onClick={() => {
              createNewChat();
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
                <p className={Style.uniqueTitle_data}>{uniqueTitle}</p>
              </div>
            ))}
          </ul>
          <nav className={Style.homePage_Box_SideBar_nav}>
            <p>CloneGPT</p>
          </nav>
        </section>

        <section className={Style.homePage_Box_main}>
          <div className={Style.homePage_Box_main_top}>
            {!currentTitle && <h1>CloneGPT </h1>}
          </div>

          <div className={Style.homePage_Box_main_data}>
            <ul className={Style.homePage_Box_main_feed}>
              {currentChat?.map((chatMessage, index) => (
                <li key={index} className={Style.homePage_Box_main_feed_li}>
                  <p className={Style.homePage_Box_main_feed_role}>
                    {
                      // chatMessage.role
                      chatMessage.role == "User" ? (
                        <Image
                          className={Style.homePage_Box_main_feed_role_img}
                          src={user}
                          alt="Picture of the author"
                          width={30}
                          height={30}
                        />
                      ) : (
                        <Image
                          className={Style.homePage_Box_main_feed_role_img}
                          src={log}
                          alt="Picture of the author"
                          width={30}
                          height={30}
                        />
                      )
                    }
                  </p>
                  <p className={Style.content}>{chatMessage.content}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={Style.homePage_Box_main_bottom}>
            <div className={Style.homePage_Box_main_bottom_inputContainer}>
              <input
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                onKeyPress={(event) => EnterKey(event)}
              />
              <div
                className={Style.homePage_Box_main_bottom_inputContainer_submit}
                onClick={() => getMessages()}
              >
                {<FaLocationArrow />}
              </div>
            </div>

            <div className={Style.homePage_Box_main_bottom_inputContainer_info}>
              <p>
                Free Research Preview. ChatGPT may produce inaccurate
                information about people, places, or facts. ChatGPT Mar 23
                Version
              </p>
            </div>
          </div>
        </section>
      </div>
      {/* SIDEBAR COMPONENT FOR MOBILE */}
      {openSideMenu && (
        <div className={Style.sideBar}>
          <SideBar
            openSideBar={openSideBar}
            uniqueTitle={uniqueTitle}
            currentChat={currentChat}
            createNewChat={createNewChat}
            handleClick={handleClick}
          />
        </div>
      )}
    </div>
  );
}
