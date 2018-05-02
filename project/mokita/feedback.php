<?php
//проверяем значения полученые при проверке скриптом формы
if (trim($_POST['valTrFal'])!='valTrFal_true') {
	echo 'fasle';
}
else {


		$txtname = trim($_POST['txtname']);

		$txtNameValue = trim($_POST['name_class_value']);

		$txtemail = trim($_POST['txtemail']);

		$txtphone = trim($_POST['txtphone']);

		$txtmessage = trim($_POST['txtmessage']) ;

		if($txtmessage == '') {
			$txtmessage = 'Перезвоните мне, Спасибо!';
		}
		

		// от кого
		$fromMail = 'frontend@image-mg.com';
		$fromName = 'Вам сообщение с сайта';

		// Сюда введите Ваш email
		$emailTo = 'frontend@image-mg.com';

		$subject = 'Сообщение от пользователя '.$txtname;
		$subject = '=?utf-8?b?'. base64_encode($subject) .'?=';
		$headers = "Content-type: text/plain; charset=\"utf-8\"\r\n";
		$headers .= "From: ". $fromName ." <". $fromMail ."> \r\n";

		

		// тело письма
		$body = "Получено письмо с сайта Mokita.ru\n\nИмя: $txtname\nТелефон: $txtphone\ne-mail: $txtemail \nСообщение: $txtmessage";
		$mail = mail($emailTo, $subject, $body, $headers, '-f'. $fromMail );


		echo 'ok';
}
?>
