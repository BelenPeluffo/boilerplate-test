#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// Get the name of the project
if (process.argv.length < 3) {
  console.log("Tenés que ponerle un nombre a la app");
  console.log("Por ejemplo");
  console.log("   yarn boilerplate-test mi-app");
  console.log("   npm boilerplate-test mi-app");
  console.log("   npx boilerplate-test mi-app");
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const GIT_REPO = "https://github.com/Boilerplate-Test/boilerplate-test.git";

// Verify that the project name doesn't already exist
try {
  fs.mkdirSync(projectPath);
} catch (error) {
  if (error.code === "EEXIST") {
    console.log(`El archivo ${projectName} ya existe en este directorio.`);
  } else {
    console.log(`Error: ${error}`);
  }
  process.exit(1);
}

// Create project
async function main() {
  try {
    console.log("Descargando archivos...");
    execSync(`git clone --depth 1 ${GIT_REPO} ${projectPath}`);
    process.chdir(projectPath);

    console.log("Instalando dependencias...");
    execSync(`cd ${projectName} && yarn`);

    console.log("Eliminando archivos sin uso...");
    execSync(`yarn rimraf ./.git`);
    fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true });

    console.log("Listo!");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

main();
