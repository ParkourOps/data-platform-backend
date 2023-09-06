# Declarative JSON API Server Framework

The objective of __ParkourJSON__ is to provide a concise, _typed_, non-verbose, and declarative way of implementing a JSON API server _without_ the need for code generation (an unnecessary and annoying step).

A 'JSON API' in this sense is an API that:

- Only responds to JSON-formatted requests.
- Only responds with JSON-formatted responses.

## Getting Started

Simply clone or fork this project.

Forking is recommended to allow for downstream merging of future improvements.

After cloning or forking, see the sample API implementation in the `src` directory.

### How to Fork

To create a new project based on this framework, do not use the 'fork' feature of GitHub. Instead, follow these steps:

1. On GitHub, create a new __empty__ repository (let's call this the __project repo__).

2. `git clone` the __project repo__ locally and `cd` into it.

3. Add __this repository__ as an upstream remote to the local __project repo__ clone, we will name the remote `framework`.:

    ```bash

      git remote add framework https://github.com/ParkourOps/parkour-json

    ```

4. Create a local branch on the __project repo__ clone called `framework` which will reflect the `main` branch of __this repository__.

    ```bash

      git fetch framework main
      
      git checkout -b framework --track framework/main

    ```

5. Create the `main` branch on the __project repo__.

    ```bash

      git checkout -b main

      git push -u origin main

    ```

6. Install the Node dependencies and get developing!

    ```bash

      npm install

    ```

## Work to Do

In order of precedent:

- [ ] Implement global middleware.

- [ ] Implement an OPTIONS handler on all possible routes which should respond with concise representation of the API good enough to be used as user documentation.

- [ ] Implement unit tests.

- [ ] Implement functional tests.

- [ ] Documentation!

- [ ] Improve typing to further improve development experience.
