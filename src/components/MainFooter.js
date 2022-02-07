import React from "react";
import { Typography, Layout } from "antd";

const { Footer } = Layout;
const { Text, Link } = Typography;

function MainFooter(props) {
  return (
    <Footer className="footer">
      <div className="footer_text_container">
        <Text className="footer_text_container-text">
          ©2022 Created by Infosys
        </Text>
      </div>
      <div>
        <Link href="#" className="footer-link">
          Send Feedback
        </Link>
        <Link href="#" className="footer-link">
          Contact Us
        </Link>
        <Link href="#" className="footer-link">
          Terms of Use
        </Link>
        <Link href="#" className="footer-link">
          Privacy Policy
        </Link>
      </div>
    </Footer>
  );
}

export default MainFooter;
