import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  Alert,
  Spinner,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
axios.defaults.withCredentials = true;

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/auth/login", formData);
      console.log("Login success:", res.data);
      setSuccess("Login successful! Redirecting...");
      // TODO: Redirect user or store token
      localStorage.setItem("token", res.data.token); // Save JWT token
      localStorage.setItem("user", JSON.stringify(res.data.user)); // Save user info
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (err) {
      // Log the error for debugging
      console.error("Login error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <Flex
      bgImage="url(https://cdn.pixabay.com/photo/2018/06/19/10/01/internet-3484137_1280.jpg)"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      align="center"
      justify="center"
      height="100vh"
    >
      <Box
        bg="rgba(0, 0, 0, 0.7)"
        p={8}
        rounded="md"
        shadow="md"
        width="100%"
        maxW="400px"
      >
        <Heading mb={6} textAlign="center" size="lg">
          Login to FinancePal
        </Heading>
        {/* {success && (
          <Alert.Root status="success">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Login Successful...</Alert.Title>
              <Alert.Description>
                Redirecting to your dashboard...
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )} */}
        {success && (
          <Flex align="center" justify="center" direction="column" mb={4}>
            <Spinner thickness="4px" speed="0.65s" color="blue.400" size="lg" />
            <Text mt={3} color="blue.300" fontWeight="semibold">
              Login successful! Redirecting...
            </Text>
          </Flex>
        )}

        {error && (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Invalid Details</Alert.Title>
              <Alert.Description>
                Check your email or password and try again.
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )}

        <form onSubmit={handleSubmit}>
          <Text mb={2}>Email</Text>
          <Input
            mb={4}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <Text mb={2}>Password</Text>
          <PasswordInput
            mb={4}
            size="lg"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <Button
            colorScheme="blue"
            width="full"
            type="submit"
            isDisabled={!formData.email || !formData.password}
          >
            Login
          </Button>
          <Text mt={4} textAlign="center">
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#3182ce", textDecoration: "underline" }}
            >
              Register
            </Link>
          </Text>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
