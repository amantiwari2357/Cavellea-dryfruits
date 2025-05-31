"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { MenuList } from "./MenuList.jsx";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem.jsx";
import InputGroup from "@/components/ui/input-group";
import ResTopNavbar from "./ResTopNavbar.jsx";
import CartBtn from "./CartBtn";

const data = [
  {
    id: 1,
    label: "Shop",
    type: "MenuList",
    children: [
      { id: 11, label: "Nuts", url: "/shop#Nuts", description: "Premium nuts selection." },
      { id: 12, label: "Dried Fruits", url: "/shop#DriedFruits", description: "Sweet and delicious dried fruits." },
      { id: 13, label: "Seeds", url: "/shop#Seeds", description: "Nutritious seeds variety." },
      { id: 14, label: "Exotic Mixes", url: "/shop#ExoticMixes", description: "Special dry fruit blends." },
    ],
  },
  { id: 2, type: "MenuItem", label: "Best Sellers", url: "/shop#on-sale", children: [] },
  { id: 3, type: "MenuItem", label: "Fresh Arrival", url: "/shop#fresh-arrivals", children: [] },
  { id: 4, type: "MenuItem", label: "Premium Collections", url: "/shop#brands", children: [] },
];

const TopNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center">
          <div className="block md:hidden mr-4">
            <ResTopNavbar data={data} />
          </div>
          <Link href="/" className={cn([integralCF.className, "text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10"])}>
            <Image
              src="/images/logo.jpg"
              alt="Logo"
              width={120}
              height={40}
              className="h-auto w-auto md:w-[180px] md:h-[50px]"
              priority
            />
          </Link>
          <Link href="/" className={cn([integralCF.className, "text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10"])}>Home</Link>
        </div>

        <NavigationMenu className="hidden md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            {data.map((item) => (
              <div key={item.id}>
                {item.type === "MenuItem" && <MenuItem label={item.label} url={item.url} />}
                {item.type === "MenuList" && <MenuList data={item.children} label={item.label} />}
              </div>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <InputGroup className="hidden md:flex bg-[#F0F0F0] mr-3 lg:mr-30 w-48 md:w-64 lg:w-80 px-2 py-1.5 rounded-md">
          <InputGroup.Text className="p-1">
            <Image priority src="/icons/search.svg" height={16} width={16} alt="search" className="min-w-4 min-h-4" />
          </InputGroup.Text>
          <InputGroup.Input
            type="search"
            name="search"
            placeholder="Search..."
            className="bg-transparent placeholder:text-black/40 text-sm px-2 py-1 w-full"
          />
        </InputGroup>

        <div className="flex items-center">
          <Link href="/search" className="block md:hidden mr-[14px] p-1">
            <Image priority src="/icons/search-black.svg" height={22} width={22} alt="search" />
          </Link>
          <CartBtn />

          {/* User Profile Dropdown */}
          <div
            className="relative"
            ref={menuRef}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <button className="p-1 rounded-full hover:bg-gray-200 transition">
              <Image priority src="/icons/user.svg" height={22} width={22} alt="user" />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                <ul className="flex flex-col text-gray-900">
                  <li><Link href="/profile" className="block px-4 py-2 hover:bg-gray-200">My Profile</Link></li>
                  <li><Link href="/orders" className="block px-4 py-2 hover:bg-gray-200">Orders</Link></li>
                  <li><Link href="/coupons" className="block px-4 py-2 hover:bg-gray-200">Coupons</Link></li>
                  <li><Link href="/gift-cards" className="block px-4 py-2 hover:bg-gray-200">Gift Cards</Link></li>
                  <li><Link href="/notifications" className="block px-4 py-2 hover:bg-gray-200">Notifications</Link></li>
                  <li><Link href="/signin" className="block px-4 py-2 text-red-600 hover:bg-gray-200">Sign Out</Link></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
