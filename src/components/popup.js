import React, { useState } from "react";
import Modal from "react-modal";
import { Icons } from "../assets";
import { PopupClose, PopupOpen } from "./styled-components";

export default function Popup(props) {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => setIsOpen(!isOpen);

  const customStyles = {
    overlay: {
      position: "fixed",
      background: "#00000050",
      width: "100%",
      height: "100vh",
      top: 0,
      left: 0,
    },
    content: {
      position: "relative",
      width: "70%",
      margin: "0 auto",
      height: "auto",
      maxHeight: "70vh",
      marginTop: "calc(100vh - 85vh - 20px)",
      background: "#121213",
      borderRadius: "4px",
      padding: "20px",
      border: "1px solid #999",
      overflow: "auto",
    },
  };

  return (
    <div>
      <PopupOpen onClick={togglePopup}>
        <img src={props.icon} alt={props.alt} />
      </PopupOpen>
      <Modal
        style={customStyles}
        isOpen={isOpen}
        onRequestClose={togglePopup}
        transparent={true}
      >
        <PopupClose type="button" onClick={togglePopup}>
          <img src={Icons.CloseIcon} alt="close" />
        </PopupClose>
        {props.children}
      </Modal>
    </div>
  );
}
