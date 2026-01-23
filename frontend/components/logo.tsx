import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo.svg" // Assuming you have a logo.svg in your public directory
      alt="SaaS Product Logo"
      width={32}
      height={32}
      className="dark:invert"
    />
  );
}
