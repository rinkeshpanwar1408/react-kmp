
import { notification } from "antd";
import { useSelector } from "react-redux";

const useNotification = () => {
  const currentTheme = useSelector((state) => state.theme.Theme);

  const showSuccessNotification = (title, description) => {
    notification.open({
      message: title,
      description: description,
      className: `${currentTheme.themestyle}`,
      key: Math.random().toString(),
      type: "success",
      duration: 10,
      placement:"topRight"
    });
  };

  const showInfoNotification = (title, description) => {
    notification.open({
      message: title,
      description: description,
      className: `${currentTheme.themestyle}`,
      key: Math.random().toString(),
      type: "info",
      duration: 10,
      placement:"topRight"
    });
  };

  const showErrorNotification = (title, description) => {
    notification.open({
      message: title,
      description: description,
      className: `${currentTheme.themestyle}`,
      key: Math.random().toString(),
      type: "error",
      duration: 10,
      placement:"topRight"
    });
  };

  const showWarningNotification = (title, description) => {
    notification.open({
      message: title,
      description: description,
      className: `${currentTheme.themestyle}`,
      key: Math.random().toString(),
      type: "warning",
      duration: 10,
      placement:"topRight"
    });
  };

  return {
    ShowSuccessNotification: showSuccessNotification,
    ShowErrorNotification: showErrorNotification,
    ShowInfoNotification: showInfoNotification,
    ShowWarningNotification: showWarningNotification,
  };
};

export default useNotification;