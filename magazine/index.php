<?php

    main();

    // Method: POST, PUT, GET etc
    // Data: array("param" => "value") ==> index.php?param=value

    function callAPI($method, $url, $data = false)
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

    function postRequest($base_api, $language, $slug){

        $url = $base_api."/".$slug."?lang=".$language;

        $data = callAPI("GET", $url);

        return $data;

    }

    function generateDOM($title, $description, $language, $redirect){

        echo'
            <html>
                <head>
                    <meta name="title" content="'.$title.'">
                    <meta name="description" content="'.$description.'">
                    <meta name="keywords" content="B5, architettura, architect, architecture, ristrutturazione, restructuration, Francesca, Brancaccio, Francesca Brancaccio, engeneering, Idee in cammino, idee in cammino, idee, cammino, ingegneria, engeneering">
                    <meta name="robots" content="index, follow">
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                    <meta name="language" content="'.$language.'">
                </head>

                <body>
                </body>

            </html>

            <script>
                // Simulate an HTTP redirect:
                window.location.replace("'.$redirect.'");
            </script>
        ';

    }

    function main(){

        //Settings
        $base_api_url = "https://b5srl.eu/b5_backend/public/api/v1";
        $base_redirect_url = "https://b5srl.eu/b5_frontend/";
        $locale_prefix = "app-content/locales/locale-";
        $locale_suffix = ".json";

        //Local variables
        $api_url = $base_api_url."/posts";
        $redirect_url = $base_redirect_url."/#!/magazine";
        $lang = "";
        $slug = "";
        $title = "";
        $description = "";

        //Init variables
        if(!empty($_COOKIE['NG_TRANSLATE_LANG_KEY'])){
            $lang = $_COOKIE['NG_TRANSLATE_LANG_KEY'];
        }
        else if(!empty($_GET['lang'])){
            $lang = $_GET['lang'];
        }

        switch ($lang) {
            case "it":
                break;
            case "en":
                break;
            case "fr":
                break;
            default:
                $lang = "it";
                
        }

        if(!empty($_GET['post'])){
            $slug = $_GET['post'];
        }


        //Get infos and generate page
        $post = json_decode(postRequest($api_url, $lang, $slug));

        if($post == NULL){

            $locale_info = file_get_contents("../".$locale_prefix.$lang.$locale_suffix);
            $localization = json_decode($locale_info, true);

            $title = $localization["404_MAGAZINE_TITLE"];
            $description = $localization["404_MAGAZINE_DESCRIPTION"];
            $redirect = $base_redirect_url;

        }else{

            $title = $post->data->title;
            $description = $post->data->summary_content;
            $redirect_url = $redirect_url."/".$slug;

        }

        generateDOM($title, $description, $lang, $redirect_url);



    }