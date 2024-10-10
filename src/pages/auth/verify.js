import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Link, Stack, TextField, Typography, CircularProgress } from "@mui/material";
import { useAuthContext } from "src/contexts/auth-context";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import { useState } from "react";

const VerifyPage = () => {
  const router = useRouter();
  const { verifyUser, user } = useAuthContext(); // Retrieve user context
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({
      code: Yup.string()
        .length(6, "Verification code must be 6 digits")
        .required("Verification code is required")
        .matches(/^\d+$/, "Verification code must be numeric"), // Ensure it's numeric
    }),
    onSubmit: async (values, helpers) => {
      setIsLoading(true);
      setError(null);
      try {
        await verifyUser(values.code);
        router.push("/");
      } catch (err) {
        setError("Verification failed. Please try again.");
        helpers.setSubmitting(false);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Verify Your Account | MCM</title>
      </Head>
      <Box
        sx={{
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
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Box sx={{ textAlign: "left", width: "100%" }}>
              <Button
                size="small"
                variant="text"
                onClick={() =>  router.push("/auth/register")} // Go back to the previous page
              >
                Go Back
              </Button>
            </Box>
            <Typography variant="h4">Verify Your Account</Typography>
            <Typography color="text.secondary" variant="body2">
              A 6-digit verification code has been sent to your email:{" "}
              <strong>{user?.email}</strong>
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Please enter the code to verify your account.
            </Typography>
          </Stack>
          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <TextField
                error={!!(formik.touched.code && formik.errors.code)}
                fullWidth
                helperText={formik.touched.code && formik.errors.code}
                label="Verification Code"
                name="code"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.code}
                inputProps={{
                  maxLength: 6, // Limit input to 6 digits
                }}
              />
            </Stack>
            {error && (
              <Typography color="error" sx={{ mt: 3 }} variant="body2">
                {error}
              </Typography>
            )}
            <Button
              disabled={isLoading}
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
            >
              {isLoading ? <CircularProgress size={24} /> : "Verify Code"}
            </Button>
            <Typography color="text.secondary" variant="body2" sx={{ mt: 2 }}>
              Didn’t receive the code? &nbsp;
              <Link component={NextLink} href="/auth/resend" underline="hover" variant="subtitle2">
                Resend Code
              </Link>
            </Typography>
          </form>
        </Box>
      </Box>
    </>
  );
};

VerifyPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default VerifyPage;
