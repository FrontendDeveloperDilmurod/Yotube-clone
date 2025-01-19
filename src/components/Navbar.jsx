import React, { useContext, useState } from "react";
import { Menu, Input, Avatar, Dropdown, Drawer } from "antd";
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { RiMenu3Line } from "react-icons/ri";
import { BellOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Yotube_Logo from "../assets/YouTube_Logo.png";
import profile_icon from "../assets/ozim.jpg";
import Sidibar from "./Sidibar";
import { YoutubeContext } from "../context/YotubeContext";

const Navbar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { sidebar, setSidebar, setSearchQuery } = useContext(YoutubeContext);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const navigate = useNavigate(); // For navigation on login/logout

  const handleSearch = () => {
    if (localSearchQuery.trim()) {
      setSearchQuery(localSearchQuery); // Send search query to YoutubeContext
    } else {
      alert("Please enter a search query.");
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Set logged-in state
    navigate("/login"); // Redirect to dashboard after login
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Reset logged-in state
    navigate("/"); // Redirect to home page after logout
  };

  const menu = (
    <Menu
      items={[
        isLoggedIn ? { key: "3", label: "Logout", onClick: handleLogout } : { key: "3", label: "Login", onClick: handleLogin },
      ]}
    />
  );

  return (
    <nav className="fixed top-0 z-50 flex items-center justify-between w-full px-6 py-3 bg-white shadow-md lg:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <RiMenu3Line
          className="text-2xl cursor-pointer hover:text-gray-600"
          onClick={() => setSidebar(!sidebar)}
        />
        <Link to="/">
          <img
            src={Yotube_Logo}
            alt="YouTube Logo"
            className="w-24 cursor-pointer lg:w-28"
          />
        </Link>
      </div>

      {/* Middle Section - Search Bar */}
      <div className="hidden lg:flex items-center w-[40%]">
        <Input
          style={{ height: "40px" }}
          placeholder="Search"
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
          onPressEnter={handleSearch}
          suffix={
            <CiSearch
              className="text-2xl cursor-pointer"
              onClick={handleSearch}
            />
          }
          className="w-full rounded-full"
        />
      </div>

      {/* Right Section */}
      <div className="items-center hidden gap-6 lg:flex">
        <BellOutlined className="text-xl cursor-pointer hover:text-gray-600" />
        <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
          <Avatar src={profile_icon} className="cursor-pointer" />
        </Dropdown>
      </div>

      {/* Drawer for small screens */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={250}
        bodyStyle={{ padding: "10px 20px" }}
      >
        <Sidibar />
      </Drawer>

      {/* Hamburger Menu */}
      <CiMenuBurger
        className="text-2xl cursor-pointer lg:hidden"
        onClick={() => setDrawerVisible(true)}
      />
    </nav>
  );
};

export default Navbar;
