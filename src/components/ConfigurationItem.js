import React, { useState } from "react";
import { Checkbox, Switch, Typography } from "antd";
const { Text, Title } = Typography;

function ConfigurationItem(props) {
    const [status, setstatus] = useState(false)

    const change = (checked) => {
        setstatus(checked);
        props.onChange(checked);
        if (props.onValueChange) {
            props.onValueChange(checked);
        }
    };

    return (
        <div className="configuration_item" value={status}>
            <Text className="configuration_item-title">{props.title}</Text>
            <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked={status} onChange={change} />
        </div>
    );
}

export default ConfigurationItem;
