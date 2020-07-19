<?php
/**
 * XLS parsing uses php-excel-reader from http://code.google.com/p/php-excel-reader/
 */
 
 $servername = "localhost";
$username = "root";
$password = "";
$dbname = "jai_admin";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
	header('Content-Type: text/plain');

	if (isset($argv[1]))
	{
		$Filepath = $argv[1];
	}
	elseif (isset($_GET['File']))
	{
		$Filepath = $_GET['File'];
	}
	else
	{
		if (php_sapi_name() == 'cli')
		{
//			echo 'Please specify filename as the first argument'.PHP_EOL;
		}
		else
		{
	//		echo 'Please specify filename as a HTTP GET parameter "File", e.g., "/test.php?File=test.xlsx"';
		}
		exit;
	}
	$file = fopen($Filepath, "r");
	$pcount = 0 ;
	$i =1;
	  while (($Row = fgetcsv($file, 10000, ",")) !== FALSE)
	  {
		if($pcount>0)
		{
			  if($pcount==1) {
				print_r($Row);exit;
			  } 
			   //exit;
			   echo "\n";

			   if(!empty($Row[8]) && !empty($Row[1]))
			   {
				   $namecat  =$Row[8] ; 
				   $imgcat  = $Row[1] ; 
				   
				   $sql = "SELECT * FROM  pr_category WHERE   name LIKE '%".trim($namecat)."%'";
					   $result= $conn->query($sql);
					   while($rowres = $result->fetch_assoc()) {
						   if($rowres)
						   {
							// echo  " CAT Found ".$namecat; 
							// print_r($rowres); 
							  $catArray  = $rowres['id'];
							  $lcatimg  = $rowres['largeImgName'];									
						   }
						   else
						   {
							  echo "   CAT NOT Found " .$namecat ;  
						   }
					   }	
			   }
			//    else
			   if(!empty($Row[0]) && !empty($Row[1]) && !empty($Row[2]) && !empty($Row[3]) && $Row[12]=="ASSY.")
			   {
				   if($i>0)
				   {	
					  // echo trim($Row[1]);
					 // echo $i;
					   $sql1 = " SELECT * FROM  pr_product WHERE   code  LIKE '%".trim($Row[2])."%'";
					   $result1= $conn->query($sql1);
					   $rowres = $result1->fetch_assoc();
					   if(empty($rowres1))
					   {
						  
						// echo "Not Found". ($Row[2]);
						   
						   //insert in to product 
						   $sql  = "insert into pr_product set  
						    name  ='".trim($Row[1])."
						   ',code  ='".trim($Row[2])."
						   ',shortDesc  ='".trim($Row[1])."
						   ',longDesc =''
						   ,smallImgUrl  =''
						   ,smallImgName  =''
						   ,smallImgLang  =''
						   ,smallImgAltText =''
						   ,largeImgUrl  ='".$lcatimg."'
						   ,largeImgName  ='".$lcatimg."'
						   ,largeImgAltText  ='".$lcatimg."'
						   ,suitableFor =''
						   ,particuler ='".$Row[4]."
						   ',dealerCurrency =''
						   ,customerCurrency =''
						   ,unitCurrency =''
						   ,mrpCurrency  =''
						   ,standardPackaging =''
						   ,shDetails ='".str_replace("&#2013265944;","",mb_convert_encoding($Row[7],'HTML-ENTITIES','UTF-8')) ."
						   ',descriptionSize =''
						   ,size =''
						   ,chSize =''
						   ,chPosition ='".$Row[6]."
						   ',section ='".$Row[5]."'
						   ,application =''
						   ,partNumber  ='".$Row[3]."
						   ',smallImgType  =''
						   ,items =''
						   ,packQty =''
						   ,mrpPrice =''
						   ,unitPrice =''
						   ,customerPrice ='',
						   dealerPrice =''"
						   ;
						   echo $sql.";";
						   //$conn->query($sql);
						 
					   }
					   else
					   {

						 // echo  ' Found'. $Row[2];
					   }
				   }
				   $i++;
			   }
			  
			   $sql1 = " SELECT * FROM  pr_item WHERE   code  LIKE '%".trim($Row[1])."%'";
			   $result1= $conn->query($sql1);
			   $rowres1 = $result1->fetch_assoc();
			   if(empty($rowres1))
			   {
					echo "item not found". trim($Row[1]);
				   $code = $Row[1];
					$sku = $code."".rand(10,1000);
					$sql2  = "insert into pr_item set  
					name  ='".$Row[2]."'
					,code  ='".$code."'
					,partNumber  ='".$Row[3]."'
					,dbp  ='".$Row[19]."'
					,dbpCurrency  ='".$Row[19]."'
					,mrpCurrency  ='".$Row[20]."'
					,mrp  ='".$Row[20]."'
					,smallImgUrl  =''
					,sku  ='".$sku."'
					,inStock  ='1'
					,minOrderQty  =''
					,maxOrderQty  =''
					,smallImgType  =''
					,productId = ''
					,smallImgName  =''
					,smallImgLang  =''
					,smallImgAltText =''
					,largeImgUrl  =''
					,largeImgName  =''
					,largeImgAltText  =''
					,specialNotes = ''
					,source = ''
					,shortDesc  ='".$Row[1]."'
					,shippingCode = ''
					,longDesc =''
					,lang =''
					,estimateShipTime =''
					,creator =''
					,attribute =''
					,lengthUnit =''
					,length =''
					
					";
					
					$conn->query($sql2);
						
					
			   }
			   else
			   {
				  $name = $Row[12]; 
				  $largeImg = "";
				  $largeImgUrl = "";
				  $smallImgName = "";
				$sql = "update  pr_items set  productId ='".$rowres['id']."',   name ='".$name."',  largeImgName='".str_replace(" ","",$largeImg)."',largeImgUrl='".str_replace(" ","",$largeImgUrl) ."',smallImgName='".str_replace(" ","",$smallImgName) ."' where id='".$rowres1['id']."'";
				  //$conn->query($sql);
				  echo "item found". trim($Row[1]);
			   }



        /////////


		}
		$pcount++;
		  
		}


?>
