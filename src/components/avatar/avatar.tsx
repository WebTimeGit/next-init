import React, { FC } from 'react';

import styles from './avatar.module.scss';
import Image from 'next/image';
import noUser from 'public/noUser.svg';

type TProps = {
  src?: string;
  size?: number;
  className?: string;
}

export const Avatar: FC<TProps> = ({ src, size = 40, className }) => {
  const prop = {
    className: `${styles.avatar} ${className || ''}`.trim(),
  };


  return (
    <Image
      {...prop}
      src={src || noUser}
      width={size}
      height={size}
      alt="avatar"
      priority
    />
  )
}
