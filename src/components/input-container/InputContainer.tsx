import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Container,
  InputField,
  InputHeaderContainer,
  InputTextArea,
  IsRequired,
} from "./styled";
import { InputContainerProps } from "./types";
import { doesExist } from "../../_utilities/utils";
import TextElement from "../TextElement/TextElement";

/**
 * Input container component
 *
 * @param {InputContainerProps} props
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <InputContainer
 * title="Position Name"
 * type="text"
 * numberOfLines={4}
 * isDisabled={true}
 * onTextChange={() => handleDataChange()}
 * placeHolder="Full Stack Developer"
 * value="Web Developer"
 * initialValue="Web Developers"
 * isRequired={true}
 * error="Please enter position name"
 * />
 * ```
 */
const InputContainer = ({
  title,
  error,
  onTextChange,
  placeHolder,
  isDisabled,
  type,
  value,
  initialValue,
  numberOfLines,
  isRequired,
}: InputContainerProps): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>(initialValue || "");

  const sanitizedNumberOfLines = useMemo(
    () => numberOfLines || 0,
    [numberOfLines]
  );

  const sanitizedType = useMemo(() => {
    if (!doesExist(type)) {
      return "text";
    }

    return type;
  }, [type]);

  const handleChange = useCallback(
    (
      changeEvent: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const newValue = changeEvent?.target?.value ?? "";
      setInputValue(newValue);

      if (onTextChange) {
        onTextChange(newValue);
      }
    },
    [onTextChange]
  );

  useEffect(() => {
    if (value) {
      setInputValue(value);
    }
  }, [value]);

  return (
    <Container>
      <InputHeaderContainer>
        <TextElement theme="h3" text={title} colour="#000" />
        {isRequired && <IsRequired>*</IsRequired>}
      </InputHeaderContainer>
      {sanitizedNumberOfLines > 1 ? (
        <InputTextArea
          rows={sanitizedNumberOfLines}
          placeholder={placeHolder || ""}
          onChange={(changeEvent) => handleChange(changeEvent)}
          value={inputValue}
          disabled={isDisabled === true}
        />
      ) : (
        <InputField
          placeholder={placeHolder || ""}
          type={sanitizedType}
          onChange={(changeEvent) => handleChange(changeEvent)}
          value={inputValue}
          disabled={isDisabled === true}
        />
      )}
      <TextElement theme="paragraph" colour="red" text={error ? error : ""} />
    </Container>
  );
};

export default InputContainer;
