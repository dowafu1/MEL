import './App.css';
import PageHeader from './components/page/PageHeader';
import MainBlock from './components/blocks/main-block/MainBlock';
import MainDoble from './components/blocks/main-doble/MainDoble';
import DefectBlock from './components/blocks/defect-block/DefectBlock';

function App() {
  return (
    <>
      <PageHeader/>
      <MainBlock/>
      <MainDoble/>
      <DefectBlock/>
    </>
  )
}

export default App;