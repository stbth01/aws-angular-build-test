        aws cloudformation validate-template \
                --template-body file://s3-bucket-cf.yml \
                --profile 800353127405_SandboxAdministrator --region us-east-1

        aws cloudformation create-stack \
                --stack-name maken-buckets \
                --template-body file://s3-bucket-cf.json \
                --capabilities CAPABILITY_NAMED_IAM \
                --profile 800353127405_SandboxAdministrator --region us-east-1

        aws cloudformation update-stack \
                --stack-name valhalla-take-3 \
                --template-body file://s3-bucket-cf.yml \
                --capabilities CAPABILITY_NAMED_IAM \
                --profile 800353127405_SandboxAdministrator --region us-east-1

        aws cloudformation create-change-set \
                --stack-name valhalla-take-3 \
                --template-body file://s3-bucket-cf.yml \
                --capabilities CAPABILITY_NAMED_IAM \
                --profile 800353127405_SandboxAdministrator --region us-east-1

        aws cloudformation validate-template \
                --template-body file://pipeline-cf.json \
                --profile 800353127405_SandboxAdministrator --region us-east-1

                aws cloudformation create-stack \
                --stack-name valhalla-pipeline \
                --template-body file://pipeline-cf.json \
                --capabilities CAPABILITY_NAMED_IAM \
                --profile 800353127405_SandboxAdministrator --region us-east-1

        aws cloudformation validate-template \
                --template-body file://secrets.json \
                --profile 800353127405_SandboxAdministrator --region us-east-1

                aws cloudformation create-stack \
                --stack-name secret-mangage \
                --template-body file://secrets.json \
                --capabilities CAPABILITY_NAMED_IAM \
                --profile 800353127405_SandboxAdministrator --region us-east-1

aws codebuild start-build --project-name build-valhalla --profile 800353127405_SandboxAdministrator --region us-east-1

aws codepipeline start-pipeline-execution --name BuildPipeline --profile 800353127405_SandboxAdministrator --region us-east-1

aws codepipeline get-pipeline-execution --pipeline-name BuildPipeline --pipeline-execution-id 7e67ed4e-4b5c-4761-a387-1c9df1f526e3 --profile 800353127405_SandboxAdministrator --region us-east-1
