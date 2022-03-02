import React from "react";
import {
    Button,
    Result,
} from "antd";
import { StyledMainContentContainer } from "../styled-components/Master";

const PageNotFound = (props) => {
    return (
        <StyledMainContentContainer>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary">Back Home</Button>}
            />

        </StyledMainContentContainer>
    );
};

export default PageNotFound;
