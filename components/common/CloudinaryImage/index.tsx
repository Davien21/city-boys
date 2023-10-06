import Image from "next/image";
import React from "react";
import { getBlurPath } from "../../../utils/img-blur-path";

type ComponentProps = {
  sizes?: string;
  src: string;
  alt?: string;
  priority?: boolean;
  width: number;
  height: string | number;
  quality?: number;
  unoptimized?: boolean;
  className?: string;
};

function CloudinaryImage({
  sizes,
  src,
  alt,
  priority,
  width,
  height,
  quality = 100,
  unoptimized,
  className = "",
}: ComponentProps) {
  return (
    <Image
      sizes={sizes}
      unoptimized={unoptimized || false}
      className={className}
      objectFit="cover"
      priority={priority || false}
      alt={alt || ""}
      src={src}
      quality={quality}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={getBlurPath(src)}
    />
  );
}

export { CloudinaryImage };
