import { Formik } from "formik";
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
  Dialog,
} from "@mui/material";

import { createThoughtSchema } from "../../utils/schema";
import { createThought, updateThought } from "../../services/thought";
import { IScore, IThought } from "../../types";

interface IProps {
  open: boolean;
  setOpen: Function;
  score: IScore;
  selectedThought: IThought;
  refetchThoughts: Function;
}

export function AddThoughtForm({
  open,
  setOpen,
  score,
  selectedThought,
  refetchThoughts,
}: IProps) {
  const initialValues = selectedThought || {
    title: "",
    body: "",
    priority: 0,
  };

  async function onSubmit(values: IThought) {
    if (values.id) {
      await updateThought(values);
    } else {
      await createThought({
        scoreId: score.id!,
        ...values,
      });
    }
    await refetchThoughts();
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Paper elevation={0} style={{ padding: 20 }}>
        <Typography variant="h5">
          {initialValues.id ? "Update" : "Add"} thought for{" "}
          {score && score.name}
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={createThoughtSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, handleSubmit, isSubmitting, setFieldValue }) => {
            return (
              <FormControl fullWidth>
                <FormGroup style={{ marginTop: 20 }}>
                  <FormLabel>Title</FormLabel>
                  <TextField
                    fullWidth
                    name="title"
                    placeholder="Title"
                    value={values.title}
                    onChange={(e) => setFieldValue("title", e.target.value)}
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
                    multiline
                    name="body"
                    placeholder="The main content"
                    value={values.body}
                    onChange={(e) => setFieldValue("body", e.target.value)}
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
                    onChange={(e) => setFieldValue("priority", e.target.value)}
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
                    disabled={Object.keys(errors).length > 0 || isSubmitting}
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
    </Dialog>
  );
}
