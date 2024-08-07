import React, {FC, useState} from 'react';
import {Button, Flex} from "antd";
import classes from './LogItem.module.css'

export enum LogType {
  RECEIVE, SEND, OTHER
}

export interface ILogItem {
  message: string,
  json: string
  type?: LogType
}

interface LogItemProps {
  logItem: ILogItem
}

const LogItem: FC<LogItemProps> = ({logItem}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const changeIsHover = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
      <Flex gap={10}
            vertical
            justify={"space-between"}
            style={{
              width: "100%",
              padding: "0 15px",
              backgroundColor: logItem.type === LogType.SEND ? "#c6d9ea" : "#dcecd2",
              borderRadius: 5
            }}
      >
        <Flex align={"center"} gap={10} onClick={changeIsHover}>
          <span className={classes.message}>{logItem.message}</span>
          {!isOpen &&
              <Button style={{position: "relative", bottom: 2}}>...</Button>
          }
        </Flex>

        {isOpen &&
            <Flex>
              <pre style={{margin: 0, fontSize: 18, padding: "5px 10px"}}>
                {JSON.stringify(JSON.parse(logItem.json), null, 2)}
              </pre>
            </Flex>
        }
      </Flex>
  );
};

export default LogItem;