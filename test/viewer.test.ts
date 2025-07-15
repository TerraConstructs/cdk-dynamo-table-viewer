import * as path from "node:path";
import { ApiGatewayAccount } from "@cdktf/provider-aws/lib/api-gateway-account";
import { ApiGatewayDeployment } from "@cdktf/provider-aws/lib/api-gateway-deployment";
import { ApiGatewayIntegration } from "@cdktf/provider-aws/lib/api-gateway-integration";
import { ApiGatewayMethod } from "@cdktf/provider-aws/lib/api-gateway-method";
import { ApiGatewayResource } from "@cdktf/provider-aws/lib/api-gateway-resource";
import { ApiGatewayRestApi } from "@cdktf/provider-aws/lib/api-gateway-rest-api";
import { ApiGatewayStage } from "@cdktf/provider-aws/lib/api-gateway-stage";
import { DataAwsIamPolicyDocument } from "@cdktf/provider-aws/lib/data-aws-iam-policy-document";
import { DynamodbTable } from "@cdktf/provider-aws/lib/dynamodb-table";
import { IamRole } from "@cdktf/provider-aws/lib/iam-role";
import { LambdaFunction } from "@cdktf/provider-aws/lib/lambda-function";
import { LambdaPermission } from "@cdktf/provider-aws/lib/lambda-permission";
import { App, Testing } from "cdktf";
import "cdktf/lib/testing/adapters/jest";
import { AwsStack } from "terraconstructs/lib/aws/aws-stack";
import * as storage from "terraconstructs/lib/aws/storage";
import * as assertions from "./assertions";
import { TableViewer } from "../src";

const defaultAwsStackProps = {
  environmentName: "test",
  gridUUID: "test-uuid",
  providerConfig: { region: "us-east-1" },
  gridBackendConfig: {
    address: "http://localhost:3000",
  },
};

const TEST_OUTDIR = path.join(__dirname, "cdk.out");
const TEST_APPDIR = path.join(__dirname, "snapshots");
const CDKTFJSON_PATH = path.join(TEST_APPDIR, "cdktf.json");

test("happy  flow", () => {
  // GIVEN
  const app = Testing.stubVersion(
    new App({
      outdir: TEST_OUTDIR,
      stackTraces: false,
      context: {
        cdktfJsonPath: path.resolve(__dirname, CDKTFJSON_PATH),
      },
    }),
  );
  const stack = new AwsStack(app, "test", defaultAwsStackProps);
  const table = new storage.Table(stack, "MyTable", {
    partitionKey: { name: "id", type: storage.AttributeType.STRING },
  });

  // WHEN
  new TableViewer(stack, "viewer", { table });

  // THEN
  // keeping { snapshot: true } so that we can compare changes for v2 upgrade
  const template = new assertions.Template(stack, { snapshot: true });

  template.expect.toHaveResourceWithProperties(LambdaFunction, {
    handler: "index.handler",
    environment: {
      variables: {
        SORT_BY: "",
        TABLE_NAME: "${aws_dynamodb_table.MyTable_794EDED1.name}",
        TITLE: "",
      },
    },
    runtime: "nodejs18.x",
  });
  template.expect.toHaveResourceWithProperties(ApiGatewayRestApi, {
    name: "testviewerViewerEndpointDCCECA7F",
  });
  template.expect.toHaveResourceWithProperties(ApiGatewayStage, {
    stage_name: "prod",
  });
  template.expect.toHaveResourceWithProperties(ApiGatewayResource, {
    path_part: "{proxy+}",
  });

  template.resourceCountIs(ApiGatewayMethod, 2);
  template.expect.toHaveResourceWithProperties(ApiGatewayMethod, {
    http_method: "ANY",
  });
  template.expect.toHaveResourceWithProperties(ApiGatewayIntegration, {
    integration_http_method: "POST",
    type: "AWS_PROXY",
  });
  template.expect.toHaveDataSourceWithProperties(DataAwsIamPolicyDocument, {
    statement: expect.arrayContaining([
      {
        actions: [
          "dynamodb:BatchGetItem",
          "dynamodb:Query",
          "dynamodb:GetItem",
          "dynamodb:Scan",
          "dynamodb:ConditionCheckItem",
          "dynamodb:DescribeTable",
        ],
        effect: "Allow",
        resources: expect.arrayContaining([stack.resolve(table.tableArn)]),
      },
    ]),
  });
  template.resourceCountIs(DynamodbTable, 1);
  template.resourceCountIs(ApiGatewayAccount, 1);
  template.resourceCountIs(ApiGatewayDeployment, 1);
  template.resourceCountIs(IamRole, 2);
  template.resourceCountIs(LambdaPermission, 4);
  const viewerEndpointOutputs = template.outputByName("ViewerEndpointOutputs");
  expect(viewerEndpointOutputs).toBeDefined();
});
