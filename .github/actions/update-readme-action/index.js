const fs = require("fs");
const core = require("@actions/core");

try {
  const outcome = core.getInput("outcome");
  const badge =
    outcome === "success"
      ? "![Tests passed](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)"
      : "![Tests failed](https://img.shields.io/badge/test-failure-red)";

  const readmePath = "README.md";
  let readmeContent = fs.readFileSync(readmePath, "utf-8");

  // Actualitza o afegeix el badge al final del README
  const marker = "RESULTAT DELS ÚLTIMS TESTS";
  const regex = new RegExp(`(${marker}\\n)(.*)`, "s");
  if (regex.test(readmeContent)) {
    readmeContent = readmeContent.replace(regex, `$1${badge}`);
  } else {
    readmeContent += `\n\n${marker}\n${badge}`;
  }

  fs.writeFileSync(readmePath, readmeContent);
  core.info("README actualitzat correctament!");
} catch (error) {
  core.setFailed(`Error actualitzant el README: ${error.message}`);
}
