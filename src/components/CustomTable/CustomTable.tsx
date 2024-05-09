import React, { useState } from "react";
import { Table, Button } from "antd";

interface Column {
  title: string;
  dataIndex: string;
  render?: (text: any, record: any) => React.ReactNode;
}

interface Props {
  data: any[];
  columns: Column[];
  pageSize: number;
}

const CustomTable: React.FC<Props> = ({ data, columns, pageSize }) => {
  const [showAll, setShowAll] = useState<boolean>(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <>
      <div style={{ maxHeight: "250px" }}>
        <Table
          dataSource={showAll ? data : data.slice(0, pageSize)}
          pagination={false}
          scroll={{ y: 200 }} // Adjust the height as per your requirement
          style={{ borderTop: "1px solid #f0f0f0", backgroundColor: "#fff" }}
          size="small"
        >
          {columns.map((column: Column, index: number) => (
            <Table.Column
              key={index}
              title={column.title}
              dataIndex={column.dataIndex}
              render={(text: any, record: any) =>
                column.render ? column.render(text, record) : text
              }
            />
          ))}
        </Table>
      </div>
      {data.length > pageSize && (
        <div
          style={{
            position: "sticky",
            bottom: 0,
            left: 0,
            width: "100%",
            padding: "10px",
            backgroundColor: "#fff",
            borderTop: "1px solid #f0f0f0",
            textAlign: "left",
          }}
        >
          <Button type="link" onClick={toggleShowAll}>
            {showAll ? "View Less" : "View More"}
          </Button>
        </div>
      )}
    </>
  );
};

export default CustomTable;
