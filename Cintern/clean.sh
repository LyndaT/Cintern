controllers=`grep 'console.log' -r controllers`
models=`grep 'console.log' -r models`
public=`grep 'console.log' -r public`
routes=`grep 'console.log' -r routes`
test=`grep 'console.log' -r test`
utils=`grep 'console.log' -r utils`
echo $controllers;
echo $models;
echo $public;
echo $routes;
echo $test;
echo $utils;