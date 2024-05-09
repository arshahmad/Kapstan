import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { Application } from "../../models/Application";

const { Option } = Select;

interface Props {
  setApplicationName: (name: string) => void;
  applications: Application[];
}

const Header: React.FC<Props> = ({ setApplicationName, applications }) => {
  const [initials, setInitials] = useState("TC");
  const handleNameChange = (value: any) => {
    console.log(`Selected value: ${value}`);
    if (value) {
      const initials = value
        .split(" ")
        .map((word: any) => word.charAt(0))
        .join("");
      console.log(`Initials: ${initials}`);
      setInitials(initials);
    }
  };

  const handleApplicationNameChange = (value: any) => {
    console.log(`Selected value: ${value}`);
    setApplicationName(value);
  };

  useEffect(() => {
    setApplicationName("Tic tac toe");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        border: "none",
        height: "65px",
      }}
    >
      <div className="flex flex-col">
        <span className="p-0 text-xs text-[10px] ml-3 font-medium leading-4">
          Applications
        </span>
        <Select
          defaultValue="Tic tac toe"
          style={{ width: 120, border: "none", fontWeight: "bold" }}
          onChange={handleApplicationNameChange}
          className="app-menu h-5"
        >
          {applications.map((application: Application) => {
            return (
              <Option value={application?.name}>{application?.name}</Option>
            );
          })}
        </Select>
      </div>
      <div>
        <span className="bg-[#FFD07B] text-white p-2 w-10 h-9 rounded-[50%]">
          {initials}
        </span>
        <Select
          defaultValue="Tom Chavez"
          style={{ width: 120 }}
          onChange={handleNameChange}
        >
          <Option value="Tom Chavez">Tom Chavez</Option>
          <Option value="Harshil Vyas">Harshil Vyas</Option>
          <Option value="Vivek Vaidya">Vivek Vaidya</Option>
          <Option value="Anuj Sharma">Anuj Sharma</Option>
        </Select>
      </div>
    </div>
  );
};

export default Header;
