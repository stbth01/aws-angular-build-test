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

        aws cloudformation update-stack \
                --stack-name valhalla-pipeline \
                --template-body file://pr-pipeline-cf.json \
                --capabilities CAPABILITY_NAMED_IAM \
                --profile 800353127405_SandboxAdministrator --region us-east-1

        aws cloudformation validate-template \
                --template-body file://secrets.json \
                --profile 800353127405_SandboxAdministrator --region us-east-1

                aws cloudformation create-stack \
                --stack-name secret-mangage \a
                --template-body file://secrets.json \
                --capabilities CAPABILITY_NAMED_IAM \
                --profile 800353127405_SandboxAdministrator --region us-east-1
