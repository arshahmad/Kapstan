import { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  DollarCircleOutlined,
  SafetyOutlined,
  LinkOutlined,
  TaobaoCircleOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
} from "@ant-design/icons";
import HeaderContent from "./components/Header/header";
import ContentContainer from "./components/Content/content";
import { Application } from "./models/Application";
import { MemoryUtilization } from "./models/MemoryUtilization";
import { CPUUtilization } from "./models/CPUUtilization";
import { EventHistory } from "./models/EventHistory";
import { apiService } from "./services/ApiService";
const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(["1"]);
  const [applicationName, setApplicationName] = useState("");
  const [applications, setApplications] = useState<Application[]>([]);
  const [memoryUtilization, setMemoryUtilization] = useState<
    MemoryUtilization[]
  >([]);
  const [cpuUtilization, setCPUUtilization] = useState<CPUUtilization[]>([]);
  const [eventHistory, setEventHistory] = useState<EventHistory[]>([]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (e: any) => {
    setSelectedKeys([e.key]);
  };
  useEffect(() => {
    const fetchData = async () => {
      const fetchedApplications = await apiService.getApplications();
      const fetchedMemoryUtilization = await apiService.getMemoryUtilization();
      const fetchedCPUUtilization = await apiService.getCPUUtilization();
      const fetchedEventHistory = await apiService.getEventHistory();

      setApplications(fetchedApplications);
      setMemoryUtilization(fetchedMemoryUtilization);
      setCPUUtilization(fetchedCPUUtilization);
      setEventHistory(fetchedEventHistory);
    };

    fetchData();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{
          background: "#37146B",
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="text-white text-3xl pt-4 pr-4 pb-4 pl-6">
          <TaobaoCircleOutlined />
          {!collapsed && <span className="font-bold ml-2">Kapstan</span>}
        </div>
        <div className="flex flex-col justify-between h-[90%]">
          <div>
            <Menu
              style={{
                background: "#37146B",
                padding: "8px 16px 12px 16px",
              }}
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              selectedKeys={selectedKeys}
              onClick={handleMenuClick}
            >
              <Menu.Item
                key="1"
                icon={<AppstoreOutlined />}
                style={{
                  backgroundColor:
                    selectedKeys[0] === "1" ? "#4D1B95" : "transparent",
                }}
              >
                Applications
              </Menu.Item>
              <Menu.Item
                key="2"
                icon={<LinkOutlined />}
                style={{
                  backgroundColor:
                    selectedKeys[0] === "2" ? "#4D1B95" : "transparent",
                }}
              >
                Connections
              </Menu.Item>
              <Menu.Item
                key="3"
                icon={<DollarCircleOutlined />}
                style={{
                  backgroundColor:
                    selectedKeys[0] === "3" ? "#4D1B95" : "transparent",
                }}
              >
                Cost
              </Menu.Item>
              <Menu.Item
                key="4"
                icon={<SafetyOutlined />}
                style={{
                  backgroundColor:
                    selectedKeys[0] === "4" ? "#4D1B95" : "transparent",
                }}
              >
                Security{" "}
                <span className="bg-[#6E27D5] text-white px-2 py-1 ml-1 rounded-sm text-[10px] text-center">
                  Beta
                </span>
              </Menu.Item>
            </Menu>
          </div>
          <div>
            <Menu
              style={{
                background: "#37146B",
                padding: "8px 16px 12px 16px",
              }}
              theme="dark"
              mode="inline"
              selectedKeys={selectedKeys}
              onClick={handleMenuClick}
            >
              <Menu.Item
                key="5"
                icon={<DollarCircleOutlined />}
                style={{
                  backgroundColor:
                    selectedKeys[0] === "5" ? "#4D1B95" : "transparent",
                }}
              >
                Admin
              </Menu.Item>
              <Menu.Item
                key="6"
                icon={<SafetyOutlined />}
                style={{
                  backgroundColor:
                    selectedKeys[0] === "6" ? "#4D1B95" : "transparent",
                }}
              >
                Docs
              </Menu.Item>
            </Menu>
            <div className={`flex py-4 pr-8 ${collapsed ? "pl-8" : "pl-11"}`}>
              {collapsed ? (
                <DoubleRightOutlined
                  className="trigger text-white"
                  onClick={toggleCollapsed}
                />
              ) : (
                <DoubleLeftOutlined
                  className="trigger text-white"
                  onClick={toggleCollapsed}
                />
              )}
            </div>
          </div>
        </div>
      </Sider>
      <Layout>
        <Header className=" bg-white p-0">
          <HeaderContent
            setApplicationName={(name: string) => setApplicationName(name)}
            applications={applications}
          ></HeaderContent>
        </Header>
        <Content className="my-0 mx-4">
          <ContentContainer
            applicationName={applicationName}
            applications={applications}
            memoryUtilization={memoryUtilization}
            cpuUtilization={cpuUtilization}
            eventHistory={eventHistory}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
