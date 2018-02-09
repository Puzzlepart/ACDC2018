export interface IGroupData {
  description: string;
  owners : IOwner[];
  techmikael_GenericSchema: any;
}

export interface IOwner {
  userPrincipalName: string;
}

export enum DataType {
  String,
  Integer,
  Boolean,
  DateTime,
  Binary,
  Email
}

export interface IGraphMetadata {
  Key: string;
  Label: string;
  Value: any;
  Type: DataType;
  SchemaKey: string;
}
