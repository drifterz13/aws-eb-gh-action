# If the directory, `dist`, doesn't exist, create `dist`
stat dist || mkdir dist
# Archive artifacts
zip deploy_artifacts.zip -r dist package.json yarn.lock