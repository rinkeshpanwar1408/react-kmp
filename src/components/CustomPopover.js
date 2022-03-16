import React from "react";
import { Col, Popconfirm, Popover } from "antd";
import { useSelector } from "react-redux";

export default function CustomPopover(props) {
    const currentTheme = useSelector((state) => state.theme.Theme);
    return (
        <Popover
            {...props}
            overlayClassName={`${currentTheme.themestyle} ${currentTheme.themecolor}`}
        >
            {props.children}
        </Popover>
    );
}

