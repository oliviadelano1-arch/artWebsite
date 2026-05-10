"use client"

import { Wheat, Heart, Mail, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

import { siteConfig } from "@/config/site"
import { Footer } from "./home/modern-footer";
import { InstagramLogoIcon } from "@radix-ui/react-icons";

export function SiteFooter() {
  const socialLinks = [

    {
      icon: <InstagramLogoIcon className="w-6 h-6" />,
      href: "https://www.instagram.com/olivepaintings?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",  
      label: "Instagram",
    },

  ];

  const navLinks = [
    { label: "Docs", href: "/" },
    { label: "Works", href: "/" },

  ];


  return (
 <Footer
      brandName="Olivia Rose"
      brandDescription="AI-powered resume builder for modern professionals. Create stunning resumes optimized for ATS systems."
      socialLinks={socialLinks}
      navLinks={navLinks}
      creatorName="CB"
      creatorUrl="https://www.caryleblondell.com/"
     
    />
  )
}

