/**
 * Generated by Ajv https://ajv.js.org/guide/managing-schemas.html#standalone-validation-code 
 * eslint-disable
 */
const validate=validate10;var stdin_default=validate10;const schema11={"$schema":"http://json-schema.org/draft-07/schema#","title":"LambdaIntegrationParameters","type":"object","properties":{"FunctionName":{"type":"string"},"Payload":{}},"required":["FunctionName","Payload"],"additionalProperties":{}};function validate10(data,{instancePath="",parentData,parentDataProperty,rootData=data}={}){let vErrors=null;let errors=0;if(errors===0){if(data&&typeof data=="object"&&!Array.isArray(data)){let missing0;if(data.FunctionName===void 0&&(missing0="FunctionName")||data.Payload===void 0&&(missing0="Payload")){validate10.errors=[{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty:missing0},message:"must have required property '"+missing0+"'"}];return false}else{if(data.FunctionName!==void 0){if(typeof data.FunctionName!=="string"){validate10.errors=[{instancePath:instancePath+"/FunctionName",schemaPath:"#/properties/FunctionName/type",keyword:"type",params:{type:"string"},message:"must be string"}];return false}}}}else{validate10.errors=[{instancePath,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"}];return false}}validate10.errors=vErrors;return errors===0};validate.schema=schema11;export{stdin_default as default,validate};
