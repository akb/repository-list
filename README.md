Repository List
===============

Repository List is a web application for browsing and filtering Docker
repositories.

Installation
------------

Repository List requires the following of the local system:

- A Unix-like operating system
- bash
- openssl (for generating self-signed cert for https)
- NodeJS/npm
- nvm

### nvm

`nvm` is a tool for managing multiple versions of the NodeJS runtime and global
packages. `nvm` can be installed for your system version of NodeJS with `npm
install -g nvm`. After `nvm` is installed, it may be used by executing `nvm
install` from within the `repository-list` root directory to initially install
the correct version of NodeJS. Subsequently, the `nvm use` command will switch
to the appropriate version of NodeJS.

### Dependencies

Dependencies for local development and runtime may be installed by executing
`npm install` in the `repository-list` root directory.

Development Scripts
-------------------

The `bin` directory contains scripts useful for developing Repository List.
These scripts are written in bash and NodeJS and provide an automated build
system and development server.

### Development Server

`bin/serve-local`: Starts the Repository List server and watches the filesystem
for changes in the source code. When code is updated, the appropriate build
step will be automatically run to use the new code. Specifically:

- A CA root certificate and server certificate will be generated
- Vendor JS will be bundled and copied to the server
  (handled by `bin/build-vendor`)
- Updating the files in `src/static` will update them on the server (handled by
  `bin/watch-static`)
- Updating the LESS source will rebuild and bundle the client CSS
  (handled by `bin/watch-less`)
- Updating the client source will rebuild and bundle the client JS
  (handled by `bin/watch-client`)
