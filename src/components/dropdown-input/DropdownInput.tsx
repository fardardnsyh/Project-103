import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Dropdown,
  DropdownOption,
  InputHeaderContainer,
  IsRequired,
} from "./styled";
import { DropdownInputProps } from "./types";
import TextElement from "../TextElement/TextElement";

/**
 * Custom Dropdown Input Component
 *
 * @param {DropdownInputProps} props
 * @returns  {JSX.Element}
 *
 * @example
 * ```tsx
 * <DropdownInput
 * title="Select job type option"
 * initialValue="Full Time"
 * data={jobTypeOptions}
 * isDisabled={false}
 * onChange={() => handleChange()}
 * unselectedDisplayValue="Select an option..."
 * error="Please select any options"
 * />
 */
const DropdownInput = ({
  onChange,
  data,
  initialValue = "",
  isDisabled = false,
  unselectedDisplayValue = "Select an option...",
  error,
  title,
  isRequired,
}: DropdownInputProps): JSX.Element => {
  const [value, setValue] = useState<string | number>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // function to change
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      setValue(value);
      onChange(value);
    },
    [onChange]
  );

  return (
    <Container>
      <InputHeaderContainer>
        <TextElement theme="h3" text={title} colour="#000" />
        {isRequired && <IsRequired>*</IsRequired>}
      </InputHeaderContainer>
      <Dropdown value={value} onChange={handleChange} disabled={isDisabled}>
        {unselectedDisplayValue && (
          <DropdownOption value="">{unselectedDisplayValue}</DropdownOption>
        )}
        {data.map(({ id, displayValue }) => (
          <DropdownOption key={id} value={id}>
            {displayValue}
          </DropdownOption>
        ))}
      </Dropdown>
      <TextElement theme="paragraph" colour="red" text={error ? error : ""} />
    </Container>
  );
};

export default DropdownInput;
