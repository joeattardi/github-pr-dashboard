data "template_file" "app_build" {
  template = "${file("${path.module}/buildspec.yml")}"
}

resource "aws_codebuild_project" "app_buildjob" {
  name          = "${var.app_name}-deploy"
  description   = "${var.app_name} Code build job"
  build_timeout = "15"
  badge_enabled = true
  service_role  = "${data.aws_iam_role.code_build_role.arn}"

  artifacts {
    type = "NO_ARTIFACTS"
  }

  cache {
    type     = "S3"
    location = "${data.aws_s3_bucket.tf_codebuild_bucket.bucket}"
  }

  source {
    type            = "GITHUB"
    location        = "${var.app_repo_link}"
    git_clone_depth = 1
    buildspec       = "${data.template_file.app_build.rendered}"
  }

  environment {
    compute_type    = "BUILD_GENERAL1_SMALL"
    image           = "aws/codebuild/java:openjdk-8-1.6.0"
    type            = "LINUX_CONTAINER"
    privileged_mode = true

    environment_variable {
      "name"  = "PATCH_VERSION"
      "value" = "1"
    }

    environment_variable {
      "name"  = "TF_VAR_PATCH_VERSION"
      "value" = "1"
    }

    environment_variable {
      "name"  = "AWS_DEFAULT_REGION"
      "value" = "us-east-2"
    }

    environment_variable {
      "name"  = "AWS_ACCESS_KEY_ID"
      "value" = "/CodeBuild/buildAccessKey"
      "type"  = "PARAMETER_STORE"
    }

    environment_variable {
      "name"  = "AWS_SECRET_ACCESS_KEY"
      "value" = "/CodeBuild/buildAccessSecret"
      "type"  = "PARAMETER_STORE"
    }

    environment_variable {
      "name"  = "RANCHER_URL"
      "value" = "https://ras.mgmt.cloud.express.com/v2-beta/projects/1a6448"
    }

    environment_variable {
      "name"  = "RANCHER_ACCESS_KEY"
      "value" = "/CodeBuild/CodeBuild/ctDevRancherApiKey-nt"
      "type"  = "PARAMETER_STORE"
    }

    environment_variable {
      "name"  = "RANCHER_SECRET_KEY"
      "value" = "/CodeBuild/CodeBuild/ctDevRancherApiSecret-nt"
      "type"  = "PARAMETER_STORE"
    }
  }

  tags {
    Name   = "${var.app_environment}_${var.app_name}_codebuild"
    env    = "${var.app_environment}"
    system = "${var.app_name}"
  }
}
