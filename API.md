# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### TableViewer <a name="TableViewer" id="@tcons/cdk-dynamo-table-viewer.TableViewer"></a>

Installs an endpoint in your stack that allows users to view the contents of a DynamoDB table through their browser.

#### Initializers <a name="Initializers" id="@tcons/cdk-dynamo-table-viewer.TableViewer.Initializer"></a>

```typescript
import { TableViewer } from '@tcons/cdk-dynamo-table-viewer'

new TableViewer(parent: Construct, id: string, props: TableViewerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tcons/cdk-dynamo-table-viewer.TableViewer.Initializer.parameter.parent">parent</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@tcons/cdk-dynamo-table-viewer.TableViewer.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tcons/cdk-dynamo-table-viewer.TableViewer.Initializer.parameter.props">props</a></code> | <code><a href="#@tcons/cdk-dynamo-table-viewer.TableViewerProps">TableViewerProps</a></code> | *No description.* |

---

##### `parent`<sup>Required</sup> <a name="parent" id="@tcons/cdk-dynamo-table-viewer.TableViewer.Initializer.parameter.parent"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@tcons/cdk-dynamo-table-viewer.TableViewer.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tcons/cdk-dynamo-table-viewer.TableViewer.Initializer.parameter.props"></a>

- *Type:* <a href="#@tcons/cdk-dynamo-table-viewer.TableViewerProps">TableViewerProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tcons/cdk-dynamo-table-viewer.TableViewer.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@tcons/cdk-dynamo-table-viewer.TableViewer.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tcons/cdk-dynamo-table-viewer.TableViewer.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@tcons/cdk-dynamo-table-viewer.TableViewer.isConstruct"></a>

```typescript
import { TableViewer } from '@tcons/cdk-dynamo-table-viewer'

TableViewer.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@tcons/cdk-dynamo-table-viewer.TableViewer.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tcons/cdk-dynamo-table-viewer.TableViewer.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tcons/cdk-dynamo-table-viewer.TableViewer.property.endpoint">endpoint</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@tcons/cdk-dynamo-table-viewer.TableViewer.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `endpoint`<sup>Required</sup> <a name="endpoint" id="@tcons/cdk-dynamo-table-viewer.TableViewer.property.endpoint"></a>

```typescript
public readonly endpoint: string;
```

- *Type:* string

---


## Structs <a name="Structs" id="Structs"></a>

### TableViewerProps <a name="TableViewerProps" id="@tcons/cdk-dynamo-table-viewer.TableViewerProps"></a>

#### Initializer <a name="Initializer" id="@tcons/cdk-dynamo-table-viewer.TableViewerProps.Initializer"></a>

```typescript
import { TableViewerProps } from '@tcons/cdk-dynamo-table-viewer'

const tableViewerProps: TableViewerProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tcons/cdk-dynamo-table-viewer.TableViewerProps.property.table">table</a></code> | <code>terraconstructs.aws.storage.ITable</code> | The DynamoDB table to view. |
| <code><a href="#@tcons/cdk-dynamo-table-viewer.TableViewerProps.property.endpointType">endpointType</a></code> | <code>terraconstructs.aws.compute.EndpointType</code> | The endpoint type of the [LambdaRestApi](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-apigateway.LambdaRestApi.html) that will be created. |
| <code><a href="#@tcons/cdk-dynamo-table-viewer.TableViewerProps.property.registerOutputs">registerOutputs</a></code> | <code>boolean</code> | Whether to register the API Gateaway outputs in the stack. |
| <code><a href="#@tcons/cdk-dynamo-table-viewer.TableViewerProps.property.sortBy">sortBy</a></code> | <code>string</code> | Name of the column to sort by, prefix with "-" for descending order. |
| <code><a href="#@tcons/cdk-dynamo-table-viewer.TableViewerProps.property.title">title</a></code> | <code>string</code> | The web page title. |

---

##### `table`<sup>Required</sup> <a name="table" id="@tcons/cdk-dynamo-table-viewer.TableViewerProps.property.table"></a>

```typescript
public readonly table: ITable;
```

- *Type:* terraconstructs.aws.storage.ITable

The DynamoDB table to view.

Note that all contents of this table will be
visible to the public.

---

##### `endpointType`<sup>Optional</sup> <a name="endpointType" id="@tcons/cdk-dynamo-table-viewer.TableViewerProps.property.endpointType"></a>

```typescript
public readonly endpointType: EndpointType;
```

- *Type:* terraconstructs.aws.compute.EndpointType
- *Default:* EDGE

The endpoint type of the [LambdaRestApi](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-apigateway.LambdaRestApi.html) that will be created.

---

##### `registerOutputs`<sup>Optional</sup> <a name="registerOutputs" id="@tcons/cdk-dynamo-table-viewer.TableViewerProps.property.registerOutputs"></a>

```typescript
public readonly registerOutputs: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to register the API Gateaway outputs in the stack.

---

##### `sortBy`<sup>Optional</sup> <a name="sortBy" id="@tcons/cdk-dynamo-table-viewer.TableViewerProps.property.sortBy"></a>

```typescript
public readonly sortBy: string;
```

- *Type:* string
- *Default:* No sort

Name of the column to sort by, prefix with "-" for descending order.

---

##### `title`<sup>Optional</sup> <a name="title" id="@tcons/cdk-dynamo-table-viewer.TableViewerProps.property.title"></a>

```typescript
public readonly title: string;
```

- *Type:* string
- *Default:* No title

The web page title.

---



