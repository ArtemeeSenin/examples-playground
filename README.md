# playground

Simple project to use for learning.

To add a new page: create a folder in src/, add new entry and html-webpack-plugin instance

## Prepare

To create new experiment folder run `zsh automation/add-page.sh yourfilename`. 

Or make that file executable by `chmod +x automation/add-page.sh` and then run `automation/add-page.sh yourfilename`

### MacOS

On MacOS run following

Required to use envsubst:

``` 
brew install gettext
brew link --force gettext
```

## Todo

- [x] Create shell script for adding new page

- [ ] Try Gulp or another soft for building (Rollup, Parcel)
