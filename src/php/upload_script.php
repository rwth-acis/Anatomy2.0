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
					$old = umask(0); 
					mkdir($dirname, 0777);
					mkdir($dirname.DIRECTORY_SEPARATOR."preview", 0777);
					umask($old);
					
					$file_destination = $dirname.DIRECTORY_SEPARATOR.$last_id.'.x3d';
					
					
					if (move_uploaded_file($file_tmp, $file_destination)){
						// Try to create preview-image automatically
						$screenshot_script_url = '../../applications/screenshot';	
						$previewimage_url = $root_url.DIRECTORY_SEPARATOR.$last_id.DIRECTORY_SEPARATOR."preview".DIRECTORY_SEPARATOR.$last_id.".png";
						exec("$screenshot_script_url $file_destination $previewimage_url");
						
						header("Location: ../views/success.php?id=$last_id");

					}else{
						echo 'Upload Failed';
						
					}
					
				}	
				else{
					echo 'File to big';
					
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
				echo 'Upload error: '.$file_error.': '.$errorMsg[$file_error];
			}
			
		}
		else{
			echo 'Not allowed file type';
		}

	} else {
		echo 'Maybe File-API is not supported.';
	}
	
?>
	
