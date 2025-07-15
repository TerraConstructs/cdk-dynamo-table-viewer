import { App } from "cdktf";
import { Construct } from "constructs";
import { AwsStackProps, AwsStack } from "terraconstructs/lib/aws";

import * as storage from "terraconstructs/lib/aws/storage";
import { TableViewer } from "../../src";

class MyStack extends AwsStack {
  constructor(scope: Construct, id: string, props: AwsStackProps) {
    super(scope, id, props);

    const table = new storage.Table(this, "my-table", {
      partitionKey: {
        name: "id",
        type: storage.AttributeType.STRING,
      },
    });

    new TableViewer(this, "viewer", {
      table,
    });
  }
}

const app = new App();
new MyStack(app, "my-stack", {
  environmentName: "test",
  gridUUID: "test-uuid",
  providerConfig: { region: "us-east-1" },
});
app.synth();
