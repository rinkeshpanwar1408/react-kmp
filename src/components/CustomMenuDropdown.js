import { Dropdown, Modal } from "antd"
import { useSelector } from "react-redux";

const CustomMenuDropdown = props => {
    const currentTheme = useSelector((state) => state.theme.Theme);

    return (<Dropdown
        
        overlayClassName={`${currentTheme.themestyle} ${currentTheme.themecolor} ${props.className}`}
        {...props}>
        {props.children}
    </Dropdown>)
}

export default CustomMenuDropdown