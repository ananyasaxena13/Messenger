import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateToken.js";



export const loginController = async (req,res) =>{
    try
    {
        const {username,password} = req.body;
        

        const user = await User.findOne({username});
        const correctPassword = await bcrypt.compare(password,user?.password || "");
        if(!user || !correctPassword)   return res.status(400).json({message:"Invalid Credentials"});
        generateTokenAndSetCookie(user._id,res);
        return res.status(200).json({message:"User Logged In Successfully"});
    }
    catch(e){
        console.log(e);
        return res.status(500).json({message:"Internal Server Error Occur"})
    }
}

export const registerController = async (req,res) =>{
    try{

        const {username,fullname,password,confirmPassword} = req.body;

        if(password != confirmPassword) return res.status(400).json({message:"Password does not match"});

        const user = await User.findOne({username});

        if(user)    return res.status(201).json({message:"User Already Exists"})

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username:username,
            fullname:fullname,
            password:hashpassword,
            about:"Hey What's Up !!",
            profilePhoto:"/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIoLTkwKCo2KyIjMkQyNjs9QEBAJjBGS0U+Sjk/QD3/2wBDAQsLCw8NDx0QEB09KSMpPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3/wAARCAC0ALQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD2SiiloAKSlooASikZwilmYKqjJJOABXmHjH41WGlNJaeHkTULpflNwx/cIfbHL/hge5oA9Luru3srd7i7niggTlpJXCKv1J4rz/XfjZ4e0stHp6zanMP+eQ2R5/325/EA14drniXVvEt15+rX01ywPyqxwif7qjgfgK3vD/wq8TeIAsos/sVu3Pm3mY8j2XG4/lj3oA1tV+OXiK8JGnxWlgn8JVPMcfUtx/47XLX3jvxPqO77Trl+VbqqSmNT+C4Fer6R8BtJtwr6tqF1eOOqRARJ9O5P5iuusPhv4T04Yh0O0f3nUzH/AMfJoA+XHdpGLOxZj1JOSaSvr2DRdMtRi306ziA7RwIv8hUzWFo4w1rAR6GNf8KAPkiw1fUdLbdp9/dWresEzJ/I10mn/Fbxdp20DVWuEH8FzGsmfxI3frX0Jc+E9AvM/adE06Qnu1smfzxmuc1L4OeE9QDeVZzWTn+O2mI/Rsj9KAOR0b4+OGVNc0lSCfmls3wQP9xuv/fQr0bw/wCO/D/ibaum6jGZ2/5d5f3cv/fJ6/hmvLtc+A1/AGk0TUYrpeohuF8t8egYZBP1xXnGr6Dqvh66EOqWVxaSZ+UuuA2O6sOD9QaAPrmlr5y8KfF/XNAKQX7nU7IcbJm/eKP9l+v4HP4V7h4Y8Y6R4ttDNpVzudRmSCT5ZY/qvp7jI96ANyiiloASloooASiiigApaSigBao6vrFjoWmy3+pXCQW0Q5du57ADuT6CjWNXs9C0ufUNQmEVtAu5m7n0AHck8AV80eN/G99401UzTExWcRIt7YHhB6n1Y9zQBp+PPifqHi2SS0tC9npOeIAfmlHrIR19dvQe+M1n+Dvh7rHjGYPaxi3sVOHu5Qdg9Qo/iPsPxIrqfht8J31pItX8QRvHp7YaC2OVa4H949wnp3PXgYJ90t7eG0t44LaKOKGNQqRxqFVQOgAHQUAcx4U+G+heE1SW3t/tN6Ot3cAM4P8Asjov4c+pNdXS0lAC0UUlAC0UlFAC0UUlAC1XvbC11K1e2vreK4gf70cqBlP4Gp6KAPHvGPwQjdZLzwq5RxybKV+D/uOen0b8xXksUup+GtY3RtcWGoWz89UdD6Ef06EV9d1zHjTwFpnjOy23KiC9RcQ3aL8yex/vL7fligDA+HfxVt/Evl6bq/l22q/dRhxHcfT0b279vQej18leIfDupeE9Yax1KIxTJ8ySIflkXsynuP1HfBr2T4WfE064sei63L/xMUGIJ2P/AB8Adj/tj9fr1APUaKSloASiiigApHYIpZiFUDJJOABS15f8avGJ0rSU0KykxdXykzlTykPTH/AjkfQH1oA8++J/jx/FusG1s5G/sm0ciEDgSt0Mh/p6D0ya2PhP8Nl1qRNc1qHdp8bf6PAw4uGH8Tf7APbufYEHl/h74Ok8ZeI0tnDLYwYlupB2TPCg+rdPzPavp23t4rS3jt7eNYoYkCRogwFUDAAHoBQBIBRRRQAtJS0lAC1V1DUrLSrY3GoXcFrAOPMmkCDPpk964r4ifE+28IqbCwVLnV2UEo3KQA9C/qT2X8TjjPgeq6zqniTUftGo3U95cyHau7nGT91VHAGewFAHvuofGnwnZOVinu7zHU28HH5uVqlH8d/DTthrTVUHqYoyP0evMtK+E3izVY1k/s8WkbdGu3EZ/wC+fvD8q0p/gd4oijLJJp0xH8CTsCf++lA/WgD2DRfiJ4Z151istVhWduBDPmJifQbsAn6Zrpa+S9b8La14ccLq+nT2wJwHYZRj6BxlSfxrpfBPxV1TwxLHbXzyX+ljAMTtl4h6ox/9BPH060AfR9FU9J1az1zTYb/Tp1ntplyjr+oI7EdCKuUALRSUtAGB4w8I2PjHRnsrxdkq5a3uAMtC/qPUHuO/1wR8yatpWoeF9cksrxWgvLVwQyMR7qyn06EGvrmuE+KngdfFWhm7s486pZKWi2jmVOpj/qPfjuaAJ/hp45Xxhomy6ZRqloAtwvTzB2kA9+/ofqK7Wvkzwp4jufCniG21O1yfLbbLHniSM/eU/wCeCAe1fVVhfQanp9ve2kgkguIxJGw7qRkUAWKKKKAIru6isrOa6uHCQQRtJIx/hVRkn8hXyd4l1yfxL4hvNUuM7riQlV/uL0VfwAAr3H42a6dL8GrYRPibUpfL9/LX5m/XaP8AgVeWfCrw+PEHjm1Eq7rez/0qUHodpG0fixXj0zQB7b8N/Cg8J+E4IJU23tx+/uj3DkcL/wABGB9cnvXWUlFAC0UUlAC1zHxA8Wp4P8MTXibWu5D5Nqh5zIR1I9AMn8h3rp6+fvjlrLXvjCLTVY+Vp8IBX/bf5if++dn5UAcLZWeo+J9djt4N91f3sp5Y5LMeSxP5kmvo3wR8O9M8HWiOqLcaky/vbthz7hP7q/qe/tyPwJ8NpDpt1r0yZmnc28BI6IuNxH1bj/gNet0ALRRSUAR3NrBeW7291DHNDINrxyKGVh6EHg14N8UPhgPDitq+iox0wtiaEkk25PQg91PTnofrXv1Q3drDe2k1tcxrJBMhjkRujKRgj8qAPnj4T+NX8Na+lhdSf8Sy/cI4J4ikPCuPTsD7c9hX0ZXyT4m0V/DviS/0tyT9mmKKx6svVT+KkGvpbwFrLa/4J0u+kYtK0Plyk9S6HaT+JXP40AdDRRRQAUlFLQB85/F/woPD/ik3lrHtstRzKoA4ST+NfzIP/Avauw+BXic3NhdeH7h8vbZntsn+An5l/BiD/wACPpXW/FDw+PEHge9RE3XNqPtUPrlRyPxXcPrivn/wXrh8OeLtO1HdiKOULN7xt8rfoSfwFAH1dRQCCMg5FFAHz78ctVN540isVY7LG3VSvo7/ADE/kU/Kuu+A+kC38PX+qOuHu5xEpP8AcQdvxY/lXlHju+/tHx1rNxu3Kbt0VvVVO0foBX0L8N7Aad8PdFiA+/biY/WQl/8A2agDp6SlpKAFpKKKAA18t/EeVpviFrTP1FyV/AAAfoK+pK+avi7p7WHxFv2KkJchJ09wVAP/AI8rUAe1/DCFIPhzoyp0MJc/UuxP6muqrgfgxqyah4Chtt2ZbGV4XB64J3qfphsfhXfUALSUUUALSUtJQB86/GuFIviFK6/eltonb64I/kBXovwOlaTwG6t0jvZFX6bUP8ya8m+J+rJrHxA1OaFt0MTi3Q9vkAU/huDV7R8IdObT/h3YmRSr3LPOQfQthfzUA/jQB29FJS0AJS0lFAAQCMHkHqK+S/Fek/2F4q1LTgCEt7hljz/czlf/AB0ivrSvnn432ItfHvngf8fdrHKT7jKfyUUAeyeAdUOteBtIvGJZzAI3J6lk+Qn8SuaK4r4NeI7ez8Fy213KqmO8cIC2PlKqf5k0UAeGu7SOzuSWYkknua+vNFgFtodhAOkVtGg/BQK+Qq+w7Bg+n2zDoYlP6CgCxRRSUALRSUUALXl3xv8ACz6nokGtWse6bT8rMAOTCe//AAE/oxPavUaZJGksbRyKrowKsrDIIPUEUAfMvw38Znwb4h82fc2n3IEdyqjJA7OB6qT+RNfS9rdQ3ttHcW0qTQyqGSRDlWB6EGvnr4k/DS48L3cmoaZE8ujyNnI5NsT/AAt/s+jfgeeuV4O+IuseDm8q3ZbiwLZa0lPy57lT1U/Tj1BoA+oKK850r43eGr2Nft/2rT5MfMJIzIufYrkn8QK0pvi74NijLDVzIR0VLaXJ/NcUAdpXDfE3x5F4S0Z7a1lB1a6QrCgPMSngyH0x29T7A1yHiX4774ng8N2TxsRgXN0Blf8AdQZH4k/hXlarqfibWgB599qN2/8AvO7f4AfgAPQUATeGdBufFHiG10y2zunf53xnYnVmP0FfWFnaxWNnBa26BIYI1jjUfwqowB+QrkPhx4Ai8Gaa0lxsl1S5A8+QchB1CL7ep7n6Cu0oAWikpaACikooAWvEf2gIAupaLP3eGVP++WU/+zV7bXi/7QTAzaCvcLOf1j/woA8jhvLi3QrDKyKTnAPeioaKALmr2DaXrV9Yt962neE/8BYj+lfVHhO6+2+ENHuM5MllCx+uwZ/Wvnv4r6f/AGd8RdTAXCTstwp9dygn/wAe3V7D8HNSGofDy0j3bns5JLdvz3D9GFAHdUUUlAC0UUlAC0lLXiPxb+JMk88/h3RJikCEpezoeZD3jU/3R0Pr06ZyAbXjj4yWOm+dp+gxRahcYKSTycwL2IA/j7+316V4XPM1xcSTMqK0jFisaBFBPoo4A9hXQ+DfA2p+NL4xWaiK1jI866kHyR+w9W9vzwOa988L/DnQPC0aNb2i3F4vJurgB3z/ALPZfw/M0AfPGn+DvEGqIr2WjX0sbdJBCwQ/8CPFXpfht4thTe+hXZH+wAx/IHNfUdFAHx7e6deabN5V/aXFrJ/cnjZD+RFdH4F8e3Hgm7kaOytrmCY/vQyBZceiydR06HI9u9fTF7YWupWzW99bQ3MLdY5kDqfwNeTeNvgpE8cl94VzHIPmaxdsq3+4x6H2PHuOlAHo3hjxbpfi3T/tWlz7iuBLC+BJEfRh/XofWtuvkfR9Y1LwrrS3lk7213AxV0cEZ5+ZHX045H9a+mvB3iu08YaDFqFr8kn3J4ScmJ+49x3B7j8RQBvUUUUAFFJS0AFeD/Hy63+JtNts58q08z6bnI/9lr3evmX4rakNT+ImplGzHbstuvtsUBh/31uoAXwh4Bn8U6VLexNhY5zF+IVT/wCzUV7B8HLD7B8PLR2Xa93LJOQfrtH6KKKAOR+PmjESaXrKKcENayt2GPmT+b/lVX4Da2INW1DR5XwtzGJ4gTxvThgPcqc/8Br1Hx34f/4Sbwff6eihpynmQf8AXReV/Pp+NfM2g6vP4e8QWepQg+bazByvTcOjKfqMj8aAPrqkqCwvYNSsILy1fzILiNZI2HdSMip6AFpKWkoA5D4neK28K+Eppbd9t9dHyLcg8qSPmf8AAfrivnrwx4euvFXiC20y14aZsvIRkRoOWY/QfmcDvXafHPV2vPGEOnKx8uwtwCvo7/MT/wB87PyrqfgRoK2+jXutSJ+9upPIiJHSNeTj6sf/AB0UAek6Jotl4f0mDTtOiEdvCMAd2Pdie5Pc1epaSgBaSlpKAFpKWigDyf4yeA47yxk8R6bEBdQDN2qj/WRj+P6r39vpXn3wv8Vt4X8Ww+bJtsb0iC5BPAyflf8A4CT+RNfS0sSTRPHKgeN1KsrDIIPUGvk3xVop8PeKNR0znbbzFUJ6lDyp/wC+SKAPrSlrn/AurtrvgnSr52LSPAEkY9S6HYx/EqTXQUAJS0lLQBS1jU4tG0e81G4/1VrC0pGcZwMgfUnivko/adY1XvLd3k34u7t/Umvavjp4lFrpNtoED/vbsiacDtGp+UH6sM/8Arjfgz4dOseMlvpEzbaYvnNkcGQ5CD88t/wGgD37SdOj0nSLPT4uY7WFIVPqFAGf0oq3RQAV86fF/wAKHQPFTX1umLLUSZVwOEk/jX8zn8favousPxj4Yt/Fvhy402fCuw3wSn/lnIPut+uD7E0AedfBDxiHhfw1eyfOm6WzJPUdXT8OWH1b0r2GvkSWLUPDWuMj+Za6hYzdR1R1PBHr/IivpTwF40tvGehrcKVjvYQEuoQfut/eH+ycHH4jtQB1FJS0UAfO/wARPBfiS58e300WnXd7HeTb4JoYy67SAApI+7tHHOOmele2eDNDPhvwjp2mOQZYIv3uDkb2JZsH0yTW5SUALSUtFABSUtFABRRRQAleI/GTwVql14kTWNLsLi7huYlSUQRl2WReOQOcFdvPsfavb6SgDivhPomp6F4KS31ZWilkneWOF/vRIQMKR2JIJx/tetdtRRQAlVNV1S10XS7nUL6Ty7a3Qu7e3oPcngD1NW6+ffi34/HiK/8A7I0uXdplo+XkU8TyDjOe6jnHryeeKAOL8R65c+J/EF1qd0D5lw+VQc7F6Ko+gwK+i/ht4V/4RTwlBbzJtvbj9/c+ocjhf+AjA+uT3ry74N+CDq+rDXb6M/YbJ/3KsOJZh0/Bev1x7177QAlFFFABRRS0AecfFX4ef8JNZ/2ppcY/tW3TDIv/AC8IO3+8O3r09MeI+HfEOoeE9bj1CwfZNGdrxsPlkXujD04/Dr1FfWteXfE34WLrhl1jQY1TUfvTwDgXHuPR/wCf16gHZeEfGGneMdKF3YPtlTAnt2Pzwt6H1B7Hv9cgb1fI2latqfhfWBdWMstreQMUYEY78qynqOOQa9+8D/FTTPFSx2l6UsdUOB5TN8kp/wBgn/0E8+metAHeUlFFAC0lLRQAlFLRQAUlLRQAlFLRQAlFVNU1Wx0Wxe81K6itrdOskhwPoPU+w5rwjx/8W7rxEsunaL5lppjfLI5OJZx3zj7q+3fv1xQBsfFL4pLcpNoXh6fdC2UurtDw47oh9PU9+g468J4G8F3fjTWhbxbo7OLDXNwBxGvoP9o9h+PQUeC/A2peNNQ8u1Uw2cbAT3TL8sfsPVvb88CvpPw/4fsPDOkxadpkXlwx8knlpG7sx7k//WGAAKALOm6da6Rp1vY2MSw21ugSNB2A/me5Pc1aoooASiiigAoopaACkpaSgDi/HPwz03xijXKEWeqAfLcovEmOgcd/r1HuOK8B8R+FNW8KXv2fVbVo8k+XKvMcg9Vbv9Oo7gV9Z1WvrC11O0e1vreK4t5B80cqhlP4GgD578KfF/XPDypb3x/tOyXgJMxEiD/Zfr+Bz+FeveH/AIoeGvECqkd8LS5b/lhd4jbPsfun8DmuS8T/AAKtbgvP4bu/srnn7NcEtH+D/eH45+teWa74L1/w4zf2npk8UQ/5bKN8Z/4EuR+fNAH1cCCAQeD3or5L0nxVrmhYGmapd26A58tZCU/75PH6V1tj8b/FNqMXH2G89TNBtP8A44VH6UAfQ9FeIwftAXij/SNCt3P+xcMn8wamb9oKQj5fDyA+94T/AOyUAe00leEXXx81l8i10vT4v+um98fqK5zU/it4t1NWQ6q1tGf4bVFjx9GA3frQB9HanrGn6Lb+fqd7b2kfZppAufYDufYV5p4l+Olhah4fDtq15L0FxOCkQ9wv3m/HbXiub7WL3/l4vbuU/wC1JI5/Umu38PfBnxFrBWS/VNLtzzun+aQj2Qc/99EUAcnrniPVfE999p1a7luZOiKeFT2VRwPwruvBHwbv9XaO98QiSxsc7hARiaUfT+AfXn2716h4V+G2g+E9k1tb/ab1f+Xq4wzg/wCyOi/hz7mutoAq6bptppFhFZafbx29tEMJHGMAf4n1J5NWaKWgBKWkpaAEooooAKKKKAFpKKKACiiigBaTGRRRQBz2q+AfDOtMTe6Nal2OTJEvlMT6kpgn8a4nxF8G/DlnZy3VrLqERVSQgmUr+qk/rRRQB4leQrb3csSElUYgE9ahoooA7HwF4QsfFN2Yr6W5jUf88WUH9Qa9g0/4OeErDDSWc1469DcTMf0XAP5UUUAddp2k6fpMXlabZW1pGeqwRKgP1x1q3RRQAUtFFACUUUUAFLRRQAlFFFAH/9k="
        });
        if(newUser){
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();
            return res.status(201).json({message:"User Registered Successfully"})
        }
        else    res.status(400).json({message:"Invalid User Data"})
    }
    catch(e){
        console.log(e);
        return res.status(500).json({message:"Internal Server Error Occur"})
    }
}

export const logoutController = (req,res)=>{
    try{
        res.cookie("jwtToken","",{maxAge:0});
        return res.status(200).json({message:"User Logged Out Successfully"});
    }
    catch(e){
        console.log(e);
        return res.status(500).json({message:"Internal Server Error Occur"})
    }
}