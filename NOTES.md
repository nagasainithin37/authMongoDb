## Step 1 :

    Connect backend to mongoDb

## Step 2 :

    Create route for creating a user

    1 Before creating user check if user already existed or not with same username

    2 if username exists return with cannot create user wih following username nd psw

    3 else hash password

        Install bcryptjs for hashing  password

        npm install bcryptjs

        const bcryptjs=require('bcryptjs')

        bcryptjs.hash(string,num)

        eg:
        let pass= await bcryptjs.hash(userObj.password,5)

    4 create user with username and password

## Step 3:

Login user and return json Webtoken

    install jsonwebtoken

    npm i jsonwebtoken

    const jwt=require('jsonwebtoken)

    get the userLogin Details

    compare the password entered and actual password using bcryptjs.compare

    let status=bcryptjs.compare(arg1,arg2)
    arg1===>enterd password
    arg2===>database password
    if status==false
        so password is not matched
    else
        password matched and json web token is to be returned

    let token=jsw.sing(obj/string,'secret-key',{expiredIn:time})

    time:
        40--->only 40 s
        "1h"===> one hour
        "1d"===>one day

    let token=jwt.sign({username:req.body.username},'abcde',{expiresIn:600})

    send this  token and userobj in return
