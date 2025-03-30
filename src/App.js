import './App.css';
import Button from "./components/Button";
import {useState} from "react";
import styles from './styles/styles.module.scss'
import Modal from "./components/Modal";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      <div className={styles.container}>
        <Button setIsOpen={setIsOpen}/>
          {isOpen && <Modal setIsOpen={setIsOpen}/>}
      </div>
    </div>
  );
}

export default App;
