const iconPaths = {
  categories: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  search: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  ),
  message: (
    <>
      <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" />
      <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
    </>
  ),
  bookmark: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
  ),
  cart: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  ),
  user: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  ),
  logout: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 8.25L21.75 12 18 15.75M21.75 12H9" />
    </>
  ),
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V21h13V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </>
  ),
  grid: (
    <path d="M4 4h3v3H4zM10.5 4h3v3h-3zM17 4h3v3h-3zM4 10.5h3v3H4zM10.5 10.5h3v3h-3zM17 10.5h3v3h-3zM4 17h3v3H4zM10.5 17h3v3h-3zM17 17h3v3h-3z" />
  ),
  heart: (
    <path d="M20.8 8.5c0 4.6-8.8 11.3-8.8 11.3S3.2 13.1 3.2 8.5A4.3 4.3 0 0 1 7.5 4.2c1.8 0 3.3 1 4.5 2.4C13.2 5.2 14.7 4.2 16.5 4.2A4.3 4.3 0 0 1 20.8 8.5Z" />
  ),
  close: <path d="M18 6 6 18M6 6l12 12" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  chevronDown: <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />,
  back: <path d="m15 18-6-6 6-6" />,
  arrowLeft: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />,
  arrowRight: <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />,
  minus: <path d="M5 12h14" />,
  plus: <path d="M12 5v14M5 12h14" />,
  trash: (
    <>
      <path d="M4 7h16" />
      <path d="M10 11v6M14 11v6" />
      <path d="M6 7l1 14h10l1-14" />
      <path d="M9 7V4h6v3" />
    </>
  ),
  phone: <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.72 21 3 13.28 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />,
  email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.1-4.5A8.5 8.5 0 1 1 20.5 11.5Z" />
      <path d="M8.5 8.5c.3-.7.6-.8.9-.8h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.6.7c-.1.1-.1.3 0 .5.4.7 1.1 1.4 1.8 1.8.2.1.4.1.5 0l.7-.6c.2-.2.4-.2.6-.1l1.7.7c.3.1.4.3.4.5v.5c0 .3-.1.6-.8.9-.7.3-2.4.1-4.1-1.6-1.7-1.7-1.9-3.4-1.6-4.1Z" />
    </>
  ),
  instagram: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />,
  more: <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />,
  location: (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  locationAlt: (
    <>
      <path d="M12 21s7-6.1 7-12a7 7 0 10-14 0c0 5.9 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.3" />
    </>
  ),
  camera: (
    <>
      <path d="M4 7h3l1.5-2h7L17 7h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  filter: <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h10M17 7h4M3 17h4M11 17a2 2 0 1 0 0 .01M9 17a2 2 0 1 0 .01" />,
  image: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A1.5 1.5 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />,
  imageAlt: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a3.182 3.182 0 013.182 0l2.909 2.909M3.75 21h16.5A1.5 1.5 0 0022.5 19.5v-14A2.5 2.5 0 0020 3H4A2.5 2.5 0 001.5 5.5v14A1.5 1.5 0 003 21h.75Z" />,
  chevron: <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />,
  arrow: <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />,
  phoneMessage: <path d="M20 11.5a8.5 8.5 0 0 1-12.8 7.4L3 20l1.1-4.1A8.5 8.5 0 1 1 20 11.5Z" />,
  heartOutline: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />,
  cartProfile: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 2h13" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </>
  ),
};

const defaults = {
  categories: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2 },
  search: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2 },
  message: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" },
  bookmark: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5 },
  cart: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5 },
  user: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5 },
  logout: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8 },
  home: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" },
  grid: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" },
  heart: { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" },
};

export default function Icon({ name, className = "", active = false, saved = false, ...props }) {
  const attrs = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    ...defaults[name],
    className,
    ...props,
  };

  if (name === "bookmark") attrs.fill = saved ? "currentColor" : "none";
  if (name === "heart") attrs.fill = active ? "currentColor" : "none";

  return <svg {...attrs}>{iconPaths[name]}</svg>;
}

export const CategoriesIcon = ({ className = "h-5 w-5", ...props }) => <Icon name="categories" className={className} {...props} />;
export const SearchIcon = ({ className = "h-5 w-5", ...props }) => <Icon name="search" className={className} {...props} />;
export const MessageIcon = ({ className = "h-4 w-4", ...props }) => <Icon name="message" className={className} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props} />;
export const HeartIcon = ({ className = "", active = false, ...props }) => <Icon name="heart" className={className || (active ? "h-5 w-5 fill-primary text-primary transition-all duration-200" : "h-5 w-5")} active={active} {...props} />;
export const CartIcon = ({ className = "h-5 w-5", ...props }) => <Icon name="cart" className={className} {...props} />;
export const UserIcon = ({ className = "", active = false, ...props }) => <Icon name="user" className={className || (active ? "h-5 w-5 text-primary" : "h-5 w-5")} active={active} {...props} />;
export const LogoutIcon = ({ className = "h-5 w-5", ...props }) => <Icon name="logout" className={className} {...props} />;
export const HomeIcon = ({ className = "", active = false, ...props }) => <Icon name="home" className={className || (active ? "h-5 w-5 text-primary" : "h-5 w-5 text-gray-500")} active={active} {...props} />;
export const GridIcon = ({ className = "", active = false, ...props }) => <Icon name="grid" className={className || (active ? "h-5 w-5 text-primary" : "h-5 w-5 text-gray-500")} active={active} {...props} />;
export const ChatIcon = ({ className = "h-4 w-4 text-gray-700", ...props }) => <Icon name="message" className={className} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} />;
export const CloseIcon = ({ className = "h-5 w-5", ...props }) => <Icon name="close" className={className} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props} />;
export const ChevronRightIcon = ({ className = "h-4 w-4 text-gray-400", ...props }) => <Icon name="chevronRight" className={className} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props} />;
export const ChevronDownIcon = ({ className = "h-4 w-4", ...props }) => <Icon name="chevronDown" className={className} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props} />;
export const BackIcon = ({ className = "h-5 w-5", ...props }) => <Icon name="back" className={className} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props} />;
export const ArrowLeft = ({ className = "h-5 w-5", ...props }) => <Icon name="arrowLeft" className={className} {...props} />;
export const ArrowRight = ({ className = "h-5 w-5", ...props }) => <Icon name="arrowRight" className={className} {...props} />;
export const BookmarkIcon = ({ className = "h-5 w-5", saved = false, ...props }) => <Icon name="bookmark" className={className} saved={saved} {...props} />;
export const MinusIcon = ({ className = "h-4 w-4", ...props }) => <Icon name="minus" className={className} strokeWidth={1.8} strokeLinecap="round" {...props} />;
export const PlusIcon = ({ className = "h-4 w-4", ...props }) => <Icon name="plus" className={className} strokeWidth={1.8} strokeLinecap="round" {...props} />;
export const TrashIcon = ({ className = "h-5 w-5", ...props }) => <Icon name="trash" className={className} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props} />;
export const PhoneIcon = ({ className = "h-5 w-5 text-blue-600", ...props }) => <Icon name="phone" className={className} fill="currentColor" stroke="none" {...props} />;
export const EmailIcon = ({ className = "h-5 w-5 text-gray-500", ...props }) => <Icon name="email" className={className} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props} />;
export const WhatsAppIcon = ({ className = "h-5 w-5 text-green-500", ...props }) => <Icon name="whatsapp" className={className} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props} />;
export const InstagramIcon = ({ className = "h-5 w-5", ...props }) => <Icon name="instagram" className={className} fill="currentColor" stroke="none" {...props} />;
export const MoreIcon = ({ className = "h-5 w-5", ...props }) => <Icon name="more" className={className} fill="currentColor" stroke="none" {...props} />;
export const LocationIcon = ({ className = "h-5 w-5", alt = false, ...props }) => <Icon name={alt ? "locationAlt" : "location"} className={className} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props} />;
export const CameraIcon = ({ className = "h-5 w-5", ...props }) => <Icon name="camera" className={className} strokeWidth={1.8} {...props} />;
export const FilterIcon = ({ className = "h-5 w-5", ...props }) => <Icon name="filter" className={className} strokeWidth={1.8} {...props} />;
export const ImageIcon = ({ className = "h-12 w-12", ...props }) => <Icon name="image" className={className} strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" {...props} />;
export const ImageAltIcon = ({ className = "h-12 w-12", ...props }) => <Icon name="imageAlt" className={className} strokeWidth={1} {...props} />;
export const ChevronIcon = ({ className = "h-4 w-4", ...props }) => <Icon name="chevron" className={className} fill="currentColor" stroke="none" {...props} />;
export const ArrowIcon = ({ className = "h-4 w-4", ...props }) => <Icon name="arrow" className={className} fill="currentColor" stroke="none" {...props} />;
export const HeartOutlineIcon = ({ className = "h-6 w-6", ...props }) => <Icon name="heartOutline" className={className} strokeWidth={1.7} {...props} />;
export const CartProfileIcon = ({ className = "h-6 w-6", ...props }) => <Icon name="cartProfile" className={className} strokeWidth={1.7} {...props} />;
