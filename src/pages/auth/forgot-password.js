import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  CircularProgress,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import { useAuthContext } from "src/contexts/auth-context";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const { sendPasswordReset } = useAuthContext(); // Ensure this function is available in your auth context
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
    }),
    onSubmit: async (values, helpers) => {
      setIsLoading(true);
      try {
        await sendPasswordReset(values.email);
        helpers.setStatus({ success: true });
        helpers.setErrors({});
        helpers.setSubmitting(false);
        router.push("/auth/check-email");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Forgot Password | MCM</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Link
              component="button"
              onClick={() => router.push("/auth/login")}
              underline="always"
              variant="body2"
              sx={{ mb: 2, color: "text.primary", cursor: "pointer" }}
            >
              Back
            </Link>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Forgot Password</Typography>
              <Typography color="text.secondary" variant="body2">
                Enter your email to receive a password reset link.
              </Typography>
            </Stack>

            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
                disabled={isLoading}
              >
                Send Reset Link
                {isLoading && <CircularProgress size={28} color="inherit" />}
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

ForgotPasswordPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default ForgotPasswordPage;
