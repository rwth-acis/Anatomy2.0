<?php 
/**
 * Copyright 2015 Adam Brunnmeier, Dominik Studer, Alexandra Wörner, Frederik Zwilling, Ali Demiralp, Dev Sharma, Luca Liehner, Marco Dung, Georgios Toubekis
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @file upload_script.php
 * 
 * Uploads a model to the repository and
 * adds metadata about it to the models database.
 */
 
	if(isset($_FILES['file'])){
		
		//Get input data
		$file = $_FILES['file'];
		$file_name = $file['name'];
		$file_tmp = $file['tmp_name'];
		$file_size = $file['size'];
		$file_ext = explode('.', $file_name);
		$file_ext = strtolower(end($file_ext));
		$file_error = $file['error'];
		$root_url = '../../models';
		$allowed = array('x3d');
		$name = $_POST['name'];
		$text = $_POST['text'];
		$cat = $_POST['cat'];
    $widgetParameter = "";
    
    // If this script is initiated from within ROLE, keep the "widget=true" parameter
    if(isset($_GET["widget"]) && $_GET["widget"] == "true") {
      // will be added in all "header(..)" calls
      $widgetParameter = "&widget=true";
    }

		if (in_array($file_ext, $allowed)){
			if ($file_error === 0){
				if ($file_size <= 104828800){
					
					// Create database-entry
					$conn = require '../php/db_connect.php';
          
          // TODO:
          // Insert a Sevianno object id as value for the "seviannoId" field
          // As a hint on how to recieve the Sevianno object id, have a look at
          // http://dbis.rwth-aachen.de/3dnrt/3Drepository/getNewId.php
				
					$sql = "INSERT INTO models (name, description, classification, size) VALUES ('$name','$text', '$cat', '$file_size')";
				
					$conn->query($sql);
					$last_id = $conn->lastInsertId();
					$sql = "UPDATE models SET data_url='models/$last_id/$last_id.x3d', preview_url='models/$last_id/preview/$last_id.png' WHERE id=$last_id";
					$conn->query($sql);
				
					// Copy to model-folder
					$dirname = $root_url.DIRECTORY_SEPARATOR.$last_id;
					$old = umask(0); 
					mkdir($dirname, 0777);
					mkdir($dirname.DIRECTORY_SEPARATOR."preview", 0777);
					umask($old);
					
					$file_destination = $dirname.DIRECTORY_SEPARATOR.$last_id.'.x3d';
					
					
					if (move_uploaded_file($file_tmp, $file_destination)){
            
						// Try to create preview-image automatically
						$previewimage_url = $root_url.DIRECTORY_SEPARATOR.$last_id.DIRECTORY_SEPARATOR."preview".DIRECTORY_SEPARATOR.$last_id.".png";
						exec("../../applications/auto_preview $file_destination $previewimage_url");
						
            header("Location: ../views/success.php?id=$last_id".$widgetParameter);
            
					}else{
						$message = 'Upload Failed';
            header("Location: ../views/error.php?message=$message".$widgetParameter);
					}
					
				}	
				else{
					
					$message = 'File to big';
          header("Location: ../views/error.php?message=$message".$widgetParameter);
				}
			}
			else {
				$errorMsg = [
				    0 => "There is no error, the file uploaded with success",
				    1 => "The uploaded file exceeds the upload_max_filesize directive in php.ini",
				    2 => "The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form",
				    3 => "The uploaded file was only partially uploaded",
				    4 => "No file was uploaded",
				    6 => "Missing a temporary folder"
				]; 
				$message = 'Upload error: '.$file_error.': '.$errorMsg[$file_error];
				header("Location: ../views/error.php?message=$message".$widgetParameter);
			}
			
		}
		else{
			$message = 'Not allowed filetype';
			header("Location: ../views/error.php?message=$message".$widgetParameter);
		}

	} else {
		$message = 'Maybe File-API is not supported.';
		header("Location: ../views/error.php?message=$message".$widgetParameter);
	}
	
?>
	
