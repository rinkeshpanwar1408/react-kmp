
import { Button, Result } from 'antd';
import React, { Component } from 'react';
// import { sendLogs } from './../_api/sendLogsAPI';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    var logs = { "error": error, "errorInfo": errorInfo,"ErrorBoundary":"Generated from ErrorBoundary." }
    debugger;
    console.log(logs);
    // sendLogs(logs).then((response) => {
    // }, (error) => { })
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <Result
            status="500"
            title={ this.state.errorInfo.componentStack}
            subTitle={ this.state.errorInfo.componentStack}
            extra={<Button type="primary">Back Home</Button>}
        />
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary