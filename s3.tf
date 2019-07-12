resource "aws_s3_bucket" "test_bucket" {
 count = "${length(var.fqdn)}"
 bucket = "${element(var.fqdn, count.index)}"
 # bucket = "${var.fqdn}"
 acl = "public-read"
 policy = "${data.aws_iam_policy_document.bucket_iam_policy[count.index].json}"

 website {
   index_document = "${var.index_document}"
 }

 tags = {
  Name = "Terraform Test Bucket"
  Environment = "Dev"
 }
 
 force_destroy = true
} 

data "aws_iam_policy_document" "bucket_iam_policy" {
  count = "${length(var.fqdn)}"

  statement {
    sid = "PublicReadForGetBucketObjects"
    effect = "Allow"
    
    actions = [
      "s3:GetObject"
    ]

    resources = [
      "arn:aws:s3:::${element(var.fqdn, count.index)}",
      "arn:aws:s3:::${element(var.fqdn, count.index)}/*"
    ]
    
    principals {
      type = "*"
      identifiers = ["*"]
    }
  }
}