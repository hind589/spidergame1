var spiders=[];

var fires=[];
var nbFire=0;
var spiderkilled=0;
var level=1;
var bonus=100;
var sound=false;
var music=true;







var tabo=0;


document.addEventListener('keyup', function(event) {
    
    if (event.keyCode ===37) {
      left-=3
       move()
   
  }
    if (event.keyCode ===39) {
        console.log('right');
        left+=3
      move()
      }
      var initialfire=150;
      if (event.keyCode === 32) {
      
        if( nbFire<initialfire   ){
        initialfire+=tabo;
        creatfire()

        nbFire++;
        console.log("nbFire:"+nbFire);
       
        initialfire=initialfire-nbFire;
        console.log("initial:"+initialfire);
        document.getElementById('nbfire').style.color="red";
        document.getElementById('nbfire').innerHTML=initialfire;
        setTimeout(()=>{document.getElementById('nbfire').style.color="white"},500)
        
        if (sound==false){
         
          var soundshot = document.getElementById("myshot");
            soundshot.play();
              }


       
      


         
  }
      
    }
      
  });

  var left=45;

  function move(){

 // console.log(left)
    document.getElementById('rocket').style.left=left+"%"
 
}



var spiderid=1;
var fireid=1;

function creatspi(){
     var spider=document.createElement('img');
     var leftp=Math.floor(Math.random()*45)+25
     spider.src="spider.png"
     spider.style.top=7+"%"
     spider.style.left=leftp+"%"
     spider.setAttribute("class","spider");
     spider.setAttribute("id","spider"+spiderid);
     document.body.appendChild(spider)
     spiders.push(spider)
     spiderid++;
   
  }


  function creatfire(){
    var fire=document.createElement('img');
    fire.src="fire.png"
    fire.style.top=45+"%"
    var offsetParentWidth =document.getElementById('rocket').offsetParent.offsetWidth;
    var leftPosition = (document.getElementById('rocket').offsetLeft / offsetParentWidth) * 100;
   
    fire.style.left=(leftPosition+4)+'%';
    fire.setAttribute("class","fire");
    fire.setAttribute("id","fire"+fireid);
    document.body.appendChild(fire)
    fires.push(fire)
    fireid++;
  
 }

 
 var clicked =document.getElementById("voixon");
  var soundshot = document.getElementById("myshot");
  
  function clicksound(){
  
  if (sound==true){
    document.getElementById('voixon').src="voix-on.png";
  

  }
  else{
    document.getElementById('voixon').src="voix-off.png";

  }  
  
  sound=!sound;
  }



  var audio = document.getElementById("mymusic");
  var playButton = document.getElementById("musicon");
setTimeout(()=>{
audio.play();
},2000)
  
  function clickmusic(){
    if (music==true){
  
      document.getElementById('musicon').src="musicoff.png"; 
       
        audio.play();
                
      
       music=false;
    }
    else{

      document.getElementById('musicon').src="musicon.png";
      audio.pause();
      music=true;
    }
  }

  var myInterval=null;
  var acceleration=1;
function repter(){
  
   myInterval=setInterval(()=>{
    console.log(acceleration)
    var randome=Math.random()*200
    if(randome>179){
           creatspi()
        }
    for(var i=0;i<spiders.length;i++){

      var topp=spiders[i].style.top.split("%").join('');
      var topi=parseInt(topp)
      if(topi<70){
             topi+=acceleration;
       spiders[i].style.top=topi+"%"
    }
    else{
       
      Swal.fire({
        title: "Game Over! Restart'?",
        width: 600,
        padding: "3em",
        top :"0.1%",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        backdrop: `
          rgba(0,0,123,0.4)
           
           
          
          url("Spiderweb.gif") center top no-repeat `,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Restart',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
            // Reload the page
            location.reload();
        }
        else {
           alert( "are you sure you want to quit ")
          window.close();
        }
    });
    
      clearInterval(myInterval);
      
      
    }
    
    }
},200)

}    
 
  


test()


function test(){
  setInterval(()=>{
    for(var i=0;i<spiders.length;i++){
      for(var j=0;j<fires.length;j++){
        var topp=spiders[i].style.top.split("%").join('');
        
        var topi=parseInt(topp);
        var leftspider=parseInt(spiders[i].style.left.split("%").join(''));
        var leftfire=parseInt(fires[j].style.left.split("%").join(''));
        var pp=fires[j].style.top.split("%").join('');
      
if((parseInt(pp)<topi) && (leftfire>leftspider && leftfire < leftspider+7)){
  

   
  document.body.removeChild(fires[j])
  fires.splice(j,1)
  document.body.removeChild(spiders[i])
 
  spiderkilled++;
  document.getElementById('nbspiderkilled').style.color="green";
  document.getElementById('nbspiderkilled').innerHTML=spiderkilled;
  setTimeout(()=>{document.getElementById('nbspiderkilled').style.color="white"},500)
  spiders.splice(i,1)
}
                                      }
                                    }
  },50)
  }    









  function changelevel(){
   
  }

var killernum=10;




   

function repterfire(){
  
  setInterval(()=>{ 
    
    if ( spiderkilled>=killernum  ){
      level+=1;
      document.getElementById('level').innerHTML="LEVEL:" +" " +(level);
      clearInterval(myInterval)
     acceleration+=1.5;
     tabo+=30;
     killernum+=15
     repter()
    
    }
     
      for(var i=0;i<fires.length;i++){
  
        var pp=fires[i].style.top.split("%").join('');
        var ppi=parseInt(pp)
        if(ppi>5){
               ppi-=3;
        
         fires[i].style.top=ppi+"%"
      
      }
      else{
      document.body.removeChild(fires[i])
      fires.splice(i,1)
  }
         
  }
   
  },50)
 
  
  } 
 

  function start(){
    creatspi()
    repter()
    repterfire()
    changelevel()
    clickmusic()
    document.getElementById("st").style.display="none"
  }