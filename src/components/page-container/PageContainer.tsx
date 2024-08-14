import React, { useEffect, useState } from "react";
import {
  Container,
  CustomElementContainer,
  HeaderContainer,
  ContentContainer,
} from "./styled";
import { PageContainerProps } from "./types";
import TextElement from "../TextElement/TextElement";
import { colours } from "../../_globals/theme";

/**
 * Page container component
 *
 * @param {PageContainerProps} props
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <PageContainer
 * title="Applications"
 * customActions={
 * <Button text="Add new application" theme="normal"/>
 * }
 * onPageReady={() => handlePageReady()}
 * >
 * <p>Welcome to Application Tracker</p>
 * </PageContainer>
 * ```
 */
const PageContainer = ({
  title,
  children,
  customActions,
  onPageReady,
}: PageContainerProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (onPageReady && isLoading) {
      onPageReady();
      setIsLoading(false);
    }
  }, [onPageReady, isLoading]);

  return (
    <Container>
      <HeaderContainer>
        {title && (
          <TextElement
            theme="h1"
            text={title}
            colour={colours.heading}
            alignment={customActions ? "left" : "center"}
          />
        )}
        {customActions && (
          <CustomElementContainer>{customActions}</CustomElementContainer>
        )}
      </HeaderContainer>
      <ContentContainer>
        {isLoading ? <p>Loading...</p> : children}
      </ContentContainer>
    </Container>
  );
};

export default PageContainer;
