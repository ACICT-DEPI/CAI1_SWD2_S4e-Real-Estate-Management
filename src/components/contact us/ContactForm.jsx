import React, { useState } from "react";
import { Input, Button, Card, Form, Typography, message } from "antd";
import useSupabaseClient from "@/backend/supabase/supabase";
import InserthData from "@/api/contact us/InsertData";
import FetchData from "@/api/contact us/FetchData";

const { TextArea } = Input;
const { Title } = Typography;

export default function ContactForm() {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState(""); // New email state
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const supabase = useSupabaseClient();
  const englishRegex = /^[a-zA-Z0-9\s.,'-]+$/;
  const numericOnlyRegex = /^\d+$/;
  const englishLettersOnlyRegex = /^[a-zA-Z\s]+$/;
  const internationalPhoneRegex =
    /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex

  const validate = () => {
    let newErrors = {};

    if (!subject) {
      newErrors.subject = "Subject is required.";
    } else if (!englishLettersOnlyRegex.test(subject)) {
      newErrors.subject = "Field must contain only English letters.";
    }

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (message && numericOnlyRegex.test(message)) {
      newErrors.message = "Message cannot consist only of numbers.";
    } else if (message && !englishRegex.test(message)) {
      newErrors.message = "Message must contain only English characters.";
    }
    if (!firstName) {
      newErrors.firstName = "First Name is required.";
    } else if (firstName && !englishLettersOnlyRegex.test(firstName)) {
      newErrors.firstName = "Field must contain only English letters.";
    }

    if (!lastName) {
      newErrors.lastName = "Last Name is required.";
    } else if (lastName && !englishLettersOnlyRegex.test(lastName)) {
      newErrors.lastName = "Field must contain only English letters.";
    }

    if (!phone) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!internationalPhoneRegex.test(phone)) {
      newErrors.phoneNumber = "Enter a valid phone number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      let propertyData = {
        subject,
        email,
        message,
        firstName,
        lastName,
        seller_phone: phone,
      };

      const response = await InserthData(supabase, propertyData);
      if (response) {
        message.success("Form submitted successfully");
        setSubject("");
        setEmail("");
        setMessage("");
        setFirstName("");
        setLastName("");
        setPhone("");
      } else {
        message.error("Server error, please try again later");
      }
    } else {
      message.error("Please fix the errors.");
    }
    const getdata = await FetchData(supabase);
    console.log(getdata);
  };

  return (
    <>
      <Card style={{ maxWidth: "600px", margin: "20px auto", padding: "20px" }}>
        <Title level={3}>Contact Us</Title>
        <Form layout="vertical" onFinish={handleSubmit}>
          <div className="flex justify-between gap-2">
            <div className="flex flex-col w-1/2">
              <Form.Item
                label="First Name"
                validateStatus={errors.firstName ? "error" : ""}
                help={errors.firstName}
              >
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Required..."
                />
              </Form.Item>
            </div>
            <div className="flex flex-col w-1/2">
              <Form.Item
                label="Last Name"
                validateStatus={errors.lastName ? "error" : ""}
                help={errors.lastName}
              >
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Required..."
                />
              </Form.Item>
            </div>
          </div>
          <Form.Item
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email}
          >
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Required..."
            />
          </Form.Item>
          <Form.Item
            label="Subject"
            validateStatus={errors.subject ? "error" : ""}
            help={errors.subject}
          >
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Required..."
            />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            validateStatus={errors.phoneNumber ? "error" : ""}
            help={errors.phoneNumber}
          >
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Required..."
            />
          </Form.Item>
          <Form.Item
            label="Message"
            validateStatus={errors.message ? "error" : ""}
            help={errors.message}
          >
            <TextArea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Optional..."
              rows={8}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="Dashed"
              htmlType="submit"
              block
              className="mt-2 bg-indigo-500 text-white hover:bg-indigo-600 active:bg-indigo-500"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}
