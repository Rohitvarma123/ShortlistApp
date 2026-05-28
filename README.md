# ShortlistApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


Verify inside the Jenkins pod
kubectl exec -it -n jenkins jenkins-5b9f5bf66d-gn7kw -- bash

which docker
which kubectl
which npm
which node

DOCKER
=================
apt update
apt install -y docker.io


NODE and NPM
======================
# 1. Clear any old, corrupted node archive variants completely
rm -f node.tar.xz node.tar.gz

# 2. Download the .tar.gz bundle format for Node v18.0.0
curl -fsSL https://nodejs.org -o node.tar.gz

# 3. Extract using gunzip (-xzf) into /usr/local
tar -xzf node.tar.gz -C /usr/local --strip-components=1

# 4. Remove the installation file
rm -f node.tar.gz

# 5. Lock in npm v8.19.2
npm install -g npm@8.19.2


KUBECTL
==============================
apt update
apt install -y curl

curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

kubectl version --client
