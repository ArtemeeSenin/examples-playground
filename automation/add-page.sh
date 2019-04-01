mkdir src/$1
touch src/$1/$1.js
SCRIPT_NAME=$1 envsubst < automation/index.html > src/$1/index.html
sed "s/pageList = \[/&\'$1\', /g" webpack.config.js > tmp
mv tmp webpack.config.js
