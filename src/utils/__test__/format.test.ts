import moment from "moment";
import { formatScoreToCreate, formatScoreToUpdate } from "../format";

describe("Format", () => {
  describe("formatScoreToCreate", () => {
    it("should format a valid score object correctly", () => {
      const input = {
        name: "Test Game",
        timeToComplete: 10,
        finishDate: moment("2021-01-01"),
        genres: ["Action", "Adventure"],
        playedPlatforms: ["PC", "Console"],
      };
      const expectedOutput = {
        name: "Test Game",
        score: undefined,
        timeToComplete: 10,
        finishDate: "2021-01-01",
        genres: ["Action", "Adventure"],
        playedPlatforms: ["PC", "Console"],
        thoughts: [],
      };
      expect(formatScoreToCreate(input)).toEqual(expectedOutput);
    });

    it("should handle missing optional fields", () => {
      const input = {
        name: "Test Game",
        timeToComplete: 10,
        finishDate: moment("2021-01-01"),
      };
      const expectedOutput = {
        name: "Test Game",
        score: undefined,
        timeToComplete: 10,
        finishDate: "2021-01-01",
        genres: [],
        playedPlatforms: [],
        thoughts: [],
      };
      expect(formatScoreToCreate(input)).toEqual(expectedOutput);
    });
  });

  describe("formatScoreToUpdate", () => {
    it("should format a valid score object correctly", () => {
      const input = {
        id: "123",
        name: "Updated Game",
        score: 10,
        timeToComplete: 15,
        finishDate: moment("2022-01-01"),
        genres: ["Puzzle"],
        playedPlatforms: ["Mobile"],
        thoughts: ["Good"],
      };
      const expectedOutput = {
        id: "123",
        name: "Updated Game",
        score: 10,
        timeToComplete: 15,
        finishDate: "2022-01-01",
        genres: ["Puzzle"],
        playedPlatforms: ["Mobile"],
        thoughts: ["Good"],
      };
      expect(formatScoreToUpdate(input)).toEqual(expectedOutput);
    });

    it("should handle missing optional fields", () => {
      const input = {
        id: "123",
        name: "Updated Game",
        score: 10,
        timeToComplete: 15,
        finishDate: moment("2022-01-01"),
      };
      const expectedOutput = {
        id: "123",
        name: "Updated Game",
        score: 10,
        timeToComplete: 15,
        finishDate: "2022-01-01",
        genres: [],
        playedPlatforms: [],
        thoughts: [],
      };
      expect(formatScoreToUpdate(input)).toEqual(expectedOutput);
    });
  });
});
