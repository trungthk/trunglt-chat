import React from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = "md" }) => {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
  };
  return (
    <div
      className={`rounded-full overflow-hidden bg-gray-200 ${sizeMap[size]}`}
    >
      {src ? (
        <img src={src} alt={alt} className="object-cover w-full h-full" />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500 text-sm">
          {alt?.charAt(0).toUpperCase() || "?"}
        </div>
      )}
    </div>
  );
};

export default Avatar;
