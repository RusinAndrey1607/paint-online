import React, { useEffect, useRef, useState } from "react";
import "../styles/canvas.scss";
import { observer } from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";

const Canvas = observer(() => {
  const canvasRef = useRef();
  const usernameRef = useRef();
  const [modal, setModal] = useState(true);
  const params = useParams();
  useEffect(() => {
    console.log(canvasRef.current);
    canvasState.setCanvas(canvasRef.current);
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket("ws://localhost:5000/");
      canvasState.setSocket(socket);
      canvasState.setSession(params.id);
      toolState.setTool(new Brush(canvasState.canvas, socket, params.id));

      socket.onopen = () => {
        console.log("connect to ws");
        socket.send(
          JSON.stringify({
            id: params.id,
            username: canvasState.username,
            method: "connection",
          })
        );
      };
      socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        switch (msg.method) {
          case "connection":
            console.log(`User ${msg.username} connected`);
            break;
          case "draw":
            drawHandler(msg);
            break;
        }
      };
    }
  }, [canvasState.username]);

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext("2d");
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y);
        break
      case "finish":
        ctx.beginPath()
        break
    }
  };
  const mouseDownHandle = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
  };

  const connectionHandler = () => {
    canvasState.setUsername(usernameRef.current.value);
    setModal(false);
  };
  return (
    <div className="canvas">
      <Modal show={modal} onHide={() => setModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Type your username!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" ref={usernameRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => connectionHandler()}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
      <canvas
        onMouseDown={() => mouseDownHandle()}
        ref={canvasRef}
        width={600}
        height={400}
      ></canvas>
    </div>
  );
});
export default Canvas;
