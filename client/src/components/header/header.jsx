import React, { useState } from "react";
import { Tabs } from "antd";

import classes from "./header.module.scss";
import Encryption from "../encrrption/encryption";
import Decryption from "../decryption/decryption";

const { TabPane } = Tabs;

const Header = () => {
  const [currentTab, setCurrentTab] = useState("1");
  return (
    <div className={classes.header}>
      <div className={classes.title}>
        DES -{" "}
        <span className={currentTab === "1" && "highlight"}>Encryption</span>{" "}
        and{" "}
        <span className={currentTab === "2" && "highlight"}>Decryption</span>
      </div>
      <div className={classes.tabs}>
        <Tabs
          defaultActiveKey="1"
          centered
          onChange={(e) => {
            setCurrentTab(e);
          }}
        >
          <TabPane tab="DES - Encryption" key="1" className={classes.tabPane}>
            <Encryption />
          </TabPane>
          <TabPane tab="DES - Decryption" key="2" className={classes.tabPane}>
            <Decryption />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Header;
