# Declarative JSON API Server Framework

The objective of __ParkourJSON__ is to provide a concise, _typed_, non-verbose, and declarative way of implementing a JSON API server _without_ the need for code generation (an unnecessary and annoying step).

A 'JSON API' in this sense is an API that:

- Only responds to JSON-formatted requests.
- Only responds with JSON-formatted responses.

## Getting Started

Simply clone or fork this project.

Forking is recommended to allow for downstream merging of future improvements.

After cloning, see the sample API implementation in the `src` directory.

## Work to Do

In order of precedent:

- [ ] Implement unit tests.

- [ ] Implement functional tests.

- [ ] Implement an OPTIONS handler on all possible routes which should respond with concise representation of the API good enough to be used as user documentation.

- [ ] Documentation!

- [ ] Improve typing to further improve development experience.
