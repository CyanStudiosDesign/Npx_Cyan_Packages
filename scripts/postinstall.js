#!/usr/bin/env node

const cyan = "\x1b[36m";
const cyanBright = "\x1b[96m";
const whiteBright = "\x1b[97m";
const gray = "\x1b[90m";
const bold = "\x1b[1m";
const reset = "\x1b[0m";

const width = 76;

printBox([
  `${bold}${cyanBright}CYAN UI LIBRARY${reset}`,
  "",
  `${whiteBright}Pre-built React and Next.js components, copied into your app.${reset}`,
  `${gray}Install one component, a full group, or the whole component registry.${reset}`,
  "",
  `${bold}${whiteBright}Start here${reset}`,
  `${cyanBright}cyan --help${reset}                 ${gray}Show all commands${reset}`,
  `${cyanBright}cyan list${reset}                   ${gray}See available components${reset}`,
  `${cyanBright}cyan init${reset}                   ${gray}Create cyan.config.json${reset}`,
  `${cyanBright}cyan add accordion${reset}          ${gray}Add one component${reset}`,
  `${cyanBright}cyan add ui${reset}                 ${gray}Add only UI components${reset}`,
  `${cyanBright}cyan add components${reset}         ${gray}Add everything${reset}`,
  "",
  `${bold}${whiteBright}NPX usage${reset}`,
  `${cyanBright}npx cyan-ui-library list${reset}`,
  `${cyanBright}npx cyan-ui-library add accordion${reset}`,
  "",
  `${gray}Shortcuts available after global install: cyan, cyan-ui, cyan-ui-library.${reset}`,
]);

function printBox(lines) {
  const top = `${cyan}╭${"─".repeat(width)}╮${reset}`;
  const bottom = `${cyan}╰${"─".repeat(width)}╯${reset}`;

  console.log("");
  console.log(top);

  for (const line of lines) {
    console.log(`${cyan}│${reset} ${padAnsi(line, width - 2)} ${cyan}│${reset}`);
  }

  console.log(bottom);
  console.log("");
}

function padAnsi(value, targetWidth) {
  const visibleLength = stripAnsi(value).length;
  const padding = Math.max(targetWidth - visibleLength, 0);
  return `${value}${" ".repeat(padding)}`;
}

function stripAnsi(value) {
  return value.replace(/\x1b\[[0-9;]*m/g, "");
}
