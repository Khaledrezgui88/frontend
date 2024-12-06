import React from 'react';
import { BsFillPencilFill, BsFillTrashFill, BsFillDpadFill } from 'react-icons/bs';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { HiMiniShoppingCart } from "react-icons/hi2";

export const EditIcon = () => <BsFillPencilFill />;  // Edit Icon
export const DeleteIcon = () => <BsFillTrashFill />;  // Delete Icon
export const CreateIcon = () => <BsFillDpadFill />;  // Create Icon
export const LogoutIcon = () => <TbLogout />;  // Logout Icon
export const ProfileIcon = () => <CgProfile />;  // Profile Icon
export const ShopIcon = () => <HiMiniShoppingCart />;  // Shop Icon

// Social Media Icons
export const FacebookIcon = ({size}) => <FaFacebook  size={size}/>;
export const InstagramIcon = ({size}) => <FaInstagram  size={size}/>;
export const XIcon = ({size}) => <FaTwitter size={size} />;
export const YoutubeIcon = ({size}) => <FaYoutube size={size}/>;
