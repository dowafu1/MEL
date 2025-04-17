import React from 'react';
import MainBlock from '../blocks/main-block/MainBlock';
import DownloadBlock from '../blocks/download-block/DownloadBlock';
import PictureBlock from '../blocks/picture-block/PictureBlock';
// import TestBlock from '../blocks/test-block/TestBlock';
import './main-page.css';

const MainPage = () => {
  return (
    <div>
      <MainBlock />
      <DownloadBlock />
      <PictureBlock />
      {/* <TestBlock /> */}

    </div>
  );
};

export default MainPage;
