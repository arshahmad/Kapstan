import React, { useState, useEffect } from "react";
import { Drawer, Button, Input, message, Upload } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";

interface EnvironmentVariable {
  name: string;
  value: string;
}

interface Props {
  visible: boolean;
  editable: boolean;
  variables: EnvironmentVariable[];
  onClose: () => void;
  onSave: (variables: EnvironmentVariable[]) => void;
}

const EnvironmentDrawer: React.FC<Props> = ({
  visible,
  editable,
  variables,
  onClose,
  onSave,
}) => {
  const [editedVariables, setEditedVariables] = useState<EnvironmentVariable[]>(
    []
  );
  const [deletedVariables, setDeletedVariables] = useState<string[]>([]);
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  const MAX_FILE_SIZE = 5 * 1024; // 5KB

  useEffect(() => {
    // Initialize editedVariables with the current variables
    setEditedVariables(variables);
  }, [variables]);

  const handleEditName = (index: number, newName: string) => {
    const updatedVariables = [...editedVariables];
    updatedVariables[index].name = newName;
    setEditedVariables(updatedVariables);
    setUnsavedChanges(true);
  };

  const handleEditValue = (index: number, newValue: string) => {
    const updatedVariables = [...editedVariables];
    updatedVariables[index].value = newValue;
    setEditedVariables(updatedVariables);
    setUnsavedChanges(true);
  };

  const handleDeleteVariable = (index: number) => {
    const variableToDelete = editedVariables[index].name;
    setEditedVariables(editedVariables.filter((_, i) => i !== index));
    setDeletedVariables([...deletedVariables, variableToDelete]);
    setUnsavedChanges(true);
  };

  const handleSave = () => {
    // Combine edited and existing variables
    const combinedVariables = [
      ...editedVariables.filter(
        (variable) => !deletedVariables.includes(variable.name)
      ),
      ...variables.filter(
        (variable) =>
          !editedVariables.map((v) => v.name).includes(variable.name)
      ),
    ];
    onSave(combinedVariables);
    onClose();
  };

  const handleClose = () => {
    if (unsavedChanges) {
      message.warning(
        "You have unsaved changes. Are you sure you want to close?"
      );
    } else {
      onClose();
    }
  };

  const handleFileChange = (info: any) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1); // Allow only one file to be uploaded

    // Check file size
    const file = fileList[0];
    if (file && file.size > MAX_FILE_SIZE) {
      message.error("File size exceeds the limit (5KB)");
    } else {
      // Handle adding the uploaded file
      console.log("File added:", fileList[0]);
    }
  };

  return (
    <Drawer
      title={
        editable ? "Edit Environment Variables" : "Upload Environment File"
      }
      placement="right"
      closable={false}
      onClose={handleClose}
      visible={visible}
      width={696}
    >
      {editable ? (
        <div>
          {editedVariables.map((variable, index) => (
            <div key={index} className="mb-4 flex space-x-3 text-[#595959]">
              <div className="flex space-x-3 items-center">
                <span className="text-sm font-medium">Name</span>
                <Input
                  className="mr-4"
                  value={variable.name}
                  onChange={(e) => handleEditName(index, e.target.value)}
                />
              </div>
              <div className="flex space-x-3 items-center">
                <span className="text-sm font-medium">Value</span>
                <Input
                  className="mr-4"
                  value={variable.value}
                  onChange={(e) => handleEditValue(index, e.target.value)}
                />
              </div>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteVariable(index)}
              />
            </div>
          ))}
          <div className="flex justify-end">
            <Button onClick={handleClose} style={{ marginRight: "8px" }}>
              Cancel
            </Button>
            <Button
              className="bg-[#6E27D5]"
              type="primary"
              onClick={handleSave}
            >
              Add
            </Button>
          </div>
        </div>
      ) : (
        <div className="border border-solid border-gray-300 rounded-md p-3">
          <Upload.Dragger
            fileList={[]}
            onChange={handleFileChange}
            beforeUpload={() => false} // Disable automatic upload
            height={102}
          >
            <p className="text-xl text-[#6E27D5]">
              <UploadOutlined size={4} />
            </p>
            <p className="font-semibold">
              Click or drag file to this area to upload
            </p>
          </Upload.Dragger>
          <p className="text-xs">
            Upload a .env file. It should not be more than 5KB.
          </p>
          <div style={{ marginTop: "16px", textAlign: "right" }}>
            <Button onClick={handleClose} style={{ marginRight: "8px" }}>
              Cancel
            </Button>
            <Button
              type="primary"
              className="bg-[#6E27D5]"
              onClick={handleClose}
            >
              Add
            </Button>
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default EnvironmentDrawer;
