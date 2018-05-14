<?php


//$urlLaurier = "http://www.eco-public.com/api/cw6Xk4jW4X4R/data/periode/100001678?begin=20110710&step=4&end=";
$urlLaurier = "http://www.eco-public.com/api/cw6Xk4jW4X4R/data/periode/100001678?begin=20120101&step=4&end=";
$urlPortage = "http://www.eco-public.com/api/cw6Xk4jW4X4R/data/periode/100007698?begin=20140101&step=4&end=";

function ParseCounter($url, $title, $filename)
{


	$ch = curl_init();
	$agent= 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)';


	curl_setopt($ch,CURLOPT_URL,$url);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_VERBOSE, true);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch,CURLOPT_COOKIEFILE,'cookies.txt');
	curl_setopt($ch,CURLOPT_COOKIEJAR,'cookies.txt');
	curl_setopt($ch, CURLOPT_USERAGENT, $agent);
	$page = curl_exec($ch);
	curl_close($ch);

	if($page=="") return;

	$hWrite = fopen($filename, "w");

	//echo "result: ";
	// print_r($spotwx); // prints the contents of the collected file before writing..
	fputs($hWrite, "Title,".$title."\n");
	while(strpos($page, "date"))
	{
		$pos1 = strpos($page, "{\"date\":\"");
		$page = substr($page, $pos1 + strlen("{\"date\":\""));
		$pos2 = strpos($page, " ");
		$date = substr($page, 0, $pos2);

		$pos1 = strpos($page, "comptage\":");
		$page = substr($page, $pos1 + strlen("comptage\":"));
		$pos2 = strpos($page, ",");
		$rides = substr($page, 0, $pos2);

		if($rides=="null")
			$rides = "0";

		fputs($hWrite, $date.",".$rides."\n");

	}

}

$datestamp = date("Ymd", mktime(0, 0, 0, date("m")  , date("d")-1, date("Y")));
ParseCounter($urlLaurier.$datestamp, "Laurier & Metcalfe bike counter - updated daily", "laurier.csv");
ParseCounter($urlPortage.$datestamp, "Portage Bridge bike counter - updated daily","portage.csv");
echo "Parsed counters successfully until ".$datestamp;

return 0;

?>
