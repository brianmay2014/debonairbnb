
import boto3
import botocore
from ..config import Config
import uuid

ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}
S3_LOCATION = f"http://{Config.AWS_S3_BUCKET}.s3.amazonaws.com/"

s3 = boto3.client(
    "s3",
    aws_access_key_id=Config.AWS_S3_ACCESS_KEY,
    aws_secret_access_key=Config.AWS_S3_SECRET_ACCESS_KEY,
)

def allowed_file(filename):
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"

def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            Config.AWS_S3_BUCKET,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}
