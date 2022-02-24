

import React from "react";
import {
    Button,
    Result,
} from "antd";
import { StyledMainContentContainer } from "../styled-components/Master";

const ErrorPage = (props) => {
    return (
        <StyledMainContentContainer>
            <Result
                status="500"
                title="500"
                subTitle="Sorry, something went wrong."
                extra={<Button type="primary">Back Home</Button>}
            />
        </StyledMainContentContainer>
    );
};

export default ErrorPage;
