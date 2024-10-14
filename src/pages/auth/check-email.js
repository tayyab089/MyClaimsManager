import { useState, useContext } from "react";
import Head from "next/head";
import { Box, Button, Link, Stack, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import { useRouter } from "next/navigation";
import { AuthContext } from "src/contexts/auth-context";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object({
  code: Yup.string().required("Verification code is required"),
  newPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(255)
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[@$!%*?&]/, "Password must contain at least one special character"),
  retypePassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please retype your password"),
});

const CheckEmailPage = () => {
  const router = useRouter();
  const { forgotPassword, user } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const formik = useFormik({
    initialValues: {
      code: "",
      newPassword: "",
      retypePassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const email = user?.email;
        const response = await forgotPassword(email, values.newPassword, values.code);
        if (response) {
          setSuccess("Password reset successful! Click here to go back to signing in.");
        } else {
          setError("An error occurred. Please try again.");
        }
      } catch (err) {
        setError(err.message || "An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Check Email | MCM</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        {success ? (
          <Typography color="success.main" sx={{ mb: 3 }}>
            {success}
            <Link
              onClick={() => router.push("/auth/login")}
              sx={{ cursor: "pointer", color: "primary.main" }}
            >
              Sign In
            </Link>
          </Typography>
        ) : (
          <Box
            sx={{
              maxWidth: 400,
              px: 3,
              py: 4,
              textAlign: "center",
            }}
          >
            <Box sx={{ textAlign: "left", mb: 2 }}>
              <Link
                component="button"
                onClick={() => router.push("/auth/forgot-password")}
                underline="always"
                variant="body2"
                sx={{ color: "text.primary", cursor: "pointer" }}
              >
                Back
              </Link>
            </Box>
            <Typography variant="h4" gutterBottom>
              Check Your Email
            </Typography>
            <Typography color="text.secondary" variant="body2" sx={{ mb: 3 }}>
              Please enter the verification code sent to your email {user?.email} and your new password.
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={2} sx={{ mt: 3 }}>
                <TextField
                  label="Verification Code"
                  variant="outlined"
                  fullWidth
                  {...formik.getFieldProps("code")}
                  error={Boolean(formik.touched.code && formik.errors.code)}
                  helperText={formik.touched.code && formik.errors.code}
                />
                <TextField
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  {...formik.getFieldProps("newPassword")}
                  error={Boolean(formik.touched.newPassword && formik.errors.newPassword)}
                  helperText={formik.touched.newPassword && formik.errors.newPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                          style={{ padding: 10 }}
                        >
                          {showPassword ? (
                            <EyeSlashIcon style={{ height: 24, width: 24, color: "#4338CA" }} />
                          ) : (
                            <EyeIcon style={{ height: 24, width: 24, color: "#4338CA" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Retype Password"
                  type={showRetypePassword ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  {...formik.getFieldProps("retypePassword")}
                  error={Boolean(formik.touched.retypePassword && formik.errors.retypePassword)}
                  helperText={formik.touched.retypePassword && formik.errors.retypePassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowRetypePassword((prev) => !prev)}
                          edge="end"
                          style={{ padding: 10 }}
                        >
                          {showRetypePassword ? (
                            <EyeSlashIcon style={{ height: 24, width: 24, color: "#4338CA" }} />
                          ) : (
                            <EyeIcon style={{ height: 24, width: 24, color: "#4338CA" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button fullWidth variant="contained" type="submit" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Reset Password"}
                </Button>
              </Stack>
            </form>
            {error && <Typography color="error">{error}</Typography>}
          </Box>
        )}
      </Box>
    </>
  );
};

CheckEmailPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default CheckEmailPage;
