import { IGraphMetadata, IGroupData, DataType } from './IGroupMetadata';

export class MetadataHelp {

    private static _types: string[] = [
        "String00", "String01", "String02", "String03", "String04",
        "String05", "String06", "String07", "String08", "String09",
        "Integer00", "Integer01", "Integer02", "Integer03", "Integer04",
        "Boolean00", "Boolean01", "Boolean02", "Boolean03", "Boolean04",
        "DateTime00", "DateTime01", "DateTime02", "DateTime03", "DateTime04",
        "Binary00", "Binary01", "Binary02", "Binary03", "Binary04"
    ];

    public static GetMetadata(input: IGroupData) {
        let metadata: IGraphMetadata[] = [];
        if (input.techmikael_GenericSchema) {
            this._types.forEach(propertyDataType => {
                let value = input.techmikael_GenericSchema[`Value${propertyDataType}`];
                if (value !== null) {
                    let key = input.techmikael_GenericSchema[`Key${propertyDataType}`];
                    let label = input.techmikael_GenericSchema[`Label${propertyDataType}`];

                    let type: DataType;
                    if (propertyDataType.indexOf("String") !== -1) {
                        type = DataType.String;
                        if (this.IsEmail(value)) type = DataType.Email;
                        if (this.IsClaim(value)) {
                            value = (<string>value).replace("i:0#.f|membership|", "");
                            type = DataType.Email;
                        }
                    } else if (propertyDataType.indexOf("Integer") !== -1) {
                        type = DataType.Integer;
                    } else if (propertyDataType.indexOf("Boolean") !== -1) {
                        type = DataType.Boolean;
                    } else if (propertyDataType.indexOf("DateTime") !== -1) {
                        type = DataType.DateTime;
                    } else if (propertyDataType.indexOf("Binary") !== -1) {
                        type = DataType.Binary;
                    }

                    let data: IGraphMetadata = {
                        Key: key,
                        Label: label,
                        Value: value,
                        Type: type,
                        SchemaKey: propertyDataType
                    };
                    metadata.push(data);
                }
            });
        }
        return metadata;
    }

    public static IsEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    public static IsClaim(claim) {
        return claim.indexOf("i:0#.f|membership|") != -1;
    }
    
}