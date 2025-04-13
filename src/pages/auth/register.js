import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useAuthContext } from "src/contexts/auth-context";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid"; // Import Heroicons

const Page = () => {
  const router = useRouter();
  const { signUp } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      retypePassword: "", // Add retype password field
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .max(255)
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character"),
      retypePassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please retype your password"), // Validation for retype password
    }),
    onSubmit: async (values, helpers) => {
      setIsLoading(true);
      try {
       const a =  await signUp(values.email, values.password);
       console.log(a)
        router.push("/auth/verify");
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
        <title>Register | MCM</title>
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
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Register</Typography>
              <Typography color="text.secondary" variant="body2">
                Already have an account? &nbsp;
                <Link component={NextLink} href="/auth/login" underline="hover" variant="subtitle2">
                  Log in
                </Link>
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
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type={showPassword ? "text" : "password"} // Toggle password visibility
                  value={formik.values.password}
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
                  error={!!(formik.touched.retypePassword && formik.errors.retypePassword)}
                  fullWidth
                  helperText={formik.touched.retypePassword && formik.errors.retypePassword}
                  label="Retype Password"
                  name="retypePassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type={showRetypePassword ? "text" : "password"} // Toggle password visibility
                  value={formik.values.retypePassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowRetypePassword((prev) => !prev)}
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
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
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
                {isLoading ? (
                  <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <CircularProgress size={20} color="inherit" /> Signing up...
                  </Box>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
