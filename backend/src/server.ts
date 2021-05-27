import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import user from './model/user';
import predmet from './model/predmet';
import planAng from './model/planAng';
import myfile from './model/myfile';
import e from 'express';
import obavestenje from './model/obavestenje';

const app = express();
app.use(cors());
app.use(bodyParser.json());

///////////////////////////////////////MULTER i file upload////////////////////////////////////////////////////////////
//multer za FormData format, ono djubre indijsko angular-file-uploader salje kao FormData i bodyparser to ne moze handluje pa se koristi multer
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
const upload = multer({ storage: storage });
//dodaj jos neki ako os
//const download = multer({ storage: storage }).single('img');

app.post('/upload', upload.single('file'), (req, res) => {
    // req.file is the `file` file
  // req.body will hold the text fields, if there were any - al ovo je iz forme, vidi da iskoaps tvoje additional params
    //console.log(req.body.par);
    let ime = req.body.ime;
    let prezime = req.body.prezime;
    let naziv = (req as any).file.filename; //isto ko i originalname
    console.log("Upload: " + naziv);
    let velicina = (((req as any).file.size)/1000).toString();
    let mimtip = (req as any).file.mimetype;
    let result = naziv.split('.');
    let tip = result[1];
    
    let date = new Date();
    let datumStr = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();

    let fajl = new myfile({"tip":tip, "datum":datumStr, "ime":ime, "prezime":prezime, "velicina":velicina, "naziv":naziv, "prioritet":0});

    myfile.collection.findOne({"naziv":naziv},(err,f)=>{
        if(f==null){
            fajl.save().then(f =>{
                res.json({"ret":"ok"});
            }).catch(err => {
                res.json({"ret":"not"});
            });
        } else {
            console.log("duplikat fajla");
            res.json({"ret":"dup"});
        }
    })

  });

  app.post('/download', (req,res)=>{
    let filename = req.body.filename;
    console.log("Skidam "+ filename);
    myfile.findOne({"naziv":filename},(err,f)=>{
        if(f!=null){
            console.log("SKIDAM POST");
     res.sendFile(req.body.filename, { root: "./uploads/"});
        } else res.json({"ret":"notfound"});
    })
  })

  app.get('/download/:filename', (req,res)=>{
    let filename = req.params.filename;

    myfile.findOne({"naziv":filename},(err,f)=>{
        if(f!=null){
            console.log("SKIDAM GET");
            res.sendFile(req.params.filename, { root: "./uploads/"});
        } else res.json({"ret":"notfound"});
    })

  })

  app.post('/uploads', upload.array('photos', 5), function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })
   
//   var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
//   app.post('/cool-profile', cpUpload, function (req, res, next) {
//     // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
//     //
//     // e.g.
//     //  req.files['avatar'][0] -> File
//     //  req.files['gallery'] -> Array
//     //
//     // req.body will contain the text fields, if there were any
//   })
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

mongoose.connect("mongodb://localhost:27017/projekat");

const conn = mongoose.connection;

conn.once('open', () => {
    console.log("ocepljeno")
})

const router = express.Router();

router.route('/login').post((req,res)=>{
    let username = req.body.username;
    let pw = req.body.password;

    user.findOne({"username":username, "password":pw},(err,usr)=>{
        if(err)
        console.log(err);
        else {
            //user.collection.updateOne({"username":username}, { $inc : { pwchg: 1 }});
            res.json(usr);}
    })
});

router.route('/setNovaLozinka').post((req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let newpw = req.body.newpw;

    user.collection.updateOne({"username":username}, { $inc : { "pwchg": 1}, $set : {"password":newpw}});
    // user.findOne({"username":username, "password":newpw},(err,user)=>{
    //     if(err)
    //     console.log(err);
    //     else res.json(user);
    // })
    res.json({});

})

router.route('/registracija').post((req,res)=>{
    let username = req.body.username;
    user.collection.findOne({"username": username}, (err,u)=>{
        if(u == null){
            let us = new user(req.body);
            us.save().then(user=>{
                res.status(200).json({"user":"ok"});
            }).catch(err=>{
                res.status(400).json({"user":"no"});
            })
        } else {
            res.json({"greska":"Korisnicko ime vec postoji"})
        }
    })
    
})

router.route('/dohvatiKorisnikePoTipu').post((req,res)=>{
    let type = req.body.type;
    user.find({"type":type},(err,usrs)=>{
        if(err)console.log(err)
        else {
            res.json(usrs);
        }
    })
})

router.route('/dohvatiSvePredmeteSmera').post((req,res)=>{
    let smer = req.body.smer;
    console.log(smer);
    predmet.find({"odsek":smer},(err,predmeti)=>{
        if(err)console.log(err)
        else {
            res.json(predmeti);
        }
    })
})

router.route('/dohvatiPredmetPoSifri').post((req,res)=>{
    let sifra = req.body.sifra;
    console.log(sifra);
    predmet.findOne({"sifra":sifra},(err,pred)=>{
        if(err)
        console.log(err);
        else {
            //console.log(pred);
            res.json(pred);
        }
    })
})

router.route('/dohvatiPredmetPoSifriIOdseku').post((req,res)=>{
    let sifra = req.body.sifra;
    let odsek = req.body.odsek;
    console.log("dohvatiPredmetPoSifriIOdseku");
    predmet.findOne({"sifra":sifra, "odsek":odsek}, (err,pred)=>{
        if(err)
        console.log(err);
        else {
            //console.log(pred);
            res.json(pred);
        }
    })
})

router.route('/dohvatiSveKorisnike').get((req,res)=>{
    user.find({},(err,korisnici)=>{
        res.json(korisnici);
    })
})

router.route('/dohvatiKorisnikaPoUsername').post((req,res)=>{
    let username = req.body.username;
    console.log("dohvatam korisnika " + username);
   // console.log("dohvatiKorisnikaPoUsername"+ username);
    user.findOne({"username":username},(err,us)=>{
        if(err)
        console.log(err);
        else res.json(us);
    })
})

router.route('/obrisiKorisnika').post((req,res)=>{
    let username = req.body.username;
    user.deleteOne({"username":username}, (err)=>{
        res.json({"por":"ok"});
    });
})

router.route('/azurirajKorisnika').post((req,res)=>{
    let username = req.body.username;
    console.log("azuziranje korisnika " + username);
    let  mail = req.body.mail;
    let password = req.body.password;
    let  pwchg = req.body.pwchg;
    let  name = req.body.name;
    let  lastname = req.body.lastname;
    let  address = req.body.address;
    let phone = req.body.phone;
    let title = req.body.title;
    let office = req.body.office;
    let  status = req.body.status;
    let  picture = req.body.picture;
    let  bio = req.body.bio;
    let  website = req.body.website;
    let  type = req.body.type;

    user.updateOne({"username":username},{"mail":mail, "password":password, "pwchg":pwchg, "name":name, "lastname":lastname, "address":address, 
                    "phone":phone, "title":title, "office":office, "status":status, "picture":picture, "bio":bio, "website":website, "type":type},(err,us)=>{
        res.json({"por":"ok"});
    });

})


router.route('/dodajKorisnika').post((req,res)=>{
    let username = req.body.username;
    console.log("dodavanje korisnika " + username);
    
    let noviKorisnik = new user(req.body);

    user.findOne({"username":username},(err,u)=>{
        if(u==null){
            noviKorisnik.save().then(e => {
                res.json({"por":"ok"});
            }).catch(err => {
                res.json({"por":"not"});
            }); 
            //dodas novog ako nema takav
        } else {
            //vec postoji neko
            res.json({"por":"dup"});
        }
    })

})

router.route('/dohvatiSvePredmete').get((req,res)=>{
    predmet.find({},(err,preds)=>{
        res.json(preds);
    })
})

router.route('/obrisiPredmet').post((req,res)=>{
    let sifra = req.body.sifra;

    predmet.deleteOne({"sifra":sifra}, (err)=>{
        res.json({"por":"ok"});
    });

})

router.route('/dohvatiSveZaNastavnika').post((req,res)=>{
    let username = req.body.username;

    console.log("dohvatiSveZaNastavnika " + username);
    planAng.find({"username":username},(err,sve)=>{
        if(err)
        console.log("Neuspesno dohvatiSveZaNastavnika");
        else 
        res.json(sve);
    });
})

router.route('/azurirajPredmet').post((req,res)=>{
    let naziv = req.body.naziv;
    console.log("azurirajPredmet" + naziv);
    let tip = req.body.tip;
    let odsek = req.body.odsek;
    let semestar = req.body.semestar;
    let godina = req.body.godina;
    let sifra = req.body.sifra;
    let fond = req.body.fond;
    let espb = req.body.espb;
    let cilj = req.body.cilj;
    let ishod = req.body.ishod;
    let predavanjaTerm = req.body.predavanjaTerm;
    let vezbeTerm = req.body.vezbeTerm;
    let dodatno = req.body.dodatno;
    let predavanjaMat = req.body.predavanjaMat;
    let vezbeMat = req.body.vezbeMat;
    let  ispitniRokovi = req.body.ispitniRokovi;
    let laboratorija = req.body.laboratorija;
    let dodatnoLab = req.body.dodatnoLab;
    let domaci = req.body.domaci;
    let dodatnoDom = req.body.dodatnoDom;
    //console.log(dodatnoDom + "!!!!!!!!!!!!!");

    predmet.updateOne({"sifra":sifra},{"naziv":naziv, "tip":tip, "odsek":odsek, "semestar":semestar, "godina":godina, "fond":fond, "espb":espb, "cilj":cilj, 
                        "ishod":ishod, "predavanjaTerm":predavanjaTerm, "vezbeTerm":vezbeTerm, "dodatno":dodatno, "predavanjaMat":predavanjaMat,
                        "vezbeMat":vezbeMat, "ispitniRokovi":ispitniRokovi, "laboratorija":laboratorija, "dodatnoLab":dodatnoLab, "domaci":domaci, "dodatnoDom":dodatnoDom}, (err,p)=>{
                            res.json({"por":"ok"});
                        })
})


router.route('/azurirajPredmetAdmin').post((req,res)=>{
    let naziv = req.body.naziv;
    console.log("azurirajPredmetAdmin" + naziv);
    let tip = req.body.tip;
    let odsek = req.body.odsek;
    let semestar = req.body.semestar;
    let godina = req.body.godina;
    let sifra = req.body.sifra;
    let fond = req.body.fond;
    let espb = req.body.espb;
    let cilj = req.body.cilj;
    let ishod = req.body.ishod;
    let predavanjaTerm = req.body.predavanjaTerm;
    let vezbeTerm = req.body.vezbeTerm;
    let dodatno = req.body.dodatno;


    predmet.updateOne({"sifra":sifra},{"naziv":naziv, "tip":tip, "odsek":odsek, "semestar":semestar, "godina":godina, "fond":fond, "espb":espb, "cilj":cilj, 
                        "ishod":ishod, "predavanjaTerm":predavanjaTerm, "vezbeTerm":vezbeTerm, "dodatno":dodatno}, (err,p)=>{
                            res.json({"por":"ok"});
                        })
})

router.route('/dodajPredmetAdmin').post((req,res)=>{
    let naziv = req.body.naziv;
    console.log("dodajPredmetAdmin" + naziv);
    let tip = req.body.tip;
    let odsek = req.body.odsek;
    let semestar = req.body.semestar;
    let godina = req.body.godina;
    let sifra = req.body.sifra;
    let fond = req.body.fond;
    let espb = req.body.espb;
    let cilj = req.body.cilj;
    let ishod = req.body.ishod;
    let predavanjaTerm = req.body.predavanjaTerm;
    let vezbeTerm = req.body.vezbeTerm;
    let dodatno = req.body.dodatno;

    let noviPredmet = new predmet(req.body);

    predmet.findOne({"sifra":sifra},(err,p)=>{
        if(p==null){
            noviPredmet.save().then(e => {
                res.json({"por":"ok"});
            }).catch(err => {
                res.json({"por":"not"});
            }); 
            //dodas novog ako nema takav
        } else {
            //vec postoji neko
            res.json({"por":"dup"});
        }
    })

})

router.route('/dohvatiFajlPoNazivu').post((req,res)=>{
    let naziv = req.body.naziv;
    console.log("dohvatiFajlPoNazivu "+ naziv);
    myfile.findOne({"naziv":naziv},(err,f)=>{
        if(err)
        console.log(err);
        else res.json(f);
    })
})

router.route('/azurirajPrioritet').post((req,res)=>{
    let naziv = req.body.naziv;
    let prioritet = req.body.prioritet;

    myfile.updateOne({"naziv":naziv},{"prioritet":prioritet},(err,f)=>{
        if(err)
        console.log(err);
        else res.json({"por":"ok"});
    })
})

router.route('/dodajUPlan').post((req,res)=>{
    
    let plan = new planAng(req.body);

    plan.save();

    res.json({"por":"ok"});

})

router.route('/dohvatiSvePlanAng').get((req,res)=>{
    console.log("dohvatiSvePlanAng");
    planAng.find({},(err,plans)=>{
        if(err)
        console.log(err)
        else res.json(plans);
    })
})

router.route('/dohvatiSveZaPredmet').post((req,res)=>{
    let naziv = req.body.naziv;
    //zapravo naziv je sifra
    console.log("dohvatiSveZaPredmet");
    planAng.find({"sifra":naziv},(err,p)=>{
        if(err)
        console.log(err)
        else res.json(p);
    })
})

router.route('/odaberiPredmete').post((req,res)=>{
    let predmeti = req.body.predmeti;
    let username = req.body.username;
    console.log('odaberiPredmete');

    user.updateOne({"username":username}, {"predmeti":predmeti},(err,p)=>{
        if(err)
        console.log(err);
        else res.json({"ret":"ok"});
    })
})

router.route('/dodajObavestenje').post((req,res)=>{
    // let id = req.body.id;
    // let naslov = req.body.naslov;
    // let tekst = req.body.tekst;
    // let predmeti = req.body.predmeti;
    // let username = req.body.username;
    // let ime = req.body.ime;
    // let prezime = req.body.prezime;
    // let datum = req.body.datum;
    // let fajlovi = req.body.fajlovi;

    let ob = new obavestenje(req.body);
    ob.save();
    res.json({"por":"ok"});
})

router.route('/dohvatiSvaObavestenja').get((req,res)=>{
    obavestenje.find({},(err,obs)=>{
        if(err)console.log(err);
        else
        res.json(obs);
    })
})

router.route('/dohvatiObavestenjeId').post((req,res)=>{
    obavestenje.findOne({"id":req.body.id},(err,o)=>{
        if(err)
        console.log(err)
        else 
        res.json(o);
    })
})

router.route('/azurirajObavestenje').post((req,res)=>{
    let id = req.body.id;
    console.log(id);
    let naslov = req.body.naslov;
    let tekst = req.body.tekst;
    let predmeti = req.body.predmeti;
    let username = req.body.username;
    let ime = req.body.ime;
    let prezime = req.body.prezime;
    let datum = req.body.datum;
    let fajlovi = req.body.fajlovi;
    console.log("azurirajObavestenje " + naslov);
    obavestenje.updateOne({"id":id},{"naslov":naslov, "tekst":tekst, "predmeti":predmeti, "username":username, "ime":ime,"prezime":prezime, 
                    "datum":datum, "fajlovi":fajlovi}, (err,p)=>{
                        if(err)
                        console.log(err);
                        else
                        res.json({"por":"ok"});
                    })
})

router.route('/azurirajFajloveObavestenja').post((req,res)=>{
    console.log("azurirajFajloveObavestenja");
    let fajlovi = req.body.fajlovi;
    let id = req.body.id;

    obavestenje.updateOne({"id":id},{"fajlovi":fajlovi},(err,p)=>{
        if(err)
        console.log(err);
        else res.json({"por":"ok"});
    })
})

router.route('/obrisiObavestenje').post((req,res)=>{
    let id = req.body.id;
    console.log("brisanje obavestenja " + id);

    obavestenje.deleteOne({"id":id},(err)=>{
        res.json({});
    })

})

router.route('/azurirajDeaktivacije').post((req,res)=>{
    let deacIspitna = req.body.deacIspitna;
    let deacLab = req.body.deacLab;
    let deacDomaci = req.body.deacDomaci;
    let sifra = req.body.sifra;

    predmet.updateOne({"sifra":sifra},{"deacIspitna":deacIspitna, "deacLab":deacLab, "deacDomaci":deacDomaci},(err,p)=>{
                        if(err)
                        console.log(err);
                        else
                        res.json({"por":"ok"});
    })

})

router.route('/obrisiPredmetPlanAng').post((req,res)=>{
    let sifra = req.body.sifra;

    planAng.deleteMany({"sifra":sifra}, (err)=>{
        res.json({});
    })
})



app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));