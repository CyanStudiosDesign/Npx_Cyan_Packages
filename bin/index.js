#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");
const packageJson = require("../package.json");

const program = new Command();
const cyan = "\x1b[36m";
const cyanBright = "\x1b[96m";
const whiteBright = "\x1b[97m";
const gray = "\x1b[90m";
const bold = "\x1b[1m";
const reset = "\x1b[0m";

const CONFIG_FILE = "cyan.config.json";
const REGISTRY_ROOT = path.join(__dirname, "..", "registry", "components");
const REGISTRY_LIB_ROOT = path.join(__dirname, "..", "registry", "lib");
const DEFAULT_CONFIG = {
  componentsDir: "src/components",
  uiDir: "src/components/ui",
  blocksDir: "src/components/blocks",
  providersDir: "src/components/providers",
  utilsPath: "src/lib/utils.ts",
  cssPath: "src/app/globals.css",
  alias: "@",
};

const CATEGORY_PATHS = {
  ui: {
    source: path.join(REGISTRY_ROOT, "ui"),
    targetKey: "uiDir",
  },
  blocks: {
    source: path.join(REGISTRY_ROOT, "blocks"),
    targetKey: "blocksDir",
  },
  providers: {
    source: path.join(REGISTRY_ROOT, "providers"),
    targetKey: "providersDir",
  },
};

const COMPONENT_DEPENDENCIES = {
  "ui/calendar": ["ui/dropdown-menu"],
  "ui/navigationMenu": ["ui/buttons"],
  "ui/sidebar": ["ui/provider"],
  "ui/theme": ["providers"],
  "ui/tree-view": ["ui/accordion"],
};

const COMPONENT_ALIASES = {
  button: "buttons",
  "context-menu": "contextmenu",
  "navigation-menu": "navigationMenu",
  "sidebar-provider": "provider",
  "scroll-area": "scrollArea",
  "theme-toggle": "theme",
  "toggle-chip": "toggle",
};

const COMPONENT_PUBLIC_NAMES = Object.fromEntries(
  Object.entries(COMPONENT_ALIASES).map(([publicName, registryName]) => [
    registryName,
    publicName,
  ])
);

const IGNORED_PACKAGES = new Set([
  "react",
  "react-dom",
  "next",
  "next/image",
  "next/link",
  "next/navigation",
  "next/font/google",
]);

program
  .name("cyan-ui")
  .description("Cyan UI Component CLI")
  .version(packageJson.version)
  .addHelpText(
    "before",
    getHelpBanner()
  )
  .addHelpText(
    "after",
    `
${bold}${whiteBright}Start here${reset}
  ${cyanBright}$ cyan init${reset}                   ${gray}Create cyan.config.json${reset}
  ${cyanBright}$ cyan list${reset}                   ${gray}See every available component${reset}
  ${cyanBright}$ cyan list ui${reset}                ${gray}See only UI components${reset}
  ${cyanBright}$ cyan add accordion${reset}          ${gray}Copy one component${reset}
  ${cyanBright}$ cyan add ui${reset}                 ${gray}Copy only UI components${reset}
  ${cyanBright}$ cyan add components${reset}         ${gray}Copy everything${reset}

${bold}${whiteBright}NPX usage${reset}
  ${cyanBright}$ npx cyan-ui-library init${reset}
  ${cyanBright}$ npx cyan-ui-library list${reset}
  ${cyanBright}$ npx cyan-ui-library add accordion${reset}
`
  );

program
  .command("init")
  .alias("create")
  .description("Create a Cyan UI config file in this project")
  .option("-f, --force", "Overwrite existing config")
  .action((options) => {
    const root = process.cwd();
    const configPath = path.join(root, CONFIG_FILE);

    if (fs.existsSync(configPath) && !options.force) {
      console.log(`\n${CONFIG_FILE} already exists. Use --force to overwrite.\n`);
      return;
    }

    fs.writeJsonSync(configPath, DEFAULT_CONFIG, { spaces: 2 });
    console.log(`\nCreated ${CONFIG_FILE}.\n`);
    ensureAliasConfig(root, DEFAULT_CONFIG);
  });

program
  .command("add <name>")
  .description("Add one component, a category, or all components")
  .option("-f, --force", "Overwrite existing files")
  .option("--no-install", "Copy files without installing dependencies")
  .action((name, options) => {
    try {
      const root = process.cwd();
      const config = readConfig(root);
      const additions = includeComponentDependencies(resolveAdditions(name));

      if (additions.length === 0) {
        console.log(`\nComponent or group "${name}" was not found.\n`);
        printAvailable();
        return;
      }

      const dependencySet = new Set();
      let copiedCount = 0;
      let skippedCount = 0;
      const needsUtils = additions.some((addition) => componentUsesUtils(addition.source));

      ensureUtilsIfNeeded(root, config, needsUtils, dependencySet, options);

      if (needsUtils) {
        ensureAliasConfig(root, config);
      }

      for (const addition of additions) {
        const result = copyAddition(root, config, addition, options.force);
        copiedCount += result.copied ? 1 : 0;
        skippedCount += result.skipped ? 1 : 0;

        collectDependencies(addition.source, dependencySet);
      }

      if (options.install) {
        installMissingDependencies(root, Array.from(dependencySet));
      }

      console.log(
        `\nDone. Added ${copiedCount} item${copiedCount === 1 ? "" : "s"}${
          skippedCount ? `, skipped ${skippedCount}` : ""
        }.\n`
      );
    } catch (error) {
      console.error("\nError:", error.message, "\n");
      process.exitCode = 1;
    }
  });

program
  .command("list [category]")
  .alias("ls")
  .description("List available components and groups")
  .action((category) => {
    const normalizedCategory = category ? category.toLowerCase() : null;

    if (normalizedCategory && !CATEGORY_PATHS[normalizedCategory]) {
      console.log(`\nCategory "${category}" was not found.\n`);
      printCategories();
      return;
    }

    printLibraryIntro();

    if (normalizedCategory) {
      printCategory(normalizedCategory);
      return;
    }

    printCategory("ui");
    printCategory("blocks");
    printCategory("providers");

    console.log("Install examples:");
    console.log("  cyan-ui add accordion");
    console.log("  cyan-ui add ui");
    console.log("  cyan-ui add components");
    console.log("");
  });

program.parse(process.argv);

function getHelpBanner() {
  return makeBox([
    "",
    `${cyanBright}${bold}  ██████╗██╗   ██╗ █████╗ ███╗   ██╗    ██╗   ██╗██╗${reset}`,
    `${cyanBright}${bold} ██╔════╝╚██╗ ██╔╝██╔══██╗████╗  ██║    ██║   ██║██║${reset}`,
    `${cyanBright}${bold} ██║      ╚████╔╝ ███████║██╔██╗ ██║    ██║   ██║██║${reset}`,
    `${cyanBright}${bold} ██║       ╚██╔╝  ██╔══██║██║╚██╗██║    ██║   ██║██║${reset}`,
    `${cyanBright}${bold} ╚██████╗   ██║   ██║  ██║██║ ╚████║    ╚██████╔╝██║${reset}`,
    `${cyanBright}${bold}  ╚═════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝     ╚═════╝ ╚═╝${reset}`,
    "",
    `${whiteBright}${bold}Welcome to cyan-ui-library${reset}`,
    `${gray}Pre-built React and Next.js components, copied into your project.${reset}`,
    `${gray}Discover components, create config, and install source files fast.${reset}`,
    "",
  ]);
}

function makeBox(lines) {
  const width = 76;
  const top = `${cyan}╭${"─".repeat(width)}╮${reset}`;
  const bottom = `${cyan}╰${"─".repeat(width)}╯${reset}`;
  const body = lines.map((line) => {
    const padding = Math.max(width - stripAnsi(line).length - 2, 0);
    return `${cyan}│${reset} ${line}${" ".repeat(padding)} ${cyan}│${reset}`;
  });

  return `\n${top}\n${body.join("\n")}\n${bottom}\n`;
}

function stripAnsi(value) {
  return value.replace(/\x1b\[[0-9;]*m/g, "");
}

function readConfig(root) {
  const configPath = path.join(root, CONFIG_FILE);

  if (!fs.existsSync(configPath)) {
    return DEFAULT_CONFIG;
  }

  return {
    ...DEFAULT_CONFIG,
    ...fs.readJsonSync(configPath),
  };
}

function resolveAdditions(name) {
  const normalizedName = name.toLowerCase();
  const componentName = COMPONENT_ALIASES[normalizedName] || name;

  if (normalizedName === "all" || normalizedName === "components") {
    return [
      ...listCategoryAdditions("ui"),
      ...listCategoryAdditions("blocks"),
      categoryAddition("providers"),
    ].filter(Boolean);
  }

  if (CATEGORY_PATHS[normalizedName]) {
    return normalizedName === "providers"
      ? [categoryAddition(normalizedName)].filter(Boolean)
      : listCategoryAdditions(normalizedName);
  }

  for (const category of Object.keys(CATEGORY_PATHS)) {
    const source = path.join(CATEGORY_PATHS[category].source, componentName);

    if (fs.existsSync(source)) {
      return [
        {
          category,
          name: componentName,
          source,
          targetName: componentName,
        },
      ];
    }
  }

  return [];
}

function includeComponentDependencies(additions) {
  const resolved = [];
  const seen = new Set();

  function addWithDependencies(addition) {
    const key = `${addition.category}/${addition.name}`;

    if (seen.has(key)) {
      return;
    }

    seen.add(key);

    for (const dependencyKey of COMPONENT_DEPENDENCIES[key] || []) {
      if (dependencyKey === "providers") {
        const providers = categoryAddition("providers");

        if (providers) {
          addWithDependencies(providers);
        }

        continue;
      }

      const [category, name] = dependencyKey.split("/");
      const categoryInfo = CATEGORY_PATHS[category];
      const source = categoryInfo && path.join(categoryInfo.source, name);

      if (categoryInfo && fs.existsSync(source)) {
        addWithDependencies({
          category,
          name,
          source,
          targetName: name,
        });
      }
    }

    resolved.push(addition);
  }

  additions.forEach(addWithDependencies);
  return resolved;
}

function listCategoryAdditions(category) {
  const categoryInfo = CATEGORY_PATHS[category];

  if (!fs.existsSync(categoryInfo.source)) {
    return [];
  }

  return fs
    .readdirSync(categoryInfo.source)
    .filter((entry) => {
      const source = path.join(categoryInfo.source, entry);
      return fs.statSync(source).isDirectory();
    })
    .map((entry) => ({
      category,
      name: entry,
      source: path.join(categoryInfo.source, entry),
      targetName: entry,
    }));
}

function categoryAddition(category) {
  const categoryInfo = CATEGORY_PATHS[category];

  if (!categoryInfo || !fs.existsSync(categoryInfo.source)) {
    return null;
  }

  return {
    category,
    name: category,
    source: categoryInfo.source,
    targetName: "",
  };
}

function copyAddition(root, config, addition, force) {
  const categoryInfo = CATEGORY_PATHS[addition.category];
  const targetBase = path.join(root, config[categoryInfo.targetKey]);
  const target = addition.targetName
    ? path.join(targetBase, addition.targetName)
    : targetBase;

  if (fs.existsSync(target) && !force) {
    console.log(`Skipped ${addition.name}; already exists. Use --force to overwrite.`);
    return { copied: false, skipped: true };
  }

  fs.copySync(addition.source, target, {
    overwrite: Boolean(force),
    errorOnExist: !force,
    filter: (source) => !source.endsWith(".DS_Store"),
  });

  console.log(`Added ${addition.name} -> ${path.relative(root, target)}`);
  return { copied: true, skipped: false };
}

function ensureUtilsIfNeeded(root, config, needsUtils, dependencySet, options) {
  if (!needsUtils) {
    return;
  }

  dependencySet.add("clsx");
  dependencySet.add("tailwind-merge");

  const source = path.join(REGISTRY_LIB_ROOT, "utils.ts");
  const target = path.join(root, config.utilsPath);

  if (!fs.existsSync(source)) {
    console.log("Warning: registry/lib/utils.ts is missing, so utils was not copied.");
    return;
  }

  if (fs.existsSync(target) && !options.force) {
    console.log(`Skipped utils; ${config.utilsPath} already exists.`);
    return;
  }

  fs.copySync(source, target, { overwrite: Boolean(options.force) });
  console.log(`Added utils -> ${config.utilsPath}`);
}

function ensureAliasConfig(root, config) {
  const alias = config.alias || "@";

  if (alias !== "@") {
    console.log(`Skipped alias config; custom alias "${alias}" is not auto-managed yet.`);
    return;
  }

  const configFile = findTypeScriptConfig(root);
  const configPath = path.join(root, configFile);
  const aliasTarget = getAliasTarget(config.utilsPath);
  let tsConfig = {};

  if (fs.existsSync(configPath)) {
    tsConfig = fs.readJsonSync(configPath);
  }

  tsConfig.compilerOptions = tsConfig.compilerOptions || {};
  tsConfig.compilerOptions.baseUrl = tsConfig.compilerOptions.baseUrl || ".";
  tsConfig.compilerOptions.paths = tsConfig.compilerOptions.paths || {};

  const currentPath = tsConfig.compilerOptions.paths["@/*"];

  if (Array.isArray(currentPath) && currentPath.includes(aliasTarget)) {
    console.log(`Alias already configured in ${configFile}.`);
    return;
  }

  tsConfig.compilerOptions.paths["@/*"] = [aliasTarget];
  fs.writeJsonSync(configPath, tsConfig, { spaces: 2 });
  console.log(`Configured @/* alias in ${configFile} -> ${aliasTarget}`);
}

function findTypeScriptConfig(root) {
  if (fs.existsSync(path.join(root, "tsconfig.json"))) {
    return "tsconfig.json";
  }

  if (fs.existsSync(path.join(root, "jsconfig.json"))) {
    return "jsconfig.json";
  }

  return "tsconfig.json";
}

function getAliasTarget(utilsPath) {
  return utilsPath.startsWith("src/") ? "./src/*" : "./*";
}

function componentUsesUtils(sourcePath) {
  return listCodeFiles(sourcePath).some((file) => {
    const content = fs.readFileSync(file, "utf8");
    return content.includes("@/lib/utils") || content.includes("from \"../lib/utils\"");
  });
}

function collectDependencies(sourcePath, dependencySet) {
  for (const file of listCodeFiles(sourcePath)) {
    const content = fs.readFileSync(file, "utf8");
    const importRegex = /(?:from\s+["']([^"']+)["']|import\s+["']([^"']+)["']|require\(["']([^"']+)["']\))/g;
    let match;

    while ((match = importRegex.exec(content))) {
      const specifier = match[1] || match[2] || match[3];
      const packageName = getPackageName(specifier);

      if (packageName) {
        dependencySet.add(packageName);
      }
    }
  }
}

function listCodeFiles(sourcePath) {
  if (!fs.existsSync(sourcePath)) {
    return [];
  }

  const stat = fs.statSync(sourcePath);

  if (stat.isFile()) {
    return isCodeFile(sourcePath) ? [sourcePath] : [];
  }

  return fs.readdirSync(sourcePath).flatMap((entry) => {
    const entryPath = path.join(sourcePath, entry);

    if (entry === "node_modules" || entry === ".git" || entry === ".DS_Store") {
      return [];
    }

    return listCodeFiles(entryPath);
  });
}

function isCodeFile(filePath) {
  return [".js", ".jsx", ".ts", ".tsx"].includes(path.extname(filePath));
}

function getPackageName(specifier) {
  if (
    !specifier ||
    specifier.startsWith(".") ||
    specifier.startsWith("@/") ||
    specifier.startsWith("~/")
  ) {
    return null;
  }

  if (IGNORED_PACKAGES.has(specifier)) {
    return null;
  }

  if (specifier.startsWith("@")) {
    const [scope, name] = specifier.split("/");
    return name ? `${scope}/${name}` : null;
  }

  return specifier.split("/")[0];
}

function installMissingDependencies(root, dependencies) {
  const uniqueDependencies = Array.from(new Set(dependencies)).filter(Boolean);

  if (uniqueDependencies.length === 0) {
    return;
  }

  const packageJsonPath = path.join(root, "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    console.log("Skipped dependency install; package.json was not found.");
    return;
  }

  const packageJson = fs.readJsonSync(packageJsonPath);
  const installed = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
    ...packageJson.peerDependencies,
  };
  const missing = uniqueDependencies.filter((dependency) => !installed[dependency]);

  if (missing.length === 0) {
    console.log("Dependencies already installed.");
    return;
  }

  const packageManager = detectPackageManager(root);
  const command = getInstallCommand(packageManager, missing);

  console.log(`Installing dependencies: ${missing.join(", ")}`);
  execSync(command, {
    cwd: root,
    stdio: "inherit",
  });
}

function detectPackageManager(root) {
  if (fs.existsSync(path.join(root, "pnpm-lock.yaml"))) {
    return "pnpm";
  }

  if (fs.existsSync(path.join(root, "yarn.lock"))) {
    return "yarn";
  }

  if (fs.existsSync(path.join(root, "bun.lockb")) || fs.existsSync(path.join(root, "bun.lock"))) {
    return "bun";
  }

  return "npm";
}

function getInstallCommand(packageManager, dependencies) {
  const dependencyList = dependencies.join(" ");

  if (packageManager === "pnpm") {
    return `pnpm add ${dependencyList}`;
  }

  if (packageManager === "yarn") {
    return `yarn add ${dependencyList}`;
  }

  if (packageManager === "bun") {
    return `bun add ${dependencyList}`;
  }

  return `npm install ${dependencyList}`;
}

function printAvailable() {
  const available = Object.keys(CATEGORY_PATHS)
    .flatMap((category) =>
      listCategoryAdditions(category).map(
        (addition) => `${category}/${getPublicComponentName(addition.name)}`
      )
    )
    .join("\n  ");

  if (available) {
    console.log(`Available:\n  ${available}\n`);
  }
}

function printLibraryIntro() {
  console.log("");
  console.log("Cyan UI Library");
  console.log("Pre-built React and Next.js components you can copy into your app.");
  console.log("");
}

function printCategory(category) {
  const additions = listCategoryAdditions(category);

  if (category === "providers" && additions.length === 0 && fs.existsSync(CATEGORY_PATHS.providers.source)) {
    console.log("Providers");
    console.log("  providers");
    console.log("");
    return;
  }

  if (additions.length === 0) {
    console.log(`${formatCategoryTitle(category)}`);
    console.log("  No items found.");
    console.log("");
    return;
  }

  console.log(`${formatCategoryTitle(category)} (${additions.length})`);

  for (const addition of additions) {
    console.log(`  ${getPublicComponentName(addition.name)}`);
  }

  console.log("");
}

function printCategories() {
  console.log("Available categories:");

  for (const category of Object.keys(CATEGORY_PATHS)) {
    console.log(`  ${category}`);
  }

  console.log("");
}

function formatCategoryTitle(category) {
  if (category === "ui") {
    return "UI Components";
  }

  if (category === "blocks") {
    return "Page Blocks";
  }

  if (category === "providers") {
    return "Providers";
  }

  return category;
}

function getPublicComponentName(name) {
  return COMPONENT_PUBLIC_NAMES[name] || name;
}
