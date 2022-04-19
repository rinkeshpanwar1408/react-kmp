import React, { useState } from "react";
import { Switch, Typography } from "antd";

import { AiOutlineQuestionCircle } from 'react-icons/ai';
import CustomPopover from "./CustomPopover";

const { Text } = Typography;

function ConfigurationSwitch(props) {
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
            <div className="configuration_item_title_container">
                <Text className="configuration_item_title_container-title">{props.title}</Text>
                <CustomPopover title="Info" content={
                    <div>
                        <p>Content</p>
                    </div>}>
                    <AiOutlineQuestionCircle size={18} className="configuration_item_title_container-hint" />
                </CustomPopover>
            </div>
            <Switch
                checkedChildren="On"
                unCheckedChildren="Off"
                defaultChecked={status}
                checked={props.value}
                onChange={change} />
        </div>
    );
}

export default ConfigurationSwitch;
