import * as path from "path";
import { Construct } from "constructs";
import {
  Code,
  Runtime,
  EndpointType,
  LambdaRestApi,
  LambdaFunction,
} from "terraconstructs/lib/aws/compute";
import { ITable } from "terraconstructs/lib/aws/storage";

export interface TableViewerProps {
  /**
   * The endpoint type of the
   * [LambdaRestApi](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-apigateway.LambdaRestApi.html)
   * that will be created
   * @default - EDGE
   */
  readonly endpointType?: EndpointType;

  /**
   * The DynamoDB table to view. Note that all contents of this table will be
   * visible to the public.
   */
  readonly table: ITable;

  /**
   * The web page title.
   * @default - No title
   */
  readonly title?: string;

  /**
   * Name of the column to sort by, prefix with "-" for descending order.
   * @default - No sort
   */
  readonly sortBy?: string;

  /**
   * Whether to register the API Gateaway outputs in the stack.
   * @default true
   */
  readonly registerOutputs?: boolean;
}

/**
 * Installs an endpoint in your stack that allows users to view the contents
 * of a DynamoDB table through their browser.
 */
export class TableViewer extends Construct {
  public readonly endpoint: string;

  constructor(parent: Construct, id: string, props: TableViewerProps) {
    super(parent, id);

    const handler = new LambdaFunction(this, "Rendered", {
      code: Code.fromAsset(path.join(__dirname, "..", "lambda")),
      runtime: Runtime.NODEJS_18_X,
      handler: "index.handler",
      environment: {
        TABLE_NAME: props.table.tableName,
        TITLE: props.title || "",
        SORT_BY: props.sortBy || "",
      },
    });

    props.table.grantReadData(handler);

    const home = new LambdaRestApi(this, "ViewerEndpoint", {
      handler,
      endpointConfiguration: props.endpointType
        ? { types: [props.endpointType] }
        : undefined,
      registerOutputs: props.registerOutputs ?? true,
    });
    this.endpoint = home.url;
  }
}
