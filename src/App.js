import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import {OnClickChildren} from "./onClickChildren";
let customId = 0;
const prefixCustomId = () =>{
  return customId++
}

function App() {
  const [portalState, setPortalState] = useState([])
  const [arId, setArId] = useState(0)
  const pushNotifications = [
    {id: prefixCustomId(), value: 'This is the first message!', animationClass: 'popup-in'},
    {id: prefixCustomId(), value: 'This is the second message!', animationClass: 'popup-in'},
    {id: prefixCustomId(), value: 'This is the final message!', animationClass: 'popup-in'},
  ]

  const removeEl = (tarId) => {
    const newState = [...portalState]
    const lastObj = newState[tarId]
    lastObj.animationClass = 'popup-out'
    setPortalState(newState)
    setTimeout(() => {
      setPortalState(prevState => prevState.filter(t => t !== portalState[tarId]))
    }, 300)
  }
  const handleClick = () => {
    if (portalState.length > 2) {
      if(portalState.length === 4) return
    removeEl(portalState.length-1)
    }
    setPortalState(prevState => [pushNotifications[arId], ...prevState]);
    let l = pushNotifications[arId].id
    setTimeout(() => {
      setPortalState(prevState => prevState.filter(t => t.id !== l))
    }, 4700);
    setArId(prevArId => prevArId + 1);
  };

  useEffect(() => {
    if (arId === 3) setArId(0);
  }, [arId]);

  const handleDeleteClick = (e, value) => {
    const newState = [...portalState]
    let tarIndex = newState.findIndex(obj => obj.id === value.id)
    removeEl(tarIndex)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Simple example of pop-up notifications<br/> created via react.createPortal.
        </p>
        <button
          className="App-link"
          onClick={handleClick}
        >
          Summon a notification!
        </button>
      </header>
      {
        createPortal(
            <div className='popUpWrapper'>
              {
                portalState.map((portalVar) => {
                  return (
                      <p className={`${portalVar.animationClass} popUpNotification`} key={portalVar.id}>
                        {portalVar.value}
                        <button onClick={(e) => handleDeleteClick(e, portalVar)} className='deleteX'>✕</button>
                      </p>
                  );
                })
              }
            </div>,
            document.body
        )
      }
      {/*<OnClickChildren>*/}
      {/*  <div>1</div>*/}
      {/*  <div>2</div>*/}
      {/*  <div>3</div>*/}
      {/*</OnClickChildren>*/}
    </div>
  );
}

export default App;
