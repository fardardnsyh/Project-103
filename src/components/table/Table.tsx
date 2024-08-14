import React, { useState } from "react";
import {
  ButtonContainer,
  Container,
  PaginationContainer,
  TableContainer,
  TableContent,
  TableHeader,
  TableRow,
} from "./styled";
import { TableProps } from "./types";
import Button from "../button/Button";
import Spacer from "../spacer/Spacer";
import { DefaultTheme } from "styled-components";
import { colours } from "../../_globals/theme";
import TextElement from "../TextElement/TextElement";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Table<T extends { id: string }>({
  headers,
  data,
  onEdit,
}: TableProps<T>): JSX.Element {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const totalPages = Math.ceil(data.length / pageSize);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderCellContent = (content: any): React.ReactNode => {
    if (
      React.isValidElement(content) ||
      typeof content === "string" ||
      typeof content === "number"
    ) {
      return content;
    }
    return JSON.stringify(content);
  };

  const currentData = data.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const tableHeaderTheme: DefaultTheme = {
    background: colours.sideBarBackground,
  };

  return (
    <Container>
      <TableContainer>
        <thead>
          <TableRow>
            {headers.map((header) => (
              <TableHeader key={String(header.key)} theme={tableHeaderTheme}>
                <TextElement
                  theme="paragraph-bold"
                  text={header.label as string}
                  alignment="center"
                />
              </TableHeader>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <TableRow key={index}>
              {headers.map((header) => (
                <TableContent
                  key={String(header.key)}
                  data-label={header.label as string}
                  onClick={() =>
                    header.key === "edit" ? onEdit(item.id) : undefined
                  }
                >
                  <TextElement
                    theme="paragraph"
                    colour="#000"
                    alignment="center"
                    text={renderCellContent(item[header.key]) as string}
                  />
                </TableContent>
              ))}
            </TableRow>
          ))}
        </tbody>
      </TableContainer>
      <Spacer direction="vertical" amount="3px" />
      <PaginationContainer>
        <TextElement
          theme="paragraph-bold"
          colour={colours.heading}
          text={`Page ${currentPage + 1} of ${totalPages}`}
        />
        <ButtonContainer>
          <Button
            text={
              <>
                <FontAwesomeIcon icon={faChevronLeft} size="1x" />
              </>
            }
            theme="normal"
            isDisabled={currentPage === 0}
            callback={handlePrevious}
          />
          <Button
            text={
              <>
                <FontAwesomeIcon icon={faChevronRight} size="1x" />
              </>
            }
            theme="normal"
            callback={handleNext}
            isDisabled={currentPage >= totalPages - 1}
          />
        </ButtonContainer>
      </PaginationContainer>
    </Container>
  );
}

export default Table;
