import boto3
from sys import argv
import yaml

def main(profile_name, marketplace_product_code, mfa_arn, region, mfa_code):
    master_sess = boto3.session.Session(profile_name=profile_name)

    sts = master_sess.client('sts', region_name=region)
    cur_token = sts.get_session_token(
        DurationSeconds=900,
        SerialNumber=mfa_arn,
        TokenCode=mfa_code)

    ec2 = boto3.client('ec2',
        region_name=region,
        aws_access_key_id=cur_token['Credentials']['AccessKeyId'],
        aws_secret_access_key=cur_token['Credentials']['SecretAccessKey'],
        aws_session_token=cur_token['Credentials']['SessionToken'])

    matching_images = ec2.describe_images(
        Filters=[
            {'Name': 'product-code', 'Values': [marketplace_product_code]}
        ],
        Owners=['aws-marketplace'])

    most_recent_image = max(matching_images['Images'],
        key=lambda x: x['CreationDate'])

    target_images = {region: {'HVM64': most_recent_image['ImageId']} }
        
    print(yaml.dump(target_images))


if __name__ == "__main__":
    main(*argv[1:])