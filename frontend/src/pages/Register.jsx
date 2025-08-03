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
import axios from "../utils/axios"; // Adjust the import based on your axios setup
axios.defaults.withCredentials = true;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
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
    setSuccess("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const res = await axios.post("/api/auth/register", formData);
      // ✅ Save token to localStorage
      localStorage.setItem("token", res.data.token);

      // Optional: Save user info too
      localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log("Registration successful:", res.data);

      setSuccess("Registered successfully! You can now log in.");

      // Optional: redirect to /login after a timeout
      setTimeout(() => navigate("/dashboard"), 3000);
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed.");
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
          Register for FinancePal
        </Heading>

        {success && (
          <Flex align="center" justify="center" direction="column" mb={4}>
            <Spinner thickness="4px" speed="0.65s" color="blue.400" size="lg" />
            <Text mt={3} color="blue.300" fontWeight="semibold">
              Registration successful! Redirecting...
            </Text>
          </Flex>
        )}

        {error && (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Invalid Details</Alert.Title>
              <Alert.Description>
                Enter valid email or password and try again.
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )}

        <form onSubmit={handleSubmit}>
          <Text mb={2}>Name</Text>
          <Input
            mb={4}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

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
            isDisabled={!formData.name || !formData.email || !formData.password}
          >
            Register
          </Button>
          <Text mt={4} textAlign="center">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "#3182ce", textDecoration: "underline" }}
            >
              Login
            </Link>
          </Text>
        </form>
      </Box>
    </Flex>
  );
};

export default Register;
