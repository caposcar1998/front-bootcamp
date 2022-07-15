terraform {
  required_providers {
      aws = {
          source = "hashicorp/aws"
          version = "~> 3.0"
      }
  }
}

provider "aws" {
  region = "us-east-2"
}

resource "aws_ecr_repository" "bootcamp_frontend" {
  name = "frontend"
}

resource "aws_ecs_cluster" "cluster_frontend" {
  name = "ftontend_cluster"
}

resource "aws_ecs_task_definition" "frontend_definition" {
  family = "frontend-family"
  container_definitions = <<DEFINITION
  [
      {
          "name": "task_front",
          "image": "${aws_ecr_repository.bootcamp_frontend.repository_url}",
          "essential": true,
          "portMapppings" : [
              {
              "containerPort": 3000,
              "hostPort": 3000
              }
          ],
  "memory": 512,
  "cpu": 256
}
]
DEFINITION
requires_compatibilities = ["FARGATE"]
network_mode = "awsvpc"
memory = 512
cpu = 256
execution_role_arn = "${aws_iam_role.ecsTaskExecutionRole.arn}"
}

resource "aws_iam_role" "ecsTaskExecutionRole" {
  name = "ecsTaskExecutionRole"
  assume_role_policy = "${data.aws_iam_policy_document.assume_role_policy.json}"
}

data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
        type = "Service"
        identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_ecs_service" "front_service" {
    name = "front_service"
    cluster = "${aws_ecs_cluster.cluster_frontend.id}"
    task_definition = "${aws_ecs_task_definition.frontend_definition.arn}"
    launch_type = "FARGATE"
    desired_count = 1

    network_configuration {
      subnets = ["${aws_default_subnet.default_subnet.id} "]
      assign_public_ip = true
    }
  
}

resource "aws_default_vpc" "default_vpc" {
}

resource "aws_default_subnet" "default_subnet" {
  availability_zone = "us-east-2a"
}