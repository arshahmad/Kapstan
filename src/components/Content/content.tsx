import React, { useState } from "react";
import { Tabs, Card, Collapse, Tag, Button, ConfigProvider, Empty } from "antd";
import {
  DesktopOutlined,
  ToolOutlined,
  WarningOutlined,
  HistoryOutlined,
  CheckCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import SimpleLineChart from "../Charts/lineChart";
import CustomTable from "../CustomTable/CustomTable";
import EnvironmentVariable from "../EnvironmentVariableComponent/EnvironmentVariable";
import { Application } from "../../models/Application";
import { MemoryUtilization } from "../../models/MemoryUtilization";
import { CPUUtilization } from "../../models/CPUUtilization";
import { convertTimestampToTime, timeDifference } from "../../helper";
import { EventHistory } from "../../models/EventHistory";

const { TabPane } = Tabs;
const { Panel } = Collapse;

interface EnvironmentVariableType {
  name: string;
  value: string;
}

interface Props {
  applicationName: string;
  applications: Application[];
  memoryUtilization: MemoryUtilization[];
  cpuUtilization: CPUUtilization[];
  eventHistory: EventHistory[];
}

const ContentContainer: React.FC<Props> = ({
  applicationName,
  applications,
  memoryUtilization,
  cpuUtilization,
  eventHistory,
}) => {
  const [variables, setVariables] = useState<EnvironmentVariableType[]>([
    { name: "ABC", value: "123" },
    { name: "XYZ", value: "test" },
  ]);
  const findName = (applicationId: string): string => {
    if (applications.length) {
      const name = applications.find(
        (a) => String(a?.id) === applicationId
      )?.name;
      return name || "";
    }
    return "";
  };
  const memData = memoryUtilization.map((mem: MemoryUtilization) => {
    return {
      name: convertTimestampToTime(Number(mem.timestamp)),
      [findName(mem.applicationId)]: mem.memoryUtilization,
    };
  });

  const CPUData = cpuUtilization.map((mem: CPUUtilization) => {
    return {
      name: convertTimestampToTime(Number(mem.timestamp)),
      [findName(mem.applicationId)]: mem.cpuUtilization,
    };
  });

  const eventHistoryData = eventHistory.map((e: EventHistory) => {
    return {
      event: e.event,
      timestamp: timeDifference(e.timestamp),
      version: e.version,
      status: e.status,
    };
  });


  const columns = [
    {
      title: "Event",
      dataIndex: "event",
      render: (text: string, record: any) => (
        <>
          <div>{text}</div>
          <div style={{ fontSize: "12px", color: "#888" }}>
            {record.timestamp}
          </div>
        </>
      ),
    },
    {
      title: "Version",
      dataIndex: "version",
      render: (text: string) => (
        <>
          <div>{text}</div>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => {
        let color;
        if (text === "in_progress") color = "yellow";
        else if (text === "successful") color = "green";
        else if (text === "failed") color = "red";
        return (
          <Tag color={color}>
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: color,
                marginRight: "5px",
              }}
            ></span>
            {text}
          </Tag>
        );
      },
    },
  ];

  const handleRemoveVariable = (name: string) => {
    setVariables(variables.filter((variable) => variable.name !== name));
  };

  return (
    <div style={{ padding: "20px" }}>
      <div className="flex justify-between">
        <h1 className="font-bold">{applicationName}</h1>
        <div>
          <Tag color={"green"}>
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "green",
                marginRight: "5px",
              }}
            ></span>
            {"Deployed"}
          </Tag>
          <MoreOutlined className="font-bold cursor-pointer" />
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              /* here is your component tokens */
              itemSelectedColor: "#00000",
              itemHoverColor: "#00000",
              itemActiveColor: "#00000",
            },
          },
        }}
      >
        <Tabs
          defaultActiveKey="1"
          style={{ marginTop: "20px" }}
          className="arsh"
          tabBarStyle={{ color: "red !important" }}
        >
          <TabPane
            tab={
              <span>
                <DesktopOutlined /> Overview
              </span>
            }
            key="1"
          >
            <Collapse
              style={{ marginTop: "20px", background: "white" }}
              expandIconPosition="right"
              ghost
            >
              <Panel header="Service Info" key="1">
                <div className="flex flex-col justify-between space-y-10">
                  <div className="flex space-x-32 items-start w-full">
                    <div className="flex flex-col">
                      <span className="text-xs">Current Version</span>
                      <span>
                        <span className="text-green-400 mr-1">
                          <CheckCircleOutlined />
                        </span>
                        In Sync
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs">Desired Version</span>
                      <span>1.2.1</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <Button className="bg-[#6E27D5] rounded-md text-center text-white">
                      Deploy
                    </Button>
                    <span className="text-xs">Last updated 5 hours ago</span>
                  </div>
                </div>
              </Panel>
            </Collapse>

            <div
              style={{ display: "flex", marginTop: "10px", height: "396px" }}
            >
              <Card
                title="System metrics"
                style={{ flex: 1, marginRight: "10px" }}
              >
                <ConfigProvider
                  theme={{
                    components: {
                      Tabs: {
                        /* here is your component tokens */
                        itemSelectedColor: "#6E27D5",
                        itemHoverColor: "#6E27D5",
                        itemActiveColor: "#6E27D5",
                      },
                    },
                  }}
                >
                  <Tabs defaultActiveKey="1" style={{ marginTop: "20px" }}>
                    {CPUData.length && memData.length ? (
                      <>
                        <TabPane tab="CPU" key="1">
                          <SimpleLineChart data={CPUData} />
                        </TabPane>
                        <TabPane tab="Memory" key="2">
                          <SimpleLineChart data={memData} />
                        </TabPane>
                      </>
                    ) : (
                      <span>Charts loading...</span>
                    )}
                  </Tabs>
                </ConfigProvider>
              </Card>
              <Card title="Event History" style={{ flex: 1 }}>
                {eventHistoryData.length ? (
                  <CustomTable
                    data={eventHistoryData}
                    columns={columns}
                    pageSize={4}
                  />
                ) : (
                  <Empty />
                )}
              </Card>
            </div>
          </TabPane>
          <TabPane
            tab={
              <span>
                <ToolOutlined /> Environment Variables
              </span>
            }
            key="2"
          >
            <EnvironmentVariable
              variables={variables}
              onRemove={handleRemoveVariable}
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                <WarningOutlined /> Alerts
              </span>
            }
            key="3"
          >
            Content for Alerts tab
          </TabPane>
          <TabPane
            tab={
              <span>
                <HistoryOutlined /> Event History
              </span>
            }
            key="4"
          >
            Content for Event History tab
          </TabPane>
        </Tabs>
      </ConfigProvider>
    </div>
  );
};

export default ContentContainer;
