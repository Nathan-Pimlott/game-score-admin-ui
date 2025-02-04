import { formatScoreToCreate, formatScoreToUpdate } from "../format";

describe("Format", () => {
  describe("formatScoreToCreate", () => {
    it("should format a valid score object correctly", () => {
      const input = {
        name: "Test Game",
        timeToComplete: 10,
        finishDate: new Date("2021-01-01"),
        genres: ["Action", "Adventure"],
        platforms: ["PC", "Console"],
      };
      const expectedOutput = {
        name: "Test Game",
        timeToComplete: 10,
        finishDate: "2021-01-01",
        genres: ["Action", "Adventure"],
        platforms: ["PC", "Console"],
      };
      expect(formatScoreToCreate(input)).toEqual(expectedOutput);
    });

    it("should handle missing optional fields", () => {
      const input = {
        name: "Test Game",
        timeToComplete: 10,
        finishDate: new Date("2021-01-01"),
      };
      const expectedOutput = {
        name: "Test Game",
        timeToComplete: 10,
        finishDate: "2021-01-01",
        genres: [],
        platforms: [],
      };
      expect(formatScoreToCreate(input)).toEqual(expectedOutput);
    });

    it("should throw an error for invalid input", () => {
      const input = {
        name: "",
        timeToComplete: -1,
        finishDate: "invalid-date",
        genres: "not-an-array",
        platforms: 123,
      };
      expect(() => formatScoreToCreate(input)).toThrow();
    });
  });

  describe("formatScoreToUpdate", () => {
    it("should format a valid score object correctly", () => {
      const input = {
        name: "Updated Game",
        timeToComplete: 15,
        finishDate: new Date("2022-01-01"),
        genres: ["Puzzle"],
        platforms: ["Mobile"],
      };
      const expectedOutput = {
        name: "Updated Game",
        timeToComplete: 15,
        finishDate: "2022-01-01",
        genres: ["Puzzle"],
        platforms: ["Mobile"],
      };
      expect(formatScoreToUpdate(input)).toEqual(expectedOutput);
    });

    it("should handle missing optional fields", () => {
      const input = {
        name: "Updated Game",
        timeToComplete: 15,
        finishDate: new Date("2022-01-01"),
      };
      const expectedOutput = {
        name: "Updated Game",
        timeToComplete: 15,
        finishDate: "2022-01-01",
        genres: [],
        platforms: [],
      };
      expect(formatScoreToUpdate(input)).toEqual(expectedOutput);
    });

    it("should throw an error for invalid input", () => {
      const input = {
        name: "",
        timeToComplete: -1,
        finishDate: "invalid-date",
        genres: "not-an-array",
        platforms: 123,
      };
      expect(() => formatScoreToUpdate(input)).toThrow();
    });
  });
});
