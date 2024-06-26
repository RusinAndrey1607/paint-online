import React, { useEffect, useRef, useState } from "react";
import "../styles/canvas.scss";
import { observer } from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Line from "../tools/Line";
import Eraser from "../tools/Eraser";
import axios from 'axios'

const Canvas = observer(() => {
  const canvasRef = useRef();
  const usernameRef = useRef();
  const [modal, setModal] = useState(true);
  const params = useParams();
  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    let ctx = canvasRef.current.getContext('2d')

    axios.get(`http://localhost:5000/image?id=${params.id}`).then(res =>{
      const img = new Image();
      img.src = res.data;
      img.onload = () => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
        };
    })
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
        break;
      case "erase":
        Eraser.draw(ctx, figure.x, figure.y);
        break;
      case "rect":
        Rect.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.color,
          figure.strokeColor,
          figure.strokeWidth
        );   
      case "circle":
        Circle.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.radius,
          figure.color,
          figure.strokeColor,
          figure.strokeWidth
        );
        break;
      case "line":
        
        Line.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.endX,
          figure.endY,
          figure.strokeColor,
          figure.strokeWidth
        );
        break;
      case "finish":
        ctx.beginPath();
        break;
    }
  };
  const mouseDownHandle = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
  };
  const mouseUpHandle = () => {
    axios.post(`http://localhost:5000/image?id=${params.id}`,{img:canvasRef.current.toDataURL()}).then(res =>console.log(res))
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
        onMouseUp={() => mouseUpHandle()}
        ref={canvasRef}
        width={600}
        height={400}
      ></canvas>
    </div>
  );
});
export default Canvas;
