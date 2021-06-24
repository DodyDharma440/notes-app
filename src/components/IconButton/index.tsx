import React from "react";
import clsx from "clsx";

type Props = {
  icon: JSX.Element;
  background: string;
  iconColor: string;
  iconSize: string;
  className?: string;
  onClick?: () => void;
};

const IconButton: React.FC<Props> = ({
  icon,
  background,
  iconColor,
  iconSize,
  className,
  onClick,
  ...props
}) => {
  const iconButtonClass = clsx(
    `rounded-lg p-2 flex justify-center cursor-pointer items-center bg-${background} opacity-90 hover:opacity-100 text-${iconColor} text-${iconSize}`,
    {
      [`${className}`]: className,
    }
  );

  return (
    <div onClick={onClick} {...props} className={iconButtonClass}>
      {icon}
    </div>
  );
};

export default IconButton;
