import fs from "fs";
import path from "path";
import {graphql} from "graphql";
import {introspectionQuery, printSchema} from "graphql/utilities";
import schema from "./schema";

const yourSchemaPath = path.join(__dirname, './schema/schema');

graphql(schema, introspectionQuery).then(result => {
    fs.writeFileSync(`${yourSchemaPath}.json`, JSON.stringify(result, null, 2));
    fs.writeFileSync(`${yourSchemaPath}.graphqls`, printSchema(schema));
});