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
  typescriptVersion: "~5.7",
  jsiiVersion: "~5.7",
  packageManager: javascript.NodePackageManager.PNPM,
  pnpmVersion: "9",
  projenrcTs: true,
  prettier: true,
  eslint: true,
  tsconfig: {
    compilerOptions: {
      target: "ES2020",
      lib: ["es2020"],
    },
  },
  // release config
  release: true,
  releaseToNpm: true,

  devDeps: [
    "cdktf@^0.21.0",
    "@cdktf/provider-aws@^20.1.0",
    "constructs@^10.4.2",
    "@aws-sdk/client-dynamodb",
  ],
  // cdktf construct lib config
  peerDeps: [
    "cdktf@^0.21.0",
    "@cdktf/provider-aws@^20.1.0",
    "constructs@^10.4.2",
    "terraconstructs@^0.1.0",
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
