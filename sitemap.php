<?php


// Method: POST, PUT, GET etc
// Data: array("param" => "value") ==> index.php?param=value

function CallAPI($method, $url, $data = false)
{
    $curl = curl_init();

    switch ($method)
    {
        case "POST":
            curl_setopt($curl, CURLOPT_POST, 1);

            if ($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        case "PUT":
            curl_setopt($curl, CURLOPT_PUT, 1);
            break;
        default:
            if ($data)
                $url = sprintf("%s?%s", $url, http_build_query($data));
    }

    // Optional Authentication:
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($curl, CURLOPT_USERPWD, "username:password");

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($curl);

    curl_close($curl);

    return $result;
}



function main(){
    
    $xml = simplexml_load_string('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');
    $category = "";
    $urlAPI = "https://b5srl.eu/b5_backend/public/api/v1/posts";
    $data = array("limit" => "1000");
    
    
    
    //if($xml != false){
        
        //$urlset = $xml->children()[0];
        $urlset = $xml;
    
        //Aggiunta home
        $url = $urlset->addChild('url');
        $url->addChild("loc", 'https://b5srl.eu/');
        $url->addChild("lastmod", date("Y-m-d"));
        $url->addChild("changefreq", 'monthly');
        $url->addChild("priority", '0.8');
        
        //Aggiunta lavori
        $url = $urlset->addChild('url');
        $url->addChild("loc", 'https://b5srl.eu/#!/works');
        $url->addChild("lastmod", date("Y-m-d"));
        $url->addChild("changefreq", 'monthly');
        $url->addChild("priority", '0.8');
        
        //Aggiunta magazine
        $url = $urlset->addChild('url');
        $url->addChild("loc", 'https://b5srl.eu/#!/magazine');
        $url->addChild("lastmod", date("Y-m-d"));
        $url->addChild("changefreq", 'monthly');
        $url->addChild("priority", '0.8');
        
        //Aggiunta meet us
        $url = $urlset->addChild('url');
        $url->addChild("loc", 'https://b5srl.eu/#!/meet-us');
        $url->addChild("lastmod", date("Y-m-d"));
        $url->addChild("changefreq", 'monthly');
        $url->addChild("priority", '0.8');
        
        //Aggiunta privacy policy
        $url = $urlset->addChild('url');
        $url->addChild("loc", 'https://b5srl.eu/#!/privacy-policy');
        $url->addChild("lastmod", date("Y-m-d"));
        $url->addChild("changefreq", 'monthly');
        $url->addChild("priority", '0.8');
        
        //Aggiunta cookie policy
        $url = $urlset->addChild('url');
        $url->addChild("loc", 'https://b5srl.eu/#!/cookie-policy');
        $url->addChild("lastmod", date("Y-m-d"));
        $url->addChild("changefreq", 'monthly');
        $url->addChild("priority", '0.8');
        
        //Aggiunta crediti
        $url = $urlset->addChild('url');
        $url->addChild("loc", 'https://b5srl.eu/#!/credits');
        $url->addChild("lastmod", date("Y-m-d"));
        $url->addChild("changefreq", 'yearly');
        $url->addChild("priority", '0.5');
        
        
        //Inserimento di tutti i posts
        $response = json_decode(CallAPI("GET", $urlAPI, $data), true);
        foreach ($response["data"] as $post){
        
            switch ($post["category_slug"]) {
                case 'pubblicazioni':
                    $category = "magazine";
                    break;
                    
                case 'eventi':
                    $category = "magazine";
                    break;
                    
                case 'rassegna-stampa':
                    $category = "magazine";
                    break;
                    
                case 'comunicati-stampa':
                    $category = "magazine";
                    break;
                    
                case 'design':
                    $category = "works";
                    break;
                    
                case 'paesaggio':
                    $category = "works";
                    break;
                    
                case 'scala-urbana':
                    $category = "works";
                    break;
                    
                case 'ex-novo':
                    $category = "works";
                    break;
                    
                case 'consolidamento':
                    $category = "works";
                    break;
                    
                case 'restauro':
                    $category = "works";
                    break;
                    
                default:
                    $category = "works";
                
            }
        
            $url = $urlset->addChild('url');
            $url->addChild("loc", 'https://b5srl.eu/'.$category.'?post='.$post["slug"]);
            $url->addChild("lastmod", date_format( date_create($post["posted_at"]),"Y-m-d"));
            $url->addChild("changefreq", 'yearly');
            $url->addChild("priority", '0.5');
        }
        

    
        Header('Content-type: text/xml; charset=utf-8');
        
        echo $xml->asXML();
   // }else{
    //    var_dump($xml);
    //}

    
}



main();

?>