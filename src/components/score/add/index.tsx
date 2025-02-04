import _ from "lodash";
import { Formik } from "formik";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import {
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  OutlinedInput,
  Paper,
  Slider,
  TextField,
  Grid2 as Grid,
  Typography,
  InputAdornment,
  Button,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { getGenres } from "../../../services/genre";
import { getPlatforms } from "../../../services/platform";
import { Loading } from "../../core/loading";
import { createScoreSchema } from "../../../utils/schema";
import { createScore } from "../../../services/score";
import { formatScoreToCreate } from "../../../utils/format";
import { useNavigate } from "react-router";

const initialValues = {
  name: "",
  score: 1,
  timeToComplete: "",
  finishDate: dayjs(),
  genres: [] as string[],
  playedPlatforms: [] as string[],
};

export default () => {
  const navigate = useNavigate();

  const {
    isPending: getGenresPending,
    error: getGenresError,
    data: genres,
  } = useQuery({
    queryKey: ["score-genres"],
    queryFn: async () => await getGenres(),
  });

  const {
    isPending: getPlatformsPending,
    error: getPlatformsError,
    data: platforms,
  } = useQuery({
    queryKey: ["score-platforms"],
    queryFn: async () => await getPlatforms(),
  });

  if (getGenresError || getPlatformsError) return "An error has occurred";

  return (
    <Container style={{ padding: "20px" }}>
      <Grid container direction="column" alignItems="center">
        <Grid size={{ xs: 12, sm: 10, md: 8, lg: 6 }}>
          <Paper elevation={0} style={{ padding: 20 }}>
            <Typography variant="h3">Add new score</Typography>
            {getGenresPending ||
            getPlatformsPending ||
            !genres ||
            !platforms ? (
              <Loading />
            ) : (
              <Formik
                initialValues={initialValues}
                validationSchema={createScoreSchema}
                onSubmit={async (values) => {
                  const formattedScore = formatScoreToCreate(values);
                  const createScoreRes = await createScore(formattedScore);
                  if (createScoreRes) {
                    navigate(`/score/thoughts/${createScoreRes}`);
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
                        <FormLabel>Game name</FormLabel>
                        <TextField
                          fullWidth
                          name="name"
                          placeholder="Game name"
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

                      <FormGroup style={{ marginTop: 20 }}>
                        <FormLabel>Score</FormLabel>
                        <div style={{ padding: "0 10px" }}>
                          <Slider
                            name="score"
                            valueLabelDisplay="auto"
                            step={1}
                            value={values.score}
                            onChange={(_e, v) => setFieldValue("score", v)}
                            marks={_.times(10, (i) => ({
                              value: i + 1,
                              label: i + 1,
                            }))}
                            min={1}
                            max={10}
                          />
                        </div>
                      </FormGroup>

                      <FormGroup style={{ marginTop: 20 }}>
                        <FormLabel>Time to complete</FormLabel>
                        <OutlinedInput
                          id="timeToComplete"
                          name="timeToComplete"
                          value={values.timeToComplete}
                          onChange={(e) =>
                            setFieldValue("timeToComplete", e.target.value)
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              hours
                            </InputAdornment>
                          }
                          error={!!errors.timeToComplete}
                        />
                        {errors.timeToComplete && (
                          <Typography variant="body2" color="red">
                            {errors.timeToComplete}
                          </Typography>
                        )}
                      </FormGroup>

                      <FormGroup style={{ marginTop: 20 }}>
                        <FormLabel>Finish date</FormLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            maxDate={dayjs()}
                            value={dayjs(values.finishDate)}
                            onChange={(v) => {
                              setFieldValue("finishDate", v);
                            }}
                            format="DD/MM/YYYY"
                          />
                        </LocalizationProvider>
                        {errors.finishDate && (
                          <Typography variant="body2" color="red">
                            {errors.finishDate as string}
                          </Typography>
                        )}
                      </FormGroup>

                      <FormGroup
                        style={{
                          marginTop: 20,
                        }}
                      >
                        <FormLabel>Genres</FormLabel>
                        {genres.map((genre, idx) => (
                          <FormControlLabel
                            key={idx}
                            control={
                              <Checkbox
                                checked={values.genres.includes(genre.id)}
                                onChange={(_e, v) =>
                                  setFieldValue(
                                    "genres",
                                    v === true
                                      ? [...values.genres, genre.id]
                                      : values.genres.filter(
                                          (g) => g !== genre.id,
                                        ),
                                  )
                                }
                                value={genre.id}
                              />
                            }
                            label={genre.name}
                          />
                        ))}
                        {errors.genres && (
                          <Typography variant="body2" color="red">
                            {errors.genres}
                          </Typography>
                        )}
                      </FormGroup>

                      <FormGroup style={{ marginTop: 20 }}>
                        <FormLabel>Platforms</FormLabel>
                        {platforms.map((platform, idx) => (
                          <FormControlLabel
                            key={idx}
                            control={
                              <Checkbox
                                checked={values.playedPlatforms.includes(
                                  platform.id,
                                )}
                                onChange={(_e, v) =>
                                  setFieldValue(
                                    "playedPlatforms",
                                    v === true
                                      ? [...values.playedPlatforms, platform.id]
                                      : values.playedPlatforms.filter(
                                          (g) => g !== platform.id,
                                        ),
                                  )
                                }
                                value={platform.id}
                              />
                            }
                            label={platform.name}
                          />
                        ))}
                        {errors.playedPlatforms && (
                          <Typography variant="body2" color="red">
                            {errors.playedPlatforms}
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
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
