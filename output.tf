output "s3_bucket_id" {
  value = "${aws_s3_bucket.test_bucket.*.id}"
}

output "s3_bucket_endpoint" {
 value = "${aws_s3_bucket.test_bucket.*.website_endpoint}"
}

output "s3_bucket_arn" {
 value = "${aws_s3_bucket.test_bucket.*.arn}"
}

output "cloudfront_id" {
  value = "${aws_cloudfront_distribution.s3_distribution.*.id}"
}

output "lambda_arn" {
  value = "${aws_lambda_function.testing_lambda.arn}"
}

output "lambda_qualified_arn" {
  value = "${aws_lambda_function.testing_lambda.qualified_arn}"
}
output "lambda_version" {
  value = "${aws_lambda_function.testing_lambda.version}"
}