/**
 * Generated by Ajv https://ajv.js.org/guide/managing-schemas.html#standalone-validation-code 
 * eslint-disable
 */
const schema11={"$schema":"http://json-schema.org/draft-07/schema#","title":"StateMachineCompileInput","type":"object","properties":{"file":{"type":"string"},"export":{"type":"string"},"awsRegion":{"type":"string"},"awsAccountId":{"type":"string"}},"required":["file","export","awsRegion","awsAccountId"],"additionalProperties":true};function validate10(data,{instancePath="",parentData,parentDataProperty,rootData=data}={}){let vErrors=null;let errors=0;if(errors===0){if(data&&typeof data=="object"&&!Array.isArray(data)){let missing0;if(data.file===void 0&&(missing0="file")||data.export===void 0&&(missing0="export")||data.awsRegion===void 0&&(missing0="awsRegion")||data.awsAccountId===void 0&&(missing0="awsAccountId")){validate10.errors=[{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty:missing0},message:"must have required property '"+missing0+"'"}];return false}else{if(data.file!==void 0){const _errs2=errors;if(typeof data.file!=="string"){validate10.errors=[{instancePath:instancePath+"/file",schemaPath:"#/properties/file/type",keyword:"type",params:{type:"string"},message:"must be string"}];return false}var valid0=_errs2===errors}else{var valid0=true}if(valid0){if(data.export!==void 0){const _errs4=errors;if(typeof data.export!=="string"){validate10.errors=[{instancePath:instancePath+"/export",schemaPath:"#/properties/export/type",keyword:"type",params:{type:"string"},message:"must be string"}];return false}var valid0=_errs4===errors}else{var valid0=true}if(valid0){if(data.awsRegion!==void 0){const _errs6=errors;if(typeof data.awsRegion!=="string"){validate10.errors=[{instancePath:instancePath+"/awsRegion",schemaPath:"#/properties/awsRegion/type",keyword:"type",params:{type:"string"},message:"must be string"}];return false}var valid0=_errs6===errors}else{var valid0=true}if(valid0){if(data.awsAccountId!==void 0){const _errs8=errors;if(typeof data.awsAccountId!=="string"){validate10.errors=[{instancePath:instancePath+"/awsAccountId",schemaPath:"#/properties/awsAccountId/type",keyword:"type",params:{type:"string"},message:"must be string"}];return false}var valid0=_errs8===errors}else{var valid0=true}}}}}}else{validate10.errors=[{instancePath,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"}];return false}}validate10.errors=vErrors;return errors===0};validate10.schema=schema11;export{validate10};
