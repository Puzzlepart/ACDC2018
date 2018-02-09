'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const environment = require('./config/env.json');
const spsync = require('gulp-spsync-creds').sync;
const sppkgDeploy = require('node-sppkg-deploy');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);
const { default: pnp, Web } = require('sp-pnp-js');
const NodeFetchClient = require('node-pnp-js').default;


pnp.setup({
    sp: {
        fetchClientFactory: () => {
            return new NodeFetchClient({
                username: environment.username,
                password: environment.password,
            });
        }
    }
});

build.task('deleteAppPkg', {
    execute: (config) => {
        console.log("Running delete function");
        return new Promise((resolve, reject) => {
            let filename = packageSolution.paths.zippedPackage;
            filename = filename.split('/').pop();
            console.log(environment.tenant);
            console.log(environment.tenant);
            console.log(environment.catalogSite);

            new Web(`https://${environment.tenant}.sharepoint.com/${environment.catalogSite}`).getFileByServerRelativeUrl(`/${environment.catalogSite}/AppCatalog/${filename}`).delete()
                .then(data => {
                    resolve();
                })
                .catch(err => {
                    resolve();
                });
        });
    }
});

build.task('uploadAppPkg', {
    execute: (config) => {
        return new Promise((resolve, reject) => {
            const pkgFile = require('./config/package-solution.json');
            const folderLocation = `./sharepoint/${pkgFile.paths.zippedPackage}`;
            const libraryPath = 'AppCatalog';
            const site = `https://${environment.tenant}.sharepoint.com/${environment.catalogSite}`;
            console.log("uploadAppPkg", site, libraryPath)
            return gulp.src(folderLocation)
                .pipe(spsync({
                    username: environment.username,
                    password: environment.password,
                    site: site,
                    libraryPath: libraryPath,
                    publish: true
                }))
                .on('finish', resolve);
        });
    }
});

build.task('deploySppkg', {
    execute: (config) => {
        const pkgFile = require('./config/package-solution.json');
        if (pkgFile) {
            // Retrieve the filename from the package solution config file
            let filename = pkgFile.paths.zippedPackage;
            // Remove the solution path from the filename
            filename = filename.split('/').pop();
            // Retrieve the skip feature deployment setting from the package solution config file
            const skipFeatureDeployment = pkgFile.solution.skipFeatureDeployment ? pkgFile.solution.skipFeatureDeployment : false;
            // Deploy the SharePoint package
            return sppkgDeploy.deploy({
                username: environment.username,
                password: environment.password,
                tenant: environment.tenant,
                site: environment.catalogSite,
                filename: filename,
                skipFeatureDeployment: skipFeatureDeployment,
                verbose: true
            });
        }
    }
});

build.initialize(gulp);
