"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { MenuList } from "./MenuList.jsx";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem.jsx";
import InputGroup from "@/components/ui/input-group";
import ResTopNavbar from "./ResTopNavbar.jsx";
import CartBtn from "./CartBtn";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const data = [
  {
    id: 1,
    label: "Shop",
    type: "MenuList",
    children: [
      {
        id: 11,
        label: "Nuts",
        url: "/shop#Nuts",
        description: "Premium nuts selection.",
        children: [
          { id: 111, label: "Almonds", url: "/shop#Almonds" },
          { id: 112, label: "Cashews", url: "/shop#Cashews" },
          { id: 113, label: "Walnuts", url: "/shop#Walnuts" },
        ],
      },
      {
        id: 12,
        label: "Dried Fruits",
        url: "/shop#DriedFruits",
        description: "Sweet and delicious dried fruits.",
        children: [
          { id: 121, label: "Dates", url: "/shop#Dates" },
          { id: 122, label: "Figs", url: "/shop#Figs" },
          { id: 123, label: "Raisins", url: "/shop#Raisins" },
        ],
      },
      {
        id: 13,
        label: "Seeds",
        url: "/shop#Seeds",
        description: "Nutritious seeds variety.",
        children: [
          { id: 131, label: "Pumpkin Seeds", url: "/shop#PumpkinSeeds" },
          { id: 132, label: "Sunflower Seeds", url: "/shop#SunflowerSeeds" },
          { id: 133, label: "Chia Seeds", url: "/shop#ChiaSeeds" },
        ],
      },
      {
        id: 14,
        label: "Exotic Mixes",
        url: "/shop#ExoticMixes",
        description: "Special dry fruit blends.",
        children: [
          { id: 141, label: "Tropical Mix", url: "/shop#TropicalMix" },
          { id: 142, label: "Spicy Trail Mix", url: "/shop#SpicyTrailMix" },
          { id: 143, label: "Fusion Bites", url: "/shop#FusionBites" },
        ],
      },
    ],
  },
  { id: 2, type: "MenuItem", label: "Best Sellers", url: "/shop#on-sale", children: [] },
  { id: 3, type: "MenuItem", label: "Fresh Arrival", url: "/shop#fresh-arrivals", children: [] },
  { id: 4, type: "MenuItem", label: "Premium Collections", url: "/shop#brands", children: [] },
  { id: 5, type: "MenuItem", label: "Personalized Yours", url: "/Customize", children: [] },
];

const TopNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showContinueDialog, setShowContinueDialog] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);

  const menuRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset hasSelected when user navigates away from Customize page
  useEffect(() => {
    if (pathname !== "/Customize") {
      setHasSelected(false);
    }
  }, [pathname]);

  const handleContinue = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setHasSelected(true);
      setShowContinueDialog(false);
      const params = new URLSearchParams();
      if (selectedOptions.length > 0) {
        params.append('selectedOptions', JSON.stringify(selectedOptions));
      }
      router.push(`/Customize?${params.toString()}`);
    }, 500);
  };

  const handleStartOver = () => {
    setSelectedOptions([]);
    setShowContinueDialog(false);
    setHasSelected(true);
    router.push("/Customize");
  };

  const handlePersonalizedClick = () => {
    if (hasSelected && pathname === "/Customize") {
      // If already on Customize page and has selected before, just stay there
      return;
    }
    
    if (hasSelected) {
      const params = new URLSearchParams();
      if (selectedOptions.length > 0) {
        params.append('selectedOptions', JSON.stringify(selectedOptions));
      }
      router.push(`/Customize?${params.toString()}`);
    } else {
      setShowContinueDialog(true);
    }
  };

  const handleSelect = (value) => {
    setSelectedOptions((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <>
      <nav className="sticky top-0 bg-white z-20">
        <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0">
          <div className="flex items-center">
            <div className="block md:hidden mr-4">
              <ResTopNavbar data={data} />
            </div>
            <Link
              href="/"
              className={cn([integralCF.className, "text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10"])}
            >
              <Image
                src="/images/logo.jpg"
                alt="Logo"
                width={120}
                height={40}
                className="h-auto w-auto md:w-[180px] md:h-[50px]"
                priority
              />
            </Link>
          </div>

          <NavigationMenu className="hidden md:flex mr-2 lg:mr-7">
            <NavigationMenuList>
              {data.map((item) => (
                <div key={item.id}>
                  {item.type === "MenuItem" && item.label !== "Personalized Yours" && (
                    <MenuItem label={item.label} url={item.url} />
                  )}
                  {item.type === "MenuList" && <MenuList data={item.children} label={item.label} />}
                  {item.type === "MenuItem" && item.label === "Personalized Yours" && (
                    <button
                      onClick={handlePersonalizedClick}
                      className="text-gray-900 hover:text-blue-600 font-medium px-3 py-2 rounded cursor-pointer"
                    >
                      Personalized Yours
                    </button>
                  )}
                </div>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <InputGroup className="hidden md:flex bg-[#F0F0F0] mr-3 lg:mr-30 w-48 md:w-64 lg:w-80 px-2 py-1.5 rounded-md">
            <InputGroup.Text className="p-1">
              <Image src="/icons/search.svg" height={16} width={16} alt="search" />
            </InputGroup.Text>
            <InputGroup.Input
              type="search"
              name="search"
              placeholder="Search..."
              className="bg-transparent placeholder:text-black/40 text-sm px-2 py-1 w-full"
            />
          </InputGroup>

          <div className="flex items-center">
            <Link
              href="#"
              className="block md:hidden mr-[14px] p-1"
              onClick={(e) => {
                e.preventDefault();
                setShowMobileSearch(true);
              }}
            >
              <Image src="/icons/search-black.svg" height={22} width={22} alt="search" />
            </Link>

            <CartBtn />

            <div
              className="relative"
              ref={menuRef}
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <button className="p-1 rounded-full hover:bg-gray-200 transition">
                <Image src="/icons/user.svg" height={22} width={22} alt="user" />
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

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="absolute top-0 left-0 w-full h-full bg-white z-50 flex items-center justify-between px-4">
          <div className="flex-grow flex items-center bg-[#F0F0F0] px-3 py-2 rounded-md mr-2">
            <Image src="/icons/search.svg" height={16} width={16} alt="search" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent placeholder:text-black/40 text-sm px-2 py-1 w-full outline-none"
              autoFocus
            />
          </div>
          <button className="text-sm text-blue-600" onClick={() => setShowMobileSearch(false)}>Cancel</button>
        </div>
      )}

      {/* Continue Dialog */}
      <Dialog open={showContinueDialog} onOpenChange={setShowContinueDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              <h3 className="mb-4">Select a print type</h3>
              <div className="flex justify-center items-center gap-8">
                <label className="flex flex-col items-center cursor-pointer">
                  <img
                    src="/images/convert1.jpg"
                    alt="Option 1"
                    className="w-44 h-24 object-cover rounded-lg border"
                  />
                  <input
                    type="checkbox"
                    value="option1"
                    checked={selectedOptions.includes("option1")}
                    onChange={() => handleSelect("option1")}
                    className="mt-2"
                  />
                </label>

                <label className="flex flex-col items-center cursor-pointer">
                  <img
                    src="/images/convert2.jpg"
                    alt="Option 2"
                    className="w-44 h-24 object-cover rounded-lg border"
                  />
                  <input
                    type="checkbox"
                    value="option2"
                    checked={selectedOptions.includes("option2")}
                    onChange={() => handleSelect("option2")}
                    className="mt-2"
                  />
                </label>
              </div>
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-center gap-4 sm:justify-center mt-4">
            <button
              onClick={handleStartOver}
              className="border-2 border-yellow-500 bg-white hover:bg-yellow-50 text-gray-800 px-6 py-2 rounded-full font-medium transition-colors"
            >
              SKIP
            </button>
            <button
              onClick={handleContinue}
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full font-medium transition-colors disabled:opacity-50"
            >
              {loading ? "Loading..." : "CONTINUE"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TopNavbar;