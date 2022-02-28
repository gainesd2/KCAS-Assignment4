let dogs =[
    {name:"Pepper", id:23328,sex:"Female",age:"2Yrs 3Mths 1Wks",status:"Spayed/Neutered",breed:"American Pit Bull cross",pic:"http://kentoncountypets.shelterbuddy.com/photos/lostfound/71168_th_600.jpeg"},
    {name:"Hattie", id:23989,sex:"Female",age:"1Yrs 6Mths 2Wks",status:"Spayed/Neutered",breed:"American Pit Bull cross",pic:"http://kentoncountypets.shelterbuddy.com/photos/lostfound/71438_th_600.jpg"},
    {name:"Jimmy", id:24104,sex:"Male",age:"9Mths",status:"Spayed/Neutered",breed:"American Pit Bull cross",pic:"http://kentoncountypets.shelterbuddy.com/photos/lostfound/71509_th_600.jpeg"},
    {name:"Freya", id:23867,sex:"Female",age:"1Yrs 7Mths 1Wks",status:"Spayed/Neutered",breed:"Blue Heeler Cross",pic:"http://kentoncountypets.shelterbuddy.com/photos/lostfound/71366_th_600.jpeg"},
    {name:"Kimbo", id:23879,sex:"Male",age:"1Yrs 7Mths 1Wks",status:"Spayed/Neutered",breed:"Boxer mixed Mastiff",pic:"http://kentoncountypets.shelterbuddy.com/photos/lostfound/71369_th_600.jpg"},
    {name:"Quarterback", id:24142,sex:"Male",age:"3Yrs 6Mths",status:"Spayed/Neutered",breed:"Boxer mixed Mastiff",pic:"http://kentoncountypets.shelterbuddy.com/photos/lostfound/71541_th_600.jpg"},

]
function dog(){
    for (dog in dogs){
        print("<div class=\"dog\">");
        print("<img class=\"dogimg\"",dog.pic,">");
        print("<h3 class=\"dogname\">",dog.name,"</h3>");
        print("<p class=\"dogbreed\">Breed: ",dog.breed,"</p>");
        print("<p class=\"dogid\">ID: ",dog.id,"</p>");
        print("<p class=\"dogsex\">Sex: ",dog.sex,"</p>");
        print("<p class=\"dogstatus\"Status>",dog.status,"</p>");
        print("<p class=\"dogage\">Age: ",dog.age,"</p>");
        print("</div>");
    }
}
function nextpage(){
    let i=1;
    while(i<4){
        print("<a class=\"page\"href=\"/?page=",i-1,"\">",i,"</a>");
    }
    print("<a class=\"page\" href\","i-1,"\"\\>\\></a>");
}