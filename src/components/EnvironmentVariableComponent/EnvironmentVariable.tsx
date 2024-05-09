import React, { useState } from "react";
import { Card, Button, Space, Empty } from "antd";
import {
  PlusOutlined,
  DownloadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import EnvironmentDrawer from "../Shared/EnvironmentDrawer";

interface EnvironmentVariableType {
  name: string;
  value: string;
}

interface Props {
  variables: EnvironmentVariableType[];
  onRemove: (name: string) => void;
}

const EnvironmentVariable: React.FC<Props> = ({ variables, onRemove }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [edit, setEdit] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };
  return (
    <Card
      title="Environment Variables"
      extra={
        <Space>
          <Button
            type="text"
            onClick={() => {
              setEdit(false);
              toggleDrawer();
            }}
            icon={<PlusOutlined />}
          ></Button>
          <Button
            type="text"
            onClick={() => {
              setEdit(true);
              toggleDrawer();
            }}
            icon={<EditOutlined />}
          ></Button>
          <Button type="text" icon={<DownloadOutlined />} />
        </Space>
      }
    >
      {variables.length > 0 ? (
        <div className="max-w-sm">
          {variables.map((variable: EnvironmentVariableType, index: number) => (
            <div
              key={index}
              className="flex text-sm leading-5 font-medium text-[#595959] items-center justify-between border rounded-md border-gray-200 p-2 mb-2"
            >
              <div className="font-bold">{variable.name}</div>
              <div>{variable.value}</div>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => onRemove(variable.name)}
              />
            </div>
          ))}
          {edit ? (
            <EnvironmentDrawer
              visible={drawerVisible}
              onClose={toggleDrawer}
              editable
              onSave={() => {}}
              variables={variables}
            />
          ) : (
            <EnvironmentDrawer
              visible={drawerVisible}
              onClose={toggleDrawer}
              editable={false}
              onSave={() => {}}
              variables={variables}
            />
          )}
        </div>
      ) : (
        <Empty description="No environment variable created" />
      )}
    </Card>
  );
};

export default EnvironmentVariable;
