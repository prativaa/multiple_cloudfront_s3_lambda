resource "aws_lambda_permission" "allow_cloudfront" {
  statement_id   = "AllowExecutionFromCloudFront"
  action         = "lambda:GetFunction"
  function_name  = "${aws_lambda_function.testing_lambda.function_name}"
  principal      = "edgelambda.amazonaws.com"
}

resource "aws_lambda_function" "testing_lambda" {
  filename = "lambda_function.zip"
  function_name = "${var.lambda_function_name}"
  role = "${aws_iam_role.lambda.arn}"
  handler = "index"
  runtime = "nodejs8.10"  
  publish = true
}