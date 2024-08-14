import React, { useEffect, useState } from "react";
import { FileContainerProps } from "./types";
import {
  Container,
  InputField,
  FileDisplayName,
  InputHeaderContainer,
  IsRequired,
} from "./styled";
import { FileData } from "../../_types/fileData";
import TextElement from "../TextElement/TextElement";

/**
 * File Container Component
 *
 * @param {FileContainerProps} props
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <FileContainer
 * title="Resume"
 * initialValue="Dhruvi-WD.pdf"
 * isRequired={true}
 * onChange={() => handleDataChange()}
 * error="Please upload proper file"
 * />
 * ```
 */
const FileContainer = ({
  title,
  error,
  initialValue,
  onChange,
  isRequired,
  isDisabled,
}: FileContainerProps): JSX.Element => {
  const [file, setFile] = useState<FileData | null>(initialValue || null);

  // function to change data
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files && event.target.files[0];
    if (uploadedFile) {
      onChange && onChange(uploadedFile);
    }
  };

  useEffect(() => {
    if (initialValue) {
      setFile(initialValue);
    }
  }, [initialValue]);

  return (
    <Container>
      <InputHeaderContainer>
        <TextElement theme="h3" text={title} colour="#000" />
        {isRequired && <IsRequired>*</IsRequired>}
      </InputHeaderContainer>
      <InputField
        type="file"
        onChange={handleChange}
        disabled={isDisabled}
        accept=".pdf,.doc,.docx,.txt"
      />
      {file && <FileDisplayName href={file.url}>{file.name}</FileDisplayName>}
      <TextElement theme="paragraph" colour="red" text={error ? error : ""} />
    </Container>
  );
};

export default FileContainer;
