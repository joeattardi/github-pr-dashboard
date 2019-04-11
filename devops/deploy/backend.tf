#Set up a terraform state file for here on the s3 backend
#DO NOT CHANGE THE REGION HERE! IT'S THE SAME FOR ALL PROJECTS!
#Figure out a better key
terraform {
  backend "s3" {
    encrypt        = true
    bucket         = "express-terraform-states"
    dynamodb_table = "terraform-locks"
    region         = "us-east-2"
    key            = "us-east-2/code-build-github-dashboard/terraform.tfstate"
  }
}
