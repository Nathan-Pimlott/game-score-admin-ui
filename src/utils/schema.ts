import moment from "moment";
import * as yup from "yup";

export const createScoreSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name cannot exceed 50 characters.")
    .required("Name is required."),
  timeToComplete: yup
    .number()
    .min(1, "Time to complete must be at least 1 hour.")
    .max(200, "Time to complete cannot exceed 200 hours.")
    .required("Time to complete is required."),
  finishDate: yup
    .date()
    .min(new Date("2000-01-01"), "Finish date cannot be before the year 2000.")
    .max(
      moment().format("YYYY-MM-DD 23:59:59"),
      "Finish date cannot be in the future.",
    )
    .required("Finish date is required."),
  genres: yup
    .array()
    .of(yup.string())
    .min(1, "At least 1 genre is required.")
    .max(10, "No more than 10 genres are allowed.")
    .required("You must select at least 1 genre."),
  playedPlatforms: yup
    .array()
    .of(yup.string())
    .min(1, "At least 1 platform is required.")
    .max(10, "No more than 10 platforms are allowed.")
    .required("You must select at least 1 platform."),
});

export const createThoughtSchema = yup.object().shape({
  title: yup
    .string()
    .min(2, "Title must be at least 2 characters.")
    .max(50, "Title cannot exceed 50 characters.")
    .required("Title is required."),
  body: yup
    .string()
    .min(10, "Body must be at least 10 characters.")
    .max(10000, "Body cannot exceed 10,000 characters.")
    .required("Body is required."),
  priority: yup
    .number()
    .min(1, "Priority must be at least 1.")
    .max(99, "Priority cannot be greater than 99.")
    .required("Priority is required."),
});

export const createGenreSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name cannot exceed 50 characters.")
    .required("Name is required."),
});

export const createPlatformSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name cannot exceed 50 characters.")
    .required("Name is required."),
});
