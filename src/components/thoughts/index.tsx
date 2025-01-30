import _ from "lodash";
import { useNavigate, useParams } from "react-router";
import { Formik } from "formik";
import { useQuery } from "@tanstack/react-query";
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

import { Loading } from "../core/loading";
import { createThoughtSchema } from "../../utils/schema";
import { getScore } from "../../services/score";
import { createThought, getThoughts } from "../../services/thought";

const initialValues = {
  title: "",
  body: "",
  priority: 0,
};

export default () => {
  const navigate = useNavigate();
  const { scoreId } = useParams();
  console.log({ scoreId });

  const {
    isPending: scoreIsPending,
    error: scoreError,
    data: score,
  } = useQuery({
    queryKey: [`score-${scoreId}`],
    queryFn: async () => await getScore(scoreId as string),
  });

  const {
    isPending: thoughtsIsPending,
    error: thoughtsError,
    data: thoughts,
  } = useQuery({
    queryKey: ["score-thoughts"],
    queryFn: async () => await getThoughts(scoreId as string),
  });
  console.log({ scoreError });

  if (scoreError || thoughtsError) return "An error has occurred";

  console.log({ score });

  return (
    <Container style={{ padding: "20px" }}>
      <Grid container direction="column" alignItems="center">
        <Grid size={{ xs: 12, sm: 10, md: 8, lg: 6 }}>
          {scoreIsPending || thoughtsIsPending ? (
            <Loading />
          ) : (
            <Paper elevation={0} style={{ padding: 20 }}>
              <Typography variant="h3">
                Add thoughts for {score && score.name}
              </Typography>

              <Formik
                initialValues={initialValues}
                validationSchema={createThoughtSchema}
                onSubmit={async (values) => {
                  const createThoughtRes = await createThought({
                    scoreId: scoreId!,
                    ...values,
                  });
                  console.log({ createThoughtRes });
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
                        <FormLabel>Title</FormLabel>
                        <TextField
                          fullWidth
                          name="title"
                          placeholder="Title"
                          value={values.title}
                          onChange={(e) =>
                            setFieldValue("title", e.target.value)
                          }
                          error={!!errors.title}
                        />
                        {errors.title && (
                          <Typography variant="body2" color="red">
                            {errors.title}
                          </Typography>
                        )}
                      </FormGroup>

                      <FormGroup style={{ marginTop: 20 }}>
                        <FormLabel>Body</FormLabel>
                        <TextField
                          fullWidth
                          name="body"
                          placeholder="The main content"
                          value={values.body}
                          onChange={(e) =>
                            setFieldValue("body", e.target.value)
                          }
                          error={!!errors.body}
                        />
                        {errors.body && (
                          <Typography variant="body2" color="red">
                            {errors.body}
                          </Typography>
                        )}
                      </FormGroup>

                      <FormGroup style={{ marginTop: 20 }}>
                        <FormLabel>Priority</FormLabel>
                        <TextField
                          fullWidth
                          name="priority"
                          placeholder="The main content"
                          type="number"
                          value={values.priority}
                          onChange={(e) =>
                            setFieldValue("priority", e.target.value)
                          }
                          error={!!errors.priority}
                        />
                        {errors.priority && (
                          <Typography variant="body2" color="red">
                            {errors.priority}
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
                          Next
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
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
