import fsExtra from "fs-extra";

const { readJsonSync, writeJsonSync } = fsExtra;

const updateJsonSync = (file, updater) =>
  writeJsonSync(file, updater(readJsonSync(file)), { spaces: 2 });

["browser", "node"].forEach(target => {
  writeJsonSync(
    `${target}/package.json`,
    {
      name: `@${process.env.npm_package_name}/${target}`,
      version: process.env.npm_package_version,
      main: "cjs",
      module: "es"
    },
    { spaces: 2 }
  );
});

["todoapp/package.json", "todoapp/package-lock.json"].forEach(file =>
  updateJsonSync(file, value => ({
    ...value,
    version: process.env.npm_package_version
  }))
);
