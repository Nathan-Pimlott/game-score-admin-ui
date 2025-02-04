import _ from "lodash";
import { Formik } from "formik";
import moment from "moment";
import { useNavigate, useParams } from "react-router";
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

import { getGenre, updateGenre } from "../../../services/genre";
import { Loading } from "../../core/loading";
import { createGenreSchema } from "../../../utils/schema";

export default () => {
  const navigate = useNavigate();
  const { genreId = "" } = useParams();

  const {
    isPending,
    error,
    data: genre,
  } = useQuery({
    queryKey: [`genre-${genreId}-${moment().format()}`],
    queryFn: async () => await getGenre(genreId),
  });

  if (error) {
    return "An error has occurred";
  }

  return (
    <Container style={{ padding: "20px" }}>
      <Grid container direction="column" alignItems="center">
        <Grid size={{ xs: 12, sm: 10, md: 8, lg: 6 }}>
          {isPending || !genre ? (
            <Loading />
          ) : (
            <Paper elevation={0} style={{ padding: 20 }}>
              <Typography variant="h3">Edit {genre?.name}</Typography>
              <Formik
                initialValues={genre}
                validationSchema={createGenreSchema}
                onSubmit={async (values) => {
                  await updateGenre(values);
                  navigate(`/genres`);
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
                        <FormLabel>Game name</FormLabel>
                        <TextField
                          fullWidth
                          name="name"
                          placeholder="Name"
                          value={values.name}
                          onChange={(e) =>
                            setFieldValue("name", e.target.value)
                          }
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
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
