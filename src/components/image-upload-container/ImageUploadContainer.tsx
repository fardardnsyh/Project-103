import React, { useCallback, useState, useEffect } from "react";
import { ImageUploadProps } from "./types";
import TextElement from "../TextElement/TextElement";
import {
  Container,
  FileDisplayName,
  InputField,
  InputHeaderContainer,
  IsRequired,
} from "./styled";
import { ImageFile } from "../../_types/userData";

const ImageUploadContainer = ({
  maxImages = 1,
  title,
  isRequired,
  error,
  onFilesChange,
  initialData = [],
  isDisabled,
}: ImageUploadProps) => {
  const [files, setFiles] = useState<ImageFile[]>(initialData);

  useEffect(() => {
    setFiles(initialData);
  }, [initialData]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const uploadedFiles = event.target.files;
      if (uploadedFiles) {
        const filesArray = Array.from(uploadedFiles).slice(0, maxImages);
        const filesData = filesArray.map((file) => ({
          url: URL.createObjectURL(file),
          name: file.name,
        }));
        const newFiles = [...files, ...filesData];
        setFiles(newFiles);
        onFilesChange &&
          onFilesChange(newFiles.map((file) => new File([], file.name)));
      }
    },
    [maxImages, onFilesChange, files]
  );

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.url));
    };
  }, [files]);

  return (
    <Container>
      <InputHeaderContainer>
        <TextElement theme="h3" text={title} colour="#000" />
        {isRequired && <IsRequired>*</IsRequired>}
      </InputHeaderContainer>
      {maxImages === 1 ? (
        <InputField
          type="file"
          onChange={handleChange}
          disabled={isDisabled}
          accept="image/*"
        />
      ) : (
        <InputField
          multiple
          type="file"
          onChange={handleChange}
          disabled={isDisabled}
          accept="image/*"
        />
      )}

      {files.map((fileData, index) => (
        <div key={index}>
          <FileDisplayName href={fileData.url}>{fileData.name}</FileDisplayName>
        </div>
      ))}
      <TextElement theme="paragraph" colour="red" text={error || ""} />
    </Container>
  );
};

export default ImageUploadContainer;
