import * as _ from "lodash";

import { selectors } from "../store/selectors";

describe("Going to home page should render header bar", () => {
  it("should visit the homepage and show the app title and logo", () => {
    cy.visit("/");
    cy.get(selectors.headerLogo).should("be.visible");
    cy.get(selectors.headerTitle).should("be.visible");
    cy.get(selectors.headerSubtitle).should("be.visible");
  });
});
