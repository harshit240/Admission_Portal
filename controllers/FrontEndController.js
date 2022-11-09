class FrontEndController{
    static home = async(req,res)=>{
        res.send("Hello Boss")
    }
    static login = async(req,res)=>{
        // res.send("Hello Login Page")
        res.render('front/login')
    }
    static dashboard = async(req,res)=>{
        // res.send("Hello Login Page")
        res.render('admin/dashboard.ejs')
    }
}
module.exports = FrontEndController