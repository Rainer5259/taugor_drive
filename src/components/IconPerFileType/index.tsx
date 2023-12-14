import React, {FC} from 'react';
import Music from '~/assets/svgs/music-icon.svg';
import Document from '~/assets/svgs/document-icon.svg';
import Image from '~/assets/svgs/image-icon.svg';
import Video from '~/assets/svgs/video-icon.svg';
import {
  IconPerFileTypeProps,
  CommonMusicFilesType,
  CommonVideoFilesType,
  CommonDocumentFilesType,
  CommonImageFilesType,
} from './interface';

const IconPerFileType: FC<IconPerFileTypeProps> = ({fileType, opacity}) => {
  const renderIcon = () => {
    const size = 24;
    switch (true) {
      case CommonMusicFilesType.includes(
        fileType as (typeof CommonMusicFilesType)[number],
      ):
        return <Music height={size} width={size} opacity={opacity} />;
      case CommonImageFilesType.includes(
        fileType as (typeof CommonImageFilesType)[number],
      ):
        return <Image height={size} width={size} opacity={opacity} />;
      case CommonDocumentFilesType.includes(
        fileType as (typeof CommonDocumentFilesType)[number],
      ):
        return <Document height={size} width={size} opacity={opacity} />;
      case CommonVideoFilesType.includes(
        fileType as (typeof CommonVideoFilesType)[number],
      ):
        return <Video height={size} width={size} opacity={opacity} />;
    }
  };
  return renderIcon();
};

export default IconPerFileType;
