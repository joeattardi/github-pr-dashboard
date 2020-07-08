variable "region" {
  default = "us-east-2"
}

variable "app_name" {
  default = "gitthub-pr-dashboard"
}

variable "app_environment" {
  default = "dev"
}

variable "app_repository" {
  default = "github-pr-dashboard"
}

variable "app_repo_link" {
  default = "https://github.com/express-labs/github-pr-dashboard.git"
}

############################################
#### Resource 2:  AWS Data filters
data "aws_iam_role" "code_build_role" {
  name = "${var.app_environment}-codebuild-iam"
}

data "aws_s3_bucket" "tf_codebuild_bucket" {
  bucket = "${var.app_environment}-tfcodebuild-bucket"
}
