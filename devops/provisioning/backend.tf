terraform {
  backend "s3" {
    encrypt        = true
    bucket         = "express-terraform-states"
    dynamodb_table = "terraform-locks"
    region         = "us-east-2"
    key            = "us-east-2/devops/provisioning/terraform.tfstate"
  }
}
