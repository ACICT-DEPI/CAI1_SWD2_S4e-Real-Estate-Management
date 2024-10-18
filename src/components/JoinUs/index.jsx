import { Card, Button, Typography } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useState } from "react";
import { SignUp } from "@clerk/clerk-react";

const { Title, Text } = Typography;

const JoinUsCard = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <Card className="rounded-xl shadow-lg bg-violet-800 text-white">
      <div className="p-8 text-center">
        <SmileOutlined className="text-6xl mb-6" />
        <Title level={2} className="text-white font-bold">
          Join Us Now!
        </Title>
        <Text className="text-gray-200 text-lg font-semibold">
          Contact seller and get your Dream home. Become a member today!
        </Text>
        <div className="mt-6">
          <Button
            type="primary"
            size="large"
            className="bg-white text-violet-700 p-3 rounded-md shadow hover:bg-violet-600 hover:text-white transition font-bold px-10"
            onClick={() => setShowSignUp(true)}
          >
            Get Started
          </Button>
        </div>
      </div>

      {showSignUp && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowSignUp(false);
          }}
        >
          <SignUp />
        </div>
      )}
    </Card>
  );
};

export default JoinUsCard;
