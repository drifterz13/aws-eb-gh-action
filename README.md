# NodeJS + Typescript CI/CD

This repository cotains 3 methods for deploy nodejs application
1. Using EB cli from your command line.
2. Using Github actions.
3. Using AWS Codepipeline

## Using EB cli from your command line.
**Concept**
Create `.elasticbeanstalk/config.yml` that contains instruction for deploy the application by **EB cli**. The command that involve in this method are `eb init` to create elastic beanstalk env, `eb create` to create instance and `eb deploy` to deploy application.

Before release, you have to run `yarn dist` to create a `zip` file for transplied code (TS -> JS). After that, you can `yarn release` and let it handle the rest. Basically, it will upload your artifacts (`.zip`) to S3 and provide it to ElasticBeanStalk service.

## Using Github actions.
**Concept**
We need to prepare artifacts for the service as well which is similar with the previous method but for this method we will use the public github actions instead of **EB CLI**.

## Using AWS Codepipeline.
**Concept**


> Github -> CodeBuild -> CodeDeploy

We need to setup CodePipeline hooks to our github repository to make the process run when code changes. For this method, we need to define `buildspec.yml` which is instruction during build step (`CodeBuild`). The different from previous method is we don't need to provide `zip` artifacts for the service but we create instruction on `buildspec.yml` for the service to pick up all files `**/*` and it will zip contents for us the upload to S3 and provide it to Elastic BeanStalk as usual.