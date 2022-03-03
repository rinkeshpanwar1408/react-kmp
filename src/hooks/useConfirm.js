import { message, Modal, notification } from "antd";
import { useSelector } from "react-redux";
const { confirm } = Modal;


const useConfirm = () => {
    const currentTheme = useSelector((state) => state.theme.Theme);

    const showConfirmDailog = (title, message, okFunction, cancleFunction, okTitle = "Ok", cancelText = "Cancle") => {
        confirm({
            title: title,
            content: message,
            okText: okTitle,
            cancelText: cancelText,
            onOk: okFunction,
            onCancel: cancleFunction,
            className:`${currentTheme.themestyle} ${currentTheme.themecolor}`
        })
    };

    return {
        ShowConfirmDailog: showConfirmDailog,
    };
};

export default useConfirm;




