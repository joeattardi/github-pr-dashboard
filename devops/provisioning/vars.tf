variable "region" {
  default = "us-east-2"
}

variable "app_name" { }
variable "app_environment" { }
variable "app_repository" { } # Repository name
variable "app_repo_link" { } # Git link


############################################
#### Resource 2:  AWS Data filters
data "aws_iam_role" "code_build_role" {
  name = "${var.app_environment}-codebuild-iam"
}

data "aws_s3_bucket" "tf_codebuild_bucket" {
  bucket = "${var.app_environment}-tfcodebuild-bucket"
}
