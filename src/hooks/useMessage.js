import React, { useCallback } from "react";
import { message, notification } from "antd";
import { useSelector } from "react-redux";


const useMessage = () => {
  const currentTheme = useSelector((state) => state.theme.Theme);

  const showSuccessMessage = useCallback((displaymessage) => {
    message.open({
      content: displaymessage,
      key: Math.random().toString(),
      duration: 5,
      className: `${currentTheme.themestyle}`,
      type: "success",
    });
  }, [currentTheme.themestyle])

  const showInfoMessage = useCallback((displaymessage) => {
    message.open({
      content: displaymessage,
      key: Math.random().toString(),
      duration: 5,
      className: `${currentTheme.themestyle}`,
      type: "info",
    });
  }, [currentTheme.themestyle])

  const showErrorMessage = useCallback(
    (displaymessage) => {
      message.open({
        content: displaymessage,
        key: Math.random().toString(),
        duration: 5,
        className: `${currentTheme.themestyle}`,
        type: "error",
      });
    },
    [currentTheme.themestyle])

  const showWarningMessage = useCallback((displaymessage) => {
    message.open({
      content: displaymessage,
      key: Math.random().toString(),
      duration: 5,
      className: `${currentTheme.themestyle}`,
      type: "warning",
    });
  }, [currentTheme.themestyle])




  return {
    ShowSuccessMessage: showSuccessMessage,
    ShowErrorMessage: showErrorMessage,
    ShowInfoMessage: showInfoMessage,
    ShowWarningMessage: showWarningMessage,
  };
};

export default useMessage;




