import { message, notification } from "antd";
import { useSelector } from "react-redux";


const useMessage = () => {
  const currentTheme = useSelector((state) => state.theme.Theme);

  const showSuccessMessage = (displaymessage) => {
    message.open({
      content: displaymessage,
      key: Math.random().toString(),
      duration: 10,
      className: `${currentTheme.themestyle}`,
      type: "success",
      placement:"topRight"
    });
  };

  const showInfoMessage = (displaymessage) => {
    message.open({
      content: displaymessage,
      key: Math.random().toString(),
      duration: 10,
      className: `${currentTheme.themestyle}`,
      type: "info",
      placement:"topRight"
    });
  };

  const showErrorMessage = (displaymessage) => {
    message.open({
      content: displaymessage,
      key: Math.random().toString(),
      duration: 10,
      className: `${currentTheme.themestyle}`,
      type: "error",
    });
  };

  const showWarningMessage = (displaymessage) => {
    message.open({
      content: displaymessage,
      key: Math.random().toString(),
      duration: 10,
      className: `${currentTheme.themestyle}`,
      type: "warning",
      placement:"topRight"
    });
  };

  return {
    ShowSuccessMessage: showSuccessMessage,
    ShowErrorMessage: showErrorMessage,
    ShowInfoMessage: showInfoMessage,
    ShowWarningMessage: showWarningMessage,
  };
};

export default useMessage;




