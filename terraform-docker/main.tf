terraform {
  required_providers {
      docker = {
          source = "kreuzwerker/docker"
          version = "2.13.0"
      }
  }
}


provider "docker" {
  
}

#Pull image
resource "docker_image" "bootcamp-front" {
  name = "caposcar/prueba1:latest"
}

resource "docker_container" "front" {
    image = docker_image.bootcamp-front.latest
    name = "bootcamp-front-t"
}