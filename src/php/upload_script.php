<?php 
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
		
		if (in_array($file_ext, $allowed)){
			if ($file_error === 0){
				if ($file_size <= 52428800){
					
					// Create database-entry
					$conn = require '../php/db_connect.php';
				
					$sql = "INSERT INTO models (name, description, classification) VALUES ('$name','$text', '$cat')";
				
					$conn->query($sql);
					$last_id = $conn->lastInsertId();
					$sql = "UPDATE models SET data_url='models/$last_id/$last_id.x3d', preview_url='models/$last_id/preview/$last_id.png' WHERE id=$last_id";
					$conn->query($sql);
				
					// Copy to model-folder
					$dirname = $root_url.DIRECTORY_SEPARATOR.$last_id;
					mkdir($dirname);
					mkdir($dirname.DIRECTORY_SEPARATOR."preview");
					
					$file_destination = $dirname.DIRECTORY_SEPARATOR.$last_id.'.x3d';
					
					
					if (move_uploaded_file($file_tmp, $file_destination)){
						header("Location: ../views/success.php?id=$last_id");
						
						// Create preview-image
						$view3dscene_url = '../../applications/view3dscene/view3dscene';	
						$previewimage_url = $root_url.DIRECTORY_SEPARATOR.$last_id.DIRECTORY_SEPARATOR."preview".DIRECTORY_SEPARATOR.$last_id.".png";
						exec("$view3dscene_url --screenshot 0 $previewimage_url $file_destination");
						
					}else{
						echo 'Upload Failed';
						
					}
					
				}	
				else{
					echo 'File to big';
					
				}
			}
			
		}
		else{
			echo 'Not allowed file type';
		}

	}
	
