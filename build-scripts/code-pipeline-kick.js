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

const start = codepipeline.startPipelineExecution(params).promise();
start.then((data) => {
  data.pipelineName = "BuildPipeline";
  check(1000, data);
});

const check = (lenTime, data) =>
  setTimeout(() => {
    const result = codepipeline.getPipelineExecution(data).promise();
    result.then(function (d) {
      const that = d;
      if (d.pipelineExecution.status === "InProgress") {
        console.log(":(", d.pipelineExecution.status, new Date());
        check(lenTime, data);
      } else {
        console.log(d);
      }
    });
  }, lenTime);

// .promise()
// .then((data) => {
//   console.log(data);
//   var param = {
//     pipelineExecutionId: "80eaf936-1540-4510-9e3a-1a2818d643c3",
//     pipelineName: "BuildPipeline" /* required */,
//   };
//   return codepipeline.getPipelineExecution(param).promise();
// })
// .then((data) => {
//   console.log("3", data);
//   var param = {
//     pipelineExecutionId: "80eaf936-1540-4510-9e3a-1a2818d643c3",
//     pipelineName: "BuildPipeline" /* required */,
//   };
// });

// var codebuild = new AWS.CodeBuild();

// codepipeline.waitFor("inProgress", params, function (err, data) {
//   console.log("succeed");
//   console.log(err, data);
// });

// codebuild.waitFor("test", {}, function(err, data) {});

// codepipeline.getPipelineState(params, function (err, data) {
//   if (err) console.log(err, err.stack);
//   // an error occurred
//   else console.log(data.stageStates[0].actionStates); // successful response
// });

// codepipeline.startPipelineExecution(params, function (err, data) {
//   if (err) console.log(err, err.stack);
//   // codepipeline.getPipelineState(params, function (err, stuff) {
//   //   console.log("here");
//   //   console.log(JSON.stringify(stuff));
//   // });
//   codepipeline.waitFor("InProgess", params, function (err, data) {
//     console.log("succeed");
//     console.log(err, data);
//   });
// });
