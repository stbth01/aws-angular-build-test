# Introduction

This is a CICD Pipeline meant to demonstrate deploying a relatively simple CICD pipeline to AWS

This assumes you've already got

1) a repo
2) a build spec file in that repo
3) a space in an s3 bucket, you can use to stage your templates
4) a permissions boundry setup in your AWS account

To deploy these templates you should

1) Deploy the cicd_iam_roles.template
2) Run the other templates, passing in the role arn. The order of the other two doesn't matter

# Example Invokations

These are all running inside the components directory of this repo

## Testing the stacks

        aws cloudformation validate-template \
                --template-body file://cicd_iam_roles.template \
                --profile medicaid_access

        aws cloudformation validate-template \
                --template-body file://cicd_pull_request_pipeline.template \
                --profile medicaid_access

        aws cloudformation validate-template \
                --template-body file://cicd_production_pipeline.template \
                --profile medicaid_access


## Deploying the Stacks

        aws cloudformation create-stack \
                --stack-name cicd-test-roles-001 \
                --template-body file://cicd_iam_roles.template \
                --capabilities CAPABILITY_NAMED_IAM \
                --profile medicaid_access 

You'll now Need to update the role arns with the output of the previous stack

        aws cloudformation create-stack \
                --stack-name cicd-test-pr-pipe-003 \
                --template-body file://cicd_pull_request_pipeline.template \
                --capabilities CAPABILITY_NAMED_IAM \
                --profile medicaid_access


        aws cloudformation create-stack \
                --stack-name cicd-test-prod-pipe-001 \
                --template-body file://cicd_production_pipeline.template \
                --capabilities CAPABILITY_NAMED_IAM \
                --profile medicaid_access

# Helpful Links

https://docs.aws.amazon.com/quickstart/latest/cicd-taskcat/welcome.html
https://aws.amazon.com/quickstart/architecture/cicd-taskcat/
https://github.com/aws-quickstart
https://github.com/aws-quickstart/quickstart-taskcat-ci
