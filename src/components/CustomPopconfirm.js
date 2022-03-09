import React from "react";
import { Col, Popconfirm } from "antd";
import { useSelector } from "react-redux";

export default function CustomPopconfirm(props) {
    const currentTheme = useSelector((state) => state.theme.Theme);
    return (
        <Popconfirm
       
            {...props}
            overlayClassName={`${currentTheme.themestyle} ${currentTheme.themecolor}`}
        >
            {props.children}
        </Popconfirm>
    );
}

