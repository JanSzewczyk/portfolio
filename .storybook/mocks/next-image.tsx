import * as React from "react";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string | { src: string };
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
  loader?: unknown;
  placeholder?: string;
  blurDataURL?: string;
  quality?: number;
  sizes?: string;
  unoptimized?: boolean;
};

const NextImageStub = React.forwardRef<HTMLImageElement, ImageProps>(
  function NextImageStub(props, ref) {
    const {
      src,
      alt,
      fill,
      priority,
      loader,
      placeholder,
      blurDataURL,
      quality,
      unoptimized,
      ...rest
    } = props;
    const resolvedSrc = typeof src === "string" ? src : src?.src;
    return <img ref={ref} src={resolvedSrc} alt={alt} {...rest} />;
  },
);

export default NextImageStub;

export function getImageProps(props: ImageProps) {
  const resolvedSrc =
    typeof props.src === "string" ? props.src : props.src?.src;
  return { props: { ...props, src: resolvedSrc } };
}
