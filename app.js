const express=require("express")
const path=require('path')
const session=require("express-session")
const cookieParser = require("cookie-parser")
const app=express()


app.set(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 6000000 },
    resave: false 
}));

app.use((req, res, next) => {
    res.header(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let sessions;
let useremail="ami@gmail.com"
let password="123456"

app.get("/",(req,res)=>{ 
    sessions=req.session;
    console.log(sessions.username);
    if(sessions.username){
        res.render("home")  
    }else{
        res.render("login")
    }
})

app.post("/login",(req,res)=>{
    if(req.body.email===useremail && req.body.password===password){
        sessions=req.session
        sessions.username=req.body.email
        res.render("home")
    }else{
        res.render("login",{error:"invalid username or  password"})
    }   
})

app.get("/logout",(req,res)=>{
    req.session.destroy()
    res.redirect("/")
})
app.get('*',(req,res)=>{

    res.render('404')
    
})


app.listen(3000,()=>{
    console.log("server started to listning port: 3000");
})
