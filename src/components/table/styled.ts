import styled from "styled-components";
import { colours } from "../../_globals/theme";

const Container = styled.div`
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const TableContainer = styled.table`
  width: auto;
  text-align: left;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f9f9f9;
  }

  @media (max-width: 700px) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    border-bottom: 1px solid ${colours.tabBackground};
    padding: 10px;
    background: #fff;
  }
`;

const TableHeader = styled.th`
  background-color: ${(props) => props.theme.background};
  color: white;
  padding: 10px;

  @media (max-width: 700px) {
    display: none;
  }
`;

const TableContent = styled.td`
  background-color: #fff;
  padding: 10px;
  font-size: 16px;

  @media (max-width: 700px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 5px;
    border-bottom: 1px solid #ccc;

    &:before {
      content: attr(data-label);
      flex: 1;
      font-weight: bold;
      text-transform: capitalize;
      color: #333;
      padding-right: 10px;
    }
  }

  @media (max-width: 410px) {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: 5px 2px;
    border-bottom: 1px solid #ccc;

    &:before {
      content: attr(data-label);
      flex: 1;
      font-weight: bold;
      text-transform: capitalize;
      color: #333;
      padding-right: 10px;
    }
  }
`;

export {
  TableContainer,
  TableRow,
  TableHeader,
  TableContent,
  Container,
  ButtonContainer,
  PaginationContainer,
};
