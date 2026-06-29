import { cdk, javascript, TextFile } from "projen";

const nodeVersion = ">=20.9.0";
const workflowNodeVersion = "20.9.0";

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
project.package.addField("packageManager", "pnpm@9.9.0"); // silence COREPACK_ENABLE_AUTO_PIN warning
project.package.addEngine("node", nodeVersion);
new TextFile(project, ".nvmrc", {
  lines: [workflowNodeVersion],
});
project.synth();
