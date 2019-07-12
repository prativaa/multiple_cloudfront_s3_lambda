variable "region" {}
variable "access_key" {}
variable "secret_key" {}

variable "fqdn" {
 description = "The fully-qualified domain name of the resulting S3 website." 
 type = "list"
 default = ["pratibha2052.com", "pratibha2019.com"]
}

variable "index_document" {}
variable "lambda_function_name" {}

variable "lambda_at_edge" {
  type = bool
  default = true
}
