import { FiMail, FiMoreVertical } from "react-icons/fi";
import { Dropdown, Typography } from "antd";
import { StyledInfoBox } from "../styled-components/CommonControls";
import CountUp from 'react-countup';
const { Text } = Typography;


const InfoBox = (props) => {
    return (<StyledInfoBox className="InfoBox">
            <div className="InfoBox_IconContainer">
                {props.icon}
            </div>
            <div className="InfoBox_DataContainer">
                <Text className="InfoBox_DataContainer-title">{props.title}</Text>
                <CountUp className="InfoBox_DataContainer-count" end={props.count} />
            </div>
            {
                props.menu &&
                <div className="InfoBox_ActionContainer">
                    <Dropdown trigger="click" overlay={props.menu}>
                        <FiMoreVertical />
                    </Dropdown>
                </div>
            }
        </StyledInfoBox>)
}

export default InfoBox;

