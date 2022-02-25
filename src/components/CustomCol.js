import React from "react";
import { Col } from "antd";

export default function CustomCol(props) {
    return (
        <>
            <Col
                xxl={{ span: props.xxl ? props.xxl : 24 }}
                xl={{ span: props.xl ? props.xs : 24 }}
                lg={{ span: props.lg ? props.lg : 24 }}
                md={{ span: props.md ? props.md : 24 }}
                sm={{ span: props.sm ? props.sm : 24 }}
                xs={{ span: props.xs ? props.xs : 24 }}
                {...props}
            >
                {props.children}
            </Col>
        </>
    );
}

// xs={{ span: 24 }}
// xs={props.xs}
// sm={props.sm}
// md={props.md}
// lg={props.lg}
// xl={props.xl}
// xxl={props.xxl}