let AWS = require("aws-sdk");

var credentials = new AWS.SharedIniFileCredentials({
  profile: "800353127405_SandboxAdministrator",
});
AWS.config.credentials = credentials;
AWS.config.update({ region: "us-east-1" });
var params = {
  name: "BuildPipeline",
};

var codepipeline = new AWS.CodePipeline();
var codebuild = new AWS.CodeBuild();

// codepipeline.getPipelineState(params, function (err, data) {
//   if (err) console.log(err, err.stack);
//   // an error occurred
//   else console.log(data.stageStates[0].actionStates); // successful response
// });

codepipeline.startPipelineExecution(params, function (err, data) {
  if (err) console.log(err, err.stack);
  // an error occurred
  //   else console.log(data); // successful response
  codepipeline.waitFor("started", {}, function (err, data) {
    console.log("succeed");
    console.log(err, data);
  });
});

codepipeline.getPipelineState(params, function (err, data) {
  if (err) console.log(err, err.stack);
  // an error occurred
  else {
    // console.log(data.stageStates[0].actionStates); // successful response
    console.log(data.stageStates[1].actionStates); // successful response
    // var paramscb = {
    //   ids: [
    //     /* required */
    //     data.stageStates[1].latestExecution.externalExecutionId,
    //     /* more items */
    //   ],
    // };
    // codebuild.batchGetBuildBatches(paramscb, function (err, data) {
    //   if (err) console.log(err, err.stack);
    //   // an error occurred
    //   else console.log(data); // successful response
    // });
    // codebuild.
    // data.stageStates[1].actionStates.waitFor("Succeeded", {}, function (
    //   err,
    //   data
    // ) {
    //   console.log("sweet");
    // });
  }
});

// codepipeline.waitFor("Failed", {}, function (err, data) {
//   console.log("failed");
//   console.log(err, data);
// });
