<?php



	$msg_box = array(); // в этой переменной будем хранить сообщения формы
	$errors = array(); // контейнер для ошибок


	// проверяем корректность полей
	if($_POST['user_name'] == "") 	 $errors[] = "Поле 'Ваше имя' не заполнено!";
	if($_POST['user_email'] == "") 	 $errors[] = "Поле 'Ваш e-mail' не заполнено!";
	if($_POST['user_phone'] == "") $errors[] = "Поле 'Телефон' не заполнено!";

	$t_forms = $_POST['t_forms']; // переменная содержит тип формы

	// если форма без ошибок
	if(empty($errors)){		
		// собираем данные из формы
		$message  = "
		
		<table style='max-width: 600px; width: 100%;border: 1px solid #ccc;padding: 8px;text-align: center; '>
		<caption style='margin-bottom: 15px;font-size: 21px;color: #37b178;'>Вам пришла заявка с сайта Avrora </caption> 
			<tr style='vertical-align: top;'> 
				<td> 
					<p style='padding: 8px;border-bottom: 1px solid #ccc;'> Имя пользователя: </p>
					<p style='color:#000; font-size: 20px ; padding: 8px;'>". $_POST['user_name'] . "</p>  
				</td>";
			$message .= "
				<td> 
					<p style='padding: 8px;border-bottom: 1px solid #ccc;'>E-mail пользователя:</p> 
					<p style='color:#1f22b4; font-size: 20px; padding: 8px;'>" . $_POST['user_email'] . "</p> 
				<td>";
/*			$message .= "
				<td> 
					<p style='padding: 8px;border-bottom: 1px solid #ccc;'>тип формы:</p> 
					<p style='color:#1f22b4; font-size: 20px; padding: 8px;'>" . $t_forms . "</p> 
				<td>";*/				
			$message .= "
				<td> 
					<p style='padding: 8px;border-bottom: 1px solid #ccc;'>Телефон: </p>
					<p style='color: #a0291f; font-size: 20px; padding: 8px;'>" . $_POST['user_phone'] . "</p> 
				<td> 

			</tr> 
		</table>
		<a href='http://frontend.image-mg.com/avrora' target='_blank' title='обратно на сайт' style='color: #ccc; font-size: 12px;'>перейти на сайт Avrora</a>";	

		// выведем сообщение об успехе
		$msg_box = "<span class='action__message ok'>Сообщение успешно отправлено!</span>";	
		$errors = false;
		send_mail($message); // отправим письмо

	}else{
		// если были ошибки, то выводим их
		$msg_box = "";
		$errors = true;
		foreach($errors as $one_error){
			$msg_box .= "<span class='action__message err'>$one_error</span><br/>";
		}
	}
	
	// функция отправки письма
	function send_mail($message){
		// почта, на которую придет письмо
		$mail_to = "valeria@image-mg.com"; 
		// тема письма
		$subject = "Заявка обратного звонка с сайта Avrora";
		
		// заголовок письма
		$headers= "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
		$headers .= "From: Тестовое письмо <no-reply@test.com>\r\n"; // от кого письмо
		
		// отправляем письмо 
		$send = mail($mail_to, $subject, $message, $headers);
	
	}

	// делаем ответ на клиентскую часть в формате JSON	
	echo json_encode(array(
		'result' => $msg_box , 
		'typeForm' => $t_forms,
		'errors' => $errors
	));