import { Modal } from "antd"
import { useSelector } from "react-redux";

const CustomModal = props => {
    const currentTheme = useSelector((state) => state.theme.Theme);

    return (<Modal wrapClassName="abc" className={`${currentTheme.themestyle} ${currentTheme.themecolor} ${props.className}`} {...props} >
        {props.children}
    </Modal>)
}

export default CustomModal