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
				print_r($Row);
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

	// Excel reader from http://code.google.com/p/php-excel-reader/
	require('php-excel-reader/excel_reader2.php');
	
	#require('SpreadsheetReader.php');

	date_default_timezone_set('UTC');

	$StartMem = memory_get_usage();
 
	try
	{
	
		$Spreadsheet = new Spreadsheet_Excel_Reader($Filepath);
		print_r($Spreadsheet);exit;
		$BaseMem = memory_get_usage();

		$Sheets = $Spreadsheet -> Sheets();

 
		foreach ($Sheets as $Index => $Name)
		{
			 
			$Time = microtime(true);

			$Spreadsheet -> ChangeSheet($Index);

			foreach ($Spreadsheet as $Key => $Row)
			{
				//echo $Key.': ';
				if ($Row)
				{
					/*category condition here check  */
					if(!empty($Row[0]) && !empty($Row[1]) && empty($Row[2]) && empty($Row[3]) )
					{
						$namecat  =$Row[0] ; 
						$imgcat  = $Row[1] ; 
						
						$sql = "SELECT * FROM  pr_category WHERE   name='".trim($namecat)."'";
							$result= $conn->query($sql);
							while($rowres = $result->fetch_assoc()) {
								if($rowres)
								{
									/*$sql = "Update  category set  largeImgName='".str_replace(" ","",$imgcat)."',largeImgUrl='".str_replace(" ","",$imgcat) ."',smallImgUrl='".str_replace(" ","",$imgcat) ."' where id='".$rowres['id']."'";
									if ($conn->query($sql) === TRUE) 
									{
										echo $namecat."---New record updatd successfully"."\n";
									} else {
										echo "Error: " . $sql . "<br>" . $conn->error;
									}*/
									$catArray  = $rowres['id'];
									$lcatimg  = $rowres['largeImgName'];									
								}
							}	
					}elseif(!empty($Row[0]) && !empty($Row[1]) && !empty($Row[2]) && !empty($Row[3]) )
					{
						if($Key>0)
						{	
							echo $Key." insert "."\n";
							$sql1 = "SELECT * FROM  pr_product WHERE   name='".trim($Row[1])."'";
							$result1= $conn->query($sql1);
							$rowres1 = $result1->fetch_assoc();
							if(empty($rowres1))
							{
								
								
								//insert in to product 
								$sql  = "insert into pr_product set  
								name  ='".trim($Row[1])."
								',code  ='".trim($Row[1])."
								',shortDesc  ='".trim($Row[1])."
								',longDesc =''
								,smallImgUrl  =''
								,smallImgName  =''
								,smallImgLang  =''
								,smallImgAltText =''
								,largeImgUrl  ='".$lcatimg."'
								,largeImgName  ='".$lcatimg."'
								,largeImgAltText  =''
								,suitableFor =''
								,particuler ='".$Row[3]."
								',dealerCurrency =''
								,customerCurrency =''
								,unitCurrency =''
								,mrpCurrency  =''
								,standardPackaging =''
								,shDetails ='".$Row[7]."
								',descriptionSize =''
								,size =''
								,chSize =''
								,chPosition ='".$Row[6]."
								',section ='".$Row[4]."'
								,application =''
								,partNumber  ='".$Row[2]."
								',smallImgType  =''
								,items =''
								,packQty =''
								,mrpPrice =''
								,unitPrice =''
								,customerPrice ='',
								dealerPrice =''"
								;
								if ($conn->query($sql) === TRUE) 
								{
									    $productidlast = $conn->insert_id;
									   
									   $sql1 = "SELECT * FROM  pr_category WHERE   id='".trim($catArray)."'";
										$result1= $conn->query($sql1);
										while($rowres1 = $result1->fetch_assoc()) 
										{	
											$murgeproductids = $rowres1['products'].",".$productidlast;
											$murgeproductids = ltrim($murgeproductids , ",");
											$sql = "Update  pr_category set  products ='".$murgeproductids."' where id='".$catArray."'";
											$conn->query($sql);
										}
										
										$arrayTRypes = array("ASSY"=>array('00','8','9','10'),
															"ML"=>array('01','11','12','13'),
															"2P"=>array('02','14','15','16'),
															"3" =>array('03','17','18','19'),
															"4"=>array('04','20','21','22'),
															"5"=>array('05','23','24','25'),
															"6"=>array('06','26','27','28'),
															"7"=>array('07','29','30','31'),
															"8"=>array('08','32','33','34'),
															"9"=>array('09','35','36','37'),
															"10"=>array('10','38','39','40'),
															"11"=>array('11','41','42','43'),
															"12"=>array('12','44','45','46'),
															"13"=>array('13','47','48','49'),
															"14"=>array('14','50','51','52'),
															"AA"=>array('31','53','54','55'),
															"AB"=>array('32','56','57','58'),
															"3A"=>array('33','59','60','61'),
															"4A"=>array('34','62','63','64'),
															"L1W"=>array('21','65','66','67'),
															"L2W"=>array('22','68','69','70'),
															"ASSY"=>array('00','71','71','73')
															
															);
										$itemlastid = array();				
										foreach($arrayTRypes as $key=>$onertype)
										{
											
											$code = $Row[1].$onertype[0];
											$sku = $code."".rand(10,1000);
											if(!empty($Row[$onertype[1]]) && !empty($Row[$onertype[2]]) && $Row[0]!="S.NO.")
											{
											 $sql2  = "insert into pr_item set  
												name  ='".$key."'
												,code  ='".$code."'
												,partNumber  ='".$Row[2]."'
												,dbp  ='".$Row[$onertype[1]]."'
												,dbpCurrency  =''
 												,mrpCurrency  =''
												,smallImgUrl  =''
												,sku  ='".$sku."'
												,inStock  ='1'
												,minOrderQty  =''
												,maxOrderQty  =''
												,smallImgType  =''
												,productId = '".$productidlast."'
												,smallImgName  ='".$Row[$onertype[3]].'.png'."'
												,smallImgLang  =''
												,smallImgAltText =''
												,largeImgUrl  ='".$Row[$onertype[3]].'.png'."'
												,largeImgName  ='".$Row[$onertype[3]].'.png'."'
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
												,length ='".$Row[$onertype[2]]."'";
												
 												if ($conn->query($sql2) === TRUE) 
												{
												  $itemlastid[] = $conn->insert_id;
												}	
											}
										}
										
										if(!empty($itemlastid))
										{
											$itemlastidcoma = implode(",",$itemlastid);
											$sqlpro = "Update  pr_product set  items  ='".$itemlastidcoma."' where id='".$productidlast."'";
											$conn->query($sqlpro);
										}
									
								}
							
							}
						}
					}
						
					/* end here */
				}
				else
				{
					//var_dump($Row);
				}
				 
				 
			}
			//print_r($catArray); 
		
			 
		}
		
	}
	catch (Exception $E)
	{
		echo $E -> getMessage();
	}
?>
