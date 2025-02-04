import _ from "lodash";
import { Formik } from "formik";
import { useNavigate } from "react-router";
import {
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Paper,
  TextField,
  Grid2 as Grid,
  Typography,
  Button,
} from "@mui/material";

import { createPlatform } from "../../../services/platform";
import { createPlatformSchema } from "../../../utils/schema";

const initialValues = {
  name: "",
};

export default () => {
  const navigate = useNavigate();

  return (
    <Container style={{ padding: "20px" }}>
      <Grid container direction="column" alignItems="center">
        <Grid size={{ xs: 12, sm: 10, md: 8, lg: 6 }}>
          <Paper elevation={0} style={{ padding: 20 }}>
            <Typography variant="h3">Add new platform</Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={createPlatformSchema}
              onSubmit={async (values) => {
                const createPlatformRes = await createPlatform(values);
                if (createPlatformRes) {
                  navigate(`/platforms`);
                }
              }}
            >
              {({
                values,
                errors,
                handleSubmit,
                isSubmitting,
                setFieldValue,
              }) => {
                return (
                  <FormControl fullWidth>
                    <FormGroup style={{ marginTop: 20 }}>
                      <FormLabel>Name</FormLabel>
                      <TextField
                        fullWidth
                        name="name"
                        placeholder="Platform name"
                        value={values.name}
                        onChange={(e) => setFieldValue("name", e.target.value)}
                        error={!!errors.name}
                      />
                      {errors.name && (
                        <Typography variant="body2" color="red">
                          {errors.name}
                        </Typography>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Button
                        onClick={() => handleSubmit()}
                        variant="contained"
                        style={{ marginTop: 20, maxWidth: 100 }}
                        disabled={
                          Object.keys(errors).length > 0 || isSubmitting
                        }
                      >
                        Save
                      </Button>

                      {Object.keys(errors).length > 0 && (
                        <Typography
                          variant="body2"
                          color="red"
                          style={{ marginTop: 10 }}
                        >
                          There are errors on the form, please fix before
                          continuing.
                        </Typography>
                      )}
                    </FormGroup>
                  </FormControl>
                );
              }}
            </Formik>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
