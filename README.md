# cdk-dynamo-table-viewer

Original AWS CDK Construct: [cdklabs/cdk-dynamo-table-viewer#](https://github.com/cdklabs/cdk-dynamo-table-viewer#)

An AWS TerraConstruct which exposes a public HTTP endpoint to display an HTML
page with the contents of a DynamoDB table in your stack.

__SECURITY NOTE__: this construct was built for demonstration purposes and
using it in production is probably a really bad idea. It exposes the entire
contents of a DynamoDB table in your account to the general public.

The library is published under the following names:

|Language|Repository
|--------|-----------
|JavaScript/TypeScript|[cdk-dynamo-table-viewer](https://www.npmjs.com/package/@tcons/cdk-dynamo-table-viewer)

## Usage (TypeScript/JavaScript)

Install via npm:

```shell
$ npm i @tcons/cdk-dynamo-table-viewer
```

Add to your CDK stack:

```ts
declare const cookiesTable: dynamodb.Table;

const viewer = new TableViewer(this, 'CookiesViewer', {
  table: cookiesTable,
  title: 'Cookie Sales', // optional
  sortBy: '-sales'       // optional ("-" denotes descending order)
});
```

Notes:

- The endpoint will be available (as a deploy-time value) under `viewer.endpoint`.
  It will also be exported as a stack output.
- Paging is not supported. This means that only the first 1MB of items will be
  displayed (again, this is a demo...)
- Supports TerraConstructs version 0.0.26 and above

## License

Apache 2.0
