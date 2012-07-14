/**this version uses 2 canvasses to hopefully grab the mask data faster
 * @author d
 */

/**
 * adds a transparency mask to the target img id. if canvas is not supported, the original image will be displayed instead without transparency 
 * @param id	 the img tags id
 * @param imgpath	 the source image. if set to default, takes it from the <img src="..."> 
 * @param maskpath   the alpha mask to apply. if set to default it will look for the source image with ajpgm_ prefixed to it
 * 
 */
function ajpg( id, imgpath, maskpath){
	
	//create canvas to work with
	var canvas = document.createElement('canvas');
	var canvas2 = document.createElement('canvas');
	var ctx    = canvas.getContext('2d');
	var ctx2    = canvas.getContext('2d');
	if(!(canvas.getContext && ctx)){
		console.log("no canvas support");
		return;}//checks canvas support
	
	//handle input 
	imgpath  = typeof imgpath !=='undefined' ? imgpath : document.getElementById(id).src;//uses img path if specified otherwise grabs it from the element src
		var filename=imgpath.split(/(\\|\/)/g).pop();//gets filename and path data for deciphering default mask path 
		var path= imgpath.replace(/[^\/]*$/,'');
	maskpath = typeof maskpath !=='undefined' ? maskpath : path+"ajpgm_"+filename;//uses specified mask path or default if none
	console.log("id:\t"+id+"\nimg:\t"+imgpath+"\nmask:\t"+maskpath)
	
	//create some vars to work with
    var img = new Image(); // Create a new blank image.
    	//img.onload = function(){}//make sure it loads before grabbing HxW
    	img.src=imgpath;
    	var imgH=img.height;
    	var imgW=img.width;
    	var imgL=imgH*imgW;//number of chunks to go through (pixel by pixel)
    	console.log("h:"+imgH+' w:'+imgW+" l:"+imgL);
    
    //set canvas to propper size
    canvas.height=imgH;
    canvas.width=imgW;
    canvas2.height=imgH;
    canvas2.width=imgH;
    
    
    //load mask to context and grab red channel to alpha array
    var alphaA=new Array();//--alpha array holds the alpha channel data
    var mask = new Image();
   mask.onload=function(){
    	ctx2.drawImage(mask,0,0);	
    	 var imgDataM=ctx2.getImageData(0,0,imgW,imgH);
    	 //console.log(imgData);
    	 //alphaA=put(imgData);
    	 //console.log(alphaA);
    	 
    	 ctx.drawImage(img,0,0);
    	 var imgDataO=ctx.getImageData(0,0,imgW,imgH);
    	// var k=0;
    	 for(var i=0;i<imgL*4;i+=4){
    		 imgDataO.data[i+3]=imgDataM.data[i];
    		 //k++;
    	 }
    	 ctx.putImageData(imgDataO,0,0);
    	 document.getElementById(id).src=canvas.toDataURL("img/png");
    }
    mask.src=maskpath;//load mask data
    
    
    //read mask data to alpha Array
   function put(d){
	   var a=new Array();
	   for(var j=0;j<(d.height*d.width);j+=1){
		   a[j]=d.data[(j*4)];
	   }
	   return a;
   }
	
	

	

    
    //show canvas for debugging
   // document.body.appendChild(canvas);
  //  document.body.appendChild(canvas2);

    

	
	
	
	
	
}

function isCanvasSupported(){
	  var elem = document.createElement('canvas');
	  return !!(elem.getContext && elem.getContext('2d'));
}
function test(){
	alert("test works");
}

