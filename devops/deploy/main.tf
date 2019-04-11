data "rancher_environment" "github-pr-dashboard" {
  name = "${var.rancher_environment}"
}

resource "rancher_stack" "github-pr-dashboard" {
  name            = "github-pr-dashboard"
  description     = "github-pr-dashboard"
  environment_id  = "${data.rancher_environment.github-pr-dashboard.id}"
  docker_compose  = "${file("docker-compose.yml")}"
  rancher_compose = "${file("rancher-compose.yml")}"
  start_on_create = true
  finish_upgrade  = true

}
