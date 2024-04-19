import React from "react";
import ToolBar from "./ToolBar";
import SettingBar from "./SettingBar";
import Canvas from "./Canvas";

export default function Page() {
  return (
    <>
      <ToolBar />
      <SettingBar />
      <Canvas />
    </>
  );
}
