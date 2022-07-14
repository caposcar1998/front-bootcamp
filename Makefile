DOCKER = docker
COMPOSE = docker-compose
COMPOSE_FILE = $(CURDIR)/infra/docker-compose.yml
ENV = $(CURDIR)/.env

-include $(ENV)
export

.PHONY: help
help: ## Displays help menu
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(firstword $(MAKEFILE_LIST)) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


.PHONY: run-install
run-install: ## Install dependencies
	$(COMPOSE) -f $(COMPOSE_FILE) build app
	$(COMPOSE) -f $(COMPOSE_FILE) run --rm app npm install

.PHONY: run-dockerized-app
run-dockerized-app: ## Run dockerize app
	$(COMPOSE) -f $(COMPOSE_FILE) build app
	$(COMPOSE) -f $(COMPOSE_FILE) up -d app

run-wiremock: ## Run app in test
	$(COMPOSE) -f $(COMPOSE_FILE) build wiremock
	$(COMPOSE) -f $(COMPOSE_FILE) up -d wiremock

.PHONY: run-tests
run-tests: ## Run tests
	$(COMPOSE) -f $(COMPOSE_FILE) build app
	$(COMPOSE) -f $(COMPOSE_FILE) run --rm app npm test

.PHONY: open-browser
open-browser: ## Open browser
	open http://localhost:3000

open-browser-dev: ## Open ports dev
	open http://localhost:3000
	open http://localhost:8080


.PHONY: run-docker
run-docker:  run-dockerized-app open-browser ## Run with docker

.PHONY: run-docker-dev
run-docker-dev: run-dockerized-app run-wiremock open-browser-dev ## Run with wiremock
