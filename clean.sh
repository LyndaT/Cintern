controllers=`grep 'console.log' -r Cintern/controllers`
models=`grep 'console.log' -r Cintern/models`
public=`grep 'console.log' -r Cintern/public`
routes=`grep 'console.log' -r Cintern/routes`
test=`grep 'console.log' -r Cintern/test`
utils=`grep 'console.log' -r Cintern/utils`
echo 'CONTROLLERS:';
echo $controllers;
echo 'MODELS:';
echo $models;
echo 'PUBLIC:';
echo $public;
echo 'ROUTES:';
echo $routes;
echo 'TEST:'
echo $test;
echo 'UTILS:';
echo $utils;