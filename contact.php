<?php
// Load Composer's autoloader and environment variables
require 'vendor/autoload.php';

// Load environment variables from the .env file
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data with default values if not set
    $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : 'Not specified';
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : 'Not specified';
    $message = isset($_POST['message']) ? htmlspecialchars($_POST['message']) : 'No message provided';

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';  // SMTP server for Gmail
        $mail->SMTPAuth   = true;
        $mail->Username   = $_ENV['EMAIL_USER'];  // Load from .env
        $mail->Password   = $_ENV['EMAIL_PASS'];  // Load from .env
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom($_ENV['EMAIL_USER'], 'Ermiyas Tesfamariam');  // Sender email from .env
        $mail->addAddress('ermiyastesfamariam101@gmail.com', 'Ermiyas Tesfamariam');  // Recipient email

        // Optional: Add the reply-to address to handle replies
        $mail->addReplyTo($email, $name);

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'New Contact Form Message';
        $mail->Body    = "Name: $name<br>Email: $email<br>Message: $message";

        // Send email
        $mail->send();
        echo 'Message has been sent successfully.';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo 'Invalid request method.';
}
?>
