#/bin/bash
#upload files
aws s3 cp ./dist s3://apusertest --recursive --acl public-read
