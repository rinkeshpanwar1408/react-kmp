import { Row } from "antd";
import React from "react";

export default function CustomRow(props) {
  return (
    <>
      <Row
        gutter={{
          xs: props.xs ? props.xs : 16,
          sm: props.sm ? props.sm : 16,
          md: props.md ? props.md : 16,
          lg: props.lg ? props.lg : 16,
          xl: props.xl ? props.xl : 16,
          xxl: props.xxl ? props.xl : 16,
        }}
        {...props}
      >
        {props.children}
      </Row>
    </>
  );
}