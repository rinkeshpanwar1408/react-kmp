import React, { useState } from "react";
import { Checkbox, InputNumber, Switch, Typography } from "antd";
const { Text, Title } = Typography;

function ConfigureInptItem(props) {
    const [status, setstatus] = useState(false)

    const change = (checked) => {
        setstatus(checked);
        props.onChange(checked);
        if (props.onValueChange) {
            props.onValueChange(checked);
        }
    };

    return (
        <div className="configuration_input" value={status}>
            <Text className="configuration_input-title">{props.title}</Text>
            <InputNumber onChange={change} placeholder={props.placeholder}/>
        </div>
    );
}

export default ConfigureInptItem;
