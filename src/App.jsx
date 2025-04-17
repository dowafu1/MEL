import './App.css';
import PageHeader from './components/page/PageHeader';
import MainBlock from './components/blocks/main-block/MainBlock';
// import TestsBlock from './components/blocks/tests-block/TestsBlock';

import DownloadBlock from './components/blocks/download-block/DownloadBlock';
import PictureBlock from './components/blocks/picture-block/PictureBlock';
import TestBlock from './components/blocks/test-block/TestBlock';

function App() {
  return (
    <>
      <PageHeader/>
      <MainBlock/>
      {/* <TestsBlock/> */}

      <DownloadBlock/>
      <PictureBlock/>
      <TestBlock/>
      
    </>
  )
}

export default App;

