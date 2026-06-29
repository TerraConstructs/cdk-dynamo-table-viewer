import { cdk, javascript, TextFile } from "projen";

const nodeVersion = ">=20.9.0";
// Node 20 is EOL; use the current Active LTS (Krypton). Node 24 also ships
// npm >= 11.5.1, which is required for npm trusted publishing (OIDC) below.
const workflowNodeVersion = "24.18.0";

const project = new cdk.JsiiProject({
  name: "@tcons/cdk-dynamo-table-viewer",
  description:
    "An AWS TerraConstruct which exposes an endpoint with the contents of a DynamoDB table",
  npmAccess: javascript.NpmAccess.PUBLIC,
  author: "Vincent De Smet", // original is "Amazon Web Services"
  authorAddress: "vincent.drl@gmail.com", // original is "aws-cdk-dev@amazon.dev"
  repositoryUrl:
    "https://github.com/TerraConstructs/cdk-dynamo-table-viewer.git",
  keywords: ["terraconstructs"],
  defaultReleaseBranch: "main",
  typescriptVersion: "~5.9",
  jsiiVersion: "~5.9",
  packageManager: javascript.NodePackageManager.PNPM,
  pnpmVersion: "9",
  projenrcTs: true,
  prettier: true,
  eslint: true,
  tsconfig: {
    compilerOptions: {
      target: "es2022",
      lib: ["es2022"],
    },
  },
  // release config
  release: true,
  releaseToNpm: true,
  // Publish to npm via OIDC trusted publishing instead of a long-lived NPM_TOKEN.
  // Requires a trusted publisher configured on npmjs.com for this package
  // (repo: TerraConstructs/cdk-dynamo-table-viewer, workflow: release.yml) and
  // npm CLI >= 11.5.1 (provided by the Node 24 workflow runtime above).
  npmTrustedPublishing: true,

  devDeps: [
    "cdktn@^0.23.0",
    "@cdktn/provider-aws@^24.8.0",
    "constructs@^10.6.0",
    "@aws-sdk/client-dynamodb",
  ],
  // cdktn construct lib config
  peerDeps: [
    "cdktn@^0.23.0",
    "@cdktn/provider-aws@^24.8.0",
    "constructs@^10.6.0",
    "terraconstructs@^0.2.6",
  ],
  workflowNodeVersion,
  jestOptions: {
    jestConfig: {
      setupFilesAfterEnv: ["<rootDir>/setup.js"],
      // Jest is resource greedy so this shouldn't be more than 50%
      maxWorkers: "50%",
      testEnvironment: "node",
    },
  },
  licensed: true,
  license: "Apache-2.0",
  pullRequestTemplateContents: [
    "By submitting this pull request, I confirm that my contribution is made under the terms of the Apache 2.0 license.",
  ],
  // disable autoMerge for now
  autoMerge: false,
});

// Temp disable coverage for faster test runs
project.testTask.updateStep(0, {
  exec: "jest --passWithNoTests --updateSnapshot --coverage=false",
  receiveArgs: true,
});
// projen unconditionally writes a "packageManager" field to package.json AND
// renders pnpm/action-setup@v5 with a "version" input in the workflows. As of
// action-setup@v5 that combination is a hard error ("Multiple versions of pnpm
// specified"). Drop the "packageManager" field so the workflows can keep pinning
// pnpm via the action "version" input; pnpm stays pinned for local tooling via
// the "devEngines" field that projen also emits.
const packageJson = project.tryFindObjectFile("package.json");
packageJson?.addDeletionOverride("packageManager");

// projen 0.100.x invokes commit-and-tag-version via `npx commit-and-tag-version@^12`
// (through dax), which fails on the GitHub release runner with exit code 127. When
// BUMP_PACKAGE is empty, projen instead resolves the locally-installed CLI and runs
// it via node directly (shell-free), which works reliably under pnpm. The package
// stays a devDependency, so the local resolution always succeeds.
for (const taskName of ["bump", "unbump"]) {
  project.tasks.tryFind(taskName)?.env("BUMP_PACKAGE", "");
}

project.package.addEngine("node", nodeVersion);
new TextFile(project, ".nvmrc", {
  lines: [workflowNodeVersion],
});
project.synth();
